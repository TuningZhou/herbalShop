// Telegram SDK backbutton 集成
import {
  init,
  backButton,
  isBackButtonSupported,
  mountBackButton,
  unmountBackButton,
  showBackButton,
  hideBackButton,
  onBackButtonClick,
  offBackButtonClick,
  isBackButtonMounted,
  isBackButtonVisible,
  on,
  off
} from '@telegram-apps/sdk';

// ========================
// 🚀 SDK 初始化
// ========================
// 必须在使用前调用 init()
// 在init()调用后添加
init();


// ========================
// 🔍 支持性检查模块
// ========================
export const BackButtonSupport = {
  /**
   * 检查当前环境是否支持返回按钮
   * @returns boolean
   */
  isSupported: (): boolean => backButton.isSupported(),
  /**
   * 替代方式检查支持性（函数式）
   * @returns boolean
   */
  isSupportedAlternative: (): boolean => isBackButtonSupported()
};

// ========================
// ⚙️ 生命周期控制模块
// ========================
export const BackButtonLifecycle = {
  /**
   * 挂载返回按钮（需检查可用性）
   */
  mount: () => {
    if (backButton.mount.isAvailable()) {
      backButton.mount();
    }
  },
  /**
   * 替代方式挂载（函数式）
   */
  mountAlternative: () => mountBackButton(),
  /**
   * 卸载返回按钮
   */
  unmount: () => backButton.unmount(),
  /**
   * 替代方式卸载（函数式）
   */
  unmountAlternative: () => unmountBackButton()
};

// ========================
// 👁️ 状态管理模块
// ========================
export const BackButtonState = {
  /**
   * 检查按钮是否已挂载
   * @returns boolean
   */
  isMounted: (): boolean => backButton.isMounted(),
  /**
   * 替代方式检查挂载状态（函数式）
   * @returns boolean
   */
  isMountedAlternative: (): boolean => isBackButtonMounted(),
  /**
   * 检查按钮是否可见
   * @returns boolean
   */
  isVisible: (): boolean => backButton.isVisible(),
  /**
   * 替代方式检查可见性（函数式）
   * @returns boolean
   */
  isVisibleAlternative: (): boolean => isBackButtonVisible()
};

// ========================
// 🎨 显示控制模块
// ========================
export const BackButtonDisplay = {
  /**
   * 显示返回按钮（需检查可用性）
   */
  show: () => {
    if (backButton.show.isAvailable()) {
      backButton.show();
    }
  },
  /**
   * 替代方式显示（函数式）
   */
  showAlternative: () => showBackButton(),
  /**
   * 隐藏返回按钮
   */
  hide: () => backButton.hide(),
  /**
   * 替代方式隐藏（函数式）
   */
  hideAlternative: () => hideBackButton()
};

// ========================
// 📢 原生事件监听模块
// ========================
export const BackButtonEvents = {
  /**
   * 添加返回按钮点击事件监听器
   * @param listener 回调函数
   * @returns 解绑函数
   */
  onClick: (listener: () => void): (() => void) => {
    if (backButton.onClick.isAvailable()) {
      const off = backButton.onClick(listener);
      return off;
    }
    return () => {}; // 空函数作为降级处理
  },
  /**
   * 替代方式添加点击事件（函数式）
   * @param listener 回调函数
   */
  onClickAlternative: (listener: () => void) => onBackButtonClick(listener),
  /**
   * 移除返回按钮点击事件监听器
   * @param listener 要移除的回调函数
   */
  offClick: (listener: () => void) => backButton.offClick(listener),
  /**
   * 替代方式移除点击事件（函数式）
   * @param listener 要移除的回调函数
   */
  offClickAlternative: (listener: () => void) => offBackButtonClick(listener)
};

// ========================
// 📡 跨平台事件监听模块
// ========================
export const TelegramEvents = {
  /**
   * 监听全局事件（如 viewport_changed, theme_changed）
   * @param eventType 事件类型
   * @param listener 回调函数
   * @returns 解绑函数
   */
  onEvent: <T>(eventType: string, listener: (payload: T) => void): (() => void) => {
    const handler = (payload: T) => listener(payload);
    on(eventType as any, handler);
    return () => off(eventType as any, handler);
  }
};

// ========================
// 📦 导出统一命名空间
// ========================
export const TelegramBackButtonSDK = {
  Support: BackButtonSupport,
  Lifecycle: BackButtonLifecycle,
  State: BackButtonState,
  Display: BackButtonDisplay,
  Events: BackButtonEvents,
  TelegramEvents
};
// 使用示例
// 示例 1：基础功能调用
// import { TelegramBackButtonSDK } from './TelegramBackButton';

// const { Support, Lifecycle, Display, Events } = TelegramBackButtonSDK;

// if (Support.isSupported()) {
//   Lifecycle.mount();
//   Display.show();

//   const off = Events.onClick(() => {
//     console.log('返回按钮点击');
//     off(); // 解绑事件
//   });
// }

// // 示例 2：监听全局事件（如视口变化）
// TelegramBackButtonSDK.TelegramEvents.onEvent<{
//   width: number;
//   height: number;
//   is_expanded: boolean;
// }>('viewport_changed', (payload) => {
//   console.log('视口变化:', payload);
// });
