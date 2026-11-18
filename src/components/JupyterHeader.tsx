import { FileText, Github, Linkedin, ShieldCheck, Download } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import type { Theme } from "../hooks/useTheme";
import { resumeData } from "../content/resumeData";

interface JupyterHeaderProps {
  kernelBusy: boolean;
  theme: Theme;
  onToggleTheme: () => void;
}

export default function JupyterHeader({
  kernelBusy,
  theme,
  onToggleTheme,
}: JupyterHeaderProps) {
  return (
    <header
      className="border-b select-none transition-colors duration-150"
      style={{
        backgroundColor: "var(--jp-chrome)",
        borderColor: "var(--jp-chrome-border)",
      }}
    >
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 gap-3">
        {/* Left: Jupyter Logo + Notebook Title */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Jupyter Official Logo SVG */}
          <div className="flex-shrink-0 flex items-center justify-center w-7 h-7" title="Project Jupyter">
            <svg viewBox="0 0 440 514" width="22" height="24" fill="none">
              {/* Top orange arc */}
              <path
                d="M219.7 101.4c-68.7 0-128.5 32.5-165.7 82.5 32.1-14.7 67.9-22.9 105.7-22.9 123.8 0 225.8 89.2 244.7 206.7 26.6-43.7 41.8-95.2 41.8-150.3 0-174.5-92.4-116-226.5-116z"
                fill="#F37626"
              />
              {/* Bottom orange arc */}
              <path
                d="M219.7 412.6c68.7 0 128.5-32.5 165.7-82.5-32.1 14.7-67.9 22.9-105.7 22.9-123.8 0-225.8-89.2-244.7-206.7-26.6 43.7-41.8 95.2-41.8 150.3 0 174.5 92.4 116 226.5 116z"
                fill="#F37626"
              />
              {/* Upper grey circle */}
              <circle cx="219.7" cy="62" r="32" fill="#767676" />
              {/* Lower grey circle */}
              <circle cx="219.7" cy="452" r="32" fill="#767676" />
              {/* Center left grey dot */}
              <circle cx="95" cy="257" r="28" fill="#767676" />
            </svg>
          </div>

          {/* Title and metadata */}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span
                className="font-sans text-sm font-semibold truncate hover:underline cursor-pointer"
                style={{ color: "var(--jp-chrome-ink)" }}
                title="krushnansh_meher_portfolio.ipynb"
              >
                krushnansh_meher_portfolio.ipynb
              </span>
              <span
                className="hidden md:inline-flex items-center gap-1 text-[11px] font-mono px-1.5 py-0.2 rounded border"
                style={{
                  backgroundColor: "var(--code)",
                  borderColor: "var(--border)",
                  color: "var(--run)",
                }}
              >
                <ShieldCheck size={11} />
                Trusted
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-[11px]" style={{ color: "var(--jp-chrome-muted)" }}>
              <span>Last Checkpoint: moments ago (autosaved)</span>
              <span>•</span>
              <span>Python 3.11</span>
            </div>
          </div>
        </div>

        {/* Right: Quick actions, Kernel state, Theme toggle */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Resume link */}
          <a
            href="/Krushnansh_Meher_Resume_2026.docx"
            download="Krushnansh_Meher_Resume_2026.docx"
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium border transition-colors hover:opacity-90"
            style={{
              backgroundColor: "var(--code)",
              borderColor: "var(--border)",
              color: "var(--ink)",
            }}
            title="Download Resume (.docx)"
          >
            <Download size={13} />
            <span>Resume</span>
          </a>

          {/* Social Links */}
          <a
            href={resumeData.profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            className="p-1.5 rounded hover:opacity-80 transition-opacity"
            style={{ color: "var(--jp-chrome-ink)" }}
            title="GitHub: Krushnansh22"
          >
            <Github size={16} />
          </a>
          <a
            href={resumeData.profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn Profile"
            className="p-1.5 rounded hover:opacity-80 transition-opacity text-blue-600 dark:text-blue-400"
            title="LinkedIn Profile"
          >
            <Linkedin size={16} />
          </a>

          {/* Kernel indicator pill */}
          <div
            className="flex items-center gap-1.5 px-2 py-0.5 rounded border text-[11px] font-mono"
            style={{
              borderColor: "var(--jp-chrome-border)",
              backgroundColor: "var(--code)",
              color: "var(--jp-chrome-ink)",
            }}
          >
            <span
              className={`w-2 h-2 rounded-full transition-colors ${
                kernelBusy ? "bg-orange-500 animate-pulse" : "bg-emerald-500"
              }`}
            />
            <span className="hidden md:inline">{kernelBusy ? "Kernel Busy" : "Python 3 (idle)"}</span>
          </div>

          {/* Theme toggle */}
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  );
}
