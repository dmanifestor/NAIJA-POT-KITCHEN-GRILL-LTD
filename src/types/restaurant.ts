export type MenuCategoryType =
  | 'all'
  | 'jollof-rice'
  | 'swallow-soups'
  | 'grilled-foods'
  | 'proteins-sides'
  | 'small-chops'
  | 'drinks'
  | 'family-combos';

export interface MenuItem {
  id: string;
  name: string;
  localName?: string;
  category: MenuCategoryType;
  description: string;
  price: number;
  formattedPrice?: string;
  isAvailable: boolean;
  isPopular?: boolean;
  isChefSpecial?: boolean;
  spiceLevel?: 0 | 1 | 2 | 3;
  dietary?: ('Halal' | 'Gluten-Free' | 'Vegetarian' | 'Vegan' | 'Contains Nuts')[];
  image: string;
  allergens?: string[];
  portionInfo?: string;
  placeholderNotice?: string;
}

export interface OrderItem {
  item: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export interface RestaurantConfig {
  businessName: string;
  registeredName: string;
  businessType: string;
  positioning: string;
  tagline: string;
  subTagline: string;
  whatsappNumber: string; // international format without + or spaces e.g. 447123456789
  whatsappDisplayNumber: string;
  isWhatsappConfigured: boolean;
  telephone: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postcode: string;
  country: string;
  isAddressVerified: boolean;
  currencySymbol: string;
  currencyCode: string;
  openingHours: {
    day: string;
    hours: string;
    isOpen: boolean;
  }[];
  socials: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
  deliveryAreas: {
    name: string;
    minOrder: number;
    fee: number;
  }[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'food' | 'grill' | 'dining' | 'preparation';
  image: string;
  alt: string;
  description: string;
}
