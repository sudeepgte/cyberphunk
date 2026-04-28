"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { User, Shield, Zap, Globe, Cpu, Link as LinkIcon } from "lucide-react";

export default function RegisterPage() {
  const { publicKey, connected } = useWallet();
  const { profile, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    role: "member" as const,
    skills: "",
    github: "",
    twitter: "",
  });

  useEffect(() => {
    if (!authLoading && profile) {
      router.push("/"); // Already registered
    }
  }, [profile, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected || !publicKey) return alert("Please connect wallet first");
    
    setLoading(true);
    const walletAddress = publicKey.toBase58();

    const { error } = await supabase.from("profiles").insert([
      {
        wallet_address: walletAddress,
        username: formData.username,
        bio: formData.bio,
        role: formData.role,
        skills: formData.skills.split(",").map(s => s.trim()).filter(Boolean),
        social_links: {
          github: formData.github,
          twitter: formData.twitter,
        },
      }
    ]);

    if (error) {
      alert("Error creating profile: " + error.message);
    } else {
      router.push("/");
    }
    setLoading(false);
  };

  const roles = [
    { id: 'member', title: 'Member', icon: User, desc: 'Join events and browse community content' },
    { id: 'builder', title: 'Builder', icon: Cpu, desc: 'Showcase projects and collaborate with teams' },
    { id: 'organizer', title: 'Organizer', icon: Shield, desc: 'Host events, bootcamps, and hackathons' },
  ];

  if (authLoading) return <div className="min-h-screen bg-background flex items-center justify-center text-white font-mono uppercase tracking-[0.3em] animate-pulse">// AUTHORIZING_CITIZEN...</div>;

  return (
    <main className="bg-background min-h-screen pt-32 selection:bg-primary selection:text-black">
      <Navbar />
      
      <div className="container mx-auto px-6 mb-24 relative">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-8xl font-heading font-bold text-white mb-6 uppercase tracking-tighter">
              Initialize <span className="text-primary">Profile</span>
            </h1>
            <p className="text-white/40 text-xl font-body max-w-2xl mx-auto">
              Welcome to the CyberPhunk network. Create your on-chain identity to start building the future of digital sovereignty.
            </p>
          </div>

          {!connected ? (
            <div className="glass-card p-16 text-center">
              <Zap className="w-16 h-16 text-primary mx-auto mb-8 animate-pulse" />
              <h2 className="text-3xl font-heading font-bold text-white mb-4 uppercase">Neural Link Required</h2>
              <p className="text-white/50 mb-10 max-w-md mx-auto">You must connect your Solana wallet (Phantom, etc.) to initialize your profile on the network.</p>
              <div className="flex justify-center">
                {/* Wallet button is handled by Navbar, so just show a message or a spacer */}
                <p className="text-xs font-mono text-primary uppercase tracking-widest">// CONNECT_WALLET_IN_HEADER</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Step 1: Identity */}
              <div className="glass-card p-10 space-y-8 border-l-4 border-l-primary">
                <div className="flex items-center gap-4 mb-2">
                  <span className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-primary font-mono text-sm">01</span>
                  <h3 className="text-2xl font-heading font-bold text-white uppercase tracking-wider">Network Identity</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-white/30 uppercase tracking-widest">Username</label>
                    <input 
                      required
                      type="text" 
                      value={formData.username}
                      onChange={e => setFormData({...formData, username: e.target.value})}
                      placeholder="e.g. Satoshi_99" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-primary transition-all focus:bg-white/10" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-white/30 uppercase tracking-widest">Wallet Address (Read-only)</label>
                    <input 
                      readOnly
                      type="text" 
                      value={publicKey?.toBase58().slice(0, 8) + "..." + publicKey?.toBase58().slice(-8)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white/30 font-mono cursor-not-allowed" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-white/30 uppercase tracking-widest">Bio / Mission Statement</label>
                  <textarea 
                    rows={4} 
                    value={formData.bio}
                    onChange={e => setFormData({...formData, bio: e.target.value})}
                    placeholder="Tell the network who you are..." 
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-primary resize-none transition-all focus:bg-white/10"
                  ></textarea>
                </div>
              </div>

              {/* Step 2: Role Selection */}
              <div className="glass-card p-10 space-y-8 border-l-4 border-l-primary">
                <div className="flex items-center gap-4 mb-2">
                  <span className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-primary font-mono text-sm">02</span>
                  <h3 className="text-2xl font-heading font-bold text-white uppercase tracking-wider">Functional Role</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {roles.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setFormData({...formData, role: r.id as any})}
                      className={`p-6 rounded-xl border text-left transition-all group ${
                        formData.role === r.id 
                          ? 'border-primary bg-primary/10' 
                          : 'border-white/10 bg-white/5 hover:border-white/30'
                      }`}
                    >
                      <r.icon className={`w-8 h-8 mb-4 ${formData.role === r.id ? 'text-primary' : 'text-white/40'}`} />
                      <h4 className={`text-lg font-bold mb-2 uppercase ${formData.role === r.id ? 'text-white' : 'text-white/60'}`}>{r.title}</h4>
                      <p className="text-xs text-white/30 leading-relaxed">{r.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Skills & Socials */}
              <div className="glass-card p-10 space-y-8 border-l-4 border-l-primary">
                <div className="flex items-center gap-4 mb-2">
                  <span className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-primary font-mono text-sm">03</span>
                  <h3 className="text-2xl font-heading font-bold text-white uppercase tracking-wider">Social Linkage</h3>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-white/30 uppercase tracking-widest">Skills (comma separated)</label>
                  <input 
                    type="text" 
                    value={formData.skills}
                    onChange={e => setFormData({...formData, skills: e.target.value})}
                    placeholder="Solana, Rust, React, UI/UX" 
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-primary transition-all focus:bg-white/10" 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-white/30 uppercase tracking-widest flex items-center gap-2">
                      <LinkIcon className="w-3 h-3" /> GitHub URL
                    </label>
                    <input 
                      type="url" 
                      value={formData.github}
                      onChange={e => setFormData({...formData, github: e.target.value})}
                      placeholder="https://github.com/..." 
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-primary transition-all focus:bg-white/10" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-white/30 uppercase tracking-widest flex items-center gap-2">
                      <LinkIcon className="w-3 h-3" /> Twitter URL
                    </label>
                    <input 
                      type="url" 
                      value={formData.twitter}
                      onChange={e => setFormData({...formData, twitter: e.target.value})}
                      placeholder="https://twitter.com/..." 
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-primary transition-all focus:bg-white/10" 
                    />
                  </div>
                </div>
              </div>

              <div className="pt-8">
                 <button 
                  type="submit" 
                  disabled={loading}
                  className="btn-primary w-full py-5 text-lg uppercase tracking-[0.2em] disabled:opacity-50 relative group overflow-hidden"
                 >
                   <span className="relative z-10">{loading ? "COMMITTING_TO_BLOCKCHAIN..." : "INITIALIZE_PROFILE"}</span>
                   <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                 </button>
              </div>
            </form>
          )}
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
