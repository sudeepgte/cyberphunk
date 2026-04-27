import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroCanvas from "@/components/HeroCanvas";
import EventCard from "@/components/EventCard";

const FEATURED_EVENTS = [
  { id: 1, title: "Global CyberPhunk: Hackathon 2026", date: "2026.06.12", location: "BERLIN + ONLINE", description: "Building privacy-preserving protocols and decentralized infrastructure for the next generation of builders." },
  { id: 2, title: "Web3 Accelerator: Cohort 3", date: "2026.08.10", location: "SINGAPORE + DUBAI", description: "A 12-week accelerator for early-stage Web3 startups. Mentorship and seed investment." },
  { id: 3, title: "Solana Dev Village: Lisbon", date: "2026.09.20", location: "LISBON, PORTUGAL", description: "A week-long co-living and co-working experience for Web3 builders. Workshops and beach hacks." },
];

export default function Home() {
  return (
    <main className="relative bg-background overflow-hidden">
      <Navbar />
      
      <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
        <HeroCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono font-bold tracking-widest uppercase mb-8">
              // DISCOVER_THE_FUTURE_OF_WEB3
            </span>
            <h1 className="text-6xl md:text-8xl font-heading font-bold text-white leading-[0.9] tracking-tighter mb-8">
              DEFY THE <span className="gradient-text">LIMITS</span> <br /> 
              WITH <span className="italic font-light">CODE</span>
            </h1>
            <p className="text-xl text-white/60 leading-relaxed max-w-2xl mb-12">
              CyberPhunk is where Web3 builders connect, collaborate, and create. 
              Join a global network of innovators building the next era of digital sovereignty.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="btn-primary px-8 py-4 text-lg">EXPLORE HACKATHONS</button>
              <button className="btn-outline px-8 py-4 text-lg uppercase tracking-wider">JOIN DISCORD</button>
            </div>
          </div>
        </div>
        
        {/* Visual Decoration */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 hidden lg:block opacity-20 pointer-events-none">
          <div className="w-full h-full border-[20px] border-primary rounded-full blur-[100px] animate-pulse"></div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-32 bg-black/50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-heading font-bold text-white mb-4">Upcoming <span className="text-primary">Events</span></h2>
              <p className="text-white/50 max-w-md">The most impactful hackathons and meetups in the Web3 space.</p>
            </div>
            <button className="text-primary font-heading font-bold border-b border-primary pb-1 hover:text-white hover:border-white transition-all uppercase text-sm tracking-widest">VIEW ALL PROGRAMS</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_EVENTS.map((ev) => (
              <EventCard key={ev.id} {...ev} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
