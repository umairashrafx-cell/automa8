export type Service = {
  slug: string;
  title: string;
  summary: string;
  what: string;
  whoFor: string;
  problems: string[];
  included: string[];
  workflow: string[];
  /** Slugs of real, published projects that show this service. Leave empty rather than stretch. */
  relatedProjects: string[];
};

export const services: Service[] = [
  {
    slug: "ai-agents",
    title: "AI Agents",
    summary:
      "Customer support, sales assistants, WhatsApp agents and intelligent business assistants.",
    what: "AI assistants that answer questions, qualify enquiries and handle routine conversations on WhatsApp, your website or internal tools — using your own products, prices and policies, and handing over to a person when it matters.",
    whoFor:
      "Businesses that answer the same questions every day: shops, service businesses, clinics and sales teams that lose time or leads to slow replies.",
    problems: [
      "Customers waiting for answers outside working hours",
      "Staff time spent repeating the same information",
      "Enquiries going cold before anyone replies",
      "Inconsistent answers from different people",
    ],
    included: [
      "Conversation design and tone of voice",
      "Knowledge prepared from your own content",
      "WhatsApp, website or internal tool integration",
      "Clear handover to a human",
      "Testing with real questions before launch",
    ],
    workflow: [
      "Map the conversations",
      "Prepare the knowledge",
      "Build and connect",
      "Test and refine",
      "Launch and monitor",
    ],
    relatedProjects: [],
  },
  {
    slug: "business-automation",
    title: "Business Automation",
    summary:
      "Automated workflows connecting forms, CRM, WhatsApp, email, databases and business operations.",
    what: "Workflows that move information between the tools you already use — forms, CRM, WhatsApp, email, spreadsheets and databases — so enquiries, orders and follow-ups happen without manual copying.",
    whoFor:
      "Teams that re-enter the same data in several places, chase follow-ups by hand, or rely on one person remembering every step.",
    problems: [
      "Manual data entry and copy-paste between tools",
      "Missed or late follow-ups",
      "Errors from repeated manual steps",
      "No single place to see what is happening",
    ],
    included: [
      "Mapping the current process",
      "Automated workflows between your tools",
      "Notifications and follow-up sequences",
      "Error handling and logging",
      "Documentation your team can use",
    ],
    workflow: [
      "Map the process",
      "Design the workflow",
      "Build the integrations",
      "Test with real data",
      "Launch and hand over",
    ],
    relatedProjects: [],
  },
  {
    slug: "websites-ecommerce",
    title: "Websites & E-commerce",
    summary: "Modern business websites, online stores and custom web applications.",
    what: "Fast, modern websites and online stores designed around how your customers actually buy — from the first visit to the enquiry, order or booking.",
    whoFor:
      "Businesses that need a credible online presence or want to sell online, including shops moving an in-store experience onto the web.",
    problems: [
      "An outdated website that doesn’t reflect the business",
      "Customers who can’t find information or products easily",
      "Enquiries and orders that depend on phone calls alone",
      "A store that doesn’t work well on mobile",
    ],
    included: [
      "UX and visual design",
      "Catalogue, product and content pages",
      "Checkout, enquiry or booking flows",
      "WhatsApp and email integration",
      "Search foundations: structured data and sitemap",
      "Deployment and launch",
    ],
    workflow: [
      "Discover the business",
      "Design the experience",
      "Build the site",
      "Connect the tools",
      "Launch and improve",
    ],
    relatedProjects: ["al-madina-jewellers", "khawaja-collection"],
  },
  {
    slug: "ai-business-systems",
    title: "AI Business Systems",
    summary: "Complete systems combining websites, AI, databases, APIs and automation.",
    what: "A connected system rather than separate tools: a website or app, a database, AI features and automated workflows designed to work together around one business process.",
    whoFor:
      "Businesses whose operations have outgrown spreadsheets and disconnected apps, and that want one system built around how they work.",
    problems: [
      "Information spread across disconnected tools",
      "Processes that don’t scale beyond a few people",
      "No clear view of customers, orders or requests",
      "Off-the-shelf software that doesn’t fit the workflow",
    ],
    included: [
      "System and data design",
      "Web application and database",
      "AI features where they add real value",
      "APIs and automated workflows",
      "Deployment, testing and ongoing improvement",
    ],
    workflow: [
      "Understand the operation",
      "Design the system",
      "Build the core",
      "Add AI and automation",
      "Launch and iterate",
    ],
    relatedProjects: [],
  },
];
