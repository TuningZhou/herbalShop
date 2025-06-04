export function addCorsHeaders(response: Response, requestOrigin: string | null): Response {
  // Define allowed origins. For production, be more specific.
  const allowedOrigins = [
    'http://localhost:5173', // Vite dev server
    'http://localhost:4173', // Vite preview server
    'http://localhost:3333', // 当前项目的 Vite 服务器端口
    'https://herbalshop.pages.dev', // Cloudflare Pages 生产 URL
    'https://tuningzhou.github.io', // GitHub Pages URL
    'https://web.telegram.org', // Telegram WebApp 域名
  ];

  // Basic CORS headers
  const headers = new Headers(response.headers);
  headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Add any other headers your app uses

  if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
    headers.set('Access-Control-Allow-Origin', requestOrigin);
  } else if (allowedOrigins.length > 0 && !requestOrigin) {
    // Fallback or default if origin is not present or for simpler setups, but be cautious
    // For production, it's better to strictly match the origin.
    // headers.set('Access-Control-Allow-Origin', allowedOrigins[0]); // Or your primary Pages URL
  }
  // For OPTIONS preflight requests
  if (response.status === 204) { // Typically for OPTIONS responses
    headers.set('Access-Control-Max-Age', '86400'); // Cache preflight response for 1 day
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: headers,
  });
}

export function handleOptions(request: Request): Response {
  // Handle CORS preflight requests.
  const origin = request.headers.get('Origin');
  return addCorsHeaders(new Response(null, { status: 204 }), origin);
}