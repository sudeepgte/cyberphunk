"use client";

export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function ProjectsPage() {
  const [filter, setFilter] = useState("all");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      let query = supabase
        .from("projects")
        .select(`
          *,
          profiles (
            username
          )
        `)
        .order("created_at", { ascending: false });

      if (filter !== "all") {
        query = query.eq("status", filter);
      }
      
      if (category !== "all") {
        query = query.eq("category", category);
      }

      const { data, error } = await query;

      if (!error && data) {
        setProjects(data);
      }
      setLoading(false);
    }

    fetchProjects();
  }, [filter, category]);

  const categories = ["all", "defi", "nft", "privacy", "dao", "tool", "other"];
  const statuses = ["all", "Idea", "Building", "Launched"];

  return (
    <main className="bg-background min-h-screen pt-32">
      <Navbar />
      <div className="container mx-auto px-6 mb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-4 uppercase tracking-tighter">
              Project <span className="text-primary">Showcase</span>
            </h1>
            <p className="text-white/50 text-xl max-w-2xl font-body">
              Discover what the CyberPhunk community is building. Connect with teams or launch your own.
            </p>
          </div>
          <Link href="/projects/new" className="btn-primary">SUBMIT PROJECT</Link>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-8 py-6 border-y border-white/5">
          <div className="space-y-3">
            <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest block">// CATEGORY</span>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button 
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-mono uppercase transition-all ${
                    category === c ? "bg-primary text-black font-bold" : "bg-white/5 text-white/40 hover:bg-white/10"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest block">// STATUS</span>
            <div className="flex flex-wrap gap-2">
              {statuses.map((s) => (
                <button 
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-mono uppercase transition-all ${
                    filter === s ? "bg-primary text-black font-bold" : "bg-white/5 text-white/40 hover:bg-white/10"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-6 pb-32">
        {loading ? (
          <div className="text-center py-20 text-white/30 font-mono tracking-widest animate-pulse uppercase">
            // SCANNING_NETWORK...
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-32 border border-dashed border-white/5 rounded-2xl">
             <div className="text-white/20 font-mono text-xs uppercase tracking-widest">// NO_PROJECTS_FOUND_IN_THIS_SECTOR</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="glass-card p-8 group hover:border-primary/50 transition-all flex flex-col justify-between h-full">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-xs font-mono text-primary/70 uppercase tracking-widest">
                      // BUILDER: {project.profiles?.username || "ANONYMOUS"}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded border font-mono uppercase ${
                      project.status === "Launched" ? "border-green-500/50 text-green-500 bg-green-500/10" :
                      project.status === "Building" ? "border-primary/50 text-primary bg-primary/10" :
                      "border-white/20 text-white/40 bg-white/5"
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-white mb-4 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/40 text-sm mb-8 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.category && (
                      <span className="text-[10px] font-mono text-primary bg-primary/5 border border-primary/20 px-2 py-1 rounded">#{project.category.toUpperCase()}</span>
                    )}
                    {project.tags?.map((tag: string) => (
                      <span key={tag} className="text-[10px] font-mono text-white/30 bg-white/5 px-2 py-1 rounded">#{tag.toUpperCase()}</span>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-6 border-t border-white/5">
                  <button className="text-xs font-bold text-white/60 hover:text-white transition-colors uppercase tracking-widest">VIEW DETAILS</button>
                  <div className="flex gap-2">
                    {project.repo_url && (
                      <a href={project.repo_url} target="_blank" rel="noreferrer" className="w-8 h-8 rounded bg-white/5 flex items-center justify-center hover:bg-primary hover:text-black transition-all">
                        <i className="bi bi-github"></i>
                      </a>
                    )}
                    {project.demo_url && (
                      <a href={project.demo_url} target="_blank" rel="noreferrer" className="w-8 h-8 rounded bg-white/5 flex items-center justify-center hover:bg-primary hover:text-black transition-all">
                        <i className="bi bi-box-arrow-up-right"></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
