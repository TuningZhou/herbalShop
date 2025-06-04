@echo off
echo 🚀 开始部署测试...

echo 📦 构建项目...
call npm run build:clean
if %errorlevel% neq 0 (
    echo ❌ 构建失败
    exit /b 1
)

echo ✅ 验证构建产物...
call npm run validate:build
if %errorlevel% neq 0 (
    echo ❌ 验证失败
    exit /b 1
)

echo 🌐 启动本地预览...
start /b npm run preview

echo ⏳ 等待服务器启动...
timeout /t 5 /nobreak > nul

echo 🔍 测试本地部署...
curl -f http://localhost:4173/herbalShop/ > nul
if %errorlevel% neq 0 (
    echo ❌ 本地测试失败
    exit /b 1
)

echo ✅ 所有测试通过！
echo 📤 可以安全部署到 Cloudflare Pages