import Navbar from "../../components/sections/navbar/default";
import DarkModeLogo from "../../components/logos/darkmode-logo";
import Footer from "../../components/sections/footer/default";
import { AnimatedGlassCard } from "../../components/ui/animated-glass-card";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

async function submit(formData: FormData) {
  "use server";
  const payload: Record<string, string> = {};
  for (const [k, v] of formData.entries()) payload[k] = String(v);
  // GPC hint passed from client via hidden field
  try {
    const base = process.env.DEPLOYMENT_TYPE === "vercel"
      ? ""
      : process.env.NEXT_PUBLIC_BASE_URL || "";
    const res = await fetch(`${base}/api/opt-out`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Request failed");
  } catch (err) {
    console.error("Opt-out submit error", err);
  }
}

export default function OptOutPage() {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-background text-foreground">
      <Navbar logo={<DarkModeLogo className="h-12 w-auto" />} />
      <div className="pt-24 md:pt-32">
        <section className="max-w-container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-center md:text-left">KnownVisitors Opt-Out Form</h2>
              <form action={submit} className="mt-6 space-y-4 max-w-xl">
                <input type="hidden" name="gpc" id="gpc-field" defaultValue="" />
                <input type="hidden" name="request_type" value="do_not_sell" />

                <div className="grid gap-2">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    placeholder="Email Address"
                    className="bg-card border border-border/60 rounded-md px-4 py-3 w-full"
                  />
                </div>

                <div className="grid gap-2">
                  <input
                    type="text"
                    name="zipcode"
                    id="zipcode"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Zipcode"
                    className="bg-card border border-border/60 rounded-md px-4 py-3 w-full"
                  />
                </div>

                <label className="flex items-start gap-2 text-sm text-muted-foreground">
                  <input type="checkbox" name="agent" value="1" className="mt-1" />
                  I am an authorized agent submitting the request on behalf of the user.
                </label>

                {recaptchaSiteKey ? (
                  <div className="pt-2">
                    <div className="g-recaptcha" data-sitekey={recaptchaSiteKey} />
                  </div>
                ) : null}

                <button
                  type="submit"
                  className="inline-flex items-center justify-center whitespace-nowrap text-sm font-semibold transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring text-primary-foreground shadow-sm bg-linear-to-b from-primary/60 to-primary/100 dark:from-primary/100 dark:to-primary/70 border-t-primary h-10 px-6 rounded-md"
                >
                  OPT-OUT
                </button>
              </form>
            </div>

            <div>
              <AnimatedGlassCard className="max-w-xl">
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold">About Your Privacy Choices</h2>
                  <div className="text-muted-foreground space-y-3 leading-6 text-sm">
                    <p>
                      KnownVisitors is a privacy-first platform that helps businesses identify website visitors in
                      a compliant, opt-out–friendly way. If you submit a request here, we will honor applicable
                      rights under laws such as CPRA/CCPA (California), CPA (Colorado), VCDPA (Virginia), and
                      others. We also respect Global Privacy Control (GPC) signals when received by your browser.
                    </p>
                    <p>
                      Submitting a “Do Not Sell or Share” request will remove your identifiers from our delivery
                      systems and place them on a suppression list so they are not re-included in the future. For
                      access, deletion, or correction requests, please provide the email address that you believe we
                      may have processed so we can locate your record.
                    </p>
                  </div>
                </div>
              </AnimatedGlassCard>
            </div>
          </div>
        </section>
        <div className="mt-8" />
      </div>
      <Footer />
      {recaptchaSiteKey ? (
        <script src="https://www.google.com/recaptcha/api.js" async defer />
      ) : null}
      <script
        // Minimal client-side GPC detection to populate hidden field
        dangerouslySetInnerHTML={{
          __html: `(()=>{try{var gpc = (navigator as any).globalPrivacyControl?"1":"";var el=document.getElementById('gpc-field') as HTMLInputElement|null;if(el) el.value=gpc;}catch(e){}})();`,
        }}
      />
    </main>
  );
}


