import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import './styles/telegram-theme.css';

// 添加全局错误处理
window.addEventListener('error', (event) => {
  console.error('全局错误:', event.error);
  console.error('错误详情:', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno
  });
});

// 添加未处理的 Promise 拒绝处理
window.addEventListener('unhandledrejection', (event) => {
  console.error('未处理的 Promise 拒绝:', event.reason);
});

// 等待Telegram WebApp准备就绪
const initApp = () => {
  // 调试信息
  console.log('环境信息:', {
    userAgent: navigator.userAgent,
    url: window.location.href,
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
    telegramAvailable: !!(window as any).Telegram?.WebApp,
    telegramWebApp: (window as any).Telegram?.WebApp
  });

  // 检查Telegram WebApp是否可用
  if ((window as any).Telegram?.WebApp) {
    console.log('Telegram WebApp 可用，等待ready事件');
    (window as any).Telegram.WebApp.ready();
  }

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <AuthProvider>
        <UserProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </UserProvider>
      </AuthProvider>
    </React.StrictMode>,
  );
};

// 等待DOM和Telegram SDK准备就绪
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
