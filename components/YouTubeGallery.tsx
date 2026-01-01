
import React from 'react';
import { YOUTUBE_VIDEOS } from '../constants';
import { Language } from '../types';

interface YouTubeGalleryProps {
  lang: Language;
}

const YouTubeGallery: React.FC<YouTubeGalleryProps> = ({ lang }) => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 font-heading">
            {lang === 'bn' ? 'ভিডিও গ্যালারি' : 'Video Gallery'}
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            {lang === 'bn' 
              ? 'শেখ মনজুরুল হক (রাহাদ)-এর বক্তব্য ও কার্যক্রম সরাসরি দেখুন' 
              : 'Watch the speeches and activities of Sheikh Monzurul Haque (Rahad) live'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {YOUTUBE_VIDEOS.map((video) => (
            <div key={video.id} className="group cursor-pointer">
              <a 
                href={`https://www.youtube.com/watch?v=${video.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg mb-5 bg-slate-200 border-4 border-white transition-all group-hover:shadow-2xl group-hover:-translate-y-1">
                  {/* Thumbnail Image */}
                  <img 
                    src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`} 
                    alt={video.title[lang]}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback to hqdefault if maxres isn't available
                      (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
                    }}
                  />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Duration/Status Badge (Optional Aesthetic) */}
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm">
                    {lang === 'bn' ? 'ভিডিও দেখুন' : 'WATCH VIDEO'}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-red-600 transition-colors leading-snug font-heading">
                  {video.title[lang]}
                </h3>
              </a>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a 
            href="https://www.youtube.com/@shaikhmonzurulhaquerahad" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 bg-red-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-red-700 transition-all shadow-xl hover:-translate-y-1 active:scale-95"
          >
            <span>{lang === 'bn' ? 'ইউটিউব চ্যানেল সাবস্ক্রাইব করুন' : 'Subscribe to YouTube Channel'}</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default YouTubeGallery;
