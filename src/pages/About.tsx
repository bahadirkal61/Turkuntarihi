import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Info, BookOpen, Globe, Scroll, Landmark, Heart, ExternalLink, ArrowLeft } from "lucide-react";
import { sources } from "../data/sources";
import EditableText from "../components/EditableText";

export default function About() {
  return (
    <div className="min-h-screen bg-stone-950">
      {/* Hero */}
      <section className="py-20 px-4 bg-stone-900">
        <div className="max-w-4xl mx-auto text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Ana Sayfa</span>
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-stone-700 rounded-2xl mb-6">
              <Info className="text-amber-400" size={32} />
            </div>
            <EditableText
              storageKey="about_title"
              defaultValue="Türk Tarihi Hakkında"
              className="text-4xl sm:text-5xl font-bold text-white mb-4 block"
              as="h1"
            >
              Türk Tarihi Hakkında
            </EditableText>
            <EditableText
              storageKey="about_subtitle"
              defaultValue="Türk tarihinin, kültürünün, edebiyatının ve coğrafyasının kapsamlı dijital ansiklopedisi."
              className="text-stone-300 text-lg max-w-2xl mx-auto block"
              as="p"
            >
              Türk tarihinin, kültürünün, edebiyatının ve coğrafyasının kapsamlı dijital ansiklopedisi.
            </EditableText>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 bg-stone-950">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            
           className="text-center mb-16"
         >
            <EditableText
              storageKey="about_mission_title"
              defaultValue="Misyonumuz"
              className="text-3xl font-bold text-white mb-6 block"
              as="h2"
            >
              Misyonumuz
            </EditableText>
            <EditableText
              storageKey="about_mission_desc"
              defaultValue="Türk Tarihi, binlerce yıllık zengin Türk tarihini, edebiyatını, kültürünü ve coğrafyasını gelecek nesillere aktarmak amacıyla oluşturulmuş dijital bir platformdur. Amacımız, akademik kaynaklara dayalı, güvenilir ve kapsamlı bir Türk medeniyeti ansiklopedisi sunmaktır."
              className="text-stone-400 leading-relaxed text-lg max-w-2xl mx-auto block"
              as="p"
            >
              Türk Tarihi, binlerce yıllık zengin Türk tarihini, edebiyatını, kültürünü ve coğrafyasını
              gelecek nesillere aktarmak amacıyla oluşturulmuş dijital bir platformdur.
              Amacımız, akademik kaynaklara dayalı, güvenilir ve kapsamlı bir Türk medeniyeti ansiklopedisi sunmaktır.
            </EditableText>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: Landmark, title: "Türk Tarihi", desc: "M.Ö. 520'den günümüze 2.500 yıllık Türk tarihi" },
              { icon: BookOpen, title: "Destanlar", desc: "Oğuz Kağan'dan Manas'a tam metin destan arşivi" },
              { icon: Scroll, title: "Yazıtlar", desc: "Orhun Yazıtları'nın orijinal metinleri ve çevirileri" },
              { icon: Globe, title: "Coğrafya", desc: "Altay'dan Anadolu'ya Türk Dünyası" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                
               className="bg-stone-900 p-6 rounded-xl shadow border border-stone-800 text-center"
             >
                <div className="w-12 h-12 bg-amber-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <item.icon size={24} className="text-amber-600" />
                </div>
                <EditableText
                  storageKey={`about_card_title_${i}`}
                  defaultValue={item.title}
                  className="font-bold text-white mb-2 block"
                  as="h3"
                >
                  {item.title}
                </EditableText>
                <EditableText
                  storageKey={`about_card_desc_${i}`}
                  defaultValue={item.desc}
                  className="text-sm text-stone-400 block"
                  as="p"
                >
                  {item.desc}
                </EditableText>
              </motion.div>
            ))}
          </div>

          {/* Content Sections */}
          <div className="space-y-8 mb-16">
            <div className="bg-stone-900 rounded-xl p-6 sm:p-8 shadow border border-stone-800">
              <EditableText
                storageKey="about_content_title"
                defaultValue="İçerik ve Kaynaklar"
                className="text-xl font-bold text-white mb-4 block"
                as="h3"
              >
                İçerik ve Kaynaklar
              </EditableText>
              <EditableText
                storageKey="about_content_desc"
                defaultValue="Türk Tarihi'ndeki tüm içerikler akademik kaynaklardan derlenmiştir. Hükümdar biyografileri, birincil tarih kaynakları ve modern akademik çalışmalardan; Destanlar, orijinal metinler ve güvenilir çevirilerden; Orhun Yazıtları, orijinal Göktürkçe metinler ve bilimsel transkripsiyonlardan; Coğrafya bölümü, güncel istatistiksel verilerden oluşmaktadır. Her bilgi en az iki bağımsız kaynakla doğrulanmıştır."
                className="text-stone-400 leading-relaxed mb-6 block"
                as="p"
              >
                Türk Tarihi&apos;ndeki tüm içerikler akademik kaynaklardan derlenmiştir.
                Hükümdar biyografileri, birincil tarih kaynakları ve modern akademik çalışmalardan;
                Destanlar, orijinal metinler ve güvenilir çevirilerden;
                Orhun Yazıtları, orijinal Göktürkçe metinler ve bilimsel transkripsiyonlardan;
                Coğrafya bölümü, güncel istatistiksel verilerden oluşmaktadır.
                Her bilgi en az iki bağımsız kaynakla doğrulanmıştır.
              </EditableText>

              {/* Kaynakça - Detaylı */}
              <div className="border-t border-stone-800 pt-6 mt-6">
                <h4 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Kaynakça ({sources.length} kaynak)
                </h4>

                {/* Birincil Kaynaklar / Yazıtlar */}
                <SourceSection
                  title="Birincil Kaynaklar & Yazıtlar"
                  items={sources.filter(s => s.type === "yazit")}
                  color="text-sky-400"
                />

                {/* Kitaplar */}
                <SourceSection
                  title="Kitaplar"
                  items={sources.filter(s => s.type === "kitap")}
                  color="text-amber-400"
                />

                {/* Ansiklopediler */}
                <SourceSection
                  title="Ansiklopediler"
                  items={sources.filter(s => s.type === "ansiklopedi")}
                  color="text-emerald-400"
                />

                {/* Web Kaynakları */}
                <SourceSection
                  title="Web Kaynakları"
                  items={sources.filter(s => s.type === "web")}
                  color="text-violet-400"
                />

                {/* Makaleler */}
                <SourceSection
                  title="Makaleler"
                  items={sources.filter(s => s.type === "makale")}
                  color="text-rose-400"
                />
              </div>
            </div>

            <div className="bg-stone-900 rounded-xl p-6 sm:p-8 shadow border border-stone-800">
              <EditableText
                storageKey="about_tech_title"
                defaultValue="Teknoloji"
                className="text-xl font-bold text-white mb-4 block"
                as="h3"
              >
                Teknoloji
              </EditableText>
              <EditableText
                storageKey="about_tech_desc"
                defaultValue="Bu platform React, TypeScript, Tailwind CSS ve shadcn/ui teknolojileriyle modern web standartlarında geliştirilmiştir. Animasyonlar için Framer Motion, ikonlar için Lucide React kullanılmıştır."
                className="text-stone-400 leading-relaxed block"
                as="p"
              >
                Bu platform React, TypeScript, Tailwind CSS ve shadcn/ui teknolojileriyle
                modern web standartlarında geliştirilmiştir. Animasyonlar için Framer Motion,
                ikonlar için Lucide React kullanılmıştır.
              </EditableText>
            </div>
          </div>

          {/* Quote */}
          <div className="text-center py-10 border-t border-stone-800">
            <Heart size={32} className="text-red-400 mx-auto mb-4" />
            <EditableText
              storageKey="about_quote"
              defaultValue="&ldquo;Türk milleti, ilini töreni kim bozabilir?&rdquo;"
              className="text-xl text-stone-400 italic mb-2 block"
              as="blockquote"
            >
              &ldquo;Türk milleti, ilini töreni kim bozabilir?&rdquo;
            </EditableText>
            <EditableText
              storageKey="about_quote_cite"
              defaultValue="— Bilge Kağan, Orhun Yazıtları, 732"
              className="text-stone-400 block"
              as="cite"
            >
              — Bilge Kağan, Orhun Yazıtları, 732
            </EditableText>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---- Source Section Component ---- */
function SourceSection({
  title,
  items,
  color,
}: {
  title: string;
  items: typeof sources;
  color: string;
}) {
  if (items.length === 0) return null;
  return (
    <div className="mb-5">
      <h5 className={`text-sm font-semibold ${color} mb-2 uppercase tracking-wider`}>{title}</h5>
      <div className="space-y-1.5">
        {items.map((s, i) => (
          <div
            key={i}
            className="flex items-start gap-2 text-stone-400 text-sm hover:text-stone-300 transition-colors"
          >
            <span className="text-stone-600 text-xs mt-0.5 shrink-0">{i + 1}.</span>
            <div className="flex-1 min-w-0">
              <span className="text-stone-300">{s.title}</span>
              {(s.author || s.year) && (
                <span className="text-stone-500">
                  {s.author && ` — ${s.author}`}
                  {s.year && ` (${s.year})`}
                </span>
              )}
            </div>
            {s.url && (
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-600 hover:text-amber-400 transition-colors shrink-0"
                title="Kaynağı görüntüle"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
