import React, { useEffect } from "react";
import "./Header.css";
import { TelegramBackButtonSDK } from "../../services/telegramsdk/TelegramBackButton";

const Header: React.FC<{
  title?: string;
  showBackButton?: boolean;
}> = ({ title = "Herbal Shop", showBackButton = true }) => {
  // 控制Telegram返回按钮
  useEffect(() => {
    // 检查是否支持返回按钮
    if (TelegramBackButtonSDK.Support.isSupported()) {
      // 挂载返回按钮
      TelegramBackButtonSDK.Lifecycle.mount();

      if (showBackButton) {
        // 显示返回按钮
        TelegramBackButtonSDK.Display.show();

        // 添加点击事件
        const off = TelegramBackButtonSDK.Events.onClick(() => {
          window.history.back();
        });

        // 返回清理函数
        return () => {
          off();
          TelegramBackButtonSDK.Lifecycle.unmount();
        };
      } else {
        // 隐藏返回按钮
        TelegramBackButtonSDK.Display.hide();
        return () => {
          TelegramBackButtonSDK.Lifecycle.unmount();
        };
      }
    }
  }, [showBackButton]);

  return (
    <header className="header">
      <div className="header-container">
        <img src="/assets/images/logo.png" alt="Logo" className="logo" />

        <h1 className="title">{title}</h1>
      </div>
    </header>
  );
};

export default Header;
