import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Product } from "../../types/Product";
import { productApi } from "../../services/api/productApi";
import { useCart } from "../../context/CartContext";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import ReviewCard from "../../components/ui/ReviewCard";
import ProductDetailCard from "../../components/ui/ProductDetailCard";
import "./ProductDetail.css";
import env from "../../config/env";

// 模拟评论数据
  // 构建 Cloudflare R2 图片 URL 的函数
  const getImageUrl = (imageName: string) => {
    return `${env.r2BaseUrl}/${env.r2ImagesPath}/${imageName}`;
  };

const mockReviews = [
  {
    id: 1,
    username: "Sophia",
    avatar: getImageUrl("Sophia.png"),
    date: "2 weeks ago",
    rating: 5,
    comment: "The product is decent for the price, but it has some flaws. It works, but I've encountered a few issues that could be improved.",
    likes: 5,
    dislikes: 3,
    userLiked: true,
    userDisliked: false
  },
  {
    id: 2,
    username: "Alex",
    avatar: getImageUrl("Alex.png"),
    date: "1 month ago",
    rating: 4,
    comment: "I'm quite satisfied with my purchase. The product is well-made and performs as advertised. However, I wish the instructions were a bit clearer.",
    likes: 8,
    dislikes: 1,
    userLiked: false,
    userDisliked: false
  }
];

// 模拟产品数据 - 与 ProductHome 页面保持一致
const mockProducts = [
  {
    id: "1",
    name: "Chamomile Tea",
    price: 8.20,
    currency: "$",
    unit: "Pack",
    image: "01-02-0001-Chamomile-Tea.png",
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
    image: "01-02-0002-Peppermint-Tea.png",
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
    image: "01-02-0003-Goji-Berry-Chrysanthemum-Tea.png",
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
    image: "01-02-0004-Ginseng-Oolong-Tea.png",
    category: "Tea",
    description: "A premium blend of oolong tea and ginseng, offering a unique flavor profile with earthy and slightly sweet notes. Known for its energy-boosting properties.",
    origin: "China",
    rating: 5.0,
    reviewCount: 7
  }
];

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // 首先尝试从模拟数据中查找产品
        const mockProduct = mockProducts.find(p => p.id === id);
        
        if (mockProduct) {
          setProduct(mockProduct);
        } else {
          // 如果模拟数据中没有找到，尝试从API获取
          const data = await productApi.getProductById(id!);
          setProduct(data);
        }
      } catch (err) {
        console.error("获取产品详情失败:", err);
        navigate("/shop");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (product) {
      // 构建完整的图片 URL
      const imageUrl = product.image.startsWith('http') 
        ? product.image 
        : `${env.r2BaseUrl}/${product.image}`;
      
      // 传递完整的产品数据作为第三个参数
      addToCart(product.id, quantity, {
        name: product.name,
        price: product.price,
        image: imageUrl // 使用处理过的图片URL
      });
    }
  };

  if (loading) return <LoadingSpinner />;

  if (!product) return <div className="error-message">产品未找到</div>;

  // 构建完整的图片 URL
  const imageUrl = product.image.startsWith('http') 
    ? product.image 
    : `${env.r2BaseUrl}/${product.image}`;

  return (
    <div className="product-detail-page">
      {/* 使用ProductDetailCard组件展示产品信息 */}
      <ProductDetailCard
        name={product.name}
        price={product.price}
        currency={product.currency || "$"}
        unit={product.unit || "Pack"}
        image={imageUrl}
        description={product.description || ""}
        origin={product.origin || "China"}
        rating={product.rating || 5.0}
        reviewCount={product.reviewCount || 7}
        onQuantityChange={setQuantity}
        quantity={quantity}
        onAddToCart={handleAddToCart}
      />
      
      {/* 评论和评级部分 */}
      <div className="reviews-section">
        <h2 className="reviews-title">Ratings & Reviews <span className="reviews-count">{mockReviews.length}</span></h2>
        
        <div className="reviews-list">
          {mockReviews.map(review => (
            <ReviewCard
              key={review.id}
              username={review.username}
              avatar={review.avatar}
              date={review.date}
              rating={review.rating}
              comment={review.comment}
              likes={review.likes}
              dislikes={review.dislikes}
              userLiked={review.userLiked}
              userDisliked={review.userDisliked}
              onLike={() => console.log(`点赞评论 ${review.id}`)}
              onDislike={() => console.log(`不赞评论 ${review.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
