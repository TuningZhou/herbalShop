export interface Env {
  IMAGE_BUCKET: R2Bucket;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const objectKey = url.pathname.substring(1); // 移除开头的 '/'

    switch (request.method) {
      case 'PUT': // 处理图片上传
        if (!objectKey) {
          return new Response('PUT 请求需要对象键名', { status: 400 });
        }
        // 在此处添加身份验证/授权检查！
        await env.IMAGE_BUCKET.put(objectKey, request.body);
        return new Response(`对象 ${objectKey} 上传成功！`, { status: 200 });

      case 'GET': // 处理图片检索
        if (!objectKey) {
          return new Response('GET 请求需要对象键名', { status: 400 });
        }

        const object = await env.IMAGE_BUCKET.get(objectKey);

        if (object === null) {
          return new Response('未找到对象', { status: 404 });
        }

        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set('etag', object.httpEtag);

        return new Response(object.body, {
          headers,
        });

      case 'DELETE': // 处理图片删除
        if (!objectKey) {
          return new Response('DELETE 请求需要对象键名', { status: 400 });
        }
        // 在此处添加身份验证/授权检查！
        await env.IMAGE_BUCKET.delete(objectKey);
        return new Response(`对象 ${objectKey} 删除成功！`, { status: 200 });

      default:
        return new Response('方法不允许', { status: 405 });
    }
  },
};