import React from "react";
import "./ProductCard.css";
import env from "../../config/env";

interface ProductCardProps {
  name: string;
  price: number;
  currency?: string;
  unit?: string;
  image: string;
  description?: string;
  onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  currency = "$",
  unit,
  image,
  description,
  onClick,
}) => {
  // 构建完整的图片 URL
  const imageUrl = image.startsWith('http') 
    ? image 
    : `${env.r2BaseUrl}/${image}`;

  // 格式化价格显示
  const formattedPrice = price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 3
  });

  // 修改点击处理函数，确保在Telegram环境中也能正常工作
  const handleClick = (e: React.MouseEvent) => {
    // 阻止事件冒泡和默认行为
    e.preventDefault();
    e.stopPropagation();
    
    // 添加调试信息
    console.log("ProductCard clicked, navigating to product detail");
    
    // 确保onClick回调被调用
    if (onClick) {
      onClick();
    }
  };

  return (
    <div 
      className="card product-card" 
      onClick={handleClick} 
      style={{ cursor: 'pointer' }}
      role="button"
      tabIndex={0}
      aria-label={`View details of ${name}`}
    >
      <div className="product-image-container">
        <img src={imageUrl} alt={name} className="product-image" />
      </div>
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        {description && <p className="product-description">{description}</p>}
        <p className="product-price">
          {currency}{formattedPrice} {unit && `/ ${unit}`}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
