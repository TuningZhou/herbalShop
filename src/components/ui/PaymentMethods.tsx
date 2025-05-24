import React, { useState } from "react";
import "./PaymentMethods.css";
import env from "../../config/env";

// 支付方式类型
type PaymentMethod = "gpay" | "applepay" | "crypto";

interface PaymentMethodsProps {
  onSelectMethod: (method: PaymentMethod) => void;
  selectedMethod?: PaymentMethod;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  onSelectMethod,
  selectedMethod = "gpay",
}) => {
  const handleMethodSelect = (method: PaymentMethod) => {
    onSelectMethod(method);
  };

  // 构建 Cloudflare R2 SVG URL 的函数
  const getImageUrl = (imageName: string) => {
    return `${env.r2BaseUrl}/${env.r2ImagesPath2}/${imageName}`;
  };

  return (
    <div className="payment-methods">
      <div 
        className={`payment-method ${selectedMethod === "gpay" ? "selected" : ""}`}
        onClick={() => handleMethodSelect("gpay")}
      >
        <img 
          src={getImageUrl("GooglePay.svg")} 
          alt="Google Pay" 
          className="payment-logo"
          onError={(e) => {
            // 使用 env 配置构建回退 URL
            e.currentTarget.src = getImageUrl("GooglePay.svg"); 
          }}
        />
      </div>
      
      <div 
        className={`payment-method ${selectedMethod === "applepay" ? "selected" : ""}`}
        onClick={() => handleMethodSelect("applepay")}
      >
        <img 
          src={getImageUrl("ApplePay.svg")} 
          alt="Apple Pay" 
          className="payment-logo"
          onError={(e) => {
            // 使用 env 配置构建回退 URL
            e.currentTarget.src = getImageUrl("ApplePay.svg");
          }}
        />
      </div>
      
      <div 
        className={`payment-method ${selectedMethod === "crypto" ? "selected" : ""}`}
        onClick={() => handleMethodSelect("crypto")}
      >
        <img 
          src={getImageUrl("CryptoPay.svg")} 
          alt="Crypto" 
          className="payment-logo"
          onError={(e) => {
            // 使用 env 配置构建回退 URL
            e.currentTarget.src = getImageUrl("CryptoPay.svg"); 
          }}
        />
      </div>
    </div>
  );
};

export default PaymentMethods;