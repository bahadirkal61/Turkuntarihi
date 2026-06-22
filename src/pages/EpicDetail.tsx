import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock, Globe, FileText, ArrowLeft, User, Scroll } from "lucide-react";
import SEO from "../components/SEO";
import SchemaOrg from "../components/SchemaOrg";

interface Epic {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  period: string;
  origin: string;
  description: string;
  image: string;
  verses?: string;
  pages?: number;
  originalText?: string[];
  fullText?: string[];
  summary?: string[];
  characters?: { name: string; role: string }[];
  themes?: string[];
}

type TabId = "original" | "transcription" | "summary";

const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "original", label: "Orijinal Metin", icon: Scroll },
  { id: "transcription", label: "Tam Metin", icon: FileText },
  { id: "summary", label: "Özet", icon: BookOpen },
];

export default function EpicDetail() {
  const { epicId } = useParams<{ epicId: string }>();
  const [epic, setEpic] = useState<Epic | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>("summary");

  useEffect(() => {
    fetch("/data/epics.json")
      .then((r) => r.json())
      .then((data: { epics: Epic[] }) => {
        const found = data.epics.find((e) => e.id === epicId);
        setEpic(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [epicId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center">
        <div className="w-10 h-10 border-[3px] border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!epic) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center text-stone-400">
        <div className="text-center">
          <BookOpen className="w-12 h-12 mx-auto mb-4 text-stone-600" />
          <p className="text-lg">Destan bulunamadı.</p>
          <Link to="/destanlar" className="text-amber-400 hover:text-amber-300 mt-4 inline-block">
            ← Destanlara Dön
          </Link>
        </div>
      </div>
    );
  }

  const hasOriginal = epic.originalText && epic.originalText.length > 0;
  const hasTranscription = epic.fullText && epic.fullText.length > 0;
  const hasSummary = epic.summary && epic.summary.length > 0;

  return (
    <>
      <SEO
        title={epic.title}
        description={epic.description}
        canonical={`/destanlar/${epic.id}`}
        type="article"
      />
      <SchemaOrg
        breadcrumbs={[
          { name: "Ana Sayfa", url: "/" },
          { name: "Destanlar", url: "/destanlar" },
          { name: epic.title, url: `/destanlar/${epic.id}` },
        ]}
        article={{
          headline: epic.title,
          description: epic.description,
        }}
      />

      <div className="min-h-screen bg-stone-950">
        {/* Hero */}
        <section className="relative">
          <div className="absolute inset-0 h-[50vh] overflow-hidden">
            <img
              src={epic.image}
              alt={epic.title}
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 pt-8 pb-12">
            <Link
              to="/destanlar"
              className="inline-flex items-center gap-2 text-stone-400 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Destanlar</span>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">
                  Destan #{epic.order}
                </span>
                <span className="text-stone-600">|</span>
                <span className="flex items-center gap-1 text-xs text-stone-400">
                  <Clock className="w-3 h-3" /> {epic.period}
                </span>
                <span className="text-stone-600">|</span>
                <span className="flex items-center gap-1 text-xs text-stone-400">
                  <Globe className="w-3 h-3" /> {epic.origin}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
                {epic.title}
              </h1>
              <p className="text-amber-400 text-lg mb-2">{epic.subtitle}</p>
              <p className="text-stone-300 max-w-2xl leading-relaxed">
                {epic.description}
              </p>

              <div className="flex flex-wrap gap-3 mt-6">
                {epic.verses && (
                  <span className="flex items-center gap-1 text-xs text-stone-400 bg-stone-900/60 px-3 py-1.5 rounded-full border border-stone-800">
                    <FileText className="w-3 h-3" /> {epic.verses}
                  </span>
                )}
                {epic.pages && (
                  <span className="flex items-center gap-1 text-xs text-stone-400 bg-stone-900/60 px-3 py-1.5 rounded-full border border-stone-800">
                    <BookOpen className="w-3 h-3" /> {epic.pages} sayfa
                  </span>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-4xl mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Tabs */}
              {(hasOriginal || hasTranscription || hasSummary) && (
                <div className="flex gap-2 mb-6 -mx-4 px-4">
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
                    {TABS.map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeTab === tab.id;
                      const hasContent =
                        (tab.id === "original" && hasOriginal) ||
                        (tab.id === "transcription" && hasTranscription) ||
                        (tab.id === "summary" && hasSummary);
                      return (
                        <button
                          key={tab.id}
                          onClick={() => hasContent && setActiveTab(tab.id)}
                          disabled={!hasContent}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all snap-start flex-shrink-0 border ${
                            !hasContent
                              ? "opacity-30 cursor-not-allowed text-stone-500 border-stone-800"
                              : isActive
                                ? "text-white border-transparent shadow-lg bg-amber-600"
                                : "text-stone-400 border-stone-800 hover:text-stone-200 hover:border-stone-700"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Original Text Tab */}
              {activeTab === "original" && hasOriginal && (
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
                    <Scroll className="w-5 h-5" />
                    Orijinal Metin
                  </h2>
                  <div className="bg-stone-900/50 border border-stone-800 rounded-2xl p-6 md:p-8 max-h-[600px] overflow-y-auto">
                    {epic.originalText!.map((line, i) => (
                      <p key={i} className="text-stone-300 leading-loose font-mono text-sm">
                        {line}
                      </p>
                    ))}
                  </div>
                </motion.article>
              )}

              {/* Transcription/Full Text Tab */}
              {activeTab === "transcription" && hasTranscription && (
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Tam Metin
                  </h2>
                  <div className="bg-stone-900/50 border border-stone-800 rounded-2xl p-6 md:p-8 space-y-4 max-h-[600px] overflow-y-auto">
                    {epic.fullText!.map((line, i) => (
                      <p key={i} className="text-stone-300 leading-loose">
                        {line}
                      </p>
                    ))}
                  </div>
                </motion.article>
              )}

              {/* Summary Tab */}
              {activeTab === "summary" && hasSummary && (
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Özet
                  </h2>
                  <div className="space-y-3">
                    {epic.summary!.map((paragraph, i) => (
                      <p key={i} className="text-stone-300 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </motion.article>
              )}

              {/* No content message */}
              {!hasOriginal && !hasTranscription && !hasSummary && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-amber-900/10 border border-amber-800/20 rounded-2xl p-8 text-center"
                >
                  <BookOpen className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                  <h2 className="text-lg font-bold text-amber-400 mb-2">
                    Tam Metin Yakında
                  </h2>
                  <p className="text-stone-400 text-sm">
                    Bu destanın tam metni akademik kaynaklardan derlenmektedir.
                    Yakında yayında olacaktır.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Characters */}
              {epic.characters && epic.characters.length > 0 && (
                <div className="bg-stone-900/50 border border-stone-800 rounded-2xl p-5">
                  <h3 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Karakterler
                  </h3>
                  <div className="space-y-3">
                    {epic.characters.map((char, i) => (
                      <div
                        key={i}
                        className="pb-3 border-b border-stone-800/50 last:border-0 last:pb-0"
                      >
                        <p className="text-white font-medium text-sm">
                          {char.name}
                        </p>
                        <p className="text-stone-500 text-xs">{char.role}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Themes */}
              {epic.themes && epic.themes.length > 0 && (
                <div className="bg-stone-900/50 border border-stone-800 rounded-2xl p-5">
                  <h3 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-4">
                    Temalar
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {epic.themes.map((theme, i) => (
                      <span
                        key={i}
                        className="text-xs bg-amber-900/20 text-amber-400 border border-amber-800/30 px-2.5 py-1 rounded-full"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="bg-stone-900/50 border border-stone-800 rounded-2xl p-5">
                <Link
                  to="/destanlar"
                  className="flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Tüm Destanlar
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </>
  );
}
