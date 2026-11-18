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
  ListTree,
  Check,
} from "lucide-react";
import { useState } from "react";

interface NotebookToolbarProps {
  kernelBusy: boolean;
  onRunAll: () => void;
  onRestart: () => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

function ToolbarBtn({
  children,
  onClick,
  title,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  title: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
      className="inline-flex items-center justify-center w-7 h-7 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors opacity-80 hover:opacity-100 disabled:opacity-30 disabled:pointer-events-none"
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
  onToggleSidebar,
  isSidebarOpen,
}: NotebookToolbarProps) {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div
      className="sticky top-0 z-20 flex items-center justify-between px-3 py-1.5 border-b shadow-sm select-none"
      style={{
        backgroundColor: "var(--cell)",
        borderColor: "var(--border)",
      }}
    >
      {/* Left Action Buttons */}
      <div className="flex items-center gap-0.5 sm:gap-1">
        <ToolbarBtn title={saved ? "Saved checkpoint!" : "Save Notebook"} onClick={handleSave}>
          {saved ? <Check size={14} className="text-emerald-500" /> : <Save size={14} />}
        </ToolbarBtn>

        <ToolbarBtn title="Insert Cell Below" onClick={() => {}}>
          <Plus size={14} />
        </ToolbarBtn>

        <ToolbarBtn title="Cut selected cells" onClick={() => {}}>
          <Scissors size={14} />
        </ToolbarBtn>

        <ToolbarBtn title="Copy selected cells" onClick={() => {}}>
          <Copy size={14} />
        </ToolbarBtn>

        <ToolbarBtn title="Paste cells below" onClick={() => {}}>
          <Clipboard size={14} />
        </ToolbarBtn>

        <span className="w-px h-4 mx-1" style={{ backgroundColor: "var(--border)" }} />

        {/* Run controls */}
        <button
          onClick={onRunAll}
          title="Run All Cells"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-all hover:opacity-90 active:scale-95 shadow-xs"
          style={{
            backgroundColor: "var(--accent-soft)",
            color: "var(--accent)",
          }}
        >
          <Play size={12} fill="currentColor" />
          <span className="hidden sm:inline">Run All</span>
        </button>

        <ToolbarBtn title="Interrupt kernel" disabled={!kernelBusy}>
          <Square size={12} />
        </ToolbarBtn>

        <ToolbarBtn title="Restart kernel" onClick={onRestart}>
          <RotateCw size={13} />
        </ToolbarBtn>

        <ToolbarBtn title="Restart & Run All" onClick={onRestart}>
          <ChevronsRight size={15} />
        </ToolbarBtn>

        <span className="w-px h-4 mx-1 hidden sm:inline" style={{ backgroundColor: "var(--border)" }} />

        {/* Cell Type Selector */}
        <div
          className="hidden sm:flex items-center gap-1 font-mono text-[11.5px] rounded border px-2 py-0.5"
          style={{ borderColor: "var(--border)", color: "var(--ink)" }}
        >
          <span>Markdown / Code</span>
        </div>
      </div>

      {/* Right Controls: Sidebar toggle & shortcut */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleSidebar}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium border transition-colors ${
            isSidebarOpen
              ? "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/40"
              : "hover:bg-black/5 dark:hover:bg-white/5 opacity-80 hover:opacity-100"
          }`}
          style={{ borderColor: isSidebarOpen ? undefined : "var(--border)", color: isSidebarOpen ? undefined : "var(--ink)" }}
        >
          <ListTree size={13} />
          <span>Outline (TOC)</span>
        </button>
      </div>
    </div>
  );
}
