
import { useState } from 'react';
import { Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DownloadButtonProps {
  href: string;
  label: string;
  className?: string;
}

const DownloadButton = ({ href, label, className }: DownloadButtonProps) => {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <a
      href={href}
      download
      className={cn(
        "btn btn-primary group",
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onFocus={() => setIsHovering(true)}
      onBlur={() => setIsHovering(false)}
    >
      <span className="mr-3">{label}</span>
      <Rocket 
        size={18} 
        className={cn(
          "transition-transform duration-300 ease-bouncy",
          isHovering ? "translate-x-2 -translate-y-1" : ""
        )}
      />
    </a>
  );
};

export default DownloadButton;
