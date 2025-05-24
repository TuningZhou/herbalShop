import { CartItem } from '../../types/Order';

// 模拟购物车数据
const mockCartItems: CartItem[] = [
  {
    productId: '1',
    quantity: 2,
    price: 8.99,
    name: 'Organic Chamomile',
    image: '/assets/images/chamomile.jpg'
  }
];

export const cartApi = {
  // 获取购物车内容
  getCartItems: async (): Promise<CartItem[]> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockCartItems;
    } catch (error) {
      console.error('Failed to fetch cart items:', error);
      throw error;
    }
  },

  // 添加商品到购物车
  addToCart: async (productId: string, quantity: number): Promise<void> => {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // 实际项目中应调用真实API并更新状态
      console.log(`Added ${quantity} of product ${productId} to cart`);
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      throw error;
    }
  },

  // 更新购物车商品数量
  updateCartItemQuantity: async (productId: string, quantity: number): Promise<void> => {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // 实际项目中应调用真实API并更新状态
      console.log(`Updated quantity of ${productId} to ${quantity}`);
    } catch (error) {
      console.error('Failed to update cart item:', error);
      throw error;
    }
  },

  // 清除购物车
  clearCart: async (): Promise<void> => {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // 实际项目中应调用真实API并更新状态
      console.log('Cart cleared');
    } catch (error) {
      console.error('Failed to clear cart:', error);
      throw error;
    }
  }
};