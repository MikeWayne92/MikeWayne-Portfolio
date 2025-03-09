
"use client";
import React, { useId } from "react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";

// Create a simpler version that doesn't depend on tsparticles
type ParticlesProps = {
  id?: string;
  className?: string;
  background?: string;
  particleSize?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

export const SparklesCore = (props: ParticlesProps) => {
  const {
    id,
    className,
    background = "transparent",
    minSize = 1,
    maxSize = 3,
    speed = 4,
    particleColor = "#FFFFFF",
    particleDensity = 120,
  } = props;
  
  const [init, setInit] = useState(false);
  
  useEffect(() => {
    // Initialize after component mounts
    setInit(true);
  }, []);
  
  const controls = useAnimation();

  useEffect(() => {
    if (init) {
      controls.start({
        opacity: 1,
        transition: {
          duration: 1,
        },
      });
    }
  }, [controls, init]);

  const generatedId = useId();
  
  // Generate a random number of particles based on density
  const particles = React.useMemo(() => {
    const count = particleDensity;
    return Array.from({ length: count }, (_, i) => ({
      id: `particle-${i}`,
      size: Math.random() * (maxSize - minSize) + minSize,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: (Math.random() * 2 + 1) * speed,
      delay: Math.random() * 2,
    }));
  }, [particleDensity, minSize, maxSize, speed]);

  return (
    <motion.div 
      id={id || generatedId}
      animate={controls} 
      className={cn("opacity-0 relative", className)}
      style={{ background }}
    >
      {init && particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particleColor,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            opacity: [0.1, 1, 0.1],
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
    </motion.div>
  );
};
