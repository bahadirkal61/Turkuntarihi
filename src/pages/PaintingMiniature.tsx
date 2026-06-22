import { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, Clock, Users, Brush, ExternalLink,
  ChevronDown, ChevronUp, BookOpen, Scroll, Sparkles
} from "lucide-react";

interface Artist {
  name: string;
  period?: string;
  role?: string;
  specialty?: string;
  style?: string;
  note?: string;
}

interface KeyWork {
  name: string;
  year?: string;
  period?: string;
  location?: string;
  description?: string;
  note?: string;
}

interface Section {
  heading: string;
  content: string;
  techniques?: string[];
  materials?: string[];
  characteristics?: string[];
  keyArtists?: Artist[];
  keyWorks?: KeyWork[];
  contributions?: string[];
  sources?: { title: string; url?: string; author?: string }[];
  note?: string;
  relatedCulture?: string;
}

interface Period {
  id: string;
  era: string;
  period: string;
  title: string;
  description: string;
  sections: Section[];
  sources?: { title: string; url?: string; author?: string }[];
}

interface TimelineEvent {
  year: string;
  event: string;
}

interface RelatedPage {
  page: string;
  url: string;
  note: string;
}

interface PaintingData {
  category: string;
  title: string;
  subtitle: string;
  description: string;
  relatedPages: RelatedPage[];
  periods: Period[];
  timeline: TimelineEvent[];
  sources: { title: string; url?: string; author?: string; type?: string }[];
}

function PeriodSection({ period, index }: { period: Period; index: number }) {
  const [isOpen, setIsOpen] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-stone-800/50 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider">
              {period.era}
            </span>
            <span className="text-xs text-stone-500 flex items-center gap-1">
              <Clock size={10} />
              {period.period}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-stone-100">{period.title}</h2>
        </div>
        {isOpen ? (
          <ChevronUp size={20} className="text-stone-500 shrink-0 ml-3" />
        ) : (
          <ChevronDown size={20} className="text-stone-500 shrink-0 ml-3" />
        )}
      </button>

      {isOpen && (
        <div className="px-5 sm:px-6 pb-6 border-t border-stone-800">
          <p className="text-stone-400 text-sm leading-relaxed mt-4 mb-6">
            {period.description}
          </p>

          {period.sections.map((section, si) => (
            <div key={si} className="mb-6 last:mb-0">
              <h3 className="text-base font-bold text-amber-400 mb-3 flex items-center gap-2">
                <Brush size={16} />
                {section.heading}
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed mb-4">
                {section.content}
              </p>

              {/* Characteristics */}
              {section.characteristics && section.characteristics.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                    Özellikler
                  </h4>
                  <ul className="space-y-1.5">
                    {section.characteristics.map((c, ci) => (
                      <li key={ci} className="flex items-start gap-2 text-sm text-stone-400">
                        <Sparkles size={12} className="text-amber-600 shrink-0 mt-1" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Techniques & Materials */}
              {(section.techniques || section.materials) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {section.techniques && (
                    <div className="bg-stone-800/50 rounded-lg p-3">
                      <h4 className="text-xs font-semibold text-stone-500 uppercase mb-2">Teknikler</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {section.techniques.map((t, ti) => (
                          <span key={ti} className="text-xs bg-stone-700 text-stone-300 px-2 py-0.5 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {section.materials && (
                    <div className="bg-stone-800/50 rounded-lg p-3">
                      <h4 className="text-xs font-semibold text-stone-500 uppercase mb-2">Malzemeler</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {section.materials.map((m, mi) => (
                          <span key={mi} className="text-xs bg-stone-700 text-stone-300 px-2 py-0.5 rounded">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Key Artists */}
              {section.keyArtists && section.keyArtists.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Users size={12} />
                    Önemli Sanatçılar
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {section.keyArtists.map((a, ai) => (
                      <div key={ai} className="bg-stone-800/50 rounded-lg p-3">
                        <div className="font-medium text-stone-200 text-sm">{a.name}</div>
                        <div className="text-xs text-stone-500 mt-0.5">
                          {a.period && <span>{a.period}</span>}
                          {a.role && <span className="text-amber-600"> • {a.role}</span>}
                          {a.specialty && <span> • {a.specialty}</span>}
                          {a.style && <span> • {a.style}</span>}
                        </div>
                        {a.note && <p className="text-xs text-stone-500 mt-1 italic">{a.note}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Works */}
              {section.keyWorks && section.keyWorks.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                    Önemli Eserler
                  </h4>
                  <div className="space-y-2">
                    {section.keyWorks.map((w, wi) => (
                      <div key={wi} className="bg-stone-800/50 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-stone-200 text-sm">{w.name}</span>
                          {w.year && <span className="text-xs text-amber-500">({w.year})</span>}
                          {w.period && <span className="text-xs text-amber-500">({w.period})</span>}
                        </div>
                        {w.location && <p className="text-xs text-stone-500 mt-0.5">{w.location}</p>}
                        {w.description && <p className="text-xs text-stone-400 mt-1">{w.description}</p>}
                        {w.note && <p className="text-xs text-stone-500 mt-1 italic">{w.note}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contributions */}
              {section.contributions && section.contributions.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                    Katkıları
                  </h4>
                  <ul className="space-y-1.5">
                    {section.contributions.map((c, ci) => (
                      <li key={ci} className="flex items-start gap-2 text-sm text-stone-400">
                        <Sparkles size={12} className="text-amber-600 shrink-0 mt-1" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Note */}
              {section.note && (
                <div className="bg-amber-900/10 border border-amber-800/20 rounded-lg p-3 mb-4">
                  <p className="text-xs text-amber-400 italic">{section.note}</p>
                </div>
              )}

              {/* Related Culture */}
              {section.relatedCulture && (
                <div className="bg-stone-800/30 rounded-lg p-3 mb-4">
                  <p className="text-xs text-stone-500 italic">{section.relatedCulture}</p>
                </div>
              )}

              {/* Section Sources */}
              {section.sources && section.sources.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {section.sources.map((s, si) => (
                    <a
                      key={si}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-amber-600 hover:text-amber-400 transition-colors"
                    >
                      <ExternalLink size={10} />
                      {s.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Period Sources */}
          {period.sources && period.sources.length > 0 && (
            <div className="mt-4 pt-4 border-t border-stone-800">
              <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                Kaynaklar
              </h4>
              <div className="flex flex-wrap gap-3">
                {period.sources.map((s, si) => (
                  <a
                    key={si}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-amber-600 hover:text-amber-400 transition-colors"
                  >
                    <ExternalLink size={10} />
                    {s.title}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}

function PaintingMiniature() {
  const [data, setData] = useState<PaintingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/art/painting-miniature.json")
      .then((r) => r.json())
      .then((d: PaintingData) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center">
        <div className="w-8 h-8 border-[3px] border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      {/* Hero */}
      <section className="relative bg-stone-900 border-b border-stone-800 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="pm-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="#d97706" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pm-pattern)" />
          </svg>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 py-12">
          <Link
            to="/sanat"
            className="inline-flex items-center gap-2 text-stone-500 hover:text-amber-400 transition-colors text-sm mb-6"
          >
            <ArrowLeft size={16} />
            Sanat'a Dön
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-amber-900/30 border border-amber-700/30 flex items-center justify-center">
                <Brush size={24} className="text-amber-400" />
              </div>
              <div>
                <div className="text-xs text-amber-500 font-medium uppercase tracking-wider">
                  {data.category}
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-stone-100">{data.title}</h1>
              </div>
            </div>
            <p className="text-stone-400 text-lg max-w-2xl leading-relaxed">
              {data.subtitle}
            </p>
            <p className="text-stone-500 text-sm mt-3 max-w-2xl leading-relaxed">
              {data.description}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Related Pages Banner */}
        {data.relatedPages && data.relatedPages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-amber-900/10 border border-amber-800/20 rounded-xl p-4 mb-8"
          >
            <h3 className="text-xs font-semibold text-amber-500 uppercase tracking-wider mb-3">
              İlgili Sayfalar
            </h3>
            <div className="space-y-2">
              {data.relatedPages.map((rp, ri) => (
                <Link
                  key={ri}
                  to={rp.url}
                  className="flex items-start gap-3 p-3 rounded-lg bg-stone-900/50 hover:bg-stone-800 transition-colors group"
                >
                  {ri === 0 ? <Scroll size={16} className="text-amber-500 shrink-0 mt-0.5" /> : <BookOpen size={16} className="text-amber-500 shrink-0 mt-0.5" />}
                  <div>
                    <div className="text-sm font-medium text-stone-200 group-hover:text-amber-400 transition-colors">
                      {rp.page}
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5">{rp.note}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* Periods */}
        <div className="space-y-4 mb-12">
          {data.periods.map((period, index) => (
            <PeriodSection key={period.id} period={period} index={index} />
          ))}
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-stone-900 border border-stone-800 rounded-xl p-5 sm:p-6 mb-12"
        >
          <h2 className="text-lg font-bold text-amber-400 mb-6 flex items-center gap-2">
            <Clock size={18} />
            Kronoloji
          </h2>
          <div className="relative">
            <div className="absolute left-3 top-0 bottom-0 w-px bg-stone-800" />
            <div className="space-y-4">
              {data.timeline.map((t, ti) => (
                <div key={ti} className="flex items-start gap-4 relative">
                  <div className="w-6 h-6 rounded-full bg-amber-900/40 border border-amber-700/40 shrink-0 flex items-center justify-center relative z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-amber-500">{t.year}</span>
                    <p className="text-sm text-stone-300 mt-0.5">{t.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-stone-900 border border-stone-800 rounded-xl p-5 sm:p-6"
        >
          <h2 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
            <ExternalLink size={18} />
            Kaynaklar
          </h2>
          <div className="space-y-2">
            {data.sources.map((s, si) => (
              <a
                key={si}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-sm text-stone-400 hover:text-amber-400 transition-colors"
              >
                <ExternalLink size={12} className="shrink-0 mt-1" />
                <div>
                  <span>{s.title}</span>
                  {s.author && <span className="text-stone-500"> — {s.author}</span>}
                  {s.type && <span className="text-xs text-stone-600 ml-1">({s.type})</span>}
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default memo(PaintingMiniature);
