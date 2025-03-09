
import { useEffect } from 'react';
import NavBar from "@/components/NavBar";
import Background from "@/components/Background";
import HeroSection from "@/components/HeroSection";
import WorksSection from "@/components/WorksSection";
import ResumeSection from "@/components/ResumeSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  useEffect(() => {
    // Add smooth scrolling behavior for section transitions
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.substring(1);
        const element = document.getElementById(id || '');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, []);

  useEffect(() => {
    // Apply title and metadata
    document.title = "Mike Wayne | Designer & Developer";
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Mike Wayne - Designer & Developer specializing in data visualization, graphic design, and frontend development.');
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Background />
      <NavBar />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <HeroSection />
        <WorksSection />
        <ResumeSection />
        <ContactSection />
      </main>
      
      <footer className="text-center py-8 text-platinum/60 text-sm">
        <div className="container mx-auto">
          <p>&copy; {new Date().getFullYear()} Mike Wayne. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
