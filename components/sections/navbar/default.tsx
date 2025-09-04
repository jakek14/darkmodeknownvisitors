"use client"

import { ReactNode, useState } from "react";

import { cn } from "@/lib/utils";


import { Button, type ButtonProps } from "../../ui/button";
// removed unused NavbarComponent import
import { GlowingEffect } from "../../ui/glowing-effect";

interface NavbarActionProps {
  text: string;
  href: string;
  variant?: ButtonProps["variant"];
  icon?: ReactNode;
  iconRight?: ReactNode;
  isButton?: boolean;
}

interface NavbarProps {
  logo?: ReactNode;
  name?: string;
  homeUrl?: string;
  actions?: NavbarActionProps[];
  className?: string;
}

export default function Navbar({
  logo = null,
  name = "",
  homeUrl = "/",
  actions = [],
  className,
}: NavbarProps) {
  const [isHover, setIsHover] = useState(false);
  const actionsToShow: NavbarActionProps[] = actions.length
    ? actions
    : [
        { text: "Book Demo", href: "/demo", isButton: true, variant: "default" },
      ];

  return (
    <header className={cn("fixed left-0 right-0 z-50 top-2 sm:top-3 px-2 sm:px-4 pt-3 sm:pt-4 pb-2", className)}>
      <div className="max-w-container mx-auto relative">
        <div
          className="relative w-full glass-3 rounded-xl sm:rounded-2xl border border-border/70 dark:border-border/5 dark:border-t-border/15 bg-card p-2 sm:p-3 pl-3 sm:pl-4 pr-3 sm:pr-4 shadow-xl"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          {/* Perimeter glow that hugs the navbar container (outside only) */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[0_0_30px_6px_rgba(29,168,79,0.175),_0_0_80px_20px_rgba(29,168,79,0.075)]"
            aria-hidden
          />
          <GlowingEffect
            blur={0}
            borderWidth={3}
            spread={80}
            glow={true}
            disabled={!isHover}
            proximity={64}
            inactiveZone={0.01}
          />
          <div className="relative z-10 flex items-center justify-between">
            <a href={homeUrl} className="flex items-center gap-2">
              {logo}
              {name && <span className="sr-only">{name}</span>}
            </a>
            <div className="flex items-center gap-2 sm:gap-3">
              <Button asChild size="lg" className="h-9 px-4 sm:h-10 sm:px-5 rounded-full">
                <a href={actionsToShow[0].href}>{actionsToShow[0].text}</a>
              </Button>
            </div>
          </div>
        </div>
        {/* Soft glow beneath navbar */}
        <div className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 mt-2 w-[90%] h-8 sm:h-10 bg-gradient-radial from-[#1da84f]/25 via-[#1da84f]/10 to-transparent blur-xl sm:blur-2xl opacity-70"></div>
      </div>
    </header>
  );
}
