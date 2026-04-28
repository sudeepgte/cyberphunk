"use client";

export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function MarketplacePage() {
  const [bounties, setBounties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBounties() {
      const { data, error } = await supabase
        .from("bounties")
        .select(`
          *,
          profiles (
            username
          )
        `)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setBounties(data);
      }
      setLoading(false);
    }

    fetchBounties();
  }, []);

  return (
    <main className="bg-background min-h-screen pt-32">
      <Navbar />
      <div className="container mx-auto px-6 mb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-4 uppercase tracking-tighter">
              Collaboration <span className="text-primary">Marketplace</span>
            </h1>
            <p className="text-white/50 text-xl max-w-2xl font-body">
              Find your next project or hire top Web3 talent. Bounties, tasks, and team recruitment.
            </p>
          </div>
          <Link href="/marketplace/new" className="btn-primary">POST BOUNTY</Link>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-32">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="glass-card p-6 sticky top-32">
              <h4 className="text-white font-heading font-bold mb-6 uppercase tracking-widest text-xs">// FILTERS</h4>
              <div className="space-y-6">
                <div>
                  <label className="text-white/30 text-[10px] uppercase block mb-3 font-mono">Category</label>
                  {["All", "Development", "Design", "Security"].map(cat => (
                    <div key={cat} className="flex items-center gap-2 mb-2 cursor-pointer group">
                      <div className="w-3 h-3 border border-white/20 rounded group-hover:border-primary"></div>
                      <span className="text-sm text-white/50 group-hover:text-white transition-colors">{cat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Listings */}
          <div className="flex-grow space-y-6">
            <div className="flex justify-between items-center mb-8">
              <span className="text-white/40 font-mono text-xs uppercase tracking-widest">
                {loading ? "SCANNING_NETWORK..." : `${bounties.length} OPPORTUNITIES_FOUND`}
              </span>
            </div>

            {loading ? (
               <div className="text-center py-20 text-white/30 font-mono tracking-widest animate-pulse uppercase">
                 // LOADING_BOUNTIES...
               </div>
            ) : (
              bounties.map(bounty => (
                <div key={bounty.id} className="glass-card p-8 group hover:bg-white/[0.03] transition-all cursor-pointer">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20 uppercase tracking-widest">BOUNTY</span>
                        <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">ORGANIZER: {bounty.profiles?.username || "ANONYMOUS"}</span>
                      </div>
                      <h3 className="text-2xl font-heading font-bold text-white group-hover:text-primary transition-colors">{bounty.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {bounty.skills?.map((skill: string) => (
                          <span key={skill} className="text-[10px] text-white/40 border border-white/10 px-2 py-0.5 rounded uppercase">{skill}</span>
                        ))}
                      </div>
                    </div>
                    <div className="md:text-right flex flex-col justify-between items-start md:items-end gap-6">
                      <div>
                        <div className="text-2xl font-heading font-bold text-white mb-1 tracking-tighter">{bounty.reward}</div>
                        <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Reward Pool</div>
                      </div>
                      <button className="btn-primary w-full md:w-auto">APPLY NOW</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
