import React from 'react';

const VideoEmbed = ({ videoId, title = 'Video' }) => (
  <div
    style={{
      position: 'relative',
      paddingBottom: '56.25%',
      height: 0,
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      border: '1px solid var(--border-glass)',
      boxShadow: 'var(--glow-cyan)',
    }}
  >
    <iframe
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
      src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>
);

export default VideoEmbed;
