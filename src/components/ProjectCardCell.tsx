import { ExternalLink, Github, FolderGit2, Star, Sparkles } from "lucide-react";
import type { ProjectItem } from "../content/resumeData";

interface ProjectCardCellProps {
  project: ProjectItem;
  selected?: boolean;
  onSelect?: () => void;
  index: number;
}

export default function ProjectCardCell({
  project,
  selected = false,
  onSelect,
  index,
}: ProjectCardCellProps) {
  return (
    <div
      onClick={onSelect}
      className={`jp-cell group transition-colors duration-150 ${
        selected ? "jp-cell-selected" : ""
      }`}
    >
      {/* Jupyter Left Prompt */}
      <div className="jp-prompt font-mono text-[12px] pt-4 select-none opacity-60 group-hover:opacity-100">
        [{index}]:
      </div>

      {/* Card Body */}
      <div
        className="relative rounded-md border transition-all duration-200 p-5 sm:p-6"
        style={{
          backgroundColor: "var(--cell)",
          borderColor: selected ? "var(--selected)" : "var(--border)",
          boxShadow: selected ? "0 0 0 1px var(--selected)" : "none",
        }}
      >
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2.5">
            <div
              className="p-1.5 rounded-md"
              style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)" }}
            >
              <FolderGit2 size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-sans font-bold text-lg sm:text-xl tracking-tight" style={{ color: "var(--ink)" }}>
                  {project.title}
                </h3>
                <span
                  className="text-[11px] font-mono px-2 py-0.5 rounded-full border uppercase tracking-wider"
                  style={{
                    backgroundColor: "var(--code)",
                    borderColor: "var(--border)",
                    color: "var(--muted)",
                  }}
                >
                  {project.category}
                </span>
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border transition-all hover:opacity-85 shadow-sm"
              style={{
                backgroundColor: "var(--code)",
                borderColor: "var(--border)",
                color: "var(--ink)",
              }}
            >
              <Github size={13} />
              <span>Repository</span>
              <ExternalLink size={11} className="opacity-60" />
            </a>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold border transition-all hover:opacity-90 shadow-sm"
                style={{
                  backgroundColor: "var(--accent)",
                  borderColor: "var(--accent)",
                  color: "#ffffff",
                }}
              >
                <Sparkles size={12} />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>

        {/* Tagline */}
        <p className="mt-3.5 text-sm sm:text-[15px] font-medium leading-relaxed" style={{ color: "var(--ink)" }}>
          {project.tagline}
        </p>

        {/* Bullet Points */}
        <ul className="mt-3 space-y-1.5 text-xs sm:text-[13.5px] leading-relaxed list-disc list-inside" style={{ color: "var(--muted)" }}>
          {project.highlights.map((h, i) => (
            <li key={i} className="marker:text-orange-500">
              <span style={{ color: "var(--ink)" }}>{h}</span>
            </li>
          ))}
        </ul>

        {/* Tech Stack Pills */}
        <div className="mt-4 pt-3.5 flex flex-wrap items-center gap-1.5 border-t" style={{ borderColor: "var(--border)" }}>
          <span className="text-[11px] font-mono mr-1" style={{ color: "var(--muted)" }}>
            stack:
          </span>
          {project.tags.map((t) => (
            <span
              key={t}
              className="text-[11.5px] font-mono px-2 py-0.5 rounded border"
              style={{
                backgroundColor: "var(--code)",
                borderColor: "var(--border)",
                color: "var(--ink)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
