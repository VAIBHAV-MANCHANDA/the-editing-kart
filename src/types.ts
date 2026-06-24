export type TargetCountry = 'usa' | 'uk' | 'europe' | 'canada' | 'australia' | 'newzealand';

export type CreativePreset = 'precision' | 'soft' | 'premium' | 'documentary';

export interface CountryConfig {
  code: TargetCountry;
  name: string;
  flag: string;
  currencySymbol: string;
  currencyCode: string;
  rateMultiplier: number; // to adjust base pricing slightly per economy/currency
  primaryTimezone: string;
  representativeClient: string;
}

export type TabPage = 'home' | 'services' | 'portfolio' | 'calculator' | 'about' | 'contact';

export interface ServiceDetail {
  id: string;
  title: string;
  shortDesc: string;
  detailedDesc: string;
  deliverables: string[];
  techStack: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  client: string;
  location: string;
  image: string;
  videoSrc: string;
  stats: { label: string; value: string };
  duration: string;
  challenges: string;
  deliverableText: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  country: TargetCountry;
  text: string;
  rating: number;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'process' | 'pricing';
}
