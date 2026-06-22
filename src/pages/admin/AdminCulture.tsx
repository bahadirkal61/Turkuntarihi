import { useState } from "react";
import { Crown, Pencil, Save, X } from "lucide-react";

interface SectionData {
  title: string;
  paragraphs: string[];
}

const defaultSections: SectionData[] = [
  {
    title: "KUT NEDİR?",
    paragraphs: [
      "Kut, Eski Türkçe'de 'mutluluk, uğur, devlet, baht, talih, saadet' anlamlarına gelir. Tengricilik inancında Tanrı'nın (Tengri) insana verdiği kutsal bir lütuf olarak görülür.",
      "Kut, sadece kişisel bir şans değil, toplumsal bir iktidar gücüdür. Hükümdarın tahta çıkışını meşrulaştıran, halkı bir arada tutan ruhsal bir bağdır.",
      "Kut sahibi kişi, toplumun lideri olmakla yükümlüdür. Halka hizmet etmeli, adaleti sağlamalı, Töre'ye uygun hareket etmelidir. Kut, sınırsız bir güç değil, sınırsız bir sorumluluktur.",
    ],
  },
  {
    title: "KUT ve TÖRE",
    paragraphs: [
      "Töre, Türk toplumunun yazılı olmayan anayasasıdır. Kut'un toplumsal karşılığıdır. Hükümdar Kut'u Töre ile birlikte kullanır.",
      "Kut-Töre ikilisi, Türk siyaset felsefesinin temel direğidir. Kut ilahi otoriteyi, Töre toplumsal düzeni temsil eder. Biri olmadan diğeri anlamsızdır.",
      "Hükümdar Töre'yi çiğnerse, Kut'u kaybeder. Bu, halkın isyan etme hakkını doğurur. Meşruiyet, halkın rızasına ve Töre'ye bağlıdır.",
    ],
  },
  {
    title: "KUT-TALİH-ERDEM",
    paragraphs: [
      "Kut (ilahi lütuf), Talih (kişisel çaba) ve Erdem (ahlak üstünlüğü) üçgeni, Türk hükümdarlık felsefesinin merkezindedir.",
      "Sadece Kut sahibi olmak yeterli değildir. Hükümdar talihli olmalı, yani başarılı olabilmek için çaba göstermelidir. En önemlisi, erdemli olmalıdır.",
      "Erdem; cömertlik, doğruluk, adalet, cesaret ve halka hizmet demektir. Kutadgu Bilig'de erdemli olmayan hükümdarın Kut'unu kaybedeceği vurgulanır.",
    ],
  },
  {
    title: "HAN · TEGİN · KAĞAN",
    paragraphs: [
      "HAN: Halkın babası. Siyasi ve askeri lider. Halkı koruma ve yönetme sorumluluğu.",
      "TEGİN: Prens, komutan. Han'ın yardımcısı. Ordunun başında savaş meydanında liderlik eder.",
      "KAĞAN: İmparator. En yüksek otorite. Tanrı'nın yer yüzündeki temsilcisi.",
    ],
  },
  {
    title: "TENGRİCİLİK ve KUT",
    paragraphs: [
      "Tengricilik, Türklerin eski dinidir. Tek Tanrı inancı (Tengri) üzerine kuruludur. Kut, Tengricilik'in siyasal boyutudur.",
      "Tengricilik'te Tengri, evrenin yaratıcısı ve tek hâkimidir. Hükümdar, Tengri'nin yer yüzündeki temsilcisi (gölgesi) olarak görülür.",
      "Kut, Tengricilik inancında ruhun bir parçasıdır. İnsan doğarken Tengri tarafından verilir. Erdemli yaşayan insanın Kut'u güçlenir.",
    ],
  },
  {
    title: "İSLAM ve KUT",
    paragraphs: [
      "Türkler İslamiyet'i kabul ettikten sonra Kut anlayışı İslami kavramlarla zenginleşmiştir. Kut, Allah'ın lütfu (nimet) olarak yorumlanmıştır.",
      "Karahanlılar'dan itibaren Kut, 'Allah'ın hilafeti' kavramıyla birleşmiştir. Hükümdar, Allah'ın halifesi olarak görülür ve Kut, Allah tarafından verilen bir yetkidir.",
      "Kutadgu Bilig'de bu sentez en güzel şekilde görülür. Yusuf Has Hacib, Kut'u İslami erdemlerle (adalet, cömertlik, doğruluk) birleştirerek yeni bir hükümdarlık felsefesi oluşturmuştur.",
    ],
  },
  {
    title: "KUT TÖRENİ",
    paragraphs: [
      "1. Kut İsteme: Yeni hükümdar, Tengri/Allah'a dua eder, Kut'u dilemek için ibadet eder.",
      "2. Kut Kuşanma: Hükümdar, kutsal kılıç kuşanır ve taç giyer. Bu, Kut'un sembolik aktarımıdır.",
      "3. Halka Söz Verme: Hükümdar, halk önünde Töre'ye uygun hüküm süreceğine dair yemin eder.",
    ],
  },
  {
    title: "NEVRUZ ve KUT",
    paragraphs: [
      "Nevruz, Türk kut geleneğinin en önemli törenidir. 21 Mart'ta kutlanan yılbaşı, Kut'un yenilendiği gün olarak görülür.",
      "Nevruz'da hükümdar, halka armağanlar dağıtır, zindanları boşaltır, vergileri affeder. Bu, Kut'un bereketini halkla paylaşma ritüelidir.",
      "Orhun Yazıtları'nda Nevruz törenlerinin zenginliğinden bahsedilir. Kutadgu Bilig'de hükümdarın Nevruz'da halkla bütünleşmesi vurgulanır.",
    ],
  },
];

export default function AdminCulture() {
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [form, setForm] = useState<SectionData>({ title: "", paragraphs: [] });
  const [message, setMessage] = useState("");

  const openEdit = (section: SectionData, idx: number) => {
    setEditingIdx(idx);
    setForm({ title: section.title, paragraphs: [...section.paragraphs] });
  };

  const saveEdit = () => {
    if (editingIdx === null) return;
    const key = `admin_culture_${editingIdx}`;
    localStorage.setItem(key, JSON.stringify(form));
    setMessage("Kaydedildi! (localStorage)");
    setTimeout(() => setMessage(""), 2000);
    setEditingIdx(null);
  };

  const getSaved = (idx: number): SectionData | null => {
    const saved = localStorage.getItem(`admin_culture_${idx}`);
    return saved ? JSON.parse(saved) : null;
  };

  const addParagraph = () => {
    setForm((f) => ({ ...f, paragraphs: [...f.paragraphs, ""] }));
  };

  const removeParagraph = (pIdx: number) => {
    setForm((f) => ({
      ...f,
      paragraphs: f.paragraphs.filter((_, i) => i !== pIdx),
    }));
  };

  const updateParagraph = (pIdx: number, value: string) => {
    setForm((f) => ({
      ...f,
      paragraphs: f.paragraphs.map((p, i) => (i === pIdx ? value : p)),
    }));
  };

  return (
    <div className="min-h-screen bg-stone-950 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Crown className="w-6 h-6 text-amber-500" />
            Kut Töresi Düzenle
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            {defaultSections.length} bölümün başlık ve paragraflarını düzenleyin
          </p>
        </div>
        {message && (
          <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm">
            {message}
          </div>
        )}
      </div>

      <div className="space-y-4">
        {defaultSections.map((section, idx) => {
          const saved = getSaved(idx);
          const isEditing = editingIdx === idx;
          const display = saved || section;

          return (
            <div
              key={idx}
              className={`bg-stone-900 border rounded-xl p-5 transition-all ${
                saved ? "border-amber-500/30" : "border-stone-800"
              }`}
            >
              {isEditing ? (
                <div className="space-y-3">
                  <div>
                    <label className="text-stone-500 text-xs uppercase font-bold tracking-wider mb-1 block">
                      Bölüm Başlığı
                    </label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-white text-sm font-bold focus:outline-none focus:border-amber-500/50"
                    />
                  </div>

                  {form.paragraphs.map((p, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2">
                      <div className="flex-1">
                        <label className="text-stone-500 text-xs uppercase font-bold tracking-wider mb-1 block">
                          Paragraf {pIdx + 1}
                        </label>
                        <textarea
                          value={p}
                          onChange={(e) => updateParagraph(pIdx, e.target.value)}
                          rows={3}
                          className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500/50 resize-none"
                        />
                      </div>
                      <button
                        onClick={() => removeParagraph(pIdx)}
                        className="mt-6 p-1.5 text-stone-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Paragrafı sil"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={addParagraph}
                    className="text-amber-400 text-sm hover:text-amber-300 transition-colors"
                  >
                    + Yeni paragraf ekle
                  </button>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={saveEdit}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      <Save className="w-3.5 h-3.5" /> Kaydet
                    </button>
                    <button
                      onClick={() => setEditingIdx(null)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-stone-400 hover:text-white text-sm rounded-lg hover:bg-stone-800 transition-all"
                    >
                      <X className="w-3.5 h-3.5" /> İptal
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      {saved && (
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" title="Düzenlendi" />
                      )}
                      <h3 className="text-white font-bold text-lg">{display.title}</h3>
                    </div>
                    <div className="space-y-2">
                      {display.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} className="text-stone-400 text-sm leading-relaxed">
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => openEdit(section, idx)}
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
