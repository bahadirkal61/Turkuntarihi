import { memo, useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageSquare, Bug, Lightbulb, Heart, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { trpc } from "@/providers/trpc";

const categories = [
  { id: "bug", label: "Hata / Sorun", icon: Bug, desc: "Teknik sorunlar" },
  { id: "feature", label: "Özellik Önerisi", icon: Lightbulb, desc: "Yeni özellik fikirleri" },
  { id: "content", label: "İçerik", icon: MessageSquare, desc: "İçerik önerileri" },
  { id: "other", label: "Diğer", icon: Heart, desc: "Diğer geri bildirimler" },
];

function Feedback() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    category: "" as string,
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const submitMutation = trpc.feedback.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setError("");
    },
    onError: (err) => {
      setError(err.message || "Bir hata oluştu. Lütfen tekrar deneyin.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.message || form.message.length < 10) {
      setError("Mesaj en az 10 karakter olmalıdır.");
      return;
    }

    submitMutation.mutate({
      name: form.name || "İsimsiz",
      email: form.email || "belirtilmedi@turkuntarihi.com",
      subject: form.subject || form.category || "Geri Bildirim",
      message: form.message,
      category: (form.category as "bug" | "feature" | "content" | "other") || "other",
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-stone-950 text-stone-100 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <CheckCircle size={64} className="text-emerald-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-amber-400 mb-3">Teşekkür Ederiz!</h1>
          <p className="text-stone-400 leading-relaxed mb-8">
            Geri bildiriminiz başarıyla alındı ve veritabanına kaydedildi. 
            Türk Tarihi Atlası&apos;nı daha iyi hale getirmemize yardımcı olduğunuz için teşekkür ederiz.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            <ArrowLeft size={18} />
            Ana Sayfaya Dön
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      {/* Hero */}
      <section className="bg-stone-900 border-b border-stone-800">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <Link to="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-amber-400 transition-colors text-sm mb-6">
            <ArrowLeft size={16} />
            Ana Sayfaya Dön
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-900/30 border border-emerald-700/30 flex items-center justify-center">
                <MessageSquare size={20} className="text-emerald-400" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-amber-400">Geri Bildirim</h1>
            </div>
            <p className="text-stone-400">
              Deneyimlerinizi, eksik gördüğünüz yerleri veya geliştirme fikirlerinizi bizimle paylaşın.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="max-w-3xl mx-auto px-4 py-8">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-red-900/20 border border-red-800/50 rounded-xl p-4 flex items-center gap-3"
          >
            <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
            <p className="text-red-300 text-sm">{error}</p>
          </motion.div>
        )}

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-300 mb-1.5">Adınız</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Adınız"
                required
                className="w-full bg-stone-900 border border-stone-800 rounded-lg px-4 py-2.5 text-sm text-stone-100 placeholder-stone-600 focus:border-amber-600 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-300 mb-1.5">E-posta</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="ornek@email.com"
                required
                className="w-full bg-stone-900 border border-stone-800 rounded-lg px-4 py-2.5 text-sm text-stone-100 placeholder-stone-600 focus:border-amber-600 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-stone-300 mb-1.5">Konu</label>
            <input
              type="text"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              placeholder="Geri bildiriminizin konusu"
              required
              className="w-full bg-stone-900 border border-stone-800 rounded-lg px-4 py-2.5 text-sm text-stone-100 placeholder-stone-600 focus:border-amber-600 focus:outline-none transition-colors"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-stone-300 mb-2">Kategori</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setForm({ ...form, category: cat.id })}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                    form.category === cat.id
                      ? "bg-emerald-900/20 border-emerald-600/50 text-emerald-400"
                      : "bg-stone-900 border-stone-800 text-stone-500 hover:border-stone-600 hover:text-stone-300"
                  }`}
                >
                  <cat.icon size={22} />
                  <span className="text-xs font-medium text-center">{cat.label}</span>
                  <span className="text-[10px] text-stone-600 text-center leading-tight">{cat.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-stone-300 mb-1.5">Mesajınız</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              minLength={10}
              rows={6}
              placeholder="Deneyiminizi, eksik gördüğünüz yeri veya önerilerinizi buraya yazın..."
              className="w-full bg-stone-900 border border-stone-800 rounded-lg px-4 py-3 text-sm text-stone-100 placeholder-stone-600 focus:border-amber-600 focus:outline-none transition-colors resize-y"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitMutation.isPending}
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-colors"
          >
            {submitMutation.isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Gönderiliyor...
              </>
            ) : (
              <>
                <Send size={16} />
                Gönder
              </>
            )}
          </button>

          <p className="text-xs text-stone-600 text-center">
            Geri bildirimleriniz veritabanında güvenli bir şekilde saklanır. 
            Projeyi geliştirmemize yardımcı olur, teşekkür ederiz.
          </p>
        </motion.form>
      </section>
    </div>
  );
}

export default memo(Feedback);
