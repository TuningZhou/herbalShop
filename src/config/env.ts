// src/config/env.ts
export const API_WORKER_URL = import.meta.env.VITE_API_WORKER_URL as string;
export const R2_IMAGE_HANDLER_URL = import.meta.env.VITE_R2_IMAGE_HANDLER_URL as string;

if (!API_WORKER_URL) {
  console.warn("VITE_API_WORKER_URL is not defined. API calls may fail.");
}

if (!R2_IMAGE_HANDLER_URL) {
  console.warn("VITE_R2_IMAGE_HANDLER_URL is not defined. Image handling may fail.");
}

// 环境配置
const config = {
  development: {
    r2BaseUrl: "https://raw.githubusercontent.com/TuningZhou/herbalShop/refs/heads/main/src/assets/images",
    r2ImagesPath1: "avatars",
    r2ImagesPath2: "icons",
    r2ImagesPath: "products" // 新增这一行
  },
  production: {
    // 生产环境的 URL 将在部署时设置
    r2BaseUrl: "https://raw.githubusercontent.com/TuningZhou/herbalShop/refs/heads/main/src/assets/images",
    r2ImagesPath1: "avatars",
    r2ImagesPath2: "icons",
    r2ImagesPath: "products" // 新增这一行
  }
};

// 根据环境变量选择配置
const env = process.env.NODE_ENV === "production" ? "production" : "development";

export default config[env];