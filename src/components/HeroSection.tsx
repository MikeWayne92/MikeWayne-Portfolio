import GlassTile from './GlassTile';
import { Cover } from '@/components/ui/cover';
import { StarBorder } from '@/components/ui/star-border';

const HeroSection = () => {
  return (
    <section id="home" className="flex items-center justify-center">
      <GlassTile className="flex flex-col items-center text-center">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-saffron/50 mb-6 flex items-center justify-center bg-platinum/10">
          <img 
            src={import.meta.env.BASE_URL + "MW Logo.png"}
            alt="Mike Wayne Logo" 
            className="w-4/5 h-4/5 object-contain"
          />
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 hardware-accelerated animate-fade-in">
          <Cover>Mike Wayne</Cover>
        </h1>
        
        <div className="h-1 w-24 bg-saffron rounded-full mb-6 hardware-accelerated animate-fade-in animate-delay-100"></div>
        
        <p className="text-xl md:text-2xl text-platinum/80 mb-8 hardware-accelerated animate-fade-in animate-delay-200">
          Analyst & Designer
        </p>
        
        <p className="text-platinum/70 max-w-2xl mb-8 leading-relaxed hardware-accelerated animate-fade-in animate-delay-300">
          I craft immersive digital experiences that blend elegant aesthetics with 
          exceptional functionality. Specializing in data visualization, graphic design, 
          and frontend development, I transform complex challenges into intuitive and 
          beautiful solutions.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 hardware-accelerated animate-fade-in animate-delay-400">
          <StarBorder 
            onClick={() => document.getElementById('works')?.scrollIntoView({
              behavior: 'smooth'
            })} 
            className="w-full sm:w-auto" 
            color="hsl(var(--primary))"
          >
            <span className="text-platinum font-medium">View My Work</span>
          </StarBorder>
          
          <StarBorder 
            onClick={() => document.getElementById('contact')?.scrollIntoView({
              behavior: 'smooth'
            })} 
            className="w-full sm:w-auto"
          >
            <span className="text-platinum font-medium">Get In Touch</span>
          </StarBorder>
        </div>
      </GlassTile>
    </section>
  );
};

export default HeroSection;
