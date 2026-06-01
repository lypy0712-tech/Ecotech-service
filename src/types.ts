export type Language = "az" | "en" | "ru";

export interface NavLink {
  id: string;
  label: Record<Language, string>;
}

export interface ServiceItem {
  id: number;
  title: Record<Language, string>;
  description: Record<Language, string>;
  iconName: string;
  price?: Record<Language, string>;
}

export interface AdvantageItem {
  id: number;
  title: Record<Language, string>;
  description: Record<Language, string>;
  iconName: string;
}

export interface PortfolioItem {
  id: number;
  title: Record<Language, string>;
  description: Record<Language, string>;
  beforeImg: string;
  afterImg: string;
}

export interface ReviewItem {
  id: number;
  author: string;
  company?: string;
  rating: number;
  text: Record<Language, string>;
  date: string;
}

export interface CallbackSubmission {
  id: string;
  name: string;
  phone: string;
  tankVolume?: string;
  serviceType: string;
  notes?: string;
  timestamp: string;
  status: "pending" | "called" | "rejected";
}
