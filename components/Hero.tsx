
import React, { useState } from 'react';
import { Language } from '../types';
import { UI_STRINGS } from '../constants';
import { VolunteerModal } from './Modals';

interface HeroProps {
  currentLanguage: Language;
}

const Hero: React.FC<HeroProps> = ({ currentLanguage }) => {
  const s = UI_STRINGS;
  const [showModal, setShowModal] = useState(false);
  
  return (
    <section className="relative min-h-[85vh] md:min-h-[70vh] lg:h-[85vh] flex items-center hero-banner text-white pt-16 md:pt-20 pb-8 overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="4" height="4" patternUnits="userSpaceOnUse">
            <path d="M 4 0 L 0 0 0 4" fill="none" stroke="white" strokeWidth="0.1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 lg:gap-12 items-center h-full">
          <div className="text-left animate-fade-in-up z-20 order-1">
            <div className="inline-block px-3 py-1 mb-3 md:mb-6 rounded-full bg-slate-100/10 border border-white/20 text-slate-100 text-[10px] md:text-xs font-bold tracking-widest uppercase backdrop-blur-md">
              {s.hero_tag[currentLanguage]}
            </div>
            
            <div className="mb-4 md:mb-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2 md:mb-3 leading-tight tracking-tight font-heading">
                {s.hero_title_1[currentLanguage]}
              </h1>
              <div className="inline-block">
                <span className="text-white bg-red-600 px-4 md:px-5 py-1 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold transform -skew-x-6 inline-block shadow-xl font-heading">
                  {s.hero_title_2[currentLanguage]}
                </span>
              </div>
            </div>

            <p className="max-w-lg text-base md:text-lg lg:text-xl text-slate-100 mb-2 md:mb-8 leading-relaxed font-medium">
              {s.hero_desc[currentLanguage]}
            </p>

            <div className="hidden md:flex flex-row items-center space-x-4 mt-8">
              <button 
                onClick={() => window.scrollTo({ top: 1800, behavior: 'smooth' })}
                className="px-6 lg:px-8 py-3 bg-white text-green-900 font-bold rounded-xl shadow-lg hover:bg-slate-100 transition-all hover:-translate-y-1 active:scale-95 text-sm lg:text-base"
              >
                {s.btn_platform[currentLanguage]}
              </button>
              <button 
                onClick={() => setShowModal(true)}
                className="px-6 lg:px-8 py-3 border-2 border-white/40 text-white font-bold rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm active:scale-95 text-sm lg:text-base"
              >
                {s.btn_volunteer[currentLanguage]}
              </button>
            </div>
          </div>

          <div className="relative flex justify-center md:justify-end items-center h-[280px] sm:h-[350px] md:h-full order-2 md:order-2">
            <div className="absolute top-1/2 left-1/2 md:left-2/3 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] lg:w-[400px] lg:h-[400px] bg-red-700/80 rounded-full blur-sm opacity-90"></div>
            <div className="relative z-20 h-full w-full max-w-sm flex items-center justify-center md:justify-end">
              <div className="relative group">
                <img 
                  src="https://parbattakantho.com/wp-content/uploads/2025/10/IMG-20251009-WA0011.jpg" 
                  alt="Sheikh Monzurul Haque" 
                  className="max-h-[250px] sm:max-h-[320px] md:max-h-[400px] lg:max-h-[480px] w-auto object-cover rounded-2xl border-4 border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform hover:scale-[1.03] transition-transform duration-500 select-none"
                />
                <div className="absolute -bottom-2 -left-2 bg-white py-1.5 px-3 rounded-lg shadow-xl transform -rotate-3 hidden sm:block border-b-4 border-green-700">
                  <span className="text-green-900 font-black text-xs md:text-sm tracking-tighter">
                    {currentLanguage === 'bn' ? '#চলো_একসাথে_গড়ি' : '#BuildTogether'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:hidden items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full order-3 mt-4">
            <button 
              onClick={() => window.scrollTo({ top: 1800, behavior: 'smooth' })}
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-green-900 font-bold rounded-xl shadow-lg active:scale-95 text-sm"
            >
              {s.btn_platform[currentLanguage]}
            </button>
            <button 
              onClick={() => setShowModal(true)}
              className="w-full sm:w-auto px-8 py-3.5 border-2 border-white/40 text-white font-bold rounded-xl active:scale-95 text-sm"
            >
              {s.btn_volunteer[currentLanguage]}
            </button>
          </div>
        </div>
      </div>
      <VolunteerModal isOpen={showModal} onClose={() => setShowModal(false)} lang={currentLanguage} />
    </section>
  );
};

export default Hero;
