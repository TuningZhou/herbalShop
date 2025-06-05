import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import fs from 'fs';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Workers 环境始终使用根路径
  const base = '/';
  
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
      target: 'es2015',
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-router': ['react-router-dom'],
            'vendor-telegram': ['@telegram-apps/sdk', '@telegram-apps/sdk-react'],
          },
        },
      },
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production',
        },
      },
    },
    define: {
      __DEV__: mode === 'development',
    },
  };
});