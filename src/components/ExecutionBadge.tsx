import { motion } from "framer-motion";
import type { CellRunState } from "../hooks/useExecutionCounter";

interface ExecutionBadgeProps {
  kind: "in" | "out";
  state: CellRunState;
}

export default function ExecutionBadge({ kind, state }: ExecutionBadgeProps) {
  const label = kind === "in" ? "In" : "Out";

  let inner: React.ReactNode;
  if (state.status === "running") {
    inner = <span className="animate-blink">*</span>;
  } else if (state.status === "done" && state.count !== null) {
    inner = state.count;
  } else {
    inner = " ";
  }

  return (
    <motion.div
      key={`${kind}-${state.count}-${state.status}`}
      initial={{ opacity: 0.4 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="select-none whitespace-nowrap font-mono text-[13px] leading-6 text-right pr-2"
      style={{ color: state.status === "running" ? "var(--accent)" : "var(--muted)" }}
      aria-hidden="true"
    >
      {label} [{inner}]:
    </motion.div>
  );
}
