/**
 * Countries for the enquiry form, and budget ranges shown in the visitor's local currency.
 * Budgets are defined once in US dollars; local amounts are approximate and rounded to friendly
 * numbers. Countries whose currency isn't listed in RATES_PER_USD see US dollars.
 */

/** [ISO code, name, currency] */
export const COUNTRIES = [
  ["AF", "Afghanistan", "USD"],
  ["AL", "Albania", "EUR"],
  ["DZ", "Algeria", "USD"],
  ["AR", "Argentina", "USD"],
  ["AU", "Australia", "AUD"],
  ["AT", "Austria", "EUR"],
  ["AZ", "Azerbaijan", "USD"],
  ["BH", "Bahrain", "BHD"],
  ["BD", "Bangladesh", "BDT"],
  ["BE", "Belgium", "EUR"],
  ["BR", "Brazil", "BRL"],
  ["BG", "Bulgaria", "EUR"],
  ["CA", "Canada", "CAD"],
  ["CL", "Chile", "USD"],
  ["CN", "China", "CNY"],
  ["CO", "Colombia", "USD"],
  ["HR", "Croatia", "EUR"],
  ["CY", "Cyprus", "EUR"],
  ["CZ", "Czech Republic", "CZK"],
  ["DK", "Denmark", "DKK"],
  ["EG", "Egypt", "EGP"],
  ["EE", "Estonia", "EUR"],
  ["FI", "Finland", "EUR"],
  ["FR", "France", "EUR"],
  ["DE", "Germany", "EUR"],
  ["GH", "Ghana", "USD"],
  ["GR", "Greece", "EUR"],
  ["HK", "Hong Kong", "HKD"],
  ["HU", "Hungary", "HUF"],
  ["IN", "India", "INR"],
  ["ID", "Indonesia", "IDR"],
  ["IQ", "Iraq", "USD"],
  ["IE", "Ireland", "EUR"],
  ["IT", "Italy", "EUR"],
  ["JP", "Japan", "JPY"],
  ["JO", "Jordan", "JOD"],
  ["KZ", "Kazakhstan", "USD"],
  ["KE", "Kenya", "KES"],
  ["KW", "Kuwait", "KWD"],
  ["LV", "Latvia", "EUR"],
  ["LB", "Lebanon", "USD"],
  ["LT", "Lithuania", "EUR"],
  ["LU", "Luxembourg", "EUR"],
  ["MY", "Malaysia", "MYR"],
  ["MV", "Maldives", "USD"],
  ["MT", "Malta", "EUR"],
  ["MX", "Mexico", "MXN"],
  ["MA", "Morocco", "MAD"],
  ["NP", "Nepal", "NPR"],
  ["NL", "Netherlands", "EUR"],
  ["NZ", "New Zealand", "NZD"],
  ["NG", "Nigeria", "NGN"],
  ["NO", "Norway", "NOK"],
  ["OM", "Oman", "OMR"],
  ["PK", "Pakistan", "PKR"],
  ["PH", "Philippines", "PHP"],
  ["PL", "Poland", "PLN"],
  ["PT", "Portugal", "EUR"],
  ["QA", "Qatar", "QAR"],
  ["RO", "Romania", "RON"],
  ["SA", "Saudi Arabia", "SAR"],
  ["SG", "Singapore", "SGD"],
  ["SK", "Slovakia", "EUR"],
  ["SI", "Slovenia", "EUR"],
  ["ZA", "South Africa", "ZAR"],
  ["KR", "South Korea", "KRW"],
  ["ES", "Spain", "EUR"],
  ["LK", "Sri Lanka", "LKR"],
  ["SE", "Sweden", "SEK"],
  ["CH", "Switzerland", "CHF"],
  ["TW", "Taiwan", "TWD"],
  ["TZ", "Tanzania", "USD"],
  ["TH", "Thailand", "THB"],
  ["TN", "Tunisia", "USD"],
  ["TR", "Türkiye", "TRY"],
  ["UG", "Uganda", "USD"],
  ["UA", "Ukraine", "USD"],
  ["AE", "United Arab Emirates", "AED"],
  ["GB", "United Kingdom", "GBP"],
  ["US", "United States", "USD"],
  ["UZ", "Uzbekistan", "USD"],
  ["VN", "Vietnam", "VND"],
  ["OTHER", "Other", "USD"],
] as const;

export type CountryCode = (typeof COUNTRIES)[number][0];
export const COUNTRY_CODES = COUNTRIES.map(([code]) => code) as [CountryCode, ...CountryCode[]];

/** Approximate units per US dollar. Only used to show friendly local ranges, not to quote prices. */
const RATES_PER_USD: Record<string, number> = {
  USD: 1,
  AED: 3.67,
  AUD: 1.52,
  BDT: 122,
  BHD: 0.376,
  BRL: 5.5,
  CAD: 1.38,
  CHF: 0.8,
  CNY: 7.2,
  CZK: 21,
  DKK: 6.4,
  EGP: 48,
  EUR: 0.86,
  GBP: 0.75,
  HKD: 7.8,
  HUF: 350,
  IDR: 16500,
  INR: 88,
  JOD: 0.709,
  JPY: 150,
  KES: 129,
  KRW: 1400,
  KWD: 0.307,
  LKR: 300,
  MAD: 9.2,
  MXN: 18.5,
  MYR: 4.3,
  NGN: 1500,
  NOK: 10.2,
  NPR: 140,
  NZD: 1.7,
  OMR: 0.385,
  PHP: 57,
  PKR: 280,
  PLN: 3.7,
  QAR: 3.64,
  RON: 4.4,
  SAR: 3.75,
  SEK: 9.6,
  SGD: 1.3,
  THB: 33,
  TRY: 41,
  TWD: 31,
  VND: 26000,
  ZAR: 17.8,
};

/** Budget ranges in US dollars. `max: null` is open-ended. */
export const BUDGET_TIERS = [
  { key: "100-500", min: 100, max: 500 },
  { key: "500-1000", min: 500, max: 1000 },
  { key: "1000-2500", min: 1000, max: 2500 },
  { key: "2500-5000", min: 2500, max: 5000 },
  { key: "5000-10000", min: 5000, max: 10000 },
  { key: "10000+", min: 10000, max: null },
  { key: "not-sure", min: null, max: null },
] as const;

export type BudgetKey = (typeof BUDGET_TIERS)[number]["key"];
export const BUDGET_KEYS = BUDGET_TIERS.map((t) => t.key) as [BudgetKey, ...BudgetKey[]];

export function getCountry(code: string) {
  return COUNTRIES.find(([c]) => c === code);
}

/** The currency used for budgets in a country (US dollars when unknown). */
export function currencyFor(countryCode: string) {
  const currency = getCountry(countryCode)?.[2] ?? "USD";
  return currency in RATES_PER_USD ? currency : "USD";
}

/** Approximate units of a currency per US dollar. 1 for anything not listed. */
export function rateFor(currency: string) {
  return RATES_PER_USD[currency] ?? 1;
}

/** Round to a friendly figure: the nearest half step of its leading digit (28,000 → 30,000). */
function friendly(value: number) {
  const magnitude = 10 ** Math.floor(Math.log10(value));
  return Math.max(1, Math.round((value / magnitude) * 2) / 2) * magnitude;
}

function money(amount: number, currency: string) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** e.g. "PKR 30,000 – PKR 150,000", "$10,000+", "Not sure yet". */
export function budgetLabel(key: string, currency = "USD") {
  const tier = BUDGET_TIERS.find((t) => t.key === key);
  if (!tier) return "";
  if (tier.min === null) return "Not sure yet";
  const rate = RATES_PER_USD[currency] ?? 1;
  const local = (usd: number) => money(currency === "USD" ? usd : friendly(usd * rate), currency);
  if (tier.max === null) return `${local(tier.min)}+`;
  // "PKR 30,000 – 150,000" reads better than repeating a letter code; symbols stay ("$100 – $500").
  const to = local(tier.max);
  const code = /^[A-Z]{2,}\s*/.exec(to)?.[0];
  return `${local(tier.min)} – ${code ? to.slice(code.length) : to}`;
}

/** The budget as the visitor saw it, with the US dollar range alongside for other currencies. */
export function budgetSummary(key: string, countryCode: string) {
  const currency = currencyFor(countryCode);
  const label = budgetLabel(key, currency);
  if (!label || currency === "USD" || key === "not-sure") return label;
  return `${label} (≈ ${budgetLabel(key, "USD")})`;
}
