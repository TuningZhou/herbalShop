export interface CartItem {
    productId: string;
    quantity: number;
    price: number;
    name: string;
    image: string;
  }
  
  export interface Order {
    id: string;
    items: CartItem[];
    total: number;
    status: 'pending' | 'paid' | 'shipped' | 'completed';
    createdAt: Date;
  }