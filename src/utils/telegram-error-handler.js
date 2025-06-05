// 专门用于 Telegram Mini App 的错误处理
window.addEventListener('error', (event) => {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.showAlert(`Error: ${event.message}`);
  }
  console.error('Telegram Mini App Error:', event);
});