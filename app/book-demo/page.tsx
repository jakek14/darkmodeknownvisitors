"use client";

import { useState } from "react";
import Footer from "../../components/sections/footer/default";
import Navbar from "../../components/sections/navbar/default";
import DarkModeLogo from "../../components/logos/darkmode-logo";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Section } from "../../components/ui/section";
import { cn } from "@/lib/utils";

export default function BookDemoPage() {
  const fieldClass = "w-full h-11 rounded-md border border-input bg-background px-3 outline-none focus:ring-1 focus:ring-ring";
  const labelClass = "block text-base mb-1 font-medium";
  const [traffic, setTraffic] = useState("");
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-background text-foreground">
      <Navbar
        logo={<DarkModeLogo className="h-12 w-auto" />}
      />

      <div className="pt-20" />

      <Section className="pb-8 sm:pb-16">
        <div className="max-w-container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
              Ready to supercharge your <span className="text-primary">revenue</span>?
            </h1>
            <ul className="text-muted-foreground space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1 size-2 rounded-full bg-primary" />
                <span>See a tailored demo of our product</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 size-2 rounded-full bg-primary" />
                <span>Cater a solution to your needs</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 size-2 rounded-full bg-primary" />
                <span>Get started in as little as 15 minutes</span>
              </li>
            </ul>
          </div>

          <Card className={cn("glass-4 shadow-2xl border-primary/40 bg-card/80 backdrop-blur-md relative overflow-hidden")}> 
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.4),_inset_0_1px_0_0_rgba(255,255,255,0.06)]" />
            <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-primary/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
            <CardContent className="p-6 relative">
              <form
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="sm:col-span-1">
                  <label className={labelClass}>First Name<span className="text-primary">*</span></label>
                  <input
                    type="text"
                    required
                    className={fieldClass}
                    placeholder=""
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className={labelClass}>Last Name<span className="text-primary">*</span></label>
                  <input
                    type="text"
                    required
                    className={fieldClass}
                    placeholder=""
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className={labelClass}>Company Email<span className="text-primary">*</span></label>
                  <input
                    type="email"
                    required
                    className={fieldClass}
                    placeholder="you@example.com"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className={labelClass}>Phone</label>
                  <input
                    type="tel"
                    className={fieldClass}
                    placeholder="(123) 456-7891"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className={labelClass}>Website<span className="text-primary">*</span></label>
                  <input
                    type="url"
                    required
                    className={fieldClass}
                    placeholder="https://example.com"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className={labelClass}>Avg. Monthly Traffic</label>
                  <div className="relative">
                    <select
                      className={cn(fieldClass, "appearance-none pr-10", traffic ? "text-foreground" : "text-muted-foreground")}
                      value={traffic}
                      onChange={(e) => setTraffic(e.target.value)}
                    >
                      <option value="" disabled>Choose a range</option>
                      <option value="lt-50k">{"< 50K"}</option>
                      <option value="50k-150k">50K - 150K</option>
                      <option value="150k-500k">150K - 500K</option>
                      <option value="500k-2m">500K - 2MM</option>
                      <option value=">=2m">2MM+</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </div>
                </div>

                

                <div className="sm:col-span-2">
                  <label className={labelClass}>How Did You Hear About Us? <span className="text-muted-foreground">(optional)</span></label>
                  <textarea
                    rows={4}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-1 focus:ring-ring"
                    placeholder="e.g., Google, LinkedIn, referral, podcast, event, other"
                  />
                </div>

                <div className="sm:col-span-2">
                  <Button type="submit" className="w-full h-16 rounded-xl text-xl font-bold">
                    Book a demo
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Footer />
    </main>
  );
}


