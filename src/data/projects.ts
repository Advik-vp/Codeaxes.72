import type { Project } from '../types/project.ts'
import { createProjectThumbnail } from '../utils/thumbnails.ts'

export const projects: Project[] = [
  {
    id: 'nimbus-mind',
    title: 'NimbusMind',
    description:
      'An AI knowledge workspace that turns scattered documents into searchable, cited answers for product and research teams.',
    thumbnail: createProjectThumbnail({
      title: 'NimbusMind',
      from: '#08111f',
      to: '#12344a',
      accent: '#5ce1ff',
      motif: 'orbit',
    }),
    technologies: ['React', 'TypeScript', 'Python', 'AI', 'PostgreSQL'],
    tags: ['AI', 'SaaS', 'Web App'],
    githubUrl: 'https://github.com/topics/artificial-intelligence',
    liveUrl: 'https://react.dev',
    overview:
      'NimbusMind helps teams capture institutional knowledge without forcing a new writing ritual. Users drop in specs, tickets, and research notes. A retrieval pipeline chunks the corpus, stores embeddings, and answers questions with citations back to source passages so engineers can trust the result before they act.',
    features: [
      'Semantic search across PDFs, Markdown, and issue exports',
      'Answer cards with inline citations and confidence cues',
      'Collections for squads, products, and incident retrospectives',
      'Prompt templates for RFCs, onboarding, and postmortems',
      'Exportable briefings for stakeholders who never open the corpus',
    ],
    architecture:
      'Frontend — React, TypeScript, and a streaming chat workspace\nAPI Layer — REST plus server-sent events for token streaming\nBackend — Python retrieval service with chunking and reranking\nDatabase — PostgreSQL for documents, pgvector for embeddings\nAI / External Services — hosted embedding and completion models',
    challenges: [
      'Keeping citation fidelity when chunks overlap or documents are updated',
      'Streaming answers without layout shift in dense knowledge cards',
      'Controlling retrieval cost as private corpora grow into the millions of tokens',
    ],
    featured: true,
  },
  {
    id: 'pulsecare',
    title: 'PulseCare',
    description:
      'A healthcare operations platform that coordinates clinics, clinicians, and patients around a single care timeline.',
    thumbnail: createProjectThumbnail({
      title: 'PulseCare',
      from: '#07151a',
      to: '#0f3b36',
      accent: '#4ade80',
      motif: 'nodes',
    }),
    technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    tags: ['Healthcare', 'SaaS', 'Web App'],
    githubUrl: 'https://github.com/topics/health',
    overview:
      'PulseCare replaces disconnected spreadsheets with a shared care graph. Clinics schedule encounters, capture structured notes, and message patients through one interface. Role-aware views keep clinical, front-desk, and billing staff aligned without exposing protected details they do not need.',
    features: [
      'Care timeline that unifies visits, labs, and follow-ups',
      'Role-based work queues for clinicians and coordinators',
      'Secure messaging with audit-friendly delivery states',
      'Clinic-level analytics for wait times and no-show risk',
      'Accessible forms designed for busy, high-stress desks',
    ],
    architecture:
      'Frontend — React clinician console with optimistic encounter updates\nAPI Layer — Node.js REST API with session-aware authorization\nBackend — domain services for scheduling, notes, and messaging\nDatabase — MongoDB collections partitioned by clinic tenancy\nAI / External Services — optional risk scoring for missed appointments',
    challenges: [
      'Modeling consent and least-privilege access across clinic roles',
      'Designing forms that stay fast on clinic-issued tablets',
      'Reconciling offline-tolerant scheduling with a single source of truth',
    ],
    featured: true,
  },
  {
    id: 'harbor-cart',
    title: 'Harbor Cart',
    description:
      'A conversion-focused commerce storefront with inventory, checkout, and merchandising tools for independent brands.',
    thumbnail: createProjectThumbnail({
      title: 'Harbor Cart',
      from: '#140b1f',
      to: '#2a1548',
      accent: '#e879f9',
      motif: 'hex',
    }),
    technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    tags: ['E-commerce', 'Web App', 'SaaS'],
    githubUrl: 'https://github.com/topics/e-commerce',
    liveUrl: 'https://developer.mozilla.org',
    overview:
      'Harbor Cart is a storefront and admin in one product. Merchants compose collections, manage variants, and launch campaigns without a plugin maze. Shoppers get a fast catalog, transparent shipping states, and a checkout that degrades gracefully when payment providers stall.',
    features: [
      'Composable product pages with variant-aware inventory',
      'Cart persistence across devices using a guest-to-account merge',
      'Promotion engine for bundles, thresholds, and launch drops',
      'Order tracking with fulfillment checkpoints',
      'Merchandising calendar for seasonal collections',
    ],
    architecture:
      'Frontend — React storefront and merchant dashboard\nAPI Layer — Node.js commerce API with idempotent checkout intents\nBackend — catalog, cart, and order domain modules\nDatabase — MongoDB for products, carts, and order history\nAI / External Services — payment, tax, and shipping providers',
    challenges: [
      'Keeping inventory accurate during flash-sale contention',
      'Making checkout recoverable after third-party payment failures',
      'Avoiding layout shift from late-loading promotional media',
    ],
  },
  {
    id: 'forge-cli',
    title: 'ForgeCLI',
    description:
      'A developer toolchain that scaffolds services, checks architecture conventions, and generates release notes from git history.',
    thumbnail: createProjectThumbnail({
      title: 'ForgeCLI',
      from: '#101010',
      to: '#1c2430',
      accent: '#fbbf24',
      motif: 'grid',
    }),
    technologies: ['TypeScript', 'Node.js'],
    tags: ['Developer Tools', 'Automation'],
    githubUrl: 'https://github.com/topics/developer-tools',
    overview:
      'ForgeCLI exists for teams that have grown past a single starter repo. It encodes golden-path templates, lintable architecture rules, and changelog generation so new services look like they were written by the same platform group. Commands are scriptable for CI and friendly in interactive terminals.',
    features: [
      'Service scaffolding with tested TypeScript templates',
      'Architecture lint rules for layering and public APIs',
      'Release note drafts grouped by conventional commits',
      'Interactive doctor command for local toolchain health',
      'Machine-readable JSON output for pipelines',
    ],
    architecture:
      'Frontend — terminal UI and optional HTML report renderer\nAPI Layer — command parser with pluggable middleware\nBackend — Node.js CLI runtime and template engine\nDatabase — local cache of generators and rule packs\nAI / External Services — optional model for commit summarization',
    challenges: [
      'Keeping generators useful without becoming a framework of their own',
      'Detecting architecture drift without noisy false positives',
      'Shipping a CLI that is fast on cold start in large monorepos',
    ],
    featured: true,
  },
  {
    id: 'aetherboard',
    title: 'AetherBoard',
    description:
      'A SaaS operations dashboard that turns product, billing, and support signals into a single weekly operating picture.',
    thumbnail: createProjectThumbnail({
      title: 'AetherBoard',
      from: '#0b1020',
      to: '#1e1b4b',
      accent: '#818cf8',
      motif: 'bars',
    }),
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    tags: ['SaaS', 'Analytics', 'Web App'],
    githubUrl: 'https://github.com/topics/dashboard',
    overview:
      'AetherBoard is for operators who currently live in six browser tabs. It unifies activation, retention, incidents, and revenue into narrative tiles rather than a wall of charts. Teams define health thresholds, annotate anomalies, and share a Monday board that actually gets read.',
    features: [
      'Narrative KPI tiles with sparkline context and owners',
      'Saved operating views for growth, reliability, and finance',
      'Annotation threads on spikes, drops, and deploys',
      'CSV and snapshot export for leadership packets',
      'Light and dark themes tuned for long weekly reviews',
    ],
    architecture:
      'Frontend — React dashboard with cached query views\nAPI Layer — Node.js BFF that shapes provider metrics\nBackend — aggregation workers and threshold evaluation\nDatabase — PostgreSQL warehouse plus Redis for live tiles\nAI / External Services — billing, analytics, and status providers',
    challenges: [
      'Normalizing metrics that arrive on different grains and delays',
      'Making dense operational data readable at laptop and tablet widths',
      'Preventing expensive queries from blocking the weekly board render',
    ],
  },
  {
    id: 'lumen-vision',
    title: 'LumenVision',
    description:
      'A computer vision workbench for inspecting manufacturing stills, labeling defects, and shipping models to the line.',
    thumbnail: createProjectThumbnail({
      title: 'LumenVision',
      from: '#0a1628',
      to: '#123052',
      accent: '#38bdf8',
      motif: 'rings',
    }),
    technologies: ['Python', 'AI', 'React', 'TypeScript'],
    tags: ['AI', 'Automation', 'Web App'],
    githubUrl: 'https://github.com/topics/computer-vision',
    overview:
      'LumenVision shortens the path from a folder of line-camera images to a model operators can trust. Engineers label defects, compare architectures, and review false positives against lighting conditions from the factory floor. The web console is designed for mixed teams of ML engineers and process technicians.',
    features: [
      'Fast labeling with keyboard-first bounding boxes',
      'Dataset slices by shift, camera, and material lot',
      'Training comparison with precision-recall overlays',
      'Human review queue for low-confidence detections',
      'Export packages for edge inference runtimes',
    ],
    architecture:
      'Frontend — React labeling and evaluation console\nAPI Layer — job API for ingest, train, and evaluate\nBackend — Python workers for vision training and batch inference\nDatabase — object storage for frames plus metadata catalogs\nAI / External Services — GPU training cluster and model registry',
    challenges: [
      'Keeping labeling fluid on thousands of high-resolution frames',
      'Explaining model misses in language technicians can act on',
      'Packaging models so factory PCs can run them without a research stack',
    ],
    featured: true,
  },
  {
    id: 'northstar',
    title: 'Northstar Analytics',
    description:
      'A product analytics studio for exploring funnels, cohorts, and qualitative clips without waiting on a data team ticket.',
    thumbnail: createProjectThumbnail({
      title: 'Northstar',
      from: '#0c0a16',
      to: '#1f1633',
      accent: '#c4b5fd',
      motif: 'bars',
    }),
    technologies: ['React', 'TypeScript', 'Python', 'PostgreSQL'],
    tags: ['Analytics', 'SaaS', 'Web App'],
    githubUrl: 'https://github.com/topics/data-visualization',
    overview:
      'Northstar Analytics is built for PMs and designers who need answers during a critique, not next sprint. It pairs warehouse-backed charts with session clips so a drop-off is never just a percentage. Saved analyses become living documents instead of screenshot graveyards.',
    features: [
      'Funnel builder with exclusion logic and time windows',
      'Cohorts that survive schema changes through mapped events',
      'Side-by-side clip review for qualitative context',
      'Shared analysis pages with comment anchors',
      'SQL escape hatch for teams that outgrow the GUI',
    ],
    architecture:
      'Frontend — React exploration canvas and clip reviewer\nAPI Layer — query planner with result caching\nBackend — Python aggregation service over warehouse extracts\nDatabase — PostgreSQL for app state, warehouse for events\nAI / External Services — optional natural-language query assist',
    challenges: [
      'Making complex cohort logic understandable without hiding power',
      'Keeping interactive queries fast on tens of millions of events',
      'Linking quantitative drops to the right qualitative evidence',
    ],
  },
  {
    id: 'relayops',
    title: 'RelayOps',
    description:
      'An automation platform that connects internal tools, queues, and approvals into observable workflows.',
    thumbnail: createProjectThumbnail({
      title: 'RelayOps',
      from: '#081018',
      to: '#102a2a',
      accent: '#2dd4bf',
      motif: 'nodes',
    }),
    technologies: ['Node.js', 'Python', 'MongoDB', 'AI', 'TypeScript'],
    tags: ['Automation', 'Developer Tools', 'SaaS'],
    githubUrl: 'https://github.com/topics/automation',
    overview:
      'RelayOps treats internal operations as products. Teams draw workflows that call APIs, wait for humans, and branch on data. Every run is inspectable, retryable, and annotated so on-call engineers can see why a vendor sync stalled at 2 a.m.',
    features: [
      'Visual workflow canvas with versioned definitions',
      'Human approval steps with SLA clocks',
      'Replay and retry for failed nodes',
      'Secrets isolation per environment',
      'AI-assisted mapping when vendor payloads drift',
    ],
    architecture:
      'Frontend — React workflow canvas and run inspector\nAPI Layer — Node.js control plane for definitions and triggers\nBackend — Python workers executing durable steps\nDatabase — MongoDB for graphs, runs, and audit trails\nAI / External Services — connectors, secret manager, and mapping models',
    challenges: [
      'Making a visual builder precise enough for production traffic',
      'Guaranteeing exactly-once side effects across retries',
      'Explaining failures without dumping raw stack traces on operators',
    ],
  },
  {
    id: 'prismforge',
    title: 'PrismForge',
    description:
      'A browser-based 3D configurator for designing modular products and exporting manufacturing-ready views.',
    thumbnail: createProjectThumbnail({
      title: 'PrismForge',
      from: '#12081c',
      to: '#2b0f3a',
      accent: '#f0abfc',
      motif: 'hex',
    }),
    technologies: ['React', 'TypeScript', 'Three.js'],
    tags: ['3D', 'Web App', 'E-commerce'],
    githubUrl: 'https://github.com/topics/threejs',
    liveUrl: 'https://threejs.org/examples/',
    overview:
      'PrismForge lets industrial designers and merchants configure products in the browser. Users snap modules together, preview materials under studio lighting, and generate stills for the storefront. The scene graph stays editable so engineering can export BOM-aware views later.',
    features: [
      'Constraint-aware snapping for modular parts',
      'Material and finish library with live lighting',
      'Orbit, explode, and section camera modes',
      'Shareable configuration links',
      'High-resolution still export for catalogs',
    ],
    architecture:
      'Frontend — React shell with a Three.js scene runtime\nAPI Layer — configuration schema and asset manifest API\nBackend — asset pipeline for meshes, materials, and previews\nDatabase — object storage for glTF plus config documents\nAI / External Services — optional material suggestion models',
    challenges: [
      'Keeping 3D scenes accessible with camera presets and text summaries',
      'Loading heavy meshes without stalling the configuration UI',
      'Encoding product constraints so invalid builds are impossible',
    ],
    featured: true,
  },
  {
    id: 'trailblaze',
    title: 'Trailblaze',
    description:
      'A mobile-first training companion that plans outdoor routes, tracks effort, and keeps coaching notes in sync across devices.',
    thumbnail: createProjectThumbnail({
      title: 'Trailblaze',
      from: '#07140f',
      to: '#0f2f24',
      accent: '#86efac',
      motif: 'orbit',
    }),
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    tags: ['Web App', 'Mobile', 'SaaS'],
    githubUrl: 'https://github.com/topics/react-native',
    overview:
      'Trailblaze is a responsive web app that behaves like a native training companion. Athletes plan routes, log sessions, and review load with a coach. The interface is thumb-friendly on a trail and dense enough on a desktop for weekly planning.',
    features: [
      'Responsive training calendar with conflict detection',
      'Route library with elevation-aware effort estimates',
      'Coach comments anchored to specific splits',
      'Offline-tolerant session capture with later sync',
      'Accessible color-independent intensity encoding',
    ],
    architecture:
      'Frontend — React responsive app with installable PWA shell\nAPI Layer — Node.js session and planning API\nBackend — training load calculations and route services\nDatabase — PostgreSQL for athletes, plans, and GPS summaries\nAI / External Services — map tiles and weather forecasts',
    challenges: [
      'Designing one component system that feels native at 320px and 1440px',
      'Syncing GPS-heavy sessions over unreliable mobile networks',
      'Showing intensity without relying on color alone',
    ],
  },
  {
    id: 'vaultnote',
    title: 'VaultNote',
    description:
      'An encrypted notes workspace for teams that need shared context without turning sensitive writing into chat history.',
    thumbnail: createProjectThumbnail({
      title: 'VaultNote',
      from: '#101014',
      to: '#1c1c28',
      accent: '#94a3b8',
      motif: 'grid',
    }),
    technologies: ['React', 'TypeScript', 'Node.js'],
    tags: ['Web App', 'Developer Tools', 'SaaS'],
    githubUrl: 'https://github.com/topics/encryption',
    overview:
      'VaultNote is a calm writing surface with client-side encryption and shared spaces. It is intentionally not a chat tool. Documents have history, access lists, and export controls so security-conscious teams can still collaborate in a browser.',
    features: [
      'Client-side encryption before notes leave the device',
      'Spaces with explicit membership and recovery flow',
      'Markdown writing with keyboard-first commands',
      'Version history with restore points',
      'Read-only share links with expiry',
    ],
    architecture:
      'Frontend — React editor with local crypto before sync\nAPI Layer — Node.js ciphertext storage and membership API\nBackend — key wrapping, audit, and recovery services\nDatabase — encrypted blobs plus metadata indexes\nAI / External Services — none in the default threat model',
    challenges: [
      'Designing recovery that is usable without weakening the threat model',
      'Searching ciphertext collections without leaking document contents',
      'Keeping the editor fast while encrypting large attachments',
    ],
  },
  {
    id: 'meshlink',
    title: 'MeshLink',
    description:
      'A realtime collaboration canvas for architecture reviews, with presence, comments, and exportable decision logs.',
    thumbnail: createProjectThumbnail({
      title: 'MeshLink',
      from: '#0a1022',
      to: '#152044',
      accent: '#60a5fa',
      motif: 'nodes',
    }),
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    tags: ['Web App', 'Developer Tools', 'SaaS'],
    githubUrl: 'https://github.com/topics/websocket',
    overview:
      'MeshLink is a canvas for teams who review systems, not slides. Participants drop service nodes, draw contracts, and leave comments that become a dated decision log. Presence and follow-mode keep remote reviews from turning into a maze of screenshares.',
    features: [
      'Realtime canvas with presence and follow mode',
      'Service, queue, and datastore node library',
      'Comment threads that export to a decision log',
      'Version snapshots before and after a review',
      'Keyboard navigation across nodes and comments',
    ],
    architecture:
      'Frontend — React canvas renderer with CRDT-aware presence\nAPI Layer — Node.js websocket gateway and REST snapshots\nBackend — collaboration engine and export workers\nDatabase — PostgreSQL for documents plus in-memory rooms\nAI / External Services — optional architecture critique assistant',
    challenges: [
      'Resolving concurrent edits without destroying a presenter’s layout',
      'Keeping websocket reconnects invisible during a live review',
      'Exporting a visual canvas into a document engineers will actually file',
    ],
  },
]
