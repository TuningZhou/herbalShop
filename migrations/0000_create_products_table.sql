-- migrations/0000_create_products_table.sql
-- 产品表
DROP TABLE IF EXISTS Products;
CREATE TABLE Products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    currency TEXT DEFAULT 'USD',  -- 新增货币字段 (对应Product.currency)
    unit TEXT,                    -- 新增单位字段 (对应Product.unit)
    category TEXT,
    image TEXT NOT NULL,          -- 改名: imageUrl → image
    origin TEXT,                  -- 新增产地字段 (对应Product.origin)
    rating REAL,                  -- 新增评分字段 (对应Product.rating)
    reviewCount INTEGER,          -- 新增评价数量字段 (对应Product.reviewCount)
    stock INTEGER DEFAULT 0,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
    updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
);

-- 订单表 (Orders → Order)
DROP TABLE IF EXISTS Orders;
CREATE TABLE "Order" (            -- 改名匹配Order接口
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    total REAL NOT NULL,          -- 改名: totalAmount → total
    status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'paid', 'shipped', 'completed')), -- 修改状态选项
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
    updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(id)
);

-- 订单项表 (OrderItems → OrderItem)
DROP TABLE IF EXISTS OrderItems;
CREATE TABLE "OrderItem" (        -- 改名匹配Order.items
    id TEXT PRIMARY KEY,
    orderId TEXT NOT NULL,
    productId TEXT NOT NULL,
    name TEXT NOT NULL,           -- 新增产品名称 (冗余存储)
    image TEXT NOT NULL,          -- 新增产品图片 (冗余存储)
    quantity INTEGER NOT NULL,
    price REAL NOT NULL,          -- 改名: priceAtPurchase → price
    FOREIGN KEY (orderId) REFERENCES "Order"(id) ON DELETE CASCADE,
    FOREIGN KEY (productId) REFERENCES Products(id)
);

-- 用户表 (保持不变)
DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
    id TEXT PRIMARY KEY,
    username TEXT,
    firstName TEXT,
    lastName TEXT,
    avatarUrl TEXT,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);