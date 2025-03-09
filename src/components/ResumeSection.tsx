import { useState, useRef, useEffect } from 'react';
import GlassTile from './GlassTile';
import { StarBorder } from '@/components/ui/star-border';
import { Award, BookOpen, Briefcase, Download, Magnet } from 'lucide-react';
import DownloadButton from './DownloadButton';
import { Gravity, MatterBody, GravityRef } from './ui/gravity';

const ResumeSection = () => {
  // gravityEnabled means "normal layout" - when false, physics is activated
  const [gravityEnabled, setGravityEnabled] = useState(true);
  const gravityRef = useRef<GravityRef>(null);
  const [physicsInitialized, setPhysicsInitialized] = useState(false);
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
  
  const skillCategories = [
    {
      title: 'Data Analysis',
      skills: ['Excel', 'Google Sheets']
    },
    {
      title: 'Data Visualization',
      skills: ['Tableau', 'Looker Studio', 'Power BI']
    },
    {
      title: 'Data Languages',
      skills: ['SQL', 'Python', 'R']
    },
    {
      title: 'Softwares',
      skills: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe After Effects', 'CapCut']
    }
  ];
  
  // Initialize physics engine
  useEffect(() => {
    // Small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      if (!physicsInitialized && gravityRef.current) {
        console.log("Initializing physics engine");
        setPhysicsInitialized(true);
        
        // Start physics if gravity is already disabled
        if (!gravityEnabled && gravityRef.current) {
          console.log("Auto-starting physics (gravity disabled)");
          gravityRef.current.start();
        }
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [physicsInitialized, gravityEnabled]);
  
  const toggleGravity = () => {
    console.log("Toggling gravity from", gravityEnabled, "to", !gravityEnabled);
    
    // Update state first
    setGravityEnabled(!gravityEnabled);
    
    // Ensure physics is initialized
    if (!physicsInitialized) {
      console.log("Physics not initialized yet");
      setPhysicsInitialized(true);
      return;
    }
    
    // Toggle physics based on new state
    if (gravityRef.current) {
      if (gravityEnabled) { // We're turning gravity OFF (physics ON)
        console.log("Starting physics simulation");
        setTimeout(() => {
          gravityRef.current?.start();
        }, 50);
      } else { // We're turning gravity ON (physics OFF)
        console.log("Stopping physics simulation");
        gravityRef.current.stop();
        setTimeout(() => {
          gravityRef.current?.reset();
        }, 50);
      }
    } else {
      console.error("gravityRef not available");
    }
  };
  
  return <section id="resume" className="flex flex-col items-center justify-center space-y-8">
      {/* Resume Tile */}
      <GlassTile>
        <h2 className="section-heading">Resume</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Experience Column */}
          <div>
            <div className="flex items-center mb-6">
              <Briefcase className="text-saffron mr-3" size={24} />
              <h3 className="text-2xl font-medium">Experience</h3>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-xs rounded-xl p-5 hardware-accelerated transition-all duration-300 hover:bg-white/10">
                <div className="flex justify-between mb-2">
                  <h4 className="font-medium text-saffron">AI Data Operations Analyst</h4>
                  <span className="text-xs bg-white/10 px-2 py-1 rounded-full text-zinc-950">
                    Nov 2022 - Present
                  </span>
                </div>
                <h5 className="text-sm mb-3 text-zinc-950">Global Logic - Austin, TX</h5>
                <p className="text-sm text-zinc-950">
                  Developed Python scripts to automate data validation workflows, reducing manual errors by 25% 
                  and improving operational efficiency by 30% for ML teams while ensuring compliance with data 
                  governance policies.
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-xs rounded-xl p-5 hardware-accelerated transition-all duration-300 hover:bg-white/10">
                <div className="flex justify-between mb-2">
                  <h4 className="font-medium text-saffron">Leasing Manager</h4>
                  <span className="text-xs bg-white/10 px-2 py-1 rounded-full text-zinc-950">
                    Jan 2021 - Sep 2022
                  </span>
                </div>
                <h5 className="text-sm mb-3 text-zinc-950">Greystar Property Management - Austin, TX</h5>
                <p className="text-sm text-zinc-950">
                  Managed leasing operations for two properties, integrated automated reminders into CRM platform
                  improving response rates by over 40%, and utilized Excel and CRM systems to analyze market trends,
                  boosting customer satisfaction.
                </p>
              </div>
            </div>
          </div>
          
          {/* Education Column */}
          <div>
            <div className="flex items-center mb-6">
              <BookOpen className="text-saffron mr-3" size={24} />
              <h3 className="text-2xl font-medium">Education</h3>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-xs rounded-xl p-5 hardware-accelerated transition-all duration-300 hover:bg-white/10">
                <div className="flex justify-between mb-2">
                  <h4 className="font-medium text-saffron">Google Data Analytics Professional</h4>
                  <span className="text-xs bg-white/10 px-2 py-1 rounded-full text-zinc-950">
                    November 2022
                  </span>
                </div>
                <h5 className="text-sm mb-3 text-zinc-950">Coursera</h5>
                <p className="text-sm text-zinc-950">
                  Professional certification in data analytics focusing on data workflow optimization, 
                  quality assurance, and technical expertise to improve data accuracy.
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-xs rounded-xl p-5 hardware-accelerated transition-all duration-300 hover:bg-white/10">
                <div className="flex justify-between mb-2">
                  <h4 className="font-medium text-saffron">B.S. Multimedia & Information Technology</h4>
                  <span className="text-xs bg-white/10 px-2 py-1 rounded-full text-zinc-950">
                    2015 - 2018
                  </span>
                </div>
                <h5 className="text-sm mb-3 text-zinc-950">University of Mary Hardin-Baylor - Belton, TX</h5>
                <p className="text-sm text-zinc-950">
                  Developed a strong foundation in digital technology and information systems,
                  with a focus on data analysis and visualization techniques.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Download Button */}
        <div className="flex justify-center mt-8">
          <DownloadButton 
            href={import.meta.env.BASE_URL + "resume.pdf"} 
            label="Download Full Resume" 
            className="min-w-[240px]"
          />
        </div>
      </GlassTile>
      
      {/* Skills Tile */}
      <GlassTile className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
          <div className="flex items-center">
            <Award className="text-saffron mr-3" size={24} />
            <h3 className="text-2xl font-medium">Skills</h3>
          </div>
          
          <button 
            onClick={toggleGravity}
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all ${
              gravityEnabled 
                ? 'bg-white/10 text-platinum' 
                : 'bg-saffron text-brunswick-green'
            }`}
            title={gravityEnabled ? "Turn Gravity Off" : "Turn Gravity On"}
            aria-label={gravityEnabled ? "Turn Gravity Off" : "Turn Gravity On"}
          >
            <Magnet size={18} />
            <span className="text-sm font-medium whitespace-nowrap">
              Gravity: {gravityEnabled ? "On" : "Off"}
            </span>
          </button>
        </div>
        
        <div className="relative min-h-[300px] sm:min-h-[350px] md:min-h-[300px] overflow-hidden touch-auto">
          {/* Physics simulation is always rendered */}
          <Gravity 
            ref={gravityRef}
            autoStart={false}
            gravity={{ x: 0, y: isMobile ? 0.5 : 1 }} // Gentler gravity on mobile
            className="w-full h-full"
            grabCursor={true}
            debug={false}
          >
            {/* Categories as physics bodies */}
            {skillCategories.map((category, categoryIndex) => (
              <MatterBody
                key={`category-${category.title}`}
                x={`${10 + (categoryIndex * (isMobile ? 20 : 25))}%`}
                y={isMobile ? 50 : 60}
                className={`z-20 transition-opacity duration-300 ${gravityEnabled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                matterBodyOptions={{
                  restitution: 0.5,
                  friction: 0.1,
                  density: 0.002,
                }}
              >
                <span className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-sm font-medium text-saffron inline-block whitespace-nowrap">
                  {category.title}
                </span>
              </MatterBody>
            ))}
            
            {/* Skills as physics bodies */}
            {skillCategories.flatMap((category, categoryIndex) => 
              category.skills.map((skill, skillIndex) => (
                <MatterBody
                  key={`skill-${skill}`}
                  x={`${15 + (categoryIndex * (isMobile ? 15 : 20)) + (skillIndex * (isMobile ? 3 : 5))}%`}
                  y={100 + (skillIndex * (isMobile ? 30 : 40))}
                  className={`z-10 transition-opacity duration-300 ${gravityEnabled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                  matterBodyOptions={{
                    restitution: 0.7, // Increase bounciness
                    friction: 0.01,  // Reduce friction
                    density: 0.001,  // Keep density low
                  }}
                >
                  <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 backdrop-blur-sm rounded-full text-xs sm:text-sm text-platinum/80 inline-block whitespace-nowrap touch-none">
                    {skill}
                  </span>
                </MatterBody>
              ))
            )}
          </Gravity>
          
          {/* Regular display when gravity is ON */}
          <div className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${gravityEnabled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {skillCategories.map((category) => (
              <div key={category.title} className="mb-4">
                <span className="px-4 py-2 bg-white/5 rounded-full text-xs sm:text-sm font-medium text-saffron inline-block m-2">
                  {category.title}
                </span>
                
                {category.skills.map((skill) => (
                  <span 
                    key={skill}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 rounded-full text-xs sm:text-sm text-platinum/80 inline-block m-2 transition-all duration-300 hover:bg-white/10 hover:text-platinum"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </GlassTile>
    </section>;
};

export default ResumeSection;
