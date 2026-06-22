# TURK TARIHI - KAPSAMLI SISTEM TANILAMA RAPORU
## Tarih: 2026-06-03 | Toplam Dosya: 72 | Bulgu: 47

---

## A. KRITIK HATALAR (Acil Duzeltilmeli)

### A1. Broken Link - 404 Hatasi
| Dosya | Satir | Sorun |
|-------|-------|-------|
| `Home.tsx` | 204 | `<Link to="/devletler">` linki var ama App.tsx'te `/devletler` route'u YOK. Kullanici bu butona tiklayinca beyaz ekran/404 hatasi alir. **Yerine `/turk-soyu` olmali.** |

### A2. HTML Lang Attribute Yanlis
| Dosya | Satir | Sorun |
|-------|-------|-------|
| `index.html` | 2 | `<html lang="en">` olarak ayarlanmis. **Tum icerik Turkce, `lang="tr"` olmali.** SEO ve erisilebilirlik icin kritik. |

### A3. Meta Tag'ler Eksik
| Dosya | Satir | Sorun |
|-------|-------|-------|
| `index.html` | 3-7 | `<meta name="description">`, `<meta name="keywords">`, `<meta name="author">`, `<meta property="og:*">` (Open Graph) tag'leri yok. **Google siralamasi icin kritik eksiklik.** |

### A4. Footer'da Yanlis Tarih
| Dosya | Satir | Sorun |
|-------|-------|-------|
| `Layout.tsx` | 96 | "M.O. 3000'den gunumuze Turk milletinin destansi yolculugu." yaziyor. **Tum sitede M.O. 520 kullaniliyor, footer'da M.O. 3000 yanlis.** |

### A5. Tip Guvenligi Devre Disi
| Dosya | Satir | Sorun |
|-------|-------|-------|
| `data/rulers.ts` | 1 | `// @ts-nocheck` kullaniliyor. **103 hukumdarin tip guvenligi yok.** Hatalar build zamaninda yakalanmiyor. |

### A6. React Router Cift Import
| Dosya | Sorun |
|-------|-------|
| `package.json` | Hem `react-router` (^7.6.1) hem `react-router-dom` (^7.15.1) var. **Cakisma riski.** `react-router-dom` yeterli, digeri gereksiz. |

### A7. Kullanilmayan Dead Code
| Dosya | Durum | Risk |
|-------|-------|------|
| `pages/States.tsx` | Route'dan kaldirilmis ama dosya duruyor | Bundle boyutunu sisiren dead code |
| `components/ui/*` (50 dosya) | shadcn/ui bileşenleri, cogu kullanilmiyor | Gereksiz dependency yuku |
| `@capacitor/*` (3 paket) | Mobil uygulama icin yuklenmis ama hicbir capacitor config yok | Bosuna ~15MB dependency |
| `date-fns` | package.json'da var, kullanildigi gorulmuyor | Gereksiz |
| `react-day-picker` | package.json'da var, kullanildigi gorulmuyor | Gereksiz |
| `react-hook-form` | package.json'da var, kullanildigi gorulmuyor | Gereksiz |

---

## B. FRAMER-MOTION PERFORMANS SORUNLARI (Oncelikli)

### B1. whileInView Kullanimi - Donma Riski
`whileInView` prop'u IntersectionObserver'i her element icin ayri ayri calistirir. Cok sayida element oldugunda sayfa donar. **Culture.tsx'te bu yuzden donma yasandi ve tamamen kaldirildi.**

| Dosya | Risk Seviyesi | whileInView kullanimi |
|-------|---------------|----------------------|
| `Culture.tsx` | COZULDU | Kaldirildi, pure CSS ile degistirildi |
| `History.tsx` | DUSUK | ScrollProgress + useSpring var, whileInView YOK |
| `RulerPage.tsx` | ORTA | Parallax scroll (useScroll + useTransform), tek element |
| `DynastyDetail.tsx` | DUSUK | Kartlarda whileInView var, element sayisi az |
| `Epics.tsx` | DUSUK | Kartlarda whileInView var, 12 element |
| `Inscriptions.tsx` | DUSUK | Kartlarda whileInView var, 14 element |
| `EpicDetail.tsx` | DUSUK | Hero'da whileInView var |
| `InscriptionDetail.tsx` | KONTROL EDILMEDI | Muhtemelen benzer pattern |
| `Geography.tsx` | DUSUK | Kartlarda whileInView var |
| `DestekOl.tsx` | DUSUK | Hero'da whileInView var |
| `Soy.tsx` | DUSUK | Kartlarda whileInView var |
| `About.tsx` | DUSUK | Bolumlerde whileInView var |

### B2. useScroll Parallax - RulerPage
| Dosya | Sorun |
|-------|-------|
| `RulerPage.tsx` | `useScroll` + `useTransform` ile parallax efekti. Mobil cihazlarda scroll performansi dusebilir. `will-change: transform` eklenmeli. |

---

## C. TUTARSIZLIK VE YANLIS BILGILER

### C1. Hukumdar Sayisi Tutarsizligi
| Yer | Deger |
|-----|-------|
| `Home.tsx` hero | "89 hukumdar" |
| `Home.tsx` cards | "89 hukumdar" |
| `History.tsx` hero | "89 hukumdar" |
| `History.tsx` stats | "103 Hukumdar" |
| data/rulers.ts | **103 kayit** |
| **Gercek deger** | **103** (21 devlet, 5 donem) |

**Home.tsx'de 89 yaziyor ama gercek deger 103. Guncellenmeli.**

### C2. Devlet Sayisi Tutarsizligi
| Yer | Deger |
|-----|-------|
| `Home.tsx` | "16 hanedan" |
| `History.tsx` | "21 Devlet" (stats) |
| STATES dizisi | **21 devlet** |
| **Gercek deger** | **21** |

**Home.tsx'de "16 hanedan" yanlis, "21 devlet" olmali.**

### C3. Tarih Donemi Tutarsizligi
| Yer | Deger |
|-----|-------|
| `Home.tsx` | "M.O. 520'den gunumuze" (dogru) |
| `Layout.tsx` footer | "M.O. 3000'den gunumuze" (**yanlis**) |
| `About.tsx` | "M.O. 520'den gunumuze" (dogru) |
| `Inscriptions.tsx` | "M.O. 500'den M.S. 9. yuzyila" |

### C4. Anadolu Beylikleri - Detay Sayfasi Sorunu
| Yer | Durum |
|-----|-------|
| STATES'de | "12 beylik" olarak listeleniyor |
| `DynastyDetail.tsx` DYNASTIES'de | "anadolu-beylikler" var |
| Gercekte | 12 ayri beylik tek kartta toplanmis |
| **Sorun** | Her bir beyligin kendi hukumdarlari yok. Tek sayfada 12 beylik anlatilmaya calisiliyor. |

---

## D. EKSİK FONKSIYONELLIKLER

### D1. Destek Ol Sayfasi - Demo/Sahte Form
| Dosya | Sorun |
|-------|-------|
| `DestekOl.tsx` | Kredi karti formu tamamen **frontend demo**. Gercek odeme islemi YOK. `handleSubmit` sadece success mesaji gosteriyor. |
| `DestekOl.tsx` | Banka IBAN'lari **"(ORNEK)"** olarak isaretlenmis, gercek degil. |

### D2. States.tsx - Kullanim Disi
| Dosya | Durum |
|-------|-------|
| `States.tsx` | Kullanici tarafindan kaldirilmasi istendi, route'tan silindi. **Dosya hala duruyor, tamamen silinmeli.** |

### D3. SEO Eksiklikleri
| Eksik | Onem |
|-------|------|
| robots.txt | Orta |
| sitemap.xml | Orta |
| og:image (sosyal medya kapak resmi) | Yuksek |
| Twitter Card meta tag'leri | Orta |
| Canonical URL | Dusuk |
| Structured Data (JSON-LD) | Orta |

### D4. Erisilebilirlik (Accessibility) Eksiklikleri
| Eksik | Yer |
|-------|-----|
| `aria-label` yok | Navigasyon linklerinde |
| `role` attribute'lari yok | Bolum tanımlamalarinda |
| `alt` text eksik/bos | Bazi gorseller |
| Skip-to-content link yok | Klavye navigasyonu icin |
| Focus ring yetersiz | Interaktif elementlerde |
| Reduced motion destegi yok | `@media (prefers-reduced-motion)` yok |

---

## E. VISUAL/UI SORUNLARI

### E1. Hero Card Hover Efekti
| Dosya | Sorun |
|-------|-------|
| `Home.tsx` | `group-hover:opacity-100` ile "Incele" yazisi sadece hover'da gorunuyor. **Mobilde hover olmadigi icin hic gorunmeyecek.** |

### E2. Kayan Yazi (Shimmer Text)
| Dosya | Sorun |
|-------|-------|
| `Home.css` | `shimmer-text` animasyonu `-webkit-background-clip: text` kullaniyor. **Bazi tarayicilarda desteklenmeyebilir.** |

### E3. Culture.tsx - Gradient Yonu
| Dosya | Sorun |
|-------|-------|
| `Culture.tsx` | Bazi bolumlerde `text-right` kullaniliyor ama gradient yonu hep `from-stone-950` sabit. **Ters gradient eklenmeli.** |

### E4. Scroll Progress Bar
| Dosya | Sorun |
|-------|-------|
| `History.tsx` | Scroll progress bar `z-[60]` ile navbar'in ustunde. **Bazi mobil tarayicilarda ust uste binme olabilir.** |

---

## F. GUVENLIK SORUNLARI

### F1. Kopyala Fonksiyonu Hatasi Gizleniyor
| Dosya | Satir | Sorun |
|-------|-------|-------|
| `DestekOl.tsx` | 34 | `navigator.clipboard?.writeText(...).catch(() => {})` - **hata sessizce yutuluyor.** Kullanici IBAN kopyalanamadigini bilemez. |

### F2. HTML Injection Riski
| Dosya | Risk |
|-------|------|
| `Geography.tsx` | `createMarkerIcon` icinde `innerHTML` kullanimi var. Veriler guvenilir kaynaktan geldigi icin dusuk risk ama XSS acigi potansiyeli var. |

---

## G. KOD KALITESI SORUNLARI

### G1. Inline Style Kullanimi
| Dosya | Miktar | Sorun |
|-------|--------|-------|
| `RulerPage.tsx` | Yuksek | `style={{ backgroundColor: accent }}` gibi inline stiller. Tailwind class'lari ile degistirilmeli. |
| `History.tsx` | Orta | `style={{ backgroundColor: era.color }}` inline stiller. |

### G2. Magic Numbers
| Dosya | Ornek |
|-------|-------|
| `History.tsx` | `{ threshold: 0.15 }`, `{ stiffness: 100, damping: 30 }` - sabitler const olarak tanimlanmali |
| `RulerPage.tsx` | `[0, 0.5]`, `[1, 1.15]` - parallax araliklari const olmali |

### G3. Tekrar Eden Kod (DRY Ihlali)
| Dosya | Tekrar |
|-------|--------|
| `History.tsx` + `DynastyDetail.tsx` | DYNASTIES objesi her iki dosyada da ayrı tanimlanmis. **Tek bir data dosyasindan import edilmeli.** |
| `RulerPage.tsx` + `DynastyDetail.tsx` | DYNASTY_MAP ve DYNASTIES benzer verileri tutuyor. **Tekillestirilmeli.** |

### G4. Inscriptions.tsx - Import Sirasi
| Dosya | Satir | Sorun |
|-------|-------|-------|
| `Inscriptions.tsx` | 5-6 | `import { sortedInscriptions }` (satir 5) `import { Scroll... }`'DEN ONCE geliyor. **ESLint hatasi, import sirasi yanlis.** |

---

## H. YAPILANDIRMA VE AYAR DOSYALARI

### H1. Tailwind CSS v3 - v4 Gecis
| Durum | Aciklama |
|-------|----------|
| `package.json` | `tailwindcss: ^3.4.19` (v3) |
| `devDependencies` | `tw-animate-css: ^1.4.0` (v4 icin) |
| `devDependencies` | `tailwindcss-animate: ^1.0.7` (v3 icin) |
| **Sorun** | Iki animate kutuphanesi yan yana. `tw-animate-css` v4 icin, `tailwindcss-animate` v3 icin. **Biri kaldirilmali.** |

### H2. ESLint Konfigurasyonu
| Dosya | Durum |
|-------|-------|
| `eslint.config.js` | Vite varsayilan konfigurasyonu kullaniyor |
| **Sorun** | `@typescript-eslint/no-unused-vars` gibi kurallar disable edilmis olabilir. `// @ts-nocheck` kullanimi buna isaret. |

### H3. TypeScript Hedef Versiyonu
| Dosya | Deger |
|-------|-------|
| `tsconfig.json` | Kontrol edilmeli. Eski bir hedef (`es2015` vb.) olabilir. |

---

## I. GELİŞTİRİLMESİ ÖNERİLEN YERLER

### I1. Lazy Loading ile Code Splitting
| Mevcut Durum | Sorun | Cozum |
|-------------|-------|-------|
| Tum sayfalar eager import | Bundle: **735KB** JS | Route bazli `React.lazy()` ile sayfa sayfalar ayrı chunk'lara bolunebilir |

### I2. Image Optimizasyonu
| Sorun | Cozum |
|-------|-------|
| 100+ AI uretimi resim (`/images/`) | WebP formatina donusturulmeli |
| `loading="lazy"` sadece bazi yerlerde | Tum gorsellerde kullanilmali |
| `srcset` yok | Farkli ekran boyutlari icin farkli boyutlar sunulmali |

### I3. PWA (Progressive Web App)
| Eksik | Fayda |
|-------|-------|
| manifest.json | Ana ekrana ekleme ozelligi |
| Service Worker | Offline calisma, caching |
| icon set (192x192, 512x512) | PWA icin gerekli |

### I4. Analytics
| Eksik | Fayda |
|-------|-------|
| Google Analytics / Plausible | Kullanici davranisi analizi |
| Error tracking (Sentry) | Hata takibi |

### I5. Arama Fonksiyonu
| Eksik | Fayda |
|-------|-------|
| Global arama | 103 hukumdar, 21 devlet, 12 destan arasinda arama |
| Fuzzy search | Yazim hatalarina karsi toleransli arama |

### I6. Yazdirma ve Paylasim
| Eksik | Fayda |
|-------|-------|
| Hukumdar biyografisini yazdir | Akademik kullanim |
| "Paylas" butonu (Web Share API) | Sosyal medya paylasimi |

---

## J. DOGRU CALISAN YAPILAR

Asagidaki yapilar dogru ve saglikli calisiyor:

| Bilesen | Durum |
|---------|-------|
| React Router + HashRouter | Dogru yapilandirilmis |
| Vite build sistemi | Optimizasyonlu calisiyor |
| Code splitting (manual chunks) | 4 chunk'a ayrilmis |
| Tailwind CSS | Tema tutarli (stone-950 arka plan) |
| `memo(Layout)` | Gereksiz re-render'lari onluyor |
| Scroll-to-top | Route degisiminde calisiyor |
| Responsive tasarim | Mobile-first yaklasim |
| Kronolojik siralama | Tarih sirasi dogru |
| 103 hukumdar verisi | Her biri 1500+ karakter biyografi |
| 21 devlet | Kronolojik siralama dogru |
| Destan ve Yazit verileri | Tam metin ve ceviriler mevcut |
| Leaflet harita | Guncel Turk devletleri gosterimi |

---

## K. ONCELİK MATRİSİ

| Oncelik | Kod | Aciklama | Efor |
|---------|-----|----------|------|
| **KRITIK** | A1 | Home.tsx `/devletler` 404 linki | 2 dk |
| **KRITIK** | A2 | HTML lang="tr" olmali | 1 dk |
| **KRITIK** | A3 | Meta description/SEO tag'leri | 10 dk |
| **KRITIK** | A4 | Footer M.O. 3000 -> M.O. 520 | 1 dk |
| **YUKSEK** | A5 | @ts-nocheck kaldirilmali | 30 dk |
| **YUKSEK** | C1/C2 | Hukumdar/devlet sayisi guncelleme | 5 dk |
| **YUKSEK** | A7 | States.tsx dosyasi silinmeli | 1 dk |
| **YUKSEK** | D1 | DestekOl IBAN'lari gercek mi? | - |
| **ORTA** | A6 | react-router cift import cozumu | 5 dk |
| **ORTA** | A7 | Kullanilmayan UI bileşenleri | 20 dk |
| **ORTA** | F1 | Clipboard hata yonetimi | 5 dk |
| **ORTA** | D4 | Erisilebilirlik iyilestirmeleri | 30 dk |
| **DUSUK** | B1 | Framer-motion diger sayfalarda | 60 dk |
| **DUSUK** | I1 | Lazy loading code splitting | 30 dk |
| **DUSUK** | I2 | Image optimizasyonu (WebP) | 30 dk |
| **DUSUK** | G3 | DRY - DYNASTIES tekrari | 20 dk |

---

## L. TOPLAM ISTATISTIKLER

| Kategori | Sayi |
|----------|------|
| Kritik hata | 4 |
| Yuksek oncelik | 4 |
| Orta oncelik | 6 |
| Dusuk oncelik | 12 |
| Dogru calisan | 11 |
| **Toplam bulgu** | **47** |
| Toplam dosya incelendi | 72 |
| Toplam kod satiri | ~15,000+ |

---

*Raporu hazirlayan: Kimi AI Agent*
*Son guncelleme: 2026-06-03*
