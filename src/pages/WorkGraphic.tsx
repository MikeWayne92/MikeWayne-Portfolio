import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from "@/components/NavBar";
import Background from "@/components/Background";
import GlassTile from '@/components/GlassTile';
import { StarBorder } from '@/components/ui/star-border';
import { ArrowLeft } from 'lucide-react';

const WorkGraphic = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "Graphic Design Projects | Mike Wayne";
  }, []);

  return (
    <div className="min-h-screen">
      <Background />
      <NavBar />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <section className="flex items-center justify-center pt-20">
          <GlassTile>
            <div className="flex justify-between items-center mb-8">
              <h1 className="section-heading">Graphic Design Projects</h1>
              <StarBorder 
                as="button" 
                onClick={() => navigate('/')}
                className="flex items-center gap-2"
              >
                <ArrowLeft size={16} /> Back to Home
              </StarBorder>
            </div>
            
            <div className="space-y-12">
              {/* Texans T-shirt Artwork */}
              <div className="space-y-4">
                <h2 className="text-2xl font-medium text-saffron">Texans T-shirt Artwork</h2>
                <p className="text-platinum/80">
                  Custom t-shirt design featuring original Houston Texans themed artwork.
                </p>
                <div className="w-full overflow-hidden rounded-lg shadow-lg">
                  <img 
                    src="/graphics/Texans.png" 
                    alt="Texans T-shirt Design"
                    className="w-full h-auto"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="w-full h-auto rounded-lg shadow-md overflow-hidden">
                    <video 
                      controls
                      className="w-full h-auto"
                    >
                      <source src="/graphics/Texans.bwalking.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="w-full h-auto rounded-lg shadow-md overflow-hidden">
                    <video 
                      controls
                      className="w-full h-auto"
                    >
                      <source src="/graphics/Texans.wwalking.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
              
              {/* 3D Gotenks Sticker */}
              <div className="space-y-4">
                <h2 className="text-2xl font-medium text-saffron">3D DBZ Designs</h2>
                <p className="text-platinum/80">
                  Vibrant 3D designs of Dragon Ball characters Gotenks and Majin Buu, produced as high-quality stickers.
                </p>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden rounded-lg shadow-lg">
                  <img 
                    src="/graphics/Dbz.gotenks.png" 
                    alt="Gotenks Sticker Design"
                    className="w-full h-auto"
                  />
                  <img 
                    src="/graphics/Dbz.buu.png" 
                    alt="Majin Buu Sticker Design"
                    className="w-full h-auto"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="w-full h-auto rounded-lg shadow-md overflow-hidden">
                    <video 
                      controls
                      className="w-full h-auto"
                    >
                      <source src="/graphics/Dbz.gotenksreveal.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="w-full h-auto rounded-lg shadow-md overflow-hidden">
                    <video 
                      controls
                      className="w-full h-auto"
                    >
                      <source src="/graphics/Dbz.buureveal.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </GlassTile>
        </section>
      </main>
      
      <footer className="text-center py-8 text-platinum/60 text-sm">
        <div className="container mx-auto">
          <p>&copy; {new Date().getFullYear()} Mike Wayne. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default WorkGraphic;
