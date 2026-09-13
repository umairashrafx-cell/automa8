export type Shot = {
  /** Path without the width suffix, e.g. "/work/khawaja-collection/product". */
  base: string;
  alt: string;
  kind: "desktop" | "mobile";
  /** Intrinsic height of the 1440px-wide desktop image (defaults to 900). */
  height?: number;
  /** Short visible caption for gallery images. */
  caption?: string;
};

export type CaseSection = { paragraphs: string[] };

export type Project = {
  slug: string;
  name: string;
  /** Short label for the homepage. */
  shortCategory: string;
  category: string;
  subtitle: string;
  /** One line for the homepage. */
  homeDescription: string;
  /** One or two lines for the /projects page. */
  summary: string;
  location: string;
  url: string;
  domain: string;
  cover: Shot;
  caseStudy: {
    overview: CaseSection;
    challenge: CaseSection;
    approach: CaseSection;
    design: CaseSection;
    features: { title: string; description: string }[];
    development: CaseSection;
    technology: string[];
    gallery: Shot[];
  };
};

/**
 * Real, live client work only.
 *
 * Every feature below was checked against the live sites (September 2026), and the technology
 * list against each site's public HTML and JavaScript. No results, metrics or client quotes —
 * don't add anything a visitor can't verify by opening the link.
 */
export const projects: Project[] = [
  {
    slug: "al-madina-jewellers",
    name: "Al-Madina Jewellers",
    shortCategory: "E-commerce · Jewellery",
    category: "E-commerce · Jewellery · Business Platform",
    subtitle: "Digital Commerce Platform for a Jewellery Business",
    homeDescription: "A complete digital platform for a modern jewellery business.",
    summary:
      "Collections, live gold rates, gold buying, custom orders and bridal consultations — with WhatsApp built into every step.",
    location: "Sarafa Market, Mandi Bahauddin, Pakistan",
    url: "https://www.almadinajeweller.com/",
    domain: "almadinajeweller.com",
    cover: {
      base: "/work/almadina",
      alt: "Al-Madina Jewellers homepage with gold bangles, a bridal necklace and the headline “Weighed Honestly, Made Beautifully”",
      kind: "desktop",
      height: 860,
    },
    caseStudy: {
      overview: {
        paragraphs: [
          "Al-Madina Jewellers is a jewellery house in Sarafa Market, Mandi Bahauddin, making and selling 22K gold and silver jewellery.",
          "The website brings the shop’s collections, daily gold rates, gold buying, custom orders and bridal consultations into one place — for customers visiting the counter and for families ordering from elsewhere.",
        ],
      },
      challenge: {
        paragraphs: [
          "Jewellery is bought on trust. Customers want to know the day’s rate, the real weight of a piece and exactly what they are paying for before they commit.",
          "The shop already works this way at the counter — the rate is posted daily, the weight is shown openly and the making charge is told upfront. The website needed to carry the same transparency online, and still leave room for the conversations that jewellery purchases depend on.",
        ],
      },
      approach: {
        paragraphs: [
          "The site is organised around the questions customers ask first: what is today’s rate, what does this piece weigh, and how is the price calculated.",
          "Every product shows its full specification and a price breakdown. Rates, calculators and forms sit next to the products they relate to, and WhatsApp is always one tap away for anything better handled in conversation.",
        ],
      },
      design: {
        paragraphs: [
          "A deep green and gold palette with classic serif headings gives the site the feel of a traditional jewellery house, while clean layouts keep product details easy to read.",
          "Navigation mirrors how people shop for jewellery — Collections, Bridal, New Arrivals, Gold Rate, Sell Gold, Custom Order, Our Story and Stores — and a floating WhatsApp button stays within reach on every page, on desktop and mobile.",
        ],
      },
      features: [
        {
          title: "Jewellery catalogue",
          description:
            "Bridal, necklace, chokar, mala, short and ghani sets, bangles, rings, earrings, lockets & chains and silver — filterable by metal, purity, price, weight and stones.",
        },
        {
          title: "Transparent product pages",
          description:
            "SKU, purity, gross and net weight, gold charged at rate and stone weight, with a breakdown of how each price is calculated.",
        },
        {
          title: "Live gold rate board",
          description:
            "Gold piece, pathor, jewellery and silver rates per gram and per tola, with the international gold price for comparison and a shareable rate card.",
        },
        {
          title: "Gold value calculator",
          description:
            "Enter a weight and purity to see the approximate metal value before visiting the shop.",
        },
        {
          title: "Sell Your Gold",
          description:
            "Today’s buying rate, a calculator, a step-by-step explanation of how selling works and answers to common questions.",
        },
        {
          title: "Custom orders",
          description:
            "Customers can describe a piece with a photograph, a written description or a recorded voice note.",
        },
        {
          title: "Bridal consultations",
          description:
            "A dedicated bridal collection page with a consultation request form for wedding date and budget range.",
        },
        {
          title: "WhatsApp throughout",
          description:
            "Enquire about any product, confirm today’s rate, request a callback or join the rate updates list — all on WhatsApp.",
        },
        {
          title: "Reviews, wishlist and store visits",
          description:
            "Moderated customer reviews, a wishlist, sharing pieces as pictures, store viewing requests and a store page with hours and directions.",
        },
      ],
      development: {
        paragraphs: [
          "The site is a modern React application using TanStack for routing, backed by Supabase and deployed on Vercel.",
          "Product, collection and rate pages are built for search, with structured data and a sitemap, and WhatsApp links carry the product or request context so conversations start with the right details.",
        ],
      },
      technology: [
        "React",
        "TanStack",
        "Supabase",
        "Vercel",
        "WhatsApp",
        "Structured data (Schema.org)",
      ],
      gallery: [
        {
          base: "/work/al-madina-jewellers/product",
          caption: "Product page",
          alt: "Product page for the Royal Pearl Floral Gold Short Set showing SKU, purity, gross and net weight and stone weight",
          kind: "desktop",
        },
        {
          base: "/work/al-madina-jewellers/gold-rate",
          caption: "Live gold rate",
          alt: "Today’s Gold Rate in Mandi Bahauddin page with the international gold price per troy ounce and per tola",
          kind: "desktop",
        },
        {
          base: "/work/al-madina-jewellers/sell-gold",
          caption: "Sell Your Gold",
          alt: "Sell Your Gold page showing today’s gold buying rate per gram and per tola",
          kind: "desktop",
        },
        {
          base: "/work/al-madina-jewellers/custom-order",
          caption: "Custom orders",
          alt: "Custom Order page titled “Have it made” with options to show a picture, write a description or record a voice note",
          kind: "desktop",
        },
        {
          base: "/work/al-madina-jewellers/home-mobile",
          alt: "Al-Madina Jewellers homepage on a mobile phone",
          kind: "mobile",
        },
        {
          base: "/work/al-madina-jewellers/product-mobile",
          alt: "Al-Madina Jewellers product page on a mobile phone",
          kind: "mobile",
        },
      ],
    },
  },
  {
    slug: "khawaja-collection",
    name: "Khawaja Collection",
    shortCategory: "Fashion · E-commerce",
    category: "Fashion · E-commerce · Digital Experience",
    subtitle: "Premium Fashion E-commerce Experience",
    homeDescription: "A premium digital shopping experience for a fashion brand.",
    summary:
      "A curated fashion store with filtering, cash on delivery and order tracking across Pakistan.",
    location: "Mandi Bahauddin, Pakistan",
    url: "https://www.khawajacollection.com/",
    domain: "khawajacollection.com",
    cover: {
      base: "/work/khawaja",
      alt: "Khawaja Collection homepage with a model in a cream embroidered suit and the headline “Quiet luxury, honestly priced”",
      kind: "desktop",
      height: 860,
    },
    caseStudy: {
      overview: {
        paragraphs: [
          "Khawaja Collection is a clothing and fabric shop in Mandi Bahauddin with a deliberately tight, considered range.",
          "The online store sells women’s and men’s clothing — unstitched lawn and khaddar, ready-to-wear, formals and bridal — alongside bedsheets, quilt covers and accessories, with delivery across Pakistan.",
        ],
      },
      challenge: {
        paragraphs: [
          "The shop chooses its cloth piece by piece rather than stocking everything. The store needed to feel just as considered online, not like a crowded catalogue.",
          "It also had to fit the way people in Pakistan buy clothing: unstitched fabric sent to a tailor, cash on delivery, and quick questions answered before an order is placed.",
        ],
      },
      approach: {
        paragraphs: [
          "A quiet, editorial storefront lets the fabric and photography lead, with clear categories and honest pricing in PKR.",
          "Buying is shaped around local habits — cash on delivery is the default, WhatsApp enquiries sit on every product, and each order can be followed from confirmation to delivery.",
        ],
      },
      design: {
        paragraphs: [
          "A warm, neutral palette, refined serif headings and generous product photography give the store a calm, premium feel.",
          "Shoppers move through New In, Women, Men, Bedsheets, Unstitched, Ready to Wear, Bridal and Sale, then narrow results by size, colour, fabric, pieces, price, availability and discount. The layout is designed for mobile as carefully as desktop.",
        ],
      },
      features: [
        {
          title: "Curated catalogue",
          description:
            "Women, men, unstitched, ready-to-wear, bridal, bedsheets and accessories, with featured collections, new arrivals and a sale section.",
        },
        {
          title: "Filtering and sorting",
          description:
            "Filter by size, colour, fabric, pieces, price, availability and discount; sort by newest, price or best selling.",
        },
        {
          title: "Detailed product pages",
          description:
            "Colour, size and quantity selection, add to bag or buy now, a size guide, fabric details, shipping and exchange information.",
        },
        {
          title: "WhatsApp enquiries",
          description:
            "Every product has a one-tap WhatsApp enquiry for questions before ordering.",
        },
        {
          title: "Cash on delivery",
          description:
            "Cash on delivery by default across Pakistan, with free delivery on orders over PKR 5,000.",
        },
        {
          title: "Order tracking",
          description:
            "Customers follow an order through each stage using their order number and phone number or email.",
        },
        {
          title: "Accounts and wishlist",
          description: "Customer accounts and a wishlist for saving pieces to come back to.",
        },
        {
          title: "Clear customer care",
          description:
            "FAQs, shipping, exchange & returns and refund policy pages written in plain language.",
        },
      ],
      development: {
        paragraphs: [
          "The store is a modern React application using TanStack for routing, backed by Supabase and deployed on Vercel.",
          "Pages include structured data and a sitemap for search, and Google Analytics is set up to understand how shoppers use the store.",
        ],
      },
      technology: [
        "React",
        "TanStack",
        "Supabase",
        "Vercel",
        "Google Analytics",
        "Structured data (Schema.org)",
      ],
      gallery: [
        {
          base: "/work/khawaja-collection/product",
          caption: "Product page",
          alt: "Product page for a 3 piece unstitched embroidered lawn suit with add to bag, buy now and WhatsApp enquiry buttons",
          kind: "desktop",
        },
        {
          base: "/work/khawaja-collection/women",
          caption: "Women’s collection",
          alt: "Women’s collection page with filters for size, colour, fabric and pieces",
          kind: "desktop",
        },
        {
          base: "/work/khawaja-collection/track",
          caption: "Order tracking",
          alt: "Track your order page asking for an order number and phone number or email",
          kind: "desktop",
        },
        {
          base: "/work/khawaja-collection/home-mobile",
          alt: "Khawaja Collection homepage on a mobile phone",
          kind: "mobile",
        },
        {
          base: "/work/khawaja-collection/product-mobile",
          alt: "Khawaja Collection product page on a mobile phone",
          kind: "mobile",
        },
      ],
    },
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

/** srcset helpers for the pre-sized screenshots in /public/work. */
export function shotSources(shot: Shot) {
  return shot.kind === "mobile"
    ? {
        src: `${shot.base}-390.jpg`,
        srcSet: `${shot.base}-390.jpg 390w, ${shot.base}-780.jpg 780w`,
        width: 390,
        height: 844,
      }
    : {
        src: `${shot.base}-800.jpg`,
        srcSet: `${shot.base}-800.jpg 800w, ${shot.base}-1440.jpg 1440w`,
        width: 1440,
        height: shot.height ?? 900,
      };
}
