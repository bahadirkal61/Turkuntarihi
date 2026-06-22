import { Link } from "react-router-dom";
import { BookOpen, ExternalLink, Scroll, Globe, FileText } from "lucide-react";
import { sources } from "../data/sources";

export default function Sources() {
  const byType = {
    kitap: sources.filter((s) => s.type === "kitap"),
    yazit: sources.filter((s) => s.type === "yazit"),
    ansiklopedi: sources.filter((s) => s.type === "ansiklopedi"),
    web: sources.filter((s) => s.type === "web"),
    makale: sources.filter((s) => s.type === "makale"),
  };

  const typeLabels: Record<string, { label: string; icon: React.ElementType; color: string }> = {
    kitap: { label: "Kitaplar", icon: BookOpen, color: "text-amber-400" },
    yazit: { label: "Yazıtlar & Belgeler", icon: Scroll, color: "text-sky-400" },
    ansiklopedi: { label: "Ansiklopediler", icon: BookOpen, color: "text-emerald-400" },
    web: { label: "Web Kaynakları", icon: Globe, color: "text-violet-400" },
    makale: { label: "Makaleler", icon: FileText, color: "text-rose-400" },
  };

  return (
    <div className="min-h-screen bg-stone-950 pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-stone-400 hover:text-white transition-colors mb-8 text-sm"
        >
          ← Ana Sayfa
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">Kaynakça</h1>
          <p className="text-stone-400 text-lg max-w-2xl">
            Türk Tarihi projesinde kullanılan tüm kaynaklar. Tarihsel doğruluk ve akademik
            bütünlük için bu kaynaklar titizlikle derlenmiştir.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-800/60 border border-stone-700/40">
            <span className="text-stone-500 text-xs">Toplam</span>
            <span className="text-white font-bold text-sm">{sources.length} kaynak</span>
          </div>
        </div>

        {/* Sources by type */}
        <div className="space-y-10">
          {Object.entries(byType).map(([type, items]) => {
            if (items.length === 0) return null;
            const { label, icon: Icon, color } = typeLabels[type];
            return (
              <section key={type}>
                <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${color}`}>
                  <Icon className="w-5 h-5" />
                  {label}
                  <span className="text-stone-600 text-sm font-normal">({items.length})</span>
                </h2>
                <div className="space-y-2">
                  {items.map((s, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 bg-stone-900/40 border border-stone-800/40 rounded-lg px-4 py-3 hover:border-stone-700/60 transition-colors"
                    >
                      <span className="text-stone-600 text-xs mt-0.5 shrink-0 w-6">{i + 1}.</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-stone-200 text-sm font-medium">{s.title}</p>
                        {(s.author || s.year) && (
                          <p className="text-stone-500 text-xs mt-0.5">
                            {s.author && s.author}
                            {s.author && s.year && " · "}
                            {s.year && s.year}
                          </p>
                        )}
                      </div>
                      {s.url && (
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-stone-600 hover:text-amber-400 transition-colors shrink-0"
                          title="Kaynağı görüntüle"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="mt-16 pt-8 border-t border-stone-800/40 text-center">
          <p className="text-stone-500 text-sm">
            Bu proje akademik kaynaklara dayanmaktadır. Her bilgi en az iki bağımsız
            kaynakla doğrulanmıştır.
          </p>
          <p className="text-stone-600 text-xs mt-2">
            Son güncelleme: Haziran 2026
          </p>
        </div>
      </div>
    </div>
  );
}
