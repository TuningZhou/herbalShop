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
  const initSDK = () => {
    try {
      // 检查 Telegram WebApp 是否可用
      if (
        typeof window !== "undefined" &&
        window.Telegram &&
        window.Telegram.WebApp
      ) {
        console.log('Telegram WebApp 检测到，开始初始化...');
        
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
        
        console.log('Telegram WebApp 初始化完成');
        console.log('WebApp 信息:', {
          version: window.Telegram.WebApp.version,
          platform: window.Telegram.WebApp.platform,
          colorScheme: window.Telegram.WebApp.colorScheme,
          themeParams: window.Telegram.WebApp.themeParams,
          initData: window.Telegram.WebApp.initData,
          initDataUnsafe: window.Telegram.WebApp.initDataUnsafe
        });
      } else {
        console.log('Telegram WebApp 不可用，可能在非 Telegram 环境中运行');
      }
    } catch (error) {
      console.error('Telegram SDK 初始化失败:', error);
    }
  };

  // 如果 DOM 已经加载完成，立即初始化
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(initSDK, 100);
  } else {
    // 否则等待 DOM 加载完成
    document.addEventListener('DOMContentLoaded', initSDK);
    window.addEventListener('load', initSDK);
  }
};

// 动态获取 basename
// 获取正确的 basename
const getBasename = (): string => {
  // 检查是否在 Telegram 环境中
  if (typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp) {
    console.log('检测到 Telegram 环境');
    // 在Telegram环境中，始终使用根路径
    console.log('Telegram环境 - 使用根路径');
    return "/";
  }
  // 非 Telegram 环境使用子路径
  console.log('非 Telegram 环境，使用 /herbalShop 路径');
  return "/herbalShop";
};

// 使用BrowserRouter和Routes
const App: React.FC = () => {
  const [basename, setBasename] = React.useState("/");
  
  // 初始化Telegram SDK
  React.useEffect(() => {
    // 先设置 basename
    const detectedBasename = getBasename();
    console.log('设置 basename:', detectedBasename);
    setBasename(detectedBasename);
    
    // 延迟初始化 SDK，确保 DOM 准备就绪
    setTimeout(() => {
      initTelegramSDK();
    }, 200);
  }, []);

  console.log('当前 basename:', basename);
  console.log('当前 URL:', window.location.href);

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
