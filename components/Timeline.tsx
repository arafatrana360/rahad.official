
import React from 'react';
import { TIMELINE_EVENTS } from '../constants';
import { Language } from '../types';

interface TimelineProps {
  lang: Language;
}

const Timeline: React.FC<TimelineProps> = ({ lang }) => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-slate-200 hidden md:block"></div>

          <div className="space-y-12 md:space-y-0">
            {TIMELINE_EVENTS.map((event, index) => (
              <div key={event.id} className={`relative flex items-center justify-between md:mb-16 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="hidden md:block w-5/12"></div>
                
                {/* Dot */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-green-600 border-4 border-white shadow-lg z-10"></div>
                </div>

                {/* Content Card */}
                <div className={`ml-8 md:ml-0 md:w-5/12 p-8 bg-slate-50 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all ${index % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                  <span className="inline-block px-4 py-1 bg-red-600 text-white text-xs font-bold rounded-full mb-3">
                    {event.year}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{event.title[lang]}</h3>
                  <p className="text-slate-600 text-base leading-relaxed">{event.description[lang]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
