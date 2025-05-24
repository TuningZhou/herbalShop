import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import "../../styles/telegram-button.css";

interface LayoutProps {
  children?: React.ReactNode; // 将 children 属性设置为可选
  headerTitle?: string;
  showFooter?: boolean;
  showHeader?: boolean; // 新增属性
}

const Layout: React.FC<LayoutProps> = ({
  children,
  headerTitle = "Herbal Shop",
  showFooter = true,
  showHeader = true, // 默认显示 Header
}) => {
  // 检测是否在 Telegram WebApp 环境中
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.Telegram &&
      window.Telegram.WebApp
    ) {
      document.body.classList.add("with-telegram-webapp");
    }

    return () => {
      document.body.classList.remove("with-telegram-webapp");
    };
  }, []);

  return (
    <div className="app-container">
      {showHeader && <Header title={headerTitle} showBackButton={true} />}
      <main className="main-content">
        {/* 使用 Outlet 渲染子路由内容 */}
        <Outlet />
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
