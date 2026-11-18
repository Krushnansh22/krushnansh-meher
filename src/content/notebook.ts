import { resumeData, type ProjectItem } from "./resumeData";

export type OutputKind =
  | "metrics"
  | "json"
  | "text"
  | "typewriter"
  | "links"
  | "iframe"
  | "image"
  | "custom";

export interface CodeOutput {
  kind: OutputKind;
  data: any;
}

export type Cell =
  | {
      id: string;
      type: "markdown";
      sectionId?: string;
      content: string;
    }
  | {
      id: string;
      type: "code";
      sectionId?: string;
      language: string;
      code: string;
      output: CodeOutput;
    }
  | {
      id: string;
      type: "project";
      sectionId?: string;
      project: ProjectItem;
    };

export const notebook: Cell[] = [
  // 1. Profile & Bio Cell
  {
    id: "intro",
    type: "markdown",
    sectionId: "intro",
    content: `# Krushnansh Meher
### Software Development &nbsp;|&nbsp; AI / ML Engineering &nbsp;|&nbsp; Backend Systems
**Pune, India** &nbsp;•&nbsp; **VIT Pune (CGPA: 9.12)** &nbsp;•&nbsp; **IEEE Published Author (INCECT 2026)**

[![GitHub](https://img.shields.io/badge/GitHub-Krushnansh22-181717?style=flat&logo=github)](https://github.com/Krushnansh22) [![LinkedIn](https://img.shields.io/badge/LinkedIn-krushnansh--meher-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/krushnansh-meher-71199a271) [![Email](https://img.shields.io/badge/Email-krushnansh22%40gmail.com-EA4335?style=flat&logo=gmail)](mailto:krushnansh22@gmail.com)

---

> **Executive Summary**  
> AI & ML undergraduate at Vishwakarma Institute of Technology, Pune (**CGPA: 9.12**) with production experience building backend APIs, RAG systems, and real-time voice AI. IEEE-published author (INCECT 2026) focused on retrieval, agentic systems, and on-device inference. Seeking an AI/ML or backend internship where I can ship end-to-end systems.
`,
  },

  // 2. Interactive Diagnostics Code Cell
  {
    id: "diagnostics",
    type: "code",
    sectionId: "diagnostics",
    language: "python",
    code: `import krushnansh as km

# Query profile telemetry and engineering verification
overview = km.get_candidate_profile(
    degree="B.Tech AI & ML @ VIT Pune",
    cgpa=9.12,
    publications=["IEEE INCECT 2026 (Paper ID 4477)"],
    roles=["AI Intern @ Maalibu", "Software Intern @ Infotech"],
)

print(overview.metrics_summary())`,
    output: {
      kind: "metrics",
      data: {
        title: "Candidate Verification & Key Indicators",
        metrics: [
          { label: "B.Tech CGPA", value: "9.12", hint: "VIT Pune (AI & ML)" },
          { label: "IEEE Publication", value: "INCECT '26", hint: "Paper ID 4477 (IEEE Xplore)" },
          { label: "Production APIs", value: "2 Deployed", hint: "Voice Agent & Face Auth" },
          { label: "Status", value: "Available", hint: "Open for Internships" },
        ],
        footer: "Candidate loaded successfully. All code, repos, and publications verified.",
      },
    },
  },

  // 3. Technical Skills
  {
    id: "skills",
    type: "markdown",
    sectionId: "skills",
    content: `## 🛠 Technical Stack & Engineering Capabilities

| Domain | Core Technologies & Libraries |
| :--- | :--- |
| **Languages** | \`Python\` \`Java\` \`C / C++\` \`SQL\` \`R\` \`JavaScript / TypeScript\` |
| **AI / ML** | \`PyTorch\` \`TensorFlow\` \`Scikit-learn\` \`OpenCV\` \`MediaPipe\` \`ONNX\` \`NLP\` \`RAG\` \`Computer Vision\` \`Model Fine-tuning\` |
| **Backend & Cloud** | \`FastAPI\` \`Flask\` \`REST APIs\` \`WebSockets\` \`PostgreSQL\` \`MongoDB\` \`Docker\` \`Linux\` \`Git / GitHub\` |
| **LLM & Agent Tooling** | \`LangChain\` \`FAISS\` \`Sentence-Transformers\` \`Ollama\` \`Azure OpenAI\` \`Gemini\` \`Groq\` \`MCP (Model Context Protocol)\` |
`,
  },

  // 4. Work Experience
  {
    id: "experience",
    type: "markdown",
    sectionId: "experience",
    content: `## 💼 Production Work Experience

### 1. AI Intern — Maalibu Digital Media (Maalibu Sphere)
*Remote &nbsp;|&nbsp; Jun 2025 – Jul 2025*
- Built a **real-time bilingual (English/Hindi) AI voice agent** integrating Plivo telephony with Azure OpenAI and Google Gemini.
- Engineered a **low-latency WebSocket audio-streaming pipeline** with MongoDB logging, Google Sheets automated synchronization, and encrypted patient-data storage using **FastAPI**.
- **Team Leadership:** Led a team of 5 interns across voice AI, frontend, and data-pipeline development.
- **Technologies:** \`FastAPI\` \`WebSockets\` \`Azure OpenAI\` \`Google Gemini\` \`Plivo\` \`MongoDB\`

---

### 2. Software Intern — Infotech Incorporate
*Remote &nbsp;|&nbsp; Jan 2025 – Apr 2025*
- Built a high-accuracy **face-verification API** (Python, FastAPI, OpenCV) integrated with a .NET MAUI mobile app.
- **Production Impact:** Successfully deployed at a client MNC in Dhule and remains in active production use.
- Owned client presentations and the complete SDLC, from initial requirements gathering through production deployment.
- **Technologies:** \`Python\` \`FastAPI\` \`OpenCV\` \`.NET MAUI\` \`Computer Vision\`
`,
  },

  // 5. Research & Publication
  {
    id: "publication",
    type: "markdown",
    sectionId: "publication",
    content: `## 📜 Research & Publication

### **RAGEBOT: An Intelligent Context-Aware System for LLM-Assisted Software Development**
**IEEE INCECT 2026** &nbsp;•&nbsp; **Paper ID 4477** &nbsp;•&nbsp; *Published in IEEE Xplore, Oct 2026*

> **Abstract & Architectural Highlights:**  
> - Co-authored a CLI + MCP (Model Context Protocol) context engine that indexes codebases for natural-language querying with persistent multi-turn sessions.
> - Implemented semantic retrieval using **FAISS** + **Sentence-Transformers** and multi-provider LLM support (**Google Gemini**, **Groq**, **Ollama**), plus automated documentation generation and unit test scaffolding.
> - **Focus Areas:** Retrieval Augmented Generation (RAG), Context Window Optimization, Developer Tooling.

\`IEEE INCECT 2026\` \`IEEE Xplore\` \`MCP\` \`FAISS\` \`Sentence-Transformers\` \`Groq\` \`Gemini\`
`,
  },

  // 6. Projects Header
  {
    id: "projects-header",
    type: "markdown",
    sectionId: "projects",
    content: `## 🚀 Featured Projects
*Clean architectures, open-source repositories, and zero cloud lock-in.*
`,
  },

  // 7. Projects - Structured as dedicated ProjectCardCells
  {
    id: "proj-ragsmith",
    type: "project",
    sectionId: "projects",
    project: resumeData.projects[0], // RAGSmith
  },
  {
    id: "proj-modelmint",
    type: "project",
    sectionId: "projects",
    project: resumeData.projects[1], // ModelMint
  },
  {
    id: "proj-headmouse",
    type: "project",
    sectionId: "projects",
    project: resumeData.projects[2], // HeadMouse
  },
  {
    id: "proj-supplychain",
    type: "project",
    sectionId: "projects",
    project: resumeData.projects[3], // Supply-Chain Resilience Agent
  },

  // 8. Education & Leadership
  {
    id: "education",
    type: "markdown",
    sectionId: "education",
    content: `## 🎓 Education & Campus Leadership

### **Education**
- **B.Tech in Computer Science & Engineering (AI & ML)**  
  *Vishwakarma Institute of Technology, Pune* &nbsp;|&nbsp; 2025 – 2028  
  **CGPA: 9.12**
- **Diploma in Artificial Intelligence & Machine Learning**  
  *Government Polytechnic, Nagpur* &nbsp;|&nbsp; 2022 – 2025  
  **Percentage: 94.25%**

---

### **Activities & Leadership**
- **President | Rotaract Club, VIT Pune** *(2026 – Present)*  
  Lead the club's executive team and direct community-service, technical innovation, and professional-development initiatives across the campus.
- **AIML Head | IEEE CIS Chapter, VIT Pune** *(Nov 2025 – Present)*  
  Organized deep-learning and computer-vision workshops, mentoring engineering peers in PyTorch and real-world ML deployment.
`,
  },

  // 9. Contact & Socials
  {
    id: "contact",
    type: "markdown",
    sectionId: "contact",
    content: `## 📬 Get in Touch & Connect

I am actively looking for **AI / ML Engineering** and **Backend Systems** internships and roles where I can build and deploy high-impact software.

- **Email:** [krushnansh22@gmail.com](mailto:krushnansh22@gmail.com)
- **LinkedIn:** [linkedin.com/in/krushnansh-meher-71199a271](https://www.linkedin.com/in/krushnansh-meher-71199a271)
- **GitHub:** [github.com/Krushnansh22](https://github.com/Krushnansh22)
- **Phone:** [+91 9049865451](tel:+919049865451)
- **Location:** Pune, India
- **Resume:** [Download Krushnansh_Meher_Resume_2026.docx](/Krushnansh_Meher_Resume_2026.docx)

\`\`\`
# Python 3 kernel idle. Cell execution complete.
>>> krushnansh.status
'Ready to ship high-performance AI and backend systems.'
\`\`\`
`,
  },
];
