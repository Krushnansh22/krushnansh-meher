import { useState, useMemo } from "react";
import { notebook, type Cell } from "./content/notebook";
import { useExecutionCounter } from "./hooks/useExecutionCounter";
import { useTheme } from "./hooks/useTheme";
import ProjectExplorer from "./components/ProjectExplorer";
import JupyterHeader from "./components/JupyterHeader";
import JupyterMenuBar from "./components/JupyterMenuBar";
import NotebookToolbar from "./components/NotebookToolbar";
import JupyterSidebar from "./components/JupyterSidebar";
import JupyterStatusBar from "./components/JupyterStatusBar";
import MarkdownCell from "./components/MarkdownCell";
import CodeCell from "./components/CodeCell";
import ProjectCardCell from "./components/ProjectCardCell";

export default function App() {
  const { theme, toggle } = useTheme();

  // Extract only the code cells for execution counter
  const codeCellIds = useMemo(
    () => notebook.filter((c): c is Extract<Cell, { type: "code" }> => c.type === "code").map((c) => c.id),
    []
  );

  const { states, runCell, runAll, reset, kernelBusy } = useExecutionCounter(codeCellIds);
  const [selectedId, setSelectedId] = useState<string>("intro");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleRunAll = () => runAll(codeCellIds);
  const handleRestart = () => {
    reset();
    window.setTimeout(() => runAll(codeCellIds), 80);
  };

  const handleSelectSection = (id: string) => {
    setSelectedId(id);
    setIsSidebarOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    }
  };

  // Find title of currently selected section for the status bar
  const activeSectionTitle = useMemo(() => {
    const activeCell = notebook.find((c) => c.id === selectedId);
    if (!activeCell) return "Profile & Overview";
    if (activeCell.type === "widget") return "Project explorer";
    if (activeCell.id === "intro") return "1. Profile & Bio";
    if (activeCell.id === "diagnostics") return "2. System Diagnostics";
    if (activeCell.id === "skills") return "3. Technical Skills";
    if (activeCell.id === "experience") return "4. Work Experience";
    if (activeCell.id === "publication") return "5. IEEE Publication";
    if (activeCell.type === "project" || activeCell.id === "projects-header") return "6. Featured Projects";
    if (activeCell.id === "education") return "7. Education & Leadership";
    if (activeCell.id === "contact") return "8. Connect & Links";
    return "Profile & Overview";
  }, [selectedId]);

  return (
    <div
      className="min-h-screen font-sans flex flex-col pb-12 transition-colors duration-150"
      style={{ backgroundColor: "var(--paper)" }}
    >
      {/* 1. JupyterLab Top Header */}
      <JupyterHeader
        kernelBusy={kernelBusy}
        theme={theme}
        onToggleTheme={toggle}
      />

      {/* 2. Menu Bar with working dropdowns */}
      <JupyterMenuBar
        onRunAll={handleRunAll}
        onRestart={handleRestart}
        onToggleSidebar={() => setIsSidebarOpen((v) => !v)}
        theme={theme}
        onToggleTheme={toggle}
      />

      {/* 3. Action Toolbar */}
      <NotebookToolbar
        kernelBusy={kernelBusy}
        onRunAll={handleRunAll}
        onRestart={handleRestart}
        onToggleSidebar={() => setIsSidebarOpen((v) => !v)}
        isSidebarOpen={isSidebarOpen}
      />

      {/* 4. Left Collapsible Activity Sidebar */}
      <JupyterSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeSection={selectedId}
        onSelectSection={handleSelectSection}
      />

      {/* 5. Main Notebook Body */}
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-3 sm:px-6 md:px-8 py-6 sm:py-8">
        <div className="flex flex-col gap-5 sm:gap-6">
          {notebook.map((cell, index) => {
            if (cell.type === "widget") return <ProjectExplorer key={cell.id} selected={selectedId === cell.id} onSelect={() => setSelectedId(cell.id)} onOpen={handleSelectSection} />;
            if (cell.type === "markdown") {
              return (
                <MarkdownCell
                  key={cell.id}
                  id={cell.id}
                  content={cell.content}
                  selected={selectedId === cell.id}
                  onSelect={() => setSelectedId(cell.id)}
                  index={index + 1}
                />
              );
            }

            if (cell.type === "code") {
              return (
                <CodeCell
                  key={cell.id}
                  cell={cell}
                  state={states[cell.id] ?? { status: "idle", count: null }}
                  onRun={() => runCell(cell.id)}
                  theme={theme}
                  selected={selectedId === cell.id}
                  onSelect={() => setSelectedId(cell.id)}
                />
              );
            }

            if (cell.type === "project") {
              return (
                <div key={cell.id} id={cell.id}>
                  <ProjectCardCell
                    project={cell.project}
                    selected={selectedId === cell.id}
                    onSelect={() => setSelectedId(cell.id)}
                    index={index + 1}
                  />
                </div>
              );
            }

            return null;
          })}
        </div>

        {/* Notebook End Footer */}
        <div
          className="mt-12 py-6 text-center font-mono text-xs border-t opacity-70"
          style={{ borderColor: "var(--border)", color: "var(--muted)" }}
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <span>krushnansh_meher_portfolio.ipynb • End of notebook</span>
          </div>
          <div>All projects, publications, and experience verified from 2026 resume.</div>
        </div>
      </main>

      {/* 6. JupyterLab Persistent Status Bar */}
      <JupyterStatusBar
        kernelBusy={kernelBusy}
        cellCount={notebook.length}
        activeSectionTitle={activeSectionTitle}
      />
    </div>
  );
}
