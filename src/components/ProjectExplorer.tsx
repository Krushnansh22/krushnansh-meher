import { useState } from "react";
import { Filter, Search, X } from "lucide-react";
import { resumeData } from "../content/resumeData";
import { notebook } from "../content/notebook";

const projectCells = notebook.filter(cell => cell.type === "project");
const suggestions = ["FastAPI", "Offline", "Computer vision", "Agents"];

interface ExplorerProps {
  selected: boolean;
  onSelect: () => void;
  onOpen: (id: string) => void;
}

export default function ProjectExplorer({selected, onSelect, onOpen}: ExplorerProps) {
  const [query, setQuery] = useState("");
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const matches = projectCells.filter(cell => {
    if (cell.type !== "project") return false;
    const p = cell.project;
    const text = [p.title, p.category, p.tagline, ...p.highlights, ...p.tags].join(" ").toLowerCase();
    return words.every(word => text.includes(word));
  });

  return <section id="explorer" className={'jp-cell ' + (selected ? 'jp-cell-selected' : '')} onClick={onSelect} onFocus={onSelect}>
    <div className="jp-prompt">[ ]:</div>
    <div className="explorer-body">
      <div className="explorer-title"><Filter size={16}/><h2>Project explorer</h2></div>
      <div className="explorer-input">
        <label htmlFor="project-query"><Search size={16}/> Filter projects</label>
        <input id="project-query" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by tool, topic, or project name" />
        {query && <button type="button" onClick={()=>setQuery("")} aria-label="Clear filter"><X size={16}/></button>}
      </div>
      <div className="explorer-presets">{suggestions.map(term => <button type="button" key={term} aria-pressed={query === term} onClick={()=>setQuery(query === term ? "" : term)}>{term}</button>)}</div>
      <div className="explorer-output">
        <p role="status">{matches.length} of {resumeData.projects.length} projects</p>
        {matches.length ? <table><thead><tr><th>Project</th><th>Domain</th></tr></thead><tbody>{matches.map(cell => cell.type === "project" && <tr key={cell.id}><td><a href={'#'+cell.id} onClick={e=>{ e.preventDefault(); e.stopPropagation(); onOpen(cell.id); }}>{cell.project.title}</a></td><td>{cell.project.category}</td></tr>)}</tbody></table> : <p>Try a broader term or clear the filter to see every project.</p>}
      </div>
    </div>
  </section>;
}
