import fs from 'fs';
import path from 'path';

// 检查是否为 Telegram 构建模式
const isTelegramBuild = process.argv.includes('--telegram') || 
                       process.env.VITE_MODE === 'telegram' ||
                       process.env.NODE_ENV === 'telegram';

const basePath = isTelegramBuild ? './' : '/herbalShop/';

console.log(`🚀 构建模式: ${isTelegramBuild ? 'Telegram Mini App' : 'Web'}`);
console.log(`📁 基础路径: ${basePath}`);

// 创建 404.html 文件
const notFoundContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Page Not Found</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
        h1 { color: #333; }
        p { color: #666; }
        a { color: #007AFF; text-decoration: none; }
    </style>
</head>
<body>
    <h1>404 - Page Not Found</h1>
    <p>The requested resource could not be found.</p>
    <a href="${basePath}">Back To Home</a>
</body>
</html>`;

fs.writeFileSync(path.join(process.cwd(), 'dist', '404.html'), notFoundContent);
console.log('✅ 已创建 404.html 文件');

// 修复 _headers 文件 - 关键修复CSP策略
const headersContent = `/*
  Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://telegram.org https://*.telegram.org https://static.cloudflareinsights.com https://*.cloudflareinsights.com https://*.cloudflare.com; img-src 'self' data: https: blob:; font-src 'self' data: https:; connect-src 'self' https: wss: https://*.cloudflareinsights.com; frame-src 'self' https://telegram.org https://*.telegram.org; object-src 'none'; base-uri 'self';
  X-Content-Type-Options: nosniff
  X-Frame-Options: ALLOWALL
  Cache-Control: public, max-age=3600

/assets/*.css
  Content-Type: text/css; charset=utf-8
  Cache-Control: public, max-age=31536000

/assets/*.js
  Content-Type: application/javascript; charset=utf-8
  Cache-Control: public, max-age=31536000

/assets/*.png
  Content-Type: image/png
  Cache-Control: public, max-age=31536000

/assets/*.jpg
  Content-Type: image/jpeg
  Cache-Control: public, max-age=31536000

/assets/*.svg
  Content-Type: image/svg+xml
  Cache-Control: public, max-age=31536000

/assets/*.woff2
  Content-Type: font/woff2
  Cache-Control: public, max-age=31536000`;

fs.writeFileSync(path.join(process.cwd(), 'dist', '_headers'), headersContent);
console.log('✅ 已创建优化的 _headers 文件');

// 修复 index.html 中的资源路径
const indexPath = path.join(process.cwd(), 'dist', 'index.html');
if (fs.existsSync(indexPath)) {
  let indexContent = fs.readFileSync(indexPath, 'utf-8');
  
  if (isTelegramBuild) {
    // Telegram模式：使用相对路径
    indexContent = indexContent.replace(/href="\//g, 'href="./');
    indexContent = indexContent.replace(/src="\//g, 'src="./');
    console.log('✅ 已修复 index.html 资源路径为相对路径');
  }
  
  fs.writeFileSync(indexPath, indexContent);
}

console.log('🎉 构建后处理完成！');
console.log(`📦 构建模式: ${isTelegramBuild ? 'Telegram Mini App' : 'Web'}`);
console.log(`🌐 基础路径: ${basePath}`);