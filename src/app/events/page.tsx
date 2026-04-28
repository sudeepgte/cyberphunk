"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import { supabase } from "@/lib/supabase";
import { Search, MapPin, Tag } from "lucide-react";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      let query = supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

      if (filter !== "all") {
        query = query.eq("type", filter);
      }

      const { data, error } = await query;
      if (!error && data) {
        setEvents(data);
      }
      setLoading(false);
    }
    fetchEvents();
  }, [filter]);

  const eventTypes = ["all", "bootcamp", "hackathon", "accelerator", "village", "seminar"];

  return (
    <main className="bg-background min-h-screen pt-32">
      <Navbar />
      <div className="container mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 uppercase tracking-tighter">
              Programs & <span className="text-primary">Events</span>
            </h1>
            <p className="text-white/50 text-xl max-w-2xl font-body">
              From massive hackathons to intimate dev meetups, discover the events shaping the decentralized frontier.
            </p>
          </div>
          
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input 
              type="text" 
              placeholder="Search sequences..." 
              className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-primary w-full md:w-64"
            />
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-4 pb-12 border-b border-white/5">
          <div className="flex items-center gap-3 mr-4">
            <Tag className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Filter_By_Type:</span>
          </div>
          {eventTypes.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-1.5 rounded-full text-[10px] font-mono uppercase transition-all ${
                filter === t ? "bg-primary text-black font-bold shadow-[0_0_15px_rgba(255,107,0,0.3)]" : "bg-white/5 text-white/40 hover:bg-white/10"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <section className="container mx-auto px-6 pb-32">
        {loading ? (
          <div className="text-center py-24 text-white/20 font-mono tracking-[0.4em] animate-pulse uppercase">
            // SYNCING_EVENT_LOGS...
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-32 border border-dashed border-white/10 rounded-2xl">
             <div className="text-white/20 font-mono text-xs uppercase tracking-widest mb-4">// NO_DATA_STREAM_FOUND</div>
             <p className="text-white/10 text-[10px] uppercase font-mono tracking-widest">Adjust your filters or check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((ev) => (
              <EventCard 
                key={ev.id} 
                id={ev.id}
                title={ev.title}
                date={ev.date}
                location={ev.location}
                description={ev.description}
              />
            ))}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
