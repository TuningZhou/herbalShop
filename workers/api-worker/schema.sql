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