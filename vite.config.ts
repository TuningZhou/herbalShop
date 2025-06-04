import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [ 
    react(),
    basicSsl(),
    svgr({
      svgrOptions: {
        icon: true,
      },
    }),
  ],
  base: '/herbalShop/', // 修改为仓库名称
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  server: {
    host: true,
    port: 3333,
    open: true,
    cors: true,
    https: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-store',
    },
  },  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    sourcemap: false,
    // 确保资源文件名包含哈希值
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-telegram': ['@telegram-apps/sdk', '@telegram-apps/sdk-react'],
        },
        // 确保资源文件使用正确的扩展名和路径
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash].[ext]`;
          }
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash].[ext]`;
          }
          return `assets/[name]-[hash].[ext]`;
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
    // 确保构建时正确处理公共文件
    copyPublicDir: true,
  },
  // 预览配置（用于本地测试）
  preview: {
    port: 4173,
    host: true,
    cors: true,
  },
});