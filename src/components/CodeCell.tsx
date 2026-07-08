import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Play,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

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

export default function CodeCell({
  cell,
  state,
  onRun,
  theme,
  selected,
  onSelect,
}: CodeCellProps) {
  const [collapsed, setCollapsed] = useState(false);

  const running = state.status === "running";

  return (
    <div
      onClick={onSelect}
      className={`jp-cell ${selected ? "jp-cell-selected" : ""}`}
    >
      {/* Left execution prompt */}

      <div className="jp-prompt">
        <ExecutionBadge kind="in" state={state} />
      </div>

      {/* Cell */}

      <div className="jp-code-body">

        <div className="jp-code-toolbar">

          <button
            className="jp-collapse-btn"
            onClick={(e) => {
              e.stopPropagation();
              setCollapsed((v) => !v);
            }}
          >
            {collapsed ? (
              <ChevronRight size={15} />
            ) : (
              <ChevronDown size={15} />
            )}
          </button>

          <span className="jp-language">
            {cell.language}
          </span>

          <button
            className="jp-run-btn"
            disabled={running}
            onClick={(e) => {
              e.stopPropagation();
              onRun();
            }}
          >
            <Play size={13} />
            {running ? "Running…" : "Run"}
          </button>

        </div>

        {!collapsed && (

          <div className="jp-code">

            <SyntaxHighlighter
              language={cell.language}
              style={theme === "dark" ? vscDarkPlus : oneLight}
              customStyle={{
                margin: 0,
                background: "transparent",
                padding: "18px",
                fontSize: "13px",
                lineHeight: 1.65,
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

        <OutputCell
          output={cell.output}
          state={state}
        />

      </div>
    </div>
  );
}