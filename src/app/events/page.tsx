import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";

const ALL_EVENTS = [
  { id: 1, title: "Global CyberPhunk: Hackathon 2026", date: "2026.06.12", location: "BERLIN + ONLINE", description: "Building privacy-preserving protocols and decentralized infrastructure for the next generation of builders." },
  { id: 2, title: "Web3 Accelerator: Cohort 3", date: "2026.08.10", location: "SINGAPORE + DUBAI", description: "A 12-week accelerator for early-stage Web3 startups. Mentorship and seed investment." },
  { id: 3, title: "Solana Dev Village: Lisbon", date: "2026.09.20", location: "LISBON, PORTUGAL", description: "A week-long co-living and co-working experience for Web3 builders. Workshops and beach hacks." },
  { id: 4, title: "CyberPhunk Meetup: Bangalore", date: "2026.10.05", location: "BANGALORE, INDIA", description: "Local networking for Solana builders and enthusiasts. Food, drinks, and alpha." },
  { id: 5, title: "Zero Knowledge Workshop", date: "2026.11.15", location: "ZURICH, SWITZERLAND", description: "Deep dive into ZK-proofs and their application in decentralized identity." },
];

export default function EventsPage() {
  return (
    <main className="bg-background min-h-screen pt-32">
      <Navbar />
      <div className="container mx-auto px-6 mb-20">
        <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 uppercase tracking-tighter">
          Programs & <span className="text-primary">Events</span>
        </h1>
        <p className="text-white/50 text-xl max-w-2xl font-body">
          From massive hackathons to intimate dev meetups, discover the events shaping the decentralized frontier.
        </p>
      </div>

      <section className="container mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ALL_EVENTS.map((ev) => (
            <EventCard key={ev.id} {...ev} />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
