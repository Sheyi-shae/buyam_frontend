

export interface VendorBenefit {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  premium: boolean;
}

export interface Listing {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  category: string | null;
  price: number;
  currency: string;
  condition: 'new' | 'like-new' | 'good' | 'fair';
  status: 'active' | 'sold' | 'archived';
  images: string[];
  location: string | null;
  location_lat: number | null;
  location_lon: number | null;
  views: number;
  favorites: number;
  inquiries: number;
  featured: boolean;
  featured_until: string | null;
  created_at: string;
  updated_at: string;
  sold_at: string | null;
}

export interface ListingStats {
  totalListings: number;
  activeListings: number;
  soldListings: number;
  totalViews: number;
  totalFavorites: number;
  totalInquiries: number;
  totalRevenue: number;
}
