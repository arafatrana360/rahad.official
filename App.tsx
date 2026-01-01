
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PolicyCard from './components/PolicyCard';
import Timeline from './components/Timeline';
import YouTubeGallery from './components/YouTubeGallery';
import NewsSection from './components/NewsSection';
import BlogPage from './components/BlogPage';
import CampaignAssistant from './components/CampaignAssistant';
import AdminDashboard from './components/AdminDashboard';
import { VolunteerModal, ProblemModal } from './components/Modals';
import { POLICIES, NEWS, UI_STRINGS, BIOGRAPHY_CONTENT, VISION_CONTENT, SOCIAL_LINKS } from './constants';
import { Language, PageRoute } from './types';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('bn');
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);
  const [showProblemModal, setShowProblemModal] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const s = UI_STRINGS;

  const PageHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div className="bg-green-900 pt-32 pb-16 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 font-heading">{title}</h1>
        <p className="text-xl text-green-100 max-w-2xl">{subtitle}</p>
        <button 
          onClick={() => setCurrentPage('home')}
          className="mt-8 flex items-center space-x-2 text-sm font-bold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all"
        >
          <span>←</span>
          <span>{language === 'bn' ? 'হোমে ফিরে যান' : 'Back to Home'}</span>
        </button>
      </div>
    </div>
  );

  const FooterSocialIcon = ({ href, svg, label, bgColor }: { href: string, svg: React.ReactNode, label: string, bgColor: string }) => (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      aria-label={label}
      className={`w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-xl text-white ${bgColor} transition-all transform hover:scale-110 shadow-md hover:shadow-xl active:scale-95 group`}
    >
      <svg className="h-5 w-5 md:h-6 md:h-6 fill-current transition-transform" viewBox="0 0 24 24">
        {svg}
      </svg>
    </a>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar 
        currentLanguage={language} 
        onLanguageChange={setLanguage} 
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      
      {currentPage === 'home' && (
        <>
          <Hero currentLanguage={language} />
          {/* About Summary */}
          <section id="about" className="py-20 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
                <div className="relative group max-w-sm mx-auto md:ml-0 md:mr-auto">
                  <div className="absolute -top-6 -left-6 w-24 h-24 bg-green-100 rounded-full blur-3xl opacity-50 z-0"></div>
                  <div className="relative z-10 overflow-hidden rounded-[2rem] shadow-xl border-4 border-white group-hover:shadow-green-900/10 transition-shadow duration-500">
                    <img 
                      src="https://parbattakantho.com/wp-content/uploads/2025/10/IMG-20251009-WA0011.jpg" 
                      alt="শেখ মনজুরুল হক (রাহাদ)" 
                      className="w-full h-auto object-cover max-h-[400px] transform transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="mt-8 md:mt-0">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight font-heading">
                    {s.about_title[language]} <br/>
                    <span className="text-green-600 font-heading">{s.about_name[language]}</span>
                  </h2>
                  <p className="text-base md:text-lg text-slate-600 mb-8 leading-relaxed">
                    {s.about_p1[language]}
                  </p>
                  <button 
                    onClick={() => setCurrentPage('biography')}
                    className="bg-green-900 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-green-800 transition-colors"
                  >
                    {language === 'bn' ? 'বিস্তারিত জীবনী' : 'Detailed Biography'}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Vision Preview */}
          <section className="py-20 md:py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-12 font-heading">
                {language === 'bn' ? 'আমাদের ভিশন' : 'Our Vision'}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {POLICIES.map(policy => (
                  <PolicyCard key={policy.id} policy={policy} lang={language} />
                ))}
              </div>
              <button 
                onClick={() => setCurrentPage('vision')}
                className="mt-12 inline-block border-2 border-green-900 text-green-900 px-10 py-3 rounded-xl font-bold hover:bg-green-900 hover:text-white transition-all"
              >
                {language === 'bn' ? 'পূর্ণাঙ্গ নির্বাচনী রূপরেখা দেখুন' : 'View Full Election Roadmap'}
              </button>
            </div>
          </section>

          {/* Decorative Divider */}
          <div className="bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-center space-x-4">
                <div className="h-px bg-gradient-to-r from-transparent to-slate-300 flex-1"></div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-green-600 rounded-full opacity-40"></div>
                  <div className="w-2 h-2 bg-red-600 rounded-full opacity-40"></div>
                  <div className="w-2 h-2 bg-green-600 rounded-full opacity-40"></div>
                </div>
                <div className="h-px bg-gradient-to-l from-transparent to-slate-300 flex-1"></div>
              </div>
            </div>
          </div>
          
          <YouTubeGallery lang={language} />
          
          <NewsSection lang={language} onViewAll={() => setCurrentPage('blog')} />
        </>
      )}

      {currentPage === 'biography' && (
        <div className="min-h-screen bg-white">
          <PageHeader 
            title={BIOGRAPHY_CONTENT.title[language]} 
            subtitle={language === 'bn' ? 'একটি নিবেদিত প্রাণের গল্প' : 'The Story of a Dedicated Soul'} 
          />
          <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {BIOGRAPHY_CONTENT.sections.map((section, idx) => (
              <div key={idx} className="mb-16">
                <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-6 border-l-4 border-red-600 pl-4 font-heading">
                  {section.heading[language]}
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed text-justify">
                  {section.content[language]}
                </p>
              </div>
            ))}
          </section>
        </div>
      )}

      {currentPage === 'vision' && (
        <div className="min-h-screen bg-slate-50">
          <PageHeader 
            title={VISION_CONTENT.title[language]} 
            subtitle={language === 'bn' ? 'বাগেরহাটের টেকসই উন্নয়ন ও সমৃদ্ধির অঙ্গীকার' : 'Commitment to Sustainable Development of Bagerhat'} 
          />
          <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-10">
              {VISION_CONTENT.pillars.map((pillar, idx) => (
                <div key={idx} className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:-translate-y-2 transition-transform">
                  <div className="text-5xl mb-6">{pillar.icon}</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 font-heading">{pillar.title[language]}</h3>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {pillar.desc[language]}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {currentPage === 'timeline' && (
        <div className="min-h-screen">
          <PageHeader 
            title={language === 'bn' ? 'ক্যাম্পেইন মাইলফলক' : 'Campaign Milestones'} 
            subtitle={language === 'bn' ? 'একটি সমৃদ্ধ ও দুর্নীতিমুক্ত সমাজের লক্ষ্যে আমাদের সুদীর্ঘ পথচলার ইতিহাস।' : 'A history of our long journey towards a prosperous and corruption-free society.'} 
          />
          <Timeline lang={language} />
        </div>
      )}

      {currentPage === 'blog' && (
        <div className="min-h-screen bg-white">
          <PageHeader 
            title={language === 'bn' ? 'সংবাদ ও মিডিয়া' : 'News & Media'} 
            subtitle={language === 'bn' ? 'সর্বশেষ সংবাদ, প্রেস রিলিজ এবং আপডেটসমূহ জানুন।' : 'Stay informed with the latest news, press releases, and updates.'} 
          />
          <BlogPage lang={language} />
        </div>
      )}

      {/* Call to Action - Common */}
      <section className="py-20 md:py-24 bg-green-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-heading">{language === 'bn' ? 'আপনি কি এই পরিবর্তনের অংশ হবেন?' : 'Will you be a part of this change?'}</h2>
          <p className="text-green-100 mb-10 max-w-2xl mx-auto text-lg opacity-90">
            {s.cta_desc[language]}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button 
              onClick={() => setShowVolunteerModal(true)}
              className="bg-white text-green-900 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:-translate-y-1 transition-all"
            >
              {s.btn_volunteer[language]}
            </button>
            <button 
              onClick={() => setShowProblemModal(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:-translate-y-1 transition-all border border-red-400"
            >
              {s.btn_report_problem[language]}
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-white py-16 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="text-center md:text-left mb-8 md:mb-0">
              <div className="text-2xl font-bold tracking-tight text-green-900 uppercase mb-1 font-heading">
                {language === 'bn' ? 'শেখ মনজুরুল হক (রাহাদ)' : 'Sheikh Monzurul Haque'}
              </div>
              <div className="text-slate-500 font-medium">
                {language === 'bn' ? 'চলো একসাথে গড়ি বাংলাদেশ' : 'Let\'s Build Bangladesh Together'}
              </div>
            </div>
            
            <div className="flex items-center space-x-3 md:space-x-5">
              <FooterSocialIcon 
                href={SOCIAL_LINKS.facebook} 
                label="Facebook"
                bgColor="bg-[#1877F2]"
                svg={<path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />}
              />
              <FooterSocialIcon 
                href={SOCIAL_LINKS.youtube} 
                label="YouTube"
                bgColor="bg-[#FF0000]"
                svg={<path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />}
              />
              <button 
                onClick={() => setShowAdminDashboard(true)}
                className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all shadow-md active:scale-95"
                title="Admin Dashboard"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </button>
            </div>
          </div>
          
          <div className="border-t border-slate-100 pt-10 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
            <div className="mb-6 md:mb-0 font-medium">
              &copy; 2026 Campaign Team. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <button onClick={() => setCurrentPage('home')} className="hover:text-green-600 transition-colors font-semibold">Home</button>
              <button onClick={() => setCurrentPage('biography')} className="hover:text-green-600 transition-colors font-semibold">Biography</button>
              <button onClick={() => setCurrentPage('vision')} className="hover:text-green-600 transition-colors font-semibold">Vision</button>
              <button onClick={() => setCurrentPage('timeline')} className="hover:text-green-600 transition-colors font-semibold">Timeline</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals & Dashboard Overlay */}
      <VolunteerModal isOpen={showVolunteerModal} onClose={() => setShowVolunteerModal(false)} lang={language} />
      <ProblemModal isOpen={showProblemModal} onClose={() => setShowProblemModal(false)} lang={language} />
      {showAdminDashboard && <AdminDashboard onClose={() => setShowAdminDashboard(false)} lang={language} />}
      
      <CampaignAssistant />
    </div>
  );
};

export default App;
