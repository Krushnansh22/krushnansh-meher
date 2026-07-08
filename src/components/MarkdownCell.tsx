import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import "../styles/jupyter-markdown.css";

interface MarkdownCellProps {
  content: string;
}

export default function MarkdownCell({ content }: MarkdownCellProps) {
  return (
    <div
      className="rounded-md border px-8 py-8"
      style={{
        backgroundColor: "var(--cell)",
        borderColor: "var(--border)",
      }}
    >
      <div className="jp-RenderedMarkdown">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}