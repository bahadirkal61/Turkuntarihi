import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Crown, Search, Pencil, Save, X, AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { DYNASTIES } from "../../data/dynasties";
import type { DynastyInfo } from "../../data/dynasties";

interface ExtendedDynasty extends DynastyInfo {
  id: string;
  rulerCount: number;
}

export default function AdminDynasties() {
  const [dynasties, setDynasties] = useState<ExtendedDynasty[]>([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<DynastyInfo>>({});
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  useEffect(() => {
    loadDynasties();
  }, []);

  const loadDynasties = async () => {
    setLoading(true);
    const entries: ExtendedDynasty[] = [];
    for (const [id, info] of Object.entries(DYNASTIES)) {
      try {
        const res = await fetch(`/data/dynasties/${id}.json`);
        const rulers = await res.json();
        entries.push({ ...info, id, rulerCount: rulers.length });
      } catch {
        entries.push({ ...info, id, rulerCount: 0 });
      }
    }
    setDynasties(entries);
    setLoading(false);
  };

  const startEdit = (dyn: ExtendedDynasty) => {
    setEditId(dyn.id);
    setEditForm({
      name: dyn.name,
      period: dyn.period,
      color: dyn.color,
      description: dyn.description,
    });
  };

  const saveEdit = () => {
    if (!editId || !editForm) return;

    // Save to localStorage as override
    const overrides = JSON.parse(localStorage.getItem("dynasty_overrides") || "{}");
    overrides[editId] = editForm;
    localStorage.setItem("dynasty_overrides", JSON.stringify(overrides));

    // Update local state
    setDynasties((prev) =>
      prev.map((d) =>
        d.id === editId ? { ...d, ...editForm } as ExtendedDynasty : d
      )
    );

    setEditId(null);
    showToast("Devlet bilgileri kaydedildi.");
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const filtered = dynasties.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.period?.toLowerCase().includes(search.toLowerCase())
  );

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
          <h1 className="text-2xl font-bold text-white">Devletler</h1>
          <p className="text-stone-500 text-sm mt-1">
            {dynasties.length} devlet, {dynasties.reduce((a, d) => a + d.rulerCount, 0)} hükümdar
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Devlet ara..."
          className="w-full bg-stone-900/50 border border-stone-800 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500/50"
        />
      </div>

      {/* List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-stone-500 text-sm">Yükleniyor...</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((dyn) => (
            <div
              key={dyn.id}
              className="bg-stone-900/50 border border-stone-800 rounded-2xl p-4 hover:border-stone-700 transition-all"
            >
              {editId === dyn.id ? (
                /* Edit Mode */
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-bold">{dyn.name} - Düzenle</h3>
                    <button
                      onClick={() => setEditId(null)}
                      className="p-1.5 rounded-lg hover:bg-stone-800 transition-colors"
                    >
                      <X className="w-4 h-4 text-stone-500" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-stone-500 text-xs mb-1.5">İsim</label>
                      <input
                        type="text"
                        value={editForm.name || ""}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-500 text-xs mb-1.5">Dönem</label>
                      <input
                        type="text"
                        value={editForm.period || ""}
                        onChange={(e) => setEditForm({ ...editForm, period: e.target.value })}
                        className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-500 text-xs mb-1.5">Renk</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={editForm.color || "#f59e0b"}
                          onChange={(e) => setEditForm({ ...editForm, color: e.target.value })}
                          className="w-10 h-10 rounded-lg border border-stone-700 bg-transparent cursor-pointer"
                        />
                        <span className="text-stone-400 text-xs">{editForm.color}</span>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-stone-500 text-xs mb-1.5">Açıklama</label>
                      <textarea
                        value={editForm.description || ""}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        rows={3}
                        className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500/50 resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={saveEdit}
                      className="flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-sm font-medium rounded-xl transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      Kaydet
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="px-4 py-2.5 text-stone-500 hover:text-stone-300 text-sm transition-colors"
                    >
                      İptal
                    </button>
                  </div>
                </div>
              ) : (
                /* View Mode */
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${dyn.color}20` }}
                  >
                    <Crown className="w-6 h-6" style={{ color: dyn.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-bold text-sm">{dyn.name}</h3>
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: dyn.color }}
                      />
                    </div>
                    <p className="text-stone-500 text-xs mt-0.5 truncate">
                      {dyn.period} · {dyn.rulerCount} hükümdar
                    </p>
                    <p className="text-stone-600 text-xs mt-1 line-clamp-1">
                      {dyn.description}
                    </p>
                  </div>
                  <button
                    onClick={() => startEdit(dyn)}
                    className="p-2.5 rounded-xl bg-stone-800/50 hover:bg-stone-800 text-stone-500 hover:text-amber-400 transition-all flex-shrink-0"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="w-8 h-8 text-stone-700 mx-auto mb-2" />
          <p className="text-stone-500 text-sm">Sonuç bulunamadı.</p>
        </div>
      )}
    </div>
  );
}
