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


// 初始化Telegram SDK
const initTelegramSDK = () => {
  // 检查是否支持返回按钮
  if (TelegramBackButtonSDK.Support.isSupported()) {
    // 挂载返回按钮
    TelegramBackButtonSDK.Lifecycle.mount();
  }

  // 添加 Telegram WebApp 标识类
  if (
    typeof window !== "undefined" &&
    window.Telegram &&
    window.Telegram.WebApp
  ) {
    document.body.classList.add("with-telegram-webapp");
  }
};

// 使用BrowserRouter和Routes
const App: React.FC = () => {
  // 初始化Telegram SDK
  React.useEffect(() => {
    initTelegramSDK();
  }, []);

  return (
    <BrowserRouter>
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
              {/* 子路由将通过 Layout 组件中的 Outlet 渲染 */}
              {/* <ShopPage /> <-- 移除此行 */}
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
