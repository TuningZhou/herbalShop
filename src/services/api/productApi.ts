import { Product } from '../../types/Product';

// 模拟商品数据（生产环境应替换为真实API调用）
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Chamomile',
    description: 'Pure organic chamomile flowers for tea',
    price: 8.99,
    image: '/assets/images/chamomile.jpg',
    category: 'herbs'
  },
  {
    id: '2',
    name: 'Echinacea Blend',
    description: 'Immune support herbal mix',
    price: 12.99,
    image: '/assets/images/echinacea.jpg',
    category: 'herbs'
  }
];

export const productApi = {
  // 获取所有商品
  getAllProducts: async (): Promise<Product[]> => {
    try {
      // 实际项目中应调用真实API
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockProducts;
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw error;
    }
  },

  // 根据ID获取商品
  getProductById: async (id: string): Promise<Product> => {
    try {
      const product = mockProducts.find(p => p.id === id);
      if (!product) throw new Error('Product not found');
      return product;
    } catch (error) {
      console.error(`Failed to fetch product ${id}:`, error);
      throw error;
    }
  },

  // 根据分类获取商品
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockProducts.filter(p => p.category === category);
    } catch (error) {
      console.error(`Failed to fetch products for category ${category}:`, error);
      throw error;
    }
  }
};