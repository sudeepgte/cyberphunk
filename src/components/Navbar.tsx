"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const WalletMultiButton = dynamic(
  async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

import { useAuth } from "@/hooks/useAuth";
import { useWallet } from "@solana/wallet-adapter-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { connected, publicKey } = useWallet();
  const { profile } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const baseLinks = [
    { name: "Discovery", href: "/" },
    { name: "Events", href: "/events" },
    { name: "Projects", href: "/projects" },
    { name: "Marketplace", href: "/marketplace" },
    { name: "Resources", href: "/resources" },
  ];

  const getRoleLinks = () => {
    if (!profile) return [];
    
    const links = [];
    if (profile.role === 'admin') {
      links.push({ name: "Admin", href: "/admin" });
    }
    if (profile.role === 'organizer') {
      links.push({ name: "Host Event", href: "/events/new" });
    }
    if (profile.role === 'builder') {
      links.push({ name: "Launch", href: "/projects/new" });
    }
    return links;
  };

  const navLinks = [...baseLinks, ...getRoleLinks()];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md py-3 shadow-xl" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-heading text-2xl font-bold tracking-tighter text-white">
            CYBER<span className="text-primary">PHUNK</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`font-heading text-sm font-semibold tracking-widest uppercase transition-colors hover:text-primary ${
                pathname === link.href ? "text-primary" : "text-white/70"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA & Wallet */}
        <div className="hidden lg:flex items-center gap-4">
          {connected && publicKey ? (
            <div className="flex items-center gap-6 mr-4">
               {!profile && pathname !== '/register' && (
                 <Link href="/register" className="text-primary font-mono text-[10px] animate-pulse border border-primary/30 px-2 py-1 rounded">
                   COMPLETE_REGISTRATION
                 </Link>
               )}
               {profile && (
                 <>
                   <Link href={`/profile/${publicKey.toBase58()}`} className="text-white/60 hover:text-white transition-colors text-xs font-mono tracking-widest uppercase">Profile</Link>
                   <Link href="/settings" className="text-white/60 hover:text-white transition-colors text-xs font-mono tracking-widest uppercase">Settings</Link>
                 </>
               )}
            </div>
          ) : (
            <Link
              href="/login"
              className="text-white/60 hover:text-white transition-colors text-xs font-mono tracking-widest uppercase mr-4"
            >
              Login
            </Link>
          )}
          <Link
            href="/community"
            className="font-heading text-sm font-bold text-white/80 hover:text-white transition-colors"
          >
            Join Community
          </Link>
          <div className="wallet-adapter-custom">
            <WalletMultiButton className="btn-primary !h-auto !py-2.5 !px-5 !text-sm !font-heading !font-bold !bg-primary !text-black hover:!scale-105 active:!scale-95 transition-all shadow-[0_0_20px_rgba(255,107,0,0.4)]" />
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-black transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-heading text-2xl font-bold text-white hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="wallet-adapter-custom">
            <WalletMultiButton className="btn-primary !h-auto !py-2.5 !px-5 !text-sm !font-heading !font-bold !bg-primary !text-black hover:!scale-105 active:!scale-95 transition-all shadow-[0_0_20px_rgba(255,107,0,0.4)]" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
