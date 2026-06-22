import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { loadDynastyRulers, getCachedDynastyRulers } from "../data/rulers";
import type { Ruler } from "../data/rulers";
import { DYNASTIES } from "../data/dynasties";
import {
  ArrowLeft,
  Calendar,
  Swords,
  Users,
  ScrollText,
  UserCircle,
  ChevronRight,
  ChevronLeft,
  Crown,
  Quote,
} from "lucide-react";
import EditableText from "../components/EditableText";
import { rulerQuotes } from "../data/quotes";

type TabId = "bio" | "events" | "battles" | "people";

const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "bio", label: "Biyografi", icon: UserCircle },
  { id: "events", label: "Olaylar", icon: Calendar },
  { id: "battles", label: "Savaşlar", icon: Swords },
  { id: "people", label: "Şahsiyetler", icon: Users },
];

export default function RulerPage() {
  const { dynastyId: rawDynastyId, rulerId } = useParams<{
    dynastyId: string;
    rulerId: string;
  }>();
  const navigate = useNavigate();
  const [rulers, setRulers] = useState<Ruler[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>("bio");

  // Resolve dynasty ID - handle cumhuriyet special case
  const dynastyId = useMemo(() => {
    if (!rawDynastyId) return null;
    // If the URL uses cumhuriyet-cb or cumhuriyet-bb, keep it as-is
    // If it's just "cumhuriyet", we need to determine which sub-dynasty
    if (rawDynastyId === "cumhuriyet") {
      return "cumhuriyet"; // DynastyDetail handles loading both
    }
    return rawDynastyId;
  }, [rawDynastyId]);

  useEffect(() => {
    if (!dynastyId) {
      setLoading(false);
      return;
    }
    setLoading(true);

    // For cumhuriyet, load both cb and bb files
    if (dynastyId === "cumhuriyet") {
      const cachedCB = getCachedDynastyRulers("cumhuriyet-cb");
      const cachedBB = getCachedDynastyRulers("cumhuriyet-bb");
      if (cachedCB && cachedBB) {
        setRulers([...cachedCB, ...cachedBB]);
        setLoading(false);
        return;
      }
      Promise.all([
        loadDynastyRulers("cumhuriyet-cb"),
        loadDynastyRulers("cumhuriyet-bb"),
      ])
        .then(([cb, bb]) => {
          setRulers([...(cb || []), ...(bb || [])]);
          setLoading(false);
        })
        .catch(() => {
          setRulers([]);
          setLoading(false);
        });
      return;
    }

    const cached = getCachedDynastyRulers(dynastyId);
    if (cached) {
      setRulers(cached);
      setLoading(false);
      return;
    }
    loadDynastyRulers(dynastyId)
      .then((data) => {
        setRulers(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [dynastyId, rulerId]);

  // Compute prev/next rulers
  const { ruler, prevRuler, nextRuler, dynastyInfo } = useMemo(() => {
    const dynInfo = dynastyId ? DYNASTIES[dynastyId] || DYNASTIES["cumhuriyet"] : null;
    if (!dynastyId || !dynInfo) {
      return { ruler: undefined, prevRuler: undefined, nextRuler: undefined, dynastyInfo: null };
    }
    const sorted = [...rulers].sort((a, b) => a.order - b.order);
    const idx = sorted.findIndex((r) => r.id === rulerId);
    return {
      ruler: idx >= 0 ? sorted[idx] : undefined,
      prevRuler: idx > 0 ? sorted[idx - 1] : undefined,
      nextRuler: idx >= 0 && idx < sorted.length - 1 ? sorted[idx + 1] : undefined,
      dynastyInfo: dynInfo,
    };
  }, [rulers, rulerId, dynastyId]);

  // Reset tab when ruler changes
  useEffect(() => {
    setActiveTab("bio");
  }, [rulerId]);

  if (loading)
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center text-stone-400">
        <div className="text-center">
          <div className="w-10 h-10 border-[3px] border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-stone-400 text-base font-medium">Yükleniyor...</p>
        </div>
      </div>
    );

  if (!ruler || !dynastyInfo)
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center text-stone-400">
        <p>Hükümdar bulunamadı.</p>
      </div>
    );

  const accent = dynastyInfo.color;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-200">
      {/* Navigation Buttons */}
      <div className="relative z-30 flex items-center gap-2 px-4 pt-20 pb-2 bg-stone-950">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 bg-stone-900 text-stone-400 hover:text-white px-3 py-1.5 rounded-full text-xs font-medium transition-colors border border-stone-700"
        >
          <ArrowLeft className="w-3 h-3" />
          Ana Sayfa
        </button>
        <button
          onClick={() => navigate(`/tarih/${rawDynastyId}`)}
          className="flex items-center gap-2 bg-stone-900 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border border-stone-700"
          style={{ color: accent }}
        >
          {dynastyInfo.name}
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Hero Image */}
      <div className="relative h-[50vh] md:h-[65vh] overflow-hidden">
        <img
          src={ruler.image}
          alt={ruler.name}
          className="w-full h-full object-cover object-top"
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent" />

        {/* Name overlay at bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span
                className="text-xs md:text-sm font-medium mb-2 block"
                style={{ color: accent }}
              >
                {dynastyInfo.name} · {ruler.period}
              </span>
              <EditableText
                storageKey={`ruler_name_${ruler.id}`}
                defaultValue={ruler.name}
                className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-1 block"
                as="h1"
              >
                {ruler.name}
              </EditableText>
              <EditableText
                storageKey={`ruler_title_${ruler.id}`}
                defaultValue={ruler.title}
                className="text-lg md:text-xl font-medium text-amber-400 block"
                as="p"
              >
                {ruler.title}
              </EditableText>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 relative z-10 pb-8 -mt-4">
        {/* Quote */}
        {ruler.quote && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 p-4 bg-stone-900/60 rounded-xl border border-stone-800"
          >
            <EditableText
              storageKey={`ruler_quote_${ruler.id}`}
              defaultValue={`&ldquo;${ruler.quote.text}&rdquo;`}
              className="text-stone-300 italic text-base md:text-lg leading-relaxed block"
              as="p"
            >
              &ldquo;{ruler.quote.text}&rdquo;
            </EditableText>
            <EditableText
              storageKey={`ruler_quote_src_${ruler.id}`}
              defaultValue={`— ${ruler.quote.source}`}
              className="text-stone-500 text-sm mt-2 block"
              as="p"
            >
              — {ruler.quote.source}
            </EditableText>
          </motion.div>
        )}

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2">
            {ruler.achievements?.map((a, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-full text-xs md:text-sm font-medium border"
                style={{
                  backgroundColor: `${accent}15`,
                  borderColor: `${accent}30`,
                  color: accent,
                }}
              >
                {a}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="mb-6 -mx-4 px-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all snap-start flex-shrink-0 border ${
                    isActive
                      ? "text-white border-transparent shadow-lg"
                      : "text-stone-400 border-stone-800 hover:text-stone-200 hover:border-stone-700"
                  }`}
                  style={
                    isActive
                      ? {
                          backgroundColor: accent,
                          boxShadow: `0 4px 20px ${accent}40`,
                        }
                      : {}
                  }
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + ruler.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {/* Bio Tab */}
            {activeTab === "bio" && (
              <div>
                <EditableText
                  storageKey={`ruler_bio_${ruler.id}`}
                  defaultValue={ruler.fullBio}
                  className="text-stone-300 leading-relaxed text-base md:text-lg block"
                  as="p"
                >
                  {ruler.fullBio}
                </EditableText>

                {ruler.legacy && (
                  <div className="mt-8 p-5 md:p-6 bg-stone-900/50 rounded-xl border border-stone-800">
                    <h3 className="text-amber-400 font-bold text-base mb-2 flex items-center gap-2">
                      <ScrollText className="w-4 h-4" />
                      Miras
                    </h3>
                    <EditableText
                      storageKey={`ruler_legacy_${ruler.id}`}
                      defaultValue={ruler.legacy}
                      className="text-stone-300 italic leading-relaxed block"
                      as="p"
                    >
                      {ruler.legacy}
                    </EditableText>
                  </div>
                )}

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-stone-900/40 rounded-xl border border-stone-800">
                    <span className="text-stone-500 text-xs uppercase tracking-wider">
                      Hâkimiyet Öncesi
                    </span>
                    <EditableText
                      storageKey={`ruler_pred_${ruler.id}`}
                      defaultValue={ruler.predecessor || "Bilinmiyor"}
                      className="text-stone-300 font-medium mt-1 block"
                      as="p"
                    >
                      {ruler.predecessor || "Bilinmiyor"}
                    </EditableText>
                  </div>
                  <div className="p-4 bg-stone-900/40 rounded-xl border border-stone-800">
                    <span className="text-stone-500 text-xs uppercase tracking-wider">
                      Hâkimiyet Sonrası
                    </span>
                    <EditableText
                      storageKey={`ruler_succ_${ruler.id}`}
                      defaultValue={ruler.successor || "Bilinmiyor"}
                      className="text-stone-300 font-medium mt-1 block"
                      as="p"
                    >
                      {ruler.successor || "Bilinmiyor"}
                    </EditableText>
                  </div>
                </div>
              </div>
            )}

            {/* Events Tab */}
            {activeTab === "events" && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Calendar className="w-5 h-5" style={{ color: accent }} />
                  <EditableText
                    storageKey="tab_events_title"
                    defaultValue="Kronolojik Olaylar"
                    className="text-white font-bold text-lg block"
                    as="h3"
                  >
                    Kronolojik Olaylar
                  </EditableText>
                </div>
                {ruler.keyEvents && ruler.keyEvents.length > 0 ? (
                  <div className="relative border-l-2 border-stone-800 ml-3 space-y-6">
                    {ruler.keyEvents.map((e, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="pl-6 relative"
                      >
                        <span
                          className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-4 bg-stone-950"
                          style={{ borderColor: accent }}
                        />
                        <span
                          className="text-sm font-bold"
                          style={{ color: accent }}
                        >
                          {e.year}
                        </span>
                        <EditableText
                          storageKey={`ruler_event_title_${ruler.id}_${i}`}
                          defaultValue={e.title}
                          className="text-white font-semibold text-base mt-0.5 block"
                          as="p"
                        >
                          {e.title}
                        </EditableText>
                        <EditableText
                          storageKey={`ruler_event_desc_${ruler.id}_${i}`}
                          defaultValue={e.description}
                          className="text-stone-400 text-sm mt-1 leading-relaxed block"
                          as="p"
                        >
                          {e.description}
                        </EditableText>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <EmptyTabMessage tab="Olay" />
                )}
              </div>
            )}

            {/* Battles Tab */}
            {activeTab === "battles" && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Swords className="w-5 h-5" style={{ color: accent }} />
                  <EditableText
                    storageKey="tab_battles_title"
                    defaultValue="Savaşlar"
                    className="text-white font-bold text-lg block"
                    as="h3"
                  >
                    Savaşlar
                  </EditableText>
                </div>
                {ruler.battles && ruler.battles.length > 0 ? (
                  <div className="space-y-4">
                    {ruler.battles.map((b, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="p-4 md:p-5 bg-stone-900/50 rounded-xl border border-stone-800"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <EditableText
                              storageKey={`ruler_battle_name_${ruler.id}_${i}`}
                              defaultValue={b.name}
                              className="text-white font-semibold text-base block"
                              as="p"
                            >
                              {b.name}
                            </EditableText>
                            <EditableText
                              storageKey={`ruler_battle_desc_${ruler.id}_${i}`}
                              defaultValue={b.description || ""}
                              className="text-stone-400 text-sm mt-1 block"
                              as="p"
                            >
                              {b.description}
                            </EditableText>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <span
                              className="text-xs font-bold px-2 py-1 rounded-lg"
                              style={{
                                backgroundColor:
                                  b.result === "victory"
                                    ? "#166534"
                                    : b.result === "defeat"
                                      ? "#7f1d1d"
                                      : `${accent}20`,
                                color:
                                  b.result === "victory"
                                    ? "#86efac"
                                    : b.result === "defeat"
                                      ? "#fca5a5"
                                      : accent,
                              }}
                            >
                              {b.result === "victory"
                                ? "Zafer"
                                : b.result === "defeat"
                                  ? "Mağlubiyet"
                                  : b.result === "draw"
                                    ? "Berabere"
                                    : b.result}
                            </span>
                            <p className="text-stone-500 text-xs mt-1">
                              {b.year}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <EmptyTabMessage tab="Savaş" />
                )}
              </div>
            )}

            {/* People Tab */}
            {activeTab === "people" && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Users className="w-5 h-5" style={{ color: accent }} />
                  <EditableText
                    storageKey="tab_people_title"
                    defaultValue="İlişkili Şahsiyetler"
                    className="text-white font-bold text-lg block"
                    as="h3"
                  >
                    İlişkili Şahsiyetler
                  </EditableText>
                </div>
                {ruler.relatedPeople && ruler.relatedPeople.length > 0 ? (
                  <div className="space-y-4">
                    {ruler.relatedPeople.map((p, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="p-4 md:p-5 bg-stone-900/50 rounded-xl border border-stone-800"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ backgroundColor: `${accent}20` }}
                          >
                            <UserCircle
                              className="w-5 h-5"
                              style={{ color: accent }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <EditableText
                              storageKey={`ruler_pers_name_${ruler.id}_${i}`}
                              defaultValue={p.name}
                              className="text-white font-semibold text-base block"
                              as="p"
                            >
                              {p.name}
                            </EditableText>
                            <EditableText
                              storageKey={`ruler_pers_role_${ruler.id}_${i}`}
                              defaultValue={p.role}
                              className="text-xs font-medium mb-1 block"
                              as="p"
                            >
                              {p.role}
                            </EditableText>
                            <EditableText
                              storageKey={`ruler_pers_desc_${ruler.id}_${i}`}
                              defaultValue={p.description}
                              className="text-stone-400 text-sm leading-relaxed block"
                              as="p"
                            >
                              {p.description}
                            </EditableText>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <EmptyTabMessage tab="Şahsiyet" />
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Side Quote - True randomness based on timestamp */}
      <SideQuote accent={accent} />

      {/* Prev / Next Ruler Navigation */}
      <section className="max-w-4xl mx-auto px-3 md:px-4 pt-6 pb-8">
        <div className="flex items-center justify-between gap-2 md:gap-4">
          {prevRuler ? (
            <button
              onClick={() =>
                navigate(`/tarih/${rawDynastyId}/${prevRuler.id}`)
              }
              className="flex items-center gap-2 md:gap-3 text-left group flex-1 min-w-0"
            >
              <div
                className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:-translate-x-1"
                style={{ backgroundColor: `${accent}20` }}
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" style={{ color: accent }} />
              </div>
              <div className="min-w-0">
                <p className="text-stone-600 text-[9px] md:text-[10px] uppercase tracking-wider hidden sm:block">
                  Önceki Hükümdar
                </p>
                <p className="text-stone-300 text-xs md:text-sm font-medium truncate group-hover:text-white transition-colors">
                  {prevRuler.name}
                </p>
              </div>
            </button>
          ) : (
            <div className="flex-1" />
          )}

          <div className="flex items-center gap-1.5 md:gap-2 px-2 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl bg-stone-900 border border-stone-800 flex-shrink-0">
            <Crown className="w-3 h-3 md:w-4 md:h-4" style={{ color: accent }} />
            <span className="text-stone-400 text-[10px] md:text-xs">
              {ruler.order} / {rulers.length}
            </span>
          </div>

          {nextRuler ? (
            <button
              onClick={() =>
                navigate(`/tarih/${rawDynastyId}/${nextRuler.id}`)
              }
              className="flex items-center gap-2 md:gap-3 text-right group flex-1 min-w-0 justify-end"
            >
              <div className="min-w-0">
                <p className="text-stone-600 text-[9px] md:text-[10px] uppercase tracking-wider hidden sm:block">
                  Sonraki Hükümdar
                </p>
                <p className="text-stone-300 text-xs md:text-sm font-medium truncate group-hover:text-white transition-colors">
                  {nextRuler.name}
                </p>
              </div>
              <div
                className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:translate-x-1"
                style={{ backgroundColor: `${accent}20` }}
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" style={{ color: accent }} />
              </div>
            </button>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </section>
    </div>
  );
}

function EmptyTabMessage({ tab }: { tab: string }) {
  return (
    <div className="p-8 bg-stone-900/30 rounded-xl border border-stone-800/50 text-center">
      <p className="text-stone-500 text-sm">
        Bu hükümdar için {tab} verisi bulunmamaktadır.
      </p>
      <p className="text-stone-600 text-xs mt-2">
        Veriler akademik kaynaklardan derlenmektedir.
      </p>
    </div>
  );
}

/* Side Quote - truly random each render */
function SideQuote({ accent }: { accent: string }) {
  const quote = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * rulerQuotes.length);
    return rulerQuotes[randomIndex];
  }, []);

  return (
    <aside className="fixed top-1/2 -translate-y-1/2 right-4 z-[100] hidden xl:flex flex-col w-56 will-change-transform pointer-events-none">
      <div
        className="bg-stone-900/80 backdrop-blur-md border rounded-2xl p-5 pointer-events-auto"
        style={{ borderColor: `${accent}30` }}
      >
        <Quote className="w-5 h-5 mb-3 opacity-40" style={{ color: accent }} />
        <p className="text-stone-300 text-sm italic leading-relaxed mb-3">
          &ldquo;{quote.text}&rdquo;
        </p>
        <p className="text-stone-500 text-xs">— {quote.source}</p>
      </div>
    </aside>
  );
}
