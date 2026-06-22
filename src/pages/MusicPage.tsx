import { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, Clock, Users, Music, ExternalLink,
  ChevronDown, ChevronUp, BookOpen, Guitar, Drum,
  Mic, Sparkles, Scroll
} from "lucide-react";

interface Artist { name: string; period?: string; role?: string; specialty?: string; note?: string; style?: string; }
interface KeyWork { name: string; year?: string; period?: string; location?: string; description?: string; note?: string; lyrics?: string; }
interface Instrument { name: string; origin?: string; note?: string; description?: string; materials?: string; }
interface Stanza { stanza: string; text: string; }

interface Section {
  heading: string;
  content: string;
  techniques?: string[];
  materials?: string[];
  characteristics?: string[];
  keyArtists?: Artist[];
  keyWorks?: KeyWork[];
  keyFigures?: Artist[];
  contributions?: string[];
  sources?: { title: string; url?: string; author?: string }[];
  note?: string;
  relatedCulture?: string;
  forms?: string[];
  timeline?: { date: string; event: string }[];
  otherWorks?: string[];
  instruments?: Instrument[];
  lyrics?: Stanza[];
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
interface TimelineEvent { year: string; event: string; }
interface RelatedPage { page: string; url: string; note: string; }
interface Stanza { stanza: string; text: string; }

interface Work {
  id: string;
  title: string;
  category: string;
  composer: string;
  lyricist: string;
  period: string;
  era: string;
  form: string;
  usul?: string;
  makam?: string;
  region?: string;
  description: string;
  lyrics: string[];
  fullLyrics?: Stanza[];
  audio: string | null;
  status?: string;
  source?: string;
}

interface MusicData {
  category: string;
  title: string;
  subtitle: string;
  description: string;
  relatedPages: RelatedPage[];
  periods: Period[];
  timeline: TimelineEvent[];
  sources: { title: string; url?: string; author?: string; type?: string }[];
  works: Work[];
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
            <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider">{period.era}</span>
            <span className="text-xs text-stone-500 flex items-center gap-1"><Clock size={10} />{period.period}</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-stone-100">{period.title}</h2>
        </div>
        {isOpen ? <ChevronUp size={20} className="text-stone-500 shrink-0 ml-3" /> : <ChevronDown size={20} className="text-stone-500 shrink-0 ml-3" />}
      </button>

      {isOpen && (
        <div className="px-5 sm:px-6 pb-6 border-t border-stone-800">
          <p className="text-stone-400 text-sm leading-relaxed mt-4 mb-6">{period.description}</p>

          {period.sections.map((section, si) => (
            <div key={si} className="mb-6 last:mb-0">
              <h3 className="text-base font-bold text-amber-400 mb-3 flex items-center gap-2">
                {section.heading.includes("Kopuz") || section.heading.includes("Enstrüman") ? <Guitar size={16} /> :
                 section.heading.includes("Mehter") || section.heading.includes("Tuğ") ? <Drum size={16} /> :
                 section.heading.includes("Aşık") ? <Mic size={16} /> :
                 section.heading.includes("İstiklal") ? <Scroll size={16} /> : <Music size={16} />}
                {section.heading}
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed mb-4">{section.content}</p>

              {/* Timeline (for İstiklal Marşı) */}
              {section.timeline && section.timeline.length > 0 && (
                <div className="mb-4 bg-stone-800/30 rounded-lg p-3">
                  <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Zaman Çizelgesi</h4>
                  <div className="space-y-1.5">
                    {section.timeline.map((t, ti) => (
                      <div key={ti} className="flex items-start gap-2 text-sm">
                        <span className="text-amber-500 font-medium shrink-0">{t.date}</span>
                        <span className="text-stone-400">{t.event}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Characteristics */}
              {section.characteristics && section.characteristics.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Özellikler</h4>
                  <ul className="space-y-1.5">
                    {section.characteristics.map((c, ci) => (
                      <li key={ci} className="flex items-start gap-2 text-sm text-stone-400">
                        <Sparkles size={12} className="text-amber-600 shrink-0 mt-1" />{c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Forms (Halk Müziği) */}
              {section.forms && section.forms.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Müzik Formları</h4>
                  <div className="space-y-1.5">
                    {section.forms.map((f, fi) => (
                      <div key={fi} className="flex items-start gap-2 text-sm text-stone-400">
                        <Music size={12} className="text-amber-600 shrink-0 mt-1" />{f}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Instruments */}
              {section.instruments && section.instruments.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Guitar size={12} />Çalgılar
                  </h4>
                  <div className="space-y-3">
                    {section.instruments.map((i, ii) => (
                      <div key={ii} className="bg-stone-800/50 rounded-lg p-4 border border-stone-800">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-bold text-stone-200 text-sm">{i.name}</div>
                          {i.origin && <div className="text-xs text-amber-500">{i.origin}</div>}
                        </div>
                        {i.description && <p className="text-xs text-stone-300 leading-relaxed mb-2">{i.description}</p>}
                        {i.materials && (
                          <p className="text-xs text-stone-500">
                            <span className="text-amber-700">Malzeme: </span>{i.materials}
                          </p>
                        )}
                        {i.note && !i.description && <p className="text-xs text-stone-500 mt-1">{i.note}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Artists */}
              {section.keyArtists && section.keyArtists.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-1.5"><Users size={12} />Önemli Sanatçılar</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {section.keyArtists.map((a, ai) => (
                      <div key={ai} className="bg-stone-800/50 rounded-lg p-3">
                        <div className="font-medium text-stone-200 text-sm">{a.name}</div>
                        <div className="text-xs text-stone-500 mt-0.5">
                          {a.period && <span>{a.period}</span>}
                          {a.role && <span className="text-amber-600"> • {a.role}</span>}
                          {a.specialty && <span> • {a.specialty}</span>}
                        </div>
                        {a.note && <p className="text-xs text-stone-500 mt-1 italic">{a.note}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Figures (Aşık) */}
              {section.keyFigures && section.keyFigures.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-1.5"><Users size={12} />Önemli İsimler</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {section.keyFigures.map((f, fi) => (
                      <div key={fi} className="bg-stone-800/50 rounded-lg p-3">
                        <div className="font-medium text-stone-200 text-sm">{f.name}</div>
                        {f.period && <div className="text-xs text-stone-500">{f.period}</div>}
                        {f.note && <p className="text-xs text-stone-500 mt-1 italic">{f.note}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Works / Marşlar */}
              {section.keyWorks && section.keyWorks.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Önemli Eserler</h4>
                  <div className="space-y-3">
                    {section.keyWorks.map((w, wi) => (
                      <div key={wi} className="bg-stone-800/50 rounded-lg p-4 border border-stone-800">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-stone-200 text-sm">{w.name}</span>
                          {w.year && <span className="text-xs text-amber-500">({w.year})</span>}
                        </div>
                        {w.note && <p className="text-xs text-stone-400 mb-2">{w.note}</p>}
                        {w.lyrics && (
                          <div className="bg-stone-900/60 rounded p-3 border-l-2 border-amber-700">
                            <p className="text-xs text-stone-300 italic leading-relaxed whitespace-pre-line">{w.lyrics}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Other Works */}
              {section.otherWorks && section.otherWorks.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Diğer Eserleri</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {section.otherWorks.map((w, wi) => (
                      <span key={wi} className="text-xs bg-stone-700 text-stone-300 px-2 py-0.5 rounded">{w}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Lyrics (İstiklal Marşı Stanzaları) */}
              {section.lyrics && section.lyrics.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-amber-500 uppercase tracking-wider mb-3">Sözler</h4>
                  <div className="space-y-3">
                    {section.lyrics.map((l, li) => (
                      <div key={li} className="bg-stone-900/60 rounded-lg p-4 border border-stone-800">
                        <div className="text-xs font-bold text-amber-600 mb-2">{l.stanza}</div>
                        <p className="text-sm text-stone-200 leading-relaxed italic whitespace-pre-line">{l.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Note */}
              {section.note && (
                <div className="bg-amber-900/10 border border-amber-800/20 rounded-lg p-3 mb-4">
                  <p className="text-xs text-amber-400 italic">{section.note}</p>
                </div>
              )}

              {/* Section Sources */}
              {section.sources && section.sources.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {section.sources.map((s, si) => (
                    <a key={si} href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-amber-600 hover:text-amber-400 transition-colors">
                      <ExternalLink size={10} />{s.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Period Sources */}
          {period.sources && period.sources.length > 0 && (
            <div className="mt-4 pt-4 border-t border-stone-800">
              <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Kaynaklar</h4>
              <div className="flex flex-wrap gap-3">
                {period.sources.map((s, si) => (
                  <a key={si} href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-amber-600 hover:text-amber-400 transition-colors">
                    <ExternalLink size={10} />{s.title}
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

function WorksSection({ works }: { works: Work[] }) {
  const [expandedWork, setExpandedWork] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("Tümü");

  const categories = ["Tümü", ...Array.from(new Set(works.map(w => w.category)))];
  const filtered = activeCategory === "Tümü" ? works : works.filter(w => w.category === activeCategory);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
      <h2 className="text-2xl font-bold text-amber-400 mb-6 flex items-center gap-2">
        <Music size={22} />
        Eserler ve Besteler
        <span className="text-sm font-normal text-stone-500 ml-2">({works.length} eser)</span>
      </h2>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeCategory === cat
                ? "bg-amber-600 text-white"
                : "bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-stone-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Works Grid */}
      <div className="grid grid-cols-1 gap-4 max-w-3xl">
        {filtered.map((work, index) => {
          const isOpen = expandedWork === work.id;
          return (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden hover:border-amber-800/40 transition-colors"
            >
              {/* Work Header */}
              <button
                onClick={() => setExpandedWork(isOpen ? null : work.id)}
                className="w-full flex items-start justify-between p-4 text-left"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-semibold text-amber-500 uppercase tracking-wider bg-amber-900/20 px-1.5 py-0.5 rounded">
                      {work.category}
                    </span>
                    {work.makam && (
                      <span className="text-[10px] text-stone-500 bg-stone-800 px-1.5 py-0.5 rounded">
                        {work.makam}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-stone-100">{work.title}</h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-1 text-xs text-stone-500">
                    <span><span className="text-amber-600">Bestekâr:</span> {work.composer}</span>
                    {work.usul && <span><span className="text-amber-600">Usul:</span> {work.usul}</span>}
                  </div>
                </div>
                {isOpen ? <ChevronUp size={18} className="text-stone-500 shrink-0 ml-2 mt-1" /> : <ChevronDown size={18} className="text-stone-500 shrink-0 ml-2 mt-1" />}
              </button>

              {/* Expanded Content */}
              {isOpen && (
                <div className="px-4 pb-4 border-t border-stone-800 pt-3">
                  {/* Audio Player Placeholder */}
                  <div className="flex items-center gap-3 bg-stone-800/50 rounded-lg p-3 mb-3 border border-stone-700/50">
                    <div className="w-10 h-10 rounded-full bg-amber-900/30 border border-amber-700/30 flex items-center justify-center shrink-0">
                      <Music size={16} className="text-amber-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-stone-300">{work.title}</div>
                      <div className="text-[10px] text-stone-500">{work.composer}</div>
                    </div>
                    <span className="text-[10px] text-stone-600 bg-stone-800 px-2 py-0.5 rounded-full shrink-0">
                      Yakında
                    </span>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {work.lyricist && work.lyricist !== "Müzik eseri (sözsüz)" && (
                      <div className="bg-stone-800/30 rounded p-2">
                        <div className="text-[10px] text-stone-500 uppercase">Söz Yazarı</div>
                        <div className="text-xs text-stone-300">{work.lyricist}</div>
                      </div>
                    )}
                    {work.form && (
                      <div className="bg-stone-800/30 rounded p-2">
                        <div className="text-[10px] text-stone-500 uppercase">Form</div>
                        <div className="text-xs text-stone-300">{work.form}</div>
                      </div>
                    )}
                    {work.period && (
                      <div className="bg-stone-800/30 rounded p-2">
                        <div className="text-[10px] text-stone-500 uppercase">Dönem</div>
                        <div className="text-xs text-stone-300">{work.period}</div>
                      </div>
                    )}
                    {work.era && (
                      <div className="bg-stone-800/30 rounded p-2">
                        <div className="text-[10px] text-stone-500 uppercase">Tarih</div>
                        <div className="text-xs text-stone-300">{work.era}</div>
                      </div>
                    )}
                    {work.region && (
                      <div className="bg-stone-800/30 rounded p-2">
                        <div className="text-[10px] text-stone-500 uppercase">Yöre</div>
                        <div className="text-xs text-stone-300">{work.region}</div>
                      </div>
                    )}
                  </div>

                  {work.description && (
                    <p className="text-xs text-stone-400 leading-relaxed mb-3">{work.description}</p>
                  )}

                  {/* Source */}
                  {work.source && (
                    <div className="mt-3 pt-3 border-t border-stone-800">
                      <p className="text-[10px] text-stone-600">
                        <span className="text-amber-700">Kaynak: </span>{work.source}
                      </p>
                    </div>
                  )}

              {/* Lyrics - Sözlü/Sözsüz ayrımı */}
                  {(!work.lyrics || work.lyrics.length === 0) && (!work.fullLyrics || work.fullLyrics.length === 0) ? (
                    <div className="bg-stone-800/30 rounded-lg p-3 border-l-2 border-stone-600">
                      <div className="flex items-center gap-2 mb-1">
                        <Music size={12} className="text-stone-500" />
                        <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">SÖZSÜZ ENSTRÜMANTAL ESER</span>
                      </div>
                      <p className="text-xs text-stone-500 italic">Bu eserin sözleri yoktur. Enstrümantal olarak icra edilir.</p>
                    </div>
                  ) : work.fullLyrics && work.fullLyrics.length > 0 ? (
                    <div className="space-y-2">
                      {work.fullLyrics.map((l, li) => (
                        <div key={li} className="bg-stone-800/30 rounded-lg p-3 border-l-2 border-amber-700/50">
                          <div className="text-[10px] font-bold text-amber-600 mb-1">{l.stanza}</div>
                          <p className="text-xs text-stone-300 italic leading-relaxed whitespace-pre-line">{l.text}</p>
                        </div>
                      ))}
                    </div>
                  ) : work.lyrics && work.lyrics.length > 0 ? (
                    <div className="space-y-2">
                      <div className="text-[10px] font-bold text-amber-600 mb-1 uppercase tracking-wider">Sözler</div>
                      {(() => {
                        const stanzas: string[][] = [];
                        let current: string[] = [];
                        work.lyrics.forEach((line) => {
                          if (line === "" && current.length > 0) {
                            stanzas.push(current);
                            current = [];
                          } else if (line !== "") {
                            current.push(line);
                          }
                        });
                        if (current.length > 0) stanzas.push(current);
                        return stanzas.map((stanza, si) => (
                          <div key={si} className="bg-stone-800/30 rounded-lg p-3 border-l-2 border-amber-700/50">
                            <div className="text-[10px] font-semibold text-amber-700 mb-1.5">
                              {si + 1}. Kıta
                            </div>
                            {stanza.map((line, li) => (
                              <p key={li} className="text-xs text-stone-300 italic leading-relaxed">
                                {line}
                              </p>
                            ))}
                          </div>
                        ));
                      })()}
                    </div>
                  ) : null}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

function MusicPage() {
  const [data, setData] = useState<MusicData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/art/music.json")
      .then((r) => r.json())
      .then((d: MusicData) => { setData(d); setLoading(false); })
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
              <pattern id="mu-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="#d97706" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mu-pattern)" />
          </svg>
        </div>
        <div className="relative max-w-5xl mx-auto px-4 py-12">
          <Link to="/sanat" className="inline-flex items-center gap-2 text-stone-500 hover:text-amber-400 transition-colors text-sm mb-6">
            <ArrowLeft size={16} />Sanat'a Dön
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-amber-900/30 border border-amber-700/30 flex items-center justify-center">
                <Music size={24} className="text-amber-400" />
              </div>
              <div>
                <div className="text-xs text-amber-500 font-medium uppercase tracking-wider">{data.category}</div>
                <h1 className="text-3xl sm:text-4xl font-bold text-stone-100">{data.title}</h1>
              </div>
            </div>
            <p className="text-stone-400 text-lg max-w-2xl leading-relaxed">{data.subtitle}</p>
            <p className="text-stone-500 text-sm mt-3 max-w-2xl leading-relaxed">{data.description}</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Related Pages */}
        {data.relatedPages && data.relatedPages.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-amber-900/10 border border-amber-800/20 rounded-xl p-4 mb-8">
            <h3 className="text-xs font-semibold text-amber-500 uppercase tracking-wider mb-3">İlgili Sayfalar</h3>
            {data.relatedPages.map((rp, ri) => (
              <Link key={ri} to={rp.url} className="flex items-start gap-3 p-3 rounded-lg bg-stone-900/50 hover:bg-stone-800 transition-colors group">
                <BookOpen size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-stone-200 group-hover:text-amber-400 transition-colors">{rp.page}</div>
                  <p className="text-xs text-stone-500 mt-0.5">{rp.note}</p>
                </div>
              </Link>
            ))}
          </motion.div>
        )}

        {/* Periods */}
        <div className="space-y-4 mb-12">
          {data.periods.map((period, index) => (
            <PeriodSection key={period.id} period={period} index={index} />
          ))}
        </div>

        {/* Works */}
        {data.works && data.works.length > 0 && <WorksSection works={data.works} />}

        {/* Timeline */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-stone-900 border border-stone-800 rounded-xl p-5 sm:p-6 mb-12">
          <h2 className="text-lg font-bold text-amber-400 mb-6 flex items-center gap-2"><Clock size={18} />Kronoloji</h2>
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-stone-900 border border-stone-800 rounded-xl p-5 sm:p-6">
          <h2 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2"><ExternalLink size={18} />Kaynaklar</h2>
          <div className="space-y-2">
            {data.sources.map((s, si) => (
              <a key={si} href={s.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-sm text-stone-400 hover:text-amber-400 transition-colors">
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

export default memo(MusicPage);
