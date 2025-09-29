"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { GlowingEffect } from "./glowing-effect";

interface AnimatedGlassCardProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedGlassCard({ children, className }: AnimatedGlassCardProps) {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      className={cn(
        "relative w-full glass-3 hover:glass-4 rounded-2xl border border-border/70 dark:border-border/5 dark:border-t-border/15 bg-card p-6 shadow-xl transition-all duration-300 hover:shadow-2xl transform-gpu will-change-transform",
        className
      )}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <GlowingEffect
        blur={0}
        borderWidth={3}
        spread={80}
        glow
        disabled={!isHover}
        proximity={64}
        inactiveZone={0.01}
      />
      {children}
    </div>
  );
}


