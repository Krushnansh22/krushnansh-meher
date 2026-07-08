import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Play, ChevronDown, ChevronRight, Copy, ArrowUp, ArrowDown, Upload, Trash2 } from "lucide-react";
import ExecutionBadge from "./ExecutionBadge";
import OutputCell from "./OutputCell";
import type { Cell } from "../content/notebook";
import type { CellRunState } from "../hooks/useExecutionCounter";

interface CodeCellProps {
  cell: Extract<Cell, { type: "code" }>;
  state: CellRunState;
  onRun: () => void;
  theme: "light" | "dark";
  selected: boolean;
  onSelect: () => void;
}

export default function CodeCell({ cell, state, onRun, theme, selected, onSelect }: CodeCellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const running = state.status === "running";

  return (
    <div
      onClick={onSelect}
      className="relative rounded-md border transition-colors group"
      style={{
        backgroundColor: "var(--cell)",
        borderColor: selected ? "var(--selected)" : "var(--border)",
      }}
    >
      {selected && (
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-md"
          style={{ backgroundColor: "var(--selected)" }}
          aria-hidden="true"
        />
      )}

      <div
        className="absolute top-2 right-2 hidden group-hover:flex items-center gap-1.5"
        style={{ color: "var(--muted)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <Copy size={13} className="cursor-default opacity-70 hover:opacity-100" />
        <ArrowUp size={13} className="cursor-default opacity-70 hover:opacity-100" />
        <ArrowDown size={13} className="cursor-default opacity-70 hover:opacity-100" />
        <Upload size={13} className="cursor-default opacity-70 hover:opacity-100" />
        <Trash2 size={13} className="cursor-default opacity-70 hover:opacity-100" />
      </div>

      <div className="grid grid-cols-[52px_1fr] sm:grid-cols-[64px_1fr] items-start px-2 sm:px-3 py-3 gap-1">
        <div className="flex flex-col items-end gap-2 pt-0.5">
          <ExecutionBadge kind="in" state={state} />
          <button
            aria-label={collapsed ? "Expand code" : "Collapse code"}
            onClick={(e) => {
              e.stopPropagation();
              setCollapsed((c) => !c);
            }}
            className="text-[var(--muted)] hover:opacity-70 transition-opacity"
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        <div className="min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="font-mono text-[11px] uppercase tracking-wide" style={{ color: "var(--muted)" }}>
              {cell.language}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRun();
              }}
              disabled={running}
              aria-label="Run cell"
              className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[12px] font-medium transition-opacity disabled:opacity-60"
              style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)" }}
            >
              <Play size={12} fill="currentColor" />
              {running ? "Running…" : "Run"}
            </button>
          </div>

          {!collapsed && (
            <div className="rounded-md overflow-x-auto" style={{ backgroundColor: "var(--code)" }}>
              <SyntaxHighlighter
                language={cell.language}
                style={theme === "dark" ? vscDarkPlus : oneLight}
                customStyle={{
                  margin: 0,
                  padding: "12px 14px",
                  background: "transparent",
                  fontSize: "12.5px",
                  lineHeight: 1.6,
                }}
                codeTagProps={{ style: { fontFamily: "JetBrains Mono, monospace" } }}
              >
                {cell.code}
              </SyntaxHighlighter>
            </div>
          )}
        </div>
      </div>

      <div className="px-2 sm:px-3 pb-3">
        <OutputCell output={cell.output} state={state} />
      </div>
    </div>
  );
}
