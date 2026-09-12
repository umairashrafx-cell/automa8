export type Project = {
  slug: string;
  name: string;
  category: string;
  /** Short line shown on the homepage. */
  description: string;
  /** Longer copy and verified feature lists, kept for future case-study pages. */
  longDescription: string;
  features: string[];
  tags: string[];
  url: string;
  domain: string;
  image: { base: string; alt: string };
};

/**
 * Real, live client work only. Everything here was checked against the live sites —
 * don't add anything a visitor can't verify by opening the link.
 */
export const projects: Project[] = [
  {
    slug: "al-madina-jewellers",
    name: "Al-Madina Jewellers",
    category: "E-commerce · Jewellery · Business Platform",
    description:
      "A complete digital platform combining jewellery commerce, gold rates, custom orders and customer communication.",
    longDescription:
      "An end-to-end digital platform for a jewellery business, combining e-commerce, gold-rate information, customer enquiries, custom orders and direct WhatsApp communication.",
    features: [
      "Bridal, bangles, rings, earrings, lockets & chains and silver collections",
      "Daily gold rate table with calculator",
      "Sell Your Gold and Custom Order flows",
      "Bridal consultation booking",
      "WhatsApp enquiry on every product",
      "Store information, hallmarking and buy-back policies",
      "Insured nationwide delivery information",
    ],
    tags: ["E-commerce", "Gold Rates", "WhatsApp", "Custom Orders"],
    url: "https://www.almadinajeweller.com/",
    domain: "almadinajeweller.com",
    image: {
      base: "/work/almadina",
      alt: "Al-Madina Jewellers homepage showing gold bangles, a bridal necklace and the headline “Weighed Honestly, Made Beautifully”",
    },
  },
  {
    slug: "khawaja-collection",
    name: "Khawaja Collection",
    category: "Fashion · E-commerce · Digital Experience",
    description: "A premium digital shopping experience designed for a Pakistani fashion brand.",
    longDescription:
      "An online store for a Pakistani fashion brand, taking shoppers from browsing collections to checkout with cash on delivery across Pakistan.",
    features: [
      "Women, men, unstitched, ready-to-wear and bridal collections",
      "Bedsheets and accessories catalogue",
      "New arrivals and sale sections",
      "Wishlist, customer accounts and cart",
      "Order tracking",
      "Shipping, exchange and returns pages",
    ],
    tags: ["E-commerce", "Fashion", "Product Catalogue", "Customer Experience"],
    url: "https://www.khawajacollection.com/",
    domain: "khawajacollection.com",
    image: {
      base: "/work/khawaja",
      alt: "Khawaja Collection homepage with a model in a cream embroidered suit and the headline “Quiet luxury, honestly priced”",
    },
  },
];
