
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SocialLinkProps {
  href: string;
  label: string;
  icon: LucideIcon | React.ComponentType<{ size?: number; className?: string }>;
}

const SocialLink = ({ href, label, icon: Icon }: SocialLinkProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="social-icon"
      aria-label={label}
    >
      <Icon size={20} />
    </a>
  );
};

export default SocialLink;
