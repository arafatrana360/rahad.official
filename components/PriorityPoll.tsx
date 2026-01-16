
import React, { useState, useEffect } from 'react';
import { Language } from '../types';

interface PriorityPollProps {
  lang: Language;
}

const PriorityPoll: React.FC<PriorityPollProps> = ({ lang }) => {
  const [voted, setVoted] = useState(false);
  const [options, setOptions] = useState([
    { id: 'edu', label: { bn: 'মানসম্মত শিক্ষা', en: 'Quality Education' }, votes: 450 },
    { id: 'job', label: { bn: 'আইটি ও কর্মসংস্থান', en: 'IT & Employment' }, votes: 580 },
    { id: 'road', label: { bn: 'উন্নত রাস্তাঘাট', en: 'Better Roads' }, votes: 320 },
    { id: 'health', label: { bn: 'স্বাস্থ্যসেবা উন্নয়ন', en: 'Healthcare Expansion' }, votes: 290 }
  ]);
  const [lastActivity, setLastActivity] = useState<number>(0);

  useEffect(() => {
    // 1. Check if user has voted
    const hasVoted = localStorage.getItem('rahad_poll_voted');
    if (hasVoted) setVoted(true);

    // 2. Load existing votes or initialize
    const savedVotes = localStorage.getItem('rahad_poll_data');
    let currentOptions = options;
    
    if (savedVotes) {
      currentOptions = JSON.parse(savedVotes);
    }

    // 3. Simulate "Community Activity"
    // We add a few random votes every time the user re-enters to make it feel "Live"
    const now = Date.now();
    const lastVisit = parseInt(localStorage.getItem('rahad_last_visit') || now.toString());
    const timeGap = now - lastVisit;
    
    // If it's been more than 30 seconds since last load, simulate 1-5 new votes from the "community"
    if (timeGap > 30000 || !savedVotes) {
      currentOptions = currentOptions.map(opt => ({
        ...opt,
        votes: opt.votes + Math.floor(Math.random() * 3) // Add 0-2 random votes to each category
      }));
    }

    setOptions(currentOptions);
    setLastActivity(Math.floor(Math.random() * 5) + 1); // For the "Last vote X mins ago" label
    localStorage.setItem('rahad_poll_data', JSON.stringify(currentOptions));
    localStorage.setItem('rahad_last_visit', now.toString());
  }, []);

  const handleVote = (id: string) => {
    if (voted) return;
    
    const newOptions = options.map(opt => 
      opt.id === id ? { ...opt, votes: opt.votes + 1 } : opt
    );
    
    setOptions(newOptions);
    setVoted(true);
    
    // Persist everything
    localStorage.setItem('rahad_poll_voted', 'true');
    localStorage.setItem('rahad_poll_data', JSON.stringify(newOptions));
  };

  const totalVotes = options.reduce((acc, opt) => acc + opt.votes, 0);

  return (
    <div className="bg-slate-900 text-white p-8 md:p-10 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden h-full flex flex-col justify-center">
      {/* Dynamic Background Glows */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10">
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-green-400 font-bold text-[10px] tracking-widest uppercase">
              {lang === 'bn' ? 'লাইভ জনমত জরিপ' : 'LIVE PUBLIC POLL'}
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold font-heading">
            {lang === 'bn' ? 'আপনার প্রধান অগ্রাধিকার কোনটি?' : 'What is your top priority?'}
          </h3>
        </div>

        <div className="space-y-4">
          {options.map((opt) => {
            const percentage = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
            return (
              <div key={opt.id} className="relative group">
                <button
                  disabled={voted}
                  onClick={() => handleVote(opt.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all relative overflow-hidden flex justify-between items-center ${
                    voted 
                      ? 'border-white/10 bg-white/5 cursor-default' 
                      : 'border-white/20 hover:border-green-500 hover:bg-white/10 cursor-pointer active:scale-[0.98]'
                  }`}
                >
                  {/* Animated Progress Bar */}
                  <div 
                    className={`absolute left-0 top-0 bottom-0 bg-green-600/20 transition-all duration-1000 ease-out ${voted ? 'opacity-100' : 'opacity-0'}`}
                    style={{ width: voted ? `${percentage}%` : '0%' }}
                  ></div>
                  
                  <span className={`relative z-10 font-bold text-sm md:text-base transition-colors ${voted ? 'text-slate-300' : 'text-white'}`}>
                    {opt.label[lang]}
                  </span>
                  
                  {voted && (
                    <div className="relative z-10 flex items-center space-x-3">
                      <span className="text-[10px] text-slate-500 font-medium">
                        {opt.votes} {lang === 'bn' ? 'ভোট' : 'votes'}
                      </span>
                      <span className="font-black text-green-400 text-sm">
                        {percentage}%
                      </span>
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <p className="text-slate-400 text-[10px] italic">
            {voted 
              ? (lang === 'bn' ? `মোট অংশগ্রহণকারী: ${totalVotes}` : `Total participants: ${totalVotes}`)
              : (lang === 'bn' ? 'একটি অপশনে ক্লিক করে আপনার ভোট দিন' : 'Click an option to cast your vote')}
          </p>
          <div className="text-[10px] text-green-500/80 font-bold animate-pulse">
            {lang === 'bn' ? `শেষ ভোট: ${lastActivity} মিনিট আগে` : `Last vote: ${lastActivity}m ago`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriorityPoll;
