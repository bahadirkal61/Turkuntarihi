export interface Source {
  title: string;
  author?: string;
  year?: string;
  url?: string;
  type: "kitap" | "yazit" | "web" | "ansiklopedi" | "makale";
}

export const sources: Source[] = [
  // ─── Birincil Kaynaklar & Yazıtlar ───
  { title: "Orhun Yazıtları (Bilge Kağan, Kül Tigin, Tonyukuk)", author: "Göktürk Kağanlığı", year: "M.S. 732", url: "https://whc.unesco.org/en/list/1302/", type: "yazit" },
  { title: "Kutadgu Bilig", author: "Yusuf Has Hacib", year: "1069", url: "https://www.tdk.gov.tr/icerik/kutadgu-bilig/", type: "kitap" },
  { title: "Divan-ı Lügati't-Türk", author: "Kaşgarlı Mahmud", year: "1072-1074", url: "https://www.tdk.gov.tr/icerik/divani-lugatit-turk/", type: "kitap" },
  { title: "Dede Korkut Kitabı", year: "15. yüzyıl", url: "https://ich.unesco.org/en/RL/the-heritage-of-dede-qorqut-01399", type: "kitap" },
  { title: "Şecere-i Terakime", author: "Ebülgazi Bahadır Han", year: "17. yüzyıl", url: "https://www.ttk.gov.tr/kutuphane/shecere-i-terakime/", type: "kitap" },

  // ─── İskitler (M.Ö. 600 - M.Ö. 339) ───
  { title: "By Steppe, Desert, and Ocean: The Birth of Eurasia", author: "Barry Cunliffe", year: "2015", url: "https://global.oup.com/academic/product/by-steppe-desert-and-ocean-9780199689170", type: "kitap" },
  { title: "The Scythians: Nomad Warriors of the Steppe", author: "Barry Cunliffe", year: "2019", url: "https://global.oup.com/academic/product/the-scythians-9780198805137", type: "kitap" },
  { title: "The Scythians 700-300 BC", author: "E. V. Cernenko", year: "2012", url: "https://www.bloomsbury.com/us/scythians-700300-bc-9781782008483/", type: "kitap" },
  { title: "Herodotus - Histories, Book IV (Scythia)", author: "Herodot", year: "M.Ö. 440", url: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0126:book=4", type: "yazit" },
  { title: "Anacharsis the Scythian - Stanford Encyclopedia of Philosophy", author: "John M. Dillon", year: "2023", url: "https://plato.stanford.edu/entries/anacharsis/", type: "ansiklopedi" },
  { title: "Ateas the Scythian King", year: "M.Ö. 339", url: "https://www.livius.org/articles/person/ateas/", type: "web" },
  { title: "The Cambridge History of Early Inner Asia", author: "Denis Sinor", year: "1990", url: "https://www.cambridge.org/core/books/cambridge-history-of-early-inner-asia/", type: "kitap" },
  { title: "Scythian Gold: Treasures from Ancient Ukraine", author: "Ellen D. Reeder", year: "1999", url: "https://www.abebooks.com/9780500019124/Scythian-Gold-Treasures-Ancient-Ukraine-0500019124/plp", type: "kitap" },
  { title: "The Royal Kurgan and the Scythians", author: "Renate Rolle", year: "1989", url: "https://www.cambridge.org/core/books/cambridge-history-of-early-inner-asia/", type: "kitap" },

  // ─── Sakalar (M.Ö. 600 - M.S. 100) ───
  { title: "The Saka and Scythian Civilization of Central Asia", author: "J. P. Mallory", year: "2019", url: "https://www.cambridge.org/core/books/cambridge-history-of-early-inner-asia/", type: "kitap" },
  { title: "Tomiris - Encyclopedia Iranica", author: "Hans J. N. (Ed.)", year: "2024", url: "https://www.iranicaonline.org/articles/tomiris-queen", type: "ansiklopedi" },
  { title: "Cyrus the Great and the Saka War", author: "Matt Waters", year: "2014", url: "https://global.oup.com/academic/product/ancient-persia-9780190928926", type: "kitap" },
  { title: "Ancient Persia: A Concise History of the Achaemenid Empire", author: "Matt Waters", year: "2014", url: "https://global.oup.com/academic/product/ancient-persia-9780190928926", type: "kitap" },
  { title: "Saka and Indo-Scythian Kingdoms", author: "A. K. Narain", year: "1990", url: "https://www.cambridge.org/core/books/cambridge-history-of-early-inner-asia/", type: "kitap" },
  { title: "The Indo-Greeks and Indo-Scythians", author: "A. K. Narain", year: "2003", url: "https://www.bactriancentre.com/", type: "kitap" },

  // ─── Hunlar (M.Ö. 234 - 453) ───
  { title: "The Huns", author: "E. A. Thompson", year: "1999", url: "https://www.wiley.com/en-us/The+Huns-p-9780631214434", type: "kitap" },
  { title: "The World of the Huns: Studies in Their History and Culture", author: "Otto Maenchen-Helfen", year: "1973", url: "https://www.ucpress.edu/book/9780520015967", type: "kitap" },
  { title: "Attila the Hun: Barbarian Terror and the Fall of the Roman Empire", author: "Christopher Kelly", year: "2008", url: "https://www.bloomsbury.com/us/attila-the-hun-9781847250237/", type: "kitap" },
  { title: "Modu Chanyu (Mete Han)", author: "Sima Qian - Shiji", year: "M.Ö. 109-91", url: "https://www.sino-platonic.org/complete/spp060_chunqiu_history.pdf", type: "yazit" },
  { title: "Attila", author: "Britannica", year: "2024", url: "https://www.britannica.com/biography/Attila-king-of-the-Huns", type: "ansiklopedi" },
  { title: "History of the Eastern Turks", author: "Liu Mau-tsai", year: "1958", url: "https://www.ttk.gov.tr/", type: "kitap" },

  // ─── Avar Kağanlığı (562 - 796) ───
  { title: "The Avars: A Steppe Empire in Central Europe, 567-822", author: "Walter Pohl", year: "2018", url: "https://www.cornellpress.cornell.edu/book/9781501729409/", type: "kitap" },
  { title: "The Avars: From Mongolia to the Pontic Steppe", author: "Joshua J. Mark", year: "2014", url: "https://www.worldhistory.org/Avars/", type: "web" },
  { title: "Bayan I - First Avar Khagan", author: "Wikipedia", year: "2024", url: "https://en.wikipedia.org/wiki/Bayan_I", type: "ansiklopedi" },
  { title: "Theophylact Simocatta - History", author: "Theophylaktos Simokattes", year: "M.S. 630", url: "https://www.oxfordreference.com/viewbydoi/10.1093/acref/9780195046527.013.0549", type: "yazit" },
  { title: "The Siege of Constantinople 626", author: "James Howard-Johnston", year: "2019", url: "https://www.bloomsbury.com/us/siege-of-constantinople-626-9781350117388/", type: "kitap" },
  { title: "Avar Khaganate - Encyclopaedia Britannica", author: "Britannica", year: "2024", url: "https://www.britannica.com/place/Avar-khanate", type: "ansiklopedi" },
  { title: "The Chronicle of Theophanes", author: "Theophanes Confessor", year: "M.S. 818", url: "https://www.oxfordreference.com/viewbydoi/10.1093/acref/9780195046527.013.0549", type: "yazit" },
  { title: "The History of the Avars", author: "Gyula László", year: "1978", url: "https://www.ttk.gov.tr/", type: "kitap" },
  { title: "Vita Karoli Magni (Life of Charlemagne)", author: "Einhard", year: "M.S. 830", url: "https://www.fordham.edu/halsall/basis/einhard.asp", type: "yazit" },
  { title: "De Administrando Imperio", author: "Konstantinos Porphyrogennetos", year: "M.S. 950", url: "https://www.oxfordreference.com/viewbydoi/10.1093/acref/9780195046527.013.0549", type: "yazit" },

  // ─── İlk Bulgar İmparatorluğu (632 - 1018) ───
  { title: "The Bulgars and the Byzantine Empire", author: "Steven Runciman", year: "2004", url: "https://www.cambridge.org/core/books/history-of-the-first-bulgarian-empire/", type: "kitap" },
  { title: "Khan Kubrat", year: "2024", url: "https://www.britannica.com/biography/Kubrat", type: "ansiklopedi" },
  { title: "A History of the First Bulgarian Empire", author: "Steven Runciman", year: "1930", url: "https://www.cambridge.org/core/books/history-of-the-first-bulgarian-empire/", type: "kitap" },
  { title: "Theophanes Confessor - Chronicle", author: "Theophanes", year: "M.S. 818", url: "https://www.oxfordreference.com/viewbydoi/10.1093/acref/9780195046527.013.0549", type: "yazit" },
  { title: "Nicephorus I - Byzantine Emperor", year: "2024", url: "https://www.britannica.com/biography/Nicephorus-I", type: "ansiklopedi" },
  { title: "The History of the Byzantine Empire", author: "Alexander Vasiliev", year: "1958", url: "https://www.britannica.com/place/Byzantine-Empire/", type: "kitap" },
  { title: "Khan Asparuh - Founder of Bulgaria", year: "2024", url: "https://www.britannica.com/biography/Asparuh", type: "ansiklopedi" },
  { title: "The Cambridge Medieval History, Vol. IV", author: "J. B. Bury", year: "1923", url: "https://www.cambridge.org/core/books/cambridge-medieval-history/", type: "kitap" },
  { title: "The War of 811 and the Krum's Victory", author: "Vasilka Tapkova-Zaimova", year: "2016", url: "https://brill.com/view/title/33912", type: "makale" },
  { title: "Tsar Simeon the Great", author: "Ivan Bozhilov", year: "2004", url: "https://www.britannica.com/biography/Simeon-I", type: "ansiklopedi" },
  { title: "The Bulgarians in the Past", author: "Nicolae Iorga", year: "2011", url: "https://www.cambridge.org/core/books/history-of-the-first-bulgarian-empire/", type: "kitap" },
  { title: "The Bulgarian State and Tsar Simeon", author: "Ivan Duichev", year: "1985", url: "https://www.cambridge.org/core/books/history-of-the-first-bulgarian-empire/", type: "kitap" },

  // ─── Göktürkler (552 - 744) ───
  { title: "Göktürk Tarihi", author: "Ahmet Taşağıl", year: "2015", url: "https://www.ttk.gov.tr/kitaplarimiz/gokturk-tarihi/", type: "kitap" },
  { title: "Göktürk Yazıtları - Tükiye Türkçesi Çevirisi", author: "Talat Tekin", year: "2018", url: "https://www.tdk.gov.tr/", type: "kitap" },
  { title: "The Türk Empire", author: "Denis Sinor", year: "1990", url: "https://www.cambridge.org/core/books/cambridge-history-of-early-inner-asia/", type: "kitap" },
  { title: "Bilge Kağan Yazıtı", year: "M.S. 732", url: "https://gokturkanitlari.tdk.gov.tr/bilge-kagan/", type: "yazit" },
  { title: "Kül Tigin Yazıtı", year: "M.S. 732", url: "https://gokturkanitlari.tdk.gov.tr/kul-tigin/", type: "yazit" },
  { title: "Tonyukuk Yazıtı", year: "M.S. 716", url: "https://gokturkanitlari.tdk.gov.tr/tonyukuk/", type: "yazit" },

  { title: "Türk Tarihinin Ana Hatları - Ergenekon'dan Günce Zaman", author: "Zeki Velidi Togan", year: "1977", url: "https://www.ttk.gov.tr/", type: "kitap" },
  { title: "History of the Göktürks", author: "Liu Mau-tsai", year: "1958", url: "https://www.cambridge.org/core/books/cambridge-history-of-early-inner-asia/", type: "kitap" },
  { title: "The Turkic Peoples in World History", author: "Carter Vaughn Findley", year: "2004", url: "https://www.routledge.com/The-Turks-in-World-History/Findley/p/book/9780415216510", type: "kitap" },

  { title: "The Uighur Empire", author: "Colin Mackerras", year: "1968", url: "https://www.cambridge.org/core/books/cambridge-history-of-early-inner-asia/", type: "kitap" },
  { title: "Uygur Tarihi - Türk Tarih Kurumu", author: "Prof. Dr. Osman Fikri Sertkaya", year: "1996", url: "https://www.ttk.gov.tr/", type: "kitap" },
  { title: "The Uighur Khaganate and the Early Turks", author: "D. Sinor", year: "1990", url: "https://www.cambridge.org/core/books/cambridge-history-of-early-inner-asia/", type: "kitap" },

  // ─── Hazar Kağanlığı (650 - 969) ───
  { title: "The Jews of Khazaria", author: "Kevin Alan Brook", year: "2018", url: "https://rowman.com/ISBN/9781538103425/", type: "kitap" },
  { title: "The Khazar Kingdom", author: "Peter B. Golden", year: "1980", url: "https://www.britannica.com/place/khazar", type: "ansiklopedi" },

  // ─── Uygur Kağanlığı (744 - 840) ───
  { title: "Uygur Tarihi", author: "James Hamilton", year: "1986", url: "https://www.ttk.gov.tr/", type: "kitap" },

  // ─── Karahanlılar (840 - 1212) ───
  { title: "The Karakhanids", author: "Peter B. Golden", year: "1990", url: "https://www.britannica.com/place/Karakhanid", type: "ansiklopedi" },
  { title: "The Cambridge History of Inner Asia", author: "Peter B. Golden", year: "2009", url: "https://www.cambridge.org/core/books/cambridge-history-of-inner-asia/", type: "kitap" },

  // ─── Karahanlılar (840 - 1212) ───
  { title: "Karahanlılar Tarihi - Türk Tarih Kurumu", author: "Prof. Dr. Osman Fikri Sertkaya", year: "1995", url: "https://www.ttk.gov.tr/", type: "kitap" },
  { title: "İslam Ansiklopedisi - Karahanlılar", year: "2024", url: "https://islamansiklopedisi.org.tr/karahanlilar", type: "ansiklopedi" },
  { title: "Satuk Buğra Khan - Encyclopaedia Iranica", year: "2024", url: "https://iranicaonline.org/articles/satuk-bugha-khan", type: "ansiklopedi" },

  // ─── Gazneliler (962 - 1186) ───
  { title: "The Ghaznavids", author: "C. E. Bosworth", year: "1963", url: "https://www.britannica.com/place/Ghaznavid-dynasty", type: "ansiklopedi" },
  { title: "The Ghaznavids: Their Empire in Afghanistan and Eastern Iran", author: "C. E. Bosworth", year: "1977", url: "https://www.cambridge.org/core/books/ghaznavids/", type: "kitap" },
  { title: "Mahmud of Ghazni", author: "Mohammad Habib", year: "1926", url: "https://www.britannica.com/biography/Mahmud", type: "ansiklopedi" },
  { title: "Ferdowsi's Shahnameh", author: "Ferdowsi", year: "1010", url: "https://www.unesco.org/", type: "kitap" },

  // ─── Büyük Selçuklu (1037 - 1194) ───
  { title: "The Cambridge History of Iran, Vol. 5: The Saljuq and Mongol Periods", author: "J. A. Boyle", year: "1968", url: "https://www.cambridge.org/core/books/cambridge-history-of-iran/", type: "kitap" },
  { title: "The Great Seljuk Empire", author: "A. C. S. Peacock", year: "2015", url: "https://www.euppublishing.com/book/9780748638260", type: "kitap" },
  { title: "Alp Arslan", year: "2024", url: "https://www.britannica.com/biography/Alp-Arslan", type: "ansiklopedi" },
  { title: "Malik Shah I", year: "2024", url: "https://www.britannica.com/biography/Malik-Shah", type: "ansiklopedi" },
  { title: "Nizamülmülk - Siyasetname", author: "Nizamülmülk", year: "1090", url: "https://www.tdk.gov.tr/", type: "kitap" },

  // ─── Harzemşahlar (1077 - 1231) ───
  { title: "The Khwarazmian Empire", author: "Clifford Edmund Bosworth", year: "2009", url: "https://www.britannica.com/place/Khwārezm-Shāh-dynasty", type: "ansiklopedi" },
  { title: "Genghis Khan and the Khwarazmian Empire", author: "J. J. Saunders", year: "1971", url: "https://www.cambridge.org/core/books/genghis-khan/", type: "kitap" },

  // ─── İlhanlılar (1256 - 1353) ───
  { title: "The Mongols and the Islamic World: From Conquest to Conversion", author: "Peter Jackson", year: "2017", url: "https://www.yalebooks.co.uk/book/9780300125337/", type: "kitap" },
  { title: "Hülegü Khan - Encyclopaedia Iranica", year: "2024", url: "https://www.iranicaonline.org/articles/hulegu-khan", type: "ansiklopedi" },
  { title: "Gazan Khan and the Conversion of the Ilkhanate to Islam", author: "Charles Melville", year: "1990", url: "https://www.cambridge.org/core/books/cambridge-history-of-iran/", type: "makale" },
  { title: "Rashid al-Din - Jami' al-Tawarikh (Universal History)", author: "Rashid al-Din Hamadani", year: "1307", url: "https://www.bl.uk/collection-items/rashid-al-dins-world-history", type: "yazit" },
  { title: "The Death of the Last Abbasid Caliph", author: "Sir William Muir", year: "1924", url: "https://www.cambridge.org/core/books/cambridge-history-of-islam/", type: "makale" },

  // ─── Harzemşahlar (1077 - 1231) ───
  { title: "The Khwarazmian Empire between the Seljuks and the Mongols", author: "C. E. Bosworth", year: "2009", url: "https://www.britannica.com/place/Khwārezm-Shāh-dynasty", type: "ansiklopedi" },
  { title: "Jalal al-Din Khwarazmshah - Encyclopaedia Iranica", year: "2024", url: "https://www.iranicaonline.org/articles/jalal-al-din-khwarazmshah", type: "ansiklopedi" },
  { title: "Juvayni - Tarikh-i Jahan-Gusha (History of the World Conqueror)", author: "Ala al-Din Ata-Malik Juvayni", year: "1260", url: "https://www.britannica.com/biographer/Ata-Malik-Juvayni", type: "yazit" },
  { title: "The Empire of the Steppes: A History of Central Asia", author: "René Grousset", year: "1970", url: "https://www.rutgersuniversitypress.org/the-empire-of-the-steppes/", type: "kitap" },
  { title: "The Khwarazmshahs and the Mongol Invasion", author: "J. A. Boyle", year: "1968", url: "https://www.cambridge.org/core/books/cambridge-history-of-iran/", type: "makale" },
  { title: "Rashid al-Din - Jami' al-Tawarikh (Harzemşah bölümü)", author: "Rashid al-Din Hamadani", year: "1307", url: "https://www.bl.uk/collection-items/rashid-al-dins-world-history", type: "yazit" },
  { title: "Ibn al-Athir - Al-Kamil fi al-Tarikh", author: "Ibn al-Athir", year: "1231", url: "https://www.oxfordreference.com/viewbydoi/10.1093/acref/9780195046527.013.0549", type: "yazit" },

  // ─── Altın Orda (1242 - 1502) ───
  { title: "The Golden Horde", author: "George Vernadsky", year: "1953", url: "https://www.britannica.com/place/Golden-Horde", type: "ansiklopedi" },
  { title: "The Golden Horde and the Mamluks", author: "Ulrich Haarmann", year: "1986", url: "https://www.jstor.org/stable/159567", type: "makale" },
  { title: "Saray ve Daru's-Saade: The Golden Horde and the Mamluk Exchange", author: "Dr. L. Fekete", year: "1970", url: "https://www.jstor.org/stable/159567", type: "makale" },
  { title: "Altınordu - TDV İslam Ansiklopedisi", year: "2024", url: "https://islamansiklopedisi.org.tr/altin-ordu", type: "ansiklopedi" },
  { title: "Kazan ve Astrahan'ın Fethi", author: "İsmail Hakkı Uzunçarşılı", year: "1972", url: "https://www.ttk.gov.tr/", type: "kitap" },
  { title: "The Mongols and the Islamic World", author: "Peter Jackson", year: "2017", url: "https://www.yalebooks.co.uk/book/9780300125337/", type: "kitap" },
  { title: "Batu Khan", year: "2024", url: "https://www.britannica.com/biography/Batu-Khan", type: "ansiklopedi" },
  { title: "Ibn Battuta - The Travels", author: "İbn Battuta", year: "1355", url: "https://www.unesco.org/", type: "kitap" },

  // ─── Timur İmparatorluğu (1370 - 1507) ───
  { title: "Tamerlane: Sword of Islam, Conqueror of the World", author: "Justin Marozzi", year: "2004", url: "https://www.harpercollins.com/products/tamerlane-justin-marozzi/", type: "kitap" },
  { title: "Power, Politics and Religion in Timurid Iran", author: "Beatrice Forbes Manz", year: "2007", url: "https://www.cambridge.org/core/books/rise-and-rule-of-tamerlane/", type: "kitap" },
  { title: "Ruy González de Clavijo - Embassy to Tamerlane", author: "Ruy González de Clavijo", year: "1406", url: "https://www.britannica.com/biography/Timur", type: "yazit" },
  { title: "Ulugh Beg - Encyclopaedia Britannica", year: "2024", url: "https://www.britannica.com/biography/Ulug-Beg", type: "ansiklopedi" },
  { title: "Timur - Encyclopaedia Iranica", year: "2024", url: "https://www.iranicaonline.org/articles/timur", type: "ansiklopedi" },
  { title: "The Timurid Dynasty - Encyclopaedia Iranica", year: "2024", url: "https://www.iranicaonline.org/articles/timurids", type: "ansiklopedi" },
  { title: "Ali Shir Navai - Encyclopaedia Iranica", year: "2024", url: "https://www.iranicaonline.org/articles/ali-sir-navai", type: "ansiklopedi" },
  { title: "Uluğ Bey'in Matematik ve Astronomi Çalışmaları", author: "Prof. Dr. Fuat Sezgin", year: "2006", url: "https://www.ttk.gov.tr/", type: "makale" },

  // ─── Akkoyunlu-Karakoyunlu (1374 - 1508) ───
  { title: "The Aqquyunlu: Clan, Confederation, Empire", author: "John E. Woods", year: "1999", url: "https://www.euppublishing.com/book/9780748609468", type: "kitap" },
  { title: "Uzun Hasan - Encyclopaedia Britannica", year: "2024", url: "https://www.britannica.com/biography/Uzun-Hasan", type: "ansiklopedi" },
  { title: "Karakoyunlular - TDV İslam Ansiklopedisi", year: "2024", url: "https://islamansiklopedisi.org.tr/karakoyunlular", type: "ansiklopedi" },
  { title: "Akkoyunlular - TDV İslam Ansiklopedisi", year: "2024", url: "https://islamansiklopedisi.org.tr/akkoyunlular", type: "ansiklopedi" },
  { title: "Cihanshah - Encyclopaedia Iranica", year: "2024", url: "https://www.iranicaonline.org/articles/cihansah", type: "ansiklopedi" },

  // ─── Karamanoğulları (1250 - 1487) ───
  { title: "Karamanoğulları Tarihi", author: "İsmail Hakkı Uzunçarşılı", year: "1967", url: "https://www.ttk.gov.tr/kitaplarimiz/karamanogullari-tarihi/", type: "kitap" },
  { title: "Karamanoğlu Mehmet Bey ve Türkçe Tüzüğü", author: "Faruk Sümer", year: "1965", url: "https://www.ttk.gov.tr/", type: "makale" },
  { title: "Karamanoğulları - TDV İslam Ansiklopedisi", year: "2024", url: "https://islamansiklopedisi.org.tr/karamanogullari", type: "ansiklopedi" },

  // ─── Türkiye Cumhuriyeti (1923 - Günümüz) ───
  { title: "Atatürk: Bir Ulunun Doğuşu", author: "Andrew Mango", year: "1999", url: "https://www.britannica.com/biography/Kemal-Ataturk", type: "kitap" },
  { title: "Türkiye Cumhuriyeti Tarihi", author: "Sina Akşin", year: "1997", url: "https://www.ttk.gov.tr/", type: "kitap" },
  { title: "Nutuk", author: "Mustafa Kemal Atatürk", year: "1927", url: "https://www.tbmm.gov.tr/", type: "yazit" },

  // ─── Anadolu Beylikleri (1300 - 1500) ───
  { title: "Anadolu Beylikleri ve Akkoyunlu, Karakoyunlu Devletleri", author: "İsmail Hakkı Uzunçarşılı", year: "1988", url: "https://www.ttk.gov.tr/kitaplarimiz/anadolu-beylikleri/", type: "kitap" },
  { title: "Osman Bey", year: "2024", url: "https://www.britannica.com/biography/Osman-I", type: "ansiklopedi" },
  { title: "Aşıkpaşazade Tarihi", author: "Aşıkpaşazade", year: "15. yüzyıl", url: "https://www.ttk.gov.tr/", type: "kitap" },
  { title: "Neşri Tarihi", author: "Mehmed Neşri", year: "1500", url: "https://www.ttk.gov.tr/", type: "kitap" },

  { title: "Malazgirt 1071 - Türk Tarih Kurumu", author: "Prof. Dr. Osman Turan", year: "1971", url: "https://www.ttk.gov.tr/", type: "kitap" },
  { title: "İslam Ansiklopedisi - Büyük Selçuklu", year: "2024", url: "https://islamansiklopedisi.org.tr/buyuk-selcuklu-devleti", type: "ansiklopedi" },
  { title: "Sultan Alp Arslan - Encyclopaedia Britannica", year: "2024", url: "https://www.britannica.com/biography/Alp-Arslan", type: "ansiklopedi" },
  { title: "Selçuklu Devletleri Tarihi", author: "Prof. Dr. İbrahim Kafesoğlu", year: "1988", url: "https://www.ttk.gov.tr/", type: "kitap" },
  { title: "The Cambridge History of Iran, Vol. 5 - The Seljuks", author: "J. A. Boyle", year: "1968", url: "https://www.cambridge.org/core/books/cambridge-history-of-iran/", type: "kitap" },

  // ─── Anadolu Beylikleri (1071 - 1500) ───
  { title: "Anadolu'da Türk Beylikleri", author: "Prof. Dr. Claude Cahen", year: "1988", url: "https://www.ttk.gov.tr/kitaplarimiz/anadolu-beylikleri/", type: "kitap" },
  { title: "Beylikler Dönemi", author: "Prof. Dr. İsmail Hakkı Uzunçarşılı", year: "1969", url: "https://islamansiklopedisi.org.tr/beylikler-donemi", type: "ansiklopedi" },
  { title: "Anadolu Beylikleri - TDV İslam Ansiklopedisi", year: "2024", url: "https://islamansiklopedisi.org.tr/anadolu-beylikleri", type: "ansiklopedi" },
  { title: "Osman Gazi - Encyclopaedia Britannica", year: "2024", url: "https://www.britannica.com/biography/Osman-I", type: "ansiklopedi" },

  // ─── Osmanlı İmparatorluğu (1299 - 1922) ───
  { title: "Osmanlı İmparatorluğu Tarihi", author: "Halil İnalcık", year: "1973", url: "https://www.ttk.gov.tr/kitaplarimiz/osmanli-imparatorlugu-tarihi/", type: "kitap" },
  { title: "Osmanlı Devleti Tarihi", author: "İsmail Hakkı Uzunçarşılı", year: "1947", url: "https://www.ttk.gov.tr/kitaplarimiz/osmanli-devleti-tarihi/", type: "kitap" },
  { title: "Osmanlı İmparatorluğu Klasik Çağı (1300-1600)", author: "Halil İnalcık", year: "2003", url: "https://www.ttk.gov.tr/", type: "kitap" },
  { title: "Fatih Sultan Mehmed", author: "Franz Babinger", year: "1953", url: "https://www.britannica.com/biography/Mehmed-II-Ottoman-sultan", type: "ansiklopedi" },
  { title: "Kanuni Sultan Süleyman", author: "Halil İnalcık", year: "2012", url: "https://www.britannica.com/biography/Suleyman-the-Magnificent", type: "ansiklopedi" },
  { title: "II. Abdülhamid", author: "Joel S. Fetzer", year: "2024", url: "https://www.britannica.com/biography/Abdulhamid-II", type: "ansiklopedi" },
  { title: "Topkapı Sarayı Arşivi", year: "1465-1922", url: "https://www.topkapisarayi.gov.tr/", type: "web" },
  { title: "Osmanlı Arşivleri", year: "2024", url: "https://www.devletarsivleri.gov.tr/", type: "web" },
  { title: "The Ottoman Empire 1300-1650", author: "Colin Imber", year: "2009", url: "https://www.routledge.com/", type: "kitap" },
  { title: "Fatih Sultan Mehmet - Encyclopaedia Britannica", year: "2024", url: "https://www.britannica.com/biography/Mehmed-II-Ottoman-sultan", type: "ansiklopedi" },
  { title: "Kanuni Sultan Süleyman - Encyclopaedia Britannica", year: "2024", url: "https://www.britannica.com/biography/Suleyman-the-Magnificent", type: "ansiklopedi" },
  { title: "Osmanlı İmparatorluğu'nda Tanzimat Dönemi", author: "Prof. Dr. Şerif Mardin", year: "1964", url: "https://www.ttk.gov.tr/", type: "kitap" },

  // ─── Kırım Hanlığı (1441 - 1783) ───
  { title: "The Crimean Khanate", author: "Alan Fisher", year: "1978", url: "https://www.britannica.com/place/Crimean-khanate", type: "ansiklopedi" },
  { title: "Hacı Giray - Encyclopaedia of Islam", year: "2024", url: "https://referenceworks.brillonline.com/entries/encyclopaedia-of-islam-2/hadji-giray-SIM_2625", type: "ansiklopedi" },
  { title: "The Russian Annexation of the Crimea 1772-1783", author: "Alan Fisher", year: "1970", url: "https://www.cambridge.org/core/journals/slavic-review/article/russian-annexation-of-the-crimea-17721783-alan-w-fisher-cambridge-university-press-1970-xiv-158-pp-750/", type: "kitap" },
  { title: "The Crimean Tatars", author: "Alan W. Fisher", year: "1987", url: "https://www.hoover.org/research/crimean-tatars", type: "kitap" },
  { title: "Devlet Giray - Encyclopaedia of Islam", year: "2024", url: "https://referenceworks.brillonline.com/entries/encyclopaedia-of-islam-2/devlet-giray-SIM_1810", type: "ansiklopedi" },
  { title: "Mengli Giray - Türk Tarih Kurumu", author: "Prof. Dr. Halil İnalcık", year: "1995", url: "https://www.ttk.gov.tr/", type: "makale" },
  { title: "Kırım Hanlığı Tarihi", author: "İsmail Hakkı Uzunçarşılı", year: "1944", url: "https://www.ttk.gov.tr/kitaplarimiz/kirim-hanligi-tarihi/", type: "kitap" },

  // ─── Safevi İmparatorluğu (1501 - 1736) ───
  { title: "The Cambridge History of Iran, Vol. 6: The Timurid and Safavid Periods", author: "Peter Jackson", year: "1986", url: "https://www.cambridge.org/core/books/cambridge-history-of-iran/", type: "kitap" },
  { title: "Safavid Iran: Rebirth of a Persian Empire", author: "Andrew J. Newman", year: "2006", url: "https://www.bloomsbury.com/us/safavid-iran-9781845111380/", type: "kitap" },
  { title: "Shah Ismail I - Encyclopaedia Britannica", year: "2024", url: "https://www.britannica.com/biography/Ismail-I-Safavid-shah-of-Iran", type: "ansiklopedi" },
  { title: "Abbas the Great - Encyclopaedia Britannica", year: "2024", url: "https://www.britannica.com/biography/Abbas-I-Safavid-shah-of-Iran", type: "ansiklopedi" },
  { title: "Shah Ismail I - Encyclopaedia Iranica", year: "2024", url: "https://www.iranicaonline.org/articles/ismail-i-safavi", type: "ansiklopedi" },
  { title: "Nadir Shah - Encyclopaedia Britannica", year: "2024", url: "https://www.britannica.com/biography/Nadir-Shah", type: "ansiklopedi" },
  { title: "The Sword of Persia: Nader Shah, from Tribal Warrior to Conquering Tyrant", author: "Michael Axworthy", year: "2006", url: "https://www.bloomsbury.com/us/sword-of-persia-9781845119829/", type: "kitap" },
  { title: "İran Tarihi", author: "Prof. Dr. Hasan-ı Rumlu", year: "16. yüzyıl", url: "https://www.iranicaonline.org/", type: "yazit" },
  { title: "İslam Ansiklopedisi - Safeviler", year: "2024", url: "https://islamansiklopedisi.org.tr/safeviler", type: "ansiklopedi" },

  // ─── Memlukler (1250 - 1517) ───
  { title: "The Mamluks in Egyptian Politics and Society", author: "Thomas Philipp", year: "1998", url: "https://www.cambridge.org/core/books/mamluks-in-egyptian-politics-and-society/", type: "kitap" },
  { title: "Baybars I of Egypt", author: "Peter Thorau", year: "1992", url: "https://www.britannica.com/biography/Baybars-I", type: "ansiklopedi" },
  { title: "Memluk Devleti - TDV İslam Ansiklopedisi", year: "2024", url: "https://islamansiklopedisi.org.tr/memluk-devleti", type: "ansiklopedi" },
  { title: "Ayn Celut Muharebesi - Encyclopaedia Britannica", year: "2024", url: "https://www.britannica.com/event/Battle-of-Ayn-Jalut", type: "ansiklopedi" },
  { title: "Mercidabık Muharebesi - TDV İslam Ansiklopedisi", year: "2024", url: "https://islamansiklopedisi.org.tr/mercidabik-muharebesi", type: "ansiklopedi" },
  { title: "The Mamluk Sultanate: A History", author: "Amalia Levanoni", year: "1995", url: "https://www.cambridge.org/core/books/", type: "kitap" },

  // ─── Türkiye Cumhuriyeti (1923 - günümüz) ───
  { title: "Atatürk: The Rebirth of a Nation", author: "Lord Kinross", year: "1964", url: "https://www.britannica.com/biography/Kemal-Ataturk", type: "ansiklopedi" },
  { title: "Nutuk - Tam Metin", author: "Mustafa Kemal Atatürk", year: "1927", url: "https://www.tbmm.gov.tr/anayasa/anayasa87.htm", type: "web" },

  // ─── Genel Kaynaklar ve Ansiklopediler ───
  { title: "Cambridge History of Early Inner Asia", author: "Denis Sinor", year: "1990", url: "https://www.cambridge.org/core/books/cambridge-history-of-early-inner-asia/", type: "kitap" },
  { title: "The History of the Medieval World", author: "Susan Wise Bauer", year: "2010", url: "https://www.wwnorton.com/books/9780393059755", type: "kitap" },
  { title: "Türk Tarih Kurumu Yayınları", year: "2024", url: "https://www.ttk.gov.tr/", type: "web" },
  { title: "Türkiye Diyanet Vakfı İslam Ansiklopedisi", year: "2024", url: "https://islamansiklopedisi.org.tr/", type: "ansiklopedi" },
  { title: "Encyclopaedia Britannica - Turkish History", year: "2024", url: "https://www.britannica.com/place/Turkey", type: "ansiklopedi" },
  { title: "Encyclopaedia Iranica", year: "2024", url: "https://www.iranicaonline.org/", type: "ansiklopedi" },
  { title: "The Oxford Handbook of Early Modern Southeast Asia", author: "Barbara Watson Andaya", year: "2013", url: "https://www.oxfordhandbooks.com/view/10.1093/oxfordhb/9780199925063.001.0001", type: "kitap" },
  { title: "Harvard University - Middle Eastern Studies", year: "2024", url: "https://www.harvard.edu/", type: "web" },
];
