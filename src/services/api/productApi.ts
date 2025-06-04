import { Product } from '../../types/Product';
import env from "../../config/env";
import { API_WORKER_URL } from '@/config/env';

// 模拟商品数据（生产环境应替换为真实API调用）
const getImageUrl = (imageName: string) => {
  return `${env.r2BaseUrl}/${imageName}`;
};

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Chamomile Tea",
    price: 8.20,
    currency: "$",
    unit: "Pack",
    image: getImageUrl("01-02-0001-Chamomile-Tea.png"),
    category: "Tea",
    description: "Chamomile tea is made from the flower heads of the chamomile plant. It has been consumed for centuries as a natural remedy for several health conditions.",
    origin: "China",
    rating: 4.8,
    reviewCount: 12
  },
  {
    id: "2",
    name: "Peppermint Tea",
    price: 132.00,
    currency: "$",
    unit: "Can",
    image: getImageUrl("01-02-0002-Peppermint-Tea.png"),
    category: "Tea",
    description: "Peppermint tea is a popular herbal tea that is naturally caffeine-free. Peppermint tea is made from the leaves of the peppermint plant.",
    origin: "China",
    rating: 4.5,
    reviewCount: 8
  },
  {
    id: "3",
    name: "Goji Berry Chrysanthemum Tea",
    price: 9.90,
    currency: "$",
    unit: "Pack",
    image: getImageUrl("01-02-0003-Goji-Berry-Chrysanthemum-Tea.png"),
    category: "Tea",
    description: "A delightful blend of sweet goji berries and chrysanthemum flowers, creating a naturally sweet and refreshing tea with numerous health benefits.",
    origin: "China",
    rating: 4.7,
    reviewCount: 15
  },
  {
    id: "4",
    name: "Ginseng Oolong Tea",
    price: 69.90,
    currency: "$",
    unit: "Can",
    image: getImageUrl("01-02-0004-Ginseng-Oolong-Tea.png"),
    category: "Tea",
    description: "A premium blend of oolong tea and ginseng, offering a unique flavor profile with earthy and slightly sweet notes. Known for its energy-boosting properties.",
    origin: "China",
    rating: 5.0,
    reviewCount: 7
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

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_WORKER_URL}/api/products`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
};