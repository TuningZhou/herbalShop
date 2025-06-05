import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { TelegramBackButtonSDK } from "./services/telegramsdk/TelegramBackButton";
import ProductHome from "./pages/shop/ProductHome";
import ProductDetail from "./pages/shop/ProductDetail";
import Checkout from "./pages/cart/Checkout";
import Settings from "./pages/user/Settings";
import Profile from "./pages/user/Profile";
import Layout from "./components/layout/Layout";
import LandingPage01 from "./pages/LandingPage01";
import LandingPage02 from "./pages/LandingPage02";
import LandingPageFinal from "./pages/LandingPageFinal";
import "./styles/telegram-button.css";

console.log("App is rendering...");

// 初始化Telegram SDK
const initTelegramSDK = () => {
  // 等待 DOM 完全加载
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initTelegramSDKInternal();
    });
  } else {
    initTelegramSDKInternal();
  }
};

const initTelegramSDKInternal = () => {
  try {
    // 检查 Telegram WebApp 是否可用
    if (
      typeof window !== "undefined" &&
      window.Telegram &&
      window.Telegram.WebApp
    ) {
      // 初始化 Telegram WebApp
      window.Telegram.WebApp.ready();
      
      // 展开 WebApp 到全屏
      window.Telegram.WebApp.expand();
      
      // 启用关闭确认
      window.Telegram.WebApp.enableClosingConfirmation();
      
      // 检查是否支持返回按钮
      if (TelegramBackButtonSDK.Support.isSupported()) {
        // 挂载返回按钮
        TelegramBackButtonSDK.Lifecycle.mount();
      }

      // 添加 Telegram WebApp 标识类
      document.body.classList.add("with-telegram-webapp");
      
      console.log('Telegram WebApp 初始化成功');
    } else {
      console.warn('Telegram WebApp 不可用');
    }
  } catch (error) {
    console.error('Telegram SDK 初始化失败:', error);
  }
};

// 动态获取 basename
const getBasename = () => {
  // 检查是否在 Telegram 环境中
  if (typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp) {
    return "/"; // Telegram 环境使用根路径
  }
  // 非 Telegram 环境使用子路径
  return "/herbalShop";
};

// 使用BrowserRouter和Routes
const App: React.FC = () => {
  const [basename, setBasename] = React.useState("/");
  
  // 初始化Telegram SDK
  React.useEffect(() => {
    initTelegramSDK();
    
    // 设置正确的 basename
    setBasename(getBasename());
  }, []);

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Navigate to="/landing-1" replace />} />
        
        {/* 添加重定向路由 */}
        <Route path="/user" element={<Navigate to="/shop/user" replace />} />

        <Route path="/landing-1" element={<LandingPage01 />} />

        <Route path="/landing-2" element={<LandingPage02 />} />

        <Route path="/landing-final" element={<LandingPageFinal />} />

        <Route
          path="/shop"
          element={
            <Layout
              headerTitle="Herbal Shop"
              showFooter={true}
              showHeader={false}
            >
            </Layout>
          }
        >
          <Route index element={<ProductHome />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Checkout />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="user" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
