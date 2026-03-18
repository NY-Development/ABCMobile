export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
}
