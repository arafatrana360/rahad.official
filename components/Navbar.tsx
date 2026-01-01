
import React, { useState, useEffect } from 'react';
import { Language, PageRoute } from '../types';
import { UI_STRINGS, SOCIAL_LINKS } from '../constants';

interface NavbarProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  currentPage: PageRoute;
  onPageChange: (page: PageRoute) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentLanguage, onLanguageChange, currentPage, onPageChange }) => {
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
              {currentLanguage === 'bn' ? 'শেখ মনজুরুল হক (রাহাদ)' : 'Sheikh Monzurul Haque'}
            </button>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <NavLink page="home" label={s.nav_about[currentLanguage]} />
            <NavLink page="biography" label={s.nav_biography[currentLanguage]} />
            <NavLink page="vision" label={s.nav_vision[currentLanguage]} />
            <NavLink page="blog" label={s.nav_updates[currentLanguage]} />
            <NavLink page="timeline" label={s.nav_timeline[currentLanguage]} />
            
            <div className="h-4 w-px bg-slate-200/50 mx-2"></div>
            
            <div className="flex items-center space-x-4">
              <SocialIcon 
                href={SOCIAL_LINKS.facebook} 
                label="Facebook"
                svg={<path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />}
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

            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg transition-all hover:scale-105">
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
          <button onClick={() => { onPageChange('blog'); setMobileMenuOpen(false); }} className={`block w-full text-left py-2 font-semibold ${currentPage === 'blog' ? 'text-green-600' : 'text-slate-700'}`}>
            {s.nav_updates[currentLanguage]}
          </button>
          <button onClick={() => { onPageChange('timeline'); setMobileMenuOpen(false); }} className={`block w-full text-left py-2 font-semibold ${currentPage === 'timeline' ? 'text-green-600' : 'text-slate-700'}`}>
            {s.nav_timeline[currentLanguage]}
          </button>
          <div className="flex space-x-6 py-2 px-2 border-t border-slate-50 pt-4">
             <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="text-slate-500"><svg className="h-6 w-6 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg></a>
             <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="text-slate-500"><svg className="h-6 w-6 fill-current" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg></a>
          </div>
          <button className="w-full bg-green-600 text-white py-3 rounded-xl font-bold">
            {s.nav_join[currentLanguage]}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
