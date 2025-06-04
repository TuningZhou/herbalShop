import { addCorsHeaders, handleOptions } from '../utils/cors';

export interface Env {
  IMAGE_BUCKET: R2Bucket;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // 处理CORS预检请求
    if (request.method === 'OPTIONS') {
      return handleOptions(request);
    }

    const url = new URL(request.url);
    const objectKey = url.pathname.substring(1); // 移除开头的 '/'
    const requestOrigin = request.headers.get('Origin');

    try {
      switch (request.method) {
        case 'PUT': // 处理图片上传
          if (!objectKey) {
            return addCorsHeaders(
              new Response(JSON.stringify({ error: 'PUT 请求需要对象键名' }), { 
                status: 400,
                headers: { 'Content-Type': 'application/json' } 
              }),
              requestOrigin
            );
          }
          
          // 在此处添加身份验证/授权检查
          // 例如：检查请求头中的 Authorization 令牌
          // const authHeader = request.headers.get('Authorization');
          // if (!authHeader || !validateAuth(authHeader)) {
          //   return addCorsHeaders(
          //     new Response(JSON.stringify({ error: '未授权' }), { 
          //       status: 401,
          //       headers: { 'Content-Type': 'application/json' } 
          //     }),
          //     requestOrigin
          //   );
          // }
          
          // 检查内容类型
          const contentType = request.headers.get('Content-Type');
          if (!contentType || !contentType.includes('image/')) {
            return addCorsHeaders(
              new Response(JSON.stringify({ error: '只允许上传图片文件' }), { 
                status: 400,
                headers: { 'Content-Type': 'application/json' } 
              }),
              requestOrigin
            );
          }
          
          // 上传图片到R2存储桶
          await env.IMAGE_BUCKET.put(objectKey, request.body, {
            httpMetadata: {
              contentType: contentType,
            },
          });
          
          return addCorsHeaders(
            new Response(JSON.stringify({ 
              success: true, 
              message: `对象 ${objectKey} 上传成功！`,
              url: `${url.origin}/${objectKey}`
            }), { 
              status: 200,
              headers: { 'Content-Type': 'application/json' } 
            }),
            requestOrigin
          );

        case 'GET': // 处理图片检索
          if (!objectKey) {
            return addCorsHeaders(
              new Response(JSON.stringify({ error: 'GET 请求需要对象键名' }), { 
                status: 400,
                headers: { 'Content-Type': 'application/json' } 
              }),
              requestOrigin
            );
          }

          const object = await env.IMAGE_BUCKET.get(objectKey);

          if (object === null) {
            return addCorsHeaders(
              new Response(JSON.stringify({ error: '未找到对象' }), { 
                status: 404,
                headers: { 'Content-Type': 'application/json' } 
              }),
              requestOrigin
            );
          }

          const headers = new Headers();
          object.writeHttpMetadata(headers);
          headers.set('etag', object.httpEtag);
          // 添加缓存控制头
          headers.set('Cache-Control', 'public, max-age=31536000'); // 缓存一年
          // 添加内容类型头（如果没有）
          if (!headers.has('Content-Type') && object.httpMetadata?.contentType) {
            headers.set('Content-Type', object.httpMetadata.contentType);
          }

          const response = new Response(object.body, { headers });
          return addCorsHeaders(response, requestOrigin);

        case 'DELETE': // 处理图片删除
          if (!objectKey) {
            return addCorsHeaders(
              new Response(JSON.stringify({ error: 'DELETE 请求需要对象键名' }), { 
                status: 400,
                headers: { 'Content-Type': 'application/json' } 
              }),
              requestOrigin
            );
          }
          
          // 在此处添加身份验证/授权检查
          // 例如：检查请求头中的 Authorization 令牌
          // const authHeader = request.headers.get('Authorization');
          // if (!authHeader || !validateAuth(authHeader)) {
          //   return addCorsHeaders(
          //     new Response(JSON.stringify({ error: '未授权' }), { 
          //       status: 401,
          //       headers: { 'Content-Type': 'application/json' } 
          //     }),
          //     requestOrigin
          //   );
          // }
          
          // 检查对象是否存在
          const existingObject = await env.IMAGE_BUCKET.head(objectKey);
          if (existingObject === null) {
            return addCorsHeaders(
              new Response(JSON.stringify({ error: '未找到要删除的对象' }), { 
                status: 404,
                headers: { 'Content-Type': 'application/json' } 
              }),
              requestOrigin
            );
          }
          
          // 删除对象
          await env.IMAGE_BUCKET.delete(objectKey);
          
          return addCorsHeaders(
            new Response(JSON.stringify({ 
              success: true, 
              message: `对象 ${objectKey} 删除成功！` 
            }), { 
              status: 200,
              headers: { 'Content-Type': 'application/json' } 
            }),
            requestOrigin
          );

        default:
          return addCorsHeaders(
            new Response(JSON.stringify({ error: '方法不允许' }), { 
              status: 405,
              headers: { 
                'Content-Type': 'application/json',
                'Allow': 'GET, PUT, DELETE, OPTIONS' 
              } 
            }),
            requestOrigin
          );
      }
    } catch (error) {
      console.error('R2 图片处理 Worker 错误:', error);
      return addCorsHeaders(
        new Response(JSON.stringify({ error: '服务器内部错误' }), { 
          status: 500,
          headers: { 'Content-Type': 'application/json' } 
        }),
        requestOrigin
      );
    }
  },
};