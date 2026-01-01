
import React, { useState } from 'react';
import { Language } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const VolunteerModal: React.FC<ModalProps> = ({ isOpen, onClose, lang }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', area: '', skills: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const submission = { ...formData, id: Date.now().toString(), timestamp: Date.now() };
    const existing = JSON.parse(localStorage.getItem('volunteers') || '[]');
    localStorage.setItem('volunteers', JSON.stringify([submission, ...existing]));
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setFormData({ name: '', phone: '', email: '', area: '', skills: '' });
      }, 2000);
    }, 800);
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="bg-green-700 p-6 text-white flex justify-between items-center">
          <h2 className="text-2xl font-bold font-heading">
            {lang === 'bn' ? 'স্বেচ্ছাসেবক হিসেবে যুক্ত হোন' : 'Join as a Volunteer'}
          </h2>
          <button onClick={onClose} className="hover:rotate-90 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {isSuccess ? (
          <div className="p-12 text-center animate-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">
              {lang === 'bn' ? 'ধন্যবাদ!' : 'Thank You!'}
            </h3>
            <p className="text-slate-600">
              {lang === 'bn' ? 'আপনার আবেদনটি সফলভাবে গৃহীত হয়েছে।' : 'Your application has been received successfully.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">{lang === 'bn' ? 'পূর্ণ নাম' : 'Full Name'}</label>
              <input 
                required 
                type="text" 
                placeholder={lang === 'bn' ? 'আপনার নাম লিখুন' : 'Enter your name'}
                className={inputClass} 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">{lang === 'bn' ? 'মোবাইল' : 'Mobile'}</label>
                <input 
                  required 
                  type="tel" 
                  placeholder="017xxxxxxxx"
                  className={inputClass} 
                  value={formData.phone} 
                  onChange={e => setFormData({...formData, phone: e.target.value})} 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">{lang === 'bn' ? 'ইউনিয়ন/ওয়ার্ড' : 'Union/Ward'}</label>
                <input 
                  required 
                  type="text" 
                  placeholder={lang === 'bn' ? 'এলাকার নাম' : 'Area name'}
                  className={inputClass} 
                  value={formData.area} 
                  onChange={e => setFormData({...formData, area: e.target.value})} 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">{lang === 'bn' ? 'আপনার দক্ষতা (ঐচ্ছিক)' : 'Your Skills (Optional)'}</label>
              <textarea 
                placeholder={lang === 'bn' ? 'যেমন: গ্রাফিক ডিজাইন, সোশ্যাল মিডিয়া ইত্যাদি' : 'e.g. Graphic Design, Social Media'}
                className={`${inputClass} h-20 resize-none`} 
                value={formData.skills} 
                onChange={e => setFormData({...formData, skills: e.target.value})}
              ></textarea>
            </div>
            <button disabled={isSubmitting} className="w-full bg-green-700 text-white py-3.5 rounded-xl font-bold shadow-lg hover:bg-green-800 disabled:opacity-50 transition-all active:scale-95">
              {isSubmitting ? (lang === 'bn' ? 'প্রক্রিয়াধীন...' : 'Processing...') : (lang === 'bn' ? 'আবেদন জমা দিন' : 'Submit Application')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export const ProblemModal: React.FC<ModalProps> = ({ isOpen, onClose, lang }) => {
  const [formData, setFormData] = useState({ category: 'Roads', location: '', description: '', contact: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const submission = { ...formData, id: Date.now().toString(), timestamp: Date.now() };
    const existing = JSON.parse(localStorage.getItem('problems') || '[]');
    localStorage.setItem('problems', JSON.stringify([submission, ...existing]));
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setFormData({ category: 'Roads', location: '', description: '', contact: '' });
      }, 2000);
    }, 800);
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all";

  const categories = [
    { id: 'Roads', bn: 'রাস্তাঘাট', en: 'Roads & Infra' },
    { id: 'Water', bn: 'পানীয় জল', en: 'Drinking Water' },
    { id: 'Education', bn: 'শিক্ষা প্রতিষ্ঠান', en: 'Education' },
    { id: 'Health', bn: 'স্বাস্থ্যসেবা', en: 'Healthcare' },
    { id: 'Other', bn: 'অন্যান্য', en: 'Other' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="bg-red-600 p-6 text-white flex justify-between items-center">
          <h2 className="text-2xl font-bold font-heading">
            {lang === 'bn' ? 'সমস্যা চিহ্নিত করুন' : 'Report a Problem'}
          </h2>
          <button onClick={onClose} className="hover:rotate-90 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {isSuccess ? (
          <div className="p-12 text-center animate-in zoom-in duration-500">
            <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">
              {lang === 'bn' ? 'তথ্য জমা হয়েছে' : 'Report Submitted'}
            </h3>
            <p className="text-slate-600">
              {lang === 'bn' ? 'আপনার এলাকার সমস্যাটি গুরুত্ব সহকারে দেখা হবে।' : 'The issue in your area will be addressed seriously.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">{lang === 'bn' ? 'সমস্যার ধরন' : 'Category'}</label>
              <select className={inputClass} value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                {categories.map(c => <option key={c.id} value={c.id} className="text-slate-900">{lang === 'bn' ? c.bn : c.en}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">{lang === 'bn' ? 'সঠিক অবস্থান (গ্রাম/পাড়া)' : 'Exact Location'}</label>
              <input 
                required 
                type="text" 
                placeholder={lang === 'bn' ? 'গ্রাম বা পাড়ার নাম' : 'Village or neighborhood'}
                className={inputClass} 
                value={formData.location} 
                onChange={e => setFormData({...formData, location: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">{lang === 'bn' ? 'সমস্যার বিবরণ' : 'Description'}</label>
              <textarea 
                required 
                placeholder={lang === 'bn' ? 'বিস্তারিত বর্ণনা করুন...' : 'Describe the problem in detail...'}
                className={`${inputClass} h-24 resize-none`} 
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">{lang === 'bn' ? 'আপনার মোবাইল (যোগাযোগের জন্য)' : 'Contact Number'}</label>
              <input 
                type="tel" 
                placeholder="017xxxxxxxx"
                className={inputClass} 
                value={formData.contact} 
                onChange={e => setFormData({...formData, contact: e.target.value})} 
              />
            </div>
            <button disabled={isSubmitting} className="w-full bg-red-600 text-white py-3.5 rounded-xl font-bold shadow-lg hover:bg-red-700 disabled:opacity-50 transition-all active:scale-95">
              {isSubmitting ? (lang === 'bn' ? 'জমা হচ্ছে...' : 'Submitting...') : (lang === 'bn' ? 'রিপোর্ট জমা দিন' : 'Submit Report')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
