import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Scroll, MapPin, User, Calendar, ArrowLeft, Languages, FileText } from "lucide-react";
import SEO from "../components/SEO";
import SchemaOrg from "../components/SchemaOrg";

interface Inscription {
  id: string;
  order: number;
  name: string;
  title: string;
  year: string;
  location: string;
  discoverer: string;
  description: string;
  image: string;
  script?: string;
  language?: string;
  originalText?: string | string[];
  fullText?: string[];
  translation?: string[];
  significance?: string[];
  dimensions?: string;
  material?: string;
  currentLocation?: string;
}

type TabId = "original" | "translation";

const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "original", label: "Orijinal Metin", icon: Scroll },
  { id: "translation", label: "Günümüz Türkçesi", icon: FileText },
];

export default function InscriptionDetail() {
  const { inscriptionId } = useParams<{ inscriptionId: string }>();
  const [inscription, setInscription] = useState<Inscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>("original");

  useEffect(() => {
    fetch("/data/inscriptions.json")
      .then((r) => r.json())
      .then((data: { inscriptions: Inscription[] }) => {
        const found = data.inscriptions.find((i) => i.id === inscriptionId);
        setInscription(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [inscriptionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center">
        <div className="w-10 h-10 border-[3px] border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!inscription) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center text-stone-400">
        <div className="text-center">
          <Scroll className="w-12 h-12 mx-auto mb-4 text-stone-600" />
          <p className="text-lg">Yazıt bulunamadı.</p>
          <Link to="/yazitlar" className="text-amber-400 hover:text-amber-300 mt-4 inline-block">
            ← Yazıtlara Dön
          </Link>
        </div>
      </div>
    );
  }

  const hasOriginal = inscription.originalText || (inscription.fullText && inscription.fullText.length > 0);
  const hasTranslation = inscription.translation && inscription.translation.length > 0;

  return (
    <>
      <SEO
        title={inscription.name}
        description={inscription.description}
        canonical={`/yazitlar/${inscription.id}`}
        type="article"
      />
      <SchemaOrg
        breadcrumbs={[
          { name: "Ana Sayfa", url: "/" },
          { name: "Yazıtlar", url: "/yazitlar" },
          { name: inscription.name, url: `/yazitlar/${inscription.id}` },
        ]}
        article={{
          headline: inscription.name,
          description: inscription.description,
        }}
      />

      <div className="min-h-screen bg-stone-950">
        {/* Hero */}
        <section className="relative">
          <div className="absolute inset-0 h-[50vh] overflow-hidden">
            <img
              src={inscription.image}
              alt={inscription.name}
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 pt-8 pb-12">
            <Link
              to="/yazitlar"
              className="inline-flex items-center gap-2 text-stone-400 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Yazıtlar</span>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">
                  Yazıt #{inscription.order}
                </span>
                <span className="text-stone-600">|</span>
                <span className="flex items-center gap-1 text-xs text-stone-400">
                  <Calendar className="w-3 h-3" /> {inscription.year}
                </span>
                <span className="text-stone-600">|</span>
                <span className="flex items-center gap-1 text-xs text-stone-400">
                  <MapPin className="w-3 h-3" /> {inscription.location}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
                {inscription.name}
              </h1>
              <p className="text-amber-400 text-lg mb-2">{inscription.title}</p>
              <p className="text-stone-300 max-w-2xl leading-relaxed">
                {inscription.description}
              </p>

              <div className="flex flex-wrap gap-3 mt-6">
                {inscription.script && (
                  <span className="flex items-center gap-1 text-xs text-stone-400 bg-stone-900/60 px-3 py-1.5 rounded-full border border-stone-800">
                    <Languages className="w-3 h-3" /> {inscription.script}
                  </span>
                )}
                {inscription.language && (
                  <span className="flex items-center gap-1 text-xs text-stone-400 bg-stone-900/60 px-3 py-1.5 rounded-full border border-stone-800">
                    <FileText className="w-3 h-3" /> {inscription.language}
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
              {(hasOriginal || hasTranslation) && (
                <div className="flex gap-2 mb-6 -mx-4 px-4">
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
                    {TABS.map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeTab === tab.id;
                      const isDisabled =
                        (tab.id === "original" && !hasOriginal) ||
                        (tab.id === "translation" && !hasTranslation);
                      return (
                        <button
                          key={tab.id}
                          onClick={() => !isDisabled && setActiveTab(tab.id)}
                          disabled={isDisabled}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all snap-start flex-shrink-0 border ${
                            isDisabled
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
                    Orijinal Metin (Orhun Alfabesi)
                  </h2>
                  {typeof inscription.originalText === "string" && inscription.originalText ? (
                    <div className="bg-stone-900/50 border border-stone-800 rounded-2xl p-6 md:p-8 max-h-[600px] overflow-y-auto">
                      <p className="text-stone-300 leading-loose font-mono text-sm whitespace-pre-wrap">
                        {inscription.originalText}
                      </p>
                    </div>
                  ) : Array.isArray(inscription.originalText) && inscription.originalText.length > 0 ? (
                    <div className="bg-stone-900/50 border border-stone-800 rounded-2xl p-6 md:p-8 max-h-[600px] overflow-y-auto">
                      {inscription.originalText.map((line, i) => (
                        <p key={i} className="text-stone-300 leading-loose font-mono text-sm">
                          {line}
                        </p>
                      ))}
                    </div>
                  ) : inscription.fullText && inscription.fullText.length > 0 ? (
                    <div className="bg-stone-900/50 border border-stone-800 rounded-2xl p-6 md:p-8 max-h-[600px] overflow-y-auto">
                      {inscription.fullText.map((line, i) => (
                        <p key={i} className="text-stone-300 leading-loose font-mono text-sm">
                          {line}
                        </p>
                      ))}
                    </div>
                  ) : null}
                </motion.article>
              )}

              {/* Translation Tab */}
              {activeTab === "translation" && hasTranslation && (
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Günümüz Türkçesi
                  </h2>
                  <div className="space-y-3">
                    {inscription.translation!.map((paragraph, i) => (
                      <p key={i} className="text-stone-300 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </motion.article>
              )}

              {/* Significance */}
              {inscription.significance && inscription.significance.length > 0 && (
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
                    <Scroll className="w-5 h-5" />
                    Tarihi Önemi
                  </h2>
                  <ul className="space-y-2">
                    {inscription.significance.map((point, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-stone-300"
                      >
                        <span className="text-amber-500 mt-1">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              )}

              {/* If no detailed content */}
              {!hasOriginal && !hasTranslation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-amber-900/10 border border-amber-800/20 rounded-2xl p-8 text-center"
                >
                  <Scroll className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                  <h2 className="text-lg font-bold text-amber-400 mb-2">
                    Detaylı İçerik Yakında
                  </h2>
                  <p className="text-stone-400 text-sm">
                    Bu yazıtın orijinal metni ve çevirisi akademik kaynaklardan derlenmektedir.
                    Yakında yayında olacaktır.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Info */}
              <div className="bg-stone-900/50 border border-stone-800 rounded-2xl p-5 space-y-4">
                <h3 className="text-sm font-bold text-stone-400 uppercase tracking-wider">
                  Bilgiler
                </h3>

                {inscription.discoverer && (
                  <div>
                    <p className="text-xs text-stone-500 flex items-center gap-1 mb-0.5">
                      <User className="w-3 h-3" /> Keşfeden
                    </p>
                    <p className="text-stone-200 text-sm">{inscription.discoverer}</p>
                  </div>
                )}

                {inscription.dimensions && (
                  <div>
                    <p className="text-xs text-stone-500 mb-0.5">Boyutlar</p>
                    <p className="text-stone-200 text-sm">{inscription.dimensions}</p>
                  </div>
                )}

                {inscription.material && (
                  <div>
                    <p className="text-xs text-stone-500 mb-0.5">Malzeme</p>
                    <p className="text-stone-200 text-sm">{inscription.material}</p>
                  </div>
                )}

                {inscription.currentLocation && (
                  <div>
                    <p className="text-xs text-stone-500 mb-0.5">
                      <MapPin className="w-3 h-3 inline mr-1" />
                      Bulunduğu Yer
                    </p>
                    <p className="text-stone-200 text-sm">
                      {inscription.currentLocation}
                    </p>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="bg-stone-900/50 border border-stone-800 rounded-2xl p-5">
                <Link
                  to="/yazitlar"
                  className="flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Tüm Yazıtlar
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </>
  );
}
