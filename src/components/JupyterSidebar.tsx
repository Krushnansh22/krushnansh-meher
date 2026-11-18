import { useState } from "react";
import {
  ListTree,
  FolderOpen,
  FileText,
  FileCode,
  Github,
  Linkedin,
  Mail,
  Phone,
  ChevronRight,
  X,
  ExternalLink,
  Download,
} from "lucide-react";
import { resumeData } from "../content/resumeData";

interface JupyterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onSelectSection: (id: string) => void;
}

type Tab = "toc" | "files";

const sections = [
  { id: "intro", title: "1. Profile & Overview", type: "markdown" },
  { id: "diagnostics", title: "2. System Diagnostics", type: "code" },
  { id: "skills", title: "3. Technical Skills", type: "markdown" },
  { id: "experience", title: "4. Work Experience", type: "markdown" },
  { id: "publication", title: "5. IEEE Publication", type: "markdown" },
  { id: "projects", title: "6. Featured Projects", type: "projects" },
  { id: "education", title: "7. Education & Leadership", type: "markdown" },
  { id: "contact", title: "8. Connect & Links", type: "markdown" },
];

export default function JupyterSidebar({
  isOpen,
  onClose,
  activeSection,
  onSelectSection,
}: JupyterSidebarProps) {
  const [activeTab, setActiveTab] = useState<Tab>("toc");

  if (!isOpen) return null;

  return (
    <aside
      className="fixed inset-y-0 left-0 z-40 w-72 sm:w-80 border-r shadow-2xl flex transition-all duration-200 select-none"
      style={{
        backgroundColor: "var(--jp-chrome)",
        borderColor: "var(--jp-chrome-border)",
        color: "var(--jp-chrome-ink)",
      }}
    >
      {/* Far Left Activity Bar */}
      <div
        className="w-12 border-r flex flex-col items-center py-3 gap-4"
        style={{
          borderColor: "var(--jp-chrome-border)",
          backgroundColor: "var(--code)",
        }}
      >
        <button
          onClick={() => setActiveTab("toc")}
          title="Table of Contents"
          className={`p-2 rounded transition-colors ${
            activeTab === "toc"
              ? "bg-black/10 dark:bg-white/10 text-orange-500 font-bold"
              : "opacity-70 hover:opacity-100"
          }`}
        >
          <ListTree size={18} />
        </button>

        <button
          onClick={() => setActiveTab("files")}
          title="File Browser"
          className={`p-2 rounded transition-colors ${
            activeTab === "files"
              ? "bg-black/10 dark:bg-white/10 text-orange-500 font-bold"
              : "opacity-70 hover:opacity-100"
          }`}
        >
          <FolderOpen size={18} />
        </button>

        <div className="mt-auto flex flex-col items-center gap-3 opacity-80">
          <a
            href={resumeData.profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            title="GitHub"
            className="p-1.5 hover:text-orange-500 transition-colors"
          >
            <Github size={16} />
          </a>
          <a
            href={resumeData.profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            title="LinkedIn"
            className="p-1.5 hover:text-blue-500 transition-colors"
          >
            <Linkedin size={16} />
          </a>
        </div>
      </div>

      {/* Main Drawer Panel */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Panel Header */}
        <div
          className="flex items-center justify-between px-3 py-2 border-b text-xs uppercase tracking-wider font-semibold"
          style={{
            borderColor: "var(--jp-chrome-border)",
          }}
        >
          <span>{activeTab === "toc" ? "Table of Contents" : "File Browser"}</span>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 opacity-70 hover:opacity-100"
            title="Close Panel"
          >
            <X size={14} />
          </button>
        </div>

        {/* Panel Content */}
        <div className="flex-1 overflow-y-auto p-2">
          {activeTab === "toc" && (
            <div className="space-y-1">
              <div className="text-[11px] font-mono opacity-60 px-2 py-1">
                NOTEBOOK SECTIONS
              </div>
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => onSelectSection(sec.id)}
                  className={`w-full text-left flex items-center justify-between px-2.5 py-2 rounded text-xs transition-colors ${
                    activeSection === sec.id
                      ? "bg-orange-500/10 text-orange-600 dark:text-orange-400 font-semibold border-l-2 border-orange-500"
                      : "hover:bg-black/5 dark:hover:bg-white/5 opacity-85 hover:opacity-100"
                  }`}
                >
                  <span className="truncate">{sec.title}</span>
                  <span className="font-mono text-[10px] opacity-60 uppercase ml-2 flex-shrink-0">
                    {sec.type}
                  </span>
                </button>
              ))}
            </div>
          )}

          {activeTab === "files" && (
            <div className="space-y-1 text-xs">
              <div className="text-[11px] font-mono opacity-60 px-2 py-1">
                ROOT DIRECTORY
              </div>

              <div
                onClick={() => onSelectSection("intro")}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded cursor-pointer bg-orange-500/10 text-orange-600 dark:text-orange-400 font-medium"
              >
                <FileCode size={14} className="text-orange-500" />
                <span className="truncate">krushnansh_meher_portfolio.ipynb</span>
              </div>

              <a
                href="/Krushnansh_Meher_Resume_2026.docx"
                download="Krushnansh_Meher_Resume_2026.docx"
                className="flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-black/5 dark:hover:bg-white/5 opacity-80 hover:opacity-100"
              >
                <FileText size={14} className="text-blue-500" />
                <span className="truncate">Krushnansh_Meher_Resume_2026.docx</span>
                <Download size={11} className="ml-auto opacity-60" />
              </a>

              <a
                href="https://github.com/Krushnansh22"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-black/5 dark:hover:bg-white/5 opacity-80 hover:opacity-100"
              >
                <Github size={14} />
                <span className="truncate">github_repositories/</span>
                <ExternalLink size={10} className="ml-auto opacity-60" />
              </a>
            </div>
          )}
        </div>

        {/* Panel Footer: Quick contact */}
        <div
          className="p-3 border-t text-[11.5px] space-y-1 font-mono"
          style={{ borderColor: "var(--jp-chrome-border)" }}
        >
          <div className="opacity-60 text-[10px] uppercase">DIRECT CONTACT</div>
          <a
            href={`mailto:${resumeData.profile.email}`}
            className="flex items-center gap-1.5 hover:underline truncate"
          >
            <Mail size={12} className="opacity-70" />
            <span>{resumeData.profile.email}</span>
          </a>
          <div className="flex items-center gap-1.5 opacity-80">
            <Phone size={12} className="opacity-70" />
            <span>{resumeData.profile.phone}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
