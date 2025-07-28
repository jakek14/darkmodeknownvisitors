import { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import DarkModeLogo from "../../logos/darkmode-logo";
import {
  Footer,
  FooterBottom,
  FooterColumn,
  FooterContent,
} from "../../ui/footer";
import { ModeToggle } from "../../ui/mode-toggle";

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
  policies?: FooterLink[];
  showModeToggle?: boolean;
  className?: string;
}

export default function FooterSection({
  logo = <DarkModeLogo className="w-32 h-16" />,
  name = "",
  columns = [],
  copyright = "© 2025 KnownVisitors. All rights reserved",
  policies = [
    { text: "Privacy Policy", href: siteConfig.url },
    { text: "Terms of Service", href: siteConfig.url },
  ],
  showModeToggle = true,
  className,
}: FooterProps) {
  return (
    <footer className={cn("bg-background w-full px-4", className)}>
      <div className="max-w-container mx-auto">
        <Footer>
          <FooterContent>
            <div>
              <FooterColumn className="col-span-2 sm:col-span-3 md:col-span-1">
                <div className="flex items-center gap-2">
                  {logo}
                  <h3 className="text-xl font-bold">{name}</h3>
                </div>
              </FooterColumn>
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
          <div>
            <FooterBottom>
              <div>{copyright}</div>
              <div className="flex items-center gap-4">
                {policies.map((policy, index) => (
                  <a key={index} href={policy.href}>
                    {policy.text}
                  </a>
                ))}
                {showModeToggle && <ModeToggle />}
              </div>
            </FooterBottom>
          </div>
        </Footer>
      </div>
    </footer>
  );
}
