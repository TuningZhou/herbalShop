import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler'

export interface Env {
  __STATIC_CONTENT: KVNamespace
  DB?: D1Database
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url)
    const { pathname } = url

    // API 路由处理
    if (pathname.startsWith('/api/')) {
      return handleApiRequest(request, env)
    }

    // 静态资源处理
    try {
      // 自定义资源映射，支持 SPA 路由
      const options = {
        mapRequestToAsset: (req: Request) => {
          const url = new URL(req.url)
          
          // 如果是根路径或不包含文件扩展名，返回 index.html
          if (url.pathname === '/' || !url.pathname.includes('.')) {
            return new Request(`${url.origin}/index.html`, req)
          }
          
          return mapRequestToAsset(req)
        },
        cacheControl: {
          browserTTL: 60 * 60 * 24 * 30, // 30 天
          edgeTTL: 60 * 60 * 24 * 30,
        },
      }

      const response = await getAssetFromKV(
        {
          request,
          waitUntil: ctx.waitUntil.bind(ctx),
        },
        {
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
          ...options,
        }
      )

      // 添加安全头和 CSP
      const newResponse = new Response(response.body, response)
      
      // 为 HTML 文件添加 CSP 头
      if (response.headers.get('content-type')?.includes('text/html')) {
        newResponse.headers.set(
          'Content-Security-Policy',
          "default-src 'self'; " +
          "style-src 'self' 'unsafe-inline'; " +
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://telegram.org https://*.telegram.org https://static.cloudflareinsights.com https://*.cloudflareinsights.com https://*.cloudflare.com; " +
          "img-src 'self' data: https: blob:; " +
          "font-src 'self' data: https:; " +
          "connect-src 'self' https: wss: https://*.cloudflareinsights.com; " +
          "frame-src 'self' https://telegram.org https://*.telegram.org; " +
          "object-src 'none'; " +
          "base-uri 'self';"
        )
        newResponse.headers.set('X-Frame-Options', 'ALLOWALL')
        newResponse.headers.set('X-Content-Type-Options', 'nosniff')
      }

      return newResponse
    } catch (e) {
      // 如果资源不存在，返回 index.html（SPA 回退）
      try {
        const response = await getAssetFromKV(
          {
            request: new Request(`${url.origin}/index.html`, request),
            waitUntil: ctx.waitUntil.bind(ctx),
          },
          {
            ASSET_NAMESPACE: env.__STATIC_CONTENT,
          }
        )
        return new Response(response.body, {
          ...response,
          status: 200,
          headers: {
            ...response.headers,
            'Content-Security-Policy': "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://telegram.org https://*.telegram.org https://static.cloudflareinsights.com https://*.cloudflareinsights.com https://*.cloudflare.com; img-src 'self' data: https: blob:; font-src 'self' data: https:; connect-src 'self' https: wss: https://*.cloudflareinsights.com; frame-src 'self' https://telegram.org https://*.telegram.org; object-src 'none'; base-uri 'self';",
            'X-Frame-Options': 'ALLOWALL',
            'X-Content-Type-Options': 'nosniff',
          },
        })
      } catch (e2) {
        return new Response('Not Found', { status: 404 })
      }
    }
  },
}

// API 请求处理函数
async function handleApiRequest(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url)
  const { pathname } = url

  // CORS 头
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }

  // 处理 OPTIONS 请求
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  // 产品 API
  if (pathname === '/api/products' && request.method === 'GET') {
    try {
      if (!env.DB) {
        return Response.json({ error: 'Database not configured' }, { status: 500 })
      }
      const { results } = await env.DB.prepare('SELECT * FROM Products').all()
      return Response.json(results, { headers: corsHeaders })
    } catch (e: any) {
      return Response.json({ error: e.message }, { status: 500, headers: corsHeaders })
    }
  }

  if (pathname.startsWith('/api/products/') && request.method === 'GET') {
    const id = pathname.split('/')[3]
    if (!id) {
      return Response.json({ error: 'Product ID is required' }, { status: 400, headers: corsHeaders })
    }
    try {
      if (!env.DB) {
        return Response.json({ error: 'Database not configured' }, { status: 500 })
      }
      const stmt = env.DB.prepare('SELECT * FROM Products WHERE id = ?')
      const product = await stmt.bind(id).first()
      if (product) {
        return Response.json(product, { headers: corsHeaders })
      } else {
        return Response.json({ error: 'Product not found' }, { status: 404, headers: corsHeaders })
      }
    } catch (e: any) {
      return Response.json({ error: e.message }, { status: 500, headers: corsHeaders })
    }
  }

  return Response.json({ error: 'Not found' }, { status: 404, headers: corsHeaders })
}