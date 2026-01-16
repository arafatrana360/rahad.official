
import React from 'react';
import { Language } from '../types';

interface DigitalKitProps {
  lang: Language;
}

const DigitalKit: React.FC<DigitalKitProps> = ({ lang }) => {
  // Updated centralized Google Drive link
  const DRIVE_LINK = "https://drive.google.com/drive/folders/1k2NeLn_4OZNPlrzQVzyT6l4LgrlNkr_2?usp=sharing";

  const items = [
    {
      id: 1,
      title: { bn: 'ফেসবুক প্রোফাইল ফ্রেম', en: 'Facebook Profile Frame' },
      icon: '🖼️',
      color: 'bg-blue-600',
      description: { bn: 'আপনার প্রোফাইল ছবিতে রাহা‌দ ভাইয়ের ফ্রেম যুক্ত করুন।', en: 'Add Rahad Bhai\'s frame to your profile picture.' }
    },
    {
      id: 2,
      title: { bn: 'হোয়াটসঅ্যাপ স্টিকার প্যাক', en: 'WhatsApp Sticker Pack' },
      icon: '📱',
      color: 'bg-green-600',
      description: { bn: 'ক্যাম্পেইন মেসেজ শেয়ার করতে স্টিকার প্যাকটি ব্যবহার করুন।', en: 'Use the sticker pack to share campaign messages.' }
    },
    {
      id: 3,
      title: { bn: 'ক্যাম্পেইন পোস্টার (PDF)', en: 'Campaign Poster (PDF)' },
      icon: '📄',
      color: 'bg-red-600',
      description: { bn: 'উচ্চমানের প্রিন্টেবল পোস্টার ও লিফলেট ডাউনলোড করুন।', en: 'Download high-quality printable posters and leaflets.' }
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-slate-50 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 font-heading">
            {lang === 'bn' ? 'ডিজিটাল সাপোর্ট কিট' : 'Digital Support Kit'}
          </h2>
          <div className="w-20 h-1 bg-slate-900 mx-auto mb-6"></div>
          <p className="text-slate-600 text-lg leading-relaxed">
            {lang === 'bn' 
              ? 'সামাজিক যোগাযোগ মাধ্যমে আমাদের ভিশন ছড়িয়ে দিতে নিচের টুলগুলো ব্যবহার করুন। প্রতিটি লিংকে ক্লিক করে আপনি প্রয়োজনীয় ফাইলগুলো ডাউনলোড করতে পারবেন।' 
              : 'Use these tools to spread our vision across social media platforms. Click on the links to download the necessary files.'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {items.map((item) => (
            <div key={item.id} className="group p-10 rounded-[3rem] border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 text-center flex flex-col h-full">
              <div className={`w-20 h-20 ${item.color} text-white rounded-[1.5rem] flex items-center justify-center text-4xl mx-auto mb-8 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                {item.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-4 font-heading">{item.title[lang]}</h3>
              
              <p className="text-slate-500 mb-10 text-sm leading-relaxed flex-grow">
                {item.description[lang]}
              </p>
              
              <a 
                href={DRIVE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-3 w-full py-4 px-8 bg-slate-900 text-white rounded-2xl font-bold hover:bg-green-700 shadow-lg shadow-slate-900/10 hover:shadow-green-900/20 transition-all active:scale-95"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>{lang === 'bn' ? 'ডাউনলোড করুন' : 'Download Now'}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DigitalKit;
