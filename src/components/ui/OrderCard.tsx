import React from "react";
import "./OrderCard.css";
import env from "../../config/env"; // 导入环境配置

interface OrderCardProps {
  image: string;
  name: string;
  price: number;
  currency?: string;
  unit?: string;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({
  image,
  name,
  price,
  currency = "$",
  unit = "Can",
  quantity,
  onIncrement,
  onDecrement,
}) => {
  // 格式化价格显示，添加对 price 为 undefined 的检查
  const formattedPrice = price !== undefined ? price.toLocaleString("en-US", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
  }) : "0.000";

  // 计算总价
  const totalPrice = price !== undefined ? price * quantity : 0;
  
  // 格式化总价显示
  const formattedTotalPrice = totalPrice.toLocaleString("en-US", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
  });

  // 复用 ProductCard 的图片处理逻辑
  const imageUrl = image.startsWith('http') 
    ? image 
    : `${env.r2BaseUrl}/${env.r2ImagesPath}/${image}`;

  return (
    <div className="order-card">
      <div className="order-card-image-container">
        <img src={imageUrl} alt={name} className="order-card-image" />
      </div>
      <div className="order-card-content">
        <h3 className="order-card-title">{name}</h3>
        <p className="order-card-price">
          {currency} {formattedPrice} / {unit}
        </p>
        <div className="order-card-quantity">
          <span>QTY: {quantity}</span>
          <div className="quantity-controls">
            <button 
              className="quantity-button" 
              onClick={onDecrement}
              // 移除 disabled 属性，允许数量减到 0
            >
              -
            </button>
            <button 
              className="quantity-button" 
              onClick={onIncrement}
            >
              +
            </button>
          </div>
        </div>
        <div className="order-card-total">
          <span>Total:</span>
          <span>{currency} {formattedTotalPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;