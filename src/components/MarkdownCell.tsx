import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChevronDown, Copy, ArrowUp, ArrowDown, Upload, Trash2 } from "lucide-react";
import "../styles/jupyter.css";

interface MarkdownCellProps {
  content: string;
}

export default function MarkdownCell({ content }: MarkdownCellProps) {
  return (
    <div className="jp-cell jp-markdown-wrapper">

      {/* Left gutter */}
      <div className="jp-prompt">
        <ChevronDown size={15} />
      </div>

      {/* Card */}
      <div className="jp-markdown-card">

        {/* Hover toolbar */}
        <div className="jp-cell-toolbar">
          <Copy size={14} />
          <ArrowUp size={14} />
          <ArrowDown size={14} />
          <Upload size={14} />
          <Trash2 size={14} />
        </div>

        <div className="jp-markdown">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>

      </div>

    </div>
  );
}