import { useState, useEffect } from "react";
import { Globe } from "lucide-react";

const languages = [
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
];

export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState("tr");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("turk_tarihi_lang");
    if (saved) setCurrentLang(saved);
  }, []);

  const selectLang = (code: string) => {
    setCurrentLang(code);
    localStorage.setItem("turk_tarihi_lang", code);
    setOpen(false);
    // Reload to apply language changes
    window.location.reload();
  };

  const current = languages.find((l) => l.code === currentLang) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-stone-400 hover:text-amber-400 transition-colors text-xs"
        aria-label="Dil değiştir"
      >
        <Globe className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{current.label}</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 bg-stone-900 border border-stone-700 rounded-xl shadow-xl overflow-hidden z-50 min-w-[140px]">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => selectLang(lang.code)}
                className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
                  currentLang === lang.code
                    ? "bg-amber-600/20 text-amber-400"
                    : "text-stone-300 hover:bg-stone-800 hover:text-white"
                }`}
              >
                <span>{lang.flag}</span>
                {lang.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
