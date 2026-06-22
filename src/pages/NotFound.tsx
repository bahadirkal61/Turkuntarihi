import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Search, MapPin } from "lucide-react";
import SEO from "../components/SEO";

const quickLinks = [
  { label: "Türk Tarihi", href: "/tarih", icon: MapPin },
  { label: "Destanlar", href: "/destanlar", icon: Search },
  { label: "Yazıtlar", href: "/yazitlar", icon: Search },
  { label: "Biyografiler", href: "/biyografiler", icon: Search },
  { label: "Coğrafya", href: "/cografya", icon: MapPin },
  { label: "Kut Töresi", href: "/kultur", icon: Search },
];

export default function NotFound() {
  return (
    <>
      <SEO
        title="Sayfa Bulunamadı - 404"
        description="Aradığınız sayfa bulunamadı. Türk Tarihi'nin diğer bölümlerini keşfedin."
      />

      <div className="min-h-screen bg-stone-950 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-lg"
        >
          {/* 404 Number */}
          <div className="relative mb-8">
            <span className="text-[120px] md:text-[160px] font-black text-stone-800 leading-none select-none">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl md:text-6xl font-black text-amber-500">
                𐱅
              </span>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Sayfa Bulunamadı
          </h1>
          <p className="text-stone-400 mb-8 leading-relaxed">
            Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
            <br />
            Ama endişelenmeyin, Türk tarihinin izini sürmeye devam edebilirsiniz.
          </p>

          {/* Quick Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="flex items-center gap-2 px-4 py-3 bg-stone-900 border border-stone-800 rounded-xl text-stone-300 hover:text-amber-400 hover:border-amber-800/50 transition-all text-sm"
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Back to Home */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            <Home className="w-4 h-4" />
            Ana Sayfaya Dön
          </Link>

          <p className="text-stone-600 text-xs mt-6">
            Eğer bir bağlantının çalışmadığını düşünüyorsanız,
            {" "}
            <Link to="/geri-bildirim" className="text-amber-600 hover:text-amber-400">
              geri bildirimde
            </Link>
            {" "}
            bulunabilirsiniz.
          </p>
        </motion.div>
      </div>
    </>
  );
}
