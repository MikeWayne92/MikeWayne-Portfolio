import { useState } from 'react';
import GlassTile from './GlassTile';
import SocialLink from './SocialLink';
import { Send, Mail, Linkedin, Github } from 'lucide-react';
import TikTokIcon from './icons/TikTokIcon';

const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
    file: null as File | null,
    loading: false,
    success: false,
    error: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, loading: true }));
    
    // Simulating form submission
    setTimeout(() => {
      setFormState(prev => ({ 
        ...prev, 
        loading: false, 
        success: true, 
        name: '',
        email: '',
        message: '',
        file: null
      }));
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormState(prev => ({ ...prev, success: false }));
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="flex items-center justify-center">
      <GlassTile>
        <h2 className="section-heading">Contact Me</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-8">
            <p className="text-platinum/80 leading-relaxed">
              Have a project in mind or want to discuss potential opportunities? 
              I'd love to hear from you! Feel free to reach out through the form or 
              any of my social channels.
            </p>
            
            <div className="flex items-center">
              <Mail className="text-saffron mr-3" size={20} />
              <a 
                href="mailto:michael.wcollinsjr@gmail.com" 
                className="text-platinum hover:text-saffron transition-colors duration-300"
              >
                michael.wcollinsjr@gmail.com
              </a>
            </div>
            
            <div className="flex space-x-3">
              <SocialLink 
                href="https://www.linkedin.com/in/mikewaynpro" 
                label="LinkedIn" 
                icon={Linkedin} 
              />
              <SocialLink 
                href="https://www.github.com/mikewayne92" 
                label="GitHub" 
                icon={Github} 
              />
              <SocialLink 
                href="https://www.tiktok.com/@middlenameswayne" 
                label="TikTok" 
                icon={TikTokIcon} 
              />
            </div>
          </div>
          
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm text-platinum/80 mb-1">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={formState.name}
                onChange={e => setFormState(prev => ({ ...prev, name: e.target.value }))}
                required
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-platinum focus:ring-2 focus:ring-saffron focus:border-transparent outline-none transition-all duration-300"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm text-platinum/80 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formState.email}
                onChange={e => setFormState(prev => ({ ...prev, email: e.target.value }))}
                required
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-platinum focus:ring-2 focus:ring-saffron focus:border-transparent outline-none transition-all duration-300"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm text-platinum/80 mb-1">
                Message
              </label>
              <textarea
                id="message"
                value={formState.message}
                onChange={e => setFormState(prev => ({ ...prev, message: e.target.value }))}
                required
                rows={4}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-platinum focus:ring-2 focus:ring-saffron focus:border-transparent outline-none transition-all duration-300 resize-none"
              />
            </div>
            
            <div>
              <label htmlFor="file" className="block text-sm text-platinum/80 mb-1">
                Attach File (Optional)
              </label>
              <input
                id="file"
                type="file"
                onChange={e => setFormState(prev => ({ ...prev, file: e.target.files?.[0] || null }))}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-platinum file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-saffron file:text-eerieblack hover:file:bg-saffron/90 cursor-pointer"
              />
            </div>
            
            <button
              type="submit"
              disabled={formState.loading}
              className="btn btn-primary w-full group"
            >
              {formState.loading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-rotate-slow inline-block w-5 h-5 border-2 border-eerieblack/20 border-t-eerieblack rounded-full mr-2"></span>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  Send Message
                  <Send size={18} className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              )}
            </button>
            
            {formState.success && (
              <div className="p-3 rounded-lg bg-saffron/10 border border-saffron/30 text-saffron text-sm animate-fade-in">
                Your message has been sent successfully! I'll get back to you soon.
              </div>
            )}
          </form>
        </div>
      </GlassTile>
    </section>
  );
};

export default ContactSection;
