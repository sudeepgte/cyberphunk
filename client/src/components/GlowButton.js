import React from 'react';
import { Link } from 'react-router-dom';

/**
 * GlowButton — Reusable neon CTA button
 * @param {string} variant - 'cyan' | 'pink' | 'gold' | 'solid'
 * @param {string} href - if provided renders as <a>
 * @param {string} to - if provided renders as React Router <Link>
 */
const GlowButton = ({
  children,
  variant = 'cyan',
  to,
  href,
  onClick,
  disabled = false,
  className = '',
  style = {},
  icon,
  ...rest
}) => {
  const variantClass = variant === 'solid'
    ? 'btn-solid-cyan'
    : `btn-neon${variant !== 'cyan' ? ` btn-neon-${variant}` : ''}`;

  const content = (
    <>
      {icon && <i className={`bi ${icon} me-2`}></i>}
      {children}
    </>
  );

  const commonProps = {
    className: `${variantClass} ${className}`,
    style,
    disabled,
    ...rest,
  };

  if (to) return <Link to={to} {...commonProps}>{content}</Link>;
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" {...commonProps}>{content}</a>;
  return <button onClick={onClick} {...commonProps}>{content}</button>;
};

export default GlowButton;
