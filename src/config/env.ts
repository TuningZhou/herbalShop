// 环境配置
const config = {
  development: {
    r2BaseUrl: "https://pub-2ff14554386b479b8ec529dfd5061359.r2.dev",
    r2ImagesPath1: "Avatars",
    r2ImagesPath2: "icons",
    r2ImagesPath: "products" // 新增这一行
  },
  production: {
    // 生产环境的 URL 将在部署时设置
    r2BaseUrl: "https://your-production-r2-url.r2.dev",
    r2ImagesPath1: "Avatars",
    r2ImagesPath2: "icons",
    r2ImagesPath: "products" // 新增这一行
  }
};

// 根据环境变量选择配置
const env = process.env.NODE_ENV === "production" ? "production" : "development";

export default config[env];