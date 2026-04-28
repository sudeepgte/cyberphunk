"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SettingsPage() {
  const [lookingForTeam, setLookingForTeam] = useState(false);
  
  return (
    <main className="bg-background min-h-screen pt-32">
      <Navbar />
      <div className="container mx-auto px-6 mb-24">
        <h1 className="text-5xl font-heading font-bold text-white mb-12 uppercase tracking-tighter">
          Profile <span className="text-primary">Settings</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Menu */}
          <div className="lg:col-span-1 space-y-4">
            {["General", "Skills & Roles", "Social Links", "Wallet & Security"].map(item => (
              <div key={item} className={`p-4 rounded-lg font-heading font-bold uppercase tracking-widest text-sm cursor-pointer transition-all ${
                item === "General" ? "bg-primary text-black" : "text-white/40 hover:text-white hover:bg-white/5"
              }`}>
                {item}
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2 glass-card p-10 space-y-12">
            <section className="space-y-6">
              <h3 className="text-2xl font-heading font-bold text-white uppercase tracking-tighter">// GENERAL_INFO</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-white/30 uppercase tracking-widest">Username</label>
                  <input type="text" placeholder="cyberphunk_builder" className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-white/30 uppercase tracking-widest">Email (Private)</label>
                  <input type="email" placeholder="builder@phunk.dev" className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-primary" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-white/30 uppercase tracking-widest">Bio</label>
                <textarea rows={4} placeholder="Tell the community who you are..." className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-primary resize-none"></textarea>
              </div>
            </section>

            <section className="space-y-6">
               <h3 className="text-2xl font-heading font-bold text-white uppercase tracking-tighter">// NETWORKING</h3>
               <div className="flex items-center justify-between p-6 bg-primary/5 border border-primary/20 rounded-xl">
                 <div>
                   <h4 className="text-primary font-bold uppercase tracking-tight mb-1">Looking for team</h4>
                   <p className="text-white/40 text-xs">Enable this to show builders you're available for collaboration.</p>
                 </div>
                 <button 
                  onClick={() => setLookingForTeam(!lookingForTeam)}
                  className={`w-14 h-8 rounded-full relative transition-all ${lookingForTeam ? 'bg-primary' : 'bg-white/10'}`}
                 >
                   <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all ${lookingForTeam ? 'right-1' : 'left-1'}`}></div>
                 </button>
               </div>
            </section>

            <div className="pt-8 border-t border-white/5 flex justify-end gap-4">
               <button className="btn-outline px-8 py-3 uppercase text-xs">CANCEL</button>
               <button className="btn-primary px-8 py-3 uppercase text-xs">SAVE CHANGES</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
