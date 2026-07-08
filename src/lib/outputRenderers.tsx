import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import type { OutputKind } from "../content/notebook";

interface RendererProps {
  data: any;
}

function MetricsRenderer({ data }: RendererProps) {
  return (
    <div>
      {data.title && (
        <div className="mb-3 text-[13px] font-medium" style={{ color: "var(--muted)" }}>
          {data.title}
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {data.metrics.map((m: any) => (
          <div
            key={m.label}
            className="rounded-md border px-3 py-3"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--cell)" }}
          >
            <div className="text-lg font-mono font-semibold" style={{ color: "var(--accent)" }}>
              {m.value}
            </div>
            <div className="mt-1 text-[11px] leading-tight" style={{ color: "var(--muted)" }}>
              {m.label}
            </div>
            {m.hint && (
              <div className="mt-0.5 text-[10px] italic" style={{ color: "var(--muted)" }}>
                {m.hint}
              </div>
            )}
          </div>
        ))}
      </div>
      {data.footer && (
        <div className="mt-3 font-mono text-[12px]" style={{ color: "var(--muted)" }}>
          # {data.footer}
        </div>
      )}
    </div>
  );
}

function JsonRenderer({ data }: RendererProps) {
  const pretty = JSON.stringify(data.data, null, 2);
  return (
    <div>
      {data.title && (
        <div className="mb-2 text-[13px] font-medium" style={{ color: "var(--muted)" }}>
          {data.title}
        </div>
      )}
      <pre
        className="rounded-md border overflow-x-auto px-4 py-3 font-mono text-[12.5px] leading-relaxed"
        style={{ backgroundColor: "var(--code)", borderColor: "var(--border)", color: "var(--ink)" }}
      >
        {pretty}
      </pre>
    </div>
  );
}

function TextRenderer({ data }: RendererProps) {
  return (
    <div>
      {data.title && (
        <div className="mb-2 text-[13px] font-medium" style={{ color: "var(--muted)" }}>
          {data.title}
        </div>
      )}
      <pre
        className="rounded-md border overflow-x-auto px-4 py-3 font-mono text-[12.5px] leading-relaxed"
        style={{ backgroundColor: "var(--code)", borderColor: "var(--border)", color: "var(--run)" }}
      >
        {data.lines.join("\n")}
      </pre>
    </div>
  );
}

function TypewriterRenderer({ data }: RendererProps) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    setShown("");
    let i = 0;
    const full = data.response as string;
    const interval = window.setInterval(() => {
      i += 1;
      setShown(full.slice(0, i));
      if (i >= full.length) window.clearInterval(interval);
    }, 14);
    return () => window.clearInterval(interval);
  }, [data.response]);

  return (
    <div>
      {data.title && (
        <div className="mb-2 text-[13px] font-medium" style={{ color: "var(--muted)" }}>
          {data.title}
        </div>
      )}
      <div
        className="rounded-md border px-4 py-3"
        style={{ backgroundColor: "var(--code)", borderColor: "var(--border)" }}
      >
        <div className="font-mono text-[12px] mb-2" style={{ color: "var(--muted)" }}>
          &gt; {data.prompt}
        </div>
        <div className="font-mono text-[13px] leading-relaxed" style={{ color: "var(--ink)" }}>
          {shown}
          <span className="animate-blink">▌</span>
        </div>
        {data.meta && (
          <div className="mt-2 font-mono text-[11px]" style={{ color: "var(--muted)" }}>
            {data.meta.model} · {data.meta.latency_ms}ms · {data.meta.tokens} tokens
          </div>
        )}
      </div>
    </div>
  );
}

function IframeRenderer({ data }: RendererProps) {
  if (!data.src) {
    return (
      <div
        className="rounded-md border px-4 py-4 text-[13px]"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--code)", color: "var(--muted)" }}
      >
        <div className="font-medium mb-1" style={{ color: "var(--ink)" }}>
          {data.title}
        </div>
        {data.note ?? "Dashboard embed not configured yet."}
      </div>
    );
  }
  return (
    <div>
      {data.title && (
        <div className="mb-2 text-[13px] font-medium" style={{ color: "var(--muted)" }}>
          {data.title}
        </div>
      )}
      <div className="rounded-md border overflow-hidden" style={{ borderColor: "var(--border)" }}>
        <iframe
          src={data.src}
          title={data.title}
          className="w-full h-[420px]"
          loading="lazy"
        />
      </div>
    </div>
  );
}

function LinksRenderer({ data }: RendererProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {data.links.map((l: any) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-[13px] font-medium hover:opacity-80 transition-opacity"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--code)", color: "var(--accent)" }}
        >
          {l.label} <ExternalLink size={13} />
        </a>
      ))}
    </div>
  );
}

const renderers: Record<OutputKind, (props: RendererProps) => JSX.Element> = {
  metrics: MetricsRenderer,
  json: JsonRenderer,
  text: TextRenderer,
  typewriter: TypewriterRenderer,
  iframe: IframeRenderer,
  links: LinksRenderer,
  image: ({ data }) => (
    <img src={data.src} alt={data.alt ?? ""} className="rounded-md border max-w-full" style={{ borderColor: "var(--border)" }} />
  ),
};

export function renderOutput(kind: OutputKind, data: any) {
  const Renderer = renderers[kind];
  if (!Renderer) return null;
  return <Renderer data={data} />;
}
