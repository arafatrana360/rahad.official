
import React, { useState, useEffect } from 'react';
import { VolunteerSubmission, ProblemReport, Language } from '../types';
import { GoogleGenAI } from "@google/genai";

interface AdminDashboardProps {
  onClose: () => void;
  lang: Language;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose, lang }) => {
  const [activeTab, setActiveTab] = useState<'volunteers' | 'problems'>('volunteers');
  const [volunteers, setVolunteers] = useState<VolunteerSubmission[]>([]);
  const [problems, setProblems] = useState<ProblemReport[]>([]);
  const [aiSummary, setAiSummary] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const v = JSON.parse(localStorage.getItem('volunteers') || '[]');
    const p = JSON.parse(localStorage.getItem('problems') || '[]');
    setVolunteers(v);
    setProblems(p);
  }, []);

  const handleAnalyze = async () => {
    if (problems.length === 0) return;
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const prompt = `Analyze the following community problem reports from Bagerhat constituency and provide a summary of the most critical issues and recommended actions in ${lang === 'bn' ? 'Bengali' : 'English'}:\n\n${problems.map(p => `- [${p.category}] at ${p.location}: ${p.description}`).join('\n')}`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });
      setAiSummary(response.text || 'Analysis failed.');
    } catch (error) {
      setAiSummary('Error connecting to AI service.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearData = () => {
    if (confirm('Are you sure you want to clear all data?')) {
      localStorage.removeItem('volunteers');
      localStorage.removeItem('problems');
      setVolunteers([]);
      setProblems([]);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] bg-slate-900 flex flex-col animate-in slide-in-from-bottom duration-500">
      <div className="bg-slate-800 p-6 flex justify-between items-center border-b border-slate-700">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center font-bold text-white text-xl">D</div>
          <div>
            <h1 className="text-white font-bold text-xl">{lang === 'bn' ? 'অ্যাডমিন ড্যাশবোর্ড' : 'Admin Dashboard'}</h1>
            <p className="text-slate-400 text-xs">Sheikh Monzurul Haque Campaign</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={clearData} className="text-red-400 hover:text-red-300 text-sm font-bold px-4 py-2 border border-red-900/30 rounded-lg">Clear All</button>
          <button onClick={onClose} className="bg-white/10 text-white p-2 rounded-lg hover:bg-white/20">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-slate-800 border-r border-slate-700 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('volunteers')}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all font-bold ${activeTab === 'volunteers' ? 'bg-green-600 text-white shadow-lg' : 'text-slate-400 hover:bg-white/5'}`}
          >
            {lang === 'bn' ? 'স্বেচ্ছাসেবক তালিকা' : 'Volunteer List'} ({volunteers.length})
          </button>
          <button 
            onClick={() => setActiveTab('problems')}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all font-bold ${activeTab === 'problems' ? 'bg-red-600 text-white shadow-lg' : 'text-slate-400 hover:bg-white/5'}`}
          >
            {lang === 'bn' ? 'সমস্যা রিপোর্ট' : 'Problem Reports'} ({problems.length})
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto bg-slate-900 text-white">
          {activeTab === 'volunteers' ? (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-6 font-heading">Recent Registrations</h2>
              <div className="grid gap-4">
                {volunteers.map(v => (
                  <div key={v.id} className="bg-slate-800 p-5 rounded-2xl border border-slate-700 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-green-400">{v.name}</h3>
                      <span className="text-xs text-slate-500">{new Date(v.timestamp).toLocaleString()}</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-300">
                      <p><span className="text-slate-500 mr-2">Phone:</span> {v.phone}</p>
                      <p><span className="text-slate-500 mr-2">Area:</span> {v.area}</p>
                      <p className="md:col-span-2"><span className="text-slate-500 mr-2">Skills:</span> {v.skills || 'None'}</p>
                    </div>
                  </div>
                ))}
                {volunteers.length === 0 && <p className="text-slate-500 text-center py-20">No volunteers registered yet.</p>}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-2xl font-bold font-heading">Constituency Issues</h2>
                <button 
                  onClick={handleAnalyze} 
                  disabled={isAnalyzing || problems.length === 0}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold flex items-center space-x-2 disabled:opacity-50"
                >
                  <svg className={`w-5 h-5 ${isAnalyzing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  <span>{isAnalyzing ? 'AI Analyzing...' : 'AI Analysis Summary'}</span>
                </button>
              </div>

              {aiSummary && (
                <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-2xl text-blue-100 animate-in slide-in-from-top">
                  <h3 className="text-lg font-bold mb-3 flex items-center">
                    <span className="mr-2">✨</span> AI Insights:
                  </h3>
                  <div className="whitespace-pre-line text-sm leading-relaxed">{aiSummary}</div>
                </div>
              )}

              <div className="grid gap-4">
                {problems.map(p => (
                  <div key={p.id} className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="px-3 py-1 bg-red-900/50 text-red-400 text-xs font-bold rounded-full border border-red-500/20">{p.category}</span>
                        <h3 className="font-bold text-slate-200">{p.location}</h3>
                      </div>
                      <span className="text-xs text-slate-500">{new Date(p.timestamp).toLocaleString()}</span>
                    </div>
                    <p className="text-slate-400 text-sm mb-4 leading-relaxed">{p.description}</p>
                    <div className="pt-3 border-t border-slate-700 text-xs text-slate-500 flex items-center">
                      <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                      Contact: {p.contact || 'N/A'}
                    </div>
                  </div>
                ))}
                {problems.length === 0 && <p className="text-slate-500 text-center py-20">No problems reported yet.</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
