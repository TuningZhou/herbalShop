// src/pages/LandingPage02.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable"; // 新增导入
import "../styles/landing-pages.css";
import { TelegramMainButtonSDK } from "../services/telegramsdk/TelegramMainButton";
import { TelegramBackButtonSDK } from "../services/telegramsdk/TelegramBackButton";
import herbsCollectionImage from "@/assets/images/herbs-collection.png";

const LandingPage02: React.FC = () => {
  const navigate = useNavigate();

  // 添加 Telegram BackButton
  useEffect(() => {
    // 检查支持性
    if (TelegramBackButtonSDK.Support.isSupported()) {
      // 挂载返回按钮
      TelegramBackButtonSDK.Lifecycle.mount();

      // 显示返回按钮
      TelegramBackButtonSDK.Display.show();

      // 添加点击事件
      const off = TelegramBackButtonSDK.Events.onClick(() => {
        navigate(-1);
      });

      // 返回清理函数
      return () => {
        off();
        TelegramBackButtonSDK.Lifecycle.unmount();
      };
    }
  }, [navigate]);

  // 添加 Telegram MainButton
  useEffect(() => {
    // 检查支持性
    if (TelegramMainButtonSDK.Support.isSupported()) {
      // 挂载按钮
      TelegramMainButtonSDK.Lifecycle.mount();

      // 设置按钮文本和属性
      TelegramMainButtonSDK.Properties.setParams({
        text: "NEXT",
        isVisible: true,
        isEnabled: true,
      });

      // 添加点击事件
      const off = TelegramMainButtonSDK.Events.onClick(() => {
        navigate("/landing-final");
      });

      // 返回清理函数
      return () => {
        off();
        TelegramMainButtonSDK.Lifecycle.unmount();
      };
    }
  }, [navigate]);

  // 滑动处理
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => navigate("/landing-final"),
    onSwipedRight: () => navigate("/landing-1"),
    trackMouse: true, // 可选：允许鼠标滑动测试
  });

  return (
    <div className="landing-page landing-page-02" {...swipeHandlers}>
      {" "}
      {/* 应用滑动处理 */}
      <div className="landing-content">
        <h1>Welcome to HerbalShop</h1>
        <div className="herb-image-container">
          <img
            src={herbsCollectionImage}
            alt="Herbs Collection"
            className="landing-image"
          />
        </div>
        <p className="landing-description">
          The best herbal products purchase online service ever
        </p>

        {/* 添加页面指示器 */}
        <div className="page-indicators">
          <span
            className="indicator"
            onClick={() => navigate("/landing-1")}
          ></span>
          <span
            className="indicator active"
            onClick={() => navigate("/landing-2")}
          ></span>
          <span
            className="indicator"
            onClick={() => navigate("/landing-final")}
          ></span>
        </div>
      </div>
    </div>
  );
};

export default LandingPage02;
