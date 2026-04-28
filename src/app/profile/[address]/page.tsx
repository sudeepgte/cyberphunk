import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// This is a placeholder for the dynamic profile page
// In a real app, we'd use useAuth or fetch from Supabase based on the address
export default function ProfilePage({ params }: { params: { address: string } }) {
  const address = params.address;
  
  return (
    <main className="bg-background min-h-screen pt-32">
      <Navbar />
      <div className="container mx-auto px-6 mb-24">
        <div className="glass-card p-12 relative overflow-hidden">
          {/* Cover Background */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-12 items-start pt-16">
            {/* Avatar */}
            <div className="w-40 h-40 rounded-2xl bg-black border-4 border-background overflow-hidden shadow-2xl shrink-0">
               <div className="w-full h-full flex items-center justify-center text-primary text-5xl font-heading font-bold bg-primary/5">
                 {address.slice(0, 2).toUpperCase()}
               </div>
            </div>

            {/* Info */}
            <div className="flex-grow space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-4xl font-heading font-bold text-white mb-2 uppercase tracking-tighter">
                    CyberBuilder_{address.slice(0, 4)}
                  </h1>
                  <p className="text-primary font-mono text-xs tracking-widest">{address}</p>
                </div>
                <div className="flex gap-4">
                  <button className="btn-primary px-6 py-2 text-sm">FOLLOW</button>
                  <button className="btn-outline px-6 py-2 text-sm uppercase">MESSAGE</button>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {["Solana", "Rust", "React", "TypeScript", "DeFi"].map(skill => (
                  <span key={skill} className="text-[10px] font-mono text-white/50 bg-white/5 px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest">
                    {skill}
                  </span>
                ))}
              </div>

              <p className="text-white/60 text-lg leading-relaxed max-w-3xl">
                Building the future of digital sovereignty. Focused on Solana infrastructure and decentralized governance systems. Currently exploring ZK-proofs for private voting.
              </p>

              <div className="flex gap-6 pt-6 border-t border-white/5">
                 <div className="text-center">
                   <div className="text-2xl font-heading font-bold text-white">12</div>
                   <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Projects</div>
                 </div>
                 <div className="text-center">
                   <div className="text-2xl font-heading font-bold text-white">8</div>
                   <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Hackathons</div>
                 </div>
                 <div className="text-center">
                   <div className="text-2xl font-heading font-bold text-white">2.4k</div>
                   <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Reputation</div>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs / Content Section */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Sidebar */}
          <div className="space-y-8">
            <div className="glass-card p-8">
               <h4 className="font-heading font-bold text-white uppercase tracking-widest text-xs mb-6">// SOCIAL_LINKS</h4>
               <div className="space-y-4">
                 {[
                   { icon: "bi-github", label: "GitHub", handle: "@cyberbuilder" },
                   { icon: "bi-twitter-x", label: "Twitter", handle: "@cyberphunk_dev" },
                   { icon: "bi-globe", label: "Website", handle: "cyberbuilder.phunk" },
                 ].map(social => (
                   <div key={social.label} className="flex items-center gap-4 text-white/50 hover:text-primary transition-colors cursor-pointer group">
                     <i className={`bi ${social.icon} text-lg`}></i>
                     <span className="text-sm font-mono">{social.handle}</span>
                   </div>
                 ))}
               </div>
            </div>

            <div className="glass-card p-8 border-primary/20 bg-primary/5">
               <div className="flex items-center gap-3 mb-4">
                 <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                 <h4 className="font-heading font-bold text-primary uppercase tracking-widest text-xs">Looking for Team</h4>
               </div>
               <p className="text-white/60 text-sm mb-6">
                 Interested in collaborating on Solana DeFi or Infrastructure projects.
               </p>
               <button className="btn-primary w-full text-xs">CONNECT</button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-3xl font-heading font-bold text-white uppercase tracking-tighter mb-8">Active <span className="text-primary">Projects</span></h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map(i => (
                <div key={i} className="glass-card p-6 hover:border-primary/30 transition-all cursor-pointer">
                   <div className="flex justify-between items-start mb-4">
                     <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded uppercase tracking-widest">BUILDING</span>
                   </div>
                   <h4 className="text-xl font-heading font-bold text-white mb-2">PhunkProtocol v{i}</h4>
                   <p className="text-white/40 text-sm mb-6 line-clamp-2">Autonomous lending market built on Solana with isolated pools.</p>
                   <div className="flex gap-2">
                     <span className="text-[10px] text-white/30 bg-white/5 px-2 py-1 rounded">#RUST</span>
                     <span className="text-[10px] text-white/30 bg-white/5 px-2 py-1 rounded">#DEFI</span>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
