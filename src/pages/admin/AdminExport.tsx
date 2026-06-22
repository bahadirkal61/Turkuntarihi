import { useState, useEffect, useCallback } from "react";
import {
  Download, Upload, Trash2, FileJson, Save,
  X, AlertTriangle, CheckCircle, Pencil, ImagePlus, Table2
} from "lucide-react";

interface EditEntry {
  key: string;
  type: "text" | "image" | "bulk";
  preview: string;
  size: number;
  date: string;
}

export default function AdminExport() {
  const [entries, setEntries] = useState<EditEntry[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [importText, setImportText] = useState("");
  const [showImport, setShowImport] = useState(false);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState<"all" | "text" | "image" | "bulk">("all");

  // Load all edit entries from localStorage
  const loadEntries = useCallback(() => {
    const results: EditEntry[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;
      if (key.startsWith("edit_") || key.startsWith("edit_img_") || key.startsWith("bulkedit_")) {
        const value = localStorage.getItem(key) || "";
        let type: EditEntry["type"] = "text";
        if (key.startsWith("edit_img_")) type = "image";
        else if (key.startsWith("bulkedit_")) type = "bulk";

        let preview = value;
        if (type === "bulk") {
          try { preview = JSON.stringify(JSON.parse(value), null, 2).substring(0, 100) + "..."; } catch { /* ignore */ }
        } else {
          preview = value.substring(0, 120);
          if (value.length > 120) preview += "...";
        }

        results.push({
          key,
          type,
          preview,
          size: new Blob([value]).size,
          date: new Date().toLocaleDateString("tr-TR"),
        });
      }
    }
    // Sort: bulk first, then text, then image
    results.sort((a, b) => {
      const order = { bulk: 0, text: 1, image: 2 };
      return order[a.type] - order[b.type] || a.key.localeCompare(b.key);
    });
    setEntries(results);
    setSelectedKeys(new Set());
  }, []);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  // Toggle selection
  const toggleSelect = (key: string) => {
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const selectAll = () => {
    const filtered = getFiltered();
    if (selectedKeys.size === filtered.length) {
      setSelectedKeys(new Set());
    } else {
      setSelectedKeys(new Set(filtered.map((e) => e.key)));
    }
  };

  // Filter
  const getFiltered = () => {
    if (filter === "all") return entries;
    return entries.filter((e) => e.type === filter);
  };

  // Delete selected
  const deleteSelected = () => {
    if (selectedKeys.size === 0) return;
    if (!window.confirm(`${selectedKeys.size} düzenlemeyi silmek istediğinize emin misiniz?`)) return;
    selectedKeys.forEach((key) => localStorage.removeItem(key));
    setMessage(`${selectedKeys.size} düzenleme silindi.`);
    setTimeout(() => setMessage(""), 3000);
    loadEntries();
  };

  // Delete all
  const deleteAll = () => {
    if (!window.confirm("TÜM düzenlemeleri silmek istediğinize emin misiniz? Bu işlem geri alınamaz!")) return;
    entries.forEach((e) => localStorage.removeItem(e.key));
    setMessage("Tüm düzenlemeler silindi.");
    setTimeout(() => setMessage(""), 3000);
    loadEntries();
  };

  // Export all to JSON
  const exportJSON = () => {
    const data: Record<string, string> = {};
    entries.forEach((e) => {
      const val = localStorage.getItem(e.key);
      if (val !== null) data[e.key] = val;
    });
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `turk-tarihi-duzenlemeler-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMessage("Dışa aktarma tamamlandı.");
    setTimeout(() => setMessage(""), 3000);
  };

  // Export selected to JSON
  const exportSelectedJSON = () => {
    if (selectedKeys.size === 0) return;
    const data: Record<string, string> = {};
    selectedKeys.forEach((key) => {
      const val = localStorage.getItem(key);
      if (val !== null) data[key] = val;
    });
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `turk-tarihi-secili-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMessage(`${selectedKeys.size} düzenleme dışa aktarıldı.`);
    setTimeout(() => setMessage(""), 3000);
  };

  // Import JSON
  const importJSON = () => {
    if (!importText.trim()) return;
    try {
      const data = JSON.parse(importText);
      if (typeof data !== "object" || data === null) throw new Error("Geçersiz format");
      let count = 0;
      Object.entries(data).forEach(([key, value]) => {
        if (
          typeof value === "string" &&
          (key.startsWith("edit_") || key.startsWith("edit_img_") || key.startsWith("bulkedit_"))
        ) {
          localStorage.setItem(key, value);
          count++;
        }
      });
      setMessage(`${count} düzenleme içe aktarıldı.`);
      setImportText("");
      setShowImport(false);
      loadEntries();
    } catch {
      setMessage("Hata: Geçersiz JSON formatı.");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const filtered = getFiltered();

  // Stats
  const textCount = entries.filter((e) => e.type === "text").length;
  const imageCount = entries.filter((e) => e.type === "image").length;
  const bulkCount = entries.filter((e) => e.type === "bulk").length;
  const totalSize = entries.reduce((sum, e) => sum + e.size, 0);

  return (
    <div className="min-h-screen bg-stone-950 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileJson className="w-6 h-6 text-amber-500" />
            Dışa Aktar & İçe Aktar
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            Tüm düzenlemelerinizi yönetin, yedekleyin ve geri yükleyin
          </p>
        </div>
        {message && (
          <div className={`px-4 py-2 rounded-xl text-sm flex items-center gap-2 ${
            message.includes("Hata") || message.includes("silindi")
              ? "bg-red-500/10 border border-red-500/30 text-red-400"
              : "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
          }`}>
            {message.includes("Hata") ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
            {message}
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Metin Düzenlemesi", value: textCount, icon: Pencil, color: "text-sky-400", bg: "bg-sky-500/10" },
          { label: "Görsel Düzenlemesi", value: imageCount, icon: ImagePlus, color: "text-emerald-400", bg: "bg-emerald-500/10" },
          { label: "Toplu Düzenleme", value: bulkCount, icon: Table2, color: "text-violet-400", bg: "bg-violet-500/10" },
          { label: "Toplam Boyut", value: `${(totalSize / 1024).toFixed(1)} KB`, icon: FileJson, color: "text-amber-400", bg: "bg-amber-500/10" },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} border border-stone-800 rounded-xl p-4`}>
            <div className="flex items-center gap-2 mb-1">
              <s.icon className={`w-4 h-4 ${s.color}`} />
              <span className="text-stone-500 text-xs">{s.label}</span>
            </div>
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <button
          onClick={exportJSON}
          disabled={entries.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-colors"
        >
          <Download className="w-4 h-4" />
          Tümünü Dışa Aktar
        </button>
        <button
          onClick={exportSelectedJSON}
          disabled={selectedKeys.size === 0}
          className="flex items-center gap-2 px-4 py-2 bg-stone-800 hover:bg-stone-700 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-colors"
        >
          <Download className="w-4 h-4" />
          Seçilenleri Aktar ({selectedKeys.size})
        </button>
        <button
          onClick={() => setShowImport(!showImport)}
          className="flex items-center gap-2 px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white text-sm font-medium rounded-xl transition-colors"
        >
          <Upload className="w-4 h-4" />
          İçe Aktar
        </button>
        <button
          onClick={deleteSelected}
          disabled={selectedKeys.size === 0}
          className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 disabled:opacity-30 disabled:cursor-not-allowed text-red-400 text-sm font-medium rounded-xl transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Seçilenleri Sil
        </button>
        <button
          onClick={deleteAll}
          disabled={entries.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-red-600/10 hover:bg-red-600/20 disabled:opacity-30 disabled:cursor-not-allowed text-red-500 text-sm font-medium rounded-xl transition-colors"
        >
          <AlertTriangle className="w-4 h-4" />
          Tümünü Sil
        </button>
      </div>

      {/* Import Panel */}
      {showImport && (
        <div className="mb-6 p-4 bg-stone-900 border border-stone-800 rounded-xl">
          <h3 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
            <Upload className="w-4 h-4 text-amber-500" />
            JSON İçe Aktar
          </h3>
          <p className="text-stone-500 text-xs mb-3">
            Daha önce dışa aktarılan JSON verisini yapıştırın. Sadece edit_, edit_img_ ve bulkedit_ anahtarları içe aktarılır.
          </p>
          <textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            rows={6}
            placeholder='{"edit_home_title": "...", "edit_img_...": "..."}'
            className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-amber-500/50 resize-none mb-3"
          />
          <div className="flex items-center gap-2">
            <button
              onClick={importJSON}
              disabled={!importText.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-30 text-white text-sm font-medium rounded-xl transition-colors"
            >
              <Save className="w-4 h-4" />
              İçe Aktar
            </button>
            <button
              onClick={() => { setShowImport(false); setImportText(""); }}
              className="px-4 py-2 text-stone-400 hover:text-white text-sm rounded-xl hover:bg-stone-800 transition-all"
            >
              <X className="w-4 h-4 inline mr-1" />
              İptal
            </button>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 mb-4">
        {(["all", "text", "image", "bulk"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === f
                ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                : "text-stone-500 hover:text-stone-300 hover:bg-stone-800/50 border border-transparent"
            }`}
          >
            {f === "all" ? "Tümü" : f === "text" ? "Metin" : f === "image" ? "Görsel" : "Toplu"}
            <span className="ml-1.5 text-xs text-stone-600">
              ({f === "all" ? entries.length : entries.filter((e) => e.type === f).length})
            </span>
          </button>
        ))}
      </div>

      {/* Entries List */}
      <div className="border border-stone-800 rounded-xl overflow-hidden">
        {/* List Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-stone-900 border-b border-stone-800">
          <button
            onClick={selectAll}
            className={`w-4 h-4 rounded border ${
              selectedKeys.size === filtered.length && filtered.length > 0
                ? "bg-amber-500 border-amber-500"
                : "border-stone-600 hover:border-stone-400"
            } transition-colors`}
          >
            {selectedKeys.size === filtered.length && filtered.length > 0 && (
              <CheckCircle className="w-3.5 h-3.5 text-white -m-px" />
            )}
          </button>
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider flex-1">Anahtar</span>
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider w-20 text-center">Tür</span>
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider w-20 text-right">Boyut</span>
        </div>

        {/* List Items */}
        <div className="divide-y divide-stone-800/60 max-h-[500px] overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="px-4 py-12 text-center">
              <FileJson className="w-8 h-8 text-stone-700 mx-auto mb-3" />
              <p className="text-stone-500 text-sm">Henüz düzenleme yok.</p>
              <p className="text-stone-600 text-xs mt-1">
                Siteyi düzenleme moduna alarak veya toplu düzenleme yaparak veri oluşturun.
              </p>
            </div>
          ) : (
            filtered.map((entry) => (
              <div
                key={entry.key}
                className={`flex items-center gap-3 px-4 py-3 hover:bg-stone-900/50 transition-colors ${
                  selectedKeys.has(entry.key) ? "bg-amber-500/5" : ""
                }`}
              >
                <button
                  onClick={() => toggleSelect(entry.key)}
                  className={`w-4 h-4 rounded border flex-shrink-0 transition-colors ${
                    selectedKeys.has(entry.key)
                      ? "bg-amber-500 border-amber-500"
                      : "border-stone-600 hover:border-stone-400"
                  }`}
                >
                  {selectedKeys.has(entry.key) && (
                    <CheckCircle className="w-3.5 h-3.5 text-white -m-px" />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{entry.key}</p>
                  <p className="text-stone-600 text-xs truncate">{entry.preview}</p>
                </div>
                <span
                  className={`w-20 text-center text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${
                    entry.type === "text"
                      ? "bg-sky-500/10 text-sky-400"
                      : entry.type === "image"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-violet-500/10 text-violet-400"
                  }`}
                >
                  {entry.type === "text" ? "Metin" : entry.type === "image" ? "Görsel" : "Toplu"}
                </span>
                <span className="w-20 text-right text-stone-500 text-xs font-mono flex-shrink-0">
                  {entry.size > 1024 ? `${(entry.size / 1024).toFixed(1)} KB` : `${entry.size} B`}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bottom Info */}
      <div className="mt-4 text-stone-600 text-xs">
        <p>
          Tüm düzenlemeler tarayıcının localStorage&apos;ında saklanır. Farklı bir tarayıcıda veya
          cihazda görünmeyebilir. Yedekleme için düzenli olarak dışa aktarma yapmanız önerilir.
        </p>
      </div>
    </div>
  );
}
