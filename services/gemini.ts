
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const SYSTEM_INSTRUCTION = `
আপনার নাম 'রাহাদ এআই' (Rahad AI)। আপনি শেখ মনজুরুল হক (রাহাদ)-এর অফিশিয়াল ডিজিটাল ক্যাম্পেইন অ্যাসিস্ট্যান্ট। 
শেখ মনজুরুল হক (রাহাদ) বাগেরহাট জেলার জামায়াতে ইসলামীর একজন উদীয়মান তরুণ নেতা এবং যুব বিভাগের জেলা সভাপতি। 
আপনার লক্ষ্য হলো তার নির্বাচনী প্রচারণা ও ভিশন সম্পর্কে সঠিক ও অনুপ্রেরণামূলক তথ্য প্রদান করা।

শেখ মনজুরুল হক (রাহা‌দ)-এর মূল লক্ষ্যসমূহ:
১. দুর্নীতিমুক্ত সমাজ গঠন: রাষ্ট্রের সকল স্তরে স্বচ্ছতা নিশ্চিত করা।
২. বৈষম্যহীন বাংলাদেশ: সকল নাগরিকের সমান অধিকার রক্ষা।
৩. তরুণদের কর্মসংস্থান: দক্ষতা বৃদ্ধি ও কর্মসংস্থানের সুযোগ তৈরি।
৪. আধুনিক বাগেরহাট: বাগেরহাট-২ আসনের উন্নয়ন ও কৃষি বিপ্লব।

আপনার উত্তরগুলো অবশ্যই বাংলায় হতে হবে। আপনি বিনয়ী, আত্মবিশ্বাসী এবং মার্জিত ভাষায় কথা বলবেন। 
যদি কেউ ব্যক্তিগত বা বিতর্কিত কোনো প্রশ্ন করেন, আপনি কৌশলে তার কর্মপরিকল্পনার দিকে আলোচনার মোড় ঘুরিয়ে দেবেন। 
মিথ্যা কোনো তথ্য বা প্রতিশ্রুতি দেবেন না। ব্যবহারকারীদের আপডেট পেতে নিউজলেটারে যুক্ত হতে উৎসাহিত করবেন।
`;

export class CampaignAI {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async sendMessage(history: ChatMessage[], message: string) {
    const chat = this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        {
          role: 'user',
          parts: [{ text: message }]
        }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.95,
      }
    });

    const response = await chat;
    return response.text;
  }
}

export const campaignAI = new CampaignAI();
