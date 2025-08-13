import "@/app/globals.css";

import type { Metadata } from "next";

import { ThemeProvider } from "@/components/contexts/theme-provider";
import { GTMProvider } from "@/components/contexts/gtm-provider";
import { inter } from "@/lib/fonts";

import { siteConfig } from "../config/site";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://jakek14.github.io/darkmodeknownvisitors' : 'http://localhost:3000'),
  description: siteConfig.description,
  keywords: [
    "Landing page template",
    "Components",
    "Shadcn",
    "Next.js",
    "React",
    "Tailwind CSS",
    "Radix UI",
  ],
  authors: [
    {
      name: "Mikolaj Dobrucki",
      url: "https://mikolajdobrucki.com",
    },
  ],
  creator: "mikolajdobrucki",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.getStartedUrl,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/Logos_KV-Logo-Square-GreenBG.png",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/Logos_KV-Logo-Square-GreenBG.png"],
    creator: "@mikolajdobrucki",
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "KnownVisitors",
  },
  icons: {
    icon: "/Logos_KV-Logo-Square-GreenBG.png",
    apple: "/Logos_KV-Logo-Square-GreenBG.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" style={{ colorScheme: "dark" }} className="dark" data-theme="dark">
      <head>
        <meta property="og:image" content="/Logos_KV-Logo-Square-GreenBG.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="KnownVisitors Logo" />
        <meta name="twitter:image" content="/Logos_KV-Logo-Square-GreenBG.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="KnownVisitors" />
        <link rel="apple-touch-icon" href="/Logos_KV-Logo-Square-GreenBG.png" />
        <link rel="apple-touch-icon-precomposed" href="/Logos_KV-Logo-Square-GreenBG.png" />
      </head>
      <body className={`${inter.className} bg-background antialiased dark:bg-background dark:text-foreground`}>
        <GTMProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </GTMProvider>
      </body>
    </html>
  );
}
