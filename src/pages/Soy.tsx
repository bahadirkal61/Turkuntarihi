import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, TreePine, Crown, Users, MapPin, Globe,
  ChevronDown, ChevronUp, Shield, Swords
} from "lucide-react";
import { bozoklar, ucoklar, kipcaklar, uygurlar, digerBoylar, kokler } from "../data/soy";
import { getTamgaForBoy } from "../data/tamga";
import type { TurkBoy } from "../data/soy";
import type { Tamga } from "../data/tamga";

/* ─── TAMGA SVG COMPONENT ─── */
function TamgaSVG({ tamga, size = 80 }: { tamga: Tamga; size?: number }) {
  return (
    <svg width={size} height={size} viewBox={tamga.viewBox} className="drop-shadow-md">
      {tamga.paths.map((path, i) => (
        <path
          key={i}
          d={path}
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="tamga-stroke"
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
      {tamga.circles?.map((circle, i) => (
        <circle
          key={`c-${i}`}
          cx={circle.cx}
          cy={circle.cy}
          r={circle.r}
          fill="#f59e0b"
          className="tamga-dot"
        />
      ))}
    </svg>
  );
}

/* ─── BOY CARD ─── */
function BoyCard({ boy, index }: { boy: TurkBoy; index: number }) {
  const tamga = getTamgaForBoy(boy.id);
  const [expanded, setExpanded] = useState(false);

  const branchColors: Record<string, string> = {
    bozok: "from-sky-900/40 to-sky-950/20 border-sky-700/30",
    ucok: "from-amber-900/40 to-amber-950/20 border-amber-700/30",
    kipcak: "from-emerald-900/40 to-emerald-950/20 border-emerald-700/30",
    uygur: "from-rose-900/40 to-rose-950/20 border-rose-700/30",
    hun: "from-violet-900/40 to-violet-950/20 border-violet-700/30",
    gokturk: "from-cyan-900/40 to-cyan-950/20 border-cyan-700/30",
    kok: "from-stone-800/60 to-stone-900/30 border-amber-600/40",
  };

  const branchLabels: Record<string, string> = {
    bozok: "Bozoklar (Gök-Börü)",
    ucok: "Üçoklar (Kara-Börü)",
    kipcak: "Kıpçaklar",
    uygur: "Uygurlar",
    hun: "Hunlar",
    gokturk: "Göktürkler",
    kok: "Kök",
  };

  const gradient = branchColors[boy.branch] || branchColors.kok;
  const label = branchLabels[boy.branch] || boy.branch;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className={`group relative bg-gradient-to-br ${gradient} border rounded-2xl overflow-hidden hover:border-amber-600/50 transition-all duration-300`}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start gap-4">
          {tamga && (
            <div className="shrink-0 bg-stone-900/60 rounded-xl p-2 border border-amber-600/20 group-hover:border-amber-500/50 transition-colors">
              <TamgaSVG tamga={tamga} size={56} />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-500">{label}</span>
            </div>
            <h3 className="text-lg font-black text-white mb-1">{boy.name}</h3>
            <p className="text-stone-400 text-sm leading-relaxed line-clamp-2">{boy.description}</p>
          </div>
        </div>

        {/* Expand Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 flex items-center gap-1 text-amber-500 text-xs font-medium hover:text-amber-400 transition-colors"
        >
          {expanded ? "Kapat" : "Detaylar"}
          {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>

        {/* Expanded Details */}
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.25 }}
            className="mt-4 pt-4 border-t border-stone-700/50 space-y-3"
          >
            <div className="flex items-start gap-2">
              <Users className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-stone-500 font-medium">Günümüzdeki Halklar</span>
                <p className="text-stone-300 text-sm">{boy.modernPeople}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-stone-500 font-medium">Bölge</span>
                <p className="text-stone-300 text-sm">{boy.modernRegion}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Globe className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-stone-500 font-medium">Dil</span>
                <p className="text-stone-300 text-sm">{boy.language}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-stone-500 font-medium">Tarih</span>
                <p className="text-stone-300 text-sm">{boy.history}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── TREE DIAGRAM ─── */
function SoyAgaciDiagram() {
  return (
    <div className="relative overflow-x-auto pb-4">
      <div className="min-w-[800px] mx-auto">
        {/* Root */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-b from-amber-700 to-amber-900 text-white px-8 py-4 rounded-2xl border border-amber-500/50 shadow-xl shadow-amber-900/30 text-center">
            <Crown className="w-8 h-8 mx-auto mb-2 text-amber-300" />
            <h3 className="text-2xl font-black">Oğuz Kağan</h3>
            <p className="text-amber-300 text-xs mt-1">Türk Mitolojisinin Efsanevi Atası</p>
            <p className="text-amber-400 text-xs">24 Oğul → 24 Oğuz Boyu</p>
          </div>
        </div>

        {/* Vertical connector */}
        <div className="flex justify-center mb-6">
          <div className="w-px h-8 bg-amber-600/50" />
        </div>

        {/* Two Main Branches */}
        <div className="grid grid-cols-2 gap-8">
          {/* BOZOKLAR */}
          <div className="relative">
            <div className="flex justify-center mb-4">
              <div className="w-px h-6 bg-sky-500/50" />
            </div>
            <div className="bg-gradient-to-b from-sky-700 to-sky-900 text-white px-6 py-3 rounded-xl border border-sky-500/50 text-center">
              <Shield className="w-6 h-6 mx-auto mb-1 text-sky-300" />
              <h4 className="text-lg font-bold">Bozoklar (Gök-Börü)</h4>
              <p className="text-sky-300 text-xs mt-1">Üç Doğan → 6 Oğul → 6 Boy</p>
            </div>
            <div className="flex justify-center my-3">
              <div className="w-px h-6 bg-sky-500/30" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {["Kayı", "Bayat", "Alkaevli", "Karaevli", "Yazır", "Döğer", "Dodurga"].map((name) => (
                <div key={name} className="bg-sky-950/60 border border-sky-700/30 rounded-lg px-2 py-2 text-center hover:bg-sky-900/40 transition-colors">
                  <span className="text-sky-300 text-xs font-medium">{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ÜÇOKLAR */}
          <div className="relative">
            <div className="flex justify-center mb-4">
              <div className="w-px h-6 bg-amber-500/50" />
            </div>
            <div className="bg-gradient-to-b from-amber-700 to-amber-900 text-white px-6 py-3 rounded-xl border border-amber-500/50 text-center">
              <Swords className="w-6 h-6 mx-auto mb-1 text-amber-300" />
              <h4 className="text-lg font-bold">Üçoklar (Kara-Börü)</h4>
              <p className="text-amber-300 text-xs mt-1">Üç Doğan → 11 Oğul → 11 Boy</p>
            </div>
            <div className="flex justify-center my-3">
              <div className="w-px h-6 bg-amber-500/30" />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {["Yıva", "Avşar", "Kızık", "Bayındır", "Salur", "Çepni", "Eymür", "Büğdüz", "İğdir", "Yığılga", "Alayuntlu"].map((name) => (
                <div key={name} className="bg-amber-950/60 border border-amber-700/30 rounded-lg px-2 py-2 text-center hover:bg-amber-900/40 transition-colors">
                  <span className="text-amber-300 text-xs font-medium">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Extra note */}
        <div className="flex justify-center mt-6">
          <p className="text-stone-500 text-xs text-center max-w-lg">
            Oğuz Kağan'ın 24 oğlundan türeyen 24 Oğuz Boyu, Türk dünyasının en temel soy yapısını oluşturur.
            Bozoklar ve Üçoklar olarak iki ana kola ayrılırlar.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── TAMGA GALLERY ─── */
function TamgaGallery() {
  const boylar = [...bozoklar, ...ucoklar, ...kipcaklar, ...uygurlar, ...digerBoylar].slice(0, 24);

  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
      {boylar.map((boy, i) => {
        const tamga = getTamgaForBoy(boy.id);
        if (!tamga) return null;
        return (
          <motion.div
            key={boy.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: i * 0.03 }}
            className="group flex flex-col items-center gap-2 p-3 bg-stone-900/40 rounded-xl border border-stone-800 hover:border-amber-600/40 transition-all cursor-pointer"
            title={`${boy.name}: ${boy.description.slice(0, 60)}...`}
          >
            <div className="group-hover:scale-110 transition-transform duration-300">
              <TamgaSVG tamga={tamga} size={48} />
            </div>
            <span className="text-stone-500 text-[10px] font-medium text-center leading-tight line-clamp-1 group-hover:text-amber-400 transition-colors">
              {boy.name}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─── MAIN PAGE ─── */
export default function Soy() {
  const [activeTab, setActiveTab] = useState<"all" | "bozok" | "ucok" | "kipcak" | "uygur" | "diger">("all");

  const filteredBoys = activeTab === "all"
    ? [...kokler, ...bozoklar, ...ucoklar, ...kipcaklar, ...uygurlar, ...digerBoylar]
    : activeTab === "bozok" ? bozoklar
    : activeTab === "ucok" ? ucoklar
    : activeTab === "kipcak" ? kipcaklar
    : activeTab === "uygur" ? uygurlar
    : digerBoylar;

  const tabs = [
    { key: "all" as const, label: "Tümü", count: 30 },
    { key: "bozok" as const, label: "Bozoklar", count: bozoklar.length },
    { key: "ucok" as const, label: "Üçoklar", count: ucoklar.length },
    { key: "kipcak" as const, label: "Kıpçaklar", count: kipcaklar.length },
    { key: "uygur" as const, label: "Uygurlar", count: uygurlar.length },
    { key: "diger" as const, label: "Diğer", count: digerBoylar.length + kokler.length },
  ];

  return (
    <div className="min-h-screen bg-stone-950">
      {/* HERO */}
      <section className="relative overflow-hidden px-4 pt-6 pb-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-950/30 via-stone-950 to-stone-950" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Ana Sayfa</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-600/20 border border-amber-600/30 mb-6">
              <TreePine className="w-8 h-8 text-amber-500" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">
              TÜRK <span className="text-amber-500">SOYU</span>
            </h1>
            <p className="text-stone-400 max-w-2xl mx-auto leading-relaxed">
              Oğuz Kağan'dan günümüze, 24 Oğuz Boyu ve Türk dünyasının kökleri.
              Bozoklar, Üçoklar, Kıpçaklar, Uygurlar ve daha fazlası.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {[
              { icon: Crown, value: "30+", label: "Türk Boyu" },
              { icon: TreePine, value: "24", label: "Oğuz Boyu" },
              { icon: Shield, value: "24", label: "Tamga" },
              { icon: Users, value: "200M+", label: "Toplam Nüfus" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black text-amber-500">{s.value}</div>
                <div className="text-stone-500 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TREE DIAGRAM */}
      <section className="max-w-6xl mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-stone-900/40 border border-stone-800 rounded-3xl p-6 sm:p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <TreePine className="w-6 h-6 text-amber-500" />
            Oğuz Kağan Soy Ağacı
          </h2>
          <SoyAgaciDiagram />
        </motion.div>
      </section>

      {/* TAMGA GALLERY */}
      <section className="max-w-6xl mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Shield className="w-6 h-6 text-amber-500" />
            Türk Boyları Tamgaları
          </h2>
          <p className="text-stone-400 text-sm mb-6 max-w-2xl">
            Her Türk boyunun kendine özgü tamgası (damgası) vardır. Bu geometrik semboller,
            boyların kimliğini ve soyunu temsil eder. Göktürklerden beri kullanılan bu gelenek,
            Türk hükümdarlarının mühürlerinde ve bayraklarında da görülür.
          </p>
          <div className="bg-stone-900/40 border border-stone-800 rounded-3xl p-6">
            <TamgaGallery />
          </div>
        </motion.div>
      </section>

      {/* FILTER TABS */}
      <section className="max-w-6xl mx-auto px-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-full text-sm font-bold border transition-all ${
                activeTab === tab.key
                  ? "bg-amber-600 border-amber-500 text-white shadow-lg shadow-amber-600/20"
                  : "bg-stone-800/50 border-stone-700 text-stone-400 hover:border-stone-600 hover:text-white"
              }`}
            >
              {tab.label} <span className="text-xs opacity-60">({tab.count})</span>
            </button>
          ))}
        </div>
      </section>

      {/* BOY CARDS */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredBoys.map((boy, i) => (
            <BoyCard key={boy.id} boy={boy} index={i} />
          ))}
        </div>
      </section>

      {/* CSS for tamga animation */}
      <style>{`
        .tamga-stroke {
          stroke-dasharray: 200;
          stroke-dashoffset: 0;
        }
        @keyframes tamgaDraw {
          from { stroke-dashoffset: 200; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}
