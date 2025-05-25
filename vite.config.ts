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
});