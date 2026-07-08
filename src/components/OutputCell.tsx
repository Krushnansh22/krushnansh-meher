import { AnimatePresence, motion } from "framer-motion";
import ExecutionBadge from "./ExecutionBadge";
import { renderOutput } from "../lib/outputRenderers";
import type { CodeOutput } from "../content/notebook";
import type { CellRunState } from "../hooks/useExecutionCounter";

interface OutputCellProps {
  output: CodeOutput;
  state: CellRunState;
}

export default function OutputCell({
  output,
  state,
}: OutputCellProps) {
  return (
    <AnimatePresence>
      {state.status === "done" && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
          }}
          className="jp-output-row"
        >
          <div className="jp-prompt">
            <ExecutionBadge
              kind="out"
              state={state}
            />
          </div>

          <div className="jp-output">

            {renderOutput(
              output.kind,
              output.data
            )}

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}