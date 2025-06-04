import { addCorsHeaders, handleOptions } from '../utils/cors';
import { Product } from '../../src/types/Product';

// 定义环境变量接口
export interface Env {
  DB: D1Database;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const requestOrigin = request.headers.get('Origin');

    // 处理CORS预检请求
    if (request.method === 'OPTIONS') {
      return handleOptions(request);
    }

    let response;

    try {
      // 路由处理
      if (url.pathname === '/api/products' && request.method === 'GET') {
        // 获取所有产品
        const products = await getProductsFromD1(env.DB);
        response = new Response(JSON.stringify(products), { 
          headers: { 'Content-Type': 'application/json' } 
        });
      } else if (url.pathname.match(/^\/api\/products\/[\w-]+$/) && request.method === 'GET') {
        // 获取单个产品
        const id = url.pathname.split('/').pop();
        const product = await getProductByIdFromD1(env.DB, id!);
        
        if (product) {
          response = new Response(JSON.stringify(product), { 
            headers: { 'Content-Type': 'application/json' } 
          });
        } else {
          response = new Response(JSON.stringify({ error: '产品未找到' }), { 
            status: 404,
            headers: { 'Content-Type': 'application/json' } 
          });
        }
      } else if (url.pathname.match(/^\/api\/products\/category\/[\w-]+$/) && request.method === 'GET') {
        // 按分类获取产品
        const category = url.pathname.split('/').pop();
        const products = await getProductsByCategoryFromD1(env.DB, category!);
        response = new Response(JSON.stringify(products), { 
          headers: { 'Content-Type': 'application/json' } 
        });
      } else {
        // 未找到路由
        response = new Response(JSON.stringify({ error: '未找到请求的资源' }), { 
          status: 404,
          headers: { 'Content-Type': 'application/json' } 
        });
      }
    } catch (error) {
      // 处理错误
      console.error('API Worker 错误:', error);
      response = new Response(JSON.stringify({ error: '服务器内部错误' }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    // 确保 response 已定义
    if (!response) { 
      response = new Response(JSON.stringify({ error: 'Internal Server Error or Route not handled' }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    // 添加CORS头
    return addCorsHeaders(response, requestOrigin);
  },
};

// 从D1数据库获取所有产品
async function getProductsFromD1(db: D1Database): Promise<Product[]> {
  const { results } = await db.prepare(
    'SELECT * FROM Products'
  ).all<Product>();
  return results;
}

// 从D1数据库获取单个产品
async function getProductByIdFromD1(db: D1Database, id: string): Promise<Product | null> {
  const product = await db.prepare(
    'SELECT * FROM Products WHERE id = ?'
  ).bind(id).first<Product>();
  return product;
}

// 从D1数据库获取特定分类的产品
async function getProductsByCategoryFromD1(db: D1Database, category: string): Promise<Product[]> {
  const { results } = await db.prepare(
    'SELECT * FROM Products WHERE category = ?'
  ).bind(category).all<Product>();
  return results;
}