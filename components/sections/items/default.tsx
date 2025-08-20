"use client"

import { ReactNode, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

import Dashboard3D from "../../ui/3d-dashboard";
import { GlowingEffect } from "../../ui/glowing-effect";
import RevenueLineGraph from "../../ui/RevenueLineGraph";
import { Section } from "../../ui/section";

interface ItemProps {
  title: string;
  description: string;
  icon: ReactNode;
}

interface ItemsProps {
  title?: string;
  items?: ItemProps[] | false;
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8
    }
  }
}

export default function Items({
  title = "Transform Your Website Visitors Into Revenue",
  className,
}: ItemsProps) {
  const [isHoverCard1, setIsHoverCard1] = useState(false)
  const [isHoverCard2, setIsHoverCard2] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { amount: 0.05, once: true })
  return (
    <Section className={className}>
      <motion.div 
        ref={containerRef}
        className="max-w-container mx-auto flex flex-col items-center gap-6 sm:gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2 
          className="max-w-[800px] text-center text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight"
          variants={itemVariants}
        >
          {title}
        </motion.h2>
        
        {/* First Card - Text Left, Image Right (no entry animation) */}
        <div 
          className="relative w-full max-w-6xl glass-3 hover:glass-4 rounded-2xl border border-border/70 dark:border-border/5 dark:border-t-border/15 bg-card p-8 shadow-xl transition-all duration-300 hover:shadow-2xl transform-gpu mt-16 will-change-transform"
          onMouseEnter={() => setIsHoverCard1(true)}
          onMouseLeave={() => setIsHoverCard1(false)}
        >
          <GlowingEffect
            blur={0}
            borderWidth={3}
            spread={80}
            glow={true}
            disabled={!isHoverCard1}
            proximity={64}
            inactiveZone={0.01}
          />
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 space-y-6">
              <h3 className="text-2xl font-bold text-card-foreground sm:text-3xl">
                Visitor Recognition
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                With a single pixel, knownvisitors.com reveals the full picture of your website traffic — surfacing both known customers and previously anonymous visitors as they arrive.
              </p>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="w-full max-w-sm bg-card/80 backdrop-blur-sm rounded-lg border border-[#1da84f]/30 p-4 shadow-lg">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#1da84f]/20 rounded-full flex items-center justify-center">
                      <span className="text-[#1da84f] text-sm font-semibold">JS</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-card-foreground">John Smith</p>
                      <p className="text-xs text-muted-foreground">john.smith@techcorp.com</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium">Company:</span> TechCorp Inc.
                  </div>
                  <div className="text-xs text-[#1da84f] font-medium">
                    Just visited your website
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Second Card - Image Left, Text Right (no entry animation) */}
        <div 
          className="relative w-full max-w-6xl glass-3 hover:glass-4 rounded-2xl border border-border/70 dark:border-border/5 dark:border-t-border/15 bg-card p-8 shadow-xl transition-all duration-300 hover:shadow-2xl transform-gpu mt-16 will-change-transform"
          onMouseEnter={() => setIsHoverCard2(true)}
          onMouseLeave={() => setIsHoverCard2(false)}
        >
          <GlowingEffect
            blur={0}
            borderWidth={3}
            spread={80}
            glow={true}
            disabled={!isHoverCard2}
            proximity={64}
            inactiveZone={0.01}
          />
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 flex justify-center order-2 lg:order-1">
              <div className="w-full max-w-md h-64 flex items-center justify-center">
                <RevenueLineGraph selectedTimeFrame="Monthly" />
              </div>
            </div>
            <div className="flex-1 space-y-6 order-1 lg:order-2">
              <h3 className="text-2xl font-bold text-card-foreground sm:text-3xl">
                Capture Hidden Revenue
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Many of your highest-value shoppers never log in.

Now you can identify these anonymous browsers and deliver 5x more personalized outreach — from emails and texts to push notifications.
              </p>
            </div>
          </div>
        </div>
        
        {/* Third Card Container - Aligned Left */}
        <motion.div 
          className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row justify-start gap-8 mt-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {/* Third Card - Half Width */}
          <motion.div 
            className="w-full lg:max-w-xl p-8 order-1 lg:order-1"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-8 min-h-[400px] flex flex-col justify-between">
              <div className="space-y-4">
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-card-foreground sm:text-3xl">
                    Data you can act on, instantly
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Your dashboard shouldn&apos;t just display numbers — it should unlock insight.
                  </p>
                </div>
                
                <div className="space-y-8">
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-card-foreground">
                      See Emails, Phone Numbers, and More
                    </h4>
                    <p className="text-muted-foreground">
                      Instantly access verified customer data, from contact info to behavioral traits.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-card-foreground">
                      Uncover Postal Codes and Location
                    </h4>
                    <p className="text-muted-foreground">
                      Localize outreach and segment based on visitor geography.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-card-foreground">
                      Filter, Sort, and Export
                    </h4>
                    <p className="text-muted-foreground">
                      Use smart filters or export enriched data to your CRM, ESP, or ad platforms
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* 3D Dashboard Component - Positioned to the Right */}
          <motion.div 
            className="w-full lg:max-w-2xl order-2 lg:order-2"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Dashboard3D />
          </motion.div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
