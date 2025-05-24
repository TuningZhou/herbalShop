// Telegram SDK mainButton 集成
import {
  init,
  mainButton,
  mountMainButton,
  unmountMainButton,
  setMainButtonParams,
  isMainButtonMounted,
  isMainButtonVisible,
  isMainButtonEnabled,
  isMainButtonLoaderVisible,
  mainButtonBackgroundColor,
  mainButtonHasShineEffect,
  mainButtonTextColor,
  mainButtonText,
  mainButtonState,
  onMainButtonClick,
  offMainButtonClick
} from '@telegram-apps/sdk';

// ========================
// 🚀 SDK 初始化
// ========================
// 必须在使用前调用 init()
init();

// ========================
// 🔍 支持性检查模块
// ========================
export const MainButtonSupport = {
  /**
   * 检查当前环境是否支持主按钮
   * @returns boolean
   */
  isSupported: (): boolean => typeof mainButton.mount === 'function' && mainButton.mount.isAvailable(),
  /**
   * 替代方式检查支持性（函数式）
   * @returns boolean
   */
  isSupportedAlternative: (): boolean => 
    typeof mountMainButton.isAvailable === 'function' && 
    mountMainButton.isAvailable()
};

// ========================
// ⚙️ 生命周期控制模块
// ========================
export const MainButtonLifecycle = {
  /**
   * 挂载主按钮（需检查可用性）
   */
  mount: () => {
    if (mainButton.mount.isAvailable()) {
      mainButton.mount();
    }
  },
  /**
   * 替代方式挂载（函数式）
   */
  mountAlternative: () => mountMainButton(),
  /**
   * 卸载主按钮
   */
  unmount: () => mainButton.unmount(),
  /**
   * 替代方式卸载（函数式）
   */
  unmountAlternative: () => unmountMainButton()
};

// ========================
// 👁️ 状态管理模块
// ========================
export const MainButtonState = {
  /**
   * 检查按钮是否已挂载
   * @returns boolean
   */
  isMounted: (): boolean => mainButton.isMounted(),
  /**
   * 替代方式检查挂载状态（函数式）
   * @returns boolean
   */
  isMountedAlternative: (): boolean => isMainButtonMounted(),
  /**
   * 检查按钮是否可见
   * @returns boolean
   */
  isVisible: (): boolean => mainButton.isVisible(),
  /**
   * 替代方式检查可见性（函数式）
   * @returns boolean
   */
  isVisibleAlternative: (): boolean => isMainButtonVisible(),
  /**
   * 检查按钮是否启用
   * @returns boolean
   */
  isEnabled: (): boolean => mainButton.isEnabled(),
  /**
   * 替代方式检查启用状态（函数式）
   * @returns boolean
   */
  isEnabledAlternative: (): boolean => isMainButtonEnabled(),
  /**
   * 检查加载器是否可见
   * @returns boolean
   */
  isLoaderVisible: (): boolean => mainButton.isLoaderVisible(),
  /**
   * 替代方式检查加载器状态（函数式）
   * @returns boolean
   */
  isLoaderVisibleAlternative: (): boolean => isMainButtonLoaderVisible()
};

// ========================
// 🎨 属性配置模块
// ========================
export const MainButtonProperties = {
  /**
   * 更新按钮属性
   * @param params 属性配置对象
   */
  setParams: (params: {
    backgroundColor?: string;
    hasShineEffect?: boolean;
    isEnabled?: boolean;
    isLoaderVisible?: boolean;
    isVisible?: boolean;
    text?: string;
    textColor?: string;
  }) => {
    if (mainButton.setParams.isAvailable()) {
      // 创建一个新的参数对象，不包含 backgroundColor
      const { backgroundColor, ...restParams } = params;
      
      // 处理 backgroundColor，确保它符合 #${string} 类型
      let processedParams: any = { ...restParams };
      
      if (backgroundColor !== undefined) {
        if (typeof backgroundColor === 'string') {
          // 确保颜色以 # 开头
          processedParams.backgroundColor = backgroundColor.startsWith('#') 
            ? backgroundColor as `#${string}` 
            : `#${backgroundColor}` as `#${string}`;
        }
      }
      
      mainButton.setParams(processedParams);
    }
  },
  /**
   * 替代方式更新属性（函数式）
   * @param params 属性配置对象
   */
  setParamsAlternative: (params: {
    backgroundColor?: string;
    hasShineEffect?: boolean;
    isEnabled?: boolean;
    isLoaderVisible?: boolean;
    isVisible?: boolean;
    text?: string;
    textColor?: string;
  }) => {
    // 创建一个新的参数对象，不包含 backgroundColor
    const { backgroundColor, ...restParams } = params;
    
    // 处理 backgroundColor，确保它符合 #${string} 类型
    let processedParams: any = { ...restParams };
    
    if (backgroundColor !== undefined) {
      if (typeof backgroundColor === 'string') {
        // 确保颜色以 # 开头
        processedParams.backgroundColor = backgroundColor.startsWith('#') 
          ? backgroundColor as `#${string}` 
          : `#${backgroundColor}` as `#${string}`;
      }
    }
    
    setMainButtonParams(processedParams);
  }
};

// ========================
// 🎨 状态查询模块
// ========================
export const MainButtonQueries = {
  /**
   * 获取背景颜色
   * @returns 背景色（#RRGGBB）
   */
  backgroundColor: (): string => mainButtonBackgroundColor(),
  /**
   * 获取是否启用闪光效果
   * @returns boolean
   */
  hasShineEffect: (): boolean => mainButtonHasShineEffect(),
  /**
   * 获取文本颜色
   * @returns 颜色值（#RRGGBB）
   */
  textColor: (): string => mainButtonTextColor(),
  /**
   * 获取按钮文本
   * @returns string
   */
  text: (): string => mainButtonText(),
  /**
   * 获取当前状态对象
   * @returns 状态对象
   */
  state: () => mainButtonState()
};

// ========================
// 📢 事件监听模块
// ========================
export const MainButtonEvents = {
  /**
   * 添加点击事件监听器
   * @param listener 回调函数
   * @returns 解绑函数
   */
  onClick: (listener: () => void): (() => void) => {
    if (mainButton.onClick.isAvailable()) {
      const off = mainButton.onClick(listener);
      return off;
    }
    return () => {}; // 空函数作为降级处理
  },
  /**
   * 替代方式添加点击事件（函数式）
   * @param listener 回调函数
   */
  onClickAlternative: (listener: () => void) => onMainButtonClick(listener),
  /**
   * 移除点击事件监听器
   * @param listener 要移除的回调函数
   */
  offClick: (listener: () => void) => mainButton.offClick(listener),
  /**
   * 替代方式移除点击事件（函数式）
   * @param listener 要移除的回调函数
   */
  offClickAlternative: (listener: () => void) => offMainButtonClick(listener)
};

// ========================
// 📦 导出统一命名空间
// ========================
export const TelegramMainButtonSDK = {
  Support: MainButtonSupport,
  Lifecycle: MainButtonLifecycle,
  State: MainButtonState,
  Properties: MainButtonProperties,
  Queries: MainButtonQueries,
  Events: MainButtonEvents
};

/*
// 示例 1：基础功能调用
import { TelegramMainButtonSDK } from './TelegramMainButton';

const { Support, Lifecycle, Properties, Events } = TelegramMainButtonSDK;

if (Support.isSupported()) {
  // 挂载按钮
  Lifecycle.mount();
  
  // 设置属性
  Properties.setParams({
    backgroundColor: '#FF5733',
    textColor: '#FFFFFF',
    text: '提交',
    isVisible: true,
    isEnabled: true,
    isLoaderVisible: false,
    hasShineEffect: true
  });

  // 添加点击事件
  const off = Events.onClick(() => {
    console.log('主按钮点击');
    off(); // 解绑事件
  });
}

// 示例 2：获取当前状态
console.log('按钮背景色:', TelegramMainButtonSDK.Queries.backgroundColor());
console.log('按钮状态:', TelegramMainButtonSDK.Queries.state());
*/
