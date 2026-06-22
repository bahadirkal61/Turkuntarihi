import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Crown, Search, Pencil, Save, X, AlertCircle,
  CheckCircle2, ChevronDown, ChevronUp,
} from "lucide-react";
import { DYNASTIES } from "../../data/dynasties";
import type { Ruler } from "../../data/rulers";

interface RulerWithDynasty extends Ruler {
  dynastyName: string;
  dynastyColor: string;
}

export default function AdminRulers() {
  const [rulers, setRulers] = useState<RulerWithDynasty[]>([]);
  const [search, setSearch] = useState("");
  const [selectedDynasty, setSelectedDynasty] = useState<string>("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Ruler>>({});
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const [expandedDynasty, setExpandedDynasty] = useState<string | null>(null);

  useEffect(() => {
    loadRulers();
  }, []);

  const loadRulers = async () => {
    setLoading(true);
    const all: RulerWithDynasty[] = [];
    for (const [dynId, info] of Object.entries(DYNASTIES)) {
      try {
        const res = await fetch(`/data/dynasties/${dynId}.json`);
        const data: Ruler[] = await res.json();
        for (const r of data) {
          all.push({ ...r, dynastyName: info.name, dynastyColor: info.color });
        }
      } catch {
        /* skip */
      }
    }
    setRulers(all);
    setLoading(false);
  };

  const startEdit = (ruler: RulerWithDynasty) => {
    setEditId(ruler.id);
    setEditForm({
      name: ruler.name,
      title: ruler.title,
      period: ruler.period,
      description: ruler.description,
      fullBio: ruler.fullBio,
    });
  };

  const saveEdit = () => {
    if (!editId || !editForm) return;

    // Save to localStorage as override
    const overrides = JSON.parse(localStorage.getItem("ruler_overrides") || "{}");
    overrides[editId] = editForm;
    localStorage.setItem("ruler_overrides", JSON.stringify(overrides));

    setRulers((prev) =>
      prev.map((r) => (r.id === editId ? { ...r, ...editForm } as RulerWithDynasty : r))
    );

    setEditId(null);
    showToast("Hükümdar bilgileri kaydedildi.");
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  // Group by dynasty
  const grouped = rulers.reduce<Record<string, RulerWithDynasty[]>>((acc, r) => {
    const key = `${r.dynastyId}|${r.dynastyName}|${r.dynastyColor}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(r);
    return acc;
  }, {});

  // Filter
  const filteredEntries = Object.entries(grouped).filter(([key]) => {
    if (!selectedDynasty) return true;
    return key.startsWith(selectedDynasty + "|");
  });

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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Hükümdarlar</h1>
        <p className="text-stone-500 text-sm mt-1">{rulers.length} hükümdar</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Hükümdar ara..."
            className="w-full bg-stone-900/50 border border-stone-800 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500/50"
          />
        </div>
        <select
          value={selectedDynasty}
          onChange={(e) => setSelectedDynasty(e.target.value)}
          className="bg-stone-900/50 border border-stone-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500/50"
        >
          <option value="">Tüm Devletler</option>
          {Object.entries(DYNASTIES).map(([id, info]) => (
            <option key={id} value={id}>
              {info.name}
            </option>
          ))}
        </select>
      </div>

      {/* List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-stone-500 text-sm">Yükleniyor...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEntries.map(([key, dynastyRulers]) => {
            const [, dynName, dynColor] = key.split("|");
            const isExpanded = expandedDynasty === key || search.length > 0;
            const filteredRulers = search
              ? dynastyRulers.filter(
                  (r) =>
                    r.name.toLowerCase().includes(search.toLowerCase()) ||
                    r.title?.toLowerCase().includes(search.toLowerCase())
                )
              : dynastyRulers;

            if (filteredRulers.length === 0) return null;

            return (
              <div
                key={key}
                className="bg-stone-900/50 border border-stone-800 rounded-2xl overflow-hidden"
              >
                {/* Dynasty Header */}
                <button
                  onClick={() =>
                    setExpandedDynasty(isExpanded ? null : key)
                  }
                  className="w-full flex items-center gap-3 p-4 hover:bg-stone-800/30 transition-colors"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${dynColor}20` }}
                  >
                    <Crown className="w-5 h-5" style={{ color: dynColor }} />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-white font-bold text-sm">{dynName}</h3>
                    <p className="text-stone-500 text-xs">
                      {dynastyRulers.length} hükümdar
                    </p>
                  </div>
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: dynColor }}
                  />
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-stone-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-600" />
                  )}
                </button>

                {/* Rulers */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-stone-800 divide-y divide-stone-800/50">
                        {filteredRulers.map((ruler) =>
                          editId === ruler.id ? (
                            <div key={ruler.id} className="p-4 space-y-3">
                              <div className="flex items-center justify-between">
                                <h4 className="text-white font-bold text-sm">
                                  {ruler.name} - Düzenle
                                </h4>
                                <button
                                  onClick={() => setEditId(null)}
                                  className="p-1.5 rounded-lg hover:bg-stone-800"
                                >
                                  <X className="w-4 h-4 text-stone-500" />
                                </button>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <input
                                  type="text"
                                  value={editForm.name || ""}
                                  onChange={(e) =>
                                    setEditForm({
                                      ...editForm,
                                      name: e.target.value,
                                    })
                                  }
                                  placeholder="İsim"
                                  className="bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500/50"
                                />
                                <input
                                  type="text"
                                  value={editForm.title || ""}
                                  onChange={(e) =>
                                    setEditForm({
                                      ...editForm,
                                      title: e.target.value,
                                    })
                                  }
                                  placeholder="Unvan"
                                  className="bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500/50"
                                />
                                <input
                                  type="text"
                                  value={editForm.period || ""}
                                  onChange={(e) =>
                                    setEditForm({
                                      ...editForm,
                                      period: e.target.value,
                                    })
                                  }
                                  placeholder="Dönem (örn: 1299 - 1326)"
                                  className="bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500/50"
                                />
                                <textarea
                                  value={editForm.description || ""}
                                  onChange={(e) =>
                                    setEditForm({
                                      ...editForm,
                                      description: e.target.value,
                                    })
                                  }
                                  placeholder="Kısa açıklama"
                                  rows={2}
                                  className="md:col-span-2 bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500/50 resize-none"
                                />
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={saveEdit}
                                  className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-sm font-medium rounded-xl transition-colors"
                                >
                                  <Save className="w-4 h-4" />
                                  Kaydet
                                </button>
                                <button
                                  onClick={() => setEditId(null)}
                                  className="px-4 py-2 text-stone-500 hover:text-stone-300 text-sm transition-colors"
                                >
                                  İptal
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div
                              key={ruler.id}
                              className="flex items-center gap-3 p-3 hover:bg-stone-800/30 transition-colors"
                            >
                              <img
                                src={ruler.image}
                                alt={ruler.name}
                                className="w-10 h-10 rounded-lg object-cover flex-shrink-0 bg-stone-800"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = "none";
                                }}
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-white text-sm font-medium truncate">
                                  {ruler.name}
                                </p>
                                <p className="text-stone-500 text-xs truncate">
                                  {ruler.title} · {ruler.period}
                                </p>
                              </div>
                              <button
                                onClick={() => startEdit(ruler)}
                                className="p-2 rounded-lg hover:bg-stone-800 text-stone-500 hover:text-amber-400 transition-all flex-shrink-0"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}

      {!loading && filteredEntries.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="w-8 h-8 text-stone-700 mx-auto mb-2" />
          <p className="text-stone-500 text-sm">Sonuç bulunamadı.</p>
        </div>
      )}
    </div>
  );
}
