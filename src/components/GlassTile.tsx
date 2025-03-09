
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassTileProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const GlassTile = ({ children, className, id }: GlassTileProps) => {
  return (
    <div 
      id={id}
      className={cn(
        "glasstile hardware-accelerated transition-all duration-500", 
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassTile;
