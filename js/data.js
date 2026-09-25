/* =============================================================
   data/ — single source of truth (from resume)
   Edit this file to update the portfolio. Nothing else needed.
   ============================================================= */

export const profile = {
  first: "KRISHNA",
  last: "JOSHI",
  initials: "KJ",
  title: "Software Engineer",
  tagline: ["I build systems that move", "data, ideas & people."],
  descriptor: "Full-stack development, cloud data engineering and AI / Generative AI solutions.",
  status: ["Software Engineer", "Cloud", "Full Stack", "AI"],
  email: "krishnajoshi177.in@gmail.com",
  phone: "7976309141",
  phoneHref: "tel:7976309141",
  resume: "resume.pdf",
  // ---- EDITABLE PLACEHOLDERS: add real URLs when available ----
  links: {
    linkedin: "", // e.g. "https://linkedin.com/in/…"
    github: "", // e.g. "https://github.com/…"
  },
  about: [
    "Software Engineer working across cloud, data engineering, backend and AI-driven solutions with Python, SQL, Azure, .NET, React.js, REST APIs and Git-based workflows.",
    "Hands-on exposure to AI / Generative AI — Azure AI Services, GitHub Copilot, Prompt Engineering, LangChain and RAG concepts — applied to scalable web platforms, backend services and data pipelines.",
  ],
  aboutPillars: [
    "SOFTWARE DEVELOPMENT",
    "FULL-STACK WEB",
    "CLOUD / DATA ENGINEERING",
    "AI / GENERATIVE AI",
  ],
};

/* Hero orbit panel — x/y are % positions inside the panel */
export const systemNodes = [
  { idx: "01", label: "FRONTEND", meta: "React.js / JS", x: 8, y: 32 },
  { idx: "02", label: "BACKEND", meta: "Node / REST APIs", x: 56, y: 20 },
  { idx: "03", label: "DATA", meta: "SQL / NoSQL", x: 8, y: 72 },
  { idx: "04", label: "CLOUD", meta: "Azure / ADF", x: 60, y: 64 },
  { idx: "05", label: "AI", meta: "RAG / LangChain", x: 38, y: 47 },
];

export const metrics = [
  { value: 3000, suffix: "+", label: "PORTS", note: "C-Hub platform scale" },
  { value: 100000, suffix: "+", label: "VESSELS", note: "C-Hub platform scale" },
  { value: 24, suffix: "×7", label: "UPTIME", note: "Platform availability" },
  { value: 70, prefix: "~", suffix: "%", label: "SYSTEM EFFICIENCY", note: "Backend / data layer" },
];

export const experience = [
  {
    company: "LTIMindtree",
    role: "Software Engineer",
    period: "Nov 2025 — Present",
    current: true,
    points: [
      "Working on cloud, data engineering, backend and AI-driven solutions using Python, SQL, Azure, .NET, React.js, REST APIs and Git-based development workflows.",
      "Contributing to application development, automation, cloud technologies and Generative AI initiatives while continuously upskilling in Kubernetes, Azure AI and modern software engineering practices.",
    ],
    tags: ["Python", "SQL", "Azure", ".NET Core", "React.js", "REST APIs", "Git"],
  },
  {
    company: "Integrated Maritime Exchange (IME)",
    role: "Software Engineer Intern / Software Engineer",
    period: "May 2025 — Oct 2025",
    current: false,
    points: [
      "Contributed to the development of a large-scale maritime platform supporting analytics, vessel intelligence, academic portals and customer-facing digital solutions.",
      "Designed and developed full-stack features using React.js, Node.js, Python, MySQL, NoSQL, REST APIs and Git, focusing on performance, scalability and user experience across maritime products.",
    ],
    tags: ["React.js", "Node.js", "Python", "MySQL", "NoSQL", "REST APIs", "Git"],
  },
];

export const projects = [
  {
    id: "p01",
    index: "01",
    title: "C-Hub Maritime Platform & Market Analytics",
    short: "C-HUB MARITIME PLATFORM",
    org: "Integrated Maritime Exchange (IME)",
    year: "2025",
    visual: "network",
    layout: "full",
    summary:
      "A scalable maritime data and analytics platform serving vessel intelligence, market rates and customer-facing modules at global scale.",
    context:
      "Maritime operations data is fragmented across ports, vessels and rate movements. C-Hub consolidates it into one analytics surface available around the clock.",
    role: "Full-stack development — backend and data layers, analytics modules, customer-facing features.",
    work: [
      "Developed a scalable maritime data and analytics platform supporting 3,000+ ports and 100,000+ vessels with 24×7 uptime.",
      "Designed distributed backend and data layers using MySQL and NoSQL, improving system efficiency by approximately 70%.",
      "Built market analytics for real-time rate trends, daily movement tracking and historical data analysis.",
      "Delivered customer-facing modules including maritime calculators and a mobile-first academic portal.",
    ],
    impact: [
      { k: "3,000+", v: "Ports supported" },
      { k: "100,000+", v: "Vessels supported" },
      { k: "24×7", v: "Uptime" },
      { k: "~70%", v: "System efficiency" },
    ],
    tech: ["MySQL", "NoSQL", "JavaScript", "React.js", "Node.js", "Python", "Git"],
  },
  {
    id: "p02",
    index: "02",
    title: "Academic Portal & Maritime Calculators",
    short: "ACADEMIC PORTAL & CALCULATORS",
    org: "Integrated Maritime Exchange (IME)",
    year: "2025",
    visual: "product",
    layout: "split",
    summary:
      "An educational portal and responsive maritime calculators built to improve customer self-service workflows.",
    context:
      "Customers needed to run maritime calculations and access learning content without support intervention — on any device.",
    role: "Front-end architecture, reusable component system, portal structure and REST API integration.",
    work: [
      "Built an educational portal and responsive maritime calculators to improve customer self-service workflows.",
      "Created mobile-first UI/UX and reusable front-end components for calculators and learning modules.",
      "Implemented portal structure and content management flows for maritime student learning content.",
      "Integrated REST APIs and optimized page performance for always-on availability.",
    ],
    impact: [
      { k: "Mobile-first", v: "UI/UX approach" },
      { k: "Reusable", v: "Component system" },
      { k: "Always-on", v: "Availability" },
    ],
    tech: ["JavaScript", "React.js", "Node.js", "Git", "REST APIs"],
  },
  {
    id: "p03",
    index: "03",
    title: "Azure Data Migration & Automated Ingestion Pipeline",
    short: "AZURE INGESTION PIPELINE",
    org: "Cloud / Data Engineering",
    year: "2026",
    visual: "pipeline",
    layout: "wide",
    summary:
      "An Azure Data Factory ingestion pipeline automating movement of structured and unstructured data into Azure Blob Storage.",
    context:
      "Data spread across Azure SQL and cloud storage had to land reliably in Blob Storage on a schedule, with minimal manual effort.",
    role: "Pipeline design — linked services, datasets, copy activity and trigger configuration.",
    work: [
      "Designed an Azure Data Factory-based ingestion pipeline to automate movement of structured and unstructured data from Azure SQL and cloud storage into Azure Blob Storage.",
      "Created linked services to securely connect Azure SQL, cloud storage and Azure Blob Storage.",
      "Defined datasets for structured and unstructured sources to support repeatable ingestion workflows.",
      "Configured Copy Activity and scheduled triggers to enable reliable automated data movement with minimal manual effort.",
    ],
    impact: [
      { k: "Automated", v: "Scheduled movement" },
      { k: "Repeatable", v: "Dataset-driven" },
      { k: "Minimal", v: "Manual effort" },
    ],
    tech: [
      "Azure Data Factory",
      "Azure SQL",
      "Azure Blob Storage",
      "Cloud Storage",
      "Copy Activity",
      "Linked Services",
      "Datasets",
      "Triggers",
    ],
  },
  {
    id: "p04",
    index: "04",
    title: "RAG-based Document Q&A Assistant using Azure OpenAI",
    short: "RAG DOCUMENT Q&A",
    org: "AI / Generative AI",
    year: "2026",
    visual: "rag",
    layout: "split-reverse",
    summary:
      "A GenAI document question-answering assistant that retrieves relevant context from uploaded documents and generates concise answers.",
    context:
      "Answering questions buried inside long documents requires retrieval before generation — not a raw prompt to a model.",
    role: "Retrieval workflow design, prompt engineering and exploration of LangChain / RAG patterns.",
    work: [
      "Built a GenAI-based document question-answering assistant to retrieve relevant context from uploaded documents and generate concise answers using Azure OpenAI and RAG concepts.",
      "Designed a retrieval workflow to process document content and provide context-aware responses.",
      "Applied prompt engineering to improve answer relevance, clarity and consistency.",
      "Explored LangChain and RAG concepts for knowledge search, semantic retrieval and document-based Q&A workflows.",
    ],
    impact: [
      { k: "Context-aware", v: "Responses" },
      { k: "Semantic", v: "Retrieval workflow" },
      { k: "Prompt-tuned", v: "Answer consistency" },
    ],
    tech: [
      "Python",
      "Azure OpenAI",
      "Azure AI Services",
      "LangChain",
      "RAG Concepts",
      "Prompt Engineering",
      "GitHub Copilot",
    ],
  },
];

export const skills = [
  { group: "PROGRAMMING", items: ["Python", "Java", "SQL"] },
  { group: "FRONTEND", items: ["React.js", "HTML", "CSS", "JavaScript"] },
  { group: "BACKEND", items: ["Node.js", "REST APIs", ".NET Core"] },
  { group: "CLOUD", items: ["Azure Data Factory", "Azure AI Services"] },
  { group: "DATABASES", items: ["MySQL", "NoSQL"] },
  {
    group: "AI / GENAI",
    items: ["Azure AI", "Prompt Engineering", "LangChain", "RAG Concepts", "GitHub Copilot"],
  },
  { group: "TOOLS", items: ["Git", "GitHub", "VS Code"] },
];

/* Maps a skill to the projects that use it. */
export const skillProjectMap = {
  Python: ["p01", "p04"],
  Java: [],
  SQL: ["p03"],
  "React.js": ["p01", "p02"],
  HTML: ["p01", "p02"],
  CSS: ["p01", "p02"],
  JavaScript: ["p01", "p02"],
  "Node.js": ["p01", "p02"],
  "REST APIs": ["p02"],
  ".NET Core": [],
  "Azure Data Factory": ["p03"],
  "Azure AI Services": ["p04"],
  MySQL: ["p01"],
  NoSQL: ["p01"],
  "Azure AI": ["p04"],
  "Prompt Engineering": ["p04"],
  LangChain: ["p04"],
  "RAG Concepts": ["p04"],
  "GitHub Copilot": ["p04"],
  Git: ["p01", "p02"],
  GitHub: ["p01", "p02"],
  "VS Code": ["p01", "p02", "p03", "p04"],
};

export const learning = [
  { name: "Microsoft Azure AI & AZ-900", state: "COMPLETED", note: "Core Azure AI services and concepts." },
  {
    name: "Kubernetes",
    state: "IN PROGRESS",
    note: "Container orchestration, deployment workflows, cloud-native application management.",
  },
  { name: "Generative AI & GitHub Copilot", state: "COMPLETED", note: "Developer productivity with GenAI tooling." },
  {
    name: ".NET, C# & GitHub Actions",
    state: "COMPLETED",
    note: "Backend development, version control and CI/CD automation.",
  },
];

export const education = [
  {
    degree: "B.Tech — Computer Science & Engineering",
    school: "Graphic Era Hill University, Dehradun",
    score: "CGPA 8.00",
    year: "2025",
  },
  {
    degree: "Class 12 — Non-Medical",
    school: "Kendriya Vidyalaya Suratgarh Cantt, Rajasthan",
    score: "91.8%",
    year: "2021",
  },
  {
    degree: "Class 10",
    school: "Kendriya Vidyalaya Suratgarh Cantt, Rajasthan",
    score: "91.8%",
    year: "2019",
  },
];

export const nav = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];
