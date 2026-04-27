"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Discovery", href: "/" },
    { name: "Events", href: "/events" },
    { name: "Projects", href: "/projects" },
    { name: "Marketplace", href: "/marketplace" },
    { name: "Resources", href: "/resources" },
  ];

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
          <Link
            href="/community"
            className="font-heading text-sm font-bold text-white/80 hover:text-white transition-colors"
          >
            Join Community
          </Link>
          <button className="btn-primary flex items-center gap-2 text-sm px-5 py-2.5">
            <span className="w-2 h-2 bg-black rounded-full animate-pulse"></span>
            CONNECT WALLET
          </button>
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
          <button className="btn-primary w-64 mt-4">CONNECT WALLET</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
