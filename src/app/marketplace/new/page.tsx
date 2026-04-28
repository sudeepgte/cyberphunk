"use client";

export const dynamic = 'force-dynamic';

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";

export default function NewBountyPage() {
  const { publicKey, connected } = useWallet();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    reward: "",
    deadline: "",
    skills: "",
    difficulty: "Intermediate",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected || !publicKey) return alert("Please connect wallet first");
    
    setLoading(true);
    const { error } = await supabase.from("bounties").insert([
      {
        title: formData.title,
        reward: formData.reward,
        deadline: formData.deadline || null,
        organizer_address: publicKey.toBase58(),
        skills: formData.skills.split(",").map(t => t.trim()),
        difficulty: formData.difficulty,
      }
    ]);

    if (error) {
      alert("Error creating bounty: " + error.message);
    } else {
      router.push("/marketplace");
    }
    setLoading(false);
  };

  return (
    <main className="bg-background min-h-screen pt-32">
      <Navbar />
      <div className="container mx-auto px-6 mb-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-heading font-bold text-white mb-8 uppercase tracking-tighter">
            Post a <span className="text-primary">Bounty</span>
          </h1>

          <form onSubmit={handleSubmit} className="glass-card p-10 space-y-8">
            <div className="space-y-2">
              <label className="text-xs font-mono text-white/30 uppercase tracking-widest">Bounty Title</label>
              <input 
                required
                type="text" 
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="e.g. Solana Smart Contract Audit" 
                className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-primary" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-mono text-white/30 uppercase tracking-widest">Reward (e.g. 500 USDC)</label>
                <input 
                  required
                  type="text" 
                  value={formData.reward}
                  onChange={e => setFormData({...formData, reward: e.target.value})}
                  placeholder="500 USDC" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-primary" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-white/30 uppercase tracking-widest">Deadline (Optional)</label>
                <input 
                  type="date" 
                  value={formData.deadline}
                  onChange={e => setFormData({...formData, deadline: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-primary" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-mono text-white/30 uppercase tracking-widest">Required Skills (comma separated)</label>
                <input 
                  required
                  type="text" 
                  value={formData.skills}
                  onChange={e => setFormData({...formData, skills: e.target.value})}
                  placeholder="Rust, Solana, Security" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-primary" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-white/30 uppercase tracking-widest">Difficulty</label>
                <select 
                  value={formData.difficulty}
                  onChange={e => setFormData({...formData, difficulty: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-primary"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </div>

            <div className="pt-8">
               <button 
                type="submit" 
                disabled={loading}
                className="btn-primary w-full py-4 text-sm uppercase tracking-widest disabled:opacity-50"
               >
                 {loading ? "POSTING..." : "POST BOUNTY"}
               </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
}
