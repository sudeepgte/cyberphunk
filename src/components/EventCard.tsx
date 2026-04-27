import React from "react";

interface EventCardProps {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
}

const EventCard = ({ id, title, date, location, description }: EventCardProps) => {
  return (
    <div className="glass-card p-8 group hover:border-primary/50 transition-all cursor-pointer">
      <div className="flex justify-between items-start mb-6">
        <span className="text-xs font-mono text-primary/70 uppercase tracking-widest">// EVENT_ID_{id}024</span>
        <span className="text-xs font-mono text-white/40">{date}</span>
      </div>
      <h3 className="text-2xl font-heading font-bold text-white mb-4 group-hover:text-primary transition-colors leading-tight">
        {title.split(":").map((part, i) => (
          <React.Fragment key={i}>
            {part}
            {i === 0 && title.includes(":") && <br />}
          </React.Fragment>
        ))}
      </h3>
      <p className="text-white/40 text-sm mb-8 line-clamp-2">
        {description}
      </p>
      <div className="flex justify-between items-center pt-6 border-t border-white/5">
        <span className="text-xs font-bold text-white/60 uppercase tracking-wider">{location}</span>
        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
