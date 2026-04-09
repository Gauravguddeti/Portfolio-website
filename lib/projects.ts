// ─────────────────────────────────────────────────────────────────────────────
// CURRENTLY BUILDING — change this one line to update the badge everywhere
// ─────────────────────────────────────────────────────────────────────────────
export const CURRENT_PROJECT = "spay"

export interface Project {
  slug: string
  name: string
  category: string
  number: string
  shortDescription: string
  fullDescription: string
  tech: string[]
  githubUrl: string
  liveUrl?: string // undefined or empty string = no Live button shown
}

export const projects: Project[] = [
  {
    slug: "khaaozy",
    name: "Khaaozy",
    category: "Full-Stack / Mobile",
    number: "001",
    shortDescription:
      "Multi-platform canteen management for colleges with AI-powered OCR menu parsing and real-time order tracking.",
    fullDescription:
      "A comprehensive canteen management solution for educational institutions. Students browse canteens, place orders, and track status in real-time. Canteen owners manage menus with AI-assisted OCR — just photograph a menu board and it extracts items, prices, and categories automatically. Administrators oversee multiple colleges with analytics dashboards. Features role-based access control, PostgreSQL Row Level Security, and a native Android app built with Kotlin and Jetpack Compose.",
    tech: ["React 18", "TypeScript", "Supabase", "FastAPI", "Python", "Kotlin", "Jetpack Compose", "Tailwind CSS", "Tesseract OCR"],
    githubUrl: "https://github.com/Gauravguddeti/khaaozy",
    liveUrl: "https://www.khaoozy.tech/",
  },
  {
    slug: "relayx",
    name: "RelayX",
    category: "AI / Voice",
    number: "002",
    shortDescription:
      "AI voice calling platform — make thousands of personalized calls simultaneously using AI agents for lead qualification.",
    fullDescription:
      "RelayX transforms business outreach with AI voice agents that call, qualify leads, and schedule appointments at scale. Upload a CSV of contacts and launch bulk calling campaigns instantly — the AI handles natural conversations, detects sentiment, and integrates with Calendly for seamless booking. Supports Hindi, English, and other Indian languages via Sarvam AI. Backed by Groq LLM for ultra-fast inference and Twilio for voice infrastructure. 10x cheaper than human callers at ₹8 per call.",
    tech: ["React 18", "TypeScript", "FastAPI", "Python", "PostgreSQL", "Twilio", "Groq LLM", "LangChain", "Sarvam AI", "Supabase"],
    githubUrl: "https://github.com/Gauravguddeti/relayX",
  },
  {
    slug: "smartjeb",
    name: "SmartJeb",
    category: "E-Commerce",
    number: "003",
    shortDescription:
      "E-commerce platform with a sharp personality. \"You buy. We judge. Gently.\" Responsive shopping with cart and smooth UX.",
    fullDescription:
      "SmartJeb is a full-featured e-commerce storefront built with React, focused on delivering a clean and intuitive shopping experience. Features include product listings, shopping cart management, and responsive design that works across all screen sizes. The app is designed with performance in mind — fast load times and smooth interactions throughout the purchase flow.",
    tech: ["React", "JavaScript", "CSS3", "Responsive Design"],
    githubUrl: "https://github.com/Gauravguddeti/SmartJeb",
    liveUrl: "https://smartjeb.vercel.app/",
  },
  {
    slug: "aslvision",
    name: "ASLVision",
    category: "AI / Computer Vision",
    number: "004",
    shortDescription:
      "Real-time American Sign Language recognition at 99.97% accuracy using a custom PyTorch CNN with MediaPipe hand detection.",
    fullDescription:
      "ASLVision is a real-time ASL letter recognition system built for the deaf and hard-of-hearing community. A custom Enhanced CNN (PyTorch) with batch normalization and dropout achieves 99.97% accuracy on the ASL alphabet (A-Z + space + delete). MediaPipe detects hand landmarks and crops the region dynamically. Prediction smoothing buffers handle temporal consistency for reliable live recognition at 30 FPS on GPU. Includes a tkinter GUI with visual confidence feedback and comprehensive ablation studies.",
    tech: ["PyTorch", "OpenCV", "MediaPipe", "Python", "Deep Learning", "Computer Vision"],
    githubUrl: "https://github.com/Gauravguddeti/ASLVision",
  },
  {
    slug: "echo",
    name: "Echo — Agent with Memory",
    category: "AI / LLM",
    number: "005",
    shortDescription:
      "Local AI assistant that builds persistent memory across sessions using a custom RAG engine — it learns you over time.",
    fullDescription:
      "Echo is a next-generation local AI assistant built around long-term memory. Unlike standard chatbots that reset every session, Echo builds a persistent understanding of you — your preferences, facts, and habits — using a custom RAG engine powered by sentence-transformers and TinyBERT re-ranking. It extracts facts automatically from conversation ('I have a pet dragon named Sparky'), resolves conflicts when information changes, and recalls context from days or weeks ago. Runs locally with Groq API or Ollama.",
    tech: ["Python", "FastAPI", "Groq API", "sentence-transformers", "ChromaDB", "React", "Whisper", "Ollama"],
    githubUrl: "https://github.com/Gauravguddeti/Echo-agentwithmemory",
  },
  {
    slug: "voiceid",
    name: "VoiceID Chatbot",
    category: "AI / Voice",
    number: "006",
    shortDescription:
      "Voice assistant that identifies who is speaking, onboards new users through conversation, and stores per-user persistent memory.",
    fullDescription:
      "VoiceID is a local-first voice assistant that knows who you are. It uses Resemblyzer speaker embeddings to identify voices — matching each utterance against saved profiles with cosine similarity across multiple samples. New users are onboarded through natural conversation rather than technical enrollment. Each user gets their own persistent memory space (semantic, preference, episodic) backed by ChromaDB. Groq powers LLM responses grounded in retrieved memory, with guardrails against hallucinating user facts.",
    tech: ["React", "FastAPI", "Python", "Whisper", "Resemblyzer", "ChromaDB", "Groq", "WebSocket"],
    githubUrl: "https://github.com/Gauravguddeti/VoiceID-Chatbot",
  },
]

// sPay — shown only in the "Currently Building" strip, not in the card grid
export const currentProject = {
  slug: "spay",
  name: "sPay",
  description:
    "SaaS subscription spend control for startup teams. Combines manual tracking with Gmail-assisted detection, then sends renewal reminders over WhatsApp so teams eliminate surprise renewals and identify wasteful tools.",
  tech: ["Next.js", "React 19", "TypeScript", "PostgreSQL", "Drizzle ORM", "NextAuth", "Twilio", "Upstash Redis"],
  githubUrl: "https://github.com/Gauravguddeti/spay",
}
