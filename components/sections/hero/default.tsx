"use client";

import { ReactNode, useState } from "react";


import { Button, type ButtonProps } from "../../ui/button";
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

type LeadSubmissionEvent = {
  event: string;
  form_id: string;
  email: string;
  response_status: number;
  response_status_text: string;
  page_location: string;
  page_path: string;
  page_title: string;
  timestamp: string;
};

interface WindowWithDataLayer extends Window {
  dataLayer?: LeadSubmissionEvent[];
}

export default function Hero({
  mockup = <HeroMemberList />,
  badge = false,
  className,
}: HeroProps) {
  const words = ["Sales", "Leads", "Revenue", "Buyers", "Users"];
  const [email, setEmail] = useState("");
  const [buttonText, setButtonText] = useState("Join the Waitlist");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isValidEmail = (value: string) => {
    const v = value.trim();
    // Basic validation: requires one "@" and at least one "." after the "@"
    // Example: something@domain.tld
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
  };

  const handleEmailSubmit = async () => {
    if (isSubmitting) return;
    const submittedEmail = email.trim();
    if (!isValidEmail(submittedEmail)) {
      setButtonText("Enter a valid email");
      setTimeout(() => {
        setButtonText("Join the Waitlist");
      }, 2000);
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log('Submitting email:', email);

      const response = await fetch("https://sheetdb.io/api/v1/ospfsyvgjb57s", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: submittedEmail
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response status text:', response.statusText);

      if (response.ok) {
        const responseText = await response.text();
        console.log('Response body:', responseText);
        
        try {
          if (typeof window !== "undefined") {
            const w = window as WindowWithDataLayer;
            w.dataLayer = w.dataLayer ?? [];
            w.dataLayer.push({
              event: 'lead_submission',
              form_id: 'hero_waitlist',
              email: submittedEmail,
              response_status: response.status,
              response_status_text: response.statusText,
              page_location: window.location.href,
              page_path: window.location.pathname,
              page_title: document.title,
              timestamp: new Date().toISOString(),
            });
          }
        } catch {}
        
        setButtonText("Thank you!");
        setIsSubmitted(true);
        setEmail("");
        // Reset button text after 3 seconds
        setTimeout(() => {
          setButtonText("Join the Waitlist");
          setIsSubmitted(false);
        }, 3000);
      } else {
        const errorText = await response.text();
        console.error("Failed to submit email:", response.status, response.statusText, errorText);
        
        // Handle specific error cases
        if (response.status === 400) {
          setButtonText("Setup Required");
          setTimeout(() => {
            setButtonText("Join the Waitlist");
          }, 3000);
        } else {
          setButtonText("Try Again");
          setTimeout(() => {
            setButtonText("Join the Waitlist");
          }, 2000);
        }
      }
    } catch (error) {
      console.error("Error submitting email:", error);
      setButtonText("Try Again");
      setTimeout(() => {
        setButtonText("Join the Waitlist");
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEmailSubmit();
    }
  };

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
          {/* Email Input and Waitlist Button */}
          <div className="animate-appear relative z-10 flex flex-col sm:flex-row gap-4 max-w-md w-full opacity-0 delay-300">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isSubmitting || isSubmitted}
              required
              inputMode="email"
              autoComplete="email"
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
              className="flex-1 px-4 py-3 bg-background/50 border border-border/50 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#1da84f]/50 focus:border-[#1da84f] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#1da84f]/20 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <Button
              variant="default"
              size="lg"
              onClick={handleEmailSubmit}
              disabled={isSubmitting || isSubmitted || !email || !isValidEmail(email)}
              className={`transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#1da84f]/30 transform ${
                isSubmitted 
                  ? "bg-green-600 hover:bg-green-700 text-white" 
                  : "bg-[#1da84f] hover:bg-[#1da84f]/90 text-white"
              } ${(isSubmitting || isSubmitted || !email || !isValidEmail(email)) ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isSubmitting ? "Submitting..." : buttonText}
            </Button>
          </div>
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
