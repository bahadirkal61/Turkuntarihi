import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { allStates } from "../data/geography";
import type { TurkicState } from "../data/geography";
import { Link } from "react-router-dom";
import {
  Globe, MapPin, Users, Languages, Banknote, Ruler,
  ChevronDown, ChevronUp, Crown, Landmark, UsersRound, Sparkles, ArrowLeft
} from "lucide-react";
import EditableText from "../components/EditableText";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default Leaflet icons
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// --- CUSTOM MARKER ICONS ---
function createMarkerIcon(color: string) {
  const safeColor = color.replace(/[^#0-9a-fA-F]/g, '');
  const div = document.createElement('div');
  div.style.cssText = `width:28px;height:28px;border-radius:50%;background:${safeColor};border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;`;
  const inner = document.createElement('div');
  inner.style.cssText = 'width:8px;height:8px;border-radius:50%;background:white;';
  div.appendChild(inner);
  return L.divIcon({
    className: "custom-marker",
    html: div.outerHTML,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -16],
  });
}

const CATEGORY_CONFIG = {
  independent: { label: "Bağımsız Devlet", color: "#f59e0b", icon: Crown },
  autonomous: { label: "Özerk Bölge", color: "#3b82f6", icon: Landmark },
  minority: { label: "Türk Azınlık", color: "#10b981", icon: UsersRound },
};

const markerIcons = {
  independent: createMarkerIcon("#f59e0b"),
  autonomous: createMarkerIcon("#3b82f6"),
  minority: createMarkerIcon("#10b981"),
};

// --- STATE CARD ---
function StateCard({ state, index }: { state: TurkicState; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const cat = CATEGORY_CONFIG[state.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      
     className="bg-stone-900/80 rounded-2xl border border-stone-800 overflow-hidden hover:border-stone-800 transition-all"
   >
      <button
        onClick={() => setExpanded(!expanded)}
       className="w-full text-left p-5 flex items-center justify-between gap-4"
     >
        <div className="flex items-center gap-4">
          <div
           className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
            style={{ backgroundColor: cat.color + "20", border: `1px solid ${cat.color}40` }}
         >
            {state.flag}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <EditableText
                storageKey={`geo_name_${state.name}`}
                defaultValue={state.name}
                className="font-bold text-white text-lg block"
                as="h3"
              >
                {state.name}
              </EditableText>
              <span
               className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ backgroundColor: cat.color + "20", color: cat.color }}
             >
                {cat.label}
              </span>
            </div>
            <EditableText
              storageKey={`geo_cap_${state.name}`}
              defaultValue={state.capital}
              className="text-stone-400 text-sm flex items-center gap-1 mt-0.5 block"
              as="p"
            >
              <MapPin size={12} /> {state.capital}
            </EditableText>
          </div>
        </div>
        {expanded
          ? <ChevronUp size={20} className="text-stone-400 shrink-0" />
          : <ChevronDown size={20} className="text-stone-400 shrink-0" />
        }
      </button>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
         className="px-5 pb-5 border-t border-stone-800 pt-4"
       >
          <EditableText
            storageKey={`geo_desc_${state.name}`}
            defaultValue={state.description}
            className="text-sm text-stone-300 leading-relaxed mb-4 block"
            as="p"
          >
            {state.description}
          </EditableText>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            <div className="bg-stone-800/60 rounded-lg p-3">
              <div className="flex items-center gap-1.5 text-stone-400 text-xs mb-1">
                <Users size={12} /> Nüfus
              </div>
              <EditableText
                storageKey={`geo_pop_${state.name}`}
                defaultValue={state.population}
                className="text-white text-sm font-semibold block"
                as="p"
              >
                {state.population}
              </EditableText>
            </div>
            <div className="bg-stone-800/60 rounded-lg p-3">
              <div className="flex items-center gap-1.5 text-stone-400 text-xs mb-1">
                <Languages size={12} /> Dil
              </div>
              <EditableText
                storageKey={`geo_lang_${state.name}`}
                defaultValue={state.language}
                className="text-white text-sm font-semibold block"
                as="p"
              >
                {state.language}
              </EditableText>
            </div>
            <div className="bg-stone-800/60 rounded-lg p-3">
              <div className="flex items-center gap-1.5 text-stone-400 text-xs mb-1">
                <Ruler size={12} /> Yüzölçüm
              </div>
              <EditableText
                storageKey={`geo_area_${state.name}`}
                defaultValue={state.area}
                className="text-white text-sm font-semibold block"
                as="p"
              >
                {state.area}
              </EditableText>
            </div>
            <div className="bg-stone-800/60 rounded-lg p-3">
              <div className="flex items-center gap-1.5 text-stone-400 text-xs mb-1">
                <Banknote size={12} /> Para
              </div>
              <EditableText
                storageKey={`geo_cur_${state.name}`}
                defaultValue={state.currency}
                className="text-white text-sm font-semibold block"
                as="p"
              >
                {state.currency}
              </EditableText>
            </div>
            <div className="bg-stone-800/60 rounded-lg p-3 col-span-2 sm:col-span-2">
              <div className="flex items-center gap-1.5 text-stone-400 text-xs mb-1">
                <MapPin size={12} /> Koordinat
              </div>
              <p className="text-white text-sm font-semibold">{state.lat.toFixed(2)}, {state.lng.toFixed(2)}</p>
            </div>
          </div>

          <EditableText
            storageKey={`geo_hist_${state.name}`}
            defaultValue={state.history}
            className="text-xs text-stone-400 leading-relaxed block"
            as="p"
          >
            {state.history}
          </EditableText>

          {state.regions && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {state.regions.map((r) => (
                <span key={r} className="text-xs px-2.5 py-1 bg-stone-800 rounded-full text-stone-400 border border-stone-800">{r}</span>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

// --- MAP COMPONENT ---
function TurkicMap({ activeFilter }: { activeFilter: string }) {
  const filtered = useMemo(
    () => allStates.filter(s => activeFilter === "all" || s.category === activeFilter),
    [activeFilter]
  );

  return (
    <MapContainer
      center={[45, 65]}
      zoom={3}
      minZoom={2}
      maxZoom={10}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%", background: "#1c1917" }}
      zoomControl={false}
   >
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    />
      {filtered.map((state) => (
        <Marker
          key={state.name}
          position={[state.lat, state.lng]}
          icon={markerIcons[state.category]}
       >
          <Popup className="turkic-popup">
            <div className="min-w-[200px]">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{state.flag}</span>
                <div>
                  <h3 className="font-bold text-white">{state.name}</h3>
                  <span
                   className="text-xs font-medium"
                    style={{ color: CATEGORY_CONFIG[state.category].color }}
                 >
                    {CATEGORY_CONFIG[state.category].label}
                  </span>
                </div>
              </div>
              <div className="text-xs text-stone-400 space-y-1">
                <p className="flex items-center gap-1"><MapPin size={10} /> {state.capital}</p>
                <p className="flex items-center gap-1"><Users size={10} /> {state.population}</p>
                <p className="flex items-center gap-1"><Languages size={10} /> {state.language}</p>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

// --- MAIN PAGE ---
export default function Geography() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredStates = useMemo(
    () => allStates.filter(s => activeFilter === "all" || s.category === activeFilter),
    [activeFilter]
  );

  const filterButtons = [
    { key: "all", label: "Tümü", count: allStates.length, color: "#a8a29e" },
    { key: "independent", label: "Bağımsız", count: allStates.filter(s => s.category === "independent").length, color: "#f59e0b" },
    { key: "autonomous", label: "Özerk", count: allStates.filter(s => s.category === "autonomous").length, color: "#3b82f6" },
    { key: "minority", label: "Azınlık", count: allStates.filter(s => s.category === "minority").length, color: "#10b981" },
  ];

  return (
    <div className="min-h-screen bg-stone-950">
      <div className="px-4 pt-6">
        <Link to="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-white transition-colors max-w-6xl mx-auto">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Ana Sayfa</span>
        </Link>
      </div>
      {/* Hero */}
      <section className="relative py-20 px-4 bg-stone-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-700 rounded-2xl mb-6">
              <Globe className="text-white" size={32} />
            </div>
            <EditableText
              storageKey="geo_title"
              defaultValue="Günümüz Türk Devletleri"
              className="text-4xl sm:text-6xl font-black text-white mb-4 tracking-tight block"
              as="h1"
            >
              Günümüz Türk Devletleri
            </EditableText>
            <EditableText
              storageKey="geo_desc"
              defaultValue="Altay'dan Anadolu'ya, Balkanlar'dan Sibirya'ya kadar uzanan geniş Türk coğrafyası."
              className="text-emerald-300 text-lg sm:text-xl max-w-2xl mx-auto block"
              as="p"
            >
              Altay&apos;dan Anadolu&apos;ya, Balkanlar&apos;dan Sibirya&apos;ya kadar uzanan geniş Türk coğrafyası.
            </EditableText>
            {/* Total Turkic Population Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
             className="mt-8 inline-flex items-center gap-3 px-6 py-3 bg-stone-800/60 backdrop-blur-sm rounded-full border border-amber-500/30"
           >
              <Users className="text-amber-400" size={22} />
              <EditableText
                storageKey="geo_pop_label"
                defaultValue="Dünyadaki Toplam Türk Nüfusu:"
                className="text-stone-300 text-sm block"
                as="span"
              >
                Dünyadaki Toplam Türk Nüfusu:
              </EditableText>
              <EditableText
                storageKey="geo_pop_value"
                defaultValue="~250 Milyon"
                className="text-amber-400 text-2xl font-black block"
                as="span"
              >
                ~250 Milyon
              </EditableText>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-6 mt-8">
              {[
                { icon: Crown, label: "6 Bağımsız Devlet", color: "text-amber-400" },
                { icon: Landmark, label: "6 Özerk Bölge", color: "text-blue-400" },
                { icon: UsersRound, label: "6+ Azınlık", color: "text-emerald-400" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-stone-300">
                  <item.icon className={item.color} size={18} />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative h-[500px] sm:h-[600px] border-y border-stone-800">
        <TurkicMap activeFilter={activeFilter} />

        {/* Legend Overlay */}
        <div className="absolute bottom-4 left-4 z-[400] bg-stone-900/90 backdrop-blur-sm rounded-xl p-4 border border-stone-800 shadow-xl">
          <h3 className="text-white text-sm font-bold mb-3 flex items-center gap-2">
            <Sparkles size={14} className="text-amber-500" /> Harita Açıklaması
          </h3>
          <div className="space-y-2">
            {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
              <div key={key} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: config.color }} />
                <span className="text-stone-300 text-xs">{config.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter + States */}
      <section className="py-16 px-4 bg-stone-950">
        <div className="max-w-6xl mx-auto">
          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            
           className="flex flex-wrap gap-3 justify-center mb-12"
         >
            {filterButtons.map((btn) => (
              <button
                key={btn.key}
                onClick={() => setActiveFilter(btn.key)}
               className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all border ${
                  activeFilter === btn.key
                    ? "border-transparent text-white shadow-lg"
                    : "border-stone-800 text-stone-400 hover:text-white hover:border-stone-500"
                }`}
                style={
                  activeFilter === btn.key
                    ? { backgroundColor: btn.color, boxShadow: `0 4px 15px ${btn.color}40` }
                    : {}
                }
             >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: btn.color }} />
                {btn.label}
                <span className="text-xs opacity-70">({btn.count})</span>
              </button>
            ))}
          </motion.div>

          {/* Section Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Globe size={24} className="text-emerald-500" />
              {activeFilter === "all"
                ? "Tüm Türk Toplulukları"
                : activeFilter === "independent"
                  ? "Bağımsız Türk Devletleri"
                  : activeFilter === "autonomous"
                    ? "Özerk Türk Cumhuriyetleri ve Bölgeleri"
                    : "Türk Azınlıklar ve Topluluklar"
              }
              <span className="text-stone-400 text-lg font-normal">({filteredStates.length})</span>
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredStates.map((s, i) => (
              <StateCard key={s.name} state={s} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
