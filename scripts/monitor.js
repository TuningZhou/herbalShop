// 创建 scripts 目录并添加此文件
const https = require('https');
const fs = require('fs');

const baseUrl = 'https://herbalshop.365idesign.uk';
const testPaths = [
  '/herbalShop/',
  '/herbalShop/assets/index-DO-wzLWW.js',
  '/herbalShop/assets/style-D2KCCLpq.css'
];

async function testPath(path) {
  return new Promise((resolve) => {
    const req = https.request(baseUrl + path, { method: 'HEAD' }, (res) => {
      resolve({
        path,
        status: res.statusCode,
        contentType: res.headers['content-type'],
        cacheControl: res.headers['cache-control']
      });
    });
    
    req.on('error', (err) => {
      resolve({ path, error: err.message });
    });
    
    req.end();
  });
}

async function runTests() {
  console.log('🔍 开始监控测试...');
  
  for (const path of testPaths) {
    const result = await testPath(path);
    
    if (result.error) {
      console.log(`❌ ${path}: ${result.error}`);
    } else {
      const status = result.status === 200 ? '✅' : '❌';
      console.log(`${status} ${path}: ${result.status} - ${result.contentType}`);
    }
  }
  
  console.log('✅ 监控测试完成');
}

runTests();