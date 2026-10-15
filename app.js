// ================= SOZLAMALAR =================
const BRAND = { name: "Dilmuss", logo: "logo.png", color: "#d86487", slogan: "Sizning uslubingiz, bizning g'amxo'rligimiz" };

// Filiallar va oylik savdo plani (so'm). Import qilingan ma'lumotda yangi filial bo'lsa, plani "—" bo'ladi.
// DEMO: 56 ta filial nomi va sotuvchilar avtomatik yaratiladi. Haqiqiy ro'yxat bilan almashtiring:
//   const BRANCHES = [{ name: "Chilonzor — Novza", plan: 120e6, sellers: ["Ism Familiya", ...] }, ...];
const BRANCH_NAMES = [
  "Chilonzor — Novza", "Chilonzor — Qatortol", "Chilonzor — Bunyodkor", "Chilonzor — 19-kvartal", "Chilonzor — Olmazor bozori",
  "Yunusobod — Mega Planet", "Yunusobod — 4-kvartal", "Yunusobod — Minor", "Yunusobod — Bodomzor", "Yunusobod — 19-mavze",
  "Mirzo Ulug'bek — Buyuk Ipak Yo'li", "Mirzo Ulug'bek — Feruza", "Mirzo Ulug'bek — Parkent bozori", "Mirzo Ulug'bek — Qorasuv",
  "Yakkasaroy — Kichik halqa", "Yakkasaroy — Shota Rustaveli", "Yakkasaroy — Bobur bog'i",
  "Shayxontohur — Chorsu", "Shayxontohur — Samarqand Darvoza", "Shayxontohur — Beruniy", "Shayxontohur — Ko'kcha",
  "Olmazor — Qorasaroy", "Olmazor — Universitet", "Olmazor — Sag'bon",
  "Sergeli — Sergeli bozori", "Sergeli — 7-mavze", "Sergeli — Quruvchilar",
  "Mirobod — Oybek", "Mirobod — Tashkent City", "Mirobod — Kosmonavtlar",
  "Yashnobod — Tuzel", "Yashnobod — Aviasozlar", "Yashnobod — Parkent",
  "Bektemir — Markaz", "Uchtepa — Lutfiy", "Uchtepa — 22-kvartal", "Uchtepa — Farhod bozori",
  "Yangihayot — Markaz", "Yangihayot — Kuyluk",
  "Toshkent vil. — Chirchiq", "Toshkent vil. — Olmaliq", "Toshkent vil. — Angren", "Toshkent vil. — Nurafshon", "Toshkent vil. — Zangiota",
  "Samarqand — Registon", "Samarqand — Makon Mall", "Buxoro — Markaz", "Andijon — Bobur", "Farg'ona — Al-Farg'oniy",
  "Namangan — Markaz", "Qarshi — Nasaf", "Navoiy — Markaz", "Jizzax — Markaz", "Guliston — Markaz", "Nukus — Markaz", "Urganch — Markaz",
];
const FIRST = ["Aziza", "Jasur", "Madina", "Dilnoza", "Sardor", "Nilufar", "Bekzod", "Shahnoza", "Otabek", "Gulnora", "Rustam", "Kamola", "Feruza", "Akmal", "Zarina", "Sherzod", "Malika", "Doniyor", "Mohira", "Ulug'bek", "Sevara", "Javohir", "Nodira", "Bobur", "Lola", "Islom", "Dildora", "Asal", "Sanjar", "Yulduz"];
const FEMALE = new Set(["Aziza", "Madina", "Dilnoza", "Nilufar", "Shahnoza", "Gulnora", "Kamola", "Feruza", "Zarina", "Malika", "Mohira", "Sevara", "Nodira", "Lola", "Dildora", "Asal", "Yulduz"]);
const LAST = ["Karimova", "Toshmatov", "Rahimova", "Yusupova", "Aliyev", "Qodirova", "Ergashev", "Nazarova", "Xolmatov", "Saidova", "Mirzayev", "Abdullayeva", "Sultonova", "Jo'rayev", "Ismoilova", "Umarov", "Hasanova", "Nurmatov", "Rasulova", "Tursunov"];
const USED_NAMES = new Set();
const BRANCHES = BRANCH_NAMES.map((name, i) => {
  const n = 2 + (i % 3 === 0 ? 1 : 0);
  const sellers = Array.from({ length: n }, (_, k) => {
    const j = i * 3 + k;
    const first = FIRST[j % FIRST.length];
    const female = FEMALE.has(first);
    for (let t = 0; ; t++) {
      let last = LAST[(j * 7 + i + t) % LAST.length];
      // ayol ismlariga -a qo'shimchali familiya, erkaklarga -siz
      if (female && !last.endsWith("a")) last += "a";
      if (!female && last.endsWith("a")) last = last.slice(0, -1);
      const full = `${first} ${last}`;
      if (!USED_NAMES.has(full)) { USED_NAMES.add(full); return full; }
    }
  });
  const plan = Math.round((/Mega|City|Chorsu|Samarqand Darvoza|Novza|Makon/.test(name) ? 180 : 70 + ((i * 37) % 70)) * 1e6);
  return { name, plan, sellers };
});

const CATEGORIES = [
  { name: "Ayollar kiyimi", min: 180e3, max: 1200e3, w: 34, items: ["Ko'ylak", "Bluzka", "Yubka", "Palto", "Trikotaj kofta", "Shim (ayollar)"] },
  { name: "Erkaklar kiyimi", min: 150e3, max: 900e3, w: 26, items: ["Klassik ko'ylak", "Futbolka", "Jinsi shim", "Kurtka", "Kostyum", "Sviter"] },
  { name: "Oyoq kiyim", min: 250e3, max: 1500e3, w: 20, items: ["Krossovka", "Tufli", "Etik", "Botinka", "Shippak"] },
  { name: "Bolalar kiyimi", min: 80e3, max: 400e3, w: 13, items: ["Bolalar kombinezoni", "Bolalar futbolkasi", "Bolalar kurtkasi", "Maktab formasi"] },
  { name: "Aksessuarlar", min: 50e3, max: 350e3, w: 7, items: ["Sumka", "Kamar", "Sharf", "Shapka", "Paypoq (to'plam)"] },
];

const PAYMENTS = [
  { name: "Karta (Uzcard/Humo)", w: 36, color: "#d86487" },
  { name: "Naqd", w: 27, color: "#16171c" },
  { name: "Payme", w: 14, color: "#33cccc" },
  { name: "Click", w: 12, color: "#2f6fed" },
  { name: "Nasiya", w: 11, color: "#f59e0b" },
];

// ================= BALLAR VA MUKOFOTLAR =================
// Ball qoidalari (oylik musobaqa). Raqamlarni o'zgartirsangiz, hammasi avtomatik qayta hisoblanadi.
const POINTS = {
  perMillion: 10,                       // har 1 mln so'm savdo uchun
  perCheck: 1,                          // har bir chek uchun
  bigCheck: { min: 1000000, pts: 3 },   // 1 mln so'mdan katta chek uchun qo'shimcha
  multiItem: { minQty: 2, pts: 2 },     // bir chekda 2+ mahsulot (cross-sell) uchun qo'shimcha
  dailyPlan: 20,                        // kunlik plan bajarilgan har bir kun uchun
  monthPlan: [{ pct: 120, pts: 200 }, { pct: 100, pts: 100 }], // oylik plan (temp) bonusi
};
const LEVELS = [
  { name: "Bronza", min: 0, icon: "🥉", color: "#b7794a" },
  { name: "Kumush", min: 500, icon: "🥈", color: "#8a94a6" },
  { name: "Oltin", min: 1000, icon: "🥇", color: "#d4a017" },
  { name: "Platina", min: 1600, icon: "💠", color: "#6b5bd6" },
];
const PLACE_PRIZES = ["2 000 000 so'm", "1 000 000 so'm", "500 000 so'm"]; // oyning 1-2-3 o'rni
const NOMINATIONS = [
  { id: "plan", icon: "👑", title: "Plan qiroli", desc: "Eng yuqori plan bajarilishi (kamida 100%)", prize: "500 000 so'm", value: (s) => s.planPct, min: 100, fmt: (v) => fmtNum(v, 0) + "%" },
  { id: "big", icon: "💎", title: "Katta chek ustasi", desc: "1 mln so'mdan katta cheklar eng ko'p", prize: "300 000 so'm", value: (s) => s.big, min: 1, fmt: (v) => v + " ta katta chek" },
  { id: "cross", icon: "🛍️", title: "Cross-sell ustasi", desc: "Bir chekda 2+ mahsulot sotgan eng ko'p", prize: "300 000 so'm", value: (s) => s.multi, min: 1, fmt: (v) => v + " ta chek" },
  { id: "streak", icon: "🔥", title: "Barqarorlik", desc: "Kunlik planni ketma-ket eng ko'p kun bajargan", prize: "300 000 so'm", value: (s) => s.streak, min: 2, fmt: (v) => v + " kun ketma-ket" },
  { id: "growth", icon: "🚀", title: "Eng katta o'sish", desc: "O'tgan oyga nisbatan ball o'sishi (%)", prize: "300 000 so'm", value: (s) => s.growth, min: 1, fmt: (v) => "+" + fmtNum(v, 0) + "%" },
];
const BRANCH_CHAMPION_PRIZE = "Sertifikat + 200 000 so'm"; // har bir filialning eng ko'p ball to'plagan sotuvchisi

// Demo autentifikatsiya: faqat brauzerda ishlaydi, haqiqiy himoya emas.
// Haqiqiy ma'lumot qo'yishdan oldin login tekshiruvini serverga (masalan, Vercel function) ko'chiring.
// direktor — hamma narsani ko'radi; sotuvchi — faqat o'z savdolarini (login = ismi kichik harfda, parol 1234).
const USERS = { direktor: { pass: "dilmuss2026", role: "admin", name: "Direktor" } };
BRANCHES.forEach((b) => b.sellers.forEach((s) => {
  const base = s.split(" ")[0].toLowerCase().replace(/'/g, "");
  let login = base, n = 2;
  while (USERS[login]) login = base + n++; // bir xil ism bo'lsa: aziza, aziza2, …
  USERS[login] = { pass: "1234", role: "seller", name: s };
}));

const SESSION_KEY = "dilmuss_user";
const Auth = {
  login(login, pass) {
    const u = USERS[login.toLowerCase()];
    if (u && u.pass === pass) {
      try { sessionStorage.setItem(SESSION_KEY, login.toLowerCase()); } catch (e) {}
      return true;
    }
    return false;
  },
  logout() {
    try { sessionStorage.removeItem(SESSION_KEY); } catch (e) {}
    location.href = "index.html";
  },
  user() {
    let k = null;
    try { k = sessionStorage.getItem(SESSION_KEY); } catch (e) {}
    return k && USERS[k] ? { login: k, ...USERS[k] } : null;
  },
  isLoggedIn() { return !!this.user(); },
};

const MONTHS = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"];

// ---------- Sana yordamchilari (lokal vaqt) ----------
const pad = (n) => String(n).padStart(2, "0");
const dkey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const dfmt = (d) => `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
const kfmt = (k) => `${k.slice(8, 10)}.${k.slice(5, 7)}.${k.slice(0, 4)}`;
const parseKey = (k) => { const [y, m, d] = k.split("-").map(Number); return new Date(y, m - 1, d); };
const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const daysIn = (y, m) => new Date(y, m + 1, 0).getDate();
const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const diffDays = (a, b) => Math.round((startOfDay(b) - startOfDay(a)) / 864e5);

// ---------- Demo ma'lumot: alohida savdolar (cheklar) ----------
// Har bir qator = bitta chek: { date, time, branch, seller, category, product, qty, amount, payment }
function rng(seed) {
  let s = seed;
  return () => ((s = (s * 9301 + 49297) % 233280) / 233280);
}
function pickW(list, r) {
  const total = list.reduce((a, x) => a + x.w, 0);
  let v = r() * total;
  for (const x of list) { if ((v -= x.w) <= 0) return x; }
  return list[list.length - 1];
}

function buildDemo(today, days = 100) {
  const r = rng(2026);
  const rows = [];
  const branchW = BRANCHES.map((b) => b.plan / 400e6);
  const skill = BRANCHES.map((b) => b.sellers.map((_, si) => [1.35, 1.0, 0.75][si % 3] * (0.85 + 0.3 * r())));
  for (let i = days - 1; i >= 0; i--) {
    const d = addDays(today, -i);
    const key = dkey(d);
    const dow = d.getDay();
    const dayF = (dow === 0 || dow === 6 ? 1.35 : 1) * (0.85 + 0.3 * r()) * (1 + (days - i) / days * 0.15);
    BRANCHES.forEach((b, bi) => {
      const n = Math.round(10.5 * branchW[bi] * dayF + r() * 3);
      const sw = skill[bi].map((w, si) => ({ w, s: b.sellers[si] }));
      for (let k = 0; k < n; k++) {
        const cat = pickW(CATEGORIES, r);
        const qty = r() < 0.72 ? 1 : r() < 0.8 ? 2 : 3;
        const price = Math.round((cat.min + (cat.max - cat.min) * Math.pow(r(), 1.6)) / 1000) * 1000;
        const hour = Math.min(21, Math.max(10, Math.round(15.5 + (r() + r() + r() - 1.5) * 4.2)));
        rows.push({
          date: key,
          time: `${pad(hour)}:${pad(Math.floor(r() * 60))}`,
          branch: b.name,
          seller: pickW(sw, r).s,
          category: cat.name,
          product: cat.items[Math.floor(r() * cat.items.length)],
          qty,
          amount: price * qty,
          payment: pickW(PAYMENTS, r).name,
        });
      }
    });
  }
  return rows;
}

// ---------- Excel / CSV import (POS eksporti: Billz, Smartup, 1C va h.k.) ----------
// Ustun nomlari o'zbek / rus / ingliz tilida bo'lishi mumkin — avtomatik aniqlanadi.
const COLUMN_ALIASES = {
  date: ["sana", "дата", "date", "vaqt va sana", "дата продажи", "дата и время", "created", "created at"],
  time: ["vaqt", "время", "time"],
  branch: ["filial", "do'kon", "dokon", "магазин", "филиал", "склад", "точка", "store", "branch", "shop"],
  seller: ["sotuvchi", "admin", "kassir", "продавец", "кассир", "сотрудник", "менеджер", "seller", "cashier", "employee"],
  category: ["kategoriya", "категория", "группа", "category"],
  product: ["mahsulot", "tovar", "товар", "наименование", "продукт", "product", "item", "name"],
  qty: ["soni", "miqdor", "количество", "кол-во", "кол.", "qty", "quantity"],
  price: ["narx", "narxi", "цена", "price"],
  amount: ["summa", "jami", "сумма", "итого", "total", "amount", "sum"],
  payment: ["to'lov", "tolov", "to'lov turi", "оплата", "тип оплаты", "способ оплаты", "payment"],
};

function normHeader(h) { return String(h).trim().toLowerCase().replace(/[ʻʼ`’‘]/g, "'").replace(/\s+/g, " "); }

function mapColumns(headers) {
  const map = {};
  const norm = headers.map(normHeader);
  for (const [field, aliases] of Object.entries(COLUMN_ALIASES)) {
    let idx = norm.findIndex((h) => aliases.includes(h));
    if (idx < 0) idx = norm.findIndex((h) => aliases.some((a) => a.length > 3 && h.includes(a)));
    if (idx >= 0 && !Object.values(map).includes(headers[idx])) map[field] = headers[idx];
  }
  return map;
}

function parseNumber(v) {
  if (typeof v === "number") return v;
  const s = String(v ?? "").replace(/[^\d,.\-]/g, "");
  if (!s) return 0;
  // "1 250 000,50" yoki "1,250,000.50"
  const lastSep = Math.max(s.lastIndexOf(","), s.lastIndexOf("."));
  if (lastSep > -1 && s.length - lastSep - 1 <= 2) {
    return parseFloat(s.slice(0, lastSep).replace(/[,.]/g, "") + "." + s.slice(lastSep + 1));
  }
  return parseFloat(s.replace(/[,.]/g, "")) || 0;
}

function parseDateTime(v) {
  if (v instanceof Date && !isNaN(v)) return { date: dkey(v), time: `${pad(v.getHours())}:${pad(v.getMinutes())}` };
  if (typeof v === "number" && v > 20000 && v < 80000) { // Excel seriya raqami
    const d = new Date(Math.round((v - 25569) * 864e5));
    const local = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes());
    return { date: dkey(local), time: `${pad(local.getHours())}:${pad(local.getMinutes())}` };
  }
  const s = String(v ?? "").trim();
  let m = s.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{2,4})(?:[ T,]+(\d{1,2}):(\d{2}))?/);
  if (m) {
    const y = m[3].length === 2 ? 2000 + +m[3] : +m[3];
    return { date: `${y}-${pad(m[2])}-${pad(m[1])}`, time: m[4] ? `${pad(m[4])}:${m[5]}` : "" };
  }
  m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:[ T](\d{1,2}):(\d{2}))?/);
  if (m) return { date: `${m[1]}-${pad(m[2])}-${pad(m[3])}`, time: m[4] ? `${pad(m[4])}:${m[5]}` : "" };
  return null;
}

// raw: sheet_to_json natijasi (obyektlar massivi). Qaytaradi: { rows, map, skipped }
function normalizeImport(raw) {
  if (!raw.length) return { rows: [], map: {}, skipped: 0 };
  const map = mapColumns(Object.keys(raw[0]));
  const rows = [];
  let skipped = 0;
  for (const r of raw) {
    const dt = map.date ? parseDateTime(r[map.date]) : null;
    const qty = map.qty ? parseNumber(r[map.qty]) || 1 : 1;
    let amount = map.amount ? parseNumber(r[map.amount]) : 0;
    if (!amount && map.price) amount = parseNumber(r[map.price]) * qty;
    if (!dt || !amount) { skipped++; continue; }
    let time = dt.time;
    if (!time && map.time) {
      const t = String(r[map.time]).match(/(\d{1,2}):(\d{2})/);
      if (t) time = `${pad(t[1])}:${t[2]}`;
    }
    rows.push({
      date: dt.date,
      time: time || "",
      branch: String((map.branch && r[map.branch]) || "Noma'lum filial").trim(),
      seller: String((map.seller && r[map.seller]) || "Noma'lum").trim(),
      category: String((map.category && r[map.category]) || "Boshqa").trim(),
      product: String((map.product && r[map.product]) || "—").trim(),
      qty,
      amount,
      payment: String((map.payment && r[map.payment]) || "Noma'lum").trim(),
    });
  }
  rows.sort((a, b) => (a.date + a.time < b.date + b.time ? -1 : 1));
  return { rows, map, skipped };
}

const STORE_KEY = "dilmuss_rows";
const Store = {
  load() {
    try { const s = localStorage.getItem(STORE_KEY); return s ? JSON.parse(s) : null; } catch (e) { return null; }
  },
  save(payload) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(payload)); return true; } catch (e) { return false; }
  },
  clear() { try { localStorage.removeItem(STORE_KEY); } catch (e) {} },
};

// Berilgan mukofotlar belgisi (demo: faqat shu brauzerda saqlanadi)
const AWARDS_KEY = "dilmuss_awards";
const AwardStore = {
  all() { try { return JSON.parse(localStorage.getItem(AWARDS_KEY) || "{}"); } catch (e) { return {}; } },
  toggle(key) {
    const a = this.all();
    if (a[key]) delete a[key]; else a[key] = dkey(new Date());
    try { localStorage.setItem(AWARDS_KEY, JSON.stringify(a)); } catch (e) {}
    return a;
  },
};

const levelOf = (pts) => [...LEVELS].reverse().find((l) => pts >= l.min);
const nextLevel = (pts) => LEVELS.find((l) => l.min > pts);

// ---------- Hisob-kitob ----------
function summarize(rows) {
  let amount = 0, qty = 0;
  for (const r of rows) { amount += r.amount; qty += r.qty; }
  return { amount, checks: rows.length, qty, avg: rows.length ? amount / rows.length : 0 };
}
function groupBy(rows, field) {
  const m = new Map();
  for (const r of rows) {
    const g = m.get(r[field]) || { name: r[field], amount: 0, checks: 0, qty: 0 };
    g.amount += r.amount; g.checks++; g.qty += r.qty;
    m.set(r[field], g);
  }
  return [...m.values()].map((g) => ({ ...g, avg: g.checks ? g.amount / g.checks : 0 })).sort((a, b) => b.amount - a.amount);
}

// ---------- Formatlash ----------
const nf = (d) => new Intl.NumberFormat("ru-RU", { minimumFractionDigits: 0, maximumFractionDigits: d });
const fmtNum = (n, d = 0) => nf(d).format(n).replace(/ | /g, " ").replace(/^-(0(,0+)?)$/, "$1");
const fmtMln = (n) => fmtNum(n / 1e6, n >= 1e8 ? 0 : 1);
const fmtPct = (n) => fmtNum(n, 1) + "%";
const signed = (s, v) => (v > 0 ? "+" : "") + s;
const pct = (cur, prev) => (prev ? ((cur - prev) / prev) * 100 : 0);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
