import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, CheckCircle2, Home, RotateCcw } from "lucide-react";

interface HomeContent {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  statsLine: string;
  description: string;
}

const DEFAULT_CONTENT: HomeContent = {
  heroTitle: "Türk Tarihi",
  heroSubtitle: "Bozkırdan İmparatorluklara",
  heroDescription:
    "İskitlerden Osmanlı'ya, Orhun Yazıtları'ndan Cumhuriyet'e kadar 2500 yıllık Türk medeniyetinin kapsamlı dijital ansiklopedisi.",
  statsLine: "272 Devlet Başkanı · 21 Devlet · 2500 Yıl",
  description:
    "272 hükümdar, 21 devlet, destanlar, yazıtlar ve unutulmaz bir medeniyet.",
};

export default function AdminHomePage() {
  const saved = localStorage.getItem("home_content");
  const [content, setContent] = useState<HomeContent>(
    saved ? JSON.parse(saved) : DEFAULT_CONTENT
  );
  const [toast, setToast] = useState("");

  const handleSave = () => {
    localStorage.setItem("home_content", JSON.stringify(content));
    setToast("Ana sayfa içeriği kaydedildi.");
    setTimeout(() => setToast(""), 3000);
  };

  const handleReset = () => {
    setContent(DEFAULT_CONTENT);
    localStorage.removeItem("home_content");
    setToast("Varsayılan içerik yüklendi.");
    setTimeout(() => setToast(""), 3000);
  };

  const updateField = (field: keyof HomeContent, value: string) => {
    setContent((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6 md:p-8">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 z-[60] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-xl flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Ana Sayfa</h1>
          <p className="text-stone-500 text-sm mt-1">
            Ana sayfa başlık ve açıklamalarını düzenleyin
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2.5 text-stone-500 hover:text-stone-300 text-sm font-medium rounded-xl hover:bg-stone-800/50 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Sıfırla
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-sm font-medium rounded-xl transition-colors"
          >
            <Save className="w-4 h-4" />
            Kaydet
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-stone-900/50 border border-stone-800 rounded-2xl p-6 mb-6">
        <h2 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Home className="w-4 h-4" />
          Önizleme
        </h2>
        <div className="bg-stone-950 rounded-xl p-6 border border-stone-800">
          <p className="text-amber-500 text-xs font-medium uppercase tracking-widest mb-2">
            {content.statsLine}
          </p>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-2">
            {content.heroTitle}
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-amber-400 mb-3">
            {content.heroSubtitle}
          </h2>
          <p className="text-stone-500 text-sm max-w-xl mb-4">
            {content.heroDescription}
          </p>
          <p className="text-stone-600 text-xs">{content.description}</p>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <FormField
          label="Ana Başlık"
          value={content.heroTitle}
          onChange={(v) => updateField("heroTitle", v)}
        />
        <FormField
          label="Alt Başlık"
          value={content.heroSubtitle}
          onChange={(v) => updateField("heroSubtitle", v)}
        />
        <FormField
          label="Açıklama"
          value={content.heroDescription}
          onChange={(v) => updateField("heroDescription", v)}
          textarea
          rows={3}
        />
        <FormField
          label="İstatistik Satırı"
          value={content.statsLine}
          onChange={(v) => updateField("statsLine", v)}
        />
        <FormField
          label="Kısa Açıklama"
          value={content.description}
          onChange={(v) => updateField("description", v)}
        />
      </div>
    </div>
  );
}

function FormField({
  label,
  value,
  onChange,
  textarea,
  rows,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  rows?: number;
}) {
  return (
    <div>
      <label className="block text-stone-400 text-sm font-medium mb-2">
        {label}
      </label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows || 3}
          className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500/50 resize-none"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500/50"
        />
      )}
    </div>
  );
}
