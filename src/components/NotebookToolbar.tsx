import {
  Save,
  Plus,
  Scissors,
  Copy,
  Clipboard,
  Play,
  Square,
  RotateCw,
  ChevronsRight,
  ExternalLink,
  Bug,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import type { Theme } from "../hooks/useTheme";

interface NotebookToolbarProps {
  kernelBusy: boolean;
  onRunAll: () => void;
  onRestart: () => void;
  theme: Theme;
  onToggleTheme: () => void;
}

const menuItems = ["File", "Edit", "View", "Run", "Kernel", "Settings", "Help"];

function IconBtn({
  children,
  onClick,
  title,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  title: string;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      aria-label={title}
      className="inline-flex items-center justify-center w-7 h-7 rounded hover:opacity-100 transition-opacity opacity-80"
      style={{ color: "var(--ink)" }}
    >
      {children}
    </button>
  );
}

export default function NotebookToolbar({
  kernelBusy,
  onRunAll,
  onRestart,
  theme,
  onToggleTheme,
}: NotebookToolbarProps) {
  return (
    <div className="sticky top-0 z-10 border-b" style={{ backgroundColor: "var(--jp-chrome)", borderColor: "var(--jp-chrome-border)" }}>
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2.5">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <circle cx="12" cy="12" r="9" fill="none" stroke="var(--accent)" strokeWidth="2.4" strokeDasharray="30 14" />
          </svg>
          <span className="font-sans text-[15px]" style={{ color: "var(--jp-chrome-ink)" }}>Jupyter</span>
          <span className="font-sans text-[13px] font-semibold ml-2" style={{ color: "var(--jp-chrome-ink)" }}>
            Krushnansh_Meher_Portfolio
          </span>
          <span className="hidden sm:inline font-sans text-[12px]" style={{ color: "var(--jp-chrome-muted)" }}>
            Last Checkpoint: a moment ago
          </span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="10" fill="#3776AB" />
            <circle cx="9" cy="9" r="1.6" fill="#FFD43B" />
            <circle cx="15" cy="15" r="1.6" fill="#FFD43B" />
          </svg>
        </div>
      </div>

      {/* Menu bar */}
      <div className="flex items-center justify-between px-4 py-1 border-t" style={{ borderColor: "var(--jp-chrome-border)" }}>
        <div className="flex items-center gap-4 font-sans text-[12.5px]" style={{ color: "var(--jp-chrome-ink)" }}>
          {menuItems.map((m) => (
            <span key={m} className="cursor-default opacity-90 hover:opacity-100">
              {m}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 font-sans text-[12px]" style={{ color: "var(--jp-chrome-muted)" }}>
          <span className="hidden sm:inline-flex items-center gap-1">
            JupyterLab <ExternalLink size={11} />
          </span>
          <Bug size={13} />
          <span>Python 3 (ipykernel)</span>
          <span
            className={`inline-block w-2.5 h-2.5 rounded-full border ${kernelBusy ? "animate-pulseDot" : ""}`}
            style={{
              borderColor: "var(--jp-chrome-muted)",
              backgroundColor: kernelBusy ? "var(--accent)" : "transparent",
            }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Icon toolbar */}
      <div className="flex items-center gap-1 px-3 py-1.5 border-t" style={{ borderColor: "var(--jp-chrome-border)" }}>
        <IconBtn title="Save">
          <Save size={15} />
        </IconBtn>
        <IconBtn title="Add cell">
          <Plus size={15} />
        </IconBtn>
        <IconBtn title="Cut cell">
          <Scissors size={15} />
        </IconBtn>
        <IconBtn title="Copy cell">
          <Copy size={15} />
        </IconBtn>
        <IconBtn title="Paste cell">
          <Clipboard size={15} />
        </IconBtn>
        <span className="w-px h-4 mx-1" style={{ backgroundColor: "var(--jp-chrome-border)" }} />
        <IconBtn title="Run All" onClick={onRunAll}>
          <Play size={15} />
        </IconBtn>
        <IconBtn title="Stop">
          <Square size={13} />
        </IconBtn>
        <IconBtn title="Restart & Run All" onClick={onRestart}>
          <RotateCw size={15} />
        </IconBtn>
        <IconBtn title="Restart & Run to end">
          <ChevronsRight size={15} />
        </IconBtn>
        <span
          className="ml-2 font-mono text-[12px] rounded border px-2 py-0.5"
          style={{ borderColor: "var(--jp-chrome-border)", color: "var(--jp-chrome-ink)" }}
        >
          Code
        </span>
      </div>
    </div>
  );
}
