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

// 修复 _headers 文件格式
const headersContent = isTelegramBuild ? 
`/*
  Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://telegram.org https://static.cloudflareinsights.com; img-src 'self' data: https: blob:; font-src 'self' data:; connect-src 'self' https:; frame-src 'self' https://telegram.org;
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
`${basePath}*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: no-referrer
  Cache-Control: public, max-age=3600

${basePath}assets/*.css
  Content-Type: text/css; charset=utf-8
  Cache-Control: public, max-age=31536000
  X-Content-Type-Options: nosniff

${basePath}assets/*.js
  Content-Type: application/javascript; charset=utf-8
  Cache-Control: public, max-age=31536000
  X-Content-Type-Options: nosniff

${basePath}assets/*.png
  Content-Type: image/png
  Cache-Control: public, max-age=31536000

${basePath}assets/*.jpg
  Content-Type: image/jpeg
  Cache-Control: public, max-age=31536000

${basePath}assets/*.svg
  Content-Type: image/svg+xml
  Cache-Control: public, max-age=31536000

${basePath}assets/*.woff2
  Content-Type: font/woff2
  Cache-Control: public, max-age=31536000`;

fs.writeFileSync(path.join(process.cwd(), 'dist', '_headers'), headersContent);
console.log('✅ 已创建优化的 _headers 文件');

// 创建 .nojekyll 文件
fs.writeFileSync(path.join(process.cwd(), 'dist', '.nojekyll'), '');
console.log('✅ 已创建 .nojekyll 文件');

// 创建 robots.txt 文件
if (!fs.existsSync(path.join(process.cwd(), 'dist', 'robots.txt'))) {
  const robotsContent = isTelegramBuild ? 
    `User-agent: *\nDisallow: /` : // Telegram Mini App 不需要 SEO
    `User-agent: *\nAllow: /\n\nSitemap: https://herbalshop.365idesign.uk/herbalShop/sitemap.xml`;
  fs.writeFileSync(path.join(process.cwd(), 'dist', 'robots.txt'), robotsContent);
  console.log('✅ 已创建 robots.txt 文件');
}

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

console.log('🎉 构建后处理完成！');
console.log(`📦 构建模式: ${isTelegramBuild ? 'Telegram Mini App' : 'Web'}`);
console.log(`🌐 基础路径: ${basePath}`);