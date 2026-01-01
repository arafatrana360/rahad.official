
import React, { useState, useRef, useEffect } from 'react';
import { campaignAI } from '../services/gemini';
import { ChatMessage } from '../types';

const CampaignAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "আস্সালামু আলাইকুম! আমি শেখ মনজুরুল হক (রাহা‌দ)-এর ডিজিটাল অ্যাসিস্ট্যান্ট 'রাহাদ এআই'। আমাদের লক্ষ্য ও ভিশন সম্পর্কে জানতে আমি আপনাকে কীভাবে সাহায্য করতে পারি?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const response = await campaignAI.sendMessage(messages, userMessage);
      setMessages(prev => [...prev, { role: 'model', text: response || "দুঃখিত, আমি আপনার অনুরোধটি বুঝতে পারছি না। দয়া করে আবার চেষ্টা করুন।" }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "সার্ভিসটি বর্তমানে সাময়িকভাবে বন্ধ আছে। পরে চেষ্টা করুন।" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="bg-white w-80 sm:w-96 h-[500px] rounded-2xl shadow-2xl flex flex-col border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-red-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white text-red-600 flex items-center justify-center font-bold text-lg shadow-inner">R</div>
              <div>
                <h3 className="font-bold text-sm">রাহাদ এআই (Rahad AI)</h3>
                <p className="text-xs text-red-100 flex items-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-1.5 animate-pulse"></span>
                  সক্রিয়
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  m.role === 'user' 
                    ? 'bg-red-600 text-white rounded-tr-none shadow-md' 
                    : 'bg-white text-slate-700 shadow-sm border border-slate-200 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 rounded-tl-none">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-slate-100">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="প্রশ্ন জিজ্ঞাসা করুন..."
                className="flex-1 bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-red-500 outline-none transition-all placeholder:text-slate-400"
              />
              <button 
                onClick={handleSend}
                disabled={isTyping}
                className="bg-red-600 text-white p-2.5 rounded-xl hover:bg-red-700 disabled:opacity-50 shadow-md transition-all active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-red-600 text-white p-2.5 rounded-full shadow-lg hover:shadow-red-500/30 hover:scale-105 transition-all flex items-center space-x-2 group border-2 border-white/20"
        >
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:px-2 transition-all duration-300 font-bold whitespace-nowrap text-xs md:text-sm">
            Ask the AI agent
          </span>
          <div className="p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
        </button>
      )}
    </div>
  );
};

export default CampaignAssistant;
