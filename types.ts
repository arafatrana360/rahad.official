
export type Language = 'bn' | 'en';

export interface LocalizedString {
  bn: string;
  en: string;
}

export interface Policy {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  icon: string;
  details: LocalizedString[];
}

export interface NewsItem {
  id: number;
  date: LocalizedString;
  title: LocalizedString;
  excerpt: LocalizedString;
  category: 'Press Release' | 'Event' | 'Update';
  imageUrl: string;
}

export interface TimelineEvent {
  id: number;
  year: string;
  title: LocalizedString;
  description: LocalizedString;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface VolunteerSubmission {
  id: string;
  timestamp: number;
  name: string;
  phone: string;
  email: string;
  area: string;
  skills: string;
}

export interface ProblemReport {
  id: string;
  timestamp: number;
  category: string;
  location: string;
  description: string;
  contact: string;
}

export interface MeetingInvitation {
  id: string;
  timestamp: number;
  name: string;
  phone: string;
  location: string;
  peopleCount: string;
  isCommitted: boolean;
}

export type PageRoute = 'home' | 'timeline' | 'biography' | 'vision' | 'blog' | 'manifesto';
