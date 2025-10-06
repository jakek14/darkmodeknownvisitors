import { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

import DarkModeLogo from "../../logos/darkmode-logo";
import {
  Footer,
  FooterColumn,
  FooterContent,
} from "../../ui/footer";
import { Button } from "../../ui/button";

interface FooterLink {
  text: string;
  href: string;
}

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  logo?: ReactNode;
  name?: string;
  columns?: FooterColumnProps[];
  copyright?: string;
  className?: string;
}

export default function FooterSection({
  logo = <DarkModeLogo className="h-[4.5rem] w-auto -mt-3" />,
  columns = [],
  copyright = "© 2025 KnownVisitors. All rights reserved",
  className,
}: FooterProps) {
  const copyrightText = copyright.replace(/^©\s*/, "");
  return (
    <footer className={cn("bg-background w-full px-4", className)}>
      <div className="max-w-container mx-auto">
        <Footer className="border-t border-border dark:border-border/15 pt-8 pb-12">
          <FooterContent className="gap-12 md:gap-14 lg:gap-16 px-4 sm:px-0">
            <div className="col-span-2 sm:col-span-3 md:col-span-1">
              <div className="flex flex-col items-center sm:items-start gap-1 pt-0">
                {logo}
                <div className="text-muted-foreground text-xs leading-tight mt-2 ml-0 sm:ml-10 whitespace-nowrap text-center sm:text-left">
                  {copyrightText}
                </div>
              </div>
            </div>
            {/* Group Company and Legal closer together */}
            <div className="col-span-1 md:col-start-4 md:col-span-1 lg:col-start-5 lg:col-span-1 justify-self-end mr-0 sm:mr-9">
              <div className="flex flex-col sm:flex-row gap-16 sm:gap-24 md:gap-32">
                <div>
                  <FooterColumn>
                    <h3 className="text-md pt-1 font-semibold">Company</h3>
                    <Button
                      asChild
                      variant="link"
                      className="p-0 h-auto justify-start text-muted-foreground text-sm"
                    >
                      <a href={siteConfig.links.email}>Contact us</a>
                    </Button>
                  </FooterColumn>
                </div>
                <div>
                  <FooterColumn>
                    <h3 className="text-md pt-1 font-semibold">Legal</h3>
                    <Button
                      asChild
                      variant="link"
                      className="p-0 h-auto justify-start text-muted-foreground text-sm"
                    >
                      <a href="/terms">Terms of Service</a>
                    </Button>
                    <Button
                      asChild
                      variant="link"
                      className="p-0 h-auto justify-start text-muted-foreground text-sm"
                    >
                      <a href="/privacy">Privacy Policy</a>
                    </Button>
                    <Button
                      asChild
                      variant="link"
                      className="p-0 h-auto justify-start text-muted-foreground text-sm"
                    >
                      <a href="/opt-out">Do Not Sell / Opt-Out</a>
                    </Button>
                    <Button
                      asChild
                      variant="link"
                      className="p-0 h-auto justify-start text-muted-foreground text-sm"
                    >
                      <a href="/compliance-portal">Compliance Portal</a>
                    </Button>
                  </FooterColumn>
                </div>
              </div>
            </div>
            {columns.map((column, index) => (
              <div key={index}>
                <FooterColumn>
                  <h3 className="text-md pt-1 font-semibold">{column.title}</h3>
                  {column.links.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href={link.href}
                      className="text-muted-foreground text-sm"
                    >
                      {link.text}
                    </a>
                  ))}
                </FooterColumn>
              </div>
            ))}
          </FooterContent>
        </Footer>
      </div>
    </footer>
  );
}
