export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  price?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}
