import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { epics } from "../data/epics";
import { BookOpen, Clock, Globe, FileText, ArrowLeft } from "lucide-react";
import EditableText from "../components/EditableText";

const sortedEpics = [...epics].sort((a, b) => a.order - b.order);

export default function Epics() {
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
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
         >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-700 rounded-2xl mb-6">
              <BookOpen className="text-white" size={32} />
            </div>
            <EditableText
              storageKey="epics_title"
              defaultValue="Türk Destanları"
              className="text-4xl sm:text-5xl font-bold text-white mb-4 block"
              as="h1"
            >
              Türk Destanları
            </EditableText>
            <EditableText
              storageKey="epics_desc"
              defaultValue="Türk milletinin ruhunu, kahramanlıklarını ve hayallerini anlatan destansı hikayeler. Her bir destanın tam metnini okuyun."
              className="text-amber-300 text-lg max-w-2xl mx-auto block"
              as="p"
            >
              Türk milletinin ruhunu, kahramanlıklarını ve hayallerini anlatan destansı hikayeler.
              Her bir destanın tam metnini okuyun.
            </EditableText>
          </motion.div>
        </div>
      </section>

      {/* Epics Grid */}
      <section className="py-16 px-4 bg-stone-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sortedEpics.map((epic, i) => (
              <motion.div
                key={epic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                
             >
                <Link
                  to={`/destanlar/${epic.id}`}
                 className="block bg-stone-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group border border-stone-800 relative"
               >
                  <div className="flex flex-col sm:flex-row">
                    {/* Order Badge */}
                    <div className="absolute top-3 left-3 z-10 w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-white text-sm font-bold shadow-lg">
                      {epic.order}
                    </div>
                    <div className="sm:w-56 aspect-[4/3] sm:aspect-auto sm:h-auto shrink-0 overflow-hidden">
                      <img
                        src={epic.image}
                        alt={epic.title}
                       className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                    />
                    </div>
                    <div className="p-6 flex-1">
                      <div className="flex items-center gap-2 text-xs text-amber-600 font-medium mb-2">
                        <Clock size={14} />
                        <span>{epic.period}</span>
                        <span className="text-stone-300">|</span>
                        <Globe size={14} />
                        <span>{epic.origin}</span>
                      </div>
                      <EditableText
                        storageKey={`epic_title_${epic.id}`}
                        defaultValue={epic.title}
                        className="text-xl font-bold text-white mb-1 group-hover:text-amber-400 transition-colors block"
                        as="h2"
                      >
                        {epic.title}
                      </EditableText>
                      <EditableText
                        storageKey={`epic_sub_${epic.id}`}
                        defaultValue={epic.subtitle}
                        className="text-sm text-stone-400 mb-3 block"
                        as="p"
                      >
                        {epic.subtitle}
                      </EditableText>
                      <EditableText
                        storageKey={`epic_desc_${epic.id}`}
                        defaultValue={epic.description}
                        className="text-sm text-stone-300 leading-relaxed mb-4 line-clamp-3 block"
                        as="p"
                      >
                        {epic.description}
                      </EditableText>
                      <div className="flex items-center gap-4 text-xs text-stone-400">
                        {epic.verses && (
                          <span className="flex items-center gap-1">
                            <FileText size={14} />
                            {epic.verses} dize
                          </span>
                        )}
                        {epic.pages && (
                          <span className="flex items-center gap-1">
                            <BookOpen size={14} />
                            {epic.pages} sayfa
                          </span>
                        )}
                      </div>
                      <EditableText
                        storageKey="epic_read_more"
                        defaultValue="Tam Metni Oku →"
                        className="mt-4 text-amber-600 text-sm font-medium group-hover:translate-x-1 transition-transform block"
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
