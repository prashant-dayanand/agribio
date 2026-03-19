import type {
  Grant, Agent, SysmapNode, PipelineStep, OpsCard,
  MatrixRow, DaoStatItem, DaoStep, Proposal, AllocationItem,
  FlywheelNode, LiveLead, LoadingStep
} from "./types";

// ─── SCORER ────────────────────────────────────────────────────
export const EXAMPLE_IDEAS: Record<string, string> = {
  soil: `Smallholder farmers in sub-Saharan Africa lose up to 30% of crops annually to soil nutrient deficiencies that go undetected without expensive lab testing. We're building SoilPulse — a $15 IoT sensor paired with a mobile app that delivers real-time soil health readings and AI-powered fertiliser recommendations directly to farmers' phones in local languages. Unlike agronomic consulting services costing $200+ per visit, our $12/season subscription is accessible to farms under 2 hectares. We distribute through existing fertiliser dealer networks across Kenya, Tanzania, and Nigeria. The addressable market is 200M+ smallholder farmers who currently have zero precision agriculture access.`,
  crispr: `Wheat and rice yields globally are plateauing while climate volatility intensifies. We're applying CRISPR-Cas12 gene editing to develop drought-resilient cereal crop varieties that maintain 90% of standard yield under 40% reduced water conditions. Our approach targets three specific gene loci associated with stomatal regulation, identified through our proprietary QTL mapping dataset of 12,000 varieties. Unlike GMO approaches requiring decade-long regulatory paths, our gene-edited variants qualify for expedited review in 18 key markets. We're partnering with two national seed banks for field trials beginning Q3. Target licensing model with major seed companies by year 3.`,
  aqua: `Aquaculture produces 50% of global seafood but loses $6B annually to disease outbreaks detected too late. AquaSense deploys underwater computer vision cameras and water chemistry sensors across fish pens, using ML models trained on 4M labelled images to detect behavioural anomalies and pathogen markers 8–14 days before visible outbreak signs. Our SaaS platform alerts farm managers and recommends treatment protocols, reducing mortality losses by an average of 68% in pilot trials across 12 Norwegian salmon farms. Expanding to Southeast Asian shrimp farming — a $40B market with even higher disease burden and minimal existing diagnostic infrastructure.`,
  bio: `Sepsis kills 11 million people yearly, mostly because diagnosis takes 48–72 hours via blood culture. BioTrace has developed a paper-based biosensor that detects three key sepsis biomarkers in whole blood within 90 minutes at point-of-care, requiring no lab equipment. Our electrochemical detection method achieves 94% sensitivity at a unit cost of $4, making it viable for district hospitals across emerging markets where 80% of sepsis deaths occur. We're in regulatory submission with CDSCO India and pursuing CE marking. The global sepsis diagnostics market is $780M and growing 8% annually with no dominant low-cost player.`,
  vertical: `Indoor vertical farming has proven crop quality but fails economically — energy costs consume 35–50% of revenue. VertOS is an operating system for vertical farms that integrates real-time sensor data, energy market pricing, and crop growth models to dynamically optimise lighting schedules, reducing energy consumption by 28% without compromising yield. Our AI scheduler shifts high-intensity lighting to off-peak electricity windows and adjusts spectrum composition based on growth stage predictions. We charge a $800/month SaaS fee per 1,000 sqft growing area. Currently deployed in 14 farms across the Netherlands and UK, saving an average of $2,100/month per client.`,
};

export const EXAMPLE_CHIPS = [
  { key: "soil", label: "🌱 Soil health IoT" },
  { key: "crispr", label: "🧬 CRISPR crop yield" },
  { key: "aqua", label: "🐟 Aquaculture AI" },
  { key: "bio", label: "💊 Biosensor diagnostics" },
  { key: "vertical", label: "🏗️ Vertical farming OS" },
];

export const LOADING_STEPS: LoadingStep[] = [
  { id: "ls0", label: "Indexing idea against ABVentures corpus", status: "pending" },
  { id: "ls1", label: "Evaluating problem clarity and market fit", status: "pending" },
  { id: "ls2", label: "Analysing founder-domain signal", status: "pending" },
  { id: "ls3", label: "Checking Agritech / Biotech category fit", status: "pending" },
  { id: "ls4", label: "Computing ABVentures funding probability", status: "pending" },
  { id: "ls5", label: "Generating AI insight and signals", status: "pending" },
];

export const MOCK_RESULT = {
  overall: 72, dao_chance: 58, problem_clarity: 78,
  founder_domain_fit: 65, market_timing: 74,
  verdict: "Promising" as const,
  headline: "Strong problem signal, commercial path needs sharpening",
  summary: "This idea addresses a real pain point in Agritech with meaningful market size. The technical approach is credible but the go-to-market and unit economics need more specificity to clear the ABVentures funding bar.",
  top_signals: ["Quantified market problem with real urgency", "Clear target customer segment identified", "Technology approach is technically credible for Agritech"],
  watch_outs: ["Unit economics and pricing model need validation", "Competitive moat beyond technology unclear", "Regulatory pathway not addressed"],
  ai_insight: "The core insight here is strong — identifying an underserved market segment with a real, measurable pain point is exactly what ABVentures funds. To maximise your funding probability, sharpen the defensibility story: what makes your approach uniquely hard to replicate? Add 2-3 sentences on the scientific or technical barrier that protects your position. The strongest applications show a clear path from scientific insight to commercial scale.",
};

// ─── GRANTS ────────────────────────────────────────────────────
export const GRANTS: Grant[] = [
  {
    id: "birac-big",
    flag: "🇮🇳", flagBg: "#f0f4ff",
    badges: [
      { label: "India", variant: "green" },
      { label: "Biotech", variant: "blue" },
      { label: "Non-dilutive", variant: "green" },
    ],
    org: "BIRAC · Dept of Biotechnology, Govt of India",
    name: "Biotechnology Ignition Grant (BIG)",
    description: "Promotes innovation research at startups and SMEs in biotechnology. Provides proof-of-concept funding to translate early-stage biotech research into products. Calls open twice yearly — January 1 and July 1.",
    amounts: [
      { value: "₹50L", label: "Max grant per project" },
      { value: "18 mo", label: "Max project duration" },
    ],
    meta: [
      { icon: "🎯", key: "Eligibility", value: "Startups, SMEs, individuals with innovative biotech ideas + proof of concept" },
      { icon: "📅", key: "Cycle", value: "Open twice a year: 1 Jan & 1 Jul — applications open for ~3 months" },
      { icon: "📋", key: "Requires", value: "Detailed research proposal, business plan, proof of concept or early prototype" },
    ],
    sectors: [
      { label: "Biotech R&D", type: "bio" },
      { label: "Agri-biotech", type: "agri" },
      { label: "Medtech", type: "default" },
      { label: "Diagnostics", type: "default" },
    ],
    applyUrl: "https://birac.nic.in/big.php",
    applyLabel: "Apply on BIRAC →",
    deadline: "Next: Jul 1 2026",
    deadlineSub: "Twice yearly",
    tags: ["india", "biotech", "seed", "agritech"],
  },
  {
    id: "rkvy-raftaar",
    flag: "🇮🇳", flagBg: "#f0f8f0",
    badges: [
      { label: "India", variant: "green" },
      { label: "Agritech", variant: "green" },
      { label: "Grant + Equity", variant: "amber" },
    ],
    org: "Ministry of Agriculture & Farmers Welfare",
    name: "RKVY-RAFTAAR Agri Startup Programme",
    description: "Rashtriya Krishi Vikas Yojana's flagship startup programme funding agri-innovations from ideation to market. Includes pre-incubation, incubation, and acceleration phases with cash grants at each stage.",
    amounts: [
      { value: "₹25L", label: "Seed (idea stage)" },
      { value: "₹1Cr", label: "Growth stage" },
    ],
    meta: [
      { icon: "🎯", key: "Eligibility", value: "Agritech startups, individual innovators, agri-entrepreneurs — idea to early traction" },
      { icon: "🏛️", key: "Via", value: "Accredited RKVY incubators (NAARM, MANAGE, state agri universities)" },
      { icon: "📋", key: "Requires", value: "Agritech innovation concept, no prior private equity above ₹5Cr" },
    ],
    sectors: [
      { label: "Precision Farming", type: "agri" },
      { label: "Crop Tech", type: "agri" },
      { label: "Supply Chain", type: "default" },
      { label: "Rural Fintech", type: "default" },
    ],
    applyUrl: "https://rkvy.nic.in/static/raftaar.html",
    applyLabel: "Apply via RKVY →",
    deadline: "Rolling",
    deadlineSub: "Via incubators",
    tags: ["india", "agritech", "seed", "growth"],
  },
  {
    id: "dst-nidhi",
    flag: "🇮🇳", flagBg: "#f0f4ff",
    badges: [
      { label: "India", variant: "green" },
      { label: "Deep Tech", variant: "default" },
      { label: "Non-dilutive", variant: "green" },
    ],
    org: "Dept of Science & Technology, Govt of India",
    name: "DST NIDHI — Seed Support System",
    description: "National Initiative for Developing and Harnessing Innovations provides seed funding to deep-tech and science-based startups. Specifically supports agritech, biotech, cleantech, and healthcare innovations with proof-of-concept validation grants.",
    amounts: [{ value: "₹50L", label: "Proof of concept grant" }],
    meta: [
      { icon: "🎯", key: "Eligibility", value: "Science-based startups within NIDHI-accredited incubators with innovative product idea" },
      { icon: "🏛️", key: "Via", value: "DST-supported Technology Business Incubators (TBIs) across India" },
      { icon: "✓", key: "Also offers", value: "PRAYAS pre-incubation (₹2L), EIR programme, accelerator support" },
    ],
    sectors: [
      { label: "Agritech", type: "agri" },
      { label: "Biotech", type: "bio" },
      { label: "Cleantech", type: "default" },
      { label: "Healthcare", type: "default" },
    ],
    applyUrl: "https://nidhi.dst.gov.in",
    applyLabel: "Apply on DST →",
    deadline: "Rolling",
    deadlineSub: "Via TBI incubators",
    tags: ["india", "agritech", "biotech", "seed"],
  },
  {
    id: "sisfs",
    flag: "🇮🇳", flagBg: "#fff3f0",
    badges: [
      { label: "India", variant: "green" },
      { label: "Seed Stage", variant: "green" },
      { label: "Non-dilutive", variant: "green" },
    ],
    org: "DPIIT · Startup India, Govt of India",
    name: "Startup India Seed Fund Scheme (SISFS)",
    description: "Provides financial assistance for proof of concept, prototype development, product trials, market entry, and commercialisation. Channelled through DPIIT-recognised incubators. Available to any sector including agritech and biotech.",
    amounts: [
      { value: "₹20L", label: "Grant (non-dilutive)" },
      { value: "₹50L", label: "Debt/convertible" },
    ],
    meta: [
      { icon: "🎯", key: "Eligibility", value: "DPIIT-recognised startup, incorporated <2 years, not received >₹10L prior funding" },
      { icon: "🏛️", key: "Via", value: "300+ DPIIT-recognised incubators — apply via Startup India portal" },
      { icon: "📋", key: "Requires", value: "DPIIT recognition number, pitch deck, business plan, prototype or MVP" },
    ],
    sectors: [
      { label: "Agritech", type: "agri" },
      { label: "Biotech", type: "bio" },
      { label: "Deep Tech", type: "tech" },
      { label: "Any sector", type: "default" },
    ],
    applyUrl: "https://seedfund.startupindia.gov.in",
    applyLabel: "Apply on Startup India →",
    deadline: "Rolling",
    deadlineSub: "Through incubators",
    tags: ["india", "agritech", "biotech", "seed"],
  },
  {
    id: "nabventures",
    flag: "🇮🇳", flagBg: "#f0f8f0",
    badges: [
      { label: "India", variant: "green" },
      { label: "Agritech", variant: "green" },
      { label: "Equity + Grant", variant: "amber" },
    ],
    org: "NABARD · National Bank for Agriculture & Rural Dev",
    name: "NABVENTURES Agritech Fund",
    description: "NABARD's venture capital arm financing early and growth-stage agritech startups with equity funding, mentorship, and market access. Targeting precision farming, supply chain tech, and rural fintech. NABARD is also launching a ₹1,300 Cr dedicated climate and agritech fund in 2026.",
    amounts: [{ value: "₹1,300Cr", label: "2026 fund corpus" }],
    meta: [
      { icon: "🎯", key: "Eligibility", value: "Agritech startups with traction, post-MVP — early to growth stage" },
      { icon: "📋", key: "Focus", value: "Precision farming, supply chain, rural fintech, dairy tech, climate resilience" },
      { icon: "✓", key: "Also", value: "NABARD a-IDEA incubator — grant funding + mentorship via 35+ agri universities" },
    ],
    sectors: [
      { label: "Precision Farming", type: "agri" },
      { label: "Dairy Tech", type: "agri" },
      { label: "Climate", type: "default" },
      { label: "Rural Fintech", type: "default" },
    ],
    applyUrl: "https://nabventures.in",
    applyLabel: "Apply via NABARD →",
    deadline: "Rolling",
    deadlineSub: "Expressions of interest",
    tags: ["india", "agritech", "seed", "growth"],
  },
  {
    id: "eic-accelerator",
    flag: "🇪🇺", flagBg: "#f0f2ff",
    badges: [
      { label: "EU / Global", variant: "blue" },
      { label: "Deep Tech", variant: "default" },
      { label: "Grant + Equity", variant: "amber" },
    ],
    org: "European Innovation Council · Horizon Europe",
    name: "EIC Accelerator 2026",
    description: "Europe's flagship deep-tech grant for startups and SMEs. 2026 budget is €634M. Specific challenges include Biotech for Agricultural Soil Regeneration (€50M) and Biotechnology-driven low-emission food systems. Open to non-EU startups planning EU operations.",
    amounts: [
      { value: "€2.5M", label: "Grant component" },
      { value: "€10M", label: "+ Equity investment" },
    ],
    meta: [
      { icon: "🎯", key: "Eligibility", value: "EU/Associated Country SMEs or startups; non-EU startups establishing EU entity" },
      { icon: "📅", key: "Deadlines", value: "Bimonthly 2026: Jan · Mar · May · Jul · Sep · Nov cut-offs" },
      { icon: "📋", key: "Process", value: "3 stages: short proposal → full proposal (20 pages) → jury interview" },
    ],
    sectors: [
      { label: "Agri Soil Biotech", type: "agri" },
      { label: "Low-emission Food", type: "bio" },
      { label: "Climate Adaptation", type: "tech" },
      { label: "Any Deep Tech", type: "default" },
    ],
    applyUrl: "https://eic.ec.europa.eu/eic-funding-opportunities/eic-accelerator_en",
    applyLabel: "Apply via EIC →",
    deadline: "Next: May 2026",
    deadlineSub: "6 cut-offs / year",
    tags: ["global", "biotech", "agritech", "growth", "seed"],
  },
  {
    id: "innovate-uk",
    flag: "🇬🇧", flagBg: "#f0f2ff",
    badges: [
      { label: "UK / Global", variant: "blue" },
      { label: "Agritech", variant: "green" },
      { label: "Non-dilutive", variant: "green" },
    ],
    org: "UK Research and Innovation · UKRI",
    name: "Innovate UK Agrifood & Biotech Grants",
    description: "Innovate UK funds business-led innovation across agrifood and biotech. Specific calls include Sustainable Agrifood, AgriTech Catalyst, and Bioeconomy programmes. Open to UK-registered entities — overseas startups may partner with UK organisations.",
    amounts: [
      { value: "£25K", label: "Smart Grant (small)" },
      { value: "£10M", label: "Collaborative R&D" },
    ],
    meta: [
      { icon: "🎯", key: "Eligibility", value: "UK-registered businesses; international partnerships accepted for collaborative grants" },
      { icon: "📅", key: "Cycle", value: "Rolling calls — check the Innovation Funding Service portal for active calls" },
      { icon: "✓", key: "Strong for", value: "Precision fermentation, cell ag, sustainable inputs, digital farm management" },
    ],
    sectors: [
      { label: "Agrifood Tech", type: "agri" },
      { label: "Bioeconomy", type: "bio" },
      { label: "Sustainability", type: "default" },
      { label: "Digital Farm", type: "default" },
    ],
    applyUrl: "https://www.ukri.org/councils/innovate-uk/",
    applyLabel: "Apply via Innovate UK →",
    deadline: "Rolling",
    deadlineSub: "Active calls live now",
    tags: ["global", "biotech", "agritech", "seed", "growth"],
  },
  {
    id: "eic-pathfinder",
    flag: "🇪🇺", flagBg: "#f0f2ff",
    badges: [
      { label: "EU / Global", variant: "blue" },
      { label: "Research Stage", variant: "default" },
      { label: "Non-dilutive", variant: "green" },
    ],
    org: "European Innovation Council · Horizon Europe",
    name: "EIC Pathfinder Open 2026",
    description: "Funds visionary, high-risk/high-gain research with potential to create radical new technologies. Multi-disciplinary research teams developing breakthrough science — ideal for early-stage Biotech or Agri-science research with commercial promise. Next deadline May 12, 2026.",
    amounts: [
      { value: "€4M", label: "Max per consortium" },
      { value: "€262M", label: "2026 total budget" },
    ],
    meta: [
      { icon: "🎯", key: "Eligibility", value: "Consortia of 3+ partners from EU/Associated Countries; UK orgs also eligible" },
      { icon: "📅", key: "Deadlines", value: "Open: 12 May 2026 · Challenge: 28 Oct 2026" },
      { icon: "📋", key: "Scope", value: "Breakthrough science: biotech for healthy ageing, IoT biosensors, ag-genomics" },
    ],
    sectors: [
      { label: "Biotech Research", type: "bio" },
      { label: "Ag-Genomics", type: "agri" },
      { label: "Biosensors", type: "default" },
      { label: "Deep Science", type: "tech" },
    ],
    applyUrl: "https://eic.ec.europa.eu/eic-funding-opportunities/eic-pathfinder_en",
    applyLabel: "Apply via EIC →",
    deadline: "12 May 2026",
    deadlineSub: "Open call",
    tags: ["global", "biotech", "agritech", "seed"],
  },
  {
    id: "birac-bipp",
    flag: "🇮🇳", flagBg: "#f0f4ff",
    badges: [
      { label: "India", variant: "green" },
      { label: "Biotech", variant: "blue" },
      { label: "Industry Partner", variant: "amber" },
    ],
    org: "BIRAC · Dept of Biotechnology, Govt of India",
    name: "BIRAC BIPP — Industry Partnership",
    description: "Biotech Industry Partnership Programme connects startups and SMEs with public sector R&D institutes to enable product development. Encourages startup-industry collaboration for translation of biotech research leads into commercially viable products.",
    amounts: [{ value: "₹2Cr", label: "Per project (up to)" }],
    meta: [
      { icon: "🎯", key: "Eligibility", value: "Biotech startups + SMEs collaborating with recognised public R&D institutions" },
      { icon: "📅", key: "Cycle", value: "Call for proposals issued periodically — check BIRAC portal for open calls" },
      { icon: "📋", key: "Requires", value: "Joint application with public R&D partner, product development roadmap" },
    ],
    sectors: [
      { label: "Pharma / Drug Dev", type: "bio" },
      { label: "Agri-Biotech", type: "agri" },
      { label: "Diagnostics", type: "bio" },
      { label: "Vaccines", type: "default" },
    ],
    applyUrl: "https://birac.nic.in",
    applyLabel: "Apply on BIRAC →",
    deadline: "Rolling",
    deadlineSub: "Check active calls",
    tags: ["india", "biotech", "growth", "seed"],
  },
];

// ─── DAO ───────────────────────────────────────────────────────
export const DAO_STATS: DaoStatItem[] = [
  { icon: "🗳️", value: "14", label: "Governance Proposals", sub: "12 passed · 2 active" },
  { icon: "💰", value: "$1.8M", label: "Funding Deployed", sub: "Batch 1–3 · 3 startups" },
  { icon: "🔒", value: "18.4M", label: "$HASHS Staked", sub: "74% of circulating supply" },
  { icon: "📈", value: "$208K", label: "Portfolio ARR", sub: "Growing 3 active startups" },
];

export const DAO_STEPS: DaoStep[] = [
  {
    number: "01", icon: "🔬",
    title: "Startup meets on-chain criteria",
    description: "Only startups whose product or core operations have a genuine on-chain use case are eligible for DAO funding — verified during the AI screening process.",
  },
  {
    number: "02", icon: "🗳️",
    title: "$HASHS holders vote to fund",
    description: "Token holders review the AI-generated score and on-chain proposal. 1 $HASHS = 1 vote. A simple on-chain majority passes the allocation from the DAO treasury.",
  },
  {
    number: "03", icon: "🤖",
    title: "AI Lab activates on Day 1",
    description: "Funding confirmed. All 8 ABventures AI agents go live immediately. Marketing, Sales, and Ops run on autopilot. Founders go straight into the lab that morning.",
  },
  {
    number: "04", icon: "🏆",
    title: "Impact logged → $HASHS rewards",
    description: "Every verified on-chain impact event — a scan, experiment, farm deployment, patent — automatically triggers $HASHS reward distribution to founders, mentors, and researchers.",
  },
];

export const PROPOSALS: Proposal[] = [
  { id: "ABV-014", title: "Expand Batch 4 to 8 startups from 6 — Agritech slots", status: "active", forPct: 80, forCount: "12,840", againstCount: "3,210", timeLabel: "3 days remaining" },
  { id: "ABV-013", title: "Allocate 120,000 $HASHS to AgriTech mentorship pool Q2", status: "passed", forPct: 92, forCount: "19,400", againstCount: "1,800", timeLabel: "Closed" },
  { id: "ABV-012", title: "Partner with CGIAR for Africa Agritech accelerator cohort", status: "passed", forPct: 71, forCount: "9,800", againstCount: "4,100", timeLabel: "Closed" },
  { id: "ABV-011", title: "Increase AI Lab compute budget by 40% for Batch 3", status: "passed", forPct: 88, forCount: "16,900", againstCount: "2,300", timeLabel: "Closed" },
];

export const TOKEN_ALLOCATIONS: AllocationItem[] = [
  { color: "#8b5cf6", label: "DAO Treasury", pct: 35 },
  { color: "#22c55e", label: "Founder & Researcher Rewards", pct: 25 },
  { color: "#c8913e", label: "Ecosystem Growth", pct: 20 },
  { color: "#60a5fa", label: "Core Team", pct: 12 },
  { color: "rgba(0,0,0,0.2)", label: "Reserve", pct: 8 },
];

export const FLYWHEEL_NODES: FlywheelNode[] = [
  { icon: "🌱", title: "Verified impact delivered", sub: "Scans, experiments, farm deployments logged on-chain", colorClass: "bg-green-50 border-green-200" },
  { icon: "🏆", title: "$HASHS rewards issued", sub: "Founders & researchers earn tokens automatically", colorClass: "bg-purple-50 border-purple-200" },
  { icon: "🗳️", title: "DAO votes on next batch", sub: "Token holders fund highest-scoring proposals", colorClass: "bg-purple-50 border-purple-200" },
  { icon: "💰", title: "New startups funded", sub: "Cash deployed. AI Lab activates Day 1.", colorClass: "bg-amber-50 border-amber-200" },
  { icon: "🔄", title: "$HASHS value compounds", sub: "More impact → stronger demand → bigger ecosystem", colorClass: "bg-violet-50 border-violet-200" },
  { icon: "🤖", title: "AI Lab drives growth", sub: "8 agents compound marketing, sales & ops", colorClass: "bg-green-50 border-green-200" },
];

// ─── AI LAB ────────────────────────────────────────────────────
export const AGENTS: Agent[] = [
  { number: "01", icon: "🧠", name: "Memory Agent", colorVariant: "green", tagLabel: "Foundation layer · Always running", description: "Builds and maintains a living profile of your startup — ingesting all onboarding data, brand voice, credentials, products, and target markets. Continuously updates a shared memory layer used by every other agent." },
  { number: "02", icon: "🎯", name: "Strategy Agent", colorVariant: "green", tagLabel: "Content blueprint · Weekly refresh", description: "Turns research into a content blueprint. Clusters high-intent keywords, selects page types for each, and maps every piece of content to a specific question your ideal buyer is asking." },
  { number: "03", icon: "🔍", name: "Research Agent", colorVariant: "blue", tagLabel: "Search intelligence · Real-time", description: "Scans Google, ChatGPT, Perplexity, and other AI search engines to identify what your buyers are actively searching for right now. Analyses what currently ranks, surfaces high-intent gaps." },
  { number: "04", icon: "✍️", name: "Content & Design Agent", colorVariant: "earth", tagLabel: "Brand-matched · 100+ pages", description: "Generates landing pages, scientific guides, and FAQs in your brand voice — designed with your colours, fonts, and layout so everything feels native to your startup." },
  { number: "05", icon: "📡", name: "AI Feeds Agent", colorVariant: "green", tagLabel: "AI search ready · Day 1", description: "Creates a structured AI Feed on your website — a machine-readable content protocol that makes your startup instantly citable by ChatGPT, Gemini, Perplexity, Claude, and Grok." },
  { number: "06", icon: "🚀", name: "Publishing Agent", colorVariant: "green", tagLabel: "Auto-publish · Full SEO", description: "Publishes content directly to your website's resource hub. Structures every page so Google and AI crawlers instantly index them. Handles metadata, schema markup, and internal linking." },
  { number: "07", icon: "🔗", name: "Backlinking Agent", colorVariant: "blue", tagLabel: "Authority building · Ongoing", description: "Builds citations and references across trusted third-party sites and the ABVentures partner network. Signals to search engines and AI models that your startup's content is credible." },
  { number: "08", icon: "📈", name: "Optimisation Agent", colorVariant: "amber", tagLabel: "Self-improving · Compound growth", description: "Monitors rankings, traffic patterns, and lead quality continuously. Identifies which pages drive qualified leads and which are underperforming. Triggers rewrites and rebuilds based on real data." },
];

export const SYSMAP_NODES: SysmapNode[] = [
  { icon: "🔬", title: "Founder applies", who: "Founder", description: "Submits Agritech / Biotech idea. AI scores Problem, Market, Founder-Domain fit." },
  { icon: "🗳️", title: "Funding review", who: "ABVentures + DAO", description: "Applications reviewed by the ABVentures team. On-chain eligible startups enter decentralised funding review.", isDark: true },
  { icon: "🤖", title: "AI Lab activates", who: "ABventures AI Lab", description: "All 8 agents go live on Day 1. Marketing, Sales, and Ops fully automated. Founder opens lab.", isActive: true },
  { icon: "📈", title: "Leads + growth", who: "AI Lab", description: "100+ pages live in 90 days. 5–10 qualified inbound leads per month by month 4." },
  { icon: "⛓️", title: "Impact on-chain", who: "On-chain logging", description: "Verified scientific and commercial milestones logged on-chain by Ops suite automatically." },
  { icon: "🏆", title: "Rewards issued", who: "Founder + Researchers", description: "Founders, mentors, and researchers earn on-chain rewards for every verified impact milestone.", isActive: true },
];

export const PIPELINE_STEPS: PipelineStep[] = [
  { number: "01", title: "Research Agent maps buyer intent", agentLabel: "Research Agent", agentVariant: "blue", description: "Scans millions of real searches on Google, ChatGPT, and AI tools to find the exact phrases your ideal Agritech or Biotech buyer uses when they need your solution right now." },
  { number: "02", title: "Content answers every query", agentLabel: "Content + Publishing Agents", agentVariant: "earth", description: "For every search query, a dedicated landing page, guide, or FAQ is built and published — so your startup is the answer when buyers search on Google or ask any AI tool." },
  { number: "03", title: "Visitors captured and scored", agentLabel: "Leads Dashboard", agentVariant: "green", description: "Every visitor is automatically tracked. Spam is filtered. Intent is scored based on pages viewed, time spent, and query source. Only high-quality leads are surfaced." },
  { number: "04", title: "Alerts only for leads that matter", agentLabel: "Smart Alerts", agentVariant: "amber", description: "You're notified only when a qualified, high-intent lead arrives. Source-attributed. Full context. Act directly from the dashboard — no scrolling through noise." },
  { number: "05", title: "Optimisation compounds results", agentLabel: "Optimisation Agent", agentVariant: "green", description: "The Optimisation Agent tracks which pages generate the best leads and rebuilds underperforming ones automatically. Lead quality and volume improve every single cycle." },
];

export const OPS_CARDS: OpsCard[] = [
  { icon: "🎯", name: "OKR Tracking", colorVariant: "green", description: "Weekly OKR summaries auto-generated from live platform data. No manual input. Flags off-track objectives with suggested corrective actions.", bullets: ["Auto-syncs from leads, content, and backlink data", "Flags off-track objectives with suggested fixes", "Quarterly reviews drafted automatically", "Shared with co-founders and board in one click"] },
  { icon: "📧", name: "Investor Update Drafting", colorVariant: "blue", description: "Monthly investor updates written and formatted automatically. Pulls live metrics, lead counts, and OKR status. Founder reviews and sends in 5 minutes.", bullets: ["Pulls live leads, rankings, and growth metrics", "Professional format — email or PDF-ready", "Founder edits and hits send in <5 mins", "Historical updates stored and tracked"] },
  { icon: "⛓️", name: "On-chain Impact Logging", colorVariant: "purple", description: "Verified scientific and commercial milestones logged on-chain for transparent DAO accountability. Required for on-chain reward distribution.", bullets: ["Immutable, publicly auditable on Ethereum", "Feeds directly into on-chain reward triggers", "Covers scans, experiments, deployments, patents", "Enables transparent DAO governance data"] },
  { icon: "📊", name: "Content Management Suite", colorVariant: "amber", description: "Plugs into any website. Pages refresh as markets shift, new pages launch for emerging queries, and all content stays optimised — automatically.", bullets: ["Old pages refreshed as trends change", "New pages for every new buyer query", "Full CMS — no dev, no writer needed", "Works on any web platform"] },
  { icon: "💬", name: "AI Lab Chat", colorVariant: "green", description: "Ask anything about your startup's performance in natural language. Get instant answers grounded in your actual platform data, not generic advice.", bullets: ["Natural language queries over your data", "Strategy and competitive intelligence on demand", "Market positioning and scientific trend analysis", "Available 24/7, instant responses"] },
  { icon: "🗓️", name: "Weekly Dashboard", colorVariant: "amber", description: "One Monday-morning view with every metric that matters. Leads, rankings, OKR status, impact milestones — all in a single, actionable dashboard.", bullets: ["Full company overview in under 10 mins", "Automated alerts for items needing action", "Shareable with co-founders and investors", "Links directly to on-chain impact log"] },
];

export const MATRIX_ROWS: MatrixRow[] = [
  { task: "Product R&D / Lab work", founder: { check: "✓", label: "Fully owned", variant: "yes" }, ailab: { check: "—", label: "Not involved", variant: "no" }, dao: { check: "—", label: "Not involved", variant: "no" } },
  { task: "Patents & IP development", founder: { check: "✓", label: "Fully owned", variant: "yes" }, ailab: { check: "—", label: "Not involved", variant: "no" }, dao: { check: "—", label: "Not involved", variant: "no" } },
  { task: "Marketing & content", founder: { check: "—", label: "Reviews only", variant: "no" }, ailab: { check: "✓", label: "8 agents automated", variant: "yes" }, dao: { check: "—", label: "Not involved", variant: "no" } },
  { task: "Inbound lead generation", founder: { check: "—", label: "Receives alerts", variant: "recv" }, ailab: { check: "✓", label: "Captures & scores", variant: "yes" }, dao: { check: "—", label: "Not involved", variant: "no" } },
  { task: "OKR tracking & reporting", founder: { check: "—", label: "Reviews weekly", variant: "recv" }, ailab: { check: "✓", label: "Auto-generates", variant: "yes" }, dao: { check: "—", label: "Not involved", variant: "no" } },
  { task: "Investor updates", founder: { check: "—", label: "Approves & sends", variant: "recv" }, ailab: { check: "✓", label: "Drafts automatically", variant: "yes" }, dao: { check: "—", label: "Not involved", variant: "no" } },
  { task: "On-chain impact logging", founder: { check: "—", label: "Reviews", variant: "recv" }, ailab: { check: "✓", label: "Compiles data", variant: "yes" }, dao: { check: "✓", label: "Logs on-chain", variant: "yes" } },
  { task: "Funding decisions", founder: { check: "—", label: "Submits proposal", variant: "recv" }, ailab: { check: "—", label: "AI scores", variant: "no" }, dao: { check: "✓", label: "DAO votes on-chain", variant: "yes" } },
  { task: "Treasury deployment", founder: { check: "—", label: "Not involved", variant: "no" }, ailab: { check: "—", label: "Not involved", variant: "no" }, dao: { check: "✓", label: "Voted on-chain", variant: "yes" } },
  { task: "On-chain reward distribution", founder: { check: "↓", label: "Receives", variant: "recv" }, ailab: { check: "—", label: "Not involved", variant: "no" }, dao: { check: "✓", label: "Distributes on-chain", variant: "yes" } },
];

export const LIVE_LEADS: LiveLead[] = [
  { name: "PrecisionScan Agri", meta: "ChatGPT + Google · Crop diagnostic queries", count: "3,841", delay: 0 },
  { name: "BioLab Nexus", meta: "Perplexity + backlinks · Bioprocess queries", count: "1,209", delay: 500 },
  { name: "HydroFarm AI", meta: "Gemini + organic · Vertical farming queries", count: "2,104", delay: 1000 },
];

export const TICKER_ITEMS = [
  { label: "🧠 Brand memory built", highlight: false },
  { label: "🔍 Buyer searches mapped", highlight: false },
  { label: "🎯 Page blueprint created", highlight: false },
  { label: "✍️ 100+ pages generated", highlight: false },
  { label: "🚀 Published to website", highlight: false },
  { label: "🔗 Backlinks built across web", highlight: false },
  { label: "✓ AI cites your startup", highlight: true },
  { label: "📊 Qualified leads arrive", highlight: false },
  { label: "📈 Optimisation Agent refines", highlight: false },
];
