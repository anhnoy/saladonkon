export interface ActivityPricing {
  format: 'fixed' | 'hourly' | 'daily' | 'tiered';
  amount?: number;
  hourlyRates?: { hours: number; price: number }[];
  dailyRates?: { days: number; price: number }[];
  tiers?: { min: number; max: number; price: number }[];
}

export interface ActivitySchedule {
  type: 'specific' | 'weekly' | 'flexible';
  specificDates?: string[];
  days?: string[];
  timeSlots?: string[];
}

export interface ActivityCapacity {
  min: number;
  max: number;
}

export interface ActivityContactOptions {
  booking: boolean;
  info: boolean;
  phone?: string;
  email?: string;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  images: string[];
  pricing: ActivityPricing;
  schedule: ActivitySchedule;
  capacity: ActivityCapacity;
  duration: string;
  included: string[];
  requirements?: string[];
  notes?: string;
  contactOptions: ActivityContactOptions;
  status: 'active' | 'inactive';
}