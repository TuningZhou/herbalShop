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

// 修复 _headers 文件格式 - 添加 Cloudflare 域名支持
const headersContent = isTelegramBuild ? 
`/*
  Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://telegram.org https://static.cloudflareinsights.com https://*.cloudflareinsights.com; img-src 'self' data: https: blob:; font-src 'self' data:; connect-src 'self' https: wss:; frame-src 'self' https://telegram.org;
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
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
  Cache-Control: public, max-age=31536000` :
`/herbalShop/*
  Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com https://*.cloudflareinsights.com; img-src 'self' data: https: blob:; font-src 'self' data:; connect-src 'self' https: wss:; frame-src 'self';
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Cache-Control: public, max-age=3600

/herbalShop/assets/*.css
  Content-Type: text/css; charset=utf-8
  Cache-Control: public, max-age=31536000

/herbalShop/assets/*.js
  Content-Type: application/javascript; charset=utf-8
  Cache-Control: public, max-age=31536000

/herbalShop/assets/*.png
  Content-Type: image/png
  Cache-Control: public, max-age=31536000

/herbalShop/assets/*.jpg
  Content-Type: image/jpeg
  Cache-Control: public, max-age=31536000

/herbalShop/assets/*.svg
  Content-Type: image/svg+xml
  Cache-Control: public, max-age=31536000

/herbalShop/assets/*.woff2
  Content-Type: font/woff2
  Cache-Control: public, max-age=31536000`;

fs.writeFileSync(path.join(process.cwd(), 'dist', '_headers'), headersContent);
console.log('✅ 已创建优化的 _headers 文件');

// 创建 .nojekyll 文件
fs.writeFileSync(path.join(process.cwd(), 'dist', '.nojekyll'), '');
console.log('✅ 已创建 .nojekyll 文件');

// 跨平台文件复制函数
function copyFileSync(src, dest) {
  try {
    const data = fs.readFileSync(src);
    fs.writeFileSync(dest, data);
    return true;
  } catch (error) {
    console.error(`❌ 复制文件失败: ${src} -> ${dest}`, error.message);
    return false;
  }
}

// 复制 _routes.json 文件到 dist 目录
const routesSourcePath = path.join(process.cwd(), '_routes.json');
const routesDestPath = path.join(process.cwd(), 'dist', '_routes.json');

if (fs.existsSync(routesSourcePath)) {
  if (copyFileSync(routesSourcePath, routesDestPath)) {
    console.log('✅ 已复制 _routes.json 文件到 dist 目录');
    
    // 验证 _routes.json 格式
    try {
      const routesContent = fs.readFileSync(routesDestPath, 'utf8');
      JSON.parse(routesContent);
      console.log('✅ _routes.json 格式验证通过');
    } catch (error) {
      console.warn('⚠️ _routes.json 格式可能有问题:', error.message);
    }
  }
} else {
  console.warn('⚠️ 未找到 _routes.json 文件');
}

// 优化 index.html 用于 Telegram Mini App
if (isTelegramBuild) {
  const indexPath = path.join(process.cwd(), 'dist', 'index.html');
  
  if (fs.existsSync(indexPath)) {
    let indexContent = fs.readFileSync(indexPath, 'utf8');
    
    // 确保 Telegram Web App SDK 已启用
    if (indexContent.includes('<!-- <script src="https://telegram.org/js/telegram-web-app.js"></script> -->')) {
      indexContent = indexContent.replace(
        '<!-- <script src="https://telegram.org/js/telegram-web-app.js"></script> -->',
        '<script src="https://telegram.org/js/telegram-web-app.js?57"></script>'
      );
    }
    
    // 添加 Telegram 专用 meta 标签
    const telegramMeta = `
  <meta name="telegram-web-app" content="true">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">`;
    
    indexContent = indexContent.replace(
      '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />',
      telegramMeta
    );
    
    fs.writeFileSync(indexPath, indexContent);
    console.log('✅ 已优化 index.html 用于 Telegram Mini App');
  }
}

console.log('🎉 构建后处理完成！');
console.log(`📦 构建模式: ${isTelegramBuild ? 'Telegram Mini App' : 'Web'}`);
console.log(`🌐 基础路径: ${basePath}`);