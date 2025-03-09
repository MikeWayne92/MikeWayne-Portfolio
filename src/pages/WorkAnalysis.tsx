import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from "@/components/NavBar";
import Background from "@/components/Background";
import GlassTile from '@/components/GlassTile';
import { StarBorder } from '@/components/ui/star-border';
import { ArrowLeft } from 'lucide-react';

const WorkAnalysis = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "Analysis Projects | Mike Wayne";
  }, []);

  // Initialize Tableau visualization after component mounts
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Background />
      <NavBar />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <section className="flex items-center justify-center pt-20">
          <GlassTile>
            <div className="flex justify-between items-center mb-8">
              <h1 className="section-heading">Analysis Projects</h1>
              <StarBorder 
                as="button" 
                onClick={() => navigate('/')}
                className="flex items-center gap-2"
              >
                <ArrowLeft size={16} /> Back to Home
              </StarBorder>
            </div>
            
            <div className="space-y-12">
              {/* Poland Shipping Dashboard */}
              <div className="space-y-4">
                <h2 className="text-2xl font-medium text-saffron">Poland Shipping Dashboard</h2>
                <p className="text-platinum/80">
                  Interactive data visualization dashboard tracking shipping metrics and performance indicators.
                  (This data was found on public database. NOT A REAL COMPANY.)
                </p>
                <div className="w-full overflow-hidden rounded-lg shadow-lg">
                  <iframe 
                    width="100%" 
                    height="500" 
                    src="https://lookerstudio.google.com/embed/reporting/13f8cdff-0f90-40e2-b9fd-787a07fcee40/page/page_12345" 
                    frameBorder="0" 
                    style={{border: 0}} 
                    allowFullScreen 
                    sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                  ></iframe>
                </div>
                
                {/* Added dashboard images */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="overflow-hidden rounded-lg shadow-lg">
                    <img 
                      src={import.meta.env.BASE_URL + "dash/Poland.main.png"}
                      alt="Poland Shipping Dashboard Main View"
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="overflow-hidden rounded-lg shadow-lg">
                    <img 
                      src={import.meta.env.BASE_URL + "dash/Poland.consumer.png"}
                      alt="Poland Shipping Dashboard Consumer View"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
              
              {/* Extended Listening History */}
              <div className="space-y-4">
                <h2 className="text-2xl font-medium text-saffron">Extended Listening History</h2>
                <p className="text-platinum/80">
                  Visual representation of music listening patterns and trends over extended time periods.
                  (This data is 100% factual from my personal Spotify.)
                </p>
                <div className="w-full overflow-hidden rounded-lg shadow-lg">
                  <div className='tableauPlaceholder' id='viz1741274866423' style={{position: 'relative', width: '100%', height: '500px'}}>
                    <noscript>
                      <a href='#'>
                        <img 
                          alt='Spotify Dashboard' 
                          src='https://public.tableau.com/static/images/Sp/SpotifyHistory2018-2023/SpotifyDash/1_rss.png' 
                          style={{border: 'none', width: '100%', height: '500px'}} 
                        />
                      </a>
                    </noscript>
                    <object className='tableauViz' style={{display: 'none', width: '100%', height: '500px'}}>
                      <param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' />
                      <param name='embed_code_version' value='3' />
                      <param name='site_root' value='' />
                      <param name='name' value='SpotifyHistory2018-2023&#47;SpotifyDash' />
                      <param name='tabs' value='yes' />
                      <param name='toolbar' value='yes' />
                      <param name='static_image' value='https://public.tableau.com/static/images/Sp/SpotifyHistory2018-2023/SpotifyDash/1.png' />
                      <param name='animate_transition' value='yes' />
                      <param name='display_static_image' value='yes' />
                      <param name='display_spinner' value='yes' />
                      <param name='display_overlay' value='yes' />
                      <param name='display_count' value='yes' />
                      <param name='language' value='en-US' />
                    </object>
                  </div>
                </div>
                
                {/* Added dashboard images */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="overflow-hidden rounded-lg shadow-lg">
                    <img 
                      src="/dash/Spotify.main.png" 
                      alt="Spotify Dashboard Main View"
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="overflow-hidden rounded-lg shadow-lg">
                    <img 
                      src="/dash/Spotify.bydayofweek.png" 
                      alt="Spotify Dashboard By Day of Week"
                      className="w-full h-auto"
                    />
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

export default WorkAnalysis;
