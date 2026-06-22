import { memo } from "react";
import { Link } from "react-router-dom";
import { Palette, Brush, Music, Camera, Film, BookMarked, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  {
    icon: Brush,
    title: "Resim & Minyatür",
    description: "Bozkır sanatından Osmanlı minyatürüne, Osman Hamdi Bey'den çağdaş Türk resmine 2600 yıllık görsel miras.",
    status: "active",
    path: "/sanat/resim-minyatur",
  },
  {
    icon: Music,
    title: "Müzik & Ezgiler & Marşlar",
    description: "Köroğlu türkülerinden Neşet Ertaş'a, Mehter'den İstiklal Marşı'na, Safiye Ayla'dan Barış Manço'ya müzik mirası.",
    status: "active",
    path: "/sanat/muzik",
  },
  {
    icon: BookMarked,
    title: "Edebiyat & Şiir",
    description: "Dede Korkut'tan Orhan Pamuk'a, Yunus Emre'den Nazım Hikmet'e bin yıllık edebiyat.",
    status: "coming",
  },
  {
    icon: Camera,
    title: "Fotoğraf & Görsel",
    description: "Ara Güler'den çağdaş sanatçılara, fotoğraf sanatının Türkiye'deki serüveni.",
    status: "coming",
  },
  {
    icon: Film,
    title: "Sinema & Tiyatro",
    description: "Muhsin Ertuğrul'dan Nuri Bilge Ceylan'a, Şehir Tiyatroları'ndan modern sinemaya.",
    status: "coming",
  },
  {
    icon: Sparkles,
    title: "El Sanatları & Çini",
    description: "İznik çinisinden Hereke halısına, Ebru sanatından bakırcılığa geleneksel zanaat.",
    status: "coming",
  },
];

function Art() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      {/* Hero */}
      <section className="relative bg-stone-900 border-b border-stone-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="art-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="1" fill="#d97706" opacity="0.6" />
                <path d="M 30 10 L 30 50 M 10 30 L 50 30" stroke="#d97706" strokeWidth="0.3" opacity="0.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#art-pattern)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-900/30 border-2 border-amber-600/40 mb-6">
              <Palette size={40} className="text-amber-400" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-amber-400 mb-4 tracking-tight">
              Türk Sanatı
            </h1>
            <p className="text-lg sm:text-xl text-stone-400 max-w-2xl mx-auto leading-relaxed">
              M.Ö. 600&apos;den günümüze Türk milletinin görsel, işitsel ve edebi sanat mirasının
              kapsamlı ansiklopedisi.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-900/30 border border-amber-700/30 text-amber-400 text-sm font-medium">
              <Sparkles size={14} />
              Yakında Sizlerle
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, index) => {
            const CardContent = (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className={`group relative bg-stone-900 border rounded-xl p-6 transition-all duration-300 ${
                  cat.status === "active"
                    ? "border-stone-800 hover:border-amber-600/50 cursor-pointer"
                    : "border-stone-800 cursor-default"
                }`}
              >
                <div className="absolute inset-0 bg-amber-900/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-lg bg-amber-900/20 border border-amber-800/30 flex items-center justify-center mb-4 group-hover:bg-amber-900/30 transition-colors">
                    <cat.icon size={26} className="text-amber-500" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-100 mb-2 group-hover:text-amber-400 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-stone-500 leading-relaxed mb-4">
                    {cat.description}
                  </p>
                  {cat.status === "active" ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-400 bg-amber-900/20 border border-amber-800/30 px-3 py-1 rounded-full">
                      İncele
                      <ArrowRight size={10} />
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 bg-stone-800 px-3 py-1 rounded-full">
                      <Sparkles size={10} />
                      Yakında
                    </span>
                  )}
                </div>
              </motion.div>
            );

            return cat.status === "active" && cat.path ? (
              <Link key={cat.title} to={cat.path} className="block">
                {CardContent}
              </Link>
            ) : (
              <div key={cat.title}>{CardContent}</div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-stone-900 border border-stone-800 rounded-2xl p-8 sm:p-12 text-center"
        >
          <Palette size={32} className="text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold text-amber-400 mb-3">
            Türk Sanatı Yolculuğu Başlıyor
          </h2>
          <p className="text-stone-400 max-w-xl mx-auto leading-relaxed mb-6">
            Bu bölümde Türk sanatının tüm dallarını — minyatürden fotoğrafa, türküden sinemaya — 
            derinlemesine inceleyeceğiz. Her bir sanatçının hayatı, eserleri ve mirası detaylı 
            biyografilerle sunulacak.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-stone-500">
            <span className="flex items-center gap-1.5">
              <BookMarked size={14} className="text-amber-600" />
              Biyografiler
            </span>
            <span className="text-stone-700">•</span>
            <span className="flex items-center gap-1.5">
              <Brush size={14} className="text-amber-600" />
              Eserler
            </span>
            <span className="text-stone-700">•</span>
            <span className="flex items-center gap-1.5">
              <Music size={14} className="text-amber-600" />
              Dönemler
            </span>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default memo(Art);
