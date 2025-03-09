
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import NavHeader from './blocks/nav-header';

const NavBar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'works', label: 'Works' },
    { id: 'resume', label: 'Resume' },
    { id: 'contact', label: 'Contact' },
  ];

  // Handle scroll and update active section
  useEffect(() => {
    const handleScroll = () => {
      // Set navbar background when scrolled
      setIsScrolled(window.scrollY > 10);
      
      // Determine which section is currently in view
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 ${
        isScrolled ? 'bg-brunswick-green/80 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div 
          className="text-xl font-semibold cursor-pointer hardware-accelerated" 
          onClick={() => scrollToSection('home')}
        >
          <span className="text-saffron">Mike</span>
          <span className="text-platinum">Wayne</span>
        </div>

        {/* Desktop Navigation - Using NavHeader */}
        <div className="hidden md:block">
          <NavHeader />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-platinum focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-brunswick-green/95 backdrop-blur-md shadow-lg py-4 px-6 flex flex-col space-y-3 hardware-accelerated animate-fade-in">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`nav-link text-left ${
                activeSection === section.id ? 'active' : ''
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
