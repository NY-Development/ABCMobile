import { Owner, Product } from '../restaurants/restaurants.types';

export type OrderStatus = 'pending' | 'in-progress' | 'delivered' | 'cancelled' | 'rejected';

export interface Order {
  _id: string;
  customer: string | { _id: string; name: string; email: string; phone?: string };
  owner: string | Owner;
  product: string | Product;
  quantity: number;
  totalPrice: number;
  status: OrderStatus;
  deliveryOption: 'pickup' | 'delivery';
  delivery?: {
    provider?: any;
    address?: string;
    recipientName?: string;
    recipientPhone?: string;
    note?: string;
    feeRate?: number;
    feeAmount?: number;
    totalPayable?: number;
    assignedAt?: string;
  };
  payment?: {
    screenshotUrl?: string;
    method?: 'telebirr';
    amountPaid?: number;
    isPaid: boolean;
    paidAt?: string;
  };
  estimatedCompletionTime?: string;
  customerAgreementTime?: string;
  pickupLocation?: string;
  createdAt: string;
  updatedAt: string;
}
