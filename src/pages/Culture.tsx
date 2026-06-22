import { Link } from "react-router-dom";
import {
  Crown, Scroll, Flame, Scale, Sun,
  Star, Moon, Sword, ChevronRight, ArrowLeft
} from "lucide-react";
import EditableText from "../components/EditableText";

/* ─── QUOTE BLOCK ─── */
function Quote({ text, source, storageKey }: { text: string; source: string; storageKey: string }) {
  return (
    <div className="my-6 pl-5 border-l-4 border-amber-500/80">
      <EditableText
        storageKey={`quote_text_${storageKey}`}
        defaultValue={`&ldquo;${text}&rdquo;`}
        className="text-amber-200/90 text-base sm:text-lg italic leading-relaxed block"
        as="p"
      >
        &ldquo;{text}&rdquo;
      </EditableText>
      <EditableText
        storageKey={`quote_src_${storageKey}`}
        defaultValue={`— ${source}`}
        className="text-stone-500 text-sm mt-2 block"
        as="p"
      >
        — {source}
      </EditableText>
    </div>
  );
}

/* ─── INFO PILL ─── */
function Pill({ label, value, storageKey }: { label: string; value: string; storageKey: string }) {
  return (
    <div className="inline-flex items-center gap-2 bg-stone-800/60 border border-stone-700/60 rounded-lg px-3 py-2">
      <EditableText
        storageKey={`pill_label_${storageKey}`}
        defaultValue={label}
        className="text-stone-500 text-xs uppercase tracking-wider block"
        as="span"
      >
        {label}
      </EditableText>
      <EditableText
        storageKey={`pill_val_${storageKey}`}
        defaultValue={value}
        className="text-white font-semibold text-sm block"
        as="span"
      >
        {value}
      </EditableText>
    </div>
  );
}

/* ─── NUMBERED STEP ─── */
function Step({ num, title, desc, storageKey }: { num: number; title: string; desc: string; storageKey: string }) {
  return (
    <div className="flex items-start gap-4 bg-stone-900/40 border border-stone-700/40 rounded-xl p-4">
      <div className="w-9 h-9 rounded-full bg-amber-600/20 flex items-center justify-center shrink-0 border border-amber-500/30">
        <span className="text-amber-400 font-bold text-sm">{num}</span>
      </div>
      <div>
        <EditableText
          storageKey={`step_title_${storageKey}`}
          defaultValue={title}
          className="text-white font-bold text-sm block"
          as="h4"
        >
          {title}
        </EditableText>
        <EditableText
          storageKey={`step_desc_${storageKey}`}
          defaultValue={desc}
          className="text-stone-400 text-sm mt-1 leading-relaxed block"
          as="p"
        >
          {desc}
        </EditableText>
      </div>
    </div>
  );
}

/* ─── SECTION HEADER ─── */
function SectionHeader({
  icon: Icon, subtitle, accent = "amber", storageKey = ""
}: {
  icon: React.ElementType; subtitle: string; accent?: string; storageKey?: string;
}) {
  const accentColors: Record<string, { text: string; border: string; bg: string }> = {
    amber:  { text: "text-amber-400",  border: "border-amber-500/30",  bg: "bg-amber-600/15" },
    sky:    { text: "text-sky-400",    border: "border-sky-500/30",    bg: "bg-sky-600/15" },
    emerald:{ text: "text-emerald-400",border: "border-emerald-500/30",bg: "bg-emerald-600/15" },
    violet: { text: "text-violet-400", border: "border-violet-500/30", bg: "bg-violet-600/15" },
    cyan:   { text: "text-cyan-400",   border: "border-cyan-500/30",   bg: "bg-cyan-600/15" },
    rose:   { text: "text-rose-400",   border: "border-rose-500/30",   bg: "bg-rose-600/15" },
  };
  const c = accentColors[accent] || accentColors.amber;
  return (
    <div className={`inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full ${c.bg} border ${c.border}`}>
      <Icon className={`w-4 h-4 ${c.text}`} />
      <EditableText
        storageKey={`sh_${storageKey || subtitle}`}
        defaultValue={subtitle}
        className={`${c.text} text-xs font-bold uppercase tracking-widest block`}
        as="span"
      >
        {subtitle}
      </EditableText>
    </div>
  );
}

/* ─── MAIN ─── */
export default function Culture() {
  return (
    <div className="min-h-screen bg-stone-950">
      <div className="px-4 pt-6">
        <Link to="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-white transition-colors max-w-4xl mx-auto">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Ana Sayfa</span>
        </Link>
      </div>
      {/* ══════════════ 1. HERO ══════════════ */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-amber-950/30 via-stone-950 to-stone-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent" />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <SectionHeader icon={Crown} subtitle="Tanrısal İktidar" accent="amber" />
          <EditableText
            storageKey="cul_hero_title"
            defaultValue="KUT"
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight block"
            as="h1"
          >
            KUT
          </EditableText>
          <EditableText
            storageKey="cul_hero_desc"
            defaultValue="Türk hükümdarlık felsefesinin kalbi. Tanrı'dan gelen, halka hizmetle yükümlü kutsal bir güç."
            className="text-lg sm:text-xl text-amber-200/80 font-light leading-relaxed max-w-2xl mx-auto block"
            as="p"
          >
            Türk hükümdarlık felsefesinin kalbi. Tanrı&apos;dan gelen, halka hizmetle yükümlü kutsal bir güç.
          </EditableText>
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            <Pill label="İlk Kayıt" value="M.S. 732 (Orhun Yazıtları)" storageKey="kayit" />
            <Pill label="Süre" value="2500+ Yıl" storageKey="sure" />
            <Pill label="Kaynak" value="Kutadgu Bilig (1069)" storageKey="kaynak" />
          </div>
        </div>
      </section>

      {/* ══════════════ 2. KUT NEDİR? ══════════════ */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-b from-stone-950 via-slate-950/40 to-stone-950">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <SectionHeader icon={Sun} subtitle="Temel Kavram" accent="sky" storageKey="kut Nedir" />
          <EditableText
            storageKey="cul_sec2_title"
            defaultValue="KUT NEDİR?"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight block"
            as="h2"
          >
            KUT NEDİR?
          </EditableText>
          <div className="text-stone-300 leading-relaxed space-y-4 text-base sm:text-lg">
            <EditableText
              storageKey="cul_sec2_p1"
              defaultValue="<strong>Kut</strong>, Eski Türkçe'de 'mutluluk, uğur, devlet, baht, talih, saadet' anlamlarına gelir. Tengricilik inancında <strong>Tanrı'nın (Tengri) insana verdiği kutsal bir lütuf</strong> olarak görülür."
              className="block"
              as="p"
            >
              <strong className="text-white">Kut</strong>, Eski Türkçe&apos;de &ldquo;mutluluk, uğur, devlet, baht, talih, saadet&rdquo; anlamlarına gelir.
              Tengricilik inancında <strong className="text-sky-400">Tanrı&apos;nın (Tengri) insana verdiği kutsal bir lütuf</strong> olarak görülür.
            </EditableText>
            <EditableText
              storageKey="cul_sec2_p2"
              defaultValue="Kut, sadece kişisel bir şans değil, <strong>toplumsal bir iktidar gücüdür</strong>. Hükümdarın tahta çıkışını meşrulaştıran, halkı bir arada tutan ruhsal bir bağdır."
              className="block"
              as="p"
            >
              Kut, sadece kişisel bir şans değil, <strong className="text-sky-400">toplumsal bir iktidar gücüdür</strong>.
              Hükümdarın tahta çıkışını meşrulaştıran, halkı bir arada tutan ruhsal bir bağdır.
            </EditableText>
            <EditableText
              storageKey="cul_sec2_p3"
              defaultValue="Kut sahibi kişi, toplumun lideri olmakla yükümlüdür. Halka hizmet etmeli, adaleti sağlamalı, Töre'ye uygun hareket etmelidir. Kut, <strong>sınırsız bir güç değil, sınırsız bir sorumluluktur</strong>."
              className="block"
              as="p"
            >
              Kut sahibi kişi, toplumun lideri olmakla yükümlüdür. Halka hizmet etmeli, adaleti sağlamalı,
              Töre&apos;ye uygun hareket etmelidir. Kut, <strong className="text-sky-400">sınırsız bir güç değil, sınırsız bir sorumluluktur</strong>.
            </EditableText>
            <Quote
              text="Türk milleti üzerinde kut bulunmazsa, millet yıkılır."
              source="Bilge Kağan, Orhun Yazıtları (M.S. 732)"
              storageKey="sec2"
            />
            <Quote
              text="Ben kağan oldum, kutum (bahtım) açıldı."
              source="Tonyukuk Yazıtı (M.S. 716)"
              storageKey="sec2b"
            />
          </div>
        </div>
      </section>

      {/* ══════════════ 3. KUT ve TÖRE ══════════════ */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-b from-stone-950 via-emerald-950/20 to-stone-950">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <SectionHeader icon={Scale} subtitle="Siyaset Felsefesi" accent="emerald" storageKey="kut tore" />
          <EditableText
            storageKey="cul_sec3_title"
            defaultValue="KUT ve TÖRE"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight text-right block"
            as="h2"
          >
            KUT ve TÖRE
          </EditableText>
          <div className="text-stone-300 leading-relaxed space-y-4 text-base sm:text-lg text-right">
            <EditableText
              storageKey="cul_sec3_p1"
              defaultValue="<strong>Töre</strong>, Türk toplumunun yazılı olmayan anayasasıdır. Kut'un toplumsal karşılığıdır. Hükümdar Kut'u Töre ile birlikte kullanır."
              className="block"
              as="p"
            >
              <strong className="text-white">Töre</strong>, Türk toplumunun yazılı olmayan anayasasıdır.
              Kut&apos;un toplumsal karşılığıdır. Hükümdar Kut&apos;u Töre ile birlikte kullanır.
            </EditableText>
            <EditableText
              storageKey="cul_sec3_p2"
              defaultValue="<strong>Kut-Töre ikilisi</strong>, Türk siyaset felsefesinin temel direğidir. Kut ilahi otoriteyi, Töre toplumsal düzeni temsil eder. Biri olmadan diğeri anlamsızdır."
              className="block"
              as="p"
            >
              <strong className="text-emerald-400">Kut-Töre ikilisi</strong>, Türk siyaset felsefesinin temel direğidir.
              Kut ilahi otoriteyi, Töre toplumsal düzeni temsil eder. Biri olmadan diğeri anlamsızdır.
            </EditableText>
            <EditableText
              storageKey="cul_sec3_p3"
              defaultValue="Hükümdar Töre'yi çiğnerse, Kut'u kaybeder. Bu, halkın isyan etme hakkını doğurur. <strong>Meşruiyet, halkın rızasına ve Töre'ye bağlıdır</strong>."
              className="block"
              as="p"
            >
              Hükümdar Töre&apos;yi çiğnerse, Kut&apos;u kaybeder. Bu, halkın isyan etme hakkını doğurur.
              <strong className="text-emerald-400">Meşruiyet, halkın rızasına ve Töre&apos;ye bağlıdır</strong>.
            </EditableText>
            <Quote
              text="Tanrı Türk milletine kut verdi, kutlu milletin hükümdarı kutsaldır."
              source="Bilge Kağan Yazıtı (M.S. 732)"
              storageKey="sec3"
            />
          </div>
        </div>
      </section>

      {/* ══════════════ 4. KUT-TALİH-ERDEM ══════════════ */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-b from-stone-950 via-violet-950/20 to-stone-950">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <SectionHeader icon={Star} subtitle="Siyaset Felsefesi" accent="violet" storageKey="kut talih" />
          <EditableText
            storageKey="cul_sec4_title"
            defaultValue="KUT-TALİH-ERDEM"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight block"
            as="h2"
          >
            KUT-TALİH-ERDEM
          </EditableText>
          <div className="text-stone-300 leading-relaxed space-y-4 text-base sm:text-lg">
            <EditableText
              storageKey="cul_sec4_p1"
              defaultValue="<strong>Kut</strong> (ilahi lütuf), <strong>Talih</strong> (kişisel çaba) ve <strong>Erdem</strong> (ahlak üstünlüğü) üçgeni, Türk hükümdarlık felsefesinin merkezindedir."
              className="block"
              as="p"
            >
              <strong className="text-white">Kut</strong> (ilahi lütuf), <strong className="text-white">Talih</strong> (kişisel çaba) ve <strong className="text-white">Erdem</strong> (ahlak üstünlüğü)
              üçgeni, Türk hükümdarlık felsefesinin merkezindedir.
            </EditableText>
            <EditableText
              storageKey="cul_sec4_p2"
              defaultValue="Sadece Kut sahibi olmak yeterli değildir. Hükümdar <strong>talihli</strong> olmalı, yani başarılı olabilmek için çaba göstermelidir. En önemlisi, <strong>erdemli</strong> olmalıdır."
              className="block"
              as="p"
            >
              Sadece Kut sahibi olmak yeterli değildir. Hükümdar <strong className="text-violet-400">talihli</strong> olmalı,
              yani başarılı olabilmek için çaba göstermelidir. En önemlisi, <strong className="text-violet-400">erdemli</strong> olmalıdır.
            </EditableText>
            <EditableText
              storageKey="cul_sec4_p3"
              defaultValue="Erdem; cömertlik, doğruluk, adalet, cesaret ve halka hizmet demektir. Kutadgu Bilig'de erdemli olmayan hükümdarın Kut'unu kaybedeceği vurgulanır."
              className="block"
              as="p"
            >
              Erdem; cömertlik, doğruluk, adalet, cesaret ve halka hizmet demektir.
              Kutadgu Bilig&apos;de erdemli olmayan hükümdarın Kut&apos;unu kaybedeceği vurgulanır.
            </EditableText>
            <Quote
              text="Kut, erdemle birleşince devlet baki kalır. Erdemsiz kut, kum üzerine kurulmuş saraydır."
              source="Kutadgu Bilig, Yusuf Has Hacib (1069)"
              storageKey="sec4"
            />
          </div>
        </div>
      </section>

      {/* ══════════════ 5. HAN-TEGİN-KAĞAN ══════════════ */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-b from-stone-950 via-amber-950/15 to-stone-950">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center">
          <SectionHeader icon={Crown} subtitle="Unvanlar ve Görevler" accent="amber" storageKey="unvanlar" />
          <EditableText
            storageKey="cul_sec5_title"
            defaultValue="HAN · TEGİN · KAĞAN"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight block"
            as="h2"
          >
            HAN · TEGİN · KAĞAN
          </EditableText>
          <EditableText
            storageKey="cul_sec5_desc"
            defaultValue="Türk hükümdarlık sisteminde üç temel unvan vardır. Her biri farklı bir sorumluluk alanını temsil eder."
            className="text-stone-400 max-w-2xl mx-auto mb-10 block"
            as="p"
          >
            Türk hükümdarlık sisteminde üç temel unvan vardır. Her biri farklı bir sorumluluk alanını temsil eder.
          </EditableText>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { Icon: Crown, title: "HAN", desc: "Halkın babası. Siyasi ve askeri lider. Halkı koruma ve yönetme sorumluluğu." },
              { Icon: Sword, title: "TEGİN", desc: "Prens, komutan. Han'ın yardımcısı. Ordunun başında savaş meydanında liderlik eder." },
              { Icon: Star, title: "KAĞAN", desc: "İmparator. En yüksek otorite. Tanrı'nın yer yüzündeki temsilcisi." },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="bg-stone-900/50 border border-stone-700/50 rounded-2xl p-6 text-center hover:border-amber-600/30 transition-colors">
                <Icon className="w-10 h-10 text-amber-500 mx-auto mb-4" />
                <EditableText
                  storageKey={`cul_sec5_${title}`}
                  defaultValue={title}
                  className="text-xl font-black text-white mb-2 block"
                  as="h3"
                >
                  {title}
                </EditableText>
                <EditableText
                  storageKey={`cul_sec5_desc_${title}`}
                  defaultValue={desc}
                  className="text-stone-400 text-sm leading-relaxed block"
                  as="p"
                >
                  {desc}
                </EditableText>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ 6. TENGRİCİLİK ══════════════ */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-b from-stone-950 via-cyan-950/15 to-stone-950">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <SectionHeader icon={Moon} subtitle="Dini Kültür" accent="cyan" storageKey="tengricilik" />
          <EditableText
            storageKey="cul_sec6_title"
            defaultValue="TENGRİCİLİK ve KUT"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight block"
            as="h2"
          >
            TENGRİCİLİK ve KUT
          </EditableText>
          <div className="text-stone-300 leading-relaxed space-y-4 text-base sm:text-lg">
            <EditableText storageKey="cul_sec6_p1" defaultValue="<strong>Tengricilik</strong>, Türklerin eski dinidir. Tek Tanrı inancı (Tengri) üzerine kuruludur. Kut, Tengricilik'in siyasal boyutudur." className="block" as="p">
              <strong className="text-white">Tengricilik</strong>, Türklerin eski dinidir. Tek Tanrı inancı (Tengri) üzerine kuruludur.
              Kut, Tengricilik&apos;in siyasal boyutudur.
            </EditableText>
            <EditableText storageKey="cul_sec6_p2" defaultValue="Tengricilik'te Tengri, evrenin yaratıcısı ve tek hâkimidir. <strong>Hükümdar, Tengri'nin yer yüzündeki temsilcisi (gölgesi) olarak görülür</strong>. Bu, hükümdarın otoritesini ilahi bir kaynağa bağlar." className="block" as="p">
              Tengricilik&apos;te Tengri, evrenin yaratıcısı ve tek hâkimidir.
              <strong className="text-cyan-400">Hükümdar, Tengri&apos;nin yer yüzündeki temsilcisi (gölgesi) olarak görülür</strong>.
              Bu, hükümdarın otoritesini ilahi bir kaynağa bağlar.
            </EditableText>
            <EditableText storageKey="cul_sec6_p3" defaultValue="Kut, Tengricilik inancında ruhun bir parçasıdır. İnsan doğarken Tengri tarafından verilir. Erdemli yaşayan insanın Kut'u güçlenir, kötü davrananların Kut'u zayıflar." className="block" as="p">
              Kut, Tengricilik inancında ruhun bir parçasıdır. İnsan doğarken Tengri tarafından verilir.
              Erdemli yaşayan insanın Kut&apos;u güçlenir, kötü davrananların Kut&apos;u zayıflar.
            </EditableText>
            <Quote text="Türk milleti, kutun sahibidir. Kut, Tengri'den gelir ve Tengri'ye döner." source="Göktürk İnanç Sistemi" storageKey="sec6" />
          </div>
        </div>
      </section>

      {/* ══════════════ 7. İSLAM ve KUT ══════════════ */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-b from-stone-950 via-rose-950/15 to-stone-950">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <SectionHeader icon={Flame} subtitle="Dini Kültür" accent="rose" storageKey="islam" />
          <EditableText storageKey="cul_sec7_title" defaultValue="İSLAM ve KUT" className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight text-right block" as="h2">
            İSLAM ve KUT
          </EditableText>
          <div className="text-stone-300 leading-relaxed space-y-4 text-base sm:text-lg text-right">
            <EditableText storageKey="cul_sec7_p1" defaultValue="Türkler İslamiyet'i kabul ettikten sonra <strong>Kut anlayışı İslami kavramlarla zenginleşmiştir</strong>. Kut, Allah'ın lütfu (nimet) olarak yorumlanmıştır." className="block" as="p">
              Türkler İslamiyet&apos;i kabul ettikten sonra <strong className="text-white">Kut anlayışı İslami kavramlarla zenginleşmiştir</strong>.
              Kut, Allah&apos;ın lütfu (nimet) olarak yorumlanmıştır.
            </EditableText>
            <EditableText storageKey="cul_sec7_p2" defaultValue="Karahanlılar'dan itibaren Kut, <strong>'Allah'ın hilafeti'</strong> kavramıyla birleşmiştir. Hükümdar, Allah'ın halifesi olarak görülür ve Kut, Allah tarafından verilen bir yetkidir." className="block" as="p">
              Karahanlılar&apos;dan itibaren Kut, <strong className="text-rose-400">&ldquo;Allah&apos;ın hilafeti&rdquo;</strong> kavramıyla birleşmiştir.
              Hükümdar, Allah&apos;ın halifesi olarak görülür ve Kut, Allah tarafından verilen bir yetkidir.
            </EditableText>
            <EditableText storageKey="cul_sec7_p3" defaultValue="Kutadgu Bilig'de bu sentez en güzel şekilde görülür. Yusuf Has Hacib, Kut'u İslami erdemlerle (adalet, cömertlik, doğruluk) birleştirerek yeni bir hükümdarlık felsefesi oluşturmuştur." className="block" as="p">
              Kutadgu Bilig&apos;de bu sentez en güzel şekilde görülür. Yusuf Has Hacib,
              Kut&apos;u İslami erdemlerle (adalet, cömertlik, doğruluk) birleştirerek
              yeni bir hükümdarlık felsefesi oluşturmuştur.
            </EditableText>
            <Quote text="Hükümdar, Allah'ın gölgesidir. Gölge, sahibinden ayrılmaz." source="Kutadgu Bilig, Yusuf Has Hacib (1069)" storageKey="sec7" />
          </div>
        </div>
      </section>

      {/* ══════════════ 8. KUT TÖRENİ ══════════════ */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-b from-stone-950 via-amber-950/15 to-stone-950">
        <div className="max-w-3xl mx-auto px-6 sm:px-8">
          <SectionHeader icon={Scroll} subtitle="Cülus ve Taç Giyme" accent="amber" storageKey="kut toreni" />
          <EditableText storageKey="cul_sec8_title" defaultValue="KUT TÖRENİ" className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight text-center block" as="h2">
            KUT TÖRENİ
          </EditableText>
          <EditableText storageKey="cul_sec8_desc" defaultValue="Yeni hükümdarın tahta çıkış töreni. Kut'un yeni hanedara aktarılması ritüeli. Türk tarihinin en görkemli törenlerinden biridir." className="text-stone-400 text-center mb-8 max-w-2xl mx-auto block" as="p">
            Yeni hükümdarın tahta çıkış töreni. Kut&apos;un yeni hanedara aktarılması ritüeli.
            Türk tarihinin en görkemli törenlerinden biridir.
          </EditableText>
          <div className="space-y-3">
            <Step num={1} title="Kut İsteme" desc="Yeni hükümdar, Tengri/Allah'a dua eder, Kut'u dilemek için ibadet eder." storageKey="toren1" />
            <Step num={2} title="Kut Kuşanma" desc="Hükümdar, kutsal kılıç kuşanır ve taç giyer. Bu, Kut'un sembolik aktarımıdır." storageKey="toren2" />
            <Step num={3} title="Halka Söz Verme" desc="Hükümdar, halk önünde Töre'ye uygun hüküm süreceğine dair yemin eder." storageKey="toren3" />
          </div>
        </div>
      </section>

      {/* ══════════════ 9. NEVRUZ ══════════════ */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-b from-stone-950 via-emerald-950/15 to-stone-950">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <SectionHeader icon={Sun} subtitle="Yılbaşı Töreni" accent="emerald" storageKey="nevruz" />
          <EditableText storageKey="cul_sec9_title" defaultValue="NEVRUZ ve KUT" className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight block" as="h2">
            NEVRUZ ve KUT
          </EditableText>
          <div className="text-stone-300 leading-relaxed space-y-4 text-base sm:text-lg">
            <EditableText storageKey="cul_sec9_p1" defaultValue="<strong>Nevruz</strong>, Türk kut geleneğinin en önemli törenidir. 21 Mart'ta kutlanan yılbaşı, <strong>Kut'un yenilendiği gün</strong> olarak görülür." className="block" as="p">
              <strong className="text-white">Nevruz</strong>, Türk kut geleneğinin en önemli törenidir.
              21 Mart&apos;ta kutlanan yılbaşı, <strong className="text-emerald-400">Kut&apos;un yenilendiği gün</strong> olarak görülür.
            </EditableText>
            <EditableText storageKey="cul_sec9_p2" defaultValue="Nevruz'da hükümdar, halka armağanlar dağıtır, zindanları boşaltır, vergileri affeder. Bu, Kut'un bereketini halkla paylaşma ritüelidir." className="block" as="p">
              Nevruz&apos;da hükümdar, halka armağanlar dağıtır, zindanları boşaltır, vergileri affeder.
              Bu, Kut&apos;un bereketini halkla paylaşma ritüelidir.
            </EditableText>
            <EditableText storageKey="cul_sec9_p3" defaultValue="Orhun Yazıtları'nda Nevruz törenlerinin zenginliğinden bahsedilir. Kutadgu Bilig'de hükümdarın Nevruz'da halkla bütünleşmesi vurgulanır. Osmanlı'da Nevruz, padişahın halka armağan dağıttığı önemli bir gün olmuştur." className="block" as="p">
              Orhun Yazıtları&apos;nda Nevruz törenlerinin zenginliğinden bahsedilir.
              Kutadgu Bilig&apos;de hükümdarın Nevruz&apos;da halkla bütünleşmesi vurgulanır.
              Osmanlı&apos;da Nevruz, padişahın halka armağan dağıttığı önemli bir gün olmuştur.
            </EditableText>
            <Quote text="Nevruz günü, kutun yenilendiği gündür. Hükümdar, halkına armağanlar sunar." source="Eski Türk Töreleri" storageKey="sec9" />
          </div>
        </div>
      </section>

      {/* ══════════════ 10. EDEBİYATTA KUT ══════════════ */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-b from-stone-950 via-violet-950/15 to-stone-950">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <SectionHeader icon={Scroll} subtitle="Kutadgu Bilig" accent="violet" storageKey="edebiyat" />
          <EditableText storageKey="cul_sec10_title" defaultValue="EDEBİYATTA KUT" className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight text-right block" as="h2">
            EDEBİYATTA KUT
          </EditableText>
          <div className="text-stone-300 leading-relaxed space-y-4 text-base sm:text-lg text-right">
            <EditableText storageKey="cul_sec10_p1" defaultValue="<strong>Kutadgu Bilig</strong> (Mutluluk Veren Bilgi), M.S. 1069'da Yusuf Has Hacib tarafından yazılmış, Kut felsefesini en sistematik şekilde işleyen eserdir." className="block" as="p">
              <strong className="text-white">Kutadgu Bilig</strong> (Mutluluk Veren Bilgi), M.S. 1069&apos;da Yusuf Has Hacib tarafından yazılmış,
              Kut felsefesini en sistematik şekilde işleyen eserdir.
            </EditableText>
            <EditableText storageKey="cul_sec10_p2" defaultValue="Eserde Kut, erdemle birleşince devletin baki kalacağı vurgulanır. <strong>'Erdemsiz kut, kum üzerine kurulmuş saraydır'</strong> denilir. Hükümdarın dört temel erdemi: adalet, cömertlik, doğruluk ve cesarettir." className="block" as="p">
              Eserde Kut, erdemle birleşince devletin baki kalacağı vurgulanır.
              <strong className="text-violet-400">&ldquo;Erdemsiz kut, kum üzerine kurulmuş saraydır&rdquo;</strong> denilir.
              Hükümdarın dört temel erdemi: adalet, cömertlik, doğruluk ve cesarettir.
            </EditableText>
            <EditableText storageKey="cul_sec10_p3" defaultValue="Kutadgu Bilig, aynı zamanda <strong>siyasi bir ahlak kitabıdır</strong>. Hükümdarın nasıl yönetmesi gerektiğini, halkla nasıl ilişki kurması gerektiğini anlatır. Bu eser, Türk siyaset felsefesinin en önemli kaynağıdır." className="block" as="p">
              Kutadgu Bilig, aynı zamanda <strong className="text-violet-400">siyasi bir ahlak kitabıdır</strong>.
              Hükümdarın nasıl yönetmesi gerektiğini, halkla nasıl ilişki kurması gerektiğini anlatır.
              Bu eser, Türk siyaset felsefesinin en önemli kaynağıdır.
            </EditableText>
            <Quote text="Kut, bilgiyle birleşince devlet yücelir. Bilgisiz kut, körün elindeki ışıktır." source="Kutadgu Bilig, Yusuf Has Hacib (1069)" storageKey="sec10" />
          </div>
        </div>
      </section>

      {/* ══════════════ 11. OSMANLI'DA KUT ══════════════ */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-b from-stone-950 via-amber-950/15 to-stone-950">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <SectionHeader icon={Crown} subtitle="Cülus Töreni" accent="amber" storageKey="osmanli" />
          <EditableText storageKey="cul_sec11_title" defaultValue="OSMANLI'DA KUT" className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight block" as="h2">
            OSMANLI&apos;DA KUT
          </EditableText>
          <div className="text-stone-300 leading-relaxed space-y-4 text-base sm:text-lg">
            <EditableText storageKey="cul_sec11_p1" defaultValue="Osmanlı İmparatorluğu'nda Kut geleneği <strong>Cülus Töreni</strong> ile devam etmiştir. Yeni padişahın tahta çıkış töreni, Kut'un aktarılması ritüelidir." className="block" as="p">
              Osmanlı İmparatorluğu&apos;nda Kut geleneği <strong className="text-white">Cülus Töreni</strong> ile devam etmiştir.
              Yeni padişahın tahta çıkış töreni, Kut&apos;un aktarılması ritüelidir.
            </EditableText>
            <EditableText storageKey="cul_sec11_p2" defaultValue="Cülus töreninde padişah, <strong>Hırka-i Saadet</strong> (Peygamberin hırkası) önünde dua eder, kılıç kuşanır ve hilafet nişanını takar. Bu, Kut'un sembolik aktarımıdır." className="block" as="p">
              Cülus töreninde padişah, <strong className="text-amber-400">Hırka-i Saadet</strong> (Peygamberin hırkası) önünde dua eder,
              kılıç kuşanır ve hilafet nişanını takar. Bu, Kut&apos;un sembolik aktarımıdır.
            </EditableText>
            <EditableText storageKey="cul_sec11_p3" defaultValue="Osmanlı padişahları, kendilerini <strong>'Allah'ın yeryüzündeki gölgesi'</strong> olarak tanımlamışlardır. Bu ifade, Kut anlayışının İslamlaştırılmış halidir. Padişah, Kut'u halka hizmet etmekle yükümlüdür." className="block" as="p">
              Osmanlı padişahları, kendilerini <strong className="text-amber-400">&ldquo;Allah&apos;ın yeryüzündeki gölgesi&rdquo;</strong> olarak tanımlamışlardır.
              Bu ifade, Kut anlayışının İslamlaştırılmış halidir.
              Padişah, Kut&apos;u halka hizmet etmekle yükümlüdür.
            </EditableText>
            <Quote text="Padişah, Allah'ın yeryüzündeki gölgesidir. Gölge, sahibinden ayrılmaz." source="Osmanlı Hükümdarlık Felsefesi" storageKey="sec11" />
          </div>
        </div>
      </section>

      {/* ══════════════ 12. MİRAS ══════════════ */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-b from-stone-950 via-amber-950/20 to-stone-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/15 via-transparent to-transparent" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8 text-center">
          <Crown className="w-14 h-14 text-amber-500 mx-auto mb-6" />
          <EditableText storageKey="cul_sec12_title" defaultValue="Binlerce Yıllık Miras" className="text-3xl sm:text-4xl font-black text-white mb-4 block" as="h2">
            Binlerce Yıllık Miras
          </EditableText>
          <EditableText storageKey="cul_sec12_desc" defaultValue="Kut anlayışı, Türk kültürünün binlerce yıllık mirasıdır. Hükümdarın halka hizmet etme sorumluluğu, adalet ve erdem ilkeleri, günümüzde de Türk siyaset kültürünün temel taşlarıdır." className="text-stone-300 leading-relaxed text-lg block" as="p">
            Kut anlayışı, Türk kültürünün binlerce yıllık mirasıdır.
            Hükümdarın halka hizmet etme sorumluluğu, adalet ve erdem ilkeleri,
            günümüzde de Türk siyaset kültürünün temel taşlarıdır.
          </EditableText>
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            <Pill label="Orhun Yazıtları" value="M.S. 732" storageKey="orhun" />
            <Pill label="Kutadgu Bilig" value="M.S. 1069" storageKey="kutadgu" />
            <Pill label="Osmanlı Cülus" value="M.S. 1299-1922" storageKey="osmanli_culus" />
          </div>
          <div className="mt-12">
            <Link
              to="/tarih"
              className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold px-6 py-3 rounded-full transition-colors"
            >
              Tarihi Keşfet
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer spacer */}
      <div className="h-12" />
    </div>
  );
}
