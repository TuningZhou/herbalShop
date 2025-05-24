import React from "react";
import { Link, useLocation } from "react-router-dom";
import ShopIcon from "@/assets/icons/Shop.svg?react";
import CartIcon from "@/assets/icons/Cart.svg?react";
import UserIcon from "@/assets/icons/Setting.svg?react";
import { useCart } from "../../context/CartContext";
import "./Footer.css";

interface FooterProps {
  mainButtonText?: string;
  mainButtonOnClick?: () => void;
  mainButtonEnabled?: boolean;
  mainButtonVisible?: boolean;
  mainButtonBackgroundColor?: string;
  mainButtonTextColor?: string;
}

const Footer: React.FC<FooterProps> = ({
  mainButtonText,
  mainButtonOnClick,
  mainButtonEnabled = true,
  mainButtonVisible = false,
  mainButtonBackgroundColor = "#007AFF",
  mainButtonTextColor = "#FFFFFF",
}) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { items } = useCart();

  // 计算购物车中的商品总数量
  const cartItemsCount = items.length;

  // 显示徽章，最大值为99
  const displayBadge = cartItemsCount > 0;
  const badgeCount = cartItemsCount > 99 ? "99+" : cartItemsCount;

  return (
    <>
      {/* 主按钮 */}
      {mainButtonVisible && (
        <div className="custom-main-button-container">
          <button
            className="custom-main-button"
            onClick={mainButtonOnClick}
            disabled={!mainButtonEnabled}
            style={{
              backgroundColor: mainButtonBackgroundColor,
              color: mainButtonTextColor,
            }}
          >
            {mainButtonText}
          </button>
        </div>
      )}

      {/* 底部导航栏 */}
      <footer className="tg-footer">
        <div className="footer-container">
          {/* SHOP */}
          <Link
            to="/shop"
            className={`footer-item ${currentPath === "/shop" || currentPath === "/" ? "active" : ""}`}
          >
            <ShopIcon />
            <span>SHOP</span>
          </Link>

          {/* CART */}
          <Link
            to="/shop/cart"
            className={`footer-item ${currentPath === "/shop/cart" ? "active" : ""}`}
          >
            <div className="badge-container">
              <CartIcon />
              {displayBadge && <span className="badge">{badgeCount}</span>}
            </div>
            <span>CART</span>
          </Link>

          {/* USER */}
          <Link
            to="/shop/user"
            className={`footer-item ${currentPath === "/shop/user" || currentPath === "/profile" ? "active" : ""}`}
          >
            <UserIcon />
            <span>USER</span>
          </Link>
        </div>
      </footer>
    </>
  );
};

export default Footer;
