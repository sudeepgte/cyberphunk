import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main className="bg-background min-h-screen pt-32">
      <Navbar />
      <div className="container mx-auto px-6 mb-24">
        <h1 className="text-6xl md:text-8xl font-heading font-bold text-white mb-8 uppercase tracking-tighter">
          Our <span className="text-primary">Manifesto</span>
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8 text-xl text-white/70 leading-relaxed font-body">
            <p>
              The digital realm is no longer a sandbox—it is where the future of human coordination is being written. 
              But this future is under threat by centralization, surveillance, and gated ecosystems.
            </p>
            <p className="border-l-4 border-primary pl-8 py-4 italic text-white bg-primary/5">
              "We the CyberPhunks are dedicated to building anonymous, decentralized systems. 
              We write code because we believe privacy is a human right, and collaboration is a human superpower."
            </p>
            <p>
              CyberPhunk is more than a platform. It is a network of builders, hackers, and researchers who believe 
              that the tools of digital sovereignty should be open-source, permissionless, and community-owned.
            </p>
          </div>
          
          <div className="glass-card p-10 space-y-8 relative overflow-hidden">
             <div className="relative z-10">
               <h3 className="text-2xl font-heading font-bold text-white uppercase tracking-widest mb-6">// CORE_PRINCIPLES</h3>
               <div className="space-y-6">
                  {[
                    { title: "Privacy First", desc: "Encryption is not a crime. It is a prerequisite for freedom." },
                    { title: "Open Collaboration", desc: "Build in public. Ship together. Share the rewards." },
                    { title: "Self-Sovereignty", desc: "You own your data, your identity, and your code." },
                  ].map(principle => (
                    <div key={principle.title} className="group cursor-default">
                      <h4 className="text-primary font-bold mb-1 uppercase tracking-tight group-hover:translate-x-2 transition-transform">{principle.title}</h4>
                      <p className="text-white/40 text-sm">{principle.desc}</p>
                    </div>
                  ))}
               </div>
             </div>
             {/* Background glow */}
             <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"></div>
          </div>
        </div>
      </div>

      <section className="bg-white/5 py-32 border-y border-white/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-heading font-bold text-white mb-16 uppercase tracking-widest">The Evolution</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
             {/* Timeline track */}
             <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 hidden md:block"></div>
             
             {[
               { year: "2024", event: "Genesis", desc: "The CyberPhunk vision is born." },
               { year: "2025", event: "Community", desc: "First 10,000 builders join the Discord." },
               { year: "2026", event: "Launch", desc: "The Collaboration Marketplace goes live." },
               { year: "2027", event: "Sovereignty", desc: "Fully DAO-controlled infrastructure." },
             ].map((milestone, i) => (
               <div key={milestone.year} className="relative z-10 group">
                  <div className="w-12 h-12 rounded-full bg-black border border-primary/50 flex items-center justify-center text-primary font-mono font-bold mx-auto mb-6 group-hover:bg-primary group-hover:text-black transition-all">
                    {i + 1}
                  </div>
                  <h4 className="text-white font-bold mb-2">{milestone.event} ({milestone.year})</h4>
                  <p className="text-white/40 text-sm max-w-[200px] mx-auto">{milestone.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
