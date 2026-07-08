import { useCallback, useRef, useState } from "react";

export type CellRunState = {
  status: "idle" | "running" | "done";
  count: number | null;
};

/**
 * Manages a single global "kernel" execution counter, exactly like a real
 * Jupyter kernel: the counter increments in the order cells are *run*,
 * not necessarily top-to-bottom, and re-running a cell gives it a new
 * (higher) number while keeping every other cell's number untouched.
 */
export function useExecutionCounter(cellIds: string[]) {
  const [states, setStates] = useState<Record<string, CellRunState>>(() =>
    Object.fromEntries(cellIds.map((id) => [id, { status: "idle", count: null }]))
  );
  const counterRef = useRef(0);
  const [kernelBusy, setKernelBusy] = useState(false);

  const runCell = useCallback((id: string) => {
    setStates((prev) => ({ ...prev, [id]: { ...prev[id], status: "running" } }));
    setKernelBusy(true);

    const delay = 300 + Math.random() * 500;
    window.setTimeout(() => {
      counterRef.current += 1;
      const n = counterRef.current;
      setStates((prev) => ({ ...prev, [id]: { status: "done", count: n } }));
      setKernelBusy(false);
    }, delay);
  }, []);

  const runAll = useCallback(
    (orderedIds: string[]) => {
      orderedIds.forEach((id, i) => {
        window.setTimeout(() => runCell(id), i * 650);
      });
    },
    [runCell]
  );

  const reset = useCallback(() => {
    counterRef.current = 0;
    setStates(Object.fromEntries(cellIds.map((id) => [id, { status: "idle", count: null }])));
  }, [cellIds]);

  return { states, runCell, runAll, reset, kernelBusy };
}
