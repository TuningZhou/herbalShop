import React, { useState, useEffect } from "react"; // 导入 useEffect
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import OrderCard from "../../components/ui/OrderCard";
import OrderSummary from "../../components/ui/OrderSummary";
import PaymentMethods from "../../components/ui/PaymentMethods";
import Footer from "../../components/layout/Footer";
import { TelegramBackButtonSDK } from "../../services/telegramsdk/TelegramBackButton"; // 新增导入
import "./Checkout.css";

// 支付方式类型
type PaymentMethod = "gpay" | "applepay" | "crypto";

const Checkout: React.FC = () => {
  const { 
    items, 
    updateQuantity, // 确保这里是 updateQuantity
    removeFromCart, // 确保这里是 removeFromCart
    clearCart 
  } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("gpay");
  const [isAgeConfirmed, setIsAgeConfirmed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // 添加 Telegram BackButton 逻辑
  useEffect(() => {
    // 检查支持性
    if (TelegramBackButtonSDK.Support.isSupported()) {
      // 挂载返回按钮
      TelegramBackButtonSDK.Lifecycle.mount();

      // 显示返回按钮
      TelegramBackButtonSDK.Display.show();

      // 添加点击事件
      const off = TelegramBackButtonSDK.Events.onClick(() => {
        navigate(-1); // 返回上一页
      });

      // 返回清理函数
      return () => {
        off();
        TelegramBackButtonSDK.Lifecycle.unmount();
      };
    }
  }, [navigate]); // 依赖 navigate

  // 计算小计
  const subtotal = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  // 折扣百分比
  const discountPercentage = 10;

  // 处理数量增减
  const handleIncrement = (productId: string) => {
    const item = items.find(item => item.productId === productId);
    if (item) {
      updateQuantity(productId, item.quantity + 1); // 使用 updateQuantity
    }
  };

  const handleDecrement = (productId: string) => {
    const item = items.find(item => item.productId === productId);
    if (item) {
      if (item.quantity > 1) {
        updateQuantity(productId, item.quantity - 1); // 使用 updateQuantity
      } else {
        // 当数量为1时，再点击减号，则移除商品
        removeFromCart(productId); // 使用 removeFromCart
      }
    }
  };

  // 处理支付方式选择
  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setPaymentMethod(method);
  };

  // 处理订单确认
  const handleConfirmOrder = () => {
    if (!isAgeConfirmed) {
      alert("请确认您已年满18岁");
      return;
    }

    setIsProcessing(true);
    
    // 模拟支付处理
    setTimeout(() => {
      // 实际项目中应调用支付接口
      console.log("Order confirmed with payment method:", paymentMethod);
      console.log("Order items:", items);
      
      clearCart();
      setIsProcessing(false);
      
      // 跳转到成功页面
      navigate("/order-success");
    }, 1500);
  };

  return (
    <div className="checkout-page">
      <h1 className="checkout-title">Order Summary</h1>

      <div className="order-items">
        {items.map((item) => (
          <OrderCard
            key={item.productId}
            image={item.image}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onIncrement={() => handleIncrement(item.productId)}
            onDecrement={() => handleDecrement(item.productId)}
          />
        ))}
      </div>

      <OrderSummary
        subtotal={subtotal}
        discountPercentage={discountPercentage}
        hasWeightedProduct={true}
      />

      <div className="payment-section">
        <h2 className="section-title">Payment Method</h2>
        <PaymentMethods
          onSelectMethod={handlePaymentMethodSelect}
          selectedMethod={paymentMethod}
        />
      </div>

      <div className="age-confirmation">
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={isAgeConfirmed}
            onChange={() => setIsAgeConfirmed(!isAgeConfirmed)}
          />
          <span className="checkmark"></span>
          <span className="checkbox-text">
            The order has products with age restrictions. I confirm that I am at least 18 years old.
          </span>
        </label>
      </div>

      {/* 使用Footer组件并添加主按钮 */}
      <Footer
        mainButtonText="CONFIRM THE ORDER"
        mainButtonOnClick={handleConfirmOrder}
        mainButtonEnabled={!isProcessing && isAgeConfirmed}
        mainButtonVisible={true}
        mainButtonBackgroundColor="#F55266"
      />
    </div>
  );
};

export default Checkout;
