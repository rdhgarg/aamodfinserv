import { Link } from "@tanstack/react-router";
import { Mail, Phone, Clock, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";
import logo from "@/assets/aamod-logo.png.asset.json";
import { useSiteOverrides, SITE_CHROME_KEY, SITE_CHROME_DEFAULTS } from "@/lib/use-site-overrides";

export function SiteFooter() {
  const overrides = useSiteOverrides();
  const c = overrides.get(SITE_CHROME_KEY, SITE_CHROME_DEFAULTS);
  return (
    <footer className="mt-24 border-t border-border bg-brand-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="inline-flex rounded-lg bg-white px-3 py-2">
              <img src={logo.url} alt="Aamod Finserv" width={180} height={48} className="h-10 w-auto" />
            </div>
            <p className="mt-4 text-sm text-white/70">
              {c.tagline}
            </p>
            <div className="mt-4 flex gap-2">
              {[{ I: Instagram, h: c.instagram }, { I: Facebook, h: c.facebook }, { I: Linkedin, h: c.linkedin }].map(({ I, h }, i) => (
                <a key={i} href={h} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 transition hover:bg-brand-orange">
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white/80">Explore</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li><Link to="/services" className="hover:text-white">Services</Link></li>
              <li><Link to="/calculator" className="hover:text-white">EMI Calculator</Link></li>
              <li><Link to="/partners" className="hover:text-white">Banking Partners</Link></li>
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white/80">Reach Us</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 text-primary" /> {c.phone}</li>
              <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 text-primary" /> {c.email}</li>
              <li className="flex items-start gap-2"><Clock className="mt-0.5 h-4 w-4 text-primary" /> {c.hours}</li>
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-primary" /> {c.address}</li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white/80">Get started</h3>
            <p className="mt-4 text-sm text-white/70">Speak to a financial expert — no obligations.</p>
            <Link
              to="/contact"
              className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Talk to Expert
            </Link>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <span>© {new Date().getFullYear()} Aamod Finserv Pvt. Ltd. All rights reserved.</span>
          <span>Crafted for clarity in finance.</span>
        </div>
      </div>
    </footer>
  );
}