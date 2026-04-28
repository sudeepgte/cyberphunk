import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ARTICLES = [
  {
    id: 1,
    category: "Tutorial",
    title: "Solana Development Basics",
    description: "Learn how to build your first program on Solana using Anchor framework.",
    readTime: "12 min",
  },
  {
    id: 2,
    category: "Guide",
    title: "Winning Your First Hackathon",
    description: "Strategies for ideation, team building, and pitching to judges.",
    readTime: "8 min",
  },
  {
    id: 3,
    category: "Insights",
    title: "The Future of Digital Sovereignty",
    description: "Exploring the evolution of the Cypherpunk manifesto in the age of AI.",
    readTime: "15 min",
  },
];

export default function ResourcesPage() {
  return (
    <main className="bg-background min-h-screen pt-32">
      <Navbar />
      <div className="container mx-auto px-6 mb-16">
        <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-4 uppercase tracking-tighter">
          Resource <span className="text-primary">Hub</span>
        </h1>
        <p className="text-white/50 text-xl max-w-2xl font-body">
          Master the tools of the decentralized future. Tutorials, guides, and research from the CyberPhunk core team.
        </p>
      </div>

      <div className="container mx-auto px-6 pb-32">
        {/* Featured Content */}
        <div className="glass-card p-12 mb-16 bg-gradient-to-br from-primary/10 to-transparent relative overflow-hidden group cursor-pointer">
          <div className="relative z-10">
            <span className="text-xs font-mono text-primary uppercase tracking-widest block mb-4">// FEATURED_SESSION</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight max-w-3xl">
              Solana Speedrun: <br /> Building a DeFi Protocol in 48 Hours
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-xl">
              Recorded session from the CyberPhunk Lisbon Meetup. Includes source code and architecture breakdown.
            </p>
            <button className="btn-primary">WATCH RECORDING</button>
          </div>
          {/* Abstract visual decor */}
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
             <div className="w-full h-full border-r-[50px] border-b-[50px] border-primary skew-x-12 translate-x-1/2"></div>
          </div>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARTICLES.map(article => (
            <div key={article.id} className="glass-card p-8 group hover:bg-white/[0.02] transition-all cursor-pointer flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-mono text-primary/70 uppercase tracking-widest">{article.category}</span>
                  <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{article.readTime} READ</span>
                </div>
                <h3 className="text-2xl font-heading font-bold text-white mb-4 group-hover:text-primary transition-colors">{article.title}</h3>
                <p className="text-white/40 text-sm mb-8 leading-relaxed">{article.description}</p>
              </div>
              <div className="flex justify-between items-center pt-6 border-t border-white/5">
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest group-hover:text-white transition-colors">Read Article</span>
                <i className="bi bi-arrow-right text-primary group-hover:translate-x-2 transition-transform"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
