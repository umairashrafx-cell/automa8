export type Project = {
  slug: string;
  name: string;
  category: string;
  description: string;
  url: string;
  domain: string;
  image: { base: string; alt: string };
};

/**
 * Real, live client work only. Don't add anything here that a visitor can't verify by
 * opening the link.
 */
export const projects: Project[] = [
  {
    slug: "al-madina-jewellers",
    name: "Al-Madina Jewellers",
    category: "E-commerce · Jewellery · Digital Platform",
    description:
      "A complete digital platform for a traditional jewellery business, bringing products, gold rates, custom orders and customer communication into one modern experience.",
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
    description:
      "A modern e-commerce experience designed to present fashion collections beautifully and make online shopping simple.",
    url: "https://www.khawajacollection.com/",
    domain: "khawajacollection.com",
    image: {
      base: "/work/khawaja",
      alt: "Khawaja Collection homepage with a model in a cream embroidered suit and the headline “Quiet luxury, honestly priced”",
    },
  },
];
