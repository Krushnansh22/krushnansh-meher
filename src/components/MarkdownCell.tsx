import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, Check } from "lucide-react";
import "../styles/jupyter.css";

interface MarkdownCellProps {
  id: string;
  content: string;
  selected?: boolean;
  onSelect?: () => void;
  index?: number;
}

export default function MarkdownCell({
  id,
  content,
  selected = false,
  onSelect,
  index,
}: MarkdownCellProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      id={id}
      onClick={onSelect}
      className={`jp-cell group transition-all duration-150 ${
        selected ? "jp-cell-selected" : ""
      }`}
    >
      {/* Left gutter prompt */}
      <div className="jp-prompt font-mono text-[12px] pt-4 select-none opacity-40 group-hover:opacity-80">
        {index !== undefined ? `[${index}]:` : "[ ]:"}
      </div>

      {/* Markdown Card */}
      <div
        className="relative rounded-md border transition-all duration-150 p-5 sm:p-7"
        style={{
          backgroundColor: "var(--cell)",
          borderColor: selected ? "var(--selected)" : "var(--border)",
          boxShadow: selected ? "0 0 0 1px var(--selected)" : "none",
        }}
      >
        {/* Cell Type & Copy hover badge */}
        <div className="absolute right-3 top-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <span
            className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded border"
            style={{
              backgroundColor: "var(--code)",
              borderColor: "var(--border)",
              color: "var(--muted)",
            }}
          >
            Markdown
          </span>
          <button
            onClick={handleCopy}
            title={copied ? "Copied!" : "Copy Markdown"}
            className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            style={{ color: "var(--muted)" }}
          >
            {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
          </button>
        </div>

        {/* Markdown Rendered Content */}
        <div className="jp-markdown prose dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
