import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import fs from 'fs';  // 引入 fs 模块以读取本地证书文件
import path from 'path'; // 引入 path 模块用于路径拼接

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // 设置路径别名
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3333,
    open: true,
    cors: true,
    headers: {
      'Content-Type': 'application/javascript',
    },
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')), // 使用本地证书私钥
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),   // 使用本地证书文件
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-telegram': ['@telegram-apps/sdk', '@telegram-apps/sdk-react'],
        },
      },
    },
    target: 'es2015',
    cssCodeSplit: false,
    chunkSizeWarningLimit: 1000,
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});