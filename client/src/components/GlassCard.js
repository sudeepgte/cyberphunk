import React from 'react';

/**
 * GlassCard — Glassmorphism card wrapper
 * @param {string} variant - 'default' | 'pink' | 'gold'
 * @param {boolean} hover - enable hover lift effect (default true)
 */
const GlassCard = ({
  children,
  variant = 'default',
  hover = true,
  className = '',
  style = {},
  onClick,
  ...rest
}) => {
  const variantClass = variant !== 'default' ? ` glass-card-${variant}` : '';
  const hoverClass = hover ? '' : ' no-hover';

  return (
    <div
      className={`glass-card${variantClass}${hoverClass} ${className}`}
      style={{ ...style, cursor: onClick ? 'pointer' : undefined }}
      onClick={onClick}
      {...rest}
    >
      {children}
    </div>
  );
};

export default GlassCard;
