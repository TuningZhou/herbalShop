import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import fs from 'fs';
import path from 'path';

export default defineConfig(({ mode }) => {
  // 为 Telegram Mini App 专用配置
  const isTelegramMode = mode === 'telegram';
  // 为自定义域名优化
  const base = isTelegramMode ? '/' : '/herbalShop/';
  
  return {
    plugins: [ 
      react(),
      // 只在开发模式使用 SSL
      ...(mode === 'development' ? [basicSsl()] : []),
      svgr({
        svgrOptions: {
          icon: true,
        },
      }),
    ],
    base,
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
      https: mode === 'development',
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
      // Telegram Mini App 优化配置
      target: isTelegramMode ? 'es2015' : 'esnext',
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            'vendor-telegram': ['@telegram-apps/sdk', '@telegram-apps/sdk-react'],
          },
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1];
            if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
              return `assets/images/[name]-[hash][extname]`;
            }
            if (/\.(css)$/i.test(assetInfo.name)) {
              return `assets/[name]-[hash][extname]`;
            }
            return `assets/[name]-[hash][extname]`;
          },
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js'
        }
      },
      cssCodeSplit: false, // 重要：将所有 CSS 合并到一个文件中
      emptyOutDir: true
    },
    // Telegram Mini App 专用环境变量
    define: {
      __TELEGRAM_MODE__: isTelegramMode,
    }
  };
});