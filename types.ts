export enum ProductCategory {
  CANDLE = 'Vela',
  SOAP = 'Jabón',
  DIFFUSER = 'Aromatizante'
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  image: string;
  scentProfile: string;
  hexColor: string; // For the card accent background
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isProductRecommendation?: boolean;
}