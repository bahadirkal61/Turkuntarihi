import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Crown, Scroll, BookOpen, Flame, ChevronRight, Heart, Shield, Quote, MessageSquare
} from "lucide-react";
import { rulerQuotes } from "../data/quotes";
import SearchBox from "../components/SearchBox";
import EditableText from "../components/EditableText";
import "./Home.css";

/* ---- PARTICLES ---- */
function Particles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: 2 + Math.random() * 3,
    delay: Math.random() * 3,
    duration: 2 + Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-amber-500"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: 0.4,
            animation: `twinkle ${p.duration}s ease-in-out infinite ${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ---- MAIN HOME ---- */
export default function Home() {
  const revealRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.15 }
    );
    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addRef = (el: HTMLDivElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  /* Random quotes for side panels */
  const total = rulerQuotes.length;
  let i1 = Math.floor(Math.random() * total);
  let i2 = Math.floor(Math.random() * total);
  while (i2 === i1) i2 = Math.floor(Math.random() * total);
  const qLeft = rulerQuotes[i1];
  const qRight = rulerQuotes[i2];

  return (
    <div className="min-h-screen bg-stone-950 relative overflow-hidden">
        {/* ===== HERO ===== */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-4">
        {/* Side Quotes — position:absolute ile sayfaya sabit, scroll ile hareket eder */}
        <div
          className="hidden xl:block"
          style={{ position: "absolute", top: "80px", left: "12px", zIndex: 20, width: "200px" }}
        >
          <div className="bg-stone-900/80 backdrop-blur-sm border border-stone-700/40 border-l-2 border-l-amber-600/60 rounded-xl p-4">
            <Quote className="w-4 h-4 text-amber-500/60 mb-2" />
            <p className="text-stone-300 text-xs leading-relaxed italic font-light">
              &ldquo;{qLeft.text}&rdquo;
            </p>
            <div className="mt-2">
              <p className="text-amber-400/80 text-[10px] font-semibold">{qLeft.author}</p>
              <p className="text-stone-600 text-[9px]">{qLeft.source}</p>
            </div>
          </div>
        </div>
        <div
          className="hidden xl:block"
          style={{ position: "absolute", top: "80px", right: "12px", zIndex: 20, width: "200px" }}
        >
          <div className="bg-stone-900/80 backdrop-blur-sm border border-stone-700/40 border-r-2 border-r-amber-600/60 rounded-xl p-4 text-right">
            <Quote className="w-4 h-4 text-amber-500/60 mb-2 ml-auto" />
            <p className="text-stone-300 text-xs leading-relaxed italic font-light">
              &ldquo;{qRight.text}&rdquo;
            </p>
            <div className="mt-2">
              <p className="text-amber-400/80 text-[10px] font-semibold">{qRight.author}</p>
              <p className="text-stone-600 text-[9px]">{qRight.source}</p>
            </div>
          </div>
        </div>

        <Particles />

        <div className="absolute top-[15%] left-[10%] float hidden md:block">
          <Crown className="w-6 h-6 text-amber-500/40" />
        </div>
        <div className="absolute top-[20%] right-[15%] float float-delay-1 hidden md:block">
          <Scroll className="w-5 h-5 text-amber-500/30" />
        </div>
        <div className="absolute bottom-[25%] left-[15%] float float-delay-2 hidden md:block">
          <BookOpen className="w-5 h-5 text-amber-500/30" />
        </div>
        <div className="absolute bottom-[20%] right-[10%] float float-delay-3 hidden md:block">
          <Flame className="w-6 h-6 text-amber-500/40" />
        </div>

        {/* Admin Login - sadece ana sayfada, küçük ve göze batmaz */}
        <div className="absolute top-4 right-4 z-50">
          <Link
            to="/yonetim/giris"
            className="flex items-center gap-1.5 bg-stone-950/40 backdrop-blur-sm text-stone-600 hover:text-amber-400 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all border border-stone-800/50 hover:border-amber-500/30"
            title="Yönetici Girişi"
          >
            <Shield className="w-3 h-3" />
            <span className="hidden sm:inline">Yönetici</span>
          </Link>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-amber-600/10 border border-amber-600/20">
            <Crown className="w-4 h-4 text-amber-500 shrink-0" />
            <EditableText
              storageKey="home_badge"
              defaultValue="272 Devlet Başkanı · 21 Devlet · 2500 Yıl"
              className="text-amber-400 text-sm font-medium tracking-wide"
            >
              272 Devlet Başkanı · 21 Devlet · 2500 Yıl
            </EditableText>
          </div>

          <EditableText
            storageKey="home_title"
            defaultValue="TÜRK TARİHİ"
            className="shimmer-text text-5xl sm:text-6xl lg:text-8xl font-black mb-6 tracking-tight leading-none block"
            as="h1"
          >
            TÜRK TARİHİ
          </EditableText>

          <EditableText
            storageKey="home_desc1"
            defaultValue="M.Ö. 520'den günümüze, İskitler'den Osmanlı'ya, 272 hükümdar, 21 devlet, destanlar, yazıtlar ve unutulmaz bir medeniyet."
            className="text-lg sm:text-xl text-stone-400 max-w-2xl mx-auto mb-4 leading-relaxed font-light block"
            as="p"
          >
            M.Ö. 520&apos;den günümüze, İskitler&apos;den Osmanlı&apos;ya,
            272 hükümdar, 21 devlet, destanlar, yazıtlar ve unutulmaz bir medeniyet.
          </EditableText>

          <EditableText
            storageKey="home_desc2"
            defaultValue="Orhun Yazıtları'ndan Kutadgu Bilig'e, Manas'tan Destan-ı Tepegöz'e kadar Türk medeniyetinin kapsamlı dijital ansiklopedisi."
            className="text-stone-500 text-sm max-w-xl mx-auto mb-8 block"
            as="p"
          >
            Orhun Yazıtları&apos;ndan Kutadgu Bilig&apos;e, Manas&apos;tan Destan-ı Tepegöz&apos;e kadar
            Türk medeniyetinin kapsamlı dijital ansiklopedisi.
          </EditableText>

          {/* Search */}
          <SearchBox />
        </div>
      </section>

      {/* ===== GERİ BİLDİRİM CARD ===== */}
      <section ref={addRef} className="scroll-reveal px-4 pb-4">
        <div className="max-w-md mx-auto">
          <Link
            to="/geri-bildirim"
            className="group block bg-gradient-to-br from-emerald-900/20 to-stone-900 border border-emerald-700/20 rounded-2xl p-6 hover:border-emerald-600/50 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-600/20 flex items-center justify-center group-hover:bg-emerald-600/30 transition-colors">
                <MessageSquare className="w-6 h-6 text-emerald-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors block">
                  Geri Bildirim
                </h3>
                <p className="text-stone-400 text-sm block">
                  Deneyimlerinizi, eksik gördüğünüz yerleri veya geliştirme fikirlerinizi bizimle paylaşın.
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-stone-600 group-hover:text-emerald-500 transition-colors" />
            </div>
          </Link>
        </div>
      </section>

      {/* ===== DESTEK OL CARD ===== */}
      <section ref={addRef} className="scroll-reveal px-4 pb-20">
        <div className="max-w-md mx-auto">
          <Link
            to="/destek"
            className="group block bg-gradient-to-br from-amber-900/20 to-stone-900 border border-amber-700/20 rounded-2xl p-6 hover:border-amber-600/50 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-600/20 flex items-center justify-center group-hover:bg-amber-600/30 transition-colors">
                <Heart className="w-6 h-6 text-amber-500" />
              </div>
              <div className="flex-1">
                <EditableText
                  storageKey="home_support_title"
                  defaultValue="Destek Ol"
                  className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors block"
                  as="h3"
                >
                  Destek Ol
                </EditableText>
                <EditableText
                  storageKey="home_support_desc"
                  defaultValue="Türk tarihinin korunması ve gelecek nesillere aktarılması için desteğiniz önemli."
                  className="text-stone-400 text-sm block"
                  as="p"
                >
                  Türk tarihinin korunması ve gelecek nesillere aktarılması için desteğiniz önemli.
                </EditableText>
              </div>
              <ChevronRight className="w-5 h-5 text-stone-600 group-hover:text-amber-500 transition-colors" />
            </div>
          </Link>
        </div>
      </section>

      <div className="h-12" />
    </div>
  );
}


