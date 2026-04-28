"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Calendar, 
  Users, 
  Plus, 
  Edit3, 
  Trash2, 
  BarChart3, 
  MapPin, 
  Clock,
  ChevronRight,
  ExternalLink
} from "lucide-react";

export default function OrganizerDashboard() {
  const { profile, loading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!loading && (!profile || (profile.role !== 'organizer' && profile.role !== 'admin'))) {
      router.push("/"); // Restricted access
    }
  }, [profile, loading, router]);

  const activeEvents = [
    { 
      id: 1, 
      title: "Global CyberPhunk Hackathon 2026", 
      type: "Hackathon", 
      date: "July 15, 2026", 
      location: "Berlin + Online", 
      attendees: 312, 
      capacity: 500,
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800"
    },
    { 
      id: 2, 
      title: "Web3 Accelerator — Cohort 3", 
      type: "Accelerator", 
      date: "Aug 10, 2026", 
      location: "Singapore", 
      attendees: 12, 
      capacity: 30,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800"
    },
  ];

  if (loading || (profile && profile.role !== 'organizer' && profile.role !== 'admin')) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-white font-mono uppercase tracking-[0.3em] animate-pulse">// AUTHORIZING_ORGANIZER_ACCESS...</div>;
  }

  return (
    <main className="bg-background min-h-screen pt-32 selection:bg-primary selection:text-black">
      <Navbar />
      
      <div className="container mx-auto px-6 mb-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-mono text-primary uppercase tracking-widest">Organizer Toolkit: Ready</span>
            </div>
            <h1 className="text-5xl font-heading font-bold text-white uppercase tracking-tighter">
              Event <span className="text-primary">Management</span>
            </h1>
          </div>
          
          <Link href="/events/new" className="bg-primary text-black px-8 py-3 rounded-lg font-bold hover:scale-105 transition-all flex items-center gap-3 uppercase text-sm">
            <Plus className="w-5 h-5" /> Host_New_Event
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Stats */}
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h4 className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-4">Total Impact</h4>
              <div className="space-y-4">
                <div>
                  <div className="text-2xl font-bold text-white">428</div>
                  <div className="text-xs text-white/40 font-mono uppercase tracking-tight">Total RSVPs</div>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <div className="text-2xl font-bold text-white">4.8/5</div>
                  <div className="text-xs text-white/40 font-mono uppercase tracking-tight">Avg. Satisfaction</div>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <h4 className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-4">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="flex items-center justify-between text-xs text-white/60 hover:text-primary transition-colors group">
                    Venue Guide <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center justify-between text-xs text-white/60 hover:text-primary transition-colors group">
                    Sponsorship Kit <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center justify-between text-xs text-white/60 hover:text-primary transition-colors group">
                    Safety Protocol <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Active Events List */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-xl font-heading font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" /> Active Programs
            </h3>

            {activeEvents.map((event) => (
              <div key={event.id} className="glass-card overflow-hidden group hover:border-primary/30 transition-all flex flex-col md:flex-row">
                <div className="md:w-64 h-48 md:h-auto relative overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-60" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary/90 text-black text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter">
                      {event.type}
                    </span>
                  </div>
                </div>

                <div className="flex-grow p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-2xl font-heading font-bold text-white group-hover:text-primary transition-colors uppercase leading-tight max-w-lg">
                        {event.title}
                      </h4>
                      <div className="flex gap-2">
                        <button className="p-2 rounded bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded bg-white/5 hover:bg-red-500/10 text-white/40 hover:text-red-500 transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-6 text-[10px] font-mono text-white/40 uppercase tracking-widest">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3 text-primary" /> {event.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-primary" /> {event.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-3 h-3 text-primary" /> {event.attendees} / {event.capacity} Registered
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="h-1.5 w-32 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary" 
                          style={{ width: `${(event.attendees / event.capacity) * 100}%` }} 
                        />
                      </div>
                      <span className="text-[10px] font-mono text-white/30">{Math.round((event.attendees / event.capacity) * 100)}% Capacity</span>
                    </div>
                    
                    <button className="flex items-center gap-2 text-[10px] font-mono text-primary hover:underline uppercase tracking-widest">
                      Manage_Attendees <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button className="w-full py-8 border-2 border-dashed border-white/10 rounded-xl text-white/20 hover:text-white/40 hover:border-white/20 transition-all flex flex-col items-center justify-center gap-4 group">
              <div className="p-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-all">
                <Plus className="w-8 h-8" />
              </div>
              <span className="text-xs font-mono uppercase tracking-[0.2em]">// INITIALIZE_NEW_SEQUENCE</span>
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
