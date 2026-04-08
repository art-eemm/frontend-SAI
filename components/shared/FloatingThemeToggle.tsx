"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";

export default function FloatingThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = (e: React.MouseEvent) => {
    const isDark = resolvedTheme === "dark";
    const nextTheme = isDark ? "light" : "dark";

    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    const x = e.clientX;
    const y = e.clientY;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(x, window.innerHeight - y),
    );

    const transition = document.startViewTransition(() => {
      setTheme(nextTheme);
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        { clipPath: clipPath },
        {
          duration: 500,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(theme-change)",
        },
      );
    });
  };

  if (!mounted || pathname.startsWith("/dashboard")) return null;

  return (
    <Button
      variant={"outline"}
      size={"icon"}
      className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-xl border-2 border-border bg-background dark:bg-accent z-50 hover:bg- dark:hover:bg-muted/80 transition-colors cursor-pointer"
      onClick={handleThemeChange}
      aria-label="Cambiar tema"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="h-6 w-6 text-foreground" />
      ) : (
        <Moon className="h-6 w-6 text-foreground" />
      )}
    </Button>
  );
}
