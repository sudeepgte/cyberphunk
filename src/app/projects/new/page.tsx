"use client";

export const dynamic = 'force-dynamic';

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";

export default function NewProjectPage() {
  const { publicKey, connected } = useWallet();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    repo_url: "",
    demo_url: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit triggered. Connected:", connected, "Public Key:", publicKey?.toBase58());
    
    if (!connected || !publicKey) {
      console.error("Wallet not connected");
      return alert("Please connect wallet first");
    }
    
    setLoading(true);
    console.log("Attempting to insert project:", formData);

    try {
      const { data, error } = await supabase.from("projects").insert([
        {
          title: formData.title,
          description: formData.description,
          builder_address: publicKey.toBase58(),
          tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
          repo_url: formData.repo_url,
          demo_url: formData.demo_url,
          status: "Building",
        }
      ]);

      if (error) {
        console.error("Supabase Error:", error);
        alert("Error creating project: " + error.message);
      } else {
        console.log("Project created successfully:", data);
        router.push("/projects");
      }
    } catch (err) {
      console.error("Unexpected Error:", err);
      alert("An unexpected error occurred. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-background min-h-screen pt-32">
      <Navbar />
      <div className="container mx-auto px-6 mb-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-heading font-bold text-white mb-8 uppercase tracking-tighter">
            Submit <span className="text-primary">Project</span>
          </h1>

          <form onSubmit={handleSubmit} className="glass-card p-10 space-y-8">
            <div className="space-y-2">
              <label className="text-xs font-mono text-white/30 uppercase tracking-widest">Project Title</label>
              <input 
                required
                type="text" 
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="e.g. CyberAtlas" 
                className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-primary" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-white/30 uppercase tracking-widest">Description</label>
              <textarea 
                required
                rows={5} 
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="What are you building?" 
                className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-primary resize-none"
              ></textarea>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-white/30 uppercase tracking-widest">Tags (comma separated)</label>
              <input 
                type="text" 
                value={formData.tags}
                onChange={e => setFormData({...formData, tags: e.target.value})}
                placeholder="Solana, DeFi, Rust" 
                className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-primary" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-mono text-white/30 uppercase tracking-widest">GitHub Repo URL</label>
                <input 
                  type="url" 
                  value={formData.repo_url}
                  onChange={e => setFormData({...formData, repo_url: e.target.value})}
                  placeholder="https://github.com/..." 
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-primary" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-white/30 uppercase tracking-widest">Demo URL</label>
                <input 
                  type="url" 
                  value={formData.demo_url}
                  onChange={e => setFormData({...formData, demo_url: e.target.value})}
                  placeholder="https://..." 
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-primary" 
                />
              </div>
            </div>

            <div className="pt-8">
                <button 
                 type="button" 
                 disabled={loading}
                 onClick={handleSubmit}
                 className="btn-primary w-full py-4 text-sm uppercase tracking-widest disabled:opacity-50"
                >
                  {loading ? "SUBMITTING..." : "LAUNCH PROJECT"}
                </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
}
