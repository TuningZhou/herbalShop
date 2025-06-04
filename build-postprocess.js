import fs from 'fs';
import path from 'path';

// 创建 404.html 文件
const notFoundContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Page Not Found</title>
</head>
<body>
    <h1>404 - Page Not Found</h1>
    <p>The requested resource could not be found.</p>
</body>
</html>`;

fs.writeFileSync(path.join(process.cwd(), 'dist', '404.html'), notFoundContent);
console.log('已创建404.html文件');

// 确保_headers文件存在于构建输出目录中
const headersContent = `
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: no-referrer
  Cache-Control: public, max-age=3600

/herbalShop/assets/*.css
  Content-Type: text/css
  Cache-Control: public, max-age=31536000

/herbalShop/assets/*.js
  Content-Type: application/javascript
  Cache-Control: public, max-age=31536000

/herbalShop/assets/*.png
  Cache-Control: public, max-age=31536000

/herbalShop/assets/*.jpg
  Cache-Control: public, max-age=31536000

/herbalShop/assets/*.svg
  Cache-Control: public, max-age=31536000

/herbalShop/assets/*.woff2
  Cache-Control: public, max-age=31536000
`;

fs.writeFileSync(path.join(process.cwd(), 'dist', '_headers'), headersContent);
console.log('已创建增强版_headers文件');

// 注释掉或删除以下两行，不再生成_redirects文件
// fs.writeFileSync(path.join(process.cwd(), 'dist', '_redirects'), '/* /index.html 200');
// console.log('已创建_redirects文件');

// 创建一个空的.nojekyll文件，确保GitHub Pages不使用Jekyll处理
fs.writeFileSync(path.join(process.cwd(), 'dist', '.nojekyll'), '');
console.log('已创建.nojekyll文件');

// 创建一个简单的robots.txt文件
if (!fs.existsSync(path.join(process.cwd(), 'dist', 'robots.txt'))) {
  fs.writeFileSync(path.join(process.cwd(), 'dist', 'robots.txt'), 'User-agent: *\nAllow: /');
  console.log('已创建robots.txt文件');
}

// 复制_routes.json到dist目录
fs.copyFileSync(
  path.join(process.cwd(), '_routes.json'),
  path.join(process.cwd(), 'dist', '_routes.json')
);
console.log('已复制_routes.json文件到dist目录');