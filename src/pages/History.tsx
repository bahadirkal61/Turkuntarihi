import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValueEvent } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Landmark, Crown, Clock, ChevronRight, CircleDot,
  Swords, Shield, ScrollText, Star, Globe,
  ArrowUp, ArrowLeft
} from "lucide-react";
import EditableText from "../components/EditableText";

/* ────────────────────────────────────────────────
   DATA: All 16 states in CHRONOLOGICAL order
   ────────────────────────────────────────────── */

interface StateData {
  id: string;
  name: string;
  period: string;
  years: string;
  count: number;
  premierCount?: number;
  icon: React.ElementType;
  color: string;
  gradient: string;
  desc: string;
  era: string;
  eraColor: string;
  startYear: number;
  endYear: number;
}

const STATES: StateData[] = [
  {
      id: "iskitler", name: "İskitler",
      period: "M.Ö. 520 - M.Ö. 339", years: "M.Ö. 520 - M.Ö. 339",
      count: 3, icon: Swords, color: "#f59e0b", gradient: "from-amber-600/20 to-amber-900/10",
      desc: "Darius'a karşı bozkır taktikleriyle direnen, atlı okçu savaşının mucidi ilk büyük Türk devleti. Karadeniz'den Tuna'ya bozkır imparatorluğu.",
      era: "ilk-cag", eraColor: "#f59e0b", startYear: -520, endYear: -339,
    },
  {
      id: "sakalar", name: "Sakalar",
      period: "M.Ö. 600 - M.S. 100", years: "M.Ö. 600 - M.S. 100",
      count: 2, icon: Swords, color: "#d97706", gradient: "from-amber-700/20 to-amber-900/10",
      desc: "Orta Asya steplerinde hüküm süren, hayvan üslubu sanatının yaratıcıları, Tomris Hatun'un Pers İmparatoru Kyros'u yendiği efsanevi Türk halkı.",
      era: "ilk-cag", eraColor: "#d97706", startYear: -600, endYear: 100,
    },
  {
      id: "hunlar", name: "Hun İmparatorluğu",
      period: "M.Ö. 234 - M.S. 216", years: "M.Ö. 234 - M.S. 216",
      count: 5, icon: Shield, color: "#ef4444", gradient: "from-red-600/20 to-red-900/10",
      desc: "Mete Han'ın kurduğu, Çin Seddi'ni inşa ettiren, Avrupa'ya kadar ulaşan ilk büyük imparatorluk. Tengricilik inancının merkezi.",
      era: "ilk-cag", eraColor: "#ef4444", startYear: -234, endYear: 216,
    },
  {
      id: "gokturk", name: "Göktürk Kağanlığı",
      period: "M.S. 552 - 744", years: "552 - 744",
      count: 11, icon: Crown, color: "#38bdf8", gradient: "from-sky-600/20 to-sky-900/10",
      desc: "Türk adını taşıyan ilk devlet. Bumin Kağan kurdu, Bilge Kağan ve Tonyukuk yazıtları bıraktı. Orhun Yazıtları'nın yazıldığı dönem.",
      era: "orta-cag-1", eraColor: "#38bdf8", startYear: 552, endYear: 744,
    },
  {
      id: "avar", name: "Avar Kağanlığı",
      period: "M.S. 562 - 796", years: "562 - 796",
      count: 3, icon: Swords, color: "#a855f7", gradient: "from-purple-600/20 to-purple-900/10",
      desc: "Bayan'ın kurduğu, 626'da Konstantinopolis'i kuşatan, Balkanlar'da 200 yıl hüküm süren güçlü Türk devleti. Avrupa askeri taktiklerini etkiledi.",
      era: "orta-cag-1", eraColor: "#a855f7", startYear: 562, endYear: 796,
    },
  {
      id: "bulgar", name: "İlk Bulgar İmparatorluğu",
      period: "M.S. 632 - 1018", years: "632 - 1018",
      count: 4, icon: Crown, color: "#ec4899", gradient: "from-pink-600/20 to-pink-900/10",
      desc: "Kubrat Han'ın kurduğu, Asparuh'un Bizans'ı yendiği, günümüz Bulgaristan'ın temelini atan efsanevi Türk devleti.",
      era: "orta-cag-1", eraColor: "#ec4899", startYear: 632, endYear: 1018,
    },
  {
      id: "hazar", name: "Hazar Kağanlığı",
      period: "M.S. 650 - 969", years: "650 - 969",
      count: 5, icon: Shield, color: "#6366f1", gradient: "from-indigo-500/20 to-indigo-900/10",
      desc: "Yahudiliği resmi din olarak kabul eden tek Türk devleti. Karadeniz'den Hazar Denizi'ne, İpek Yolu'nun kuzeyinde büyük imparatorluk.",
      era: "orta-cag-1", eraColor: "#6366f1", startYear: 650, endYear: 969,
    },
  {
      id: "uygurlar", name: "Uygur Kağanlığı",
      period: "M.S. 744 - 840", years: "744 - 840",
      count: 3, icon: ScrollText, color: "#34d399", gradient: "from-emerald-600/20 to-emerald-900/10",
      desc: "Türkçeyi yazı dili yapan, Maniheizmi kabul eden, Uygur alfabesini geliştiren kültür merkezi. Eski Uygur yazısının doğduğu dönem.",
      era: "orta-cag-1", eraColor: "#34d399", startYear: 744, endYear: 840,
    },
  {
      id: "karahanlilar", name: "Karahanlılar",
      period: "M.S. 840 - 1212", years: "840 - 1212",
      count: 11, icon: Star, color: "#a78bfa", gradient: "from-violet-600/20 to-violet-900/10",
      desc: "İlk Müslüman Türk devleti. Satuk Buğra Han İslamiyeti kabul etti. Kutadgu Bilig ve Divan-ı Lügati't-Türk'ün yazıldığı dönem.",
      era: "orta-cag-1", eraColor: "#a78bfa", startYear: 840, endYear: 1212,
    },
  {
      id: "gazneliler", name: "Gazneliler",
      period: "M.S. 962 - 1186", years: "962 - 1186",
      count: 6, icon: Shield, color: "#fb923c", gradient: "from-orange-600/20 to-orange-900/10",
      desc: "Alp Tigin kurdu, Sebük Tigin ve Gazneli Mahmut büyüttü. Hindistan'a 17 sefer. Biruni, Firdevsi gibi bilginlerin yetiştiği saray.",
      era: "orta-cag-1", eraColor: "#fb923c", startYear: 962, endYear: 1186,
    },
  {
      id: "selcuklular", name: "Büyük Selçuklu İmparatorluğu",
      period: "M.S. 1037 - 1157", years: "1037 - 1157",
      count: 6, icon: Crown, color: "#818cf8", gradient: "from-indigo-600/20 to-indigo-900/10",
      desc: "Tuğrul Bey kurdu, Alp Arslan Malazgirt'te zafer kazandı, Melikşah altın çağı yaşadı. Anadolu'nun kapıları Türklere açıldı.",
      era: "orta-cag-2", eraColor: "#818cf8", startYear: 1037, endYear: 1157,
    },
  {
      id: "anadolu-beylikler", name: "Anadolu Beylikleri",
      period: "M.S. 1071 - 1423", years: "1071 - 1423",
      count: 30, icon: Globe, color: "#22d3ee", gradient: "from-cyan-600/20 to-cyan-900/10",
      desc: "Malazgirt sonrası Anadolu'da kurulan 12 beylik: Danişmendliler, Artuklular, Aydınoğulları, Karamanoğulları ve daha fazlası.",
      era: "orta-cag-2", eraColor: "#22d3ee", startYear: 1071, endYear: 1423,
    },
  {
      id: "harzem", name: "Harzemşahlar",
      period: "M.S. 1077 - 1231", years: "1077 - 1231",
      count: 2, icon: Swords, color: "#fb7185", gradient: "from-rose-600/20 to-rose-900/10",
      desc: "Cengiz Han öncesi son büyük Türk devleti. Tekiş kurdu, Alaeddin Muhammed zirveye taşıdı ama Moğol istilasıyla yıkıldı.",
      era: "orta-cag-2", eraColor: "#fb7185", startYear: 1077, endYear: 1231,
    },
  {
      id: "altinordu", name: "Altınordu Hanlığı",
      period: "M.S. 1241 - 1502", years: "1241 - 1502",
      count: 27, icon: Shield, color: "#facc15", gradient: "from-yellow-600/20 to-yellow-900/10",
      desc: "Batu Han'ın kurduğu, Avrupa Hunları'nın torunu, Kırım ve Kazak Hanlıklarının temeli. Türkleşen Moğol hanlığı.",
      era: "orta-cag-2", eraColor: "#facc15", startYear: 1241, endYear: 1502,
    },
  {
      id: "karaman", name: "Karamanoğulları",
      period: "M.S. 1250 - 1487", years: "1250 - 1487",
      count: 15, icon: Star, color: "#a3e635", gradient: "from-lime-600/20 to-lime-900/10",
      desc: "Türkçeyi resmi dil yapan beylik. Karamanoğlu Mehmet Bey'in fermanı: 'Bundan sonra bu dairede Türkçe'den başka dil konuşulmayacak.'",
      era: "orta-cag-2", eraColor: "#a3e635", startYear: 1250, endYear: 1487,
    },
  {
      id: "memluk", name: "Memluk Devleti",
      period: "M.S. 1250 - 1517", years: "1250 - 1517",
      count: 40, icon: Shield, color: "#2dd4bf", gradient: "from-teal-600/20 to-teal-900/10",
      desc: "Kıpçak Türkü Köle kökenli Baybars ve Kutuz'un Moğolları Ayn Celut'ta durdurduğu devlet. Kahire merkezli Türk hanedanı.",
      era: "orta-cag-2", eraColor: "#2dd4bf", startYear: 1250, endYear: 1517,
    },
  {
      id: "ilhanli", name: "İlhanlılar",
      period: "M.S. 1256 - 1353", years: "1256 - 1353",
      count: 10, icon: Shield, color: "#0891b2", gradient: "from-cyan-600/20 to-cyan-900/10",
      desc: "Hülagü Han'ın kurduğu, Bağdat'ı yıkarak Abbasi Halifeliği'ni sona erdiren, İran ve Ortadoğu'da hüküm süren Moğol-Türk hanedanı. Gazan Han'ın İslam'ı resmi din yapmasıyla Türkleşme sürecine girdi.",
      era: "orta-cag-2", eraColor: "#0891b2", startYear: 1256, endYear: 1353,
    },
  {
      id: "osmanli", name: "Osmanlı İmparatorluğu",
      period: "M.S. 1299 - 1922", years: "1299 - 1922",
      count: 37, icon: Crown, color: "#dc2626", gradient: "from-red-700/30 to-red-900/10",
      desc: "Osman Gazi kurdu, Fatih İstanbul'u fethetti, Kanuni zirveye taşıdı. 600 yıl, 3 kıta, 37 padişah. Dünya tarihinin en büyük imparatorluklarından.",
      era: "yeni-cag", eraColor: "#dc2626", startYear: 1299, endYear: 1922,
    },
  {
      id: "timur", name: "Timur İmparatorluğu",
      period: "M.S. 1370 - 1507", years: "1370 - 1507",
      count: 12, icon: Swords, color: "#fbbf24", gradient: "from-amber-500/20 to-amber-800/10",
      desc: "Timur (Tamerlane) kurdu, Delhi'den Anadolu'ya, Moskova'ya kadar fetihler. Ankara Savaşı'nda Yıldırım Bayezid'i yenilgiye uğrattı.",
      era: "yeni-cag", eraColor: "#fbbf24", startYear: 1370, endYear: 1507,
    },
  {
      id: "akkoyunlu", name: "Akkoyunlu ve Karakoyunlu",
      period: "M.S. 1378 - 1508", years: "1378 - 1508",
      count: 17, icon: Shield, color: "#e879f9", gradient: "from-fuchsia-600/20 to-fuchsia-900/10",
      desc: "Doğu Anadolu'da hüküm süren Türkmen devletleri. Uzun Hasan liderliğinde Akkoyunlular zirve yaptı. Safevi devletinin temeli.",
      era: "yeni-cag", eraColor: "#e879f9", startYear: 1378, endYear: 1508,
    },
  {
      id: "kirim", name: "Kırım Hanlığı",
      period: "M.S. 1441 - 1783", years: "1441 - 1783",
      count: 14, icon: Shield, color: "#14b8a6", gradient: "from-teal-600/20 to-teal-900/10",
      desc: "Altınordu'nun gerçek halefi, Giray hanedanının yönettiği, 1571'de Moskova'yı ateşe veren, Osmanlı'nın müttefiki Türk devleti.",
      era: "yeni-cag", eraColor: "#14b8a6", startYear: 1441, endYear: 1783,
    },
  {
      id: "safevi", name: "Safevi Devleti",
      period: "M.S. 1501 - 1736", years: "1501 - 1736",
      count: 14, icon: Crown, color: "#8b5cf6", gradient: "from-violet-500/20 to-violet-900/10",
      desc: "I. İsmail'in kurduğu, İran'ı birleştiren, Şiiliği resmi din yapan, İsfahan'ı altın çağa taşıyan büyük Türk devleti.",
      era: "yeni-cag", eraColor: "#8b5cf6", startYear: 1501, endYear: 1736,
    },
  {
      id: "cumhuriyet", name: "Türkiye Cumhuriyeti",
      period: "M.S. 1923 - Günümüz", years: "1923 - Günümüz",
      count: 39, icon: Star, color: "#f87171", gradient: "from-red-400/20 to-red-600/10",
      premierCount: 27,
      desc: "Mustafa Kemal Atatürk'ün kurduğu modern Türk devleti. 12 Cumhurbaşkanı, 27 Başbakan. Kurtuluş Savaşı sonrası Cumhuriyet ilan edildi.",
      era: "modern", eraColor: "#f87171", startYear: 1923, endYear: 2025,
    },

];

/* ─── ERA CONFIG ─── */
const ERAS = [
  {
    key: "ilk-cag",
    title: "İlk Çağ Türk Devletleri",
    subtitle: "M.Ö. 520 - M.S. 552",
    desc: "Bozkır imparatorluklarının doğuşu, atlı okçu taktiklerinin dünyayı değiştirdiği çağ",
    color: "#f59e0b",
    bgGradient: "from-amber-950/30 to-stone-950",
  },
  {
    key: "orta-cag-1",
    title: "Orta Çağ - İlk Dönem",
    subtitle: "M.S. 552 - 1037",
    desc: "Göktürklerden Gaznelilere, İslamiyet'in Türk dünyasına girdiği dönem",
    color: "#38bdf8",
    bgGradient: "from-sky-950/30 to-stone-950",
  },
  {
    key: "orta-cag-2",
    title: "Orta Çağ - Selçuklu ve Beylikler",
    subtitle: "M.S. 1037 - 1299",
    desc: "Malazgirt'ten Osmanlı'nın doğuşuna, Anadolu'nun Türk yurdu olduğu yüzyıllar",
    color: "#818cf8",
    bgGradient: "from-indigo-950/30 to-stone-950",
  },
  {
    key: "yeni-cag",
    title: "Yeni Çağ - İmparatorluklar",
    subtitle: "M.S. 1299 - 1922",
    desc: "Osmanlı İmparatorluğu'nun 600 yılı, Timur ve Akkoyunlular ile birlikte",
    color: "#dc2626",
    bgGradient: "from-red-950/30 to-stone-950",
  },
  {
    key: "modern",
    title: "Modern Dönem",
    subtitle: "M.S. 1923 - Günümüz",
    desc: "Cumhuriyet'in ilanından günümüze, Atatürk'ün mirası",
    color: "#f87171",
    bgGradient: "from-rose-950/30 to-stone-950",
  },
];

/* ─── CHRONO TIMELINE DATA (horizontal bar) ─── */
const TIMELINE_TICKS = [
  { label: "M.Ö. 500", year: -500 },
  { label: "M.Ö. 200", year: -200 },
  { label: "0", year: 0 },
  { label: "400", year: 400 },
  { label: "800", year: 800 },
  { label: "1200", year: 1200 },
  { label: "1600", year: 1600 },
  { label: "2000", year: 2000 },
];

/* ─── SCROLL PROGRESS ─── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
     className="fixed top-0 left-0 right-0 h-1 bg-amber-500 origin-left z-40"
      style={{ scaleX }}
  />
  );
}

/* ─── ERA SECTION ─── */
function EraSection({
  era,
  states,
  index,
}: {
  era: typeof ERAS[0];
  states: StateData[];
  index: number;
}) {
  const navigate = useNavigate();

  return (
    <section
      id={`era-${era.key}`}
     className={`relative py-20 px-4 bg-gradient-to-b ${era.bgGradient}`}
   >
      {/* Era divider */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          
          transition={{ duration: 0.3 }}
         className="mb-14"
       >
          {/* Era badge */}
          <div className="flex items-center gap-3 mb-4">
            <div
             className="w-3 h-3 rounded-full"
              style={{ backgroundColor: era.color, boxShadow: `0 0 12px ${era.color}` }}
          />
            <span className="text-sm font-bold tracking-widest uppercase" style={{ color: era.color }}>
              Dönem {index + 1} / {ERAS.length}
            </span>
          </div>

          <EditableText
            storageKey={`era_title_${era.key}`}
            defaultValue={era.title}
            className="text-4xl sm:text-5xl font-black text-white mb-2 block"
            as="h2"
          >
            {era.title}
          </EditableText>
          <p className="text-stone-500 text-sm font-mono mb-4">{era.subtitle}</p>
          <EditableText
            storageKey={`era_desc_${era.key}`}
            defaultValue={era.desc}
            className="text-stone-400 max-w-2xl leading-relaxed block"
            as="p"
          >
            {era.desc}
          </EditableText>

          {/* Mini timeline for this era */}
          <div className="mt-6 flex items-center gap-1">
            <div className="h-px flex-1 bg-stone-800" />
            <span className="text-xs text-stone-600 font-mono">{states.length} devlet</span>
            <div className="h-px flex-1 bg-stone-800" />
          </div>
        </motion.div>

        {/* States Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {states.map((state, i) => {
            const Icon = state.icon;
            return (
              <motion.div
                key={state.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
          
                transition={{ duration: 0.3, delay: i * 0.04 }}
                onClick={() => navigate(`/tarih/${state.id}`)}
               className="group relative cursor-pointer rounded-2xl border border-stone-800/60 hover:border-stone-600 transition-all duration-500 overflow-hidden"
             >
                {/* Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${state.gradient} opacity-50`} />
                <div className="absolute inset-0 bg-stone-900/80" />

                {/* Hover glow */}
                <div
                 className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: `radial-gradient(circle at 30% 50%, ${state.color}15, transparent 60%)` }}
              />

                <div className="relative z-10 p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                       className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundColor: state.color + "18", border: `2px solid ${state.color}30` }}
                     >
                        <Icon className="w-6 h-6" style={{ color: state.color }} />
                      </div>
                      <div>
                        <span className="text-xs font-mono text-stone-500">{state.years}</span>
                      </div>
                    </div>
                    <span
                     className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: state.color + "15", color: state.color }}
                   >
                      {state.count} {state.id === "cumhuriyet" ? "hükümdar" : "hükümdar"}
                      {state.id === "cumhuriyet" && state.premierCount && (
                        <span className="ml-1.5 text-stone-500">({state.premierCount} Başbakan + {state.count - state.premierCount} Cumhurbaşkanı)</span>
                      )}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors mb-2">
                    {state.name}
                  </h3>

                  {/* Description */}
                  <p className="text-stone-400 text-sm leading-relaxed mb-4 line-clamp-3">
                    {state.desc}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-stone-800/60">
                    <span className="text-xs text-stone-600 font-mono">{state.period}</span>
                    <div className="flex items-center gap-1 text-stone-600 group-hover:text-amber-500 transition-colors">
                      <span className="text-xs font-medium">Keşfet</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Left accent */}
                <div
                 className="absolute left-0 top-0 bottom-0 w-1 opacity-60"
                  style={{ backgroundColor: state.color }}
              />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── HERO ─── */
function Hero({ onEraClick }: { onEraClick: (key: string) => void }) {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.9]);

  return (
    <>
      <div className="px-4 pt-6 bg-stone-950">
        <Link to="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-white transition-colors max-w-7xl mx-auto">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Ana Sayfa</span>
        </Link>
      </div>
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
       className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-stone-950"
     >
        {/* Radial bg */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-950/30 via-stone-950 to-stone-950" />

      {/* Grid pattern */}
      <div
       className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(245,158,11,0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(245,158,11,0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
    />

      {/* Floating orbs */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
         className="absolute rounded-full"
          style={{
            width: 100 + i * 50,
            height: 100 + i * 50,
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
            background: `radial-gradient(circle, ${ERAS[i % ERAS.length].color}08 0%, transparent 70%)`,
          }}
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            delay: i * 0.1,
          }}
      />
      ))}

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
         className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-900/80 border border-stone-700 mb-8"
       >
          <CircleDot className="w-4 h-4 text-amber-500" />
          <span className="text-stone-400 text-sm">Kronolojik Sıralama ile</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.3 }}
        >
          <EditableText
            storageKey="history_title"
            defaultValue="TÜRK TARİHİ"
            className="text-7xl sm:text-8xl lg:text-9xl font-black text-white mb-6 tracking-tight block"
            as="h1"
          >
            TÜRK <span className="text-amber-500">TARİHİ</span>
          </EditableText>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <EditableText
            storageKey="history_subtitle"
            defaultValue="M.Ö. 520'den günümüze, 21 devlet, 272 hükümdar ve 2500 yıllık bir medeniyetin izinde."
            className="text-stone-400 text-lg sm:text-xl max-w-2xl mx-auto mb-4 leading-relaxed block"
            as="p"
          >
            M.Ö. 520&apos;den günümüze, 21 devlet, 272 hükümdar ve 2500 yıllık bir medeniyetin izinde.
          </EditableText>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <EditableText
            storageKey="history_desc"
            defaultValue="Kronolojik sıralama ile her dönemi keşfedin"
            className="text-stone-600 text-sm mb-12 block"
            as="p"
          >
            Kronolojik sıralama ile her dönemi keşfedin
          </EditableText>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
         className="flex items-center justify-center gap-8 sm:gap-12 mb-16"
       >
          {[
            { icon: Crown, value: "288", label: "Hükümdar" },
            { icon: Landmark, value: "21", label: "Devlet" },
            { icon: Clock, value: "2.500+", label: "Yıl" },
            { icon: Swords, value: "5", label: "Dönem" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-amber-500">{s.value}</div>
              <div className="text-stone-500 text-xs sm:text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Era Quick Jump */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
         className="flex flex-wrap justify-center gap-3"
       >
          {ERAS.map((era) => (
            <button
              key={era.key}
              onClick={() => onEraClick(era.key)}
             className="px-4 py-2 rounded-full text-sm font-medium border transition-all hover:scale-105"
              style={{
                borderColor: era.color + "40",
                color: era.color,
                backgroundColor: era.color + "08",
              }}
           >
              {era.title.split(" ")[0]}
            </button>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
         className="mt-16"
       >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
           className="flex flex-col items-center gap-2 text-stone-600"
         >
            <span className="text-xs">Aşağı kaydır</span>
            <ChevronRight className="w-4 h-4 rotate-90" />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
    </>
  );
}

/* ─── HORIZONTAL TIMELINE BAR ─── */
function TimelineBar() {
  const { scrollYProgress } = useScroll();
  const progressVal = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useMotionValueEvent(progressVal, "change", (v) => setProgress(Math.round(v)));

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          exit={{ y: -80 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
         className="fixed top-4 left-4 right-4 z-50 bg-stone-900/90 backdrop-blur-xl rounded-2xl border border-stone-700/50 shadow-2xl shadow-black/50 px-4 py-3"
       >
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="text-xs font-bold text-stone-400 tracking-wider uppercase">Kronolojik Zaman Cizelgesi</span>
              <div className="flex-1" />
              <span className="text-xs font-mono text-amber-500">{progress}%</span>
            </div>

            {/* Progress bar */}
            <div className="relative h-1.5 bg-stone-800 rounded-full overflow-hidden mb-2">
              <motion.div
               className="absolute inset-y-0 left-0 bg-amber-500 rounded-full"
                style={{ width: `${progress}%` }}
            />
            </div>

            {/* Ticks */}
            <div className="relative flex justify-between">
              {TIMELINE_TICKS.map((tick) => (
                <div key={tick.label} className="flex flex-col items-center">
                  <div className="w-px h-1.5 bg-stone-700" />
                  <span className="text-[10px] text-stone-600 font-mono mt-0.5">{tick.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── BACK TO TOP ─── */
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 1000);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
         className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-amber-600 hover:bg-amber-500 text-white rounded-full flex items-center justify-center shadow-xl shadow-amber-600/30 transition-colors"
       >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ─── MAIN PAGE ─── */
export default function History() {
  const scrollToEra = (key: string) => {
    const el = document.getElementById(`era-${key}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Group states by era
  const eraStates = useMemo(() => {
    return ERAS.map((era) => ({
      era,
      states: STATES.filter((s) => s.era === era.key),
    }));
  }, []);

  return (
    <div className="min-h-screen bg-stone-950">
      <ScrollProgress />
      <TimelineBar />

      <Hero onEraClick={scrollToEra} />

      {/* Spacer */}
      <div className="h-20" />

      {/* Era Sections */}
      {eraStates.map(({ era, states }, index) => (
        <EraSection key={era.key} era={era} states={states} index={index} />
      ))}

      {/* Footer spacer */}
      <div className="h-20" />

      {/* Footer spacer */}
      <div className="h-16" />

      <BackToTop />
    </div>
  );
}
