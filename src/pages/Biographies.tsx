import { useState, useEffect, useMemo, useRef } from "react";
import {
  Search,
  X,
  Quote,
  Calendar,
  Tag,
  User,
  ChevronRight,
  Crown,
  Sword,
  Scale,
  Palette,
  GraduationCap,
  Sparkles,
  BookOpen,
  ArrowLeft,
  Users,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── types ─── */
interface KeyEvent {
  year: string;
  title: string;
  description: string;
}
interface QuoteData {
  text: string;
  source: string;
}
interface RelatedPerson {
  name: string;
  role: string;
  description?: string;
}
interface Figure {
  id: string;
  name: string;
  title: string;
  period: string;
  era: string;
  category: string;
  image: string;
  description: string;
  fullBio: string;
  achievements: string[];
  keyEvents: KeyEvent[];
  quote: QuoteData;
  relatedPeople: RelatedPerson[];
}

/* ─── category config ─── */
interface CatConfig {
  key: string;
  label: string;
  shortLabel: string;
  desc: string;
  icon: typeof Crown;
  color: string;
  bg: string;
  border: string;
  cardBg: string;
  cardBgHover: string;
}

const CATEGORIES: CatConfig[] = [
  {
    key: "savas",
    label: "Savaşçılar",
    shortLabel: "Savaşçı",
    desc: "Efsanevi komutanlar, gaziler, kahramanlar",
    icon: Sword,
    color: "text-red-400",
    bg: "bg-red-500/20",
    border: "border-red-500/50",
    cardBg: "from-red-950/40 to-stone-950",
    cardBgHover: "group-hover:from-red-900/40 group-hover:to-stone-900",
  },
  {
    key: "devlet",
    label: "Devlet Adamları",
    shortLabel: "Devlet Adamı",
    desc: "Padişahlar, sadrazamlar, cumhurbaşkanları",
    icon: Crown,
    color: "text-amber-400",
    bg: "bg-amber-500/20",
    border: "border-amber-500/50",
    cardBg: "from-amber-950/40 to-stone-950",
    cardBgHover: "group-hover:from-amber-900/40 group-hover:to-stone-900",
  },
  {
    key: "alim",
    label: "Alimler & Bilim İnsanları",
    shortLabel: "Alim",
    desc: "Filozoflar, matematikçiler, astronomlar",
    icon: GraduationCap,
    color: "text-sky-400",
    bg: "bg-sky-500/20",
    border: "border-sky-500/50",
    cardBg: "from-sky-950/40 to-stone-950",
    cardBgHover: "group-hover:from-sky-900/40 group-hover:to-stone-900",
  },
  {
    key: "din",
    label: "Din Adamları & Mutasavvıflar",
    shortLabel: "Din Adamı",
    desc: "Veliler, şeyhler, tarikat kurucuları",
    icon: Sparkles,
    color: "text-emerald-400",
    bg: "bg-emerald-500/20",
    border: "border-emerald-500/50",
    cardBg: "from-emerald-950/40 to-stone-950",
    cardBgHover: "group-hover:from-emerald-900/40 group-hover:to-stone-900",
  },
  {
    key: "ozan",
    label: "Ozanlar, Yazarlar & Gazeteciler",
    shortLabel: "Ozan / Yazar",
    desc: "Şairler, romancılar, gazeteciler",
    icon: BookOpen,
    color: "text-violet-400",
    bg: "bg-violet-500/20",
    border: "border-violet-500/50",
    cardBg: "from-violet-950/40 to-stone-950",
    cardBgHover: "group-hover:from-violet-900/40 group-hover:to-stone-900",
  },
  {
    key: "sanat",
    label: "Sanatçılar",
    shortLabel: "Sanatçı",
    desc: "Ressamlar, besteciler, mimarlar",
    icon: Palette,
    color: "text-rose-400",
    bg: "bg-rose-500/20",
    border: "border-rose-500/50",
    cardBg: "from-rose-950/40 to-stone-950",
    cardBgHover: "group-hover:from-rose-900/40 group-hover:to-stone-900",
  },
  {
    key: "kadi",
    label: "Kadılar & Fakihler",
    shortLabel: "Kadı / Fakih",
    desc: "Şeyhülislamlar, büyük hukukçular",
    icon: Scale,
    color: "text-cyan-400",
    bg: "bg-cyan-500/20",
    border: "border-cyan-500/50",
    cardBg: "from-cyan-950/40 to-stone-950",
    cardBgHover: "group-hover:from-cyan-900/40 group-hover:to-stone-900",
  },
];

const catMeta = (key: string) => CATEGORIES.find((c) => c.key === key) ?? CATEGORIES[0];

/* ─── helpers ─── */
const fallbackImg = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1c1917&color=d97706&size=256&font-size=0.35&bold=true`;

const imgUrl = (f: Figure) =>
  f.image && f.image.trim() !== "" ? f.image : fallbackImg(f.name);

/* ─── main component ─── */
export default function Biographies() {
  const [figures, setFigures] = useState<Figure[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"categories" | "figures">("categories");
  const [activeCat, setActiveCat] = useState<string>("");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Figure | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  /* fetch data */
  useEffect(() => {
    fetch("/data/turkish-figures.json")
      .then((r) => r.json())
      .then((data: Figure[]) => {
        setFigures(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  /* Lock body when modal open */
  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  /* Group figures by category */
  const grouped = useMemo(() => {
    const map: Record<string, Figure[]> = {};
    CATEGORIES.forEach((c) => (map[c.key] = []));
    figures.forEach((f) => {
      if (map[f.category]) map[f.category].push(f);
    });
    return map;
  }, [figures]);

  /* Counts per category */
  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    CATEGORIES.forEach((c) => { map[c.key] = grouped[c.key]?.length || 0; });
    return map;
  }, [grouped]);

  /* Active category config */
  const activeCatConfig = useMemo(() => catMeta(activeCat), [activeCat]);

  /* Figures for active category */
  const activeFigures = useMemo(() => {
    if (!activeCat) return [];
    const list = grouped[activeCat] || [];
    const q = search.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.title.toLowerCase().includes(q) ||
        f.era.toLowerCase().includes(q) ||
        f.period.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q)
    );
  }, [grouped, activeCat, search]);

  /* Open a category */
  const openCategory = (key: string) => {
    setActiveCat(key);
    setSearch("");
    setView("figures");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* Go back to categories */
  const goBack = () => {
    setView("categories");
    setActiveCat("");
    setSearch("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ─── loading ─── */
  if (loading) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-stone-400 text-lg">Biyografiler yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 pb-12">

      {/* ═══════════════════════════════════════════
          VIEW 1: CATEGORIES GRID
          ═══════════════════════════════════════════ */}
      <AnimatePresence mode="wait">
        {view === "categories" && (
          <motion.div
            key="categories"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {/* Hero */}
            <section className="relative overflow-hidden bg-stone-900 border-b border-stone-800">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(217,119,6,0.3),transparent_70%)]" />
              </div>
              <div className="relative max-w-6xl mx-auto px-4 py-14 sm:py-18 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-600/10 border border-amber-600/20 mb-5">
                    <Users className="w-4 h-4 text-amber-500" />
                    <span className="text-amber-400 text-sm font-medium">{figures.length > 0 ? `${figures.length} Büyük Biyografi` : "Büyük Biyografiler"}</span>
                  </div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-amber-400 mb-4 tracking-tight">
                    Biyografiler
                  </h1>
                  <p className="text-stone-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
                    2500 yıllık Türk tarihinin iz bırakanları. 
                    <span className="text-stone-300"> Bir kategori seçin, kronolojik olarak keşfedin.</span>
                  </p>
                </motion.div>
              </div>
            </section>

            {/* Category Cards Grid */}
            <div className="max-w-6xl mx-auto px-4 mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {CATEGORIES.map((cat, idx) => {
                  const count = counts[cat.key] || 0;
                  return (
                    <motion.button
                      key={cat.key}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.07 }}
                      onClick={() => openCategory(cat.key)}
                      className={`group relative overflow-hidden rounded-2xl border ${cat.border} bg-stone-900 text-left transition-all duration-300 hover:shadow-xl hover:shadow-amber-900/10 hover:-translate-y-1 hover:scale-[1.02]`}
                    >
                      {/* Gradient bg */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${cat.cardBg} ${cat.cardBgHover} transition-all duration-500`} />

                      <div className="relative p-6 sm:p-8">
                        {/* Icon */}
                        <div
                          className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl border ${cat.bg} ${cat.border} mb-5`}
                        >
                          <cat.icon size={28} className={cat.color} />
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl sm:text-3xl font-bold text-stone-100 mb-2 group-hover:text-amber-400 transition-colors">
                          {cat.label}
                        </h2>

                        {/* Desc */}
                        <p className="text-stone-400 text-sm sm:text-base mb-4 leading-relaxed">
                          {cat.desc}
                        </p>

                        {/* Count + Arrow */}
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-semibold ${cat.color} ${cat.bg} border ${cat.border} px-3 py-1 rounded-full`}>
                            {count} biyografi
                          </span>
                          <ChevronRight
                            size={20}
                            className="text-stone-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all"
                          />
                        </div>
                      </div>

                      {/* Bottom accent bar */}
                      <div className={`absolute bottom-0 left-0 right-0 h-1 ${cat.bg} opacity-50 group-hover:opacity-100 transition-opacity`} />
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* ═══════════════════════════════════════════
            VIEW 2: FIGURES GRID (inside a category)
            ═══════════════════════════════════════════ */}
        {view === "figures" && activeCat && (
          <motion.div
            key="figures"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <section className="relative overflow-hidden bg-stone-900 border-b border-stone-800">
              <div className={`absolute inset-0 bg-gradient-to-br ${activeCatConfig.cardBg} opacity-60`} />
              <div className="relative max-w-7xl mx-auto px-4 py-6 sm:py-8">
                {/* Back button */}
                <button
                  onClick={goBack}
                  className="flex items-center gap-2 text-stone-400 hover:text-amber-400 transition-colors mb-4 text-sm sm:text-base"
                >
                  <ArrowLeft size={18} />
                  <span>Tüm Kategoriler</span>
                </button>

                <div className="flex items-center gap-3 sm:gap-4">
                  <div
                    className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border ${activeCatConfig.bg} ${activeCatConfig.border}`}
                  >
                    <activeCatConfig.icon size={28} className={activeCatConfig.color} />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-4xl font-bold text-stone-100">
                      {activeCatConfig.label}
                    </h1>
                    <p className="text-stone-400 text-sm sm:text-base">
                      {activeFigures.length} biyografi — kronolojik sıra
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <div className="max-w-7xl mx-auto px-2 sm:px-4 mt-6" ref={gridRef}>
              {/* Search */}
              <div className="relative max-w-xl mx-auto mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500" size={20} />
                <input
                  type="text"
                  placeholder={`${activeCatConfig.shortLabel} ara...`}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-10 py-3 bg-stone-900 border border-stone-700 rounded-xl text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-stone-700 text-stone-400 transition-colors"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              {/* Figures Grid */}
              {activeFigures.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-stone-400 text-lg">Arama kriterine uygun biyografi bulunamadı.</p>
                  <button
                    onClick={() => setSearch("")}
                    className="mt-4 px-6 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-medium transition-colors"
                  >
                    Tümünü Göster
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                  {activeFigures.map((figure, idx) => (
                    <motion.article
                      key={figure.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: Math.min(idx * 0.04, 0.4) }}
                      onClick={() => setSelected(figure)}
                      className="group cursor-pointer bg-stone-900 border border-stone-800 rounded-xl overflow-hidden hover:border-stone-600 transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/10 hover:-translate-y-1"
                    >
                      {/* Image */}
                      <div className="relative aspect-[3/4] sm:aspect-[4/3] overflow-hidden bg-stone-800">
                        <img
                          src={imgUrl(figure)}
                          alt={figure.name}
                          loading="lazy"
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = fallbackImg(figure.name);
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/20 to-transparent" />
                        {/* Era badge */}
                        <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-stone-900/80 text-stone-300 border border-stone-700/50">
                          {figure.era}
                        </div>
                        {/* Period badge */}
                        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-amber-600/20 text-amber-400 border border-amber-500/30">
                          <Calendar size={10} />
                          {figure.period}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-3 sm:p-4">
                        <h3 className="text-base sm:text-lg font-bold text-stone-100 group-hover:text-amber-400 transition-colors leading-snug mb-0.5">
                          {figure.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-amber-500/80 font-medium mb-2 leading-snug">
                          {figure.title}
                        </p>
                        <p className="text-xs sm:text-sm text-stone-400 leading-relaxed line-clamp-2">
                          {figure.description}
                        </p>
                        <div className="flex items-center gap-1 mt-2 text-xs sm:text-sm font-medium text-amber-500 group-hover:text-amber-400 transition-colors">
                          <span>Detaylar</span>
                          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Detail Modal ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-10 sm:pt-16 bg-black/70 backdrop-blur-sm overflow-y-auto"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-stone-900 border border-stone-700 rounded-2xl shadow-2xl overflow-hidden mb-10"
            >
              {/* Close */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-800/80 hover:bg-stone-700 text-stone-300 transition-colors"
                aria-label="Kapat"
              >
                <X size={20} />
              </button>

              {/* Header Image */}
              <div className="relative h-56 sm:h-72 overflow-hidden">
                <img
                  src={imgUrl(selected)}
                  alt={selected.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = fallbackImg(selected.name);
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />
                <div className="absolute bottom-4 left-6 right-16">
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border mb-2 bg-stone-800/80 text-amber-400 border-amber-500/30">
                    {(() => {
                      const C = catMeta(selected.category).icon;
                      return <C size={12} />;
                    })()}
                    {catMeta(selected.category).label}
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white">{selected.name}</h2>
                  <p className="text-amber-400 font-medium text-lg mt-1">{selected.title}</p>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6">
                {/* Meta */}
                <div className="flex flex-wrap gap-4 text-sm text-stone-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={16} className="text-amber-500" />
                    <span>{selected.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Tag size={16} className="text-amber-500" />
                    <span>{selected.era}</span>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <h3 className="text-lg font-semibold text-amber-400 mb-2 flex items-center gap-2">
                    <BookOpen size={18} />
                    Biyografi
                  </h3>
                  <p className="text-stone-300 leading-relaxed">{selected.fullBio}</p>
                </div>

                {/* Achievements */}
                {selected.achievements.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-amber-400 mb-3 flex items-center gap-2">
                      <Sparkles size={18} />
                      Başarılar
                    </h3>
                    <ul className="space-y-2">
                      {selected.achievements.map((a, i) => (
                        <li key={i} className="flex items-start gap-2 text-stone-300">
                          <ChevronRight size={16} className="text-amber-500 mt-1 shrink-0" />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Key Events */}
                {selected.keyEvents.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-amber-400 mb-3 flex items-center gap-2">
                      <Calendar size={18} />
                      Önemli Olaylar
                    </h3>
                    <div className="space-y-3">
                      {selected.keyEvents.map((e, i) => (
                        <div
                          key={i}
                          className="flex gap-4 p-3 bg-stone-800/60 border border-stone-700/50 rounded-xl"
                        >
                          <div className="shrink-0 w-24 text-xs font-bold text-amber-400 bg-amber-500/10 rounded-lg px-2 py-1 h-fit text-center">
                            {e.year}
                          </div>
                          <div>
                            <p className="font-semibold text-stone-200 text-sm">{e.title}</p>
                            <p className="text-stone-400 text-sm mt-0.5">{e.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quote */}
                {selected.quote?.text && (
                  <div className="bg-stone-800/50 border border-stone-700/50 rounded-xl p-5">
                    <Quote size={24} className="text-amber-500 mb-2" />
                    <blockquote className="text-stone-200 italic leading-relaxed text-lg">
                      &ldquo;{selected.quote.text}&rdquo;
                    </blockquote>
                    {selected.quote.source && (
                      <cite className="block mt-2 text-amber-400 text-sm not-italic font-medium">
                        — {selected.quote.source}
                      </cite>
                    )}
                  </div>
                )}

                {/* Related People */}
                {selected.relatedPeople.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-amber-400 mb-3 flex items-center gap-2">
                      <Users size={18} />
                      İlişkili Biyografiler
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selected.relatedPeople.map((p, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg"
                        >
                          <User size={14} className="text-amber-500" />
                          <div>
                            <p className="text-sm font-medium text-stone-200">{p.name}</p>
                            <p className="text-xs text-stone-500">{p.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
