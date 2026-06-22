# Turk Atlasi - Hata ve Eksik Raporu

## KRITIK HATALAR (Duzeltilmesi Sart)

### 1. Layout.tsx - Footer Menu Isimleri Yanlis
- Satir 105: "Kultur & Sanat" yaziyor -> Yeni adi: "Kut Toresi ve Inanci"
- Satir 106: "Cografya" yaziyor -> Yeni adi: "Gunumuz Turk Devletleri"
- Yeni eklenen "Turk Soyu" sayfasi footer'da yok

### 2. About.tsx - dark: Prefix Kalintilari
- Satir 32, 33, 55, 58, 59, 67, 68, 73, 87, 88, 97, 99
- `dark:text-stone-...` ve `dark:border-stone-...` gibi prefix'ler koyu temada gereksiz
- `text-stone-800 dark:text-stone-200` -> `text-white`
- `bg-amber-100 dark:bg-amber-900/30` -> `bg-amber-900/30`

### 3. EpicDetail.tsx - nextEpic Hatasi
- `nextEpic = sortedEpics[currentIndex - 1]` yanlis -> `currentIndex + 1` olmali
- Bu onceki oturumda duzeltilmis ama kontrol edilmeli

## ORTA SEVIYE HATALAR (Duzeltilmeli)

### 4. States.tsx - Kullanilmayan Importlar
- `soyAgaci`, `useState`, `filter`, `setFilter`, `filters`, `filteredBoys` import edilmis ama kullanilmiyor
- Build'de hata vermiyor ama kod kalitesini dusuruyor

### 5. Culture.tsx - Kullanilmayan Import
- `Lightbulb` icon import edilmis ama kullanilmiyor

### 6. Epics.tsx - Eksik Class
- `<div className="min-h-screen">` - bg-stone-950 eksik
- Bu yuzden sayfa arka plani beyaz gorunuyor olabilir

### 7. Inscriptions.tsx - Eksik Class
- `<div className="min-h-screen">` - bg-stone-950 eksik

### 8. Geography.tsx - Eksik Class
- `<div className="min-h-screen">` - bg-stone-950 eksik

## DUSUK SEVIYE (Iyllestirme)

### 9. History.tsx - innerHTML Kullanimi
- RulerCard icinde fallback SVG icin innerHTML kullanilmis
- React'ta daha guvenli bir yontem kullanilabilir

### 10. About.tsx - Misyon Bolumu Renk Hatasi
- `text-stone-800 dark:text-stone-200` -> `text-white` olmali
- Koyu tema oldugunda metin gorunmez

### 11. Hero Gradient Renkleri
- Bazi hero bolumlerde `text-amber-200` yerine `text-amber-300` kullanilmis
- Tutarlilik icin standart renkler kullanilmali

### 12. Sayfa basliklarinda tutarsizlik
- Bazi sayfalarda "Turk Tarihi", bazilarinda "Tarih" kullanilmis
- Navbar'daki isimlerle sayfa basliklari eslestirilmeli
