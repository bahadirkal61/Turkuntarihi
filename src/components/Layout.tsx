import { memo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, BookOpen, Home, Scroll, Landmark, Globe, Crown, Info, TreePine, Users, Palette } from "lucide-react";
import PWARegister from "./PWARegister";
import LanguageSwitcher from "./LanguageSwitcher";

const navLinks = [
  { path: "/", label: "Anasayfa", icon: Home },
  { path: "/tarih", label: "Tarih", icon: Landmark },
  { path: "/turk-soyu", label: "Soy Ağacı", icon: TreePine },
  { path: "/biyografiler", label: "Biyografiler", icon: Users },
  { path: "/sanat", label: "Sanat", icon: Palette },
  { path: "/destanlar", label: "Destanlar", icon: BookOpen },
  { path: "/yazitlar", label: "Yazıtlar", icon: Scroll },
  { path: "/kultur", label: "Kültür", icon: Crown },
  { path: "/cografya", label: "Coğrafya", icon: Globe },
  { path: "/hakkimizda", label: "Hakkında", icon: Info },
];

function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <PWARegister />

      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-stone-900 text-amber-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-wide" aria-label="Türk Tarihi - Ana Sayfa">
              <span className="text-amber-400 text-2xl" aria-hidden="true">𐱅</span>
              <span className="hidden sm:inline">Türk Tarihi</span>
            </Link>

            {/* Skip to content - accessibility */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-amber-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:font-medium"
            >
              Ana içeriğe atla
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5" aria-label="Ana menü">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  aria-label={link.label}
                  aria-current={location.pathname === link.path ? "page" : undefined}
                  className={`flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-stone-900 ${
                    location.pathname === link.path || (link.path !== "/" && location.pathname.startsWith(link.path + "/"))
                      ? "bg-amber-700 text-white"
                      : "hover:bg-stone-800 text-stone-300 hover:text-white"
                  }`}
                >
                  <link.icon size={14} aria-hidden="true" />
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side: Language + Mobile toggle */}
            <div className="flex items-center gap-3">
              <LanguageSwitcher />

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
                aria-expanded={mobileOpen}
                className="lg:hidden p-2 rounded-md hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {mobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="lg:hidden bg-stone-800 border-t border-stone-700" aria-label="Mobil menü">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b border-stone-700 ${
                  location.pathname === link.path || (link.path !== "/" && location.pathname.startsWith(link.path + "/"))
                    ? "bg-amber-700 text-white"
                    : "text-stone-400 hover:bg-stone-700"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                <link.icon size={16} aria-hidden="true" />
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main id="main-content" role="main">{children}</main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 text-xl font-bold text-amber-400 mb-3">
                <span aria-hidden="true">𐱅</span>
                <span>Türk Tarihi</span>
              </div>
              <p className="text-sm leading-relaxed">
                Türk tarihinin, kültürünün, edebiyatının ve coğrafyasının kapsamlı dijital ansiklopedisi.
                M.Ö. 520&apos;den günümüze Türk milletinin destansı yolculuğu.
              </p>
            </div>
            <nav aria-label="Footer hızlı bağlantılar">
              <h3 className="text-amber-400 font-semibold mb-3">Hızlı Bağlantılar</h3>
              <div className="space-y-2 text-sm">
                <Link to="/tarih" className="block hover:text-amber-400 transition-colors">Türk Tarihi</Link>
                <Link to="/biyografiler" className="block hover:text-amber-400 transition-colors">Tarihi Şahsiyetler</Link>
                <Link to="/destanlar" className="block hover:text-amber-400 transition-colors">Destanlar</Link>
                <Link to="/yazitlar" className="block hover:text-amber-400 transition-colors">Orhun Yazıtları</Link>
                <Link to="/kultur" className="block hover:text-amber-400 transition-colors">Kut Töresi ve İnancı</Link>
                <Link to="/cografya" className="block hover:text-amber-400 transition-colors">Günümüz Türk Devletleri</Link>
                <Link to="/turk-soyu" className="block hover:text-amber-400 transition-colors">Türk Soyu</Link>
                <Link to="/geri-bildirim" className="block hover:text-emerald-400 transition-colors">Geri Bildirim</Link>
              </div>
            </nav>
            <nav aria-label="Orhun Yazıtları">
              <h3 className="text-amber-400 font-semibold mb-3">Orhun Yazıtları</h3>
              <div className="space-y-2 text-sm">
                <Link to="/yazitlar/bilge-kagan" className="block hover:text-amber-400 transition-colors">Bilge Kağan Yazıtı</Link>
                <Link to="/yazitlar/kul-tigin" className="block hover:text-amber-400 transition-colors">Kül Tigin Yazıtı</Link>
                <Link to="/yazitlar/tonyukuk" className="block hover:text-amber-400 transition-colors">Tonyukuk Yazıtı</Link>
                <Link to="/yazitlar/orhun-yazitlari" className="block hover:text-amber-400 transition-colors">Orhun Yazıtları Genel</Link>
              </div>
            </nav>
          </div>
          <div className="border-t border-stone-800 mt-8 pt-6 text-center text-xs text-stone-400">
            <p> Türk Tarihi. Türk tarihi ve kültürüne adanmış dijital bir platform.</p>
            <p className="mt-1">Akademik kaynaklardan derlenmiştir.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default memo(Layout);
