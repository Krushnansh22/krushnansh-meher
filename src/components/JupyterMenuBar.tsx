import { useState, useRef, useEffect } from "react";
import {
  Download,
  Printer,
  Github,
  Linkedin,
  RefreshCw,
  Play,
  Moon,
  Sun,
  ListTree,
  ExternalLink,
  ChevronDown,
  BookOpen,
} from "lucide-react";
import { resumeData } from "../content/resumeData";

interface JupyterMenuBarProps {
  onRunAll: () => void;
  onRestart: () => void;
  onToggleSidebar: () => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

export default function JupyterMenuBar({
  onRunAll,
  onRestart,
  onToggleSidebar,
  theme,
  onToggleTheme,
}: JupyterMenuBarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (barRef.current && !barRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggle = (menu: string) => {
    setOpenMenu((curr) => (curr === menu ? null : menu));
  };

  return (
    <div
      ref={barRef}
      className="relative flex items-center justify-between px-3 sm:px-4 py-1 border-b text-[12.5px] select-none font-sans"
      style={{
        backgroundColor: "var(--jp-chrome)",
        borderColor: "var(--jp-chrome-border)",
        color: "var(--jp-chrome-ink)",
      }}
    >
      <div className="flex items-center gap-1 sm:gap-2">
        {/* File Menu */}
        <div className="relative">
          <button
            onClick={() => toggle("File")}
            className={`px-2 py-0.5 rounded transition-colors ${
              openMenu === "File" ? "bg-black/10 dark:bg-white/10" : "hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            File
          </button>
          {openMenu === "File" && (
            <div
              className="absolute left-0 mt-1 w-56 rounded border shadow-lg py-1 z-30 font-sans text-xs"
              style={{
                backgroundColor: "var(--cell)",
                borderColor: "var(--border)",
                color: "var(--ink)",
              }}
            >
              <a
                href="/Krushnansh_Meher_Resume_2026.docx"
                download="Krushnansh_Meher_Resume_2026.docx"
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-black/5 dark:hover:bg-white/5"
                onClick={() => setOpenMenu(null)}
              >
                <Download size={13} />
                <span>Download Resume (.docx)</span>
              </a>
              <button
                onClick={() => {
                  window.print();
                  setOpenMenu(null);
                }}
                className="w-full text-left flex items-center gap-2 px-3 py-1.5 hover:bg-black/5 dark:hover:bg-white/5"
              >
                <Printer size={13} />
                <span>Print / Save as PDF</span>
              </button>
              <div className="my-1 border-t" style={{ borderColor: "var(--border)" }} />
              <a
                href={resumeData.profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-black/5 dark:hover:bg-white/5"
                onClick={() => setOpenMenu(null)}
              >
                <Github size={13} />
                <span>GitHub Profile</span>
                <ExternalLink size={10} className="ml-auto opacity-60" />
              </a>
            </div>
          )}
        </div>

        {/* View Menu */}
        <div className="relative">
          <button
            onClick={() => toggle("View")}
            className={`px-2 py-0.5 rounded transition-colors ${
              openMenu === "View" ? "bg-black/10 dark:bg-white/10" : "hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            View
          </button>
          {openMenu === "View" && (
            <div
              className="absolute left-0 mt-1 w-52 rounded border shadow-lg py-1 z-30 font-sans text-xs"
              style={{
                backgroundColor: "var(--cell)",
                borderColor: "var(--border)",
                color: "var(--ink)",
              }}
            >
              <button
                onClick={() => {
                  onToggleSidebar();
                  setOpenMenu(null);
                }}
                className="w-full text-left flex items-center gap-2 px-3 py-1.5 hover:bg-black/5 dark:hover:bg-white/5"
              >
                <ListTree size={13} />
                <span>Toggle Table of Contents</span>
              </button>
              <button
                onClick={() => {
                  onToggleTheme();
                  setOpenMenu(null);
                }}
                className="w-full text-left flex items-center gap-2 px-3 py-1.5 hover:bg-black/5 dark:hover:bg-white/5"
              >
                {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
                <span>Switch to {theme === "dark" ? "Light" : "Dark"} Mode</span>
              </button>
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setOpenMenu(null);
                }}
                className="w-full text-left flex items-center gap-2 px-3 py-1.5 hover:bg-black/5 dark:hover:bg-white/5"
              >
                <span>↑ Scroll to Top</span>
              </button>
            </div>
          )}
        </div>

        {/* Run Menu */}
        <div className="relative">
          <button
            onClick={() => toggle("Run")}
            className={`px-2 py-0.5 rounded transition-colors ${
              openMenu === "Run" ? "bg-black/10 dark:bg-white/10" : "hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            Run
          </button>
          {openMenu === "Run" && (
            <div
              className="absolute left-0 mt-1 w-52 rounded border shadow-lg py-1 z-30 font-sans text-xs"
              style={{
                backgroundColor: "var(--cell)",
                borderColor: "var(--border)",
                color: "var(--ink)",
              }}
            >
              <button
                onClick={() => {
                  onRunAll();
                  setOpenMenu(null);
                }}
                className="w-full text-left flex items-center gap-2 px-3 py-1.5 hover:bg-black/5 dark:hover:bg-white/5"
              >
                <Play size={13} className="text-emerald-500" />
                <span>Run All Cells</span>
              </button>
              <button
                onClick={() => {
                  onRestart();
                  setOpenMenu(null);
                }}
                className="w-full text-left flex items-center gap-2 px-3 py-1.5 hover:bg-black/5 dark:hover:bg-white/5"
              >
                <RefreshCw size={13} />
                <span>Restart Kernel & Run All</span>
              </button>
            </div>
          )}
        </div>

        {/* Kernel Menu */}
        <div className="relative">
          <button
            onClick={() => toggle("Kernel")}
            className={`px-2 py-0.5 rounded transition-colors ${
              openMenu === "Kernel" ? "bg-black/10 dark:bg-white/10" : "hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            Kernel
          </button>
          {openMenu === "Kernel" && (
            <div
              className="absolute left-0 mt-1 w-48 rounded border shadow-lg py-1 z-30 font-sans text-xs"
              style={{
                backgroundColor: "var(--cell)",
                borderColor: "var(--border)",
                color: "var(--ink)",
              }}
            >
              <button
                onClick={() => {
                  onRestart();
                  setOpenMenu(null);
                }}
                className="w-full text-left flex items-center gap-2 px-3 py-1.5 hover:bg-black/5 dark:hover:bg-white/5"
              >
                <RefreshCw size={13} />
                <span>Restart Kernel</span>
              </button>
              <div className="px-3 py-1.5 text-[11px] opacity-70">
                Connected: Python 3.11.8 (ipykernel)
              </div>
            </div>
          )}
        </div>

        {/* Help Menu */}
        <div className="relative">
          <button
            onClick={() => toggle("Help")}
            className={`px-2 py-0.5 rounded transition-colors ${
              openMenu === "Help" ? "bg-black/10 dark:bg-white/10" : "hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            Help
          </button>
          {openMenu === "Help" && (
            <div
              className="absolute left-0 mt-1 w-56 rounded border shadow-lg py-1 z-30 font-sans text-xs"
              style={{
                backgroundColor: "var(--cell)",
                borderColor: "var(--border)",
                color: "var(--ink)",
              }}
            >
              <a
                href={resumeData.profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-black/5 dark:hover:bg-white/5"
                onClick={() => setOpenMenu(null)}
              >
                <Linkedin size={13} className="text-blue-500" />
                <span>Connect on LinkedIn</span>
                <ExternalLink size={10} className="ml-auto opacity-60" />
              </a>
              <a
                href={resumeData.profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-black/5 dark:hover:bg-white/5"
                onClick={() => setOpenMenu(null)}
              >
                <Github size={13} />
                <span>GitHub Repositories</span>
                <ExternalLink size={10} className="ml-auto opacity-60" />
              </a>
              <a
                href="https://ieeexplore.ieee.org"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-black/5 dark:hover:bg-white/5"
                onClick={() => setOpenMenu(null)}
              >
                <BookOpen size={13} className="text-orange-500" />
                <span>IEEE INCECT 2026 Paper</span>
                <ExternalLink size={10} className="ml-auto opacity-60" />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Right side info */}
      <div className="hidden md:flex items-center gap-3 text-[11px]" style={{ color: "var(--jp-chrome-muted)" }}>
        <button
          onClick={onToggleSidebar}
          className="inline-flex items-center gap-1 hover:underline"
          title="Toggle Table of Contents"
        >
          <ListTree size={12} />
          <span>Outline</span>
        </button>
        <span>•</span>
        <span>JupyterLab 4.2</span>
      </div>
    </div>
  );
}
