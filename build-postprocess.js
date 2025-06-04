import fs from 'fs';
import path from 'path';

// 确保_headers文件存在于构建输出目录中，增强版本
const headersContent = `
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: no-referrer
  Cache-Control: public, max-age=3600

/assets/*.css
  Content-Type: text/css
  Cache-Control: public, max-age=31536000

/assets/*.js
  Content-Type: application/javascript
  Cache-Control: public, max-age=31536000

/assets/*.png
  Cache-Control: public, max-age=31536000

/assets/*.jpg
  Cache-Control: public, max-age=31536000

/assets/*.svg
  Cache-Control: public, max-age=31536000

/assets/*.woff2
  Cache-Control: public, max-age=31536000
`;

fs.writeFileSync(path.join(process.cwd(), 'dist', '_headers'), headersContent);
console.log('已创建增强版_headers文件');

// 确保_redirects文件存在
fs.writeFileSync(path.join(process.cwd(), 'dist', '_redirects'), '/* /index.html 200');
console.log('已创建_redirects文件');

// 创建一个空的.nojekyll文件，确保GitHub Pages不使用Jekyll处理
fs.writeFileSync(path.join(process.cwd(), 'dist', '.nojekyll'), '');
console.log('已创建.nojekyll文件');

// 创建一个简单的robots.txt文件
if (!fs.existsSync(path.join(process.cwd(), 'dist', 'robots.txt'))) {
  fs.writeFileSync(path.join(process.cwd(), 'dist', 'robots.txt'), 'User-agent: *\nAllow: /');
  console.log('已创建robots.txt文件');
}