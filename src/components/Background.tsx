
import { Particles } from '@/components/ui/particles';

const Background = () => {
  const colors = [
    '#F4C430',   // Saffron
    '#D3DED9',   // Platinum
  ];
  
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden -z-10 bg-black">
      <Particles
        className="absolute inset-0"
        quantity={100}
        staticity={50}
        ease={80}
        size={1}
        color={randomColor}
        vx={0}
        vy={0.1}
      />
    </div>
  );
};

export default Background;
