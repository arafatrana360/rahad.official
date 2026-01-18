
import React, { useState, useEffect } from 'react';
import { VolunteerSubmission, ProblemReport, MeetingInvitation, Language } from '../types';
import { GoogleGenAI } from "@google/genai";
import { GOOGLE_SHEET_APP_URL, GOOGLE_SHEET_LINK } from '../constants';

interface AdminDashboardProps {
  onClose: () => void;
  lang: Language;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose, lang }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [showConfigHelper, setShowConfigHelper] = useState(false);
  
  const [activeTab, setActiveTab] = useState<'volunteers' | 'problems' | 'meetings'>('volunteers');
  const [volunteers, setVolunteers] = useState<VolunteerSubmission[]>([]);
  const [problems, setProblems] = useState<ProblemReport[]>([]);
  const [meetings, setMeetings] = useState<MeetingInvitation[]>([]);
  const [aiSummary, setAiSummary] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    // Check if already authenticated in this session
    const authStatus = sessionStorage.getItem('rahad_admin_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }

    const v = JSON.parse(localStorage.getItem('volunteers') || '[]');
    const p = JSON.parse(localStorage.getItem('problems') || '[]');
    const m = JSON.parse(localStorage.getItem('meetings') || '[]');
    setVolunteers(v);
    setProblems(p);
    setMeetings(m);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const secret = process.env.ADMIN_PASSWORD || 'rahad2026';
    
    if (password === secret) {
      setIsAuthenticated(true);
      sessionStorage.setItem('rahad_admin_auth', 'true');
      setLoginError(false);
    } else {
      setLoginError(true);
      setPassword('');
    }
  };

  const bridgeScriptCode = `function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  // Append a row with formatted data
  sheet.appendRow([
    new Date(),
    data.type,
    data.data.name || data.data.category || "",
    data.data.phone || data.data.location || "",
    data.data.area || data.data.contact || "",
    data.data.description || data.data.skills || "",
    JSON.stringify(data.data)
  ]);
  
  return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
}`;

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('rahad_admin_auth');
  };

  const downloadCSV = (data: any[], filename: string) => {
    if (data.length === 0) return;
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','),
      ...data.map(row => 
        headers.map(fieldName => JSON.stringify(row[fieldName], (key, value) => value === null ? '' : value)).join(',')
      )
    ];
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

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
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      localStorage.removeItem('volunteers');
      localStorage.removeItem('problems');
      localStorage.removeItem('meetings');
      setVolunteers([]);
      setProblems([]);
      setMeetings([]);
    }
  };

  // Login Screen View
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[120] bg-slate-950 flex items-center justify-center p-4">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl w-full max-md backdrop-blur-xl">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-900/20">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2 font-heading">অ্যাডমিন লগইন</h1>
            <p className="text-slate-400 text-sm">ড্যাশবোর্ড অ্যাক্সেস করতে পাসওয়ার্ড প্রদান করুন</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                autoFocus
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="পাসওয়ার্ড লিখুন"
                className={`w-full bg-slate-800 border ${loginError ? 'border-red-500' : 'border-slate-700'} text-white rounded-2xl px-5 py-4 focus:ring-2 focus:ring-green-600 outline-none transition-all placeholder:text-slate-500`}
              />
              {loginError && (
                <p className="text-red-500 text-xs mt-2 ml-1 font-bold">ভুল পাসওয়ার্ড। আবার চেষ্টা করুন।</p>
              )}
            </div>
            
            <div className="flex space-x-3">
              <button 
                type="button"
                onClick={onClose}
                className="flex-1 bg-slate-800 text-slate-300 py-4 rounded-2xl font-bold hover:bg-slate-700 transition-all"
              >
                বাতিল
              </button>
              <button 
                type="submit"
                className="flex-[2] bg-green-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-green-900/20 hover:bg-green-700 active:scale-95 transition-all"
              >
                লগইন করুন
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Authenticated Dashboard View
  return (
    <div className="fixed inset-0 z-[110] bg-slate-900 flex flex-col animate-in slide-in-from-bottom duration-500">
      <div className="bg-slate-800 p-6 flex justify-between items-center border-b border-slate-700">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center font-bold text-white text-xl">D</div>
          <div>
            <h1 className="text-white font-bold text-xl">{lang === 'bn' ? 'অ্যাডমিন ড্যাশবোর্ড' : 'Admin Dashboard'}</h1>
            <p className="text-slate-400 text-xs flex items-center">
              Sheikh Monzurul Haque Campaign
              {GOOGLE_SHEET_APP_URL ? (
                <span className="ml-2 px-1.5 py-0.5 bg-green-900/40 text-green-400 text-[10px] rounded border border-green-500/30 flex items-center">
                  <span className="w-1 h-1 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                  Sheet Sync Active
                </span>
              ) : (
                <button 
                  onClick={() => setShowConfigHelper(!showConfigHelper)}
                  className="ml-2 px-1.5 py-0.5 bg-slate-700 text-slate-400 text-[10px] rounded hover:bg-slate-600 transition-colors"
                >
                  Setup Data Sync
                </button>
              )}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3 md:space-x-4">
          <a 
            href={GOOGLE_SHEET_LINK} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden md:flex items-center space-x-2 bg-green-600/10 text-green-400 hover:bg-green-600/20 px-4 py-2 rounded-xl text-xs font-bold transition-all border border-green-500/20"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            <span>Open Google Sheet</span>
          </a>
          <button 
            onClick={handleLogout}
            className="text-slate-400 hover:text-white text-xs font-bold px-3 py-2 border border-slate-700 rounded-lg transition-colors"
          >
            Logout
          </button>
          <button onClick={onClose} className="bg-white/10 text-white p-2 rounded-lg hover:bg-white/20">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-slate-800 border-r border-slate-700 p-4 space-y-2 flex flex-col">
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
          <button 
            onClick={() => setActiveTab('meetings')}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all font-bold ${activeTab === 'meetings' ? 'bg-amber-600 text-white shadow-lg' : 'text-slate-400 hover:bg-white/5'}`}
          >
            {lang === 'bn' ? 'উঠান বৈঠক আমন্ত্রণ' : 'Meeting Invites'} ({meetings.length})
          </button>
          
          <div className="mt-auto pt-4 border-t border-slate-700">
             <a 
               href={GOOGLE_SHEET_LINK} 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-white transition-all text-xs font-medium"
             >
               <span>View Raw Data</span>
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
             </a>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto bg-slate-900 text-white">
          {showConfigHelper && (
            <div className="mb-8 p-6 bg-slate-800 border border-slate-700 rounded-3xl animate-in fade-in zoom-in duration-300">
               <h3 className="text-xl font-bold mb-4 font-heading text-green-400">Setup Google Sheet Sync</h3>
               <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                 Follow these steps exactly to link the website to your spreadsheet:
               </p>
               <ol className="list-decimal list-inside space-y-4 text-sm text-slate-300 mb-6">
                 <li>
                   Open your sheet: <a href={GOOGLE_SHEET_LINK} target="_blank" className="text-green-400 underline">1njzyl...DIk</a>
                 </li>
                 <li>
                   Go to <strong>Extensions &gt; Apps Script</strong>.
                 </li>
                 <li>
                   Delete any code there and <strong>Paste this Bridge Script</strong>:
                   <pre className="mt-2 p-3 bg-black/40 rounded-lg text-[10px] font-mono text-green-300 overflow-x-auto select-all">
                     {bridgeScriptCode}
                   </pre>
                 </li>
                 <li>
                   Click <strong>Deploy &gt; New Deployment</strong>. Select <strong>Web App</strong>.
                 </li>
                 <li>
                   Set "Execute as" to <strong>Me</strong> and "Who has access" to <strong>Anyone</strong>. Click Deploy.
                 </li>
                 <li>
                   Copy the <strong>Web App URL</strong> provided and paste it into the <code>GOOGLE_SHEET_APP_URL</code> variable in your <code>constants.tsx</code> file.
                 </li>
               </ol>
               <div className="flex space-x-4">
                 <button onClick={() => setShowConfigHelper(false)} className="px-4 py-2 bg-slate-700 rounded-lg text-xs font-bold hover:bg-slate-600 transition-all">Dismiss</button>
                 <button 
                  onClick={() => { navigator.clipboard.writeText(bridgeScriptCode); alert('Script copied!'); }}
                  className="px-4 py-2 bg-green-600 rounded-lg text-xs font-bold hover:bg-green-700 transition-all"
                 >
                   Copy Script to Clipboard
                 </button>
               </div>
            </div>
          )}

          {activeTab === 'volunteers' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold font-heading">Recent Registrations</h2>
                <button 
                  onClick={() => downloadCSV(volunteers, 'volunteers_rahad_campaign.csv')}
                  className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center space-x-2 shadow-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  <span>Export CSV</span>
                </button>
              </div>
              <div className="grid gap-4">
                {[...volunteers].reverse().map(v => (
                  <div key={v.id} className="bg-slate-800 p-5 rounded-2xl border border-slate-700 shadow-sm hover:border-green-500/30 transition-all">
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
          )}

          {activeTab === 'problems' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-2xl font-bold font-heading">Constituency Issues</h2>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => downloadCSV(problems, 'problem_reports_rahad.csv')}
                    className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    <span>CSV</span>
                  </button>
                  <button 
                    onClick={handleAnalyze} 
                    disabled={isAnalyzing || problems.length === 0}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold flex items-center space-x-2 disabled:opacity-50 transition-all shadow-lg"
                  >
                    <svg className={`w-5 h-5 ${isAnalyzing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    <span>{isAnalyzing ? 'AI Analyzing...' : 'AI Analysis Summary'}</span>
                  </button>
                </div>
              </div>

              {aiSummary && (
                <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-2xl text-blue-100 animate-in slide-in-from-top duration-300">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold flex items-center">
                      <span className="mr-2">✨</span> AI Insights:
                    </h3>
                    <button onClick={() => setAiSummary('')} className="text-blue-400 text-xs hover:text-white">Close</button>
                  </div>
                  <div className="whitespace-pre-line text-sm leading-relaxed">{aiSummary}</div>
                </div>
              )}

              <div className="grid gap-4">
                {[...problems].reverse().map(p => (
                  <div key={p.id} className="bg-slate-800 p-5 rounded-2xl border border-slate-700 hover:border-red-500/30 transition-all">
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

          {activeTab === 'meetings' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold mb-6 font-heading text-amber-400">Courtyard Meeting Invites</h2>
                <button 
                  onClick={() => downloadCSV(meetings, 'meeting_invites_rahad.csv')}
                  className="bg-amber-700 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center space-x-2 shadow-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  <span>Export CSV</span>
                </button>
              </div>
              <div className="grid gap-4">
                {[...meetings].reverse().map(m => (
                  <div key={m.id} className="bg-slate-800 p-5 rounded-2xl border border-slate-700 shadow-sm hover:border-amber-500/30 transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-amber-900/50 text-amber-500 rounded-lg flex items-center justify-center font-bold">
                          {m.peopleCount}
                        </div>
                        <h3 className="text-xl font-bold text-amber-400">{m.name}</h3>
                      </div>
                      <span className="text-xs text-slate-500">{new Date(m.timestamp).toLocaleString()}</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-300 mt-4">
                      <p><span className="text-slate-500 mr-2">Phone:</span> {m.phone}</p>
                      <p><span className="text-slate-500 mr-2">Location:</span> {m.location}</p>
                      <p className="md:col-span-2 flex items-center text-amber-200">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Committed to gathering {m.peopleCount} people
                      </p>
                    </div>
                  </div>
                ))}
                {meetings.length === 0 && <p className="text-slate-500 text-center py-20">No meeting invitations yet.</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
