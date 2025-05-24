import React from "react";
import "./OrderSummary.css";

interface OrderSummaryProps {
  subtotal: number;
  discount?: number;
  discountPercentage?: number;
  currency?: string;
  hasWeightedProduct?: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  discount = 0,
  discountPercentage = 0,
  currency = "$",
  hasWeightedProduct = false,
}) => {
  // 计算折扣金额
  const discountAmount = discount || (subtotal * discountPercentage) / 100;
  
  // 计算总金额
  const total = subtotal - discountAmount;

  // 格式化金额显示
  const formatPrice = (price: number) => {
    return price.toLocaleString("en-US", {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    });
  };

  return (
    <div className="order-summary">
      <div className="summary-row">
        <span className="summary-label">Subtotal ({2} items):</span>
        <span className="summary-value">{currency}{formatPrice(subtotal)}</span>
      </div>
      
      {discountAmount > 0 && (
        <div className="summary-row discount">
          <span className="summary-label">
            Saving (Discount {discountPercentage}%):
          </span>
          <span className="summary-value discount-value">
            -{currency}{formatPrice(discountAmount)}
          </span>
        </div>
      )}
      
      <div className="summary-divider"></div>
      
      <div className="summary-row total">
        <span className="summary-label">Estimated total:</span>
        <span className="summary-value total-value">
          {currency}{formatPrice(total)}
        </span>
      </div>
      
      {hasWeightedProduct && (
        <div className="weighted-product-notice">
          <span className="notice-icon">ⓘ</span>
          <p>
            There is a weighted product in the cart. The actual amount may differ from the indicated amount.
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;