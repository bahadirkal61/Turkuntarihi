export interface CultureTopic {
  id: string;
  title: string;
  icon: string;
  order: number;
  image: string;
  summary: string;
  content: string[];
  quote?: { text: string; source: string };
  sources?: string[];
}

export interface CultureCategory {
  id: string;
  title: string;
  description: string;
  topics: CultureTopic[];
}

export const cultureData: CultureCategory[] = [
  {
    id: "kut-ana",
    title: "Kut Nedir?",
    description:
      "Kut, Eski Türkçe'de 'mutluluk, uğur, devlet, baht, talih, saadet' anlamlarına gelen, Türk kültür ve siyaset felsefesinin temel taşıdır. Sıradan bir şans kavramı değildir. Yüce Tanrı'nın (Tengri) insanlara, özellikle hükümdarlara verdiği kutsal bir iktidar gücüdür.",
    topics: [
      {
        id: "kut-tanimi",
        title: "Kut'un Tanımı ve Anlamı",
        icon: "Crown",
        order: 1,
        image: "/images/gokturk-kaganligi.jpg",
        summary:
          "Kut, Tanrı'dan gelen kutsal iktidar gücüdür. Devlet, baht, talih, mutluluk ve ilahi lütuf anlamlarını taşır.",
        content: [
          "Kut, Eski Türkçe'de 'devlet, baht, talih, mutluluk, ilahi lütuf, saadet' gibi anlamlara gelir. Türk Dil Kurumu'na göre kut; devlet idaresinde kullanılmak üzere sahip olunan güç, mutluluk, ilahi bir kaynaktan gelen rahmet ve bereket anlamlarını taşır.",
          "",
          "Ancak kut, sıradan bir şans veya talih kavramı değildir. Yüce Tanrı'nın (Tengri/Gök Tengri) insanlara, özellikle hükümdarlara verdiği kutsal bir iktidar gücüdür. Kut sahibi kişi, toplumun lideri, koruyucusu ve hizmetkârı olur.",
          "",
          "Eski Türkçe'de 'kutadmak' (devlet yönetmek) fiilinin kökünden türemiş olan bu sözcük, Türk milletinin sahip olduğu en eski kültür terimlerinden biridir. Moğolca'da 'rıza, baht', Tunguzca'da ise benzer anlamlarda kullanılmıştır.",
          "",
          "Kut, Türk devlet geleneğinin binlerce yıllık temel direğidir. Hunlardan Osmanlı'ya kadar tüm Türk devletlerinde hükümdarın meşruiyet kaynağı olmuştur. Mo-tun (Mete Han)'ın unvanı 'Gök Tanrı'nın tahta çıkarttığı Tanrı Kut'u Tanhu' idi.",
        ],
        quote: {
          text: "Tanrı buyurduğu için, Kut'um olduğu için Kağan oldum.",
          source: "Bilge Kağan Yazıtı, Orhun Yazıtları (M.S. 732)",
        },
      },
      {
        id: "kut-tore-farki",
        title: "Kut ve Töre: İki Kutsal Kavram",
        icon: "Scale",
        order: 2,
        image: "/images/bozkurt.jpg",
        summary:
          "Kut, Tanrı'dan gelen iktidar yetkisidir. Töre ise o yetkinin kullanımını düzenleyen kurallar bütünüdür. Kut sınırsız değildir, Töre tarafından sınırlandırılır.",
        content: [
          "Türk devlet felsefesinde iki temel kavram vardır: Kut ve Töre. Bu iki kavram birbirini tamamlayan, birbirine bağlı ama farklı anlamlara gelen kutsal kurallardır.",
          "",
          "KUT, Tanrı'nın bağışıdır. Hükümdara yönetme yetkisinin verilmesidir. Devlet yönetme hakkıdır. Ancak bu yetki sınırsız değildir. Kut, Töre tarafından sınırlandırılmıştır.",
          "",
          "TÖRE ise devletin kuruluş ve işleyiş düzenini sağlayan kurallar bütünüdür. Asıl kutsal olan Töre'dir. Hükümdar Kut sahipliğini ancak Töreye bağlı kalarak tesis edebilir ve sürdürebilir.",
          "",
          "Kut'un tabiatı kararsızdır. O gelir, gider, dünyayı dolaşır, kendisine sabit bir yurt yoktur. Onu bir yerde tutacak olan alçakgönüllülüktür. Kut'un tabiatı yumuşaktır. Bütün bey ve büyüklere giden yol ondan geçer. O, her tünlü büyüklüğün kaynağıdır.",
          "",
          "Divan-ı Lügat-it Türk'te 'Zor Kapı'dan girerse Töre bacadan çıkar' denilmektedir. Türk toplumu için Töre o kadar önemlidir ki devletsiz olunur fakat Töresiz olunamaz.",
          "",
          "Töreye uymayan hükümdar, Gök Tanrı'ya ve halka karşı sorumluluklarını yerine getirmemiş olacağından kutunu ve meşruiyetini kaybeder. Kapgan Kağan'ın yerine geçen oğlu İnal Kağan, halkın refahını sağlayamadığı için töreye göre kutunun Tanrı tarafından kaldırıldığı inancıyla tahttan indirilmiştir.",
          "",
          "Kısacası: Kut, yetkidir. Töre ise o yetkinin nasıl kullanılacağını gösteren kurallardır. Kut olmadan iktidar olmaz, Töre olmadan meşru iktidar olmaz.",
        ],
        quote: {
          text: "Üstte gök çökmese, altta yer delinmese, Türk milleti, ilini töreni kim bozabilir?",
          source: "Bilge Kağan Yazıtı, Orhun Yazıtları",
        },
      },
      {
        id: "kut-veren",
        title: "Kut'u Kim Verir? Tanrı'dan Gelen İktidar",
        icon: "Sun",
        order: 3,
        image: "/images/hun-imparatorlugu.jpg",
        summary:
          "Kut, yalnızca Yüce Tanrı (Tengri) tarafından verilir. Hükümdar, Tanrı'nın yeryüzündeki temsilcisi olarak görülür.",
        content: [
          "Kut'un tek kaynağı Yüce Tanrı'dır (Gök Tengri). Hiçbir insan, hiçbir otorite kut veremez. Kut, Tanrı'nın dilediği kişiye, dilediği zamanda verdiği bir lütuf ve ihsandır.",
          "",
          "Türk Kaganı, adeta göğün, Tanrı'nın yeryüzündeki halifesi-temsilcisi gibidir. Attila'nın Avrupalılar tarafından 'Tanrı'nın Kılıcı' olarak görülmesi bu inancın bir yansımasıdır.",
          "",
          "Oğuz Kağan Destanı'nda Oğuz Han hem karizmatik bir şahsiyettir hem de hâkimiyeti ilâhî bir menşeden almıştır. Bu anlayış Orhun Abidelerine ve diğer kaynaklara da yansımıştır.",
          "",
          "Mete Han (Mo-tun)'ın unvanı 'Gök Tanrı'nın tahta çıkarttığı Tanrı Kut'u Tanhu' idi. Hsia Hun Devleti Tanhu'su He-lien Po Po (5. yüzyıl) 'Benim hükümdar olmam Tanrı tarafından kararlaştırıldı' demiştir.",
          "",
          "Göktürk Kağanları yazıtlarında: 'Tanrı buyurduğu için, Kut'um olduğu için Kağan oldum' şeklinde ifade etmişlerdir. Uygur hükümdarı Gazneli Sultan Mahmud'a 1027 yılında yazdığı mektupta: 'Göklerin sahibi Tanrı, yeryüzü ülkelerinin ve birçok kavmin hâkimiyetini bizlere verdi' diye başlamıştır.",
          "",
          "Bu ifadeler Türk hükümdarlarının Kut ve kısmetle donatıldığına inandıklarını göstermektedir. Hükümdar, ancak Tanrı'nın onaması ve desteği ile hükümdar olabiliyordu.",
        ],
        quote: {
          text: "Tanrı gibi gökte olmuş Türk bilge Kağan... Tanrı buyurduğu için, Kut'um olduğu için Kağan oldum.",
          source: "Bilge Kağan Yazıtı, Orhun Yazıtları (M.S. 732)",
        },
      },
      {
        id: "kut-erdemler",
        title: "Kut'u Koruyan Erdemler",
        icon: "Heart",
        order: 4,
        image: "/images/gokturk-kaganligi.jpg",
        summary:
          "Kut'un devamı için hükümdarın belli erdemleri taşıması gerekir. Adalet, cömertlik, cesaret, dürüstlük, alçakgönüllülük.",
        content: [
          "Kut'un korunması ve sürdürülmesi için hükümdarın belirli erdemleri taşıması gerekir. Kutadgu Bilig'de ve Orhun Yazıtları'nda bu erdemler ayrıntılı bir şekilde sıralanmıştır.",
          "",
          "1. ADALET: Kut'un en temel şartı adalettir. Hükümdar halkını adil kanunlarla idare etmeli, birinin diğerine tahakküme kalkışmasına meydan vermemelidir. 'Ey hâkim, memlekette uzun süre hüküm sürmek istersen, kanunu doğru yürütmeli ve halkı korumalısın' (Kutadgu Bilig, Beyit 2033).",
          "",
          "2. CÖMERTLİK: Hükümdar cömert olmalıdır. 'Beyler cömert olursa adları dünyaya yayılır; bunların nam ve şöhretleri ile dünya korunur' (Kutadgu Bilig, Beyit 2050). Cimrilik kut kaçırır.",
          "",
          "3. CESARET VE KAHRAMANLIK: Hükümdar en cesur birey olarak topluma liderlik etmelidir. 'Bey cesur, kahraman, kuvvetli ve pek yürekli olmalıdır' (Kutadgu Bilig, Beyit 1949). Bilge Kağan 20 savaş yapıp, 47 kere orduyu sefere göndermiştir.",
          "",
          "4. DÜRÜSTLÜK VE DOĞRULUK: 'Büyüklüğü ve halka baş olmak istersen, doğru yoldan şaşma' (Kutadgu Bilig, Beyit 1293). 'Biri yalan söylemek, ikincisi verilen sözden dönmektir. Üçüncüsü içkiyi sevmektir' (Kutadgu Bilig, Beyit 337-339).",
          "",
          "5. ALÇAKGÖNÜLLÜLÜK: 'Kut alçakgönüllü kişiye verilir. Kut güler yüzlü, tatlı dilli olanı sever, ona gider. Kut'un kendisi temizdir, temizlik arar, ancak saf olanı destekler. Kut adaletli olanı tercih eder, sıkı bir terbiyeden geçene Kut verilir.' (Kutadgu Bilig)",
          "",
          "6. SABIR: 'Hiçbir işte acele etme, sabret, kendini tut; kul sabırlı olursa beylik mertebesini bulur' (Kutadgu Bilig, Beyit 588).",
          "",
          "7. MERHAMET: Hükümdar merhametli olmalıdır. Güç kullanılarak alınan topraklar şiddet ve intikamla uzun yıllar süremez. 'Herhangi bir memleket kılıç ve kuvvetle alınabilir, fakat bu hâkimiyet şiddet ve intikam ile uzun yıllar sürmez' (Kutadgu Bilig, Beyit 2427).",
          "",
          "8. TATLI DİL: 'Hangi iş olursa olsun, sen onu tatlı dille karşıla; her işte tatlı dil kullanırsan mutluluk sana bağlanır' (Kutadgu Bilig, Beyit 1311).",
        ],
        quote: {
          text: "Kut alçakgönüllü, tatlı dilli, güler yüzlü ve adaletli kimselere gelir.",
          source: "Yusuf Has Hacip, Kutadgu Bilig (M.S. 1069)",
        },
      },
      {
        id: "kut-kayip",
        title: "Kut'un Kaybedilmesi",
        icon: "AlertTriangle",
        order: 5,
        image: "/images/bozkurt.jpg",
        summary:
          "Kut, Tanrı tarafından verilip yine Tanrı tarafından geri alınabilir. Zulüm, adaletsizlik, töreye aykırı davranış kutun kaybına yol açar.",
        content: [
          "Kut'un en temel özelliği, Tanrı tarafından verilip yine Tanrı tarafından geri alınabilmesidir. Bu, Türk hükümdarlık anlayışında sınırsız bir iktidar olmadığını gösterir.",
          "",
          "Kut'un kaybolmasına yol açan sebepler açıkça belirtilmiştir: Bilgisizlik, kabalık, zorbalık, halka kötü davranmak, töreye aykırı hareket etmek, halkı doyurmamak, giydirmemek, huzura kavuşturmamak.",
          "",
          "Bilge Kağan Yazıtı'nda Türk milletinin Çin esaretine düşmesinin nedeni olarak 'töreye uymadıklarından dolayı onlardan kutun geri alınması' gösterilir:",
          "",
          "'Kardeşler ağabeyleri, oğullar babaları gibi yaratılmadığından, akılsız Kağanlar iş başına gelmiş, yardımcı olarak da akılsız komutanları seçtiklerinden, düzenin bozulmasına neden olmuşlardır.'",
          "",
          "Kutadgu Bilig'de de bu konu sıkça vurgulanır: 'Kendisini gözetmeli, aşırılığa gitmemeli; kötü ve çirkin işlere yaklaşmamalıdır. Toplanmış olan malı yerine sarf etmeli; hayatını, işini, tavır ve hareketini düzenlemelidir. Eli ve dili ile oyuna karışmamalı; tavır ve hareketlerinde dürüst olmalıdır.'",
          "",
          "Türk tarihinde töreye uymayan hükümdarlar tahttan indirilmiştir. İnal Kağan halkın refahını sağlayamadığı için töreye göre kutunun Tanrı tarafından kaldırıldığı inancıyla tahttan indirilmiştir.",
          "",
          "Bu anlayış, hükümdarın denetlenebilir bir iktidar anlayışının en erken örneğidir. Modern devlet teorisinde kuvvetler ayrılığı marifetiyle tesis edilmeye çalışılan denetlenebilir devlet anlayışının kökleri, Kut ve Töre felsefesine dayanır.",
        ],
        quote: {
          text: "Kardeşler ağabeyleri, oğullar babaları gibi yaratılmadığından, akılsız Kağanlar iş başına gelmiş... düzenin bozulmasına neden olmuşlardır.",
          source: "Bilge Kağan Yazıtı, Orhun Yazıtları",
        },
      },
    ],
  },
  {
    id: "kut-semboller",
    title: "Kut'un Sembolleri ve Ritüelleri",
    description:
      "Kut kavramı, Türk kültüründe çeşitli ritüel ve sembollerle somutlaştırılmıştır. Kut-uz tuğ, nevbet, cülus töreni, toy ve şamanik ayinler kutun varlığını gösteren önemli unsurlardır.",
    topics: [
      {
        id: "kut-uz-tug",
        title: "Kut-uz Tuğ: Kutsal Hâkimiyet Sancağı",
        icon: "Flag",
        order: 1,
        image: "/images/iskit-saka.jpg",
        summary:
          "At kuyruğundan yapılan kutsal tuğ, hükümdarın kut sahibi olduğunu gösteren en önemli semboldür.",
        content: [
          "Kut-uz tuğ (kotuz, hotuz), Türk devletlerinin en önemli hâkimiyet sembolüdür. Tepesine at kuyruğu bağlanmış, ucuna altın yaldızlı top geçirilmiş, mızrak türünden bir alâmettir.",
          "",
          "İlk örneklerinde kutsal sayılan uzun tüylü yak öküzünün kuyruğundan (kut-uz) yapılırdı. 'Ruh yani kut barındıran' anlamına gelen kut-uz kelimesiyle anılan bu hayvan, Türk mitolojisinde hayvan-atalar grubunda yer almış ve kutsal sayılmıştır.",
          "",
          "Sonraki dönemlerde at kuyruğu kullanılmıştır. At, şamanı gökyüzüne taşıyan binek hayvanı niteliğiyle kutsal bir hayvandır. Bu sebeple kuyruk ve perçem kılları da kutsal sayılmıştır.",
          "",
          "Kaşgarlı Mahmud'un sözlüğünde tuğ, davul (kös) ve bayrak aynı anlama gelmekte ve bağımsızlık alâmeti kabul edilmektedir. 'Dokuz tuğluk han' ifadesinden hanların dokuz tuğu olduğu anlaşılmaktadır.",
          "",
          "Kutadgu Bilig'de: 'Gök gürledi, vurdu nevbet tuğu, şimşek çaktı, hakanın tuğunu çekti' denir. Davul, tuğ ve bayrak bir bütünün parçaları şeklinde bağımsızlığı belirtir.",
          "",
          "Osmanlı döneminde mehter takımının büyüklüğü tuğların sayısına bağlıdır: Bir, üç, beş, yedi, dokuz kat mehter. Dokuz ve yedi kat mehterlere 'mehterhâne-yi hâkânî' denir.",
        ],
        sources: ["TDV İslam Ansiklopedisi - Tuğ Maddesi", "Ogel 1971:143"],
      },
      {
        id: "nevbet",
        title: "Nevbet: Kut'un Sesle İlanı",
        icon: "Volume2",
        order: 2,
        image: "/images/hun-imparatorlugu.jpg",
        summary:
          "Nevbet (davul çalma), kutun varlığını ilan eden askeri bir ritüeldir. Mehter müziği bu geleneğin devamıdır.",
        content: [
          "Nevbet, kutun varlığını ilan eden, toplanma ve birlik olmaya çağıran davul ritüelidir. Türk kültüründe davul (kös/tabl) ile tuğ arasında tarih boyunca hamasî bir bağ kurulmuştur.",
          "",
          "Semerkant/Efrâsiyâb sarayı duvar resimlerinde (VI-VIII. yüzyıl, Göktürkler'e ait), ortadaki hükümdarın al bayrağı olmak üzere dikilmiş on bir tuğun önünde boynuzlu maskelerle süslenmiş davulların durduğu görülür.",
          "",
          "Nevbet, günümüzde mehter müziği geleneğinin devamıdır. Mehter takımı hem askeri hem de kut ilan etme işlevi görürdü. Mehterin çalması, devletin varlığının ve hükümdarın kudretinin sembolüydü.",
          "",
          "Kutadgu Bilig'de: 'Gök gürledi, vurdu nevbet tuğu, şimşek çaktı, hakanın tuğunu çekti.' Burada toplanma ve birlik olmaya çağıran nevbet, kutun varlığının ilanıdır.",
        ],
      },
      {
        id: "culus-toreni",
        title: "Cülus Töreni: Hükümdarın Kutunu Kabulü",
        icon: "Crown",
        order: 3,
        image: "/images/gokturk-kaganligi.jpg",
        summary:
          "Cülus, hükümdarın tahta çıkmasıdır. Eski Türklerde keçe üstüne oturtulan hakanın dokuz kere indirilip kaldırılmasıyla kutlanırdı.",
        content: [
          "Cülus (Arapça: oturmak), hükümdarın tahta çıkması anlamına gelir. Türk tarihinde cülus, kutun yeni hükümdara geçişini sembolize eden önemli bir merasimdir.",
          "",
          "İslamiyet'ten önceki Türk tarihinde, keçe üstüne oturtulan hakanın dokuz kere indirilip kaldırılmasıyla kutlanırdı. Bu, kutun Tanrı'dan geldiğini ve hükümdarın o kutla tahta çıktığını sembolize ederdi.",
          "",
          "Anadolu Selçuklularında hükümdar vezir ve ileri gelenler tarafından koltuklarına girilerek tahta oturtulur, daha sonra biat edilirdi.",
          "",
          "Osmanlı'da yeni padişah, müneccimbaşı tarafından belirlenen eşref-i saatte tahta oturtulurdu. Biat merasimi düzenlenir, hutbe yeni padişah adına okunur, sikke onun adına kesilirdi. Cülus, yeni hükümdarın kutunu kabul ettiği andı.",
          "",
          "Cülustan sonra yeni padişahın Eyüpsultan'a giderek beline kılıç kuşanması, atalarının mezarlarını ziyaret etmesi âdetti. Bu, kutun soy bağıyla da devam ettiğinin göstergesiydi.",
        ],
      },
      {
        id: "toy",
        title: "Toy: Kut'un Halkla Paylaşımı",
        icon: "Users",
        order: 4,
        image: "/images/bozkurt.jpg",
        summary:
          "Toy (şölen), hükümdarın kutunu halkla paylaştığı, zaferlerin kutlandığı, birlik ve beraberliğin pekiştirildiği törendir.",
        content: [
          "Toy, Türk kültüründe hükümdarın kutunu halkla paylaştığı şölendir. Savaş zaferlerinden sonra, cülustan sonra, baharın gelişinde (Nevruz) ve özel günlerde düzenlenirdi.",
          "",
          "Toylarda kimiz ikram edilir, at yarışları, okçuluk, güreş gibi sportif faaliyetler yapılırdı. Bu törenler hem kutun ilanı hem de halkın moralinin yüksek tutulması için önemliydi.",
          "",
          "Nevruz şenlikleri aslında birer toydur. Timur'un oğlu Şahruh, 1447 yılı Mart ayında ölümünden birkaç gün önce, Nevruz dolayısıyla Rey'de toy düzenlemiştir.",
          "",
          "Toylar aynı zamanda kurultayların da bir parçasıydı. Kurultayda alınan kararlar, toylarla halka duyurulur ve kutun devamı için halkın duası istenirdi.",
          "",
          "'Halkın duası, kutun devamı içindir' anlayışı, hükümdarın halka hizmet etme sorumluluğunu ve halkın da bu hizmeti takdir etmesi gerektiğini gösterir.",
        ],
      },
    ],
  },
  {
    id: "kut-varliklar",
    title: "Kut Veren Kutsal Varlıklar",
    description:
      "Türk mitolojisinde kut veren çeşitli kutsal varlıklar vardır. Kidır (Hızır), Umay (İm), Ayzıt ruhları gibi varlıklar insanlara kut, bereket ve koruma sağlar.",
    topics: [
      {
        id: "kidir",
        title: "Kidır (Hızır): Kut İyesi",
        icon: "Wind",
        order: 1,
        image: "/images/bozkurt.jpg",
        summary:
          "Kidır, sürekli dolaşan, kalbi temiz insanlara yardım eden, onları kutlu kılan kutsal bir varlıktır.",
        content: [
          "Kidır (Kudır), Türk inanç sisteminde Kut iyesi olarak bilinen kutsal bir varlıktır. Altay, Kazak, Kırgız, Karakalpak, Doğu Türkistan Türkleri'nde sürekli halk arasında gezen, kalbi temiz insanlara yardım eden, onları destekleyen, çeşitli kötülüklerden koruyan varlıktır.",
          "",
          "Kidır kelimesi, Altay, Kazak ve Kırgız Türkçesi'nde 'gezmek, seyahat etmek' anlamına gelen 'kidıruv' kelimesinden türemiştir. Kidır sürekli hareket halindedir, her an her yerde görünebilir.",
          "",
          "Kidır'in sevdiği insan kutlu kılınır, şansı artar, işi rast gider. Kazak Türkleri arasında: 'Tanrı koldasın, Kidır ondasın', 'Kuday jarılgasin, Kidır esirgesin', 'Kidır darısın, bak kalasın' gibi dualar yaygındır.",
          "",
          "Kidır özellikle Ramazan ayı, Nevruz, Sabantoy gibi özel günlerde görülür. Şöyle denilir: 'Kimisi zaman turgay kuşu, kimisi zaman bödene kuşu şeklinde görülür.'",
          "",
          "Türk toplumunun İslamiyet'i kabul etmesiyle birlikte Kidır, Orta Doğu kültürlerindeki Hızır'a dönüşmüştür. Türkiye'de Hıdrellez kutlamalarının yapıldığı Hidürlük/Hidürlük Tepesi gibi yer adlarının sadece Hızır kelimesiyle izah olunamayacağı, 'kidıruv' kelimesinin Doğu Türk sahasından Batı Türk sahasına taşınmış olabileceği düşünülmektedir.",
        ],
      },
      {
        id: "umay",
        title: "Umay Ana (İm): Bereket ve Koruma Tanrıçası",
        icon: "Sparkles",
        order: 2,
        image: "/images/iskit-saka.jpg",
        summary:
          "Umay Ana, doğurganlığın, bereketin, talihin ve korumanın sembolüdür. Türk mitolojisinin en önemli dişi figürlerinden biridir.",
        content: [
          "Umay Ana (İm, Hümay), Türk mitolojisinde doğurganlık, bereket, çoğalma, koruma ve talih tanrıçasıdır. Moğolca'da 'rahim', Tunguzca'da 'Omo-umo' (yumurtlamak) kökünden türemiştir.",
          "",
          "Umay Ana'nın mekanı göğün üçüncü veya dördüncü katındadır. Bu katta Süt Ak Göl bulunur. Umay Ana bu gölden aldığı bir damlayı hüma kuşuna bürünerek yeryüzüne indirir. Bu damla 'kut' anlayışını temsil eder. 'Başına devlet kuşu konmak' deyimi buradan gelir.",
          "",
          "Umay Ana, beyaz elbiseli, gümüşten saçları olan, üç boynuzlu, kuş kılığında veya kuğu/at ile betimlenir. Güneş ve dişildir. Çocukları korur, yeryüzüne bereket dağıtır, etrafına ışık saçar.",
          "",
          "Ayzıt (Ayısıt) ruhları, dağınık halde bulunan hayat unsurlarını toplayıp birleştirerek 'kut' yaparlar ve bunu ana karnındaki çocuğa üfleyerek can verirler. Gebe kadınlar daima bu ruhların himayesi altındadır.",
          "",
          "Kül Tigin Yazıtı'nda 'Umay teg ögüm katun' (Umay gibi annem Hatun) ifadesi geçmektedir. Bu ifade, kağanların ve hatunların Umay Ana'dan kut aldıklarını gösterir.",
          "",
          "Umay Ana'nın zarar veren yönü Kara Umay (Alkarısı/Albastı) olarak bilinir. Yeni doğum yapan kadınların ve çocukların düşmanıdır.",
          "",
          "Hüma Kuşu (Humay), Batı Türk sahasında Umay Ana ile özdeşleşmiştir. Doğurganlığın, üremenin sembolü olarak görülür. Genç kız, gelin ve çocukların koruyucu ruhudur. Üzerinden geçtiği kimselere zenginlik ve mutluluk getireceğine inanılır.",
        ],
        quote: {
          text: "Umay teg ögüm katun... (Umay gibi annem Hatun)",
          source: "Kül Tigin Yazıtı, Orhun Yazıtları (M.S. 732)",
        },
      },
      {
        id: "yayik",
        title: "Yayik: Semavi Koruyucu Ruh",
        icon: "Cloud",
        order: 3,
        image: "/images/gokturk-kaganligi.jpg",
        summary:
          "Yayik, Ulgen tarafından yeryüzüne gönderilen, kötülüklerden koruyan, hayat veren semavi bir ruhtur.",
        content: [
          "Yayik, Altay Türkleri tarafından en çok saygı duyulan ruh/arınemedir. Abdulkadir İnan'a göre Yayik, vasitacı ruh ve Ulgen'in vücudundan bir parça, semavi bir ruhtur. Ulgen onu yeryüzüne, insanlar arasına, onları kötülüklerden korumak ve hayat vermek için görevlendirip göndermiştir.",
          "",
          "Altay Türkleri'nde ilkbahar mevsiminde koyun ve/veya kısrak sütü sağılarak bulgurla karıştırılıp lapa yapılır. Yapılan bu lapa, Tengri Yayik'a adanmış saçı olarak yere saçılır. Bu törene 'yayik kaldırma' denir. Maksat lütuf ve ihsan temenni etmektir.",
          "",
          "Yayik ve Kidır benzer işlevler görürler. Her ikisi de halk arasında dolaşan, kalbi temiz insanlara yardım eden, onları kutlu kılan varlıklardır.",
        ],
      },
    ],
  },
  {
    id: "kut-metinler",
    title: "Kut Tarih Boyunca",
    description:
      "Kut anlayışı Orhun Yazıtları'ndan Kutadgu Bilig'e, İslam öncesi dönemden Osmanlı'ya kadar binlerce yıl Türk siyaset felsefesinin merkezinde yer almıştır.",
    topics: [
      {
        id: "kut-orhun",
        title: "Orhun Yazıtları'nda Kut",
        icon: "Scroll",
        order: 1,
        image: "/images/gokturk-kaganligi.jpg",
        summary:
          "Orhun Yazıtları, kut anlayışının en eski ve en detaylı kaynaklarıdır. Bilge Kağan, kutun verilmesi, korunması ve kaybedilmesi üzerine düşünceleriyle tanınır.",
        content: [
          "Orhun Yazıtları (M.S. 732), kut anlayışının en eski ve en detaylı yazılı kaynaklarıdır. Bilge Kağan, Kül Tigin ve Tonyukuk yazıtlarında kut kavramı sıkça geçer.",
          "",
          "Bilge Kağan Yazıtı'nda kutun Tanrı tarafından verildiği vurgulanır: 'Tanrı güç (kut) verdiği için Türk askerleri kurt gibi ve düşman askerleri koyun gibi idi.'",
          "",
          "Bilge Kağan, halkı için çalıştığını dile getirir: 'Sizin için dağda kuş avlayıp yoruldum, yoruldum! Halk için ağardım, karardım! Aç milleti tok, az milleti çok, yoksul milleti zengin kıldım.'",
          "",
          "Kutun kaybedilmesi de aynı yazıtlarda anlatılır: 'Kardeşler ağabeyleri, oğullar babaları gibi yaratılmadığından, akılsız Kağanlar iş başına gelmiş, yardımcı olarak da akılsız komutanları seçtiklerinden, düzenin bozulmasına neden olmuşlardır.'",
          "",
          "Kül Tigin Yazıtı'nda 'Umay teg ögüm katun' (Umay gibi annem Hatun) ifadesi geçer. Tonyukuk Yazıtları'nda ise kutun hizmet ve başarıyla kazanıldığı belirtilir.",
          "",
          "Orhun Yazıtları aynı zamanda vasiyetname niteliğindedir. Bilge Kağan'ın her fırsatta halkı için yaptıklarını dile getiren mesajları, halk merkezli bir liderlik anlayışının en eski örneklerindendir.",
        ],
        quote: {
          text: "Ey Türk milleti! Öldüm, ey Türk milleti! Ey Türk beyleri! Ey Türk halkı! İşittiğinizde ağlayınız! Öğrendiğinizde gözünüz yaşarsın!",
          source: "Bilge Kağan Yazıtı, Orhun Yazıtları",
        },
      },
      {
        id: "kut-kutadgu",
        title: "Kutadgu Bilig'de Kut Felsefesi",
        icon: "BookOpen",
        order: 2,
        image: "/images/hun-imparatorlugu.jpg",
        summary:
          "Kutadgu Bilig (M.S. 1069), Yusuf Has Hacip tarafından yazılmış, kut ve töre ilişkisini sistematik olarak anlatan başyapıttır.",
        content: [
          "Kutadgu Bilig (1069), Yusuf Has Hacip tarafından kaleme alınmış, Türk-İslam devlet felsefesini en güzel yansıtan eserdir. Yusuf Has Hacip, kut ve töre ilişkisini, hükümdarlık ahlakını ve kutun erdemlerle korunmasını sistematik olarak anlatır.",
          "",
          "Eserde dört sembolik karakter vardır: Kün Togdı (hükümdar), Ay Toldı (vezir), Ögdilmiş (bilge) ve Odgurmuş (derviş). Bu dört karakter dört temel ilkeyi temsil eder: doğruluk, saadet, akıl ve kanaat.",
          "",
          "Kut ile ilgili önemli beyitler: 'Bu beylik mesnedine sen isteyerek gelmedin; onu Tanrı kendi fazlı ile sana ihsan etti.' (Beyit 5469)",
          "",
          "'Tanrı kimi bey olarak yaratmak isterse ona önce münasip tavır ve hareket ile akıl ve kol kanat verir.' (Beyit 1934)",
          "",
          "'Tanrı seni doğruluk için bu mevkiye getirdi; haydi doğru ol ve doğruluk ile yaşa. Her işi akıl ile, nefsinin esiri olma, gönlünü diri tut.' (Beyit 5195-96)",
          "",
          "Kutadgu Bilig'de devlet yönetimi demokratik, sosyal ve laik özellikler taşır. Hükümdarın yetkisi sonsuz değildir. Liyakat esastır: 'Ey bey, işi işin ehline, işe yarayana ver.' (Beyit 1759)",
          "",
          "Halkın hükümdardan üç temel beklentisi vardır: 1) Devlet parasının değerinin korunması (ekonomik istikrar), 2) Adil hukuk düzeni, 3) Emin yollar (asayiş). Hükümdarın da halktan üç beklentisi vardır: itaat, vergi ve dostluk.",
        ],
        quote: {
          text: "Tanrı kimi bey olarak yaratmak isterse ona önce akıl ve kol kanat verir.",
          source: "Yusuf Has Hacip, Kutadgu Bilig, Beyit 1934",
        },
      },
      {
        id: "kut-islam-sonrasi",
        title: "İslam Döneminde Kut Anlayışı",
        icon: "Moon",
        order: 3,
        image: "/images/bozkurt.jpg",
        summary:
          "Türkler İslamiyet'i kabul ettikten sonra kut kavramı Allah'ın takdiri ve nasibi olarak yorumlandı. Kutlu olmak İslami bir anlam kazandı.",
        content: [
          "Türkler İslamiyet'i kabul ettikten sonra kut kavramı yeniden yorumlandı. Kut, 'Allah'ın takdiri ve nasibi' olarak anlaşılmaya başlandı. 'Kutlu olmak' İslami bir anlam kazandı.",
          "",
          "İslam öncesi dönemdeki 'Tanrı'dan (Gök Tengri'den) gelen iktidar' anlayışı, 'Allah tarafından verilen hilafet ve hükümranlık' şeklinde devam etti. Ancak kutun töre ile sınırlandırılması geleneği de devam etti.",
          "",
          "Kutadgu Bilig, İslam sonrası dönemin kut anlayışını en iyi yansıtan eserdir. Yusuf Has Hacip, din ve devlet işlerini birbirinden ayıran, laik bir devlet anlayışı çizmiştir.",
          "",
          "Odgurmuş ile hükümdarın konuşmalarında: 'Dinin dünyayla birleştirilmesi güçtür; bu ikisi bir araya gelmez. Biri yaklaşırsa diğeri kaçar.' (Beyit 5312-13). Bu, din ve devletin ayrı alanlar olduğunu gösterir.",
          "",
          "İslam sonrası dönemde kut anlayışı, Türk Cihan Hâkimiyeti Mefkûresi ile birleşti. Güneşin doğduğu yerden battığı yere kadar her yeri adalet ve saadetle yönetme ideali, kut felsefesinin devamıdır.",
        ],
      },
      {
        id: "kut-osmanli",
        title: "Osmanlı'da Kut Geleneği",
        icon: "Landmark",
        order: 4,
        image: "/images/gokturk-kaganligi.jpg",
        summary:
          "Osmanlı padişahları 'kutlu padişah' unvanını kullandı. Cülus törenleri, kutun yeni hükümdara geçişini sembolize eden ritüellerle yapıldı.",
        content: [
          "Osmanlı padişahları, 'kutlu padişah' unvanını kullanmışlardır. Cülus törenleri, kutun yeni hükümdara geçişini sembolize eden ritüellerle yapılmıştır.",
          "",
          "Yeni padişah, müneccimbaşı tarafından belirlenen eşref-i saatte tahta oturtulurdu. Biat merasimi, kılıç kuşanma, hutbenin yeni padişah adına okunması, sikkenin onun adına kesilmesi - bunların hepsi kutun yeni hükümdara geçişinin sembolleriydi.",
          "",
          "Osmanlı'da Fatih Sultan Mehmed'in ünlü teşkilat kanunnamesi, hanedan mensupları arasındaki mücadeleye netlik getirmeyerek çözümü kabiliyete bırakmıştır. Bu, eski Türk geleneğindeki kut inancının bir yansımasıdır - Tanrı (Allah) en layık olanı seçer.",
          "",
          "Nevruz, Osmanlı'da resmi bayram olarak kutlanırdı. Müneccimbaşının yeni yıl takvimini padişaha sunması, hekimbaşının Nevruziye macunu takdimi, Nevruz bahşişleri - bunların hepsi kut geleneğinin devamıydı.",
          "",
          "Yeniçeri Ocağı'nın kaldırılmasından sonra Nevruz kutlamaları resmi niteliğini yitirmiş olsa da, halk arasında yüzyılların birikimi olan gelenekler sürdürülmüştür.",
        ],
      },
      {
        id: "kut-modern",
        title: "Kut'un Günümüzdeki İzleri",
        icon: "Sparkles",
        order: 5,
        image: "/images/iskit-saka.jpg",
        summary:
          "'Kutlu olsun', 'kutlama', 'uğur getirsin', 'kutlu gün' gibi ifadeler binlerce yıllık kut inancının dilimizdeki izleridir.",
        content: [
          "Günümüzde 'kutlu olsun', 'kutlama', 'uğur getirsin', 'kutlu gün', 'bahtın açık olsun', 'talihin açık olsun' gibi ifadeler, binlerce yıllık kut inancının Türk dilindeki izleridir.",
          "",
          "NEVRUZ, kut geleneğinin günümüze en canlı yansımasıdır. 21 Mart'ta kutlanan Nevruz, Türk dünyasının 'ulusun ulu günü'dür. Ergenekon Destanı'ndan bu yana Türklerin birlik ve beraberlik günüdür.",
          "",
          "Hıdrellez (6 Mayıs), Kidır-Hızır geleneğinin devamıdır. 'Hıdrellez'de dilek dilenir, kapı ardına ad yazılır. Bu, kut iyesi Kidır'dan bereket ve uğur dilemenin modern şeklidir.",
          "",
          "MEHTER müziği, nevbet geleneğinin devamıdır. Mehterin çalması, kutun varlığını ilan eden ritüelin modern şeklidir.",
          "",
          "Cumhuriyet döneminde Cumhurbaşkanı'nın yemin töreni, halkın cumhurbaşkanına biat etmesi, TBMM'nin açılışı - bunların hepsi eski Türk geleneğindeki kut ve töre anlayışının modern yansımalarıdır.",
          "",
          "Türk devlet geleneğinde hükümdarların (ve bugünkü devlet başkanlarının) halka hizmet sorumluluğu, kut felsefesinin modern devlet anlayışına en önemli katkısıdır. Devletin temelinin hukuk ve adalet üzerine kurulması, Töre geleneğinin devamıdır.",
          "",
          "Bugün Türkçe'de kullandığımız 'kut' kökü, 'kutlu', 'kutlama', 'kutlamak', 'kutsal', 'kutsamak' gibi kelimeler, bu binlerce yıllık inancın dilimizde yaşayan mirasıdır.",
        ],
      },
    ],
  },
];

export const getTopicById = (id: string): CultureTopic | undefined => {
  for (const cat of cultureData) {
    const topic = cat.topics.find((t) => t.id === id);
    if (topic) return topic;
  }
  return undefined;
};

export const getAllTopics = (): CultureTopic[] => {
  return cultureData.flatMap((cat) => cat.topics).sort((a, b) => {
    // Sort by category order, then topic order
    const catA = cultureData.findIndex((c) => c.topics.includes(a));
    const catB = cultureData.findIndex((c) => c.topics.includes(b));
    if (catA !== catB) return catA - catB;
    return a.order - b.order;
  });
};
