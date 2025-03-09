import { useState } from 'react';
import GlassTile from './GlassTile';
import { BarChart3, PenTool } from 'lucide-react';
import { StackedCardsInteraction } from './ui/stacked-cards-interaction';
import { useNavigate } from 'react-router-dom';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'analysis', label: 'Analysis', icon: BarChart3 },
  { id: 'graphic', label: 'Graphic Design', icon: PenTool },
];

// To replace placeholder images:
// 1. Upload your actual images to the public directory
// 2. Update the image paths below to point to your uploaded images
// Example: image: '/your-image-name.jpg' or image: '/projects/your-image-name.png'
const projects = [
  {
    id: 'polandShipping',
    title: 'Dashboard Poland Shipping',
    category: 'analysis',
    image: '/dash/Poland.main.png',
    description: 'Interactive data visualization dashboard tracking shipping metrics and performance indicators.',
  },
  {
    id: 'listeningHistory',
    title: 'Dashboard Extended Listening History',
    category: 'analysis',
    image: '/dash/Spotify.main.png',
    description: 'Visual representation of music listening patterns and trends over extended time periods.',
  },
  {
    id: 'texansTshirt',
    title: 'Texans T-shirt Artwork',
    category: 'graphic',
    image: '/graphics/Texans.png',
    description: 'Custom t-shirt design featuring original Houston Texans themed artwork.',
  },
  {
    id: 'gotenksSticker',
    title: '3D DBZ Designs',
    category: 'graphic',
    image: '/graphics/Dbz.gotenks.png',
    description: 'Vibrant 3D designs of Dragon Ball characters, produced as high-quality stickers.',
  },
];

const WorksSection = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);
  
  // Group projects by category for StackedCardsInteraction
  const analysisProjCards = projects
    .filter(project => project.category === 'analysis')
    .map(project => ({
      image: project.image,
      title: project.title,
      description: project.description
    }));
    
  const graphicProjCards = projects
    .filter(project => project.category === 'graphic')
    .map(project => ({
      image: project.image,
      title: project.title,
      description: project.description
    }));

  const handleCardClick = (categoryId: string) => {
    if (categoryId === 'analysis') {
      navigate('/work/analysis');
    } else if (categoryId === 'graphic') {
      navigate('/work/graphic');
    }
  };
  
  return (
    <section id="works" className="flex items-center justify-center">
      <GlassTile>
        <h2 className="section-heading">My Works</h2>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition-all duration-300 flex items-center ${
                  activeCategory === category.id
                    ? 'bg-saffron text-eerieblack'
                    : 'bg-white/10 hover:bg-white/20 text-platinum/80 hover:text-platinum'
                }`}
              >
                {Icon && <Icon size={16} className="mr-1.5 sm:mr-2" />}
                {category.label}
              </button>
            );
          })}
        </div>
        
        {/* Projects Grid using StackedCardsInteraction */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(activeCategory === 'all' || activeCategory === 'analysis') && (
            <div 
              className="flex flex-col items-center cursor-pointer touch-manipulation"
              onClick={() => handleCardClick('analysis')}
              role="button"
              tabIndex={0}
              aria-label="View Analysis Projects"
              onKeyDown={(e) => e.key === 'Enter' && handleCardClick('analysis')}
            >
              <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4 text-saffron">Analysis Projects</h3>
              <StackedCardsInteraction 
                cards={analysisProjCards}
                spreadDistance={40}
                rotationAngle={5}
              />
            </div>
          )}
          
          {(activeCategory === 'all' || activeCategory === 'graphic') && (
            <div 
              className="flex flex-col items-center cursor-pointer touch-manipulation"
              onClick={() => handleCardClick('graphic')}
              role="button"
              tabIndex={0}
              aria-label="View Graphic Design Projects"
              onKeyDown={(e) => e.key === 'Enter' && handleCardClick('graphic')}
            >
              <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4 text-saffron">Graphic Design Projects</h3>
              <StackedCardsInteraction 
                cards={graphicProjCards}
                spreadDistance={40}
                rotationAngle={5}
              />
            </div>
          )}
        </div>
      </GlassTile>
    </section>
  );
};

export default WorksSection;
