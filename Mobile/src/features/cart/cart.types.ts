export interface CartItem {
  product: {
    _id: string;
    name: string;
    price: number;
    image: string;
    availableQuantity: number;
    description?: string;
  };
  quantity: number;
  addedAt?: string;
  _id?: string;
}

export interface CartResponse {
  _id: string;
  customer: string;
  items: CartItem[];
  totalPrice: number;
}
