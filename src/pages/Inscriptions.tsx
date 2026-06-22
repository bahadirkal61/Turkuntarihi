import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { inscriptions } from "../data/inscriptions";
import { Scroll, MapPin, User, Calendar, ArrowLeft } from "lucide-react";
import EditableText from "../components/EditableText";

const sortedInscriptions = [...inscriptions].sort((a, b) => a.order - b.order);

export default function Inscriptions() {
  return (
    <div className="min-h-screen bg-stone-950">
      <div className="px-4 pt-6 bg-stone-900">
        <Link to="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-white transition-colors max-w-6xl mx-auto">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Ana Sayfa</span>
        </Link>
      </div>

      {/* Hero */}
      <section className="relative py-20 px-4 bg-stone-900">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
         >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-700 rounded-2xl mb-6">
              <Scroll className="text-white" size={32} />
            </div>
            <EditableText
              storageKey="insc_title"
              defaultValue="Türk Yazıtları"
              className="text-4xl sm:text-5xl font-bold text-white mb-4 block"
              as="h1"
            >
              Türk Yazıtları
            </EditableText>
            <EditableText
              storageKey="insc_desc"
              defaultValue="M.Ö. 500'den M.S. 9. yüzyıla kadar uzanan, Altay'dan Anadolu'ya, Göktürk alfabesinden Eski Uygur yazısına Türk tarihinin yazılı mirası."
              className="text-amber-300 text-lg max-w-2xl mx-auto block"
              as="p"
            >
              M.Ö. 500&apos;den M.S. 9. yüzyıla kadar uzanan, Altay&apos;dan Anadolu&apos;ya,
              Göktürk alfabesinden Eski Uygur yazısına Türk tarihinin yazılı mirası.
            </EditableText>
          </motion.div>
        </div>
      </section>

      {/* Info Banner */}
      <section className="py-10 px-4 bg-amber-950/20 border-b border-amber-800/30">
        <div className="max-w-4xl mx-auto">
          <EditableText
            storageKey="insc_banner"
            defaultValue="Türk yazıtları, M.Ö. 500 yıllarından İskit-Saka dönemine ait Pazyryk kurganlarından başlayarak, M.S. 9. yüzyıldaki Karahanlı dönemine kadar uzanan zengin bir yazılı mirastır. Altay Dağları'ndan Anadolu topraklarına, Yenisey kıyılarından Talas vadisine dek Türk halkının dilini, tarihini ve dünya görüşünü kaydeden birinci el kaynaklardır."
            className="text-stone-300 leading-relaxed text-center mb-6 block"
            as="p"
          >
            Türk yazıtları, M.Ö. 500 yıllarından İskit-Saka dönemine ait Pazyryk kurganlarından
            başlayarak, M.S. 9. yüzyıldaki Karahanlı dönemine kadar uzanan zengin bir yazılı mirastır.
            Altay Dağları&apos;ndan Anadolu topraklarına, Yenisey kıyılarından Talas vadisine dek
            Türk halkının dilini, tarihini ve dünya görüşünü kaydeden birinci el kaynaklardır.
          </EditableText>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-stone-900/60 rounded-xl p-3 border border-stone-800">
              <div className="text-2xl font-bold text-amber-500">14</div>
              <div className="text-xs text-stone-400 mt-1">Yazıt</div>
            </div>
            <div className="bg-stone-900/60 rounded-xl p-3 border border-stone-800">
              <div className="text-2xl font-bold text-amber-500">2500+</div>
              <div className="text-xs text-stone-400 mt-1">Yıllık Tarih</div>
            </div>
            <div className="bg-stone-900/60 rounded-xl p-3 border border-stone-800">
              <div className="text-2xl font-bold text-amber-500">3</div>
              <div className="text-xs text-stone-400 mt-1">Yazı Sistemi</div>
            </div>
            <div className="bg-stone-900/60 rounded-xl p-3 border border-stone-800">
              <div className="text-2xl font-bold text-amber-500">7</div>
              <div className="text-xs text-stone-400 mt-1">Ülke</div>
            </div>
          </div>
        </div>
      </section>

      {/* Inscriptions Grid */}
      <section className="py-16 px-4 bg-stone-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sortedInscriptions.map((inscription, i) => (
              <motion.div
                key={inscription.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                
             >
                <Link
                  to={`/yazitlar/${inscription.id}`}
                 className="block bg-stone-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group border border-stone-800 hover:border-amber-700/50 relative"
               >
                  <div className="flex flex-col sm:flex-row">
                    {/* Order Badge */}
                    <div className="absolute top-3 left-3 z-10 w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-white text-sm font-bold shadow-lg">
                      {inscription.order}
                    </div>
                    <div className="sm:w-56 aspect-[4/3] sm:aspect-auto sm:h-auto shrink-0 overflow-hidden">
                      <img
                        src={inscription.image}
                        alt={inscription.name}
                       className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                    />
                    </div>
                    <div className="p-6 flex-1">
                      <div className="flex items-center gap-2 text-xs text-amber-500 font-medium mb-2">
                        <Calendar size={14} />
                        <span>{inscription.year}</span>
                        <span className="text-stone-400">|</span>
                        <MapPin size={14} />
                        <span>{inscription.location.split(",")[0]}</span>
                      </div>
                      <EditableText
                        storageKey={`insc_name_${inscription.id}`}
                        defaultValue={inscription.name}
                        className="text-xl font-bold mb-1 text-white group-hover:text-amber-400 transition-colors block"
                        as="h2"
                      >
                        {inscription.name}
                      </EditableText>
                      <EditableText
                        storageKey={`insc_title_${inscription.id}`}
                        defaultValue={inscription.title}
                        className="text-sm text-stone-400 mb-3 block"
                        as="p"
                      >
                        {inscription.title}
                      </EditableText>
                      <EditableText
                        storageKey={`insc_desc_${inscription.id}`}
                        defaultValue={inscription.description}
                        className="text-sm text-stone-400 leading-relaxed mb-4 line-clamp-3 block"
                        as="p"
                      >
                        {inscription.description}
                      </EditableText>
                      <div className="flex items-center gap-1 text-xs text-stone-400">
                        <User size={14} />
                        <EditableText
                          storageKey={`insc_disc_${inscription.id}`}
                          defaultValue={inscription.discoverer}
                          className="block"
                          as="span"
                        >
                          {inscription.discoverer}
                        </EditableText>
                      </div>
                      <EditableText
                        storageKey="insc_read_more"
                        defaultValue="Tam Metni Oku →"
                        className="mt-4 text-amber-500 text-sm font-medium group-hover:translate-x-1 transition-transform block"
                        as="div"
                      >
                        Tam Metni Oku →
                      </EditableText>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
