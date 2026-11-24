import { useState } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import oneLight from "react-syntax-highlighter/dist/esm/styles/prism/one-light";
import vscDarkPlus from "react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus";
import { Play, ChevronDown, ChevronRight, Copy, Check } from "lucide-react";

import ExecutionBadge from "./ExecutionBadge";
import OutputCell from "./OutputCell";

import type { Cell } from "../content/notebook";
import type { CellRunState } from "../hooks/useExecutionCounter";

SyntaxHighlighter.registerLanguage("python", python);

interface CodeCellProps {
  cell: Extract<Cell, { type: "code" }>;
  state: CellRunState;
  onRun: () => void;
  theme: "light" | "dark";
  selected: boolean;
  onSelect: () => void;
}

export default function CodeCell({
  cell,
  state,
  onRun,
  theme,
  selected,
  onSelect,
}: CodeCellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [copied, setCopied] = useState(false);

  const running = state.status === "running";

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(cell.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      id={cell.id}
      tabIndex={0}
      aria-label={cell.id + " code cell"}
      onFocus={onSelect}
      onKeyDown={(event) => {
        if (event.shiftKey && event.key === "Enter" && !running) {
          event.preventDefault();
          onRun();
        }
      }}
      onClick={onSelect}
      className={`jp-cell group ${selected ? "jp-cell-selected" : ""}`}
    >
      {/* Left execution prompt */}
      <div className="jp-prompt">
        <ExecutionBadge kind="in" state={state} />
      </div>

      {/* Code body */}
      <div className="jp-code-body">
        {/* Cell Toolbar */}
        <div className="jp-code-toolbar flex items-center justify-between pb-1.5">
          <div className="flex items-center gap-2">
            <button
              className="jp-collapse-btn p-0.5 rounded hover:bg-black/5 dark:hover:bg-white/10"
              onClick={(e) => {
                e.stopPropagation();
                setCollapsed((v) => !v);
              }}
              title={collapsed ? "Expand code" : "Collapse code"}
            >
              {collapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
            </button>

            <span className="jp-language font-mono text-[11px] font-semibold text-orange-600 dark:text-orange-400">
              [{cell.language}]
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-1 rounded opacity-60 hover:opacity-100 transition-opacity"
              title={copied ? "Copied code!" : "Copy code"}
            >
              {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
            </button>

            <button
              className="jp-run-btn"
              disabled={running}
              onClick={(e) => {
                e.stopPropagation();
                onRun();
              }}
              title="Execute cell (Shift+Enter)"
            >
              <Play size={11} fill="currentColor" />
              <span>{running ? "Running…" : "Run"}</span>
            </button>
          </div>
        </div>

        {/* Code Content */}
        {!collapsed && (
          <div className="jp-code shadow-xs">
            <SyntaxHighlighter
              language={cell.language}
              style={theme === "dark" ? vscDarkPlus : oneLight}
              customStyle={{
                margin: 0,
                background: "transparent",
                padding: "16px",
                fontSize: "13px",
                lineHeight: 1.6,
                borderRadius: 0,
              }}
              codeTagProps={{
                style: {
                  fontFamily: "JetBrains Mono, monospace",
                },
              }}
            >
              {cell.code}
            </SyntaxHighlighter>
          </div>
        )}

        {/* Output Area */}
        <OutputCell output={cell.output} state={state} />
      </div>
    </div>
  );
}
