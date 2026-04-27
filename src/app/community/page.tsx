import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CommunityPage() {
  return (
    <main className="bg-background min-h-screen pt-32">
      <Navbar />
      <div className="container mx-auto px-6 mb-20 text-center flex flex-col items-center">
        <span className="text-primary font-mono text-sm tracking-widest mb-4 uppercase tracking-[0.3em]">
          // JOIN_THE_NETWORK
        </span>
        <h1 className="text-5xl md:text-8xl font-heading font-bold text-white mb-8 uppercase tracking-tighter">
          Global <span className="gradient-text">Community</span>
        </h1>
        <p className="text-white/50 text-xl max-w-2xl font-body mb-12">
          CyberPhunk is built by its members. Connect with builders, researchers, and pioneers across the globe.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          <div className="glass-card p-10 flex flex-col items-center text-center group transition-all hover:bg-white/5">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 text-3xl group-hover:scale-110 transition-transform">
              <i className="bi bi-discord"></i>
            </div>
            <h3 className="text-2xl font-heading font-bold text-white mb-4">Discord HQ</h3>
            <p className="text-white/40 text-sm mb-8">Main hub for collaboration, announcements, and direct access to core teams.</p>
            <button className="btn-primary w-full">LAUNCH DISCORD</button>
          </div>

          <div className="glass-card p-10 flex flex-col items-center text-center group transition-all hover:bg-white/5">
            <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-6 text-3xl group-hover:scale-110 transition-transform">
              <i className="bi bi-twitter-x"></i>
            </div>
            <h3 className="text-2xl font-heading font-bold text-white mb-4">X / Twitter</h3>
            <p className="text-white/40 text-sm mb-8">Follow for real-time updates, community highlights, and the latest Web3 alpha.</p>
            <button className="btn-outline w-full uppercase tracking-widest text-sm">FOLLOW UPDATES</button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
