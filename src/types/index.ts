export interface Product {
  id: string;
  name: string;
  category: string;
  farmer: string;
  price: number;
  originalPrice?: number;
  unit: string;
  image: string;
  rating?: number;
  reviewsCount?: number;
  badge?: string;
  isBestSeller?: boolean;
  isPopular?: boolean;
}

export interface Category {
  id: string;
  name: string;
  count: number;
  bgGradient: string;
  borderColor: string;
  textColor: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
