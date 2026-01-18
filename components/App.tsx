
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PolicyCard from './components/PolicyCard';
import Timeline from './components/Timeline';
import YouTubeGallery from './components/YouTubeGallery';
import NewsSection from './components/NewsSection';
import BlogPage from './components/BlogPage';
import CampaignAssistant from './components/CampaignAssistant';
import ScrollToTop from './components/ScrollToTop';
import AdminDashboard from './components/AdminDashboard';
import DigitalKit from './components/DigitalKit';
import PriorityPoll from './components/PriorityPoll';
import { VolunteerModal, ProblemModal, MeetingModal } from './components/Modals';
import { POLICIES, NEWS, UI_STRINGS, BIOGRAPHY_CONTENT, VISION_CONTENT, SOCIAL_LINKS } from './constants';
import { Language, PageRoute } from './types';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('bn');
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);
  const [showProblemModal, setShowProblemModal] = useState(false);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
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
        onJoinClick={() => setShowVolunteerModal(true)}
      />
      
      {currentPage === 'home' && (
        <>
          <Hero currentLanguage={language} />
          
          <section id="about" className="py-20 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
                <div className="relative group w-full max-w-sm mx-auto md:ml-0 md:mr-auto">
                  <div className="absolute -top-6 -left-6 w-24 h-24 bg-green-100 rounded-full blur-3xl opacity-50 z-0"></div>
                  <div className="relative z-10 overflow-hidden rounded-[1.5rem] md:rounded-[2rem] shadow-2xl border-4 border-white group-hover:shadow-green-900/10 transition-shadow duration-500 bg-slate-200">
                    <img 
                      src="https://i.ibb.co.com/JjZTFHvg/rahadvai-about.jpg" 
                      alt="শাইখ মনজুরুল হক (রাহাদ)" 
                      className="w-full h-auto object-contain transform transition-transform duration-700 group-hover:scale-[1.01]"
                      loading="lazy"
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

          <section className="py-20 md:py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-12 font-heading">
                {language === 'bn' ? 'আমাদের ভিশন' : 'Our Vision'}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {POLICIES.map(policy => (
                  <PolicyCard 
                    key={policy.id} 
                    policy={policy} 
                    lang={language} 
                    onReadMore={() => setCurrentPage('vision')}
                  />
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
          
          <DigitalKit lang={language} />

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
                <div className="text-lg text-slate-700 leading-relaxed text-justify whitespace-pre-line space-y-4">
                  {section.content[language]}
                </div>
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

      {currentPage === 'manifesto' && (
        <div className="min-h-screen bg-slate-50">
          <PageHeader 
            title={s.manifesto_title[language]} 
            subtitle={language === 'bn' ? 'বাগেরহাট-২ আসনের আগামীর রূপরেখা' : 'The roadmap for Bagerhat-2 constituency'} 
          />
          <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white p-12 md:p-20 rounded-[3rem] shadow-xl border-t-8 border-green-700 relative overflow-hidden">
               <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-48 h-48 bg-amber-50 rounded-full blur-3xl opacity-50"></div>
               
               <div className="w-24 h-24 bg-amber-100 text-amber-600 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-inner">
                 <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
               </div>
               
               <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 font-heading">
                 {s.manifesto_pending_title[language]}
               </h2>
               
               <div className="p-8 bg-amber-50 rounded-3xl border border-amber-200 text-amber-900 font-medium text-lg leading-relaxed shadow-sm">
                 {s.manifesto_pending_msg[language]}
               </div>
               
               <div className="mt-12 flex flex-col items-center">
                 <div className="flex space-x-1.5 mb-4">
                   <div className="w-2 h-2 bg-slate-200 rounded-full"></div>
                   <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                   <div className="w-2 h-2 bg-slate-200 rounded-full"></div>
                 </div>
                 <button 
                  onClick={() => setCurrentPage('blog')}
                  className="text-slate-500 font-bold hover:text-green-700 transition-colors flex items-center space-x-2"
                 >
                   <span>{language === 'bn' ? 'সর্বশেষ আপডেট জানুন' : 'Check latest updates'}</span>
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                 </button>
               </div>
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

      <section className="py-20 md:py-24 bg-slate-50 border-y border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            <div className="bg-amber-50 p-10 md:p-14 rounded-[3rem] border border-amber-200 shadow-sm flex flex-col justify-center text-center lg:text-left">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl mb-8 shadow-inner mx-auto lg:mx-0">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 font-heading leading-tight">{s.meeting_section_title[language]}</h2>
              <p className="text-slate-600 mb-10 text-lg leading-relaxed">
                {s.meeting_section_desc[language]}
              </p>
              <div>
                <button 
                  onClick={() => setShowMeetingModal(true)}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-amber-900/10 hover:-translate-y-1 transition-all inline-flex items-center"
                >
                  <span>{s.btn_meeting[language]}</span>
                  <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="lg:mt-0">
              <PriorityPoll lang={language} />
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white py-16 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="text-center md:text-left mb-8 md:mb-0">
              <div 
                onDoubleClick={() => setShowAdminDashboard(true)}
                className="text-2xl font-bold tracking-tight text-green-900 uppercase mb-1 font-heading cursor-default select-none"
                title={language === 'bn' ? 'শাইখ মনজুরুল হক (রাহাদ)' : 'Shaikh Monzurul Haque Rahad'}
              >
                {language === 'bn' ? 'শাইখ মনজুরুল হক (রাহাদ)' : 'Shaikh Monzurul Haque Rahad'}
              </div>
              <div className="text-slate-500 font-medium">
                {language === 'bn' ? 'চলো একসাথে গড়ি বাংলাদেশ' : 'Let\'s Build Bangladesh Together'}
              </div>
            </div>
            
            <div className="flex items-center space-x-3 md:space-x-4">
              <FooterSocialIcon 
                href={SOCIAL_LINKS.facebook} 
                label="Facebook"
                bgColor="bg-[#1877F2]"
                svg={<path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />}
              />
              <FooterSocialIcon 
                href={SOCIAL_LINKS.instagram} 
                label="Instagram"
                bgColor="bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]"
                svg={<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />}
              />
              <FooterSocialIcon 
                href={SOCIAL_LINKS.tiktok} 
                label="TikTok"
                bgColor="bg-[#000000]"
                svg={<path d="M12.525.02c1.31.036 2.512.335 3.6.895V7.03c-.76-.56-1.62-.88-2.54-.88-.5 0-.98.1-1.42.28-.44.18-.83.45-1.15.77-.32.32-.59.71-.77 1.15-.18.44-.28.92-.28 1.42 0 .5.1.98.28 1.42.18.44.45.83.77 1.15.32.32.71.59 1.15.77.44.18.92.28 1.42.28.5 0 .98-.1 1.42-.28.44-.18.83-.45 1.15-.77.32-.32.59-.71.77-1.15.18-.44.28-.92.28-1.42V0h4.06c.14 2.39 1.09 4.57 2.53 6.32v4.06c-1.44-1.75-2.39-3.93-2.53-6.32h-4.06v11.19c0 1.1-.22 2.15-.61 3.11-.39.96-.96 1.81-1.67 2.52-.71.71-1.56 1.28-2.52 1.67-.96.39-2.01.61-3.11.61-1.1 0-2.15-.22-3.11-.61-.96-.39-1.81-.96-2.52-1.67-.71-.71-1.28-1.56-1.67-2.52-.39-.96-.61-2.01-.61-3.11 0-1.1.22-2.15.61-3.11.39-.96.96-1.81 1.67-2.52.71-.71 1.56-1.28 2.52-1.67.96-.39 2.01-.61 3.11-.61.1 0 .21.01.31.02V4.08c-.1-.01-.21-.02-.31-.02-1.1 0-2.15.22-3.11.61-.96.39-1.81.96-2.52 1.67-.71.71-1.28-1.56-1.67 2.52-.39.96-.61-2.01-.61-3.11 0-1.1.22-2.15.61 3.11.39.96.96 1.81 1.67 2.52.71.71 1.56 1.28 2.52 1.67.96.39 2.01.61 3.11.61 1.1 0 2.15-.22 3.11-.61.96-.39 1.81-.96-2.52-1.67-.71-.71-1.28-1.56-1.67-2.52-.39-.96-.61-2.01-.61-3.11V4.08h4.06c.14 2.39 1.09 4.57 2.53 6.32V6.34c-1.44-1.75-2.39-3.93-2.53-6.32h-4.06z" />}
              />
              <FooterSocialIcon 
                href={SOCIAL_LINKS.youtube} 
                label="YouTube"
                bgColor="bg-[#FF0000]"
                svg={<path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />}
              />
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

      <VolunteerModal isOpen={showVolunteerModal} onClose={() => setShowVolunteerModal(false)} lang={language} />
      <ProblemModal isOpen={showProblemModal} onClose={() => setShowProblemModal(false)} lang={language} />
      <MeetingModal isOpen={showMeetingModal} onClose={() => setShowMeetingModal(false)} lang={language} />
      {showAdminDashboard && <AdminDashboard onClose={() => setShowAdminDashboard(false)} lang={language} />}
      
      <ScrollToTop />
      <CampaignAssistant />
    </div>
  );
};

export default App;
