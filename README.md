# Dilmuss — savdo dashboard

Filiallar, sotuvchilar, mahsulotlar va sotuvchilar uchun ball/mukofot tizimi.
Oddiy HTML + JavaScript (build kerak emas), Vercel'da joylangan: https://dilmuss.vercel.app

## Fayllar

| Fayl | Nima |
|---|---|
| `index.html` | Kirish sahifasi |
| `dashboard.html` | Dashboard (Umumiy, Filiallar, Sotuvchilar, Ballar va mukofotlar, Mahsulotlar, Savdolar, Ma'lumot yuklash) |
| `app.js` | **Sozlamalar** (filiallar, planlar, ball qoidalari, mukofotlar), demo ma'lumot, Excel/CSV import |
| `style.css`, `dilmuss.css` | Dizayn (`--orange` = Dilmuss pushti rangi `#d86487`) |
| `logo.png` | Dilmuss logotipi |

## Sozlash

`app.js` tepasida:
- `BRANCHES` — filiallar, oylik plan va sotuvchilar (hozir demo ro'yxat)
- `POINTS`, `LEVELS` — ball qoidalari va darajalar
- `PLACE_PRIZES`, `NOMINATIONS`, `BRANCH_CHAMPION_PRIZE` — mukofotlar

## Haqiqiy ma'lumot

Kassa (POS) dasturidan savdolarni Excel/CSV qilib eksport qiling va **Ma'lumot yuklash** sahifasiga yuklang.
Ustunlar avtomatik aniqlanadi (o'zbek/rus): Sana, Filial, Sotuvchi, Summa, Mahsulot, Kategoriya, Soni, To'lov turi.

## ⚠️ Muhim

- Login hozircha **faqat brauzerda** tekshiriladi — haqiqiy himoya emas. Haqiqiy savdo raqamlarini qo'yishdan oldin loginni serverga ko'chirish kerak.
- Yuklangan ma'lumot va «Berildi» belgilari faqat o'sha brauzerda saqlanadi.
