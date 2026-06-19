"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="btn btn-outline"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Alternar tema"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
