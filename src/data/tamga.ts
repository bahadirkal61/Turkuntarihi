// Türk Boyları Tamgaları - Geleneksel damga sembolleri
// Her boyun kendine özgü geometrik tamgası

export interface Tamga {
  id: string;
  boyId: string;
  name: string;
  // SVG path data for the tamga symbol
  paths: string[];
  // Optional circles for dots
  circles?: { cx: number; cy: number; r: number }[];
  // ViewBox for the SVG
  viewBox: string;
}

// Helper to create simple geometric tamgas
// Turkish tamgas traditionally use: dots, lines, circles, crosses, triangles

export const tamgalar: Record<string, Tamga> = {
  // === BOZOKLAR ===
  kayi: {
    id: "kayi",
    boyId: "kayi",
    name: "Kayı Tamgası",
    viewBox: "0 0 100 100",
    paths: [
      // Central vertical line (tree/trunk - "kayın" meaning oak)
      "M50 15 L50 85",
      // Top horizontal
      "M30 25 L70 25",
      // Middle branches
      "M35 45 L65 45",
      // Bottom base
      "M25 75 L75 75",
      // Side branches
      "M30 25 L20 45", "M70 25 L80 45",
      "M35 45 L25 60", "M65 45 L75 60",
    ],
    circles: [{ cx: 50, cy: 18, r: 4 }],
  },
  bayat: {
    id: "bayat",
    boyId: "bayat",
    name: "Bayat Tamgası",
    viewBox: "0 0 100 100",
    paths: [
      // Central vertical
      "M50 10 L50 90",
      // Horizontal cross bars
      "M20 30 L80 30",
      "M20 50 L80 50",
      "M20 70 L80 70",
      // Side extensions
      "M20 30 L20 50", "M80 30 L80 50",
    ],
  },
  alkaevli: {
    id: "alkaevli",
    boyId: "alkevli",
    name: "Alkaevli Tamgası",
    viewBox: "0 0 100 100",
    paths: [
      // Bow shape (alka = bow)
      "M20 50 Q50 10 80 50 Q50 90 20 50",
      // Inner bow
      "M30 50 Q50 25 70 50 Q50 75 30 50",
      // String
      "M20 50 L80 50",
    ],
    circles: [{ cx: 50, cy: 50, r: 3 }],
  },
  karaevli: {
    id: "karaevli",
    boyId: "karakevli",
    name: "Karaevli Tamgası",
    viewBox: "0 0 100 100",
    paths: [
      // Central vertical
      "M50 15 L50 85",
      // Top circle frame
      "M25 35 Q50 5 75 35 Q50 65 25 35",
      // Horizontal bars
      "M30 55 L70 55",
      "M30 75 L70 75",
    ],
    circles: [{ cx: 50, cy: 35, r: 4 }],
  },
  yazir: {
    id: "yazir",
    boyId: "yazir",
    name: "Yazır Tamgası",
    viewBox: "0 0 100 100",
    paths: [
      // Diamond shape
      "M50 10 L90 50 L50 90 L10 50 Z",
      // Inner diamond
      "M50 25 L75 50 L50 75 L25 50 Z",
      // Center cross
      "M50 35 L50 65", "M35 50 L65 50",
    ],
  },
  doger: {
    id: "doger",
    boyId: "doger",
    name: "Döğer Tamgası",
    viewBox: "0 0 100 100",
    paths: [
      // Outer rectangle
      "M20 20 L80 20 L80 80 L20 80 Z",
      // Inner cross
      "M50 20 L50 80", "M20 50 L80 50",
      // Diagonal lines
      "M30 30 L70 70", "M70 30 L30 70",
    ],
  },
  dodurga: {
    id: "dodurga",
    boyId: "dodurga",
    name: "Dodurga Tamgası",
    viewBox: "0 0 100 100",
    paths: [
      // Three vertical lines (strength symbol)
      "M30 15 L30 85",
      "M50 10 L50 90",
      "M70 15 L70 85",
      // Connecting horizontals
      "M30 30 L70 30",
      "M30 50 L70 50",
      "M30 70 L70 70",
    ],
  },
  // === ÜÇOKLAR ===
  yiva: {
    id: "yiva",
    boyId: "yiva",
    name: "Yıva Tamgası",
    viewBox: "0 0 100 100",
    paths: [
      // Arrow shape pointing down
      "M50 10 L50 70",
      "M30 50 L50 70 L70 50",
      // Feather lines
      "M35 20 L65 20",
      "M35 30 L65 30",
      "M35 40 L65 40",
    ],
    circles: [{ cx: 50, cy: 75, r: 3 }],
  },
  avsar: {
    id: "avsar",
    boyId: "avsar",
    name: "Avşar Tamgası",
    viewBox: "0 0 100 100",
    paths: [
      // Shield shape (avşar = guard)
      "M50 10 L85 25 L85 55 Q85 80 50 90 Q15 80 15 55 L15 25 Z",
      // Inner pattern
      "M50 25 L50 75",
      "M30 45 L70 45",
      "M30 60 L70 60",
    ],
  },
  kizik: {
    id: "kizik",
    boyId: "kizik",
    name: "Kızık Tamgası",
    viewBox: "0 0 100 100",
    paths: [
      // Circle with cross
      "M50 15 A35 35 0 1 1 50 85 A35 35 0 1 1 50 15",
      "M50 25 L50 75",
      "M25 50 L75 50",
    ],
    circles: [
      { cx: 50, cy: 25, r: 3 },
      { cx: 50, cy: 75, r: 3 },
      { cx: 25, cy: 50, r: 3 },
      { cx: 75, cy: 50, r: 3 },
    ],
  },
  bayindir: {
    id: "bayindir",
    boyId: "bayindir",
    name: "Bayındır Tamgası",
    viewBox: "0 0 100 100",
    paths: [
      // Crown-like shape (richness)
      "M20 60 L30 30 L50 15 L70 30 L80 60 L80 85 L20 85 Z",
      // Inner lines
      "M30 30 L30 60", "M50 15 L50 60", "M70 30 L70 60",
      "M20 60 L80 60",
    ],
  },
  salur: {
    id: "salur",
    boyId: "salur",
    name: "Salur Tamgası",
    viewBox: "0 0 100 100",
    paths: [
      // Sword shape (salur = warrior)
      "M50 10 L50 75",
      "M35 25 L50 10 L65 25",
      // Cross guard
      "M25 60 L75 60",
      "M35 60 L35 75 L65 75 L65 60",
    ],
  },
  cepni: {
    id: "cepni",
    boyId: "cepni",
    name: "Çepni Tamgası",
    viewBox: "0 0 100 100",
    paths: [
      // Triangular/arrow shape
      "M50 10 L90 45 L75 45 L75 90 L25 90 L25 45 L10 45 Z",
      // Inner line
      "M50 10 L50 70",
    ],
    circles: [{ cx: 50, cy: 80, r: 3 }],
  },
  // === KIPÇAKLAR ===
  kazak: {
    id: "kazak",
    boyId: "kazak",
    name: "Kazak Tamgası",
    viewBox: "0 0 100 100",
    paths: [
      // Wolf head simplified (kazak = free, wolf)
      "M30 35 L50 15 L70 35 L70 55 L50 75 L30 55 Z",
      // Ears
      "M35 25 L30 10 L45 20", "M65 25 L70 10 L55 20",
      // Eye
      "M42 40 L50 38 L58 40",
      // Mouth
      "M40 55 L50 60 L60 55",
    ],
    circles: [{ cx: 45, cy: 40, r: 2 }, { cx: 55, cy: 40, r: 2 }],
  },
  kirgiz: {
    id: "kirgiz",
    boyId: "kirgiz",
    name: "Kırgız Tamgası",
    viewBox: "0 0 100 100",
    paths: [
      // Eagle/forty symbol (Kırk = forty)
      "M50 10 L75 35 L65 35 L80 55 L60 55 L70 85 L50 70 L30 85 L40 55 L20 55 L35 35 L25 35 Z",
    ],
  },
  karakalpak: {
    id: "karakalpak",
    boyId: "karakalpak",
    name: "Karakalpak Tamgası",
    viewBox: "0 0 100 100",
    paths: [
      // Black hat symbol
      "M25 40 Q50 20 75 40 L70 70 Q50 85 30 70 Z",
      // Top line
      "M20 40 Q50 15 80 40",
      // Tassel
      "M50 75 L50 90", "M45 88 L55 88",
    ],
  },
  tatar: {
    id: "tatar",
    boyId: "tatar",
    name: "Tatar Tamgası",
    viewBox: "0 0 100 100",
    paths: [
      // Moon crescent (Islamic influence)
      "M50 15 A30 30 0 1 0 50 85 A25 25 0 1 1 50 15",
      // Star inside
      "M50 35 L55 45 L65 45 L57 52 L60 62 L50 56 L40 62 L43 52 L35 45 L45 45 Z",
    ],
  },
  baskurt: {
    id: "baskurt",
    boyId: "baskurt",
    name: "Başkurt Tamgası",
    viewBox: "0 0 100 100",
    paths: [
      // Bee symbol (Başkurt = beekeeper)
      "M50 15 Q75 15 75 40 Q75 55 50 60 Q25 55 25 40 Q25 15 50 15",
      // Stripes
      "M25 30 L75 30", "M25 40 L75 40", "M25 50 L75 50",
      // Wings
      "M20 25 Q5 20 10 40 Q5 50 20 45",
      "M80 25 Q95 20 90 40 Q95 50 80 45",
    ],
  },
  // === UYGURLAR ===
  sincanuygur: {
    id: "sincanuygur",
    boyId: "sincan-uygur",
    name: "Uygur Tamgası",
    viewBox: "0 0 100 100",
    paths: [
      // Sun and moon (Manichaean symbol)
      "M50 15 A25 25 0 1 1 50 85 A25 25 0 1 1 50 15",
      // Sun rays
      "M50 5 L50 15", "M50 85 L50 95",
      "M10 50 L20 50", "M80 50 L90 50",
      "M22 22 L29 29", "M71 71 L78 78",
      "M22 78 L29 71", "M71 29 L78 22",
      // Inner crescent
      "M50 25 A20 20 0 0 0 50 75 A15 15 0 0 1 50 25",
    ],
  },
  // === GÖKTÜRK ===
  yakut: {
    id: "yakut",
    boyId: "yakut",
    name: "Saha (Yakut) Tamgası",
    viewBox: "0 0 100 100",
    paths: [
      // Tree of life (Siberian)
      "M50 80 L50 30",
      "M50 30 L25 15", "M50 30 L75 15",
      "M50 45 L30 30", "M50 45 L70 30",
      "M50 60 L35 45", "M50 60 L65 45",
      // Roots
      "M50 80 L30 90", "M50 80 L70 90",
      // Ground line
      "M15 90 L85 90",
    ],
  },
  tuvan: {
    id: "tuvan",
    boyId: "tuvan",
    name: "Tuva Tamgası",
    viewBox: "0 0 100 100",
    paths: [
      // Mountain with river
      "M50 10 L90 85 L10 85 Z",
      // River
      "M50 35 Q60 50 50 65 Q40 80 50 85",
      // Snow cap
      "M35 40 L50 20 L65 40",
    ],
  },
  // === DİĞERLER ===
  cuvas: {
    id: "cuvas",
    boyId: "cuvas",
    name: "Çuvaş Tamgası",
    viewBox: "0 0 100 100",
    paths: [
      // Three suns ( Bulgar symbol)
      "M50 20 A12 12 0 1 1 50 44 A12 12 0 1 1 50 20",
      "M25 55 A10 10 0 1 1 25 75 A10 10 0 1 1 25 55",
      "M75 55 A10 10 0 1 1 75 75 A10 10 0 1 1 75 55",
      // Connecting lines
      "M37 32 L25 55", "M63 32 L75 55",
      "M25 75 L75 75",
    ],
  },
  gagavuz: {
    id: "gagavuz",
    boyId: "gagavuz",
    name: "Gagavuz Tamgası",
    viewBox: "0 0 100 100",
    paths: [
      // Cross with olive branches
      "M50 15 L50 85", "M20 50 L80 50",
      "M20 50 Q15 35 25 30",
      "M80 50 Q85 35 75 30",
      "M20 50 Q15 65 25 70",
      "M80 50 Q85 65 75 70",
    ],
  },
  halac: {
    id: "halac",
    boyId: "halac",
    name: "Halaç Tamgası",
    viewBox: "0 0 100 100",
    paths: [
      // Hexagon
      "M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z",
      // Inner star
      "M50 25 L50 75", "M25 50 L75 50",
      "M32 32 L68 68", "M68 32 L32 68",
    ],
  },
  oguzkagan: {
    id: "oguzkagan",
    boyId: "oguz-kagan",
    name: "Oğuz Kağan Tamgası",
    viewBox: "0 0 100 100",
    paths: [
      // Great tree / axis mundi
      "M50 5 L50 95",
      // Top crown
      "M30 20 Q50 0 70 20",
      // Branches left
      "M50 30 L20 20", "M50 45 L15 35", "M50 60 L20 50",
      // Branches right
      "M50 30 L80 20", "M50 45 L85 35", "M50 60 L80 50",
      // Roots
      "M50 80 L25 95", "M50 80 L75 95",
    ],
    circles: [
      { cx: 50, cy: 8, r: 4 },
      { cx: 20, cy: 20, r: 2 },
      { cx: 80, cy: 20, r: 2 },
    ],
  },
  hun: {
    id: "hun",
    boyId: "hun-koku",
    name: "Hun Tamgası",
    viewBox: "0 0 100 100",
    paths: [
      // Wolf totem simplified
      "M30 30 Q50 5 70 30 Q85 40 75 60 L50 85 L25 60 Q15 40 30 30",
      // Inner eye
      "M40 35 L60 35",
      // Mouth
      "M35 55 Q50 65 65 55",
    ],
    circles: [{ cx: 35, cy: 38, r: 3 }, { cx: 65, cy: 38, r: 3 }],
  },
  gokturk: {
    id: "gokturk",
    boyId: "gokturk-koku",
    name: "Göktürk Tamgası",
    viewBox: "0 0 100 100",
    paths: [
      // Double-headed eagle simplified
      "M50 20 Q70 10 80 30 Q85 40 75 50",
      "M50 20 Q30 10 20 30 Q15 40 25 50",
      // Body
      "M50 20 L50 70",
      // Wings spread
      "M25 50 Q10 35 20 25",
      "M75 50 Q90 35 80 25",
      // Tails
      "M50 70 L35 90", "M50 70 L65 90",
    ],
  },
  kipcak: {
    id: "kipcak",
    boyId: "kipcak-koku",
    name: "Kıpçak Tamgası",
    viewBox: "0 0 100 100",
    paths: [
      // Steppe pattern
      "M10 50 L25 30 L40 50 L55 30 L70 50 L85 30 L90 50",
      "M10 70 L25 50 L40 70 L55 50 L70 70 L85 50 L90 70",
      // Frame
      "M10 25 L90 25 L90 75 L10 75 Z",
    ],
  },
  uygurkoku: {
    id: "uygurkoku",
    boyId: "uygur-koku",
    name: "Uygur Tamgası",
    viewBox: "0 0 100 100",
    paths: [
      // Mani symbol - light and dark
      "M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z",
      // Inner circle
      "M50 30 A15 15 0 1 1 50 60 A15 15 0 1 1 50 30",
      // Light rays
      "M50 5 L50 15", "M50 85 L50 95",
      "M5 50 L15 50", "M85 50 L95 50",
    ],
  },
};

// Map boy IDs to tamga IDs
export function getTamgaForBoy(boyId: string): Tamga | undefined {
  // Direct match
  if (tamgalar[boyId]) return tamgalar[boyId];
  
  // Try with variations
  const variations: Record<string, string> = {
    "alkevli": "alkaevli",
    "karaevli": "karaevli",
    "kazak": "kazak",
    "kirgiz": "kirgiz",
    "karakalpak": "karakalpak",
    "tatar": "tatar",
    "baskurt": "baskurt",
    "sincan-uygur": "sincanuygur",
    "yakut": "yakut",
    "tuvan": "tuvan",
    "cuvas": "cuvas",
    "gagavuz": "gagavuz",
    "halac": "halac",
    "oguz-kagan": "oguzkagan",
    "hun-koku": "hun",
    "gokturk-koku": "gokturk",
    "kipcak-koku": "kipcak",
    "uygur-koku": "uygurkoku",
  };
  
  const tamgaId = variations[boyId];
  return tamgaId ? tamgalar[tamgaId] : undefined;
}
