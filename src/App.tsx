import { useState } from "react";
import { notebook } from "./content/notebook";
import { useExecutionCounter } from "./hooks/useExecutionCounter";
import { useTheme } from "./hooks/useTheme";
import NotebookToolbar from "./components/NotebookToolbar";
import MarkdownCell from "./components/MarkdownCell";
import CodeCell from "./components/CodeCell";

const codeCellIds = notebook.filter((c) => c.type === "code").map((c) => c.id);

export default function App() {
  const { theme, toggle } = useTheme();
  const { states, runCell, runAll, reset, kernelBusy } = useExecutionCounter(codeCellIds);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleRunAll = () => runAll(codeCellIds);
  const handleRestart = () => {
    reset();
    window.setTimeout(() => runAll(codeCellIds), 50);
  };

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: "var(--paper)" }}>
      <NotebookToolbar
        kernelBusy={kernelBusy}
        onRunAll={handleRunAll}
        onRestart={handleRestart}
        theme={theme}
        onToggleTheme={toggle}
      />

      <main className="max-w-[1300px] mx-auto px-6 py-10">
        <div className="flex flex-col gap-4">
          {notebook.map((cell) =>
            cell.type === "markdown" ? (
              <MarkdownCell key={cell.id} content={cell.content} />
            ) : (
              <CodeCell
                key={cell.id}
                cell={cell}
                state={states[cell.id] ?? { status: "idle", count: null }}
                onRun={() => runCell(cell.id)}
                theme={theme}
                selected={selectedId === cell.id}
                onSelect={() => setSelectedId(cell.id)}
              />
            )
          )}
        </div>

        <footer
          className="mt-10 text-center font-mono text-[11px]"
          style={{ color: "var(--muted)" }}
        >
          Built as a static site — no backend, no database, no live inference.
        </footer>
      </main>
    </div>
  );
}
