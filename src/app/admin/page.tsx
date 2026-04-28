"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { 
  Users, 
  Rocket, 
  Calendar, 
  BarChart3, 
  ShieldCheck, 
  AlertCircle,
  Activity,
  ArrowUpRight,
  Search,
  Filter
} from "lucide-react";

export default function AdminDashboard() {
  const { profile, loading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!loading && (!profile || profile.role !== 'admin')) {
      router.push("/"); // Restricted access
    }
  }, [profile, loading, router]);

  const stats = [
    { name: "Total Citizens", value: "1,284", icon: Users, change: "+12%", trend: "up" },
    { name: "Projects Launched", value: "84", icon: Rocket, change: "+5%", trend: "up" },
    { name: "Active Events", value: "12", icon: Calendar, change: "-2%", trend: "down" },
    { name: "Platform Activity", value: "98.2%", icon: Activity, change: "+0.4%", trend: "up" },
  ];

  if (loading || (profile && profile.role !== 'admin')) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-white font-mono uppercase tracking-[0.3em] animate-pulse">// AUTHORIZING_ADMIN_LEVEL_ACCESS...</div>;
  }

  return (
    <main className="bg-background min-h-screen pt-32 selection:bg-primary selection:text-black">
      <Navbar />
      
      <div className="container mx-auto px-6 mb-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-mono text-primary uppercase tracking-widest">System Override: Active</span>
            </div>
            <h1 className="text-5xl font-heading font-bold text-white uppercase tracking-tighter">
              Admin <span className="text-primary">Command</span> Center
            </h1>
          </div>
          
          <div className="flex gap-4">
             <button className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-white/60 hover:text-white transition-all flex items-center gap-2 text-sm font-mono uppercase">
               <Filter className="w-4 h-4" /> Filter_Logs
             </button>
             <button className="bg-primary text-black px-6 py-2 rounded-lg font-bold hover:scale-105 transition-all text-sm uppercase">
               Generate_Report
             </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((s) => (
            <div key={s.name} className="glass-card p-8 group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <s.icon className="w-16 h-16" />
              </div>
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 rounded-lg bg-white/5">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <span className={`text-xs font-mono flex items-center gap-1 ${s.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {s.change} <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
              <h3 className="text-white/40 text-xs font-mono uppercase tracking-widest mb-1">{s.name}</h3>
              <div className="text-3xl font-heading font-bold text-white">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Main Content Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Management */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-card p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-heading font-bold text-white uppercase tracking-wider flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" /> Recent Citizens
                </h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input 
                    type="text" 
                    placeholder="Search UID..." 
                    className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-primary w-64"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/5 text-[10px] font-mono text-white/30 uppercase tracking-widest">
                      <th className="pb-4">Citizen</th>
                      <th className="pb-4">Role</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { name: "NeonViper", wallet: "7xR2...k9wP", role: "Builder", status: "Active" },
                      { name: "Satoshi_Fan", wallet: "Ax91...m2nP", role: "Member", status: "Active" },
                      { name: "CryptoWitch", wallet: "Zx00...z3yQ", role: "Organizer", status: "Pending Approval" },
                      { name: "BlockMage", wallet: "Cx55...q1vR", role: "Builder", status: "Active" },
                    ].map((user) => (
                      <tr key={user.wallet} className="group hover:bg-white/[0.02] transition-colors">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-mono text-xs">
                              {user.name[0]}
                            </div>
                            <div>
                              <div className="text-sm font-bold text-white">{user.name}</div>
                              <div className="text-[10px] font-mono text-white/30">{user.wallet}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className="text-[10px] px-2 py-1 rounded bg-white/5 text-white/60 font-mono uppercase">
                            {user.role}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`} />
                            <span className="text-xs text-white/60">{user.status}</span>
                          </div>
                        </td>
                        <td className="py-4 text-right">
                          <button className="text-primary hover:underline text-[10px] font-mono uppercase">Manage</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <button className="w-full mt-8 py-3 border border-white/5 rounded-lg text-[10px] font-mono text-white/30 hover:text-white transition-all uppercase tracking-widest">
                View_All_Citizens
              </button>
            </div>
          </div>

          {/* System Health / Logs */}
          <div className="space-y-8">
            <div className="glass-card p-8">
               <h3 className="text-xl font-heading font-bold text-white uppercase tracking-wider mb-8 flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-primary" /> System Metrics
              </h3>
              
              <div className="space-y-6">
                {[
                  { label: "Memory Usage", value: 42 },
                  { label: "Storage Capacity", value: 68 },
                  { label: "API Latency", value: 12 },
                  { label: "Sync Status", value: 94 },
                ].map((m) => (
                  <div key={m.label} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-mono uppercase">
                      <span className="text-white/40">{m.label}</span>
                      <span className="text-white">{m.value}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-500" 
                        style={{ width: `${m.value}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-8 border-l-4 border-l-yellow-500/50">
               <div className="flex items-center gap-3 mb-6">
                 <AlertCircle className="w-5 h-5 text-yellow-500" />
                 <h3 className="text-lg font-heading font-bold text-white uppercase tracking-wider">Active Alerts</h3>
               </div>
               <div className="space-y-4">
                  <div className="p-3 rounded bg-yellow-500/10 border border-yellow-500/20">
                    <p className="text-[10px] font-mono text-yellow-500 uppercase mb-1">Warning: Latency Spike</p>
                    <p className="text-[11px] text-white/50 leading-relaxed">Region US-EAST-1 reporting 200ms+ response times.</p>
                  </div>
                  <div className="p-3 rounded bg-blue-500/10 border border-blue-500/20">
                    <p className="text-[10px] font-mono text-blue-500 uppercase mb-1">Info: New Proposal</p>
                    <p className="text-[11px] text-white/50 leading-relaxed">3 new projects awaiting architectural review.</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
