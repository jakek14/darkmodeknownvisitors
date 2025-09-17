"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setIsSubmitted(false);
    setError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);

    const rawWebsite = String(fd.get("website") || "").trim();
    let normalizedWebsite = rawWebsite;
    if (normalizedWebsite && !/^https?:\/\//i.test(normalizedWebsite)) {
      normalizedWebsite = `https://${normalizedWebsite}`;
    }
    try {
      // Validate normalized website
      if (!normalizedWebsite) throw new Error("missing");
      // eslint-disable-next-line no-new
      new URL(normalizedWebsite);
    } catch {
      setIsSubmitting(false);
      setError("Please enter a valid website URL");
      return;
    }

    const payload = {
      first_name: String(fd.get("first_name") || ""),
      last_name: String(fd.get("last_name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      website: normalizedWebsite,
      avg_monthly_traffic: String(fd.get("avg_monthly_traffic") || ""),
      hear_about: String(fd.get("hear_about") || ""),
    };

    try {
      const res = await fetch("/api/lead-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to submit");
      }
      form.reset();
      setTraffic("");
      setIsSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-background text-foreground">
      <Navbar
        logo={<DarkModeLogo className="h-12 w-auto" />}
      />

      <div className="pt-20" />

      <Section className="pb-8 sm:pb-16">
        {isSubmitted ? (
          <div className="max-w-container mx-auto py-24">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center"
            >
              <h3 className="text-3xl sm:text-4xl font-semibold mb-4">Thanks for your interest in KnownVisitors!</h3>
              <p className="text-lg text-muted-foreground">
                A member of our team will personally reach out to learn more about your goals and walk you through the platform.
              </p>
            </motion.div>
          </div>
        ) : (
        <div className="max-w-container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
              Turn Anonymous Visitors into <span className="text-primary">Paying Customers</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Join the fastest-growing brands that use KnownVisitors to identify hidden traffic, capture more leads, and grow revenue — without changing your stack.
            </p>
          </div>

          <Card className={cn("glass-5 shadow-2xl border-primary/60 bg-card/95 backdrop-blur-xl ring-1 ring-primary/15 dark:ring-white/10 relative overflow-hidden")}> 
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.4),_inset_0_1px_0_0_rgba(255,255,255,0.06)]" />
            <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-primary/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
            <CardContent className="p-6 relative">
                    <form
                      id="book-demo-form"
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                onSubmit={handleSubmit}
              >
                <div className="sm:col-span-1">
                  <label className={labelClass}>First Name<span className="text-primary">*</span></label>
                  <input
                    type="text"
                    required
                    name="first_name"
                    className={fieldClass}
                    placeholder=""
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className={labelClass}>Last Name<span className="text-primary">*</span></label>
                  <input
                    type="text"
                    required
                    name="last_name"
                    className={fieldClass}
                    placeholder=""
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className={labelClass}>Company Email<span className="text-primary">*</span></label>
                  <input
                    type="email"
                    required
                    name="email"
                    className={fieldClass}
                    placeholder="you@example.com"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className={labelClass}>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    className={fieldClass}
                    placeholder="(123) 456-7891"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className={labelClass}>Website<span className="text-primary">*</span></label>
                  <input
                    type="text"
                    required
                    name="website"
                    inputMode="url"
                    className={fieldClass}
                    placeholder="https://example.com"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className={labelClass}>Avg. Monthly Traffic</label>
                  <div className="relative">
                    <select
                      name="avg_monthly_traffic"
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
                    name="hear_about"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-1 focus:ring-ring"
                    placeholder="e.g., Google, LinkedIn, referral, podcast, event, other"
                  />
                </div>

                <div className="sm:col-span-2">
                  <Button type="submit" disabled={isSubmitting || isSubmitted} className="w-full h-16 rounded-xl text-xl font-bold disabled:opacity-60 disabled:cursor-not-allowed">
                    {isSubmitting ? "Sending..." : isSubmitted ? "Sent!" : "Book a demo"}
                  </Button>
                </div>

                {error && (
                  <div className="sm:col-span-2 text-sm text-red-500">
                    {error}
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
        )}
      </Section>

      <Footer />
    </main>
  );
}


