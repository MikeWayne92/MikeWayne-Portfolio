"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Card = ({
  className,
  image,
  children
}: {
  className?: string;
  image?: string;
  children?: React.ReactNode;
}) => {
  return <div className={cn("w-full max-w-[350px] cursor-pointer h-auto aspect-[7/8] overflow-hidden bg-white rounded-2xl shadow-[0_0_10px_rgba(0,0,0,0.02)] border border-gray-200/80", className)}>
    {image && <div className="relative h-[72%] rounded-xl shadow-lg overflow-hidden w-[calc(100%-1rem)] mx-2 mt-2">
        <img src={image} alt="card" className="object-cover mt-0 w-full h-full" />
      </div>}
    {children && <div className="px-4 p-2 flex flex-col gap-y-2">{children}</div>}
  </div>;
};
interface CardData {
  image: string;
  title: string;
  description: string;
}
const StackedCardsInteraction = ({
  cards,
  spreadDistance = 40,
  rotationAngle = 5,
  animationDelay = 0.1
}: {
  cards: CardData[];
  spreadDistance?: number;
  rotationAngle?: number;
  animationDelay?: number;
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Adjust spread distance for mobile
  const mobileAdjustedSpread = isMobile ? spreadDistance * 0.6 : spreadDistance;

  // Limit to maximum of 3 cards
  const limitedCards = cards.slice(0, 3);
  return <div className="relative w-full h-full flex items-center justify-center">
    <div className="relative w-full max-w-[350px] aspect-[7/8]">
      {limitedCards.map((card, index) => {
        const isFirst = index === 0;
        let xOffset = 0;
        let rotation = 0;
        if (limitedCards.length > 1) {
          // First card stays in place
          // Second card goes left
          // Third card goes right
          if (index === 1) {
            xOffset = -mobileAdjustedSpread;
            rotation = -rotationAngle;
          } else if (index === 2) {
            xOffset = mobileAdjustedSpread;
            rotation = rotationAngle;
          }
        }
        return <motion.div key={index} className={cn("absolute w-full h-full", isFirst ? "z-10" : "z-0")} initial={{
          x: 0,
          rotate: 0
        }} animate={{
          x: isHovering ? xOffset : 0,
          rotate: isHovering ? rotation : 0,
          zIndex: isFirst ? 10 : 0
        }} transition={{
          duration: 0.3,
          ease: "easeInOut",
          delay: index * animationDelay,
          type: "spring"
        }} {...isFirst && {
          onHoverStart: () => setIsHovering(true),
          onHoverEnd: () => setIsHovering(false)
        }}>
            <Card className={isFirst ? "z-10 cursor-pointer" : "z-0"} image={card.image}>
              <h2 className="text-zinc-950 text-sm sm:text-base truncate">{card.title}</h2>
              <p className="text-zinc-950 text-xs sm:text-sm line-clamp-2">{card.description}</p>
            </Card>
          </motion.div>;
      })}
    </div>
  </div>;
};
export { StackedCardsInteraction, Card };