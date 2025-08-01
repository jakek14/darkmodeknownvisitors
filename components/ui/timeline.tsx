"use client"

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface TimelineStep {
  number: number
  title: string
  description: string
}

const steps: TimelineStep[] = [
  {
    number: 1,
    title: "Add the Pixel",
    description: "Copy your KnownVisitors pixel into your site's <head> or use your tag manager."
  },
  {
    number: 2,
    title: "Capture Visitors",
    description: "Identify anonymous and known users in real time."
  },
  {
    number: 3,
    title: "Use Your Tools",
    description: "Sync with Klaviyo, Google, Meta, and more."
  },
  {
    number: 4,
    title: "Boost Conversions",
    description: "Retarget high-intent visitors with emails, ads, and automation."
  }
]

export function Timeline() {
  const [currentStep, setCurrentStep] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  // Auto-center on scroll end
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return
    
    let isUserScrolling = false
    let isPageScrolling = false
    let scrollTimeout: NodeJS.Timeout | null = null
    let pageScrollTimeout: NodeJS.Timeout | null = null
    
    const handlePageScroll = () => {
      isPageScrolling = true
      if (pageScrollTimeout) clearTimeout(pageScrollTimeout)
      pageScrollTimeout = setTimeout(() => {
        isPageScrolling = false
      }, 500)
    }
    
    const handleScroll = () => {
      isUserScrolling = true
      
      if (scrollTimeout) clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        // Don't auto-center if user is scrolling the page
        if (isPageScrolling) return
        
        // Only auto-center if user has stopped scrolling for a longer period
        if (!isUserScrolling) return
        
        // Find the card closest to the center
        const containerRect = container.getBoundingClientRect()
        let minDist = Infinity
        let closestIdx = 0
        
        cardRefs.current.forEach((card, idx) => {
          if (!card) return
          const cardRect = card.getBoundingClientRect()
          const cardCenter = cardRect.left + cardRect.width / 2
          const containerCenter = containerRect.left + containerRect.width / 2
          const dist = Math.abs(cardCenter - containerCenter)
          if (dist < minDist) {
            minDist = dist
            closestIdx = idx
          }
        })
        
        // Only auto-center if significantly off-center (more than 50px)
        if (minDist > 50) {
          cardRefs.current[closestIdx]?.scrollIntoView({ 
            behavior: 'smooth', 
            inline: 'center', 
            block: 'nearest' 
          })
          setCurrentStep(closestIdx)
        }
        
        isUserScrolling = false
      }, 300) // Increased timeout to be less aggressive
    }
    
    container.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('scroll', handlePageScroll, { passive: true })
    
    return () => {
      container.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scroll', handlePageScroll)
      if (scrollTimeout) clearTimeout(scrollTimeout)
      if (pageScrollTimeout) clearTimeout(pageScrollTimeout)
    }
  }, [])

  const scrollToStep = (stepIndex: number) => {
    if (cardRefs.current[stepIndex]) {
      cardRefs.current[stepIndex]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
      setCurrentStep(stepIndex)
    }
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      scrollToStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      scrollToStep(currentStep - 1)
    }
  }

  return (
    <div className="relative w-full py-2 px-2">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Desktop Grid Layout */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-12 lg:gap-x-8">
          {/* Global Connecting Line */}
          <div className="absolute top-6 left-0 right-0 h-1 bg-gradient-to-r from-[#1da84f]/30 via-[#1da84f]/50 to-[#1da84f]/30">
            {/* Pulsing Wave Animation */}
            <div className="absolute top-0 left-0 w-24 h-1 bg-gradient-to-r from-transparent via-[#1da84f] to-transparent animate-wave-pulse" />
          </div>
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center">
              {/* Timeline Step */}
              <div className="relative flex flex-col items-center w-full h-full">
                {/* Clean Rectangular Step Label */}
                <div className="relative mb-8 z-20">
                  <div className="px-4 py-2 bg-[#1da84f]/10 border border-[#1da84f]/30 rounded-lg backdrop-blur-sm">
                    <span className="text-[#1da84f] font-medium text-sm tracking-wide">
                      Step {step.number}
                    </span>
                  </div>
                </div>
                {/* Step Content Container */}
                <div className="w-full h-full flex flex-col flex-1">
                  {/* Step Title */}
                  <h3 className="text-xl font-bold text-white text-center mb-4 tracking-wide">
                    {step.title}
                  </h3>
                  {/* Consistent Height Card */}
                  <div className="flex-1 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 shadow-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group min-h-[120px] flex items-center justify-center">
                    <p className="text-neutral-300 text-sm leading-relaxed text-center">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Horizontal Scroll Layout */}
        <div className="lg:hidden">
          <div 
            className="flex overflow-x-auto gap-4 pb-2 scrollbar-hide min-w-0 touch-pan-x snap-x snap-mandatory px-8" 
            ref={scrollContainerRef}
          >
            {steps.map((step) => (
              <div
                key={step.number}
                ref={el => { cardRefs.current[step.number - 1] = el; }}
                className="flex flex-col items-center w-[75vw] max-w-xs flex-shrink-0 snap-center"
              >
                {/* Timeline Step */}
                <div className="relative flex flex-col items-center w-full h-full">
                  {/* Clean Rectangular Step Label */}
                  <div className="relative mb-3 z-20">
                    <div className="px-3 py-1.5 bg-[#1da84f]/10 border border-[#1da84f]/30 rounded-lg backdrop-blur-sm">
                      <span className="text-[#1da84f] font-medium text-xs tracking-wide">
                        Step {step.number}
                      </span>
                    </div>
                  </div>
                  {/* Step Content Container */}
                  <div className="w-full h-full flex flex-col flex-1">
                    {/* Step Title */}
                    <h3 className="text-xl font-bold text-white text-center mb-3 tracking-wide">
                      {step.title}
                    </h3>
                    {/* Consistent Height Card */}
                    <div className="flex-1 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-5 shadow-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group min-h-[160px] flex items-center justify-center">
                      <p className="text-neutral-300 text-base leading-relaxed text-center px-3 whitespace-normal break-words">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Navigation Arrows */}
          <div className="flex justify-center items-center gap-6 mt-4">
            <button
              onClick={prevStep}
              className="p-2 rounded-full bg-[#1da84f]/20 border border-[#1da84f]/40 text-[#1da84f] hover:bg-[#1da84f]/30 transition-all duration-300"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextStep}
              className="p-2 rounded-full bg-[#1da84f]/20 border border-[#1da84f]/40 text-[#1da84f] hover:bg-[#1da84f]/30 transition-all duration-300"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 