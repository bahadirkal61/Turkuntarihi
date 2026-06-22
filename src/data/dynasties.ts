export interface DynastyInfo {
  name: string;
  period: string;
  description: string;
  highlight: string;
  color: string;
}

export const DYNASTIES: Record<string, DynastyInfo> = {
  iskitler: { name: "İskitler", period: "M.Ö. 600 - M.Ö. 339", description: "Karadeniz kuzeyinde ve Pontik-Kafkasya steplerinde yaşayan göçebe Türk halkı. Anacharsis, İdanthyrsos ve Ateas gibi efsanevi hükümdarlarıyla tanınırlar.", highlight: "Darius'a Karşı Direniş", color: "#8b5cf6" },
  sakalar: { name: "Sakalar", period: "M.Ö. 600 - M.S. 100", description: "İskitlerin Orta Asya'daki koludur. Tomris Kraliçe, Massagetler ve İndo-Sakalar bu medeniyetin parçasıdır.", highlight: "Tomris ve Kiros Zaferi", color: "#a78bfa" },
  hunlar: { name: "Hun İmparatorluğu", period: "M.Ö. 234 - M.S. 216", description: "Ortaya Çin Seddi'ni yaptıran, Avrupa'yı titreten, Mete Han'ın kurduğu ilk Türk imparatorluğu.", highlight: "Mete Han, Attila", color: "#ef4444" },
  gokturk: { name: "Göktürk Kağanlığı", period: "M.S. 552 - 744", description: "Türk adını taşıyan ilk devlet. Orhun Yazıtları'nı bırakan, Tonyukuk ve Bilge Kağan'ın hüküm sürdüğü altın çağ.", highlight: "Orhun Yazıtları", color: "#38bdf8" },
  avar: { name: "Avar Kağanlığı", period: "M.S. 562 - 796", description: "Bayan'ın kurduğu, 626'da Konstantinopolis'i kuşatan, Balkanlar'da 200 yıl hüküm süren güçlü Türk devleti.", highlight: "Konstantinopolis kuşatması", color: "#a855f7" },
  bulgar: { name: "İlk Bulgar İmparatorluğu", period: "M.S. 632 - 1018", description: "Kubrat Han'ın kurduğu, Asparuh'un Bizans'ı yendiği, günümüz Bulgaristan'ın temelini atan efsanevi Türk devleti.", highlight: "Kubrat ve Asparuh", color: "#ec4899" },
  hazar: { name: "Hazar Kağanlığı", period: "M.S. 650 - 969", description: "Yahudiliği resmi din olarak kabul eden tek Türk devleti. Karadeniz'den Hazar Denizi'ne büyük imparatorluk.", highlight: "Yahudiliği kabul eden tek Türk devleti", color: "#6366f1" },
  uygurlar: { name: "Uygur Kağanlığı", period: "M.S. 744 - 840", description: "Manheizm ve Budizm'i benimseyen, Türkçeyi yazı dili haline getiren kültür merkezi.", highlight: "İlk Türk yazı dili", color: "#34d399" },
  karahanlilar: { name: "Karahanlılar", period: "M.S. 840 - 1212", description: "İlk Müslüman Türk devleti. Satuk Buğra Han'ın İslam'ı kabulü.", highlight: "İlk Müslüman Türk devleti", color: "#a78bfa" },
  gazneliler: { name: "Gazneliler", period: "M.S. 962 - 1186", description: "Sebük Tigin ve Mahmut döneminde Hindistan'a kadar uzanan büyük imparatorluk.", highlight: "Mahmut Gazneli", color: "#fb923c" },
  selcuklular: { name: "Büyük Selçuklu", period: "M.S. 1037 - 1157", description: "Malazgirt zaferiyle Anadolu'nun kapılarını açan, Tuğrul, Alp Arslan ve Melikşah'ın devleti.", highlight: "Malazgirt 1071", color: "#818cf8" },
  "anadolu-beylikler": { name: "Anadolu Beylikleri", period: "M.S. 1071 - 1423", description: "Malazgirt sonrası Anadolu'da kurulan 12 ayrı Türk beyliklerinin destanı.", highlight: "12 ayrı beylik", color: "#22d3ee" },
  harzem: { name: "Harzemşahlar", period: "M.S. 1077 - 1231", description: "Cengiz Han öncesi İran ve Orta Asya'da hüküm süren son büyük Türk devleti.", highlight: "Celaleddin Harzemşah", color: "#fb7185" },
  altinordu: { name: "Altınordu Hanlığı", period: "M.S. 1241 - 1502", description: "Batu Han'ın kurduğu, Rus knezliklerine hükmeden büyük hanlık.", highlight: "Batu Han", color: "#facc15" },
  karaman: { name: "Karamanoğulları", period: "M.S. 1250 - 1487", description: "Anadolu'da Osmanlı'nın en büyük rakibi. Türkçeyi resmi dil yapan Mehmet Bey'in devleti.", highlight: "Türkçe resmi dil (1277)", color: "#a3e635" },
  ilhanli: { name: "İlhanlılar", period: "M.S. 1256 - 1353", description: "Hülagü Han'ın kurduğu, Bağdat'ı yıkarak Abbasi Halifeliği'ni sona erdiren, İran ve Ortadoğu'da hüküm süren Moğol-Türk hanedanı. Gazan Han'ın İslam'ı resmi din yapmasıyla Türkleşme sürecine girdi.", highlight: "Bağdat'ın Düşüşü", color: "#0891b2" },
  memluk: { name: "Memluk Devleti", period: "M.S. 1250 - 1517", description: "Mısır ve Suriye'de Türk kökenli askerlerin kurduğu, Moğol'u Ayn Celut'ta durduran devlet.", highlight: "Ayn Celut 1260", color: "#2dd4bf" },
  timur: { name: "Timur İmparatorluğu", period: "M.S. 1370 - 1507", description: "Timur'un kurduğu, Ankara Savaşı'nda Osmanlı'yı durduran imparatorluk.", highlight: "Timur, Ankara 1402", color: "#fbbf24" },
  akkoyunlu: { name: "Akkoyunlu ve Karakoyunlu", period: "M.S. 1378 - 1508", description: "Doğu Anadolu ve Azerbaycan'da hüküm süren Türkmen devletleri.", highlight: "Uzun Hasan", color: "#e879f9" },
  kirim: { name: "Kırım Hanlığı", period: "M.S. 1441 - 1783", description: "Altınordu'nun gerçek halefi, Giray hanedanının yönettiği, 1571'de Moskova'yı ateşe veren Türk devleti.", highlight: "Moskova'yı ateşe vermek", color: "#14b8a6" },
  safevi: { name: "Safevi Devleti", period: "M.S. 1501 - 1736", description: "I. İsmail'in kurduğu, İran'ı birleştiren, Şiiliği resmi din yapan, İsfahan'ı altın çağa taşıyan büyük Türk devleti.", highlight: "I. İsmail", color: "#8b5cf6" },
  osmanli: { name: "Osmanlı İmparatorluğu", period: "M.S. 1299 - 1922", description: "3 kıtaya yayılan, 600 yıl hüküm süren, 36 padişahın tahtta oturduğu dünya imparatorluğu.", highlight: "600 yıllık imparatorluk", color: "#dc2626" },
  cumhuriyet: { name: "Türkiye Cumhuriyeti", period: "M.S. 1923 - Günümüz", description: "Mustafa Kemal Atatürk'ün kurduğu modern Türk devleti. 12 Cumhurbaşkanı, 27 Başbakan.", highlight: "Atatürk", color: "#f87171" },
};
