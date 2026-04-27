import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="font-heading text-3xl font-bold text-white">
              CYBER<span className="text-primary">PHUNK</span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Where Web3 builders connect, collaborate, and create. Join the revolution of digital sovereignty.
            </p>
            <div className="flex gap-4">
              {["twitter", "discord", "github", "telegram"].map((social) => (
                <a
                  key={social}
                  href={`#${social}`}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-primary hover:border-primary transition-all"
                >
                  <i className={`bi bi-${social}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-widest mb-6">Explore</h4>
            <ul className="space-y-4 text-sm text-white/50 font-medium">
              <li><Link href="/events" className="hover:text-primary">Hackathons</Link></li>
              <li><Link href="/projects" className="hover:text-primary">Project Showcase</Link></li>
              <li><Link href="/marketplace" className="hover:text-primary">Marketplace</Link></li>
              <li><Link href="/resources" className="hover:text-primary">Resource Hub</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-widest mb-6">Community</h4>
            <ul className="space-y-4 text-sm text-white/50 font-medium">
              <li><Link href="/about" className="hover:text-primary">Our Ethos</Link></li>
              <li><Link href="/community" className="hover:text-primary">Discord Server</Link></li>
              <li><Link href="/governance" className="hover:text-primary">Governance</Link></li>
              <li><Link href="/careers" className="hover:text-primary">Work with Us</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-widest mb-6">Stay Connected</h4>
            <p className="text-white/50 text-xs mb-6 font-mono uppercase tracking-tight">
              // JOIN_THE_TRANSMISSION
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="you@example.com"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-primary flex-grow"
              />
              <button className="bg-primary text-black px-4 py-3 rounded-lg font-bold">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30 font-mono">
          <p>© 2026 CYBERPHUNK. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-white">PRIVACY POLICY</Link>
            <Link href="/terms" className="hover:text-white">TERMS OF SERVICE</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
