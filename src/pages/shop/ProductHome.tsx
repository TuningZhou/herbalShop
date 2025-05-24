import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ui/ProductCard";
import { Product } from "../../types/Product";
import { productApi } from "../../services/api/productApi";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import "./ProductHome.css";

// 导入轮播图图片
import banner01 from "@/assets/images/01 Nature's Touch Naturally Yours - Banner.png";
import banner02 from "@/assets/images/02 Herbal Harmony for Your Life - Banner.png";
import banner03 from "@/assets/images/03 Pure Herbs, Pure Wellnesss - Banner.png";
import banner04 from "@/assets/images/04 From Earth to You, Naturally - Banner.png";
import banner05 from "@/assets/images/04 From Earth to You, Naturally - Banner.png";


// 轮播图数据接口
interface BannerSlide {
  id: string;
  image: string;
  titleChinese: string;
  titleEnglish: string;
  description: string;
}

// 定义产品分类接口
interface Category {
  name: string;
  subcategories?: string[];
}

const ProductHome: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("Beverages"); // 将默认激活的分类改为 Beverages
  const [activeSubcategory, setActiveSubcategory] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false); // 添加缺失的状态
  const [activeParentCategory, setActiveParentCategory] = useState<string | null>(null); // 添加缺失的状态
  const navigate = useNavigate();
  const categoryTabsRef = useRef<HTMLDivElement>(null);
  const categoryFilterRef = useRef<HTMLDivElement>(null);
  const subcategoryFilterRef = useRef<HTMLDivElement>(null);
  
  // 移除鼠标拖动滚动功能，因为我们现在使用原生滚动条
  useEffect(() => {
    // 初始化代码（如果需要）
    return () => {
      // 清理代码（如果需要）
    };
  }, []);

  // 删除或注释掉以下代码块
  /*
  // 添加鼠标拖动滚动功能
  useEffect(() => {
    const enableDragToScroll = (element: HTMLElement | null) => {
      if (!element) return;
      
      let isDown = false;
      let startX: number;
      let scrollLeft: number;
      
      element.addEventListener('mousedown', (e) => {
        isDown = true;
        element.classList.add('active');
        startX = e.pageX - element.offsetLeft;
        scrollLeft = element.scrollLeft;
      });
      
      element.addEventListener('mouseleave', () => {
        isDown = false;
        element.classList.remove('active');
      });
      
      element.addEventListener('mouseup', () => {
        isDown = false;
        element.classList.remove('active');
      });
      
      element.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - element.offsetLeft;
        const walk = (x - startX) * 2; // 滚动速度
        element.scrollLeft = scrollLeft - walk;
      });
    };
    
    enableDragToScroll(categoryFilterRef.current);
    enableDragToScroll(subcategoryFilterRef.current);
    
    return () => {
      // 清理事件监听器的代码（如果需要）
    };
  }, []);
  */

  // 删除菜单状态相关代码

  // 轮播图相关状态
  const [currentSlide, setCurrentSlide] = useState(0);
  const [bannerSlides, setBannerSlides] = useState<BannerSlide[]>([
    {
      id: "01",
      image: banner01,
      titleChinese: "自然之触，天然属于你",
      titleEnglish: "Nature's Touch, Naturally Yours",
      description:
        "Emphasizes the natural origin of herbal products and their intimate connection with the customer",
    },
    {
      id: "02",
      image: banner02,
      titleChinese: "草本和諧，生活之美",
      titleEnglish: "Herbal Harmony for Your Life",
      description:
        "Conveys the harmony of herbal products with life, enhancing the quality of life",
    },
    {
      id: "03",
      image: banner03,
      titleChinese: "純淨草本，純淨健康",
      titleEnglish: "Pure Herbs, Pure Wellness",
      description:
        "Highlights the purity of the products and their health benefits, concise and powerful",
    },
    {
      id: "04",
      image: banner04,
      titleChinese: "源自大地，天然為你",
      titleEnglish: "From Earth to You, Naturally",
      description:
        "Emphasizes the natural origin and pure process of the products",
    },
    {
      id: "05",
      image: banner05,
      titleChinese: "大自然的治愈之触",
      titleEnglish: "Nature`s Healing Touch",
      description:
        "Emphasizes the natural origin and healing properties of herbal products, suggesting a gentle yet powerful connection between nature and personal well-being",
    },
  ]);

  // 自动轮播效果
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [bannerSlides.length]);

  // 手动切换轮播图
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // 更新为实际的产品分类结构
  const categories = [
    "New",
    "Beverages",
    "Care",
    "Powders",
    "Aroma",
    "Supplements",
  ];

  // 定义完整的分类结构，包括子类
  const categoryStructure: Category[] = [
    { name: "New" }, // 没有子类
    { name: "Beverages", subcategories: ["Tea", "Drinks"] },
    {
      name: "Care",
      subcategories: [
        "HandCare",
        "SkinCare",
        "HairCare",
        "FacialCare",
        "BodyCare",
      ],
    },
    { name: "Powders", subcategories: ["Wellness Powders", "Seasonings"] },
    { name: "Aroma", subcategories: ["Candle", "Stone", "Spray"] },
    { name: "Supplements" }, // 没有子类
  ];
  // 获取当前分类的子类别
  const getSubcategories = (): string[] => {
    const category = categoryStructure.find(
      (cat) => cat.name === activeCategory,
    );
    return category?.subcategories || [];
  };

  // 处理分类点击
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setActiveSubcategory("");
  };

  // 处理子类别点击
  const handleSubcategoryClick = (subcategory: string) => {
    setActiveSubcategory(subcategory);
  };

  // 删除菜单相关处理函数

  // 处理菜单点击
  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
    setActiveParentCategory(null);
  };

  // 处理主分类菜单项点击
  const handleCategoryMenuItemClick = (category: string) => {
    const categoryItem = categoryStructure.find((cat) => cat.name === category);
    if (categoryItem?.subcategories && categoryItem.subcategories.length > 0) {
      setActiveParentCategory(category);
    } else {
      handleCategoryClick(category);
      setMenuOpen(false);
    }
  };

  // 处理子类菜单项点击
  const handleSubcategoryMenuItemClick = (subcategory: string) => {
    handleSubcategoryClick(subcategory);
    setMenuOpen(false);
    setActiveParentCategory(null);
  };

  // 检查分类是否有子类
  const hasSubcategories = (category: string): boolean => {
    const categoryItem = categoryStructure.find((cat) => cat.name === category);
    return !!(
      categoryItem?.subcategories && categoryItem.subcategories.length > 0
    );
  };

  // 获取分类的子类
  const getCategorySubcategories = (category: string): string[] => {
    const categoryItem = categoryStructure.find((cat) => cat.name === category);
    return categoryItem?.subcategories || [];
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await productApi.getAllProducts();
    
        // 模拟Figma设计中的产品数据，使用Cloudflare R2存储的图片
        const mockProducts = [
          {
            id: "1",
            name: "Chamomile Tea",
            price: 8.20,
            currency: "$",
            unit: "Pack",
            image: "01-02-0001-Chamomile-Tea.png", // 使用R2路径格式
            category: "Tea",
          },
          {
            id: "2",
            name: "Peppermint Tea",
            price: 132.00,
            currency: "$",
            unit: "Can",
            image: "01-02-0002-Peppermint-Tea.png", // 使用R2路径格式
            category: "Tea",
          },
          {
            id: "3",
            name: "Goji Berry Chrysanthemum Tea",
            price: 9.90,
            currency: "$",
            unit: "Pack",
            image: "01-02-0003-Goji-Berry-Chrysanthemum-Tea.png", // 使用R2路径格式
            category: "Tea",
          },
          {
            id: "4",
            name: "Ginseng Oolong Tea",
            price: 69.90,
            currency: "$",
            unit: "Can",
            image: "01-02-0004-Ginseng-Oolong-Tea.png", // 使用R2路径格式
            category: "Tea",
          },
        ];
    
        setProducts(mockProducts);
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    // 调用fetchProducts函数以获取产品数据
    fetchProducts();
    
  }, [activeCategory]);

  // 动态生成面包屑
  const generateBreadcrumbs = () => {
    const breadcrumbs = [activeCategory];
    if (activeSubcategory) {
      breadcrumbs.push(activeSubcategory);
    }
    return breadcrumbs;
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;

  // 获取当前面包屑
  const currentBreadcrumbs = generateBreadcrumbs();

  return (
    <div className="product-home-page">
      {/* 轮播图组件 */}
      <div className="banner-carousel-section">
        <div className="banner-carousel">
          {bannerSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`carousel-slide ${index === currentSlide ? "active" : ""}`}
              style={{
                transform: `translateX(${100 * (index - currentSlide)}%)`,
              }}
            >
              <img
                src={slide.image}
                alt={slide.titleEnglish}
                className="carousel-image"
              />
            </div>
          ))}

          {/* 轮播图指示器 */}
          <div className="carousel-indicators">
            {bannerSlides.map((_, index) => (
              <button
                key={index}
                className={`carousel-indicator ${index === currentSlide ? "active" : ""}`}
                onClick={() => goToSlide(index)}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* 轮播图内容 */}
        <div className="carousel-content">
          <h2 className="carousel-title-chinese">
            {bannerSlides[currentSlide].titleChinese}
          </h2>
          <h2 className="carousel-title-english">
            {bannerSlides[currentSlide].titleEnglish}
          </h2>
          <p className="carousel-description">
            {bannerSlides[currentSlide].description}
          </p>
        </div>
      </div>

      {/* 3. 分类筛选 */}
      <div className="category-filter-section" ref={categoryFilterRef}>
        <div className="category-tabs" ref={categoryTabsRef}>
          {categories.map((category) => (
            <button
              key={category}
              className={`tab-button ${activeCategory === category ? "active" : ""}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* 子类筛选（如果当前分类有子类） */}
      {getSubcategories().length > 0 && (
        <div className="subcategory-filter-section" ref={subcategoryFilterRef}>
          <div className="subcategory-tabs">
            {getSubcategories().map((subcategory) => (
              <button
                key={subcategory}
                className={`tab-button ${activeSubcategory === subcategory ? "active" : ""}`}
                onClick={() => handleSubcategoryClick(subcategory)}
              >
                {subcategory}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 4. 面包屑导航 */}
      <div className="breadcrumbs-section">
        {currentBreadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb}>
            <span className="breadcrumb-item">{crumb}</span>
            {index < currentBreadcrumbs.length - 1 && (
              <span className="breadcrumb-separator"> / </span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* 5. 商品网格 */}
      {products.length > 0 ? (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              unit={product.unit}
              currency={product.currency}
              onClick={() => {
                console.log(`Navigating to product/${product.id}`);
                // 使用绝对路径确保在Telegram环境中也能正确导航
                navigate(`/shop/product/${product.id}`);
              }}
            />
          ))}
        </div>
      ) : (
        <div className="no-products-message">
          No products found in this category.
        </div>
      )}
    </div>
  );
};

export default ProductHome;
