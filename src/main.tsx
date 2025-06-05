import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import "./styles/telegram-theme.css";

console.log('React is starting...'); 

// 添加全局错误处理
window.addEventListener('error', (event) => {
  console.error('全局错误:', event.error);
  
  // 如果在 Telegram 环境中，显示友好的错误信息
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.showAlert(`应用出现错误: ${event.message}`);
  }
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('未处理的 Promise 拒绝:', event.reason);
  
  // 如果在 Telegram 环境中，显示友好的错误信息
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.showAlert(`应用出现错误: ${event.reason}`);
  }
});

// 确保 root 元素存在
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error('找不到 root 元素');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
);
