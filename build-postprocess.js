import fs from 'fs';
import path from 'path';

// 检查是否为 Telegram 构建模式
const isTelegramBuild = process.argv.includes('--telegram') || process.env.VITE_MODE === 'telegram';
const basePath = isTelegramBuild ? './' : '/herbalShop/';

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

// 为 Telegram Mini App 优化的 _headers 文件
const headersContent = isTelegramBuild ? 
`/*
  Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; img-src 'self' data: https:; font-src 'self' data:;
  X-Content-Type-Options: nosniff
  Cache-Control: public, max-age=3600

*.css
  Content-Type: text/css; charset=utf-8
  Cache-Control: public, max-age=31536000

*.js
  Content-Type: application/javascript; charset=utf-8
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
  X-Content-Type-Options: nosniff`;

fs.writeFileSync(path.join(process.cwd(), 'dist', '_headers'), headersContent);
console.log('✅ 已创建优化的 _headers 文件');

// 创建一个空的.nojekyll文件，确保GitHub Pages不使用Jekyll处理
fs.writeFileSync(path.join(process.cwd(), 'dist', '.nojekyll'), '');
console.log('✅ 已创建 .nojekyll 文件');

// 创建 robots.txt 文件
if (!fs.existsSync(path.join(process.cwd(), 'dist', 'robots.txt'))) {
  const robotsContent = `User-agent: *\nAllow: /\n\nSitemap: https://herbalshop.365idesign.uk/herbalShop/sitemap.xml`;
  fs.writeFileSync(path.join(process.cwd(), 'dist', 'robots.txt'), robotsContent);
  console.log('✅ 已创建 robots.txt 文件');
}

// 复制修正后的 _routes.json 到 dist 目录
fs.copyFileSync(
  path.join(process.cwd(), '_routes.json'),
  path.join(process.cwd(), 'dist', '_routes.json')
);
console.log('✅ 已复制 _routes.json 文件到 dist 目录');

// 验证 _routes.json 格式
try {
  const routesContent = fs.readFileSync(path.join(process.cwd(), 'dist', '_routes.json'), 'utf8');
  JSON.parse(routesContent);
  console.log('✅ _routes.json 格式验证通过');
} catch (error) {
  console.error('❌ _routes.json 格式错误:', error.message);
  process.exit(1);
}

console.log('🎉 构建后处理完成！');
console.log(`📦 构建模式: ${isTelegramBuild ? 'Telegram Mini App' : 'Web'}`);