import { Moon, Sun } from "lucide-react";
import type { Theme } from "../hooks/useTheme";

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
      className="inline-flex items-center justify-center rounded-md w-8 h-8 transition-colors"
      style={{ color: "var(--muted)" }}
    >
      {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}
