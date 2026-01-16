
import React from 'react';
import { Policy, Language } from '../types';

interface PolicyCardProps {
  policy: Policy;
  lang: Language;
  onReadMore?: () => void;
}

const PolicyCard: React.FC<PolicyCardProps> = ({ policy, lang, onReadMore }) => {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all group h-full flex flex-col">
      <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
        {policy.icon}
      </div>
      <h3 className="text-2xl font-bold mb-4 text-slate-800 font-heading">{policy.title[lang]}</h3>
      <p className="text-slate-600 mb-6 leading-relaxed flex-grow">
        {policy.description[lang]}
      </p>
      <ul className="space-y-3 mb-8">
        {policy.details.map((detail, idx) => (
          <li key={idx} className="flex items-start text-sm text-slate-500">
            <svg className="h-5 w-5 text-green-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {detail[lang]}
          </li>
        ))}
      </ul>
      <button 
        onClick={onReadMore}
        className="mt-auto text-blue-600 font-bold text-sm flex items-center group-hover:translate-x-2 transition-transform"
      >
        {lang === 'bn' ? 'বিস্তারিত পড়ুন' : 'Read More'} 
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export default PolicyCard;
