import React from 'react';

const COLOR_MAP = {
  cyan:   'tag-cyan',
  pink:   'tag-pink',
  gold:   'tag-gold',
  green:  'tag-green',
  purple: 'tag-purple',
};

// Deterministically pick a color from the tag text
const autoColor = (text) => {
  const palette = Object.values(COLOR_MAP);
  const idx = text.charCodeAt(0) % palette.length;
  return palette[idx];
};

/**
 * TagBadge — Category/tag pill
 * @param {string} label - tag text
 * @param {string} color - 'cyan' | 'pink' | 'gold' | 'green' | 'purple' | 'auto'
 */
const TagBadge = ({ label, color = 'auto', className = '', style = {} }) => {
  const cls = color === 'auto' ? autoColor(label) : (COLOR_MAP[color] || 'tag-cyan');
  return (
    <span className={`tag-badge ${cls} ${className}`} style={style}>
      {label}
    </span>
  );
};

export default TagBadge;
