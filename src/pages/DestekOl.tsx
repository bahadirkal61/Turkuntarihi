import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Heart, ArrowLeft, CreditCard, Landmark, Banknote,
  Shield, Lock, Check, CircleDollarSign,
  Star, Globe, BookOpen, Users
} from "lucide-react";

const AMOUNTS = [50, 100, 250, 500, 1000, 2500];

const BANKS = [
  { name: "Ziraat Bankası", iban: "TR00 0001 0000 0000 0000 0000 01 (ÖRNEK)", holder: "Türk Tarihi Gelişim" },
  { name: "İş Bankası", iban: "TR00 0006 4000 0000 0000 0000 01 (ÖRNEK)", holder: "Türk Tarihi Gelişim" },
  { name: "Garanti BBVA", iban: "TR00 0006 2000 0000 0000 0000 01 (ÖRNEK)", holder: "Türk Tarihi Gelişim" },
  { name: "Akbank", iban: "TR00 0004 6000 0000 0000 0000 01 (ÖRNEK)", holder: "Türk Tarihi Gelişim" },
  { name: "Yapı Kredi", iban: "TR00 0006 7000 0000 0000 0000 01 (ÖRNEK)", holder: "Türk Tarihi Gelişim" },
  { name: "Halkbank", iban: "TR00 0012 0000 0000 0000 0000 01 (ÖRNEK)", holder: "Türk Tarihi Gelişim" },
  { name: "QNB Finansbank", iban: "TR00 0011 1000 0000 0000 0000 01 (ÖRNEK)", holder: "Türk Tarihi Gelişim" },
  { name: "DenizBank", iban: "TR00 0013 4000 0000 0000 0000 01 (ÖRNEK)", holder: "Türk Tarihi Gelişim" },
];

export default function DestekOl() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "transfer">("card");
  const [selectedBank, setSelectedBank] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const finalAmount = selectedAmount || Number(customAmount) || 0;

  const handleCopyIban = () => {
    navigator.clipboard?.writeText(BANKS[selectedBank].iban)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        alert("IBAN kopyalanamadı. Lütfen manuel olarak kopyalayın.");
      });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  return (
    <div className="min-h-screen bg-stone-950">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-950/30 via-stone-950 to-stone-950" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-6 pb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-stone-500 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Ana Sayfa</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-600/20 border border-rose-600/30 mb-6">
              <Heart className="w-8 h-8 text-rose-500" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">
              Projeye <span className="text-rose-500">Destek Ol</span>
            </h1>
            <p className="text-stone-400 max-w-xl mx-auto leading-relaxed">
              Türk Tarihi, ücretsiz ve reklamsız bir platform olarak Türk tarihini gelecek nesillere aktarmayı amaçlıyor.
              Her destek, yeni içerik ve daha iyi bir deneyim demek.
            </p>
          </motion.div>

          {/* Impact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {[
              { icon: BookOpen, title: "Yeni Hükümdar", desc: "Detaylı biyografiler ve görseller", color: "text-amber-400", bg: "bg-amber-600/10", border: "border-amber-600/20" },
              { icon: Globe, title: "Daha Fazla İçerik", desc: "Videolar, çizgi filmler, animasyonlar ve seslendirmeler", color: "text-sky-400", bg: "bg-sky-600/10", border: "border-sky-600/20" },
              { icon: Users, title: "Gelecek Nesiller", desc: "Türk tarihine dijital miras", color: "text-emerald-400", bg: "bg-emerald-600/10", border: "border-emerald-600/20" },
            ].map((item) => (
              <div
                key={item.title}
                className={`${item.bg} border ${item.border} rounded-2xl p-5 text-center`}
              >
                <item.icon className={`w-6 h-6 ${item.color} mx-auto mb-3`} />
                <h3 className="text-white font-bold text-sm mb-1">{item.title}</h3>
                <p className="text-stone-500 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main form */}
      <section className="max-w-2xl mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="bg-stone-900/60 border border-stone-800 rounded-3xl p-6 sm:p-8"
        >
          {/* Amount Selection */}
          <div className="mb-8">
            <label className="flex items-center gap-2 text-sm font-bold text-white mb-4">
              <CircleDollarSign className="w-4 h-4 text-amber-500" />
              Destek Miktarı
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
              {AMOUNTS.map((a) => (
                <button
                  key={a}
                  onClick={() => { setSelectedAmount(a); setCustomAmount(""); }}
                  className={`py-2.5 rounded-xl text-sm font-bold border transition-all duration-200 ${
                    selectedAmount === a
                      ? "bg-amber-600 border-amber-500 text-white shadow-lg shadow-amber-600/20"
                      : "bg-stone-800/50 border-stone-700 text-stone-300 hover:border-stone-600 hover:text-white"
                  }`}
                >
                  {a.toLocaleString()} ₺
                </button>
              ))}
            </div>
            <div className="relative">
              <input
                type="number"
                placeholder="Farklı miktar girin..."
                value={customAmount}
                onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                className="w-full bg-stone-800/50 border border-stone-700 rounded-xl px-4 py-3 text-white text-sm placeholder-stone-500 focus:outline-none focus:border-amber-600 transition-colors"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 text-sm font-medium">₺</span>
            </div>
          </div>

          {/* Payment Method Tabs */}
          <div className="mb-8">
            <label className="flex items-center gap-2 text-sm font-bold text-white mb-4">
              <Shield className="w-4 h-4 text-emerald-500" />
              Ödeme Yöntemi
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setPaymentMethod("card")}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-bold transition-all ${
                  paymentMethod === "card"
                    ? "bg-stone-800 border-amber-600 text-white"
                    : "bg-stone-800/30 border-stone-700 text-stone-400 hover:text-white hover:border-stone-600"
                }`}
              >
                <CreditCard className="w-4 h-4" />
                Kart ile Öde
              </button>
              <button
                onClick={() => setPaymentMethod("transfer")}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-bold transition-all ${
                  paymentMethod === "transfer"
                    ? "bg-stone-800 border-amber-600 text-white"
                    : "bg-stone-800/30 border-stone-700 text-stone-400 hover:text-white hover:border-stone-600"
                }`}
              >
                <Landmark className="w-4 h-4" />
                Havale / EFT
              </button>
            </div>
          </div>

          {/* CARD PAYMENT FORM */}
          {paymentMethod === "card" && (
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div>
                <label className="text-stone-400 text-xs font-medium mb-1.5 block">Kart Üzerindeki İsim</label>
                <input
                  type="text"
                  placeholder="Ad Soyad"
                  className="w-full bg-stone-800/50 border border-stone-700 rounded-xl px-4 py-3 text-white text-sm placeholder-stone-500 focus:outline-none focus:border-amber-600 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="text-stone-400 text-xs font-medium mb-1.5 block">Kart Numarası</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    maxLength={19}
                    className="w-full bg-stone-800/50 border border-stone-700 rounded-xl px-4 py-3 pl-11 text-white text-sm placeholder-stone-500 focus:outline-none focus:border-amber-600 transition-colors tracking-widest"
                    required
                  />
                  <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-stone-400 text-xs font-medium mb-1.5 block">Son Kullanma</label>
                  <input
                    type="text"
                    placeholder="AA/YY"
                    maxLength={5}
                    className="w-full bg-stone-800/50 border border-stone-700 rounded-xl px-4 py-3 text-white text-sm placeholder-stone-500 focus:outline-none focus:border-amber-600 transition-colors text-center tracking-widest"
                    required
                  />
                </div>
                <div>
                  <label className="text-stone-400 text-xs font-medium mb-1.5 block">CVV</label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="***"
                      maxLength={3}
                      className="w-full bg-stone-800/50 border border-stone-700 rounded-xl px-4 py-3 text-white text-sm placeholder-stone-500 focus:outline-none focus:border-amber-600 transition-colors text-center tracking-widest"
                      required
                    />
                    <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-600" />
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-stone-800/40 rounded-xl p-4 border border-stone-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-stone-400 text-sm">Destek Miktarı</span>
                  <span className="text-white font-bold">{finalAmount > 0 ? finalAmount.toLocaleString() : "0"} ₺</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-stone-700/50">
                  <span className="text-white font-bold text-sm">Toplam</span>
                  <span className="text-amber-400 font-black text-lg">{finalAmount > 0 ? finalAmount.toLocaleString() : "0"} ₺</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={finalAmount <= 0}
                className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 disabled:bg-stone-700 disabled:text-stone-500 text-white font-bold py-4 rounded-xl transition-all duration-200 shadow-lg shadow-amber-600/20 disabled:shadow-none"
              >
                <Heart className="w-4 h-4" />
                {finalAmount > 0 ? `${finalAmount.toLocaleString()} ₺ ile Destek Ol` : "Miktar Seçin"}
              </button>

              <div className="flex items-center justify-center gap-2 text-stone-600 text-xs">
                <Lock className="w-3 h-3" />
                <span>256-bit SSL ile güvenli ödeme</span>
              </div>
            </motion.form>
          )}

          {/* BANK TRANSFER FORM */}
          {paymentMethod === "transfer" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              {/* Bank Selection */}
              <div>
                <label className="text-stone-400 text-xs font-medium mb-2 block">Banka Seçimi</label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1 custom-scroll">
                  {BANKS.map((bank, i) => (
                    <button
                      key={bank.name}
                      onClick={() => setSelectedBank(i)}
                      className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all ${
                        selectedBank === i
                          ? "bg-stone-800 border-amber-600"
                          : "bg-stone-800/30 border-stone-700 hover:border-stone-600"
                      }`}
                    >
                      <Banknote className={`w-4 h-4 ${selectedBank === i ? "text-amber-500" : "text-stone-500"}`} />
                      <span className={`text-xs font-medium ${selectedBank === i ? "text-white" : "text-stone-400"}`}>
                        {bank.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* IBAN Info */}
              <div className="bg-stone-800/50 border border-stone-700 rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600/15 flex items-center justify-center">
                    <Landmark className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">{BANKS[selectedBank].name}</h4>
                    <p className="text-stone-500 text-xs">Havale / EFT</p>
                  </div>
                </div>

                <div>
                  <label className="text-stone-500 text-xs mb-1 block">Alıcı</label>
                  <p className="text-white font-medium text-sm">{BANKS[selectedBank].holder}</p>
                </div>

                <div>
                  <label className="text-stone-500 text-xs mb-1 block">IBAN</label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-amber-400 text-sm font-mono tracking-wide">
                      {BANKS[selectedBank].iban}
                    </code>
                    <button
                      onClick={handleCopyIban}
                      className="shrink-0 px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-400 hover:text-white hover:border-stone-600 text-xs font-medium transition-all"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-500" /> : "Kopyala"}
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-700/50">
                  <p className="text-stone-500 text-xs leading-relaxed">
                    Açıklama kısmına <span className="text-amber-400 font-medium">"Türk Tarihi Destek"</span> yazmayı unutmayın.
                    Desteğiniz için teşekkür ederiz.
                  </p>
                </div>
              </div>

              {/* Amount reminder */}
              {finalAmount > 0 && (
                <div className="bg-amber-600/10 border border-amber-600/20 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-stone-400 text-xs">Planlanan Destek</p>
                    <p className="text-white font-bold text-lg">{finalAmount.toLocaleString()} ₺</p>
                  </div>
                  <Heart className="w-6 h-6 text-amber-500" />
                </div>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Trust badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-stone-600 text-xs">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" /> 256-bit SSL
          </span>
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" /> Güvenli Ödeme
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5" /> Kişisel Veri Korunur
          </span>
        </div>
      </section>

      {/* Success Toast */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Heart className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-sm">Desteğiniz İçin Teşekkürler!</p>
            <p className="text-white/70 text-xs">{finalAmount.toLocaleString()} ₺ desteğiniz bize çok değerli.</p>
          </div>
        </motion.div>
      )}

      <style>{`
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #44403c; border-radius: 4px; }
        .custom-scroll { scrollbar-color: #44403c transparent; scrollbar-width: thin; }
      `}</style>
    </div>
  );
}
