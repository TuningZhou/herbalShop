export interface Product {
  id: string;
  name: string;
  price: number;
  currency?: string;
  unit?: string;
  image: string;
  category: string;
  description?: string;
  origin?: string;
  rating?: number;
  reviewCount?: number;
}