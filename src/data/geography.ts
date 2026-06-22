export interface TurkicState {
  name: string;
  capital: string;
  population: string;
  language: string;
  currency: string;
  area: string;
  flag: string;
  description: string;
  history: string;
  regions?: string[];
  lat: number;
  lng: number;
  category: "independent" | "autonomous" | "minority";
}

export const independentStates: TurkicState[] = [
  {
    name: "Türkiye Cumhuriyeti",
    capital: "Ankara",
    population: "85.000.000",
    language: "Türkçe",
    currency: "Türk Lirası (TRY)",
    area: "783.562 km²",
    flag: "🇹🇷",
    description:
      "Türk devletlerinin en büyüğü ve en kalabalığıdır. Avrupa ve Asya kıtalarında yer alır. Anadolu toprakları binlerce yıllık Türk hâkimiyetindedir.",
    history:
      "1071 Malazgirt zaferiyle Anadolu'ya ayak basan Türkler, 1299'da Osmanlı Beyliği'ni kurdular. 1453'te İstanbul'u fethederek çağ kapatıp çağ açtılar. 1923'te Mustafa Kemal Atatürk önderliğinde Cumhuriyet ilan edildi.",
    regions: ["İç Anadolu", "Karadeniz", "Ege", "Akdeniz", "Marmara", "Doğu Anadolu", "Güneydoğu Anadolu"],
    lat: 39.93, lng: 32.85, category: "independent",
  },
  {
    name: "Azerbaycan Cumhuriyeti",
    capital: "Bakü",
    population: "10.000.000",
    language: "Azerbaycan Türkçesi",
    currency: "Manat (AZN)",
    area: "86.600 km²",
    flag: "🇦🇿",
    description:
      "Kafkasya'nın en büyük ülkesidir. Hazar Denizi'nin batı kıyısında yer alır. Petrol ve doğalgaz zengini bir ülkedir.",
    history:
      "1918'de kurulan ilk demokratik cumhuriyet olmuştur. 1920'de Sovyetlerce işgal edilmiş, 1991'de bağımsızlığını yeniden kazanmıştır. 2023'de Karabağ Zaferi'yle toprak bütünlüğünü sağlamıştır.",
    lat: 40.41, lng: 49.87, category: "independent",
  },
  {
    name: "Kazakistan Cumhuriyeti",
    capital: "Astana",
    population: "19.000.000",
    language: "Kazakça (Kazak Türkçesi)",
    currency: "Tenge (KZT)",
    area: "2.724.900 km²",
    flag: "🇰🇿",
    description:
      "Dünyanın en büyük kara ile çevrili ülkesidir. Türk devletlerinin en geniş yüzölçümüne sahip olanıdır. Bozkırların ülkesidir.",
    history:
      "15. yüzyılda Kazak Hanlığı kuruldu. 18. yüzyılda Çarlık Rusya'ya girdi. 1991'de Sovyetler Birliği'nin dağılmasıyla bağımsızlığını kazandı.",
    lat: 51.17, lng: 71.43, category: "independent",
  },
  {
    name: "Özbekistan Cumhuriyeti",
    capital: "Taşkent",
    population: "36.000.000",
    language: "Özbekçe (Özbek Türkçesi)",
    currency: "Som (UZS)",
    area: "448.978 km²",
    flag: "🇺🇿",
    description:
      "Orta Asya'nın en kalabalık ülkesidir. İpek Yolu'nun merkezinde yer alır. Buhara, Semerkand gibi tarihi şehirleri barındırır.",
    history:
      "Timur İmparatorluğu'nun merkeziydi. 16. yüzyılda Buhara Hanlığı kuruldu. 1924'te Sovyet cumhuriyeti oldu. 1991'de bağımsızlığını ilan etti.",
    lat: 41.30, lng: 69.24, category: "independent",
  },
  {
    name: "Kırgızistan Cumhuriyeti",
    capital: "Bişkek",
    population: "7.000.000",
    language: "Kırgızca (Kırgız Türkçesi)",
    currency: "Som (KGS)",
    area: "199.951 km²",
    flag: "🇰🇬",
    description:
      "Dünyanın en uzun destanı Manas'ın vatanıdır. Tien Şan dağlarıyla çevrilidir. Issık Gölü dünyanın en büyük dağ göllerinden biridir.",
    history:
      "2010'da demokratik reformlarla parlamenter sisteme geçmiştir. 1991'de bağımsızlığını kazandı. Manas Destanı UNESCO Somut Olmayan Miras Listesi'ndedir.",
    lat: 42.87, lng: 74.60, category: "independent",
  },
  {
    name: "Türkmenistan",
    capital: "Aşkabat",
    population: "7.000.000",
    language: "Türkmence (Türkmen Türkçesi)",
    currency: "Manat (TMT)",
    area: "491.210 km²",
    flag: "🇹🇲",
    description:
      "Karakum Çölü'nün ülkesidir. Dünyanın en büyük kapalı göllerinden Hazar Denizi'ne kıyısı vardır. Gaz zengini bir ülkedir.",
    history:
      "Eski İpek Yolu üzerinde önemli bir duraktı. 1991'de bağımsızlığını ilan etti. 1995'te BM tarafından 'Tarafsızlık' statüsü verildi.",
    lat: 37.95, lng: 58.38, category: "independent",
  },
];

export const autonomousRegions: TurkicState[] = [
  {
    name: "Kuzey Kıbrıs Türk Cumhuriyeti",
    capital: "Lefkoşa",
    population: "380.000",
    language: "Türkçe",
    currency: "Türk Lirası (TRY)",
    area: "3.355 km²",
    flag: "🇹🇷",
    description: "Kıbrıs adasının kuzeyinde Türkler tarafından kurulan devlettir.",
    history: "1974 Barış Harekatı sonrası kuruldu. 1983'te bağımsızlığını ilan etti.",
    lat: 35.19, lng: 33.38, category: "autonomous",
  },
  {
    name: "Tuva Cumhuriyeti (Rusya)",
    capital: "Kızıl",
    population: "330.000",
    language: "Tuvaca",
    currency: "Rus Rublesi (RUB)",
    area: "170.500 km²",
    flag: "🇷🇺",
    description: "Gırtlak şarkısı (Höömei) ile ünlüdür. Türk dili konuşulan özerk cumhuriyettir.",
    history: "Tuva Halk Cumhuriyeti olarak 1921'de kuruldu. 1944'te SSCB'ye katıldı.",
    lat: 51.72, lng: 94.44, category: "autonomous",
  },
  {
    name: "Çuvaşistan (Rusya)",
    capital: "Çeboksarı",
    population: "1.250.000",
    language: "Çuvaşça",
    currency: "Rus Rublesi (RUB)",
    area: "18.300 km²",
    flag: "🇷🇺",
    description: "Türk dillerinin Batı koluna mensup Çuvaşça konuşulan özerk cumhuriyettir.",
    history: "Volga Bulgarları'nın torunlarıdır. 1552'de Rusya'ya katıldı. 1920'de özerk cumhuriyet oldu.",
    lat: 56.13, lng: 47.24, category: "autonomous",
  },
  {
    name: "Dağıstan (Kumuklar)",
    capital: "Mahaçkale",
    population: "3.000.000 (Kumuklar ~500.000)",
    language: "Kumukça (Kumuk Türkçesi)",
    currency: "Rus Rublesi (RUB)",
    area: "50.300 km²",
    flag: "🇷🇺",
    description: "Kafkasya'da yaşayan Kumuk Türkleri'nin yaşadığı bölgedir.",
    history: "Kumuk Hanlığı 16. yüzyılda kuruldu. 19. yüzyılda Rusya İmparatorluğu'na katıldı.",
    lat: 42.98, lng: 47.50, category: "autonomous",
  },
  {
    name: "Tataristan (Rusya)",
    capital: "Kazan",
    population: "4.000.000",
    language: "Tatarca (Tatar Türkçesi)",
    currency: "Rus Rublesi (RUB)",
    area: "67.800 km²",
    flag: "🇷🇺",
    description: "Volga Tatarlarının merkezidir. Kazan Kalesi ünlüdür.",
    history: "Kazan Hanlığı 1438'de kuruldu. 1552'de İvan IV tarafından fethedildi. 1920'de Tataristan kuruldu.",
    lat: 55.79, lng: 49.12, category: "autonomous",
  },
  {
    name: "Karaçay-Çerkesya (Rusya)",
    capital: "Çerkessk",
    population: "450.000",
    language: "Karaçayca-Balkarca (Karaçay-Balkar Türkçesi)",
    currency: "Rus Rublesi (RUB)",
    area: "14.100 km²",
    flag: "🇷🇺",
    description: "Kafkasya'da Türk kökenli Karaçay ve Balkar halklarının yaşadığı cumhuriyettir.",
    history: "Karaçaylar ve Balkarlar Türk halklarıdır. 1944'te sürgün edildiler, 1957'de döndüler.",
    lat: 44.21, lng: 42.05, category: "autonomous",
  },
];

export const minorities: TurkicState[] = [
  {
    name: "Balkarlar (Kabardey-Balkarya)",
    capital: "Nalçik",
    population: "100.000+",
    language: "Balkarca",
    currency: "Rus Rublesi (RUB)",
    area: "12.500 km²",
    flag: "🇷🇺",
    description: "Kafkasya'da yaşayan Türk kökenli halktır.",
    history: "Kabardey-Balkar Özerk Cumhuriyeti içinde yaşarlar. 1944 sürgünü yaşadılar.",
    lat: 43.49, lng: 43.62, category: "minority",
  },
  {
    name: "Yakutlar (Saha)",
    capital: "Yakutsk",
    population: "500.000",
    language: "Sahaca (Yakutça)",
    currency: "Rus Rublesi (RUB)",
    area: "3.100.000 km²",
    flag: "🇷🇺",
    description: "Sibirya'nın en büyük Türk topluluğudur. Dünyanın en soğuk şehri Yakutsk'ta yaşarlar.",
    history: "Saha Cumhuriyeti (Yakutistan) 1922'de kuruldu. Altın ve elmas zengini bölgedir.",
    lat: 62.04, lng: 129.74, category: "minority",
  },
  {
    name: "Hakaslar",
    capital: "Abakan",
    population: "50.000",
    language: "Hakasca",
    currency: "Rus Rublesi (RUB)",
    area: "61.900 km²",
    flag: "🇷🇺",
    description: "Güney Sibirya'da yaşayan Türk kökenli halktır.",
    history: "Hakas Cumhuriyeti 1930'da kuruldu. Eski Türk yazıtlarının bulunduğu bölgedir.",
    lat: 53.72, lng: 91.44, category: "minority",
  },
  {
    name: "Altaylar",
    capital: "Gorno-Altaysk",
    population: "70.000",
    language: "Altayca",
    currency: "Rus Rublesi (RUB)",
    area: "92.600 km²",
    flag: "🇷🇺",
    description: "Altay Dağları'nda yaşayan Türk kökenli halktır.",
    history: "Altay Cumhuriyeti 1922'de kuruldu. Türklerin anayurdu kabul edilen bölgedir.",
    lat: 51.96, lng: 85.96, category: "minority",
  },
  {
    name: "Gagavuzlar (Moldova)",
    capital: "Komrat",
    population: "150.000",
    language: "Gagavuzca",
    currency: "Moldova Leyi (MDL)",
    area: "1.832 km²",
    flag: "🇲🇩",
    description: "Moldova'da özerk bölge olarak yaşayan Türk kökenli Hristiyan topluluktur.",
    history: "Gagavuz Yeri 1994'te özerk statü kazandı. Balkanlardan göç etmişlerdir.",
    lat: 46.30, lng: 28.66, category: "minority",
  },
  {
    name: "Noğaylar",
    capital: "Yok",
    population: "100.000+",
    language: "Noğayca",
    currency: "Çeşitli",
    area: "Dağılık",
    flag: "🇷🇺",
    description: "Kuzey Kafkasya'da ve Romanya'da yaşayan Türk kökenli halktır.",
    history: "Altın Ordu Devleti'nin torunlarıdır. 16. yüzyıldan sonra dağıldılar.",
    lat: 44.55, lng: 46.28, category: "minority",
  },
];

export const allStates: TurkicState[] = [
  ...independentStates,
  ...autonomousRegions,
  ...minorities,
];
