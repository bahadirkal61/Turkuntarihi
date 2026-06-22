import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, CheckCircle2, Info, RotateCcw } from "lucide-react";

interface AboutContent {
  title: string;
  subtitle: string;
  missionTitle: string;
  missionText: string;
  visionTitle: string;
  visionText: string;
  contentTitle: string;
  contentText: string;
}

const DEFAULT_CONTENT: AboutContent = {
  title: "Hakkımızda",
  subtitle: "Türk Tarihi Platformu",
  missionTitle: "Misyonumuz",
  missionText:
    "Türk tarihini akademik kaynaklara dayalı, doğru ve kapsamlı bir şekilde dijital ortamda sunmak. 2500 yıllık zengin geçmişi gelecek nesillere aktarmak.",
  visionTitle: "Vizyonumuz",
  visionText:
    "Türk tarihinin dünya çapında en kapsamlı ve güvenilir dijital kaynağı olmak. Her yaştan ve her kesimden insanın Türk medeniyetini keşfetmesini sağlamak.",
  contentTitle: "İçeriklerimiz",
  contentText:
    "21 devlet, 272 hükümdar, destanlar, yazıtlar, coğrafya ve kültür bölümleriyle Türk medeniyetinin tüm yönlerini kapsıyoruz.",
};

export default function AdminAboutPage() {
  const saved = localStorage.getItem("about_content");
  const [content, setContent] = useState<AboutContent>(
    saved ? JSON.parse(saved) : DEFAULT_CONTENT
  );
  const [toast, setToast] = useState("");

  const handleSave = () => {
    localStorage.setItem("about_content", JSON.stringify(content));
    setToast("Hakkında içeriği kaydedildi.");
    setTimeout(() => setToast(""), 3000);
  };

  const handleReset = () => {
    setContent(DEFAULT_CONTENT);
    localStorage.removeItem("about_content");
    setToast("Varsayılan içerik yüklendi.");
    setTimeout(() => setToast(""), 3000);
  };

  const updateField = (field: keyof AboutContent, value: string) => {
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
          <h1 className="text-2xl font-bold text-white">Hakkında</h1>
          <p className="text-stone-500 text-sm mt-1">
            Hakkında sayfası içeriğini düzenleyin
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
          <Info className="w-4 h-4" />
          Önizleme
        </h2>
        <div className="bg-stone-950 rounded-xl p-6 border border-stone-800 space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-white">{content.title}</h1>
            <p className="text-stone-500 text-sm">{content.subtitle}</p>
          </div>
          <div>
            <h3 className="text-amber-400 font-medium text-sm mb-1">
              {content.missionTitle}
            </h3>
            <p className="text-stone-400 text-sm">{content.missionText}</p>
          </div>
          <div>
            <h3 className="text-amber-400 font-medium text-sm mb-1">
              {content.visionTitle}
            </h3>
            <p className="text-stone-400 text-sm">{content.visionText}</p>
          </div>
          <div>
            <h3 className="text-amber-400 font-medium text-sm mb-1">
              {content.contentTitle}
            </h3>
            <p className="text-stone-400 text-sm">{content.contentText}</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <FormField
          label="Başlık"
          value={content.title}
          onChange={(v) => updateField("title", v)}
        />
        <FormField
          label="Alt Başlık"
          value={content.subtitle}
          onChange={(v) => updateField("subtitle", v)}
        />
        <FormField
          label="Misyon Başlığı"
          value={content.missionTitle}
          onChange={(v) => updateField("missionTitle", v)}
        />
        <FormField
          label="Misyon Metni"
          value={content.missionText}
          onChange={(v) => updateField("missionText", v)}
          textarea
          rows={3}
        />
        <FormField
          label="Vizyon Başlığı"
          value={content.visionTitle}
          onChange={(v) => updateField("visionTitle", v)}
        />
        <FormField
          label="Vizyon Metni"
          value={content.visionText}
          onChange={(v) => updateField("visionText", v)}
          textarea
          rows={3}
        />
        <FormField
          label="İçerik Başlığı"
          value={content.contentTitle}
          onChange={(v) => updateField("contentTitle", v)}
        />
        <FormField
          label="İçerik Metni"
          value={content.contentText}
          onChange={(v) => updateField("contentText", v)}
          textarea
          rows={3}
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
