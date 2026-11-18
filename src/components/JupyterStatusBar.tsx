import { GitBranch, Terminal, Cpu, CheckCircle2 } from "lucide-react";

interface JupyterStatusBarProps {
  kernelBusy: boolean;
  cellCount: number;
  activeSectionTitle?: string;
}

export default function JupyterStatusBar({
  kernelBusy,
  cellCount,
  activeSectionTitle = "Profile & Overview",
}: JupyterStatusBarProps) {
  return (
    <footer
      className="fixed bottom-0 inset-x-0 z-30 h-6 border-t px-3 flex items-center justify-between text-[11px] font-mono select-none transition-colors duration-150"
      style={{
        backgroundColor: "var(--jp-chrome)",
        borderColor: "var(--jp-chrome-border)",
        color: "var(--jp-chrome-muted)",
      }}
    >
      {/* Left side items */}
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1 font-semibold" style={{ color: "var(--jp-chrome-ink)" }}>
          <Terminal size={11} className="text-orange-500" />
          <span>JupyterLab</span>
        </span>

        <span className="hidden sm:inline">|</span>

        <span className="hidden sm:flex items-center gap-1">
          <GitBranch size={11} />
          <span>main</span>
        </span>

        <span className="hidden md:inline">|</span>

        <span className="hidden md:inline truncate max-w-[200px]" style={{ color: "var(--jp-chrome-ink)" }}>
          {activeSectionTitle}
        </span>
      </div>

      {/* Right side items */}
      <div className="flex items-center gap-3">
        <span className="hidden sm:inline">Cells: {cellCount}</span>

        <span>|</span>

        <span className="flex items-center gap-1.5">
          <span
            className={`w-2 h-2 rounded-full ${
              kernelBusy ? "bg-orange-500 animate-pulse" : "bg-emerald-500"
            }`}
          />
          <span style={{ color: "var(--jp-chrome-ink)" }}>
            {kernelBusy ? "Kernel: Busy" : "Python 3: Idle"}
          </span>
        </span>

        <span className="hidden md:inline">|</span>
        <span className="hidden md:inline">UTF-8</span>
        <span className="hidden md:inline">Spaces: 4</span>
      </div>
    </footer>
  );
}
