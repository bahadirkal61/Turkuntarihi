import { useState, useEffect, useMemo, useCallback } from "react";
import { loadDynastyRulers, getCachedDynastyRulers } from "../../data/rulers";
import type { Ruler } from "../../data/rulers";
import { DYNASTIES } from "../../data/dynasties";
import {
  Table2, Search, Filter, Pencil, Save, X,
  ChevronLeft, ChevronRight, Crown, Users, Calendar,
  BookOpen, Award, ScrollText, UserCircle
} from "lucide-react";

const DYNASTY_KEYS = Object.keys(DYNASTIES);
const PAGE_SIZE = 50;

interface EditableRuler {
  dynastyId: string;
  ruler: Ruler;
}

export default function AdminBulkEdit() {
  const [allRulers, setAllRulers] = useState<EditableRuler[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dynastyFilter, setDynastyFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [editingRuler, setEditingRuler] = useState<EditableRuler | null>(null);
  const [editForm, setEditForm] = useState<Partial<Ruler>>({});
  const [saveMessage, setSaveMessage] = useState("");

  // Load all rulers
  useEffect(() => {
    let cancelled = false;
    async function loadAll() {
      const results: EditableRuler[] = [];
      for (const key of DYNASTY_KEYS) {
        let rulers = getCachedDynastyRulers(key);
        if (!rulers) {
          try { rulers = await loadDynastyRulers(key); } catch { continue; }
        }
        if (rulers) {
          for (const r of rulers) {
            results.push({ dynastyId: key, ruler: r });
          }
        }
      }
      if (!cancelled) {
        setAllRulers(results);
        setLoading(false);
      }
    }
    loadAll();
    return () => { cancelled = true; };
  }, []);

  // Filtered + searched rulers
  const filtered = useMemo(() => {
    let data = [...allRulers];
    if (dynastyFilter !== "all") {
      data = data.filter((r) => r.dynastyId === dynastyFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (r) =>
          r.ruler.name.toLowerCase().includes(q) ||
          r.ruler.title.toLowerCase().includes(q) ||
          r.ruler.period.toLowerCase().includes(q) ||
          r.ruler.fullBio.toLowerCase().includes(q) ||
          r.ruler.dynasty.toLowerCase().includes(q)
      );
    }
    return data;
  }, [allRulers, dynastyFilter, search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  // Open edit modal
  const openEdit = useCallback((er: EditableRuler) => {
    setEditingRuler(er);
    setEditForm({ ...er.ruler });
  }, []);

  // Save edit to localStorage
  const saveEdit = useCallback(() => {
    if (!editingRuler || !editForm) return;
    const key = `bulkedit_${editingRuler.dynastyId}_${editingRuler.ruler.id}`;
    localStorage.setItem(key, JSON.stringify(editForm));
    setSaveMessage(`"${editingRuler.ruler.name}" kaydedildi.`);
    setTimeout(() => setSaveMessage(""), 2000);
    setEditingRuler(null);
  }, [editingRuler, editForm]);

  // Load saved bulk edits and show indicator
  const getSavedEdit = (dynastyId: string, rulerId: string) => {
    return localStorage.getItem(`bulkedit_${dynastyId}_${rulerId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-stone-400">272 hükümdar yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Table2 className="w-6 h-6 text-amber-500" />
            Toplu Düzenleme
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            {allRulers.length} hükümdar arasında arama yapın ve düzenleyin
          </p>
        </div>
        {saveMessage && (
          <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm">
            {saveMessage}
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="İsim, ünvan, dönem veya biyografi ara..."
            className="w-full bg-stone-900 border border-stone-800 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500/50"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
          <select
            value={dynastyFilter}
            onChange={(e) => { setDynastyFilter(e.target.value); setPage(1); }}
            className="bg-stone-900 border border-stone-800 rounded-xl pl-10 pr-8 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500/50 appearance-none cursor-pointer"
          >
            <option value="all">Tüm Devletler</option>
            {DYNASTY_KEYS.map((key) => (
              <option key={key} value={key}>
                {DYNASTIES[key].name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 mb-4 text-sm">
        <span className="text-stone-500">
          <Users className="w-4 h-4 inline mr-1" />
          {filtered.length} hükümdar gösteriliyor
        </span>
        <span className="text-stone-600">|</span>
        <span className="text-stone-500">
          Sayfa {page} / {totalPages || 1}
        </span>
      </div>

      {/* Table */}
      <div className="border border-stone-800 rounded-xl overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-stone-900 border-b border-stone-800">
                <th className="px-4 py-3 text-xs font-bold text-stone-500 uppercase tracking-wider">#</th>
                <th className="px-4 py-3 text-xs font-bold text-stone-500 uppercase tracking-wider">İsim</th>
                <th className="px-4 py-3 text-xs font-bold text-stone-500 uppercase tracking-wider">Ünvan</th>
                <th className="px-4 py-3 text-xs font-bold text-stone-500 uppercase tracking-wider">Dönem</th>
                <th className="px-4 py-3 text-xs font-bold text-stone-500 uppercase tracking-wider">Devlet</th>
                <th className="px-4 py-3 text-xs font-bold text-stone-500 uppercase tracking-wider">Biyografi</th>
                <th className="px-4 py-3 text-xs font-bold text-stone-500 uppercase tracking-wider">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60">
              {paged.map((er, i) => {
                const hasEdit = getSavedEdit(er.dynastyId, er.ruler.id);
                return (
                  <tr
                    key={`${er.dynastyId}-${er.ruler.id}`}
                    className={`hover:bg-stone-900/50 transition-colors ${hasEdit ? "bg-amber-500/5" : ""}`}
                  >
                    <td className="px-4 py-3 text-stone-600 text-sm font-mono">
                      {(page - 1) * PAGE_SIZE + i + 1}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {hasEdit && (
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0" title="Düzenlendi" />
                        )}
                        <span className="text-white text-sm font-medium">{er.ruler.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-stone-400 text-sm">{er.ruler.title}</td>
                    <td className="px-4 py-3 text-stone-500 text-sm font-mono">{er.ruler.period}</td>
                    <td className="px-4 py-3">
                      <span
                        className="text-xs font-medium px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: DYNASTIES[er.dynastyId]?.color + "18",
                          color: DYNASTIES[er.dynastyId]?.color,
                        }}
                      >
                        {er.ruler.dynasty}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-stone-500 text-sm max-w-xs truncate">
                      {er.ruler.fullBio.substring(0, 80)}...
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => openEdit(er)}
                        className="p-1.5 hover:bg-amber-500/10 rounded-lg transition-colors text-stone-500 hover:text-amber-400"
                        title="Düzenle"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page <= 1}
          className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm text-stone-400 hover:text-white hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          Önceki
        </button>
        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(10, totalPages) }, (_, i) => {
            const p = i + 1;
            return (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                  p === page
                    ? "bg-amber-500 text-white"
                    : "text-stone-400 hover:text-white hover:bg-stone-800"
                }`}
              >
                {p}
              </button>
            );
          })}
          {totalPages > 10 && <span className="text-stone-600 px-2">...</span>}
        </div>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page >= totalPages}
          className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm text-stone-400 hover:text-white hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          Sonraki
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Edit Modal */}
      {editingRuler && editForm && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-stone-800 sticky top-0 bg-stone-900 z-10">
              <div>
                <h2 className="text-white font-bold text-lg flex items-center gap-2">
                  <Crown className="w-5 h-5 text-amber-500" />
                  {editingRuler.ruler.name}
                </h2>
                <p className="text-stone-500 text-sm">{editingRuler.ruler.dynasty} · {editingRuler.ruler.period}</p>
              </div>
              <button
                onClick={() => setEditingRuler(null)}
                className="p-1.5 hover:bg-stone-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-stone-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4">
              {/* Name */}
              <div>
                <label className="flex items-center gap-1.5 text-stone-400 text-xs font-medium uppercase tracking-wider mb-1.5">
                  <UserCircle className="w-3.5 h-3.5" /> İsim
                </label>
                <input
                  type="text"
                  value={editForm.name || ""}
                  onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500/50"
                />
              </div>

              {/* Title */}
              <div>
                <label className="flex items-center gap-1.5 text-stone-400 text-xs font-medium uppercase tracking-wider mb-1.5">
                  <Award className="w-3.5 h-3.5" /> Ünvan
                </label>
                <input
                  type="text"
                  value={editForm.title || ""}
                  onChange={(e) => setEditForm((f) => ({ ...f, title: e.target.value }))}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500/50"
                />
              </div>

              {/* Period */}
              <div>
                <label className="flex items-center gap-1.5 text-stone-400 text-xs font-medium uppercase tracking-wider mb-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Dönem
                </label>
                <input
                  type="text"
                  value={editForm.period || ""}
                  onChange={(e) => setEditForm((f) => ({ ...f, period: e.target.value }))}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500/50"
                />
              </div>

              {/* Full Bio */}
              <div>
                <label className="flex items-center gap-1.5 text-stone-400 text-xs font-medium uppercase tracking-wider mb-1.5">
                  <BookOpen className="w-3.5 h-3.5" /> Biyografi
                </label>
                <textarea
                  value={editForm.fullBio || ""}
                  onChange={(e) => setEditForm((f) => ({ ...f, fullBio: e.target.value }))}
                  rows={6}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500/50 resize-none"
                />
              </div>

              {/* Legacy */}
              <div>
                <label className="flex items-center gap-1.5 text-stone-400 text-xs font-medium uppercase tracking-wider mb-1.5">
                  <ScrollText className="w-3.5 h-3.5" /> Miras
                </label>
                <textarea
                  value={editForm.legacy || ""}
                  onChange={(e) => setEditForm((f) => ({ ...f, legacy: e.target.value }))}
                  rows={3}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500/50 resize-none"
                />
              </div>

              {/* Achievements */}
              <div>
                <label className="flex items-center gap-1.5 text-stone-400 text-xs font-medium uppercase tracking-wider mb-1.5">
                  <Award className="w-3.5 h-3.5" /> Başarılar (virgülle ayırın)
                </label>
                <input
                  type="text"
                  value={(editForm.achievements || []).join(", ")}
                  onChange={(e) =>
                    setEditForm((f) => ({
                      ...f,
                      achievements: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    }))
                  }
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500/50"
                />
              </div>

              {/* Predecessor / Successor */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="flex items-center gap-1.5 text-stone-400 text-xs font-medium uppercase tracking-wider mb-1.5">
                    <ChevronLeft className="w-3.5 h-3.5" /> Önceli
                  </label>
                  <input
                    type="text"
                    value={editForm.predecessor || ""}
                    onChange={(e) => setEditForm((f) => ({ ...f, predecessor: e.target.value }))}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-stone-400 text-xs font-medium uppercase tracking-wider mb-1.5">
                    <ChevronRight className="w-3.5 h-3.5" /> Sonralı
                  </label>
                  <input
                    type="text"
                    value={editForm.successor || ""}
                    onChange={(e) => setEditForm((f) => ({ ...f, successor: e.target.value }))}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500/50"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-2 p-5 border-t border-stone-800 sticky bottom-0 bg-stone-900">
              <button
                onClick={() => setEditingRuler(null)}
                className="px-4 py-2 rounded-xl text-sm text-stone-400 hover:text-white hover:bg-stone-800 transition-all"
              >
                İptal
              </button>
              <button
                onClick={saveEdit}
                className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-sm font-medium rounded-xl transition-colors"
              >
                <Save className="w-4 h-4" />
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
