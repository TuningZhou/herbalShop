import React, { useState } from "react";
import "./PaymentMethods.css";
import ApplePayIcon from "@/assets/icons/payment/ApplePay.svg?react";
import CryptoPayIcon from "@/assets/icons/payment/CryptoPay.svg?react";
import GooglePayIcon from "@/assets/icons/payment/GooglePay.svg?react";
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
//  const getImageUrl = (imageName: string) => {
//    return `${env.r2BaseUrl}/${env.r2ImagesPath2}/${imageName}`;  };

  return (
    <div className="payment-methods">
      <div 
        className={`payment-method ${selectedMethod === "gpay" ? "selected" : ""}`}
        onClick={() => handleMethodSelect("gpay")}
      >
        {/* 直接使用 SVG 组件 */}
        <GooglePayIcon className="payment-logo" />
      </div>
      
      <div 
        className={`payment-method ${selectedMethod === "applepay" ? "selected" : ""}`}
        onClick={() => handleMethodSelect("applepay")}
      >
        {/* 直接使用 SVG 组件 */}
        <ApplePayIcon className="payment-logo" />
      </div>
      
      <div 
        className={`payment-method ${selectedMethod === "crypto" ? "selected" : ""}`}
        onClick={() => handleMethodSelect("crypto")}
      >
        {/* 直接使用 SVG 组件 */}
        <CryptoPayIcon className="payment-logo" />
      </div>
    </div>
  );
};

export default PaymentMethods;