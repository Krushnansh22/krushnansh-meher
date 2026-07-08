import { AnimatePresence, motion } from "framer-motion";
import ExecutionBadge from "./ExecutionBadge";
import { renderOutput } from "../lib/outputRenderers";
import type { CodeOutput } from "../content/notebook";
import type { CellRunState } from "../hooks/useExecutionCounter";

interface OutputCellProps {
  output: CodeOutput;
  state: CellRunState;
}

export default function OutputCell({ output, state }: OutputCellProps) {
  return (
    <AnimatePresence>
      {state.status === "done" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="grid grid-cols-[52px_1fr] sm:grid-cols-[64px_1fr] mt-1"
        >
          <ExecutionBadge kind="out" state={state} />
          <div className="min-w-0 py-1 pr-1 sm:pr-0">{renderOutput(output.kind, output.data)}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
