
import React from 'react';
import { NEWS } from '../constants';
import { Language } from '../types';

interface NewsSectionProps {
  lang: Language;
  onViewAll: () => void;
}

const NewsSection: React.FC<NewsSectionProps> = ({ lang, onViewAll }) => {
  return (
    <section className="py-24 bg-white">
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

        {/* News Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {NEWS.map((item) => (
            <article key={item.id} className="group bg-slate-50 rounded-[2.5rem] overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-green-900/5 transition-all duration-500">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title[lang]} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm text-white ${
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

              <div className="p-8">
                <div className="flex items-center text-slate-400 text-sm mb-4 font-bold">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {item.date[lang]}
                </div>
                
                <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-green-700 transition-colors leading-tight font-heading">
                  {item.title[lang]}
                </h3>
                
                <p className="text-slate-600 mb-8 line-clamp-3">
                  {item.excerpt[lang]}
                </p>
                
                <button 
                  onClick={onViewAll}
                  className="flex items-center text-green-700 font-bold group/btn"
                >
                  <span>{lang === 'bn' ? 'বিস্তারিত পড়ুন' : 'Read More'}</span>
                  <svg className="w-5 h-5 ml-2 transform group-hover/btn:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Unified "View All" Button at the bottom */}
        <div className="text-center">
          <button 
            onClick={onViewAll}
            className="inline-flex items-center space-x-2 border-2 border-slate-200 text-slate-700 px-10 py-4 rounded-2xl font-bold hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all active:scale-95 shadow-lg shadow-slate-200/50"
          >
            <span>{lang === 'bn' ? 'সকল সংবাদ ও মিডিয়া আপডেট দেখুন' : 'View All News & Media Updates'}</span>
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
