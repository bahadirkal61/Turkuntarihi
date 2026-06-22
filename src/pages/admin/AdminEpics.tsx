import { useState } from "react";
import { epics } from "../../data/epics";
import { BookOpen, Pencil, Save, X } from "lucide-react";

export default function AdminEpics() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", subtitle: "", description: "" });
  const [message, setMessage] = useState("");

  const openEdit = (epic: typeof epics[0]) => {
    setEditingId(epic.id);
    setForm({ title: epic.title, subtitle: epic.subtitle, description: epic.description });
  };

  const saveEdit = () => {
    if (!editingId) return;
    const key = `admin_epic_${editingId}`;
    localStorage.setItem(key, JSON.stringify(form));
    setMessage("Kaydedildi! (localStorage)");
    setTimeout(() => setMessage(""), 2000);
    setEditingId(null);
  };

  const getSaved = (id: string) => {
    const saved = localStorage.getItem(`admin_epic_${id}`);
    if (saved) return JSON.parse(saved) as { title: string; subtitle: string; description: string };
    return null;
  };

  return (
    <div className="min-h-screen bg-stone-950 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-amber-500" />
            Destanlar Düzenle
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            {epics.length} destanın başlık, alt başlık ve açıklamalarını düzenleyin
          </p>
        </div>
        {message && (
          <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm">
            {message}
          </div>
        )}
      </div>

      <div className="space-y-3">
        {epics.map((epic) => {
          const saved = getSaved(epic.id);
          const isEditing = editingId === epic.id;
          const display = saved || epic;

          return (
            <div
              key={epic.id}
              className={`bg-stone-900 border rounded-xl p-5 transition-all ${
                saved ? "border-amber-500/30" : "border-stone-800"
              }`}
            >
              {isEditing ? (
                <div className="space-y-3">
                  <div>
                    <label className="text-stone-500 text-xs uppercase font-bold tracking-wider mb-1 block">Başlık</label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500/50"
                    />
                  </div>
                  <div>
                    <label className="text-stone-500 text-xs uppercase font-bold tracking-wider mb-1 block">Alt Başlık</label>
                    <input
                      type="text"
                      value={form.subtitle}
                      onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500/50"
                    />
                  </div>
                  <div>
                    <label className="text-stone-500 text-xs uppercase font-bold tracking-wider mb-1 block">Açıklama</label>
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                      rows={3}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500/50 resize-none"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={saveEdit}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      <Save className="w-3.5 h-3.5" /> Kaydet
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-stone-400 hover:text-white text-sm rounded-lg hover:bg-stone-800 transition-all"
                    >
                      <X className="w-3.5 h-3.5" /> İptal
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {saved && <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" title="Düzenlendi" />}
                      <h3 className="text-white font-bold">{display.title}</h3>
                    </div>
                    <p className="text-stone-400 text-sm mb-1">{display.subtitle}</p>
                    <p className="text-stone-500 text-xs line-clamp-2">{display.description}</p>
                  </div>
                  <button
                    onClick={() => openEdit(epic)}
                    className="p-2 hover:bg-amber-500/10 rounded-lg text-stone-500 hover:text-amber-400 transition-colors flex-shrink-0"
                    title="Düzenle"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
