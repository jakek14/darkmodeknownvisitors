import Navbar from "../../components/sections/navbar/default";
import DarkModeLogo from "../../components/logos/darkmode-logo";
import Footer from "../../components/sections/footer/default";
import path from "path";
import fs from "fs/promises";
import { marked } from "marked";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function TermsOfUsePage() {
  const candidates = [
    "KnownVisitors_Terms_of_Service.md",
    "KnownVisitors Terms of Service.pdf.md",
    "KnownVisitors Terms of Service.md",
    "Terms of Service.md",
    "terms.md",
  ];
  let html = "";
  for (const file of candidates) {
    try {
      const md = await fs.readFile(path.join(process.cwd(), "public", file), "utf8");
      html = marked.parse(md) as string;
      break;
    } catch {}
  }
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-background text-foreground">
      <Navbar logo={<DarkModeLogo className="h-12 w-auto" />} />
      <div className="pt-24 md:pt-32">
        <section className="max-w-container mx-auto px-4 py-12">
          <h1 className="text-center text-4xl sm:text-5xl md:text-6xl font-semibold">
            Terms of Use
          </h1>
          <div className="mt-6 border-t border-border/70 dark:border-border/20" />
          <article
            className="mt-8 text-muted-foreground text-base leading-7 space-y-4"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </section>
        <div className="mt-8" />
      </div>
      <Footer />
    </main>
  );
}


