export type Lang = 'fr' | 'dr';
export type Role = 'client' | 'pro' | 'admin';

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'disputed';

export type PaymentMethod = 'cod' | 'flouci' | 'konnect' | 'cash';
export type PaymentStatus = 'pending' | 'paid' | 'refunded';
export type PriceUnit = 'heure' | 'forfait' | 'devis';
export type Subscription = 'free' | 'basic' | 'premium';

export interface User {
  id: string;
  phone: string;
  email?: string;
  full_name: string;
  avatar_url?: string;
  role: Role;
  lang_pref: Lang;
  city?: string;
  is_verified: boolean;
  created_at: string;
}

export interface Category {
  id: string;
  slug: string;
  name_fr: string;
  name_dr: string;
  icon: string;
  color: string;
  sort_order: number;
  is_active: boolean;
}

export interface ProProfile {
  id: string;
  user_id: string;
  user?: User;
  bio_fr?: string;
  bio_dr?: string;
  years_exp?: number;
  is_approved: boolean;
  subscription: Subscription;
  rating_avg: number;
  rating_count: number;
  response_time?: number;
  lat?: number;
  lng?: number;
  radius_km: number;
  services?: ProService[];
  photos?: ProPhoto[];
}

export interface ProService {
  id: string;
  pro_id: string;
  category_id: string;
  category?: Category;
  price_from?: number;
  price_to?: number;
  price_unit: PriceUnit;
  description_fr?: string;
  description_dr?: string;
  is_active: boolean;
}

export interface Booking {
  id: string;
  client_id: string;
  client?: User;
  pro_id: string;
  pro?: ProProfile;
  service_id?: string;
  category_id?: string;
  category?: Category;
  status: BookingStatus;
  scheduled_at: string;
  address: string;
  city: string;
  notes_client?: string;
  price_quoted?: number;
  price_final?: number;
  payment_method?: PaymentMethod;
  payment_status: PaymentStatus;
  platform_fee?: number;
  created_at: string;
}

export interface Review {
  id: string;
  booking_id: string;
  client_id: string;
  client?: User;
  pro_id: string;
  rating: number;
  comment_fr?: string;
  comment_dr?: string;
  is_verified: boolean;
  created_at: string;
}

export interface ProPhoto {
  id: string;
  pro_id: string;
  url: string;
  caption?: string;
  sort_order: number;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title_fr?: string;
  title_dr?: string;
  body_fr?: string;
  body_dr?: string;
  data?: Record<string, unknown>;
  is_read: boolean;
  created_at: string;
}
