import React from "react";
import { cn } from "@/lib/utils"
import { CheckCircle } from "lucide-react"

interface TiltedScrollItem {
  id: string;
  text: string;
}

interface TiltedScrollProps {
  items?: TiltedScrollItem[];
  className?: string;
}

export function TiltedScroll({ 
  items = defaultItems,
  className 
}: TiltedScrollProps) {
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(true);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let animationId: number;
    let startTime: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      
      // Calculate new position (continuous scroll)
      const newPosition = (elapsed * 0.05) % 1000; // Adjust speed here
      
      setScrollPosition(newPosition);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // Pause animation when scrolled offscreen to reduce jank
  React.useEffect(() => {
    const el = containerRef.current?.parentElement?.parentElement;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setIsVisible(entry.isIntersecting));
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="relative overflow-hidden h-[280px] md:h-[320px] w-[280px] md:w-[350px]">
        {/* Top shadow */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
        
        {/* Bottom shadow */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
        
        <div 
          ref={containerRef}
          className="flex flex-col gap-3 md:gap-5 will-change-transform"
          style={{
            transform: `translateY(-${isVisible ? scrollPosition : 0}px)`,
          }}
        >
          {[...items, ...items].map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex items-center gap-2 rounded-md border border-[#1da84f]/30 bg-gradient-to-b from-background/80 to-muted/80 p-3 md:p-4 shadow-md"
            >
              <CheckCircle className="h-4 w-4 md:h-5 md:w-5 mr-2 stroke-[#1da84f] flex-shrink-0" />
              <p className="text-xs md:text-sm text-[#1da84f]/90 truncate">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const defaultItems: TiltedScrollItem[] = [
  { id: "1", text: "john.smith@techcorp.com" },
  { id: "2", text: "sarah.j@designstudio.com" },
  { id: "3", text: "mike.wilson@marketingpro.com" },
  { id: "4", text: "emily.d@startupinc.com" },
  { id: "5", text: "david.brown@consulting.com" },
  { id: "6", text: "lisa.garcia@digitalagency.com" },
  { id: "7", text: "alex.chen@innovate.com" },
  { id: "8", text: "maria.r@creative.com" },
  { id: "9", text: "james.lee@ecommerce.com" },
  { id: "10", text: "anna.k@saasplatform.com" },
  { id: "11", text: "robert.t@growthagency.com" },
  { id: "12", text: "sophie.m@techstartup.com" },
] 