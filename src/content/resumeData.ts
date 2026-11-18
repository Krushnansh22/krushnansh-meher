export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  githubUrl: string;
  liveUrl?: string;
  highlights: string[];
  tags: string[];
  category: "RAG / LLM" | "Inference & Systems" | "Computer Vision" | "Agentic Systems";
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  bullets: string[];
  tags: string[];
}

export interface PublicationItem {
  title: string;
  venue: string;
  paperId: string;
  publishedDate: string;
  linkText: string;
  bullets: string[];
  tags: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  scoreLabel: string;
  score: string;
}

export interface LeadershipItem {
  role: string;
  organization: string;
  period: string;
  description: string;
}

export const resumeData = {
  profile: {
    name: "Krushnansh Meher",
    title: "Software Development | AI / ML Engineering | Backend Systems",
    location: "Pune, India",
    phone: "+91 9049865451",
    email: "krushnansh22@gmail.com",
    githubUsername: "Krushnansh22",
    githubUrl: "https://github.com/Krushnansh22",
    linkedinUrl: "https://www.linkedin.com/in/krushnansh-meher-71199a271",
    portfolioUrl: "https://krushnansh-meher.vercel.app",
    summary:
      "AI & ML undergraduate at VIT Pune (CGPA 9.12) with production experience building backend APIs, RAG systems, and real-time voice AI. IEEE-published author (INCECT 2026) focused on retrieval, agentic systems, and on-device inference. Seeking an AI/ML or backend internship where I can ship end-to-end systems.",
  },

  skills: {
    languages: ["Python", "Java", "C/C++", "SQL", "R", "JavaScript/TypeScript"],
    aiml: [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "OpenCV",
      "MediaPipe",
      "ONNX",
      "NLP",
      "RAG",
      "Computer Vision",
      "Model Fine-tuning",
    ],
    backend: [
      "FastAPI",
      "Flask",
      "REST APIs",
      "WebSockets",
      "PostgreSQL",
      "MongoDB",
      "Docker",
      "Linux",
      "Git/GitHub",
    ],
    llmTooling: [
      "LangChain",
      "FAISS",
      "Sentence-Transformers",
      "Ollama",
      "Azure OpenAI",
      "Gemini",
      "Groq",
      "MCP (Model Context Protocol)",
    ],
  },

  experience: [
    {
      role: "AI Intern",
      company: "Maalibu Digital Media (Maalibu Sphere)",
      location: "Remote",
      period: "Jun 2025 – Jul 2025",
      type: "Internship",
      bullets: [
        "Built a real-time bilingual (English/Hindi) AI voice agent integrating Plivo telephony with Azure OpenAI and Google Gemini.",
        "Engineered a WebSocket audio-streaming pipeline with MongoDB logging, Google Sheets sync, and encrypted patient-data storage using FastAPI.",
        "Led a team of 5 interns across voice AI, frontend, and data-pipeline development.",
      ],
      tags: ["FastAPI", "WebSockets", "Azure OpenAI", "Google Gemini", "Plivo", "MongoDB"],
    },
    {
      role: "Software Intern",
      company: "Infotech Incorporate",
      location: "Remote",
      period: "Jan 2025 – Apr 2025",
      type: "Internship",
      bullets: [
        "Built a face-verification API (Python, FastAPI, OpenCV) integrated with a .NET MAUI mobile app; deployed at a client MNC in Dhule and still in active production.",
        "Owned client presentations and end-to-end SDLC, from requirements gathering through deployment.",
      ],
      tags: ["Python", "FastAPI", "OpenCV", ".NET MAUI", "Face Verification", "Production"],
    },
  ] as ExperienceItem[],

  publication: {
    title: "RAGEBOT: An Intelligent Context-Aware System for LLM-Assisted Software Development",
    venue: "IEEE INCECT 2026",
    paperId: "Paper ID 4477",
    publishedDate: "Published in IEEE Xplore, Oct 2026",
    linkText: "IEEE Xplore (Oct 2026)",
    bullets: [
      "Co-authored a CLI + MCP context engine that indexes codebases for natural-language querying with persistent multi-turn sessions.",
      "Implemented semantic retrieval with FAISS + Sentence-Transformers and multi-provider LLM support (Gemini, Groq, Ollama), plus auto-generated docs and unit tests.",
    ],
    tags: ["IEEE Publication", "MCP", "FAISS", "Sentence-Transformers", "Gemini", "Groq", "Ollama"],
  } as PublicationItem,

  projects: [
    {
      id: "ragsmith",
      title: "RAGSmith",
      category: "RAG / LLM",
      tagline:
        "Open-source, self-hosted RAG platform for custom knowledge bases with zero paid APIs or cloud dependencies.",
      githubUrl: "https://github.com/Krushnansh22/RAGSmith",
      highlights: [
        "Fully private, self-hosted retrieval platform powered by FAISS, Sentence-Transformers, and Ollama.",
        "Supports 6 document formats (PDF, DOCX, TXT, MD, CSV, HTML) with intelligent text extraction.",
        "Exports fully offline-runnable project bundles for zero-cloud environments.",
      ],
      tags: ["Python", "FAISS", "Sentence-Transformers", "Ollama", "Offline RAG", "Open Source"],
    },
    {
      id: "modelmint",
      title: "ModelMint",
      category: "Inference & Systems",
      tagline:
        "Sandboxed FastAPI inference service for uploading, validating, and serving scikit-learn / ONNX models.",
      githubUrl: "https://github.com/Krushnansh22/ModelMint",
      highlights: [
        "Microservice architecture for automated model validation, dynamic endpoint creation, and isolated inference.",
        "Interactive React dashboard with live inference telemetry, request logs, and latency monitoring.",
        "Containerized with Docker for seamless reproducibility and production readiness.",
      ],
      tags: ["FastAPI", "ONNX", "Scikit-Learn", "React", "Docker", "Model Serving"],
    },
    {
      id: "headmouse",
      title: "HeadMouse",
      category: "Computer Vision",
      tagline:
        "Hands-free mouse control for users with limited motor ability using MediaPipe facial landmarks.",
      githubUrl: "https://github.com/Krushnansh22/Headmouse",
      highlights: [
        "Real-time cursor control and blink/smile gesture triggers running on a standard webcam feed.",
        "Zero GPU or specialized wearable hardware requirements; optimized for low-latency CPU inference.",
        "Designed as an assistive technology solution for users with physical impairments.",
      ],
      tags: ["Python", "Computer Vision", "MediaPipe", "OpenCV", "PyAutoGUI", "Accessibility"],
    },
    {
      id: "supply-chain-resilience-agent",
      title: "Supply-Chain Resilience Agent",
      category: "Agentic Systems",
      tagline:
        "Agentic disruption-response system covering incident triage, inventory reallocation, and multimodal re-routing.",
      githubUrl: "https://github.com/Krushnansh22/supply-chain-resilience-agent",
      highlights: [
        "Autonomous multi-agent orchestration for identifying logistical bottlenecks and predicting delays.",
        "Human-in-the-loop approval workflows with tamper-evident audit logging for supply chain changes.",
        "Dynamic alternative route computation and inventory reallocation heuristics.",
      ],
      tags: ["AI Agents", "LangChain", "FastAPI", "Decision Systems", "Audit Logging"],
    },
  ] as ProjectItem[],

  education: [
    {
      degree: "B.Tech in Computer Science & Engineering (AI & ML)",
      institution: "Vishwakarma Institute of Technology, Pune",
      period: "2025 – 2028",
      scoreLabel: "CGPA",
      score: "9.12",
    },
    {
      degree: "Diploma in Artificial Intelligence & Machine Learning",
      institution: "Government Polytechnic, Nagpur",
      period: "2022 – 2025",
      scoreLabel: "Percentage",
      score: "94.25%",
    },
  ] as EducationItem[],

  leadership: [
    {
      role: "President",
      organization: "Rotaract Club, VIT Pune",
      period: "2026 – Present",
      description:
        "Lead the club's executive team and direct community-service, technical innovation, and professional-development initiatives across the campus.",
    },
    {
      role: "AIML Head",
      organization: "IEEE CIS Chapter, VIT Pune",
      period: "Nov 2025 – Present",
      description:
        "Organized hands-on deep-learning and computer-vision workshops, mentoring engineering peers in PyTorch and real-world ML deployment.",
    },
  ] as LeadershipItem[],
};
