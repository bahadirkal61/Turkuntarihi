import { useParams, useNavigate, Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { loadDynastyRulers, getCachedDynastyRulers } from "../data/rulers";
import type { Ruler } from "../data/rulers";
import { DYNASTIES } from "../data/dynasties";
import {
  ArrowLeft, Crown, ChevronRight, ChevronLeft,
  Landmark, Sparkles, Users
} from "lucide-react";
import EditableText from "../components/EditableText";

/* Modern drag-to-scroll hook - tracks drag distance to prevent clicks */
function useDragScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const dragDistance = useRef(0);
  const hasDragged = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      hasDragged.current = false;
      dragDistance.current = 0;
      startX.current = e.pageX - el.offsetLeft;
      scrollLeft.current = el.scrollLeft;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      dragDistance.current = Math.abs(walk);
      if (dragDistance.current > 5) hasDragged.current = true;
      el.scrollLeft = scrollLeft.current - walk;
    };
    const onMouseUp = () => {
      setIsDragging(false);
    };

    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging]);

  const onCardClick = (e: React.MouseEvent) => {
    if (hasDragged.current && dragDistance.current > 8) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return { ref, isDragging, onCardClick };
}

export default function DynastyDetail() {
  const { dynastyId } = useParams<{ dynastyId: string }>();
  const navigate = useNavigate();
  const { ref: scrollRef, isDragging, onCardClick } = useDragScroll();
  const [rulers, setRulers] = useState<Ruler[]>(dynastyId ? getCachedDynastyRulers(dynastyId) || [] : []);
  const [loading, setLoading] = useState(dynastyId ? !getCachedDynastyRulers(dynastyId) : false);
  const [activeTab, setActiveTab] = useState<"cb" | "bb">("cb");

  useEffect(() => {
    if (!dynastyId) return;
    setLoading(true);
    const cached = getCachedDynastyRulers(dynastyId);
    if (cached && dynastyId !== "cumhuriyet") { setRulers(cached); setLoading(false); return; }
    
    // Normal yükleme
    if (dynastyId !== "cumhuriyet") {
      loadDynastyRulers(dynastyId)
        .then(data => { setRulers(data); setLoading(false); })
        .catch(() => { setRulers([]); setLoading(false); });
      return;
    }
    
    // Cumhuriyet: hem CB hem BB dosyalarını yükle
    const cachedCB = getCachedDynastyRulers("cumhuriyet-cb");
    const cachedBB = getCachedDynastyRulers("cumhuriyet-bb");
    if (cachedCB && cachedBB) {
      setRulers([...cachedCB, ...cachedBB]);
      setLoading(false);
      return;
    }
    Promise.all([
      loadDynastyRulers("cumhuriyet-cb"),
      loadDynastyRulers("cumhuriyet-bb")
    ])
      .then(([cb, bb]) => {
        setRulers([...(cb || []), ...(bb || [])]);
        setLoading(false);
      })
      .catch(() => { setRulers([]); setLoading(false); });
  }, [dynastyId]);

  const info = dynastyId ? DYNASTIES[dynastyId] : null;

  // Compute prev/next dynasty from DYNASTIES key order
  const dynastyKeys = Object.keys(DYNASTIES);
  const currentIndex = dynastyId ? dynastyKeys.indexOf(dynastyId) : -1;
  const prevDynastyId = currentIndex > 0 ? dynastyKeys[currentIndex - 1] : null;
  const nextDynastyId = currentIndex >= 0 && currentIndex < dynastyKeys.length - 1 ? dynastyKeys[currentIndex + 1] : null;
  const prevDynasty = prevDynastyId ? DYNASTIES[prevDynastyId] : null;
  const nextDynasty = nextDynastyId ? DYNASTIES[nextDynastyId] : null;

  // Cumhuriyet için sekmeli filtreleme
  const dynastyRulers = dynastyId === "cumhuriyet"
    ? rulers.filter((r) => r.dynastyId === `cumhuriyet-${activeTab}`).sort((a, b) => a.order - b.order)
    : dynastyId
      ? rulers.filter((r) => r.dynastyId === dynastyId).sort((a, b) => a.order - b.order)
      : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-[3px] border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-stone-400 text-base font-medium">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!info || dynastyRulers.length === 0) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center">
        <p className="text-stone-400">Devlet bulunamadi.</p>
      </div>
    );
  }

  const accent = info.color;

  return (
    <div className="min-h-screen bg-stone-950">
      {/* BANNER */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${accent}15 0%, #0c0a09 50%)` }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/5 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-8 pb-12 md:pb-16">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/tarih")}
           className="flex items-center gap-2 text-stone-500 hover:text-white mb-8 transition-colors"
         >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Tüm Devletler</span>
          </motion.button>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="flex items-center gap-3 mb-4">
              <Landmark className="w-5 h-5" style={{ color: accent }} />
              <span className="text-sm font-medium" style={{ color: accent }}>{info.period}</span>
            </div>
            <EditableText
              storageKey={`dynasty_name_${dynastyId}`}
              defaultValue={info.name}
              className="text-4xl md:text-6xl font-black text-white mb-4 block"
              as="h1"
            >
              {info.name}
            </EditableText>
            <EditableText
              storageKey={`dynasty_desc_${dynastyId}`}
              defaultValue={info.description}
              className="text-stone-400 text-base md:text-lg max-w-3xl leading-relaxed mb-6 block"
              as="p"
            >
              {info.description}
            </EditableText>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2 text-stone-500 text-sm">
                <Crown className="w-4 h-4" style={{ color: accent }} />
                {dynastyRulers.length} Hukumdar
              </span>
              <EditableText
                storageKey={`dynasty_highlight_${dynastyId}`}
                defaultValue={info.highlight}
                className="flex items-center gap-2 text-stone-500 text-sm"
                as="span"
              >
                <Sparkles className="w-4 h-4" style={{ color: accent }} />
                {info.highlight}
              </EditableText>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PREV / NEXT DYNASTY NAVIGATION */}
      <section className="max-w-7xl mx-auto px-3 md:px-4 pt-4 md:pt-6 pb-2">
        <div className="flex items-center justify-between gap-2 md:gap-4">
          {/* Previous Dynasty */}
          {prevDynasty && prevDynastyId ? (
            <button
              onClick={() => navigate(`/tarih/${prevDynastyId}`)}
              className="flex items-center gap-2 md:gap-3 text-left group flex-1 min-w-0"
            >
              <div
                className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:-translate-x-1"
                style={{ backgroundColor: `${prevDynasty.color}20` }}
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" style={{ color: prevDynasty.color }} />
              </div>
              <div className="min-w-0">
                <p className="text-stone-600 text-[9px] md:text-[10px] uppercase tracking-wider hidden sm:block">Önceki Devlet</p>
                <p className="text-stone-300 text-xs md:text-sm font-medium truncate group-hover:text-white transition-colors">
                  {prevDynasty.name}
                </p>
              </div>
            </button>
          ) : (
            <div className="flex-1" />
          )}

          {/* Current indicator */}
          <div className="flex items-center gap-1.5 md:gap-2 px-2 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl bg-stone-900 border border-stone-800 flex-shrink-0">
            <Landmark className="w-3 h-3 md:w-4 md:h-4" style={{ color: accent }} />
            <span className="text-stone-400 text-[10px] md:text-xs">
              {currentIndex + 1} / {dynastyKeys.length}
            </span>
          </div>

          {/* Next Dynasty */}
          {nextDynasty && nextDynastyId ? (
            <button
              onClick={() => navigate(`/tarih/${nextDynastyId}`)}
              className="flex items-center gap-2 md:gap-3 text-right group flex-1 min-w-0 justify-end"
            >
              <div className="min-w-0">
                <p className="text-stone-600 text-[9px] md:text-[10px] uppercase tracking-wider hidden sm:block">Sonraki Devlet</p>
                <p className="text-stone-300 text-xs md:text-sm font-medium truncate group-hover:text-white transition-colors">
                  {nextDynasty.name}
                </p>
              </div>
              <div
                className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:translate-x-1"
                style={{ backgroundColor: `${nextDynasty.color}20` }}
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" style={{ color: nextDynasty.color }} />
              </div>
            </button>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </section>

      {/* RULERS - Horizontal scroll cards */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <Users className="w-5 h-5 text-stone-600" />
          <EditableText
            storageKey="dynasty_rulers_heading"
            defaultValue="Hukumdarlar"
            className="text-xl font-bold text-white block"
            as="h2"
          >
            Hukumdarlar
          </EditableText>
          <div className="flex-1 h-px bg-stone-800" />
          <span className="text-stone-600 text-sm">{dynastyRulers.length} kişi</span>
        </div>

        {/* Cumhuriyet sekme navigasyonu */}
        {dynastyId === "cumhuriyet" && (
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab("cb")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === "cb"
                  ? "bg-red-600 text-white shadow-lg shadow-red-900/30"
                  : "bg-stone-900 text-stone-400 border border-stone-800 hover:border-stone-600 hover:text-stone-200"
              }`}
            >
              <Crown size={16} />
              Cumhurbaşkanları (12)
            </button>
            <button
              onClick={() => setActiveTab("bb")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === "bb"
                  ? "bg-amber-600 text-white shadow-lg shadow-amber-900/30"
                  : "bg-stone-900 text-stone-400 border border-stone-800 hover:border-stone-600 hover:text-stone-200"
              }`}
            >
              <Landmark size={16} />
              Başbakanlar (27)
            </button>
          </div>
        )}

        {/* Horizontal scrolling row - modern dark scrollbar + drag to scroll */}
        <style>{`
          .modern-scroll::-webkit-scrollbar { height: 5px; }
          .modern-scroll::-webkit-scrollbar-track { background: transparent; margin: 0 12px; }
          .modern-scroll::-webkit-scrollbar-thumb { background: #44403c; border-radius: 10px; transition: background 0.3s; }
          .modern-scroll::-webkit-scrollbar-thumb:hover { background: #a8a29e; }
          .modern-scroll { scrollbar-color: #44403c transparent; scrollbar-width: thin; cursor: grab; }
          .modern-scroll:active { cursor: grabbing; }
          .modern-scroll > * { user-select: none; }
        `}</style>
        <div
          ref={scrollRef}
          className={`modern-scroll flex gap-4 overflow-x-auto pb-5 snap-x snap-mandatory ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        >
          {dynastyRulers.map((ruler, i) => (
            <motion.div
              key={ruler.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              
              transition={{ delay: i * 0.04, duration: 0.4 }}
             className="snap-start shrink-0"
           >
              <Link
                to={`/tarih/${dynastyId}/${ruler.id}`}
                onClick={onCardClick}
               className="group block w-[220px] md:w-[260px] bg-stone-900 rounded-2xl overflow-hidden border border-stone-800/50 hover:border-stone-600 transition-all duration-300 hover:shadow-xl hover:shadow-black/40"
             >
                {/* Image */}
                <div className="relative h-[280px] md:h-[340px] overflow-hidden">
                  <img
                    src={ruler.image}
                    alt={ruler.name}
                   className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

                  {/* Name overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-xs text-white/50 font-medium">{ruler.period}</span>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors mt-0.5 leading-tight">
                      {ruler.name}
                    </h3>
                    <p className="text-stone-400 text-xs mt-1 line-clamp-1">{ruler.title}</p>
                  </div>
                </div>

                {/* Bottom info */}
                <div className="p-4">
                  <p className="text-stone-500 text-xs line-clamp-2 leading-relaxed">{ruler.description}</p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-stone-800/50">
                    <span className="text-xs font-medium" style={{ color: accent }}>{ruler.dynasty}</span>
                    <ChevronRight className="w-4 h-4 text-stone-700 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
