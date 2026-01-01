
import React, { useState } from 'react';
import { NEWS } from '../constants';
import { Language } from '../types';

interface BlogPageProps {
  lang: Language;
}

const BlogPage: React.FC<BlogPageProps> = ({ lang }) => {
  const [filter, setFilter] = useState<'All' | 'Press Release' | 'Event' | 'Update'>('All');

  const filteredNews = filter === 'All' ? NEWS : NEWS.filter(item => item.category === filter);

  const categories = [
    { id: 'All', bn: 'সবগুলো', en: 'All Posts' },
    { id: 'Press Release', bn: 'প্রেস রিলিজ', en: 'Press Releases' },
    { id: 'Event', bn: 'ইভেন্ট', en: 'Events' },
    { id: 'Update', bn: 'আপডেট', en: 'Updates' },
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as any)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${
                filter === cat.id 
                  ? 'bg-green-700 border-green-700 text-white shadow-lg' 
                  : 'bg-white border-slate-200 text-slate-600 hover:border-green-700 hover:text-green-700'
              }`}
            >
              {lang === 'bn' ? cat.bn : cat.en}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredNews.map((item) => (
            <article key={item.id} className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title[lang]} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg text-white ${
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
                <div className="flex items-center text-slate-400 text-xs font-bold mb-4 uppercase tracking-tighter">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {item.date[lang]}
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-green-700 transition-colors leading-tight font-heading">
                  {item.title[lang]}
                </h3>
                
                <p className="text-slate-600 text-sm mb-8 line-clamp-4 leading-relaxed">
                  {item.excerpt[lang]}
                </p>
                
                <div className="mt-auto">
                  <button className="flex items-center text-green-700 text-sm font-black group/btn tracking-wide">
                    <span>{lang === 'bn' ? 'বিস্তারিত খবর' : 'READ FULL STORY'}</span>
                    <svg className="w-5 h-5 ml-2 transform group-hover/btn:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">📝</div>
            <h3 className="text-2xl font-bold text-slate-800">
              {lang === 'bn' ? 'কোন পোস্ট পাওয়া যায়নি' : 'No posts found'}
            </h3>
            <p className="text-slate-500 mt-2">
              {lang === 'bn' ? 'অনুগ্রহ করে অন্য ক্যাটাগরি চেষ্টা করুন।' : 'Please try selecting another category.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
