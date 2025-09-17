"use client";

import { ReactNode } from "react";


import type { ButtonProps } from "../../ui/button";
import { HeroMemberList } from "../../ui/hero-member-list";
import { Mockup, MockupFrame } from "../../ui/mockup";
import { Section } from "../../ui/section";
import { CyclingHyperText } from "../../ui/cycling-hyper-text";

import { cn } from "@/lib/utils";

interface HeroButtonProps {
  href: string;
  text: string;
  variant?: ButtonProps["variant"];
  icon?: ReactNode;
  iconRight?: ReactNode;
}

interface HeroProps {
  title?: string;
  description?: string;
  mockup?: ReactNode | false;
  badge?: ReactNode | false;
  buttons?: HeroButtonProps[] | false;
  className?: string;
}

export default function Hero({
  mockup = <HeroMemberList />,
  badge = false,
  className,
}: HeroProps) {
  const words = ["Sales", "Leads", "Revenue", "Buyers", "Users"];
  // Removed waitlist form; keep minimal state only if needed in future

  // Removed waitlist submit handler entirely

  // Form submission is handled via onSubmit to ensure consistent validation on Enter or click

  return (
    <Section
      className={cn(
        "overflow-hidden pb-0 sm:pb-0 md:pb-0 relative",
        className,
      )}
    >
      {/* Ambient Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-gradient-radial from-[#1da84f]/8 via-[#1da84f]/4 to-transparent rounded-full blur-3xl opacity-60" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-radial from-[#1da84f]/6 via-[#1da84f]/3 to-transparent rounded-full blur-2xl opacity-50" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-radial from-[#1da84f]/4 via-[#1da84f]/2 to-transparent rounded-full blur-xl opacity-40" />
      </div>
      
      <div className="max-w-container mx-auto flex flex-col gap-0 pt-0 sm:gap-0 relative z-10">
        <div className="flex flex-col items-center gap-0 text-center">
          {badge !== false && (
            <div className="-mt-12 sm:-mt-16">
              {badge}
            </div>
          )}
          <h1 className="animate-appear from-foreground to-foreground dark:to-muted-foreground relative z-10 block bg-linear-to-r bg-clip-text text-4xl leading-tight font-semibold text-balance text-transparent drop-shadow-2xl sm:text-6xl sm:leading-tight md:text-8xl md:leading-tight text-center">
            Turn Anonymous Visitors Into
          </h1>
          <div className="text-center mb-8">
            <CyclingHyperText
              words={words}
              className="text-4xl leading-tight font-semibold sm:text-6xl md:text-8xl text-[#1da84f]"
              duration={1200}
              cycleDuration={4000}
            />
          </div>
          <p className="text-md animate-appear text-muted-foreground relative z-10 max-w-[740px] font-medium text-balance opacity-0 delay-100 sm:text-xl mb-8">
            KnownVisitors identifies your anonymous website visitors even if they never filled out a form.
          </p>
          {/* Removed email capture form */}
          {mockup !== false && (
            <div className="relative w-full pt-8">
              <MockupFrame
                className="animate-appear opacity-0 delay-700"
                size="small"
              >
                <Mockup
                  type="responsive"
                  className="bg-background/90 w-full rounded-xl border-0"
                >
                  {mockup}
                </Mockup>
              </MockupFrame>
              {/* Enhanced Radial Glow behind image */}
              <div className="absolute inset-0 pointer-events-none animate-appear-zoom opacity-0 delay-1000">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1600px] h-[1000px] bg-gradient-radial from-[#1da84f]/15 via-[#1da84f]/8 to-transparent rounded-full blur-3xl opacity-80" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-gradient-radial from-[#1da84f]/12 via-[#1da84f]/6 to-transparent rounded-full blur-2xl opacity-70" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-radial from-[#1da84f]/10 via-[#1da84f]/4 to-transparent rounded-full blur-xl opacity-60" />
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
