
import React, { useRef } from 'react';
import { NEWS } from '../constants';
import { Language } from '../types';

interface NewsSectionProps {
  lang: Language;
  onViewAll: () => void;
}

const NewsSection: React.FC<NewsSectionProps> = ({ lang, onViewAll }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Header Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 font-heading">
            {lang === 'bn' ? 'সাম্প্রতিক সংবাদ ও আপডেট' : 'Latest News & Updates'}
          </h2>
          <div className="w-20 h-1 bg-green-600 mx-auto mb-6"></div>
          <p className="text-slate-600 text-lg leading-relaxed">
            {lang === 'bn' 
              ? 'শেখ মনজুরুল হক (রাহাদ)-এর সাম্প্রতিক কার্যক্রম, প্রেস রিলিজ এবং গুরুত্বপূর্ণ সংবাদসমূহ এখানে দেখুন।' 
              : 'Stay updated with the latest activities, press releases, and important news of Sheikh Monzurul Haque (Rahad).'}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Navigation Buttons */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 bg-white border border-slate-100 shadow-xl rounded-full flex items-center justify-center text-slate-400 hover:text-green-700 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 bg-white border border-slate-100 shadow-xl rounded-full flex items-center justify-center text-slate-400 hover:text-green-700 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Scrollable Area */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto space-x-6 pb-12 snap-x snap-mandatory scrollbar-hide no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {NEWS.map((item) => (
              <article 
                key={item.id} 
                className="flex-none w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-center group/card bg-slate-50 rounded-[2.5rem] overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-green-900/5 transition-all duration-500 flex flex-col h-full"
              >
                <div className="relative h-64 overflow-hidden bg-slate-200">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title[lang]} 
                    className="w-full h-full object-cover transform group-hover/card:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop';
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm text-white ${
                      item.category === 'Press Release' ? 'bg-red-600' : 
                      item.category === 'Event' ? 'bg-green-700' : 'bg-blue-600'
                    }`}>
                      {lang === 'bn' ? (
                        item.category === 'Press Release' ? 'প্রেস রিলিজ' :
                        item.category === 'Event' ? 'ইভেন্ট' : 'আপডেট'
                      ) : item.category}
                    </span>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center text-slate-400 text-[10px] mb-4 font-bold uppercase tracking-widest">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {item.date[lang]}
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover/card:text-green-700 transition-colors leading-tight font-heading h-14 line-clamp-2">
                    {item.title[lang]}
                  </h3>
                  
                  <p className="text-slate-600 mb-8 line-clamp-3 leading-relaxed text-sm">
                    {item.excerpt[lang]}
                  </p>
                  
                  <div className="mt-auto">
                    <button 
                      onClick={onViewAll}
                      className="flex items-center text-green-700 font-bold text-sm group/btn"
                    >
                      <span>{lang === 'bn' ? 'বিস্তারিত পড়ুন' : 'Read More'}</span>
                      <svg className="w-5 h-5 ml-2 transform group-hover/btn:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* View All Footer */}
        <div className="text-center mt-4">
          <button 
            onClick={onViewAll}
            className="inline-flex items-center space-x-2 text-slate-400 hover:text-green-700 px-6 py-2 rounded-xl font-bold text-sm transition-all"
          >
            <span>{lang === 'bn' ? 'সকল আপডেট দেখুন' : 'View All Updates'}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
