
export interface Env {
    DB: D1Database;
}

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        const { pathname } = new URL(request.url);

        // 简单的路由示例
        if (pathname === "/api/products" && request.method === "GET") {
            try {
                const { results } = await env.DB.prepare("SELECT * FROM Products").all();
                return Response.json(results);
            } catch (e: any) {
                return Response.json({ error: e.message }, { status: 500 });
            }
        }

        if (pathname.startsWith("/api/products/") && request.method === "GET") {
            const id = pathname.split("/")[3];
            if (!id) {
                return Response.json({ error: "Product ID is required" }, { status: 400 });
            }
            try {
                const stmt = env.DB.prepare("SELECT * FROM Products WHERE id = ?");
                const product = await stmt.bind(id).first();
                if (product) {
                    return Response.json(product);
                } else {
                    return Response.json({ error: "Product not found" }, { status: 404 });
                }
            } catch (e: any) {
                return Response.json({ error: e.message }, { status: 500 });
            }
        }
        
        // 添加更多路由处理 POST, PUT, DELETE 请求，例如创建产品、用户、订单等
        // Example: POST /api/products to add a new product
        if (pathname === "/api/products" && request.method === "POST") {
            try {
                const productData = await request.json<any>(); // Define a type for productData
                // Basic validation (add more robust validation)
                if (!productData.id || !productData.name || !productData.price) {
                    return Response.json({ error: "Missing required product fields" }, { status: 400 });
                }
                const stmt = env.DB.prepare(
                    "INSERT INTO Products (id, name, description, price, category, imageUrl, stock) VALUES (?, ?, ?, ?, ?, ?, ?)"
                );
                await stmt.bind(
                    productData.id,
                    productData.name,
                    productData.description,
                    productData.price,
                    productData.category,
                    productData.imageUrl,
                    productData.stock
                ).run();
                return Response.json({ message: "Product added successfully", id: productData.id }, { status: 201 });
            } catch (e: any) {
                return Response.json({ error: e.message }, { status: 500 });
            }
        }


        return new Response("Not found", { status: 404 });
    },
};