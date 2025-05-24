import React, { useState, useEffect, ChangeEvent } from "react";
import "./ProductDetailCard.css";

interface ProductDetailCardProps {
  name: string;
  price: number;
  currency?: string;
  unit?: string;
  image: string;
  description: string;
  origin: string;
  rating: number;
  reviewCount: number;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: () => void;
}

const ProductDetailCard: React.FC<ProductDetailCardProps> = ({
  name,
  price,
  currency = "$",
  unit,
  image,
  description,
  origin,
  rating = 0,
  reviewCount = 0,
  quantity = 1,
  onQuantityChange = () => {},
  onAddToCart = () => {},
}) => {
  // 本地状态用于验证和控制数量输入
  const [localQuantity, setLocalQuantity] = useState<number>(quantity);
  const [inputValue, setInputValue] = useState<string>(quantity.toString());

  // 当外部 quantity 属性变化时更新本地状态
  useEffect(() => {
    setLocalQuantity(quantity);
    setInputValue(quantity.toString());
  }, [quantity]);

  // 处理输入框变化
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    // 尝试将输入值解析为浮点数
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue) && parsedValue > 0) {
      // 使用四舍五入将浮点数转换为整数
      const roundedValue = Math.round(parsedValue);
      setLocalQuantity(roundedValue);
      onQuantityChange(roundedValue);
    }
  };

  // 处理输入框失去焦点事件
  const handleInputBlur = () => {
    // 如果输入框为空或输入无效，恢复为有效的数量值
    if (inputValue === "" || isNaN(parseFloat(inputValue)) || parseFloat(inputValue) <= 0) {
      setInputValue(localQuantity.toString());
    } else {
      // 应用四舍五入并更新显示值
      const parsedValue = parseFloat(inputValue);
      const roundedValue = Math.round(parsedValue);
      setLocalQuantity(roundedValue);
      setInputValue(roundedValue.toString());
      onQuantityChange(roundedValue);
    }
  };

  // 处理数量变化，确保是大于0的整数
  const handleQuantityChange = (newQuantity: number) => {
    // 确保数量是整数且大于0
    const validQuantity = Math.max(1, Math.floor(newQuantity));
    setLocalQuantity(validQuantity);
    setInputValue(validQuantity.toString());
    onQuantityChange(validQuantity);
  };

  // 格式化价格显示
  const formattedPrice = price !== undefined ? price.toLocaleString("en-US", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
  }) : "0.000";

  // 渲染星级评分
  const renderStars = () => {
    const stars = [];
    const ratingValue = rating || 0; // 确保rating有值
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={`star ${i < Math.floor(ratingValue) ? "filled" : "empty"}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="product-detail-card">
      <div className="product-detail-image-container">
        <img src={image} alt={name} className="product-detail-image" />
      </div>
      
      <div className="product-detail-info">
        <h1 className="product-detail-name">{name}</h1>
        
        <div className="product-detail-rating">
          <div className="stars">{renderStars()}</div>
          <span className="rating-value">{(rating || 0).toFixed(1)}</span>
          <span className="review-count">({reviewCount || 0} Reviews)</span>
        </div>
        
        <p className="product-detail-price">
          {currency}{formattedPrice} {unit && `/ ${unit}`}
        </p>
        
        <div className="product-detail-section">
          <h2 className="section-title">Details</h2>
          <div className="detail-item">
            <span className="detail-label">Production</span>
            <span className="detail-value">{origin}</span>
          </div>
          <p className="product-detail-description">{description}</p>
        </div>
        
        {/* 数量选择 */}
        <div className="quantity-control">
          <button 
            className="quantity-btn" 
            onClick={() => handleQuantityChange(localQuantity - 1)}
            disabled={localQuantity <= 1} // 当数量为1时禁用减号按钮
          >
            -
          </button>
          <div className="quantity-value">
            <input 
              type="text" 
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className="quantity-input"
              aria-label="quantity"
            />
          </div>
          <button 
            className="quantity-btn" 
            onClick={() => handleQuantityChange(localQuantity + 1)}
          >
            +
          </button>
        </div>
        
        {/* 添加到购物车按钮 */}
        <button className="add-to-cart-btn" onClick={onAddToCart}>
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductDetailCard;