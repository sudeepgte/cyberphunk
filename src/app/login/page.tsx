"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";
import { Shield, Zap, Lock } from "lucide-react";

const WalletMultiButton = dynamic(
  async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export default function LoginPage() {
  const { connected } = useWallet();

  return (
    <main className="bg-background min-h-screen pt-32 overflow-hidden">
      <Navbar />
      
      <div className="container mx-auto px-6 relative flex flex-col items-center justify-center min-h-[70vh]">
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full -z-10" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary/5 blur-[120px] rounded-full -z-10" />

        <div className="max-w-2xl w-full glass-card p-12 text-center border-t-2 border-t-primary/50 relative overflow-hidden">
          {/* Glitch Effect Background Text */}
          <div className="absolute -top-10 -left-10 text-9xl font-heading font-black text-white/[0.02] select-none pointer-events-none">
            CYPHER
          </div>

          <div className="mb-10 inline-flex p-4 rounded-2xl bg-primary/10 border border-primary/20">
            <Lock className="w-12 h-12 text-primary" />
          </div>

          <h1 className="text-5xl font-heading font-bold text-white mb-6 uppercase tracking-tighter">
            Authentication <span className="text-primary">Required</span>
          </h1>
          
          <p className="text-white/50 text-lg mb-12 font-body max-w-md mx-auto">
            Secure access to the CyberPhunk network requires a neural link via your Solana wallet.
          </p>

          <div className="flex flex-col items-center gap-6">
            <div className="wallet-adapter-custom scale-125">
              <WalletMultiButton className="btn-primary !h-auto !py-4 !px-8 !text-lg !font-heading !font-bold !bg-primary !text-black hover:!scale-105 active:!scale-95 transition-all shadow-[0_0_30px_rgba(255,107,0,0.4)]" />
            </div>
            
            {connected && (
              <p className="text-green-500 font-mono text-sm uppercase tracking-widest animate-pulse">
                // LINK_ESTABLISHED. REDIRECTING...
              </p>
            )}

            {!connected && (
              <div className="grid grid-cols-2 gap-4 w-full mt-8 pt-8 border-t border-white/5">
                <div className="text-left">
                  <h4 className="text-[10px] font-mono text-white/30 uppercase mb-2">// SECURITY</h4>
                  <p className="text-xs text-white/50 italic">End-to-end encrypted session via Solana Web3.js</p>
                </div>
                <div className="text-right">
                  <h4 className="text-[10px] font-mono text-white/30 uppercase mb-2">// SOVEREIGNTY</h4>
                  <p className="text-xs text-white/50 italic">You own your data, your identity, and your keys.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="mt-20 flex gap-12 text-white/10">
          <Shield className="w-12 h-12" />
          <Zap className="w-12 h-12" />
          <Cpu className="w-12 h-12" />
        </div>
      </div>
      
      <Footer />
    </main>
  );
}

// Re-import Cpu for the decorative icons
import { Cpu } from "lucide-react";
