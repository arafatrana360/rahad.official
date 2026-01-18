
import React, { useState, useEffect } from 'react';
import { Language, PageRoute } from '../types';
import { UI_STRINGS, SOCIAL_LINKS } from '../constants';

interface NavbarProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  currentPage: PageRoute;
  onPageChange: (page: PageRoute) => void;
  onJoinClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentLanguage, onLanguageChange, currentPage, onPageChange, onJoinClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const s = UI_STRINGS;

  const shouldShowSolidBg = isScrolled || mobileMenuOpen || currentPage !== 'home';
  const textColorClass = shouldShowSolidBg ? 'text-green-900' : 'text-white';
  const navBgClass = shouldShowSolidBg ? 'bg-white shadow-lg py-3' : 'bg-transparent py-6';

  const NavLink = ({ page, label }: { page: PageRoute, label: string }) => (
    <button 
      onClick={() => onPageChange(page)} 
      className={`text-sm font-semibold hover:text-green-500 transition-colors ${shouldShowSolidBg ? 'text-slate-600' : 'text-white'} ${currentPage === page && shouldShowSolidBg ? 'text-green-600 font-bold border-b-2 border-green-600' : currentPage === page ? 'border-b-2 border-white' : ''}`}
    >
      {label}
    </button>
  );

  const SocialIcon = ({ href, svg, label }: { href: string, svg: React.ReactNode, label: string }) => (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      aria-label={label}
      className={`hover:text-green-500 transition-all transform hover:scale-110 ${shouldShowSolidBg ? 'text-slate-500' : 'text-white/80'}`}
    >
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        {svg}
      </svg>
    </a>
  );

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${navBgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={() => onPageChange('home')}
              className={`text-xl md:text-2xl font-bold tracking-tight transition-colors ${textColorClass}`}
            >
              {currentLanguage === 'bn' ? 'শেখ মনজুরুল হক (রাহাদ)' : 'Shaikh Monzurul Haque Rahad'}
            </button>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <NavLink page="home" label={s.nav_about[currentLanguage]} />
            <NavLink page="biography" label={s.nav_biography[currentLanguage]} />
            <NavLink page="vision" label={s.nav_vision[currentLanguage]} />
            <NavLink page="manifesto" label={s.nav_manifesto[currentLanguage]} />
            <NavLink page="blog" label={s.nav_updates[currentLanguage]} />
            <NavLink page="timeline" label={s.nav_timeline[currentLanguage]} />
            
            <div className="h-4 w-px bg-slate-200/50 mx-2"></div>
            
            <div className="flex items-center space-x-3">
              <SocialIcon 
                href={SOCIAL_LINKS.facebook} 
                label="Facebook"
                svg={<path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />}
              />
              <SocialIcon 
                href={SOCIAL_LINKS.instagram} 
                label="Instagram"
                svg={<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />}
              />
              <SocialIcon 
                href={SOCIAL_LINKS.tiktok} 
                label="TikTok"
                svg={<path d="M12.525.02c1.31.036 2.512.335 3.6.895V7.03c-.76-.56-1.62-.88-2.54-.88-.5 0-.98.1-1.42.28-.44.18-.83.45-1.15.77-.32.32-.59.71-.77 1.15-.18.44-.28.92-.28 1.42 0 .5.1.98.28 1.42.18.44.45.83.77 1.15.32.32.71.59 1.15.77.44.18.92.28 1.42.28.5 0 .98-.1 1.42-.28.44-.18.83-.45 1.15-.77.32-.32.59-.71.77-1.15.18-.44.28-.92.28-1.42V0h4.06c.14 2.39 1.09 4.57 2.53 6.32v4.06c-1.44-1.75-2.39-3.93-2.53-6.32h-4.06v11.19c0 1.1-.22 2.15-.61 3.11-.39.96-.96 1.81-1.67 2.52-.71.71-1.56 1.28-2.52 1.67-.96.39-2.01.61-3.11.61-1.1 0-2.15-.22-3.11-.61-.96-.39-1.81-.96-2.52-1.67-.71-.71-1.28-1.56-1.67-2.52-.39-.96-.61-2.01-.61-3.11 0-1.1.22-2.15.61-3.11.39-.96.96-1.81 1.67-2.52.71-.71 1.56-1.28 2.52-1.67.96-.39 2.01-.61 3.11-.61.1 0 .21.01.31.02V4.08c-.1-.01-.21-.02-.31-.02-1.1 0-2.15.22-3.11.61-.96.39-1.81.96-2.52 1.67-.71.71-1.28-1.56-1.67 2.52-.39.96-.61-2.01-.61-3.11 0-1.1.22-2.15.61 3.11.39.96.96-1.81 1.67 2.52.71.71 1.56 1.28 2.52 1.67.96.39 2.01.61 3.11.61 1.1 0 2.15-.22-3.11-.61.96-.39 1.81-.96 2.52-1.67.71-.71 1.28-1.56 1.67-2.52-.39-.96-.61-2.01-.61-3.11V4.08h4.06c.14 2.39 1.09 4.57 2.53 6.32V6.34c-1.44-1.75-2.39-3.93-2.53-6.32h-4.06z" />}
              />
              <SocialIcon 
                href={SOCIAL_LINKS.youtube} 
                label="YouTube"
                svg={<path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />}
              />
            </div>

            <button 
              onClick={() => onLanguageChange(currentLanguage === 'bn' ? 'en' : 'bn')}
              className={`flex items-center space-x-1 px-3 py-1 rounded-full border text-xs font-bold transition-all ${shouldShowSolidBg ? 'border-slate-200 text-slate-600' : 'border-white/30 text-white'}`}
            >
              <span>🌐</span>
              <span>{currentLanguage === 'bn' ? 'English' : 'বাংলা'}</span>
            </button>

            <button 
              onClick={onJoinClick}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg transition-all hover:scale-105"
            >
              {s.nav_join[currentLanguage]}
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={() => onLanguageChange(currentLanguage === 'bn' ? 'en' : 'bn')}
              className={`text-xs font-bold ${shouldShowSolidBg ? 'text-slate-600' : 'text-white'}`}
            >
              {currentLanguage === 'bn' ? 'EN' : 'বাং'}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`${textColorClass}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 p-4 space-y-4 shadow-xl">
          <button onClick={() => { onPageChange('home'); setMobileMenuOpen(false); }} className={`block w-full text-left py-2 font-semibold ${currentPage === 'home' ? 'text-green-600' : 'text-slate-700'}`}>
            {s.nav_about[currentLanguage]}
          </button>
          <button onClick={() => { onPageChange('biography'); setMobileMenuOpen(false); }} className={`block w-full text-left py-2 font-semibold ${currentPage === 'biography' ? 'text-green-600' : 'text-slate-700'}`}>
            {s.nav_biography[currentLanguage]}
          </button>
          <button onClick={() => { onPageChange('vision'); setMobileMenuOpen(false); }} className={`block w-full text-left py-2 font-semibold ${currentPage === 'vision' ? 'text-green-600' : 'text-slate-700'}`}>
            {s.nav_vision[currentLanguage]}
          </button>
          <button onClick={() => { onPageChange('manifesto'); setMobileMenuOpen(false); }} className={`block w-full text-left py-2 font-semibold ${currentPage === 'manifesto' ? 'text-green-600' : 'text-slate-700'}`}>
            {s.nav_manifesto[currentLanguage]}
          </button>
          <button onClick={() => { onPageChange('blog'); setMobileMenuOpen(false); }} className={`block w-full text-left py-2 font-semibold ${currentPage === 'blog' ? 'text-green-600' : 'text-slate-700'}`}>
            {s.nav_updates[currentLanguage]}
          </button>
          <button onClick={() => { onPageChange('timeline'); setMobileMenuOpen(false); }} className={`block w-full text-left py-2 font-semibold ${currentPage === 'timeline' ? 'text-green-600' : 'text-slate-700'}`}>
            {s.nav_timeline[currentLanguage]}
          </button>
          <div className="flex space-x-5 py-2 px-2 border-t border-slate-50 pt-4">
             <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="text-slate-500"><svg className="h-6 w-6 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg></a>
             <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-500"><svg className="h-6 w-6 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg></a>
             <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="text-slate-500"><svg className="h-6 w-6 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31.036 2.512.335 3.6.895V7.03c-.76-.56-1.62-.88-2.54-.88-.5 0-.98.1-1.42.28-.44.18-.83.45-1.15.77-.32.32-.59.71-.77 1.15-.18.44-.28.92-.28 1.42 0 .5.1.98.28 1.42.18.44.45.83.77 1.15.32.32.71.59 1.15.77.44.18.92.28 1.42.28.5 0 .98-.1 1.42-.28.44-.18.83-.45 1.15-.77.32-.32.59-.71.77-1.15.18-.44.28-.92.28-1.42V0h4.06c.14 2.39 1.09 4.57 2.53 6.32v4.06c-1.44-1.75-2.39-3.93-2.53-6.32h-4.06v11.19c0 1.1-.22 2.15-.61 3.11-.39.96-.96 1.81-1.67 2.52-.71.71-1.56 1.28-2.52 1.67-.96.39-2.01.61-3.11.61-1.1 0-2.15-.22-3.11-.61-.96-.39-1.81-.96-2.52-1.67-.71-.71-1.28-1.56-1.67-2.52-.39-.96-.61-2.01-.61-3.11 0-1.1.22-2.15.61-3.11.39-.96.96-1.81 1.67-2.52.71-.71 1.56-1.28 2.52-1.67.96-.39 2.01-.61 3.11-.61.1 0 .21.01.31.02V4.08c-.1-.01-.21-.02-.31-.02-1.1 0-2.15.22-3.11.61-.96.39-1.81.96-2.52 1.67-.71.71-1.28-1.56-1.67 2.52-.39.96-.61-2.01-.61-3.11 0-1.1.22-2.15.61 3.11.39.96.96 1.81 1.67 2.52.71.71 1.56 1.28 2.52 1.67.96.39 2.01.61 3.11.61 1.1 0 2.15-.22-3.11-.61.96-.39 1.81-.96-2.52-1.67-.71-.71-1.28-1.56-1.67-2.52-.39-.96-.61-2.01-.61-3.11V4.08h4.06c.14 2.39 1.09 4.57 2.53 6.32V6.34c-1.44-1.75-2.39-3.93-2.53-6.32h-4.06z" /></svg></a>
             <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="text-slate-500"><svg className="h-6 w-6 fill-current" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg></a>
          </div>
          <button 
            onClick={() => { onJoinClick?.(); setMobileMenuOpen(false); }}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-bold"
          >
            {s.nav_join[currentLanguage]}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
