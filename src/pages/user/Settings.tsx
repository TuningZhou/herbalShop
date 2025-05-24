import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useUser } from "../../context/UserContext";
import "./Settings.css";

interface ExpandableSection {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  isExpanded: boolean;
  content?: React.ReactNode;
}

const Settings: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { isAuthenticated, verifyAccessKey, logout } = useAuthContext();
  
  // 可展开的信息模块状态
  const [sections, setSections] = useState<ExpandableSection[]>([
    {
      id: 'address',
      title: 'Your Address',
      subtitle: 'Fill in your shipping address information',
      icon: '📍',
      isExpanded: false
    },
    {
      id: 'referral',
      title: 'Your Referral Info',
      subtitle: 'View your referral and entitlement information',
      icon: '🎁',
      isExpanded: false
    },
    {
      id: 'orders',
      title: 'Your Order Info',
      subtitle: 'View your historical order details',
      icon: '📦',
      isExpanded: false
    },
    {
      id: 'wallet',
      title: 'Your Wallet',
      subtitle: 'Send your tokens to your Ton Space',
      icon: '💰',
      isExpanded: false
    },
    {
      id: 'terms',
      title: 'Terms of use',
      subtitle: 'View terms and conditions',
      icon: '📋',
      isExpanded: false
    }
  ]);

  // 管理员功能模块（根据用户权限显示）
  const [adminSections, setAdminSections] = useState<ExpandableSection[]>([
    {
      id: 'product-management',
      title: 'Product Management',
      subtitle: 'Add and manage products',
      icon: '🛍️',
      isExpanded: false
    },
    {
      id: 'user-rating',
      title: 'User Rating Management',
      subtitle: 'Manage user ratings and reviews',
      icon: '⭐',
      isExpanded: false
    },
    {
      id: 'discount-management',
      title: 'Discount Management',
      subtitle: 'Create and manage discounts',
      icon: '🏷️',
      isExpanded: false
    },
    {
      id: 'referral-management',
      title: 'Referral Management',
      subtitle: 'Manage referral programs',
      icon: '🔗',
      isExpanded: false
    },
    {
      id: 'user-management',
      title: 'User Management',
      subtitle: 'Manage user accounts',
      icon: '👥',
      isExpanded: false
    },
    {
      id: 'payment-management',
      title: 'Payment Management',
      subtitle: 'Configure payment methods',
      icon: '💳',
      isExpanded: false
    },
    {
      id: 'banner-management',
      title: 'Banner & Carousel Management',
      subtitle: 'Manage homepage banners and carousels',
      icon: '🖼️',
      isExpanded: false
    }
  ]);

  // 切换展开状态
  const toggleSection = (sectionId: string, isAdmin: boolean = false) => {
    if (isAdmin) {
      setAdminSections(prev => 
        prev.map(section => 
          section.id === sectionId 
            ? { ...section, isExpanded: !section.isExpanded }
            : section
        )
      );
    } else {
      setSections(prev => 
        prev.map(section => 
          section.id === sectionId 
            ? { ...section, isExpanded: !section.isExpanded }
            : section
        )
      );
    }
  };

  // 获取用户显示名称
  const getDisplayName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user?.username || user?.firstName || 'User';
  };

  // 获取加入日期
  const getJoinDate = () => {
    // 这里应该从用户数据中获取实际的加入日期
    return user?.joinDate || new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // 渲染展开内容
  const renderExpandedContent = (sectionId: string) => {
    switch (sectionId) {
      case 'address':
        return (
          <div className="expanded-content">
            <div className="form-group">
              <label>Street Address</label>
              <input type="text" placeholder="Enter your street address" />
            </div>
            <div className="form-group">
              <label>City</label>
              <input type="text" placeholder="Enter your city" />
            </div>
            <div className="form-group">
              <label>Postal Code</label>
              <input type="text" placeholder="Enter postal code" />
            </div>
            <button className="save-btn">Save Address</button>
          </div>
        );
      case 'referral':
        return (
          <div className="expanded-content">
            <div className="referral-info">
              <p><strong>Referral Code:</strong> REF123456</p>
              <p><strong>Total Referrals:</strong> 5</p>
              <p><strong>Earned Rewards:</strong> $25.00</p>
            </div>
          </div>
        );
      case 'orders':
        return (
          <div className="expanded-content">
            <div className="order-list">
              <div className="order-item">
                <p><strong>Order #12345</strong></p>
                <p>Date: 2024-01-15</p>
                <p>Status: Delivered</p>
                <p>Total: $45.99</p>
              </div>
            </div>
          </div>
        );
      case 'wallet':
        return (
          <div className="expanded-content">
            <div className="wallet-info">
              <p><strong>Balance:</strong> 100 TON</p>
              <p><strong>Wallet Address:</strong> EQD...abc123</p>
              <button className="connect-wallet-btn">Connect Wallet</button>
            </div>
          </div>
        );
      case 'terms':
        return (
          <div className="expanded-content">
            <div className="terms-content">
              <p>By using our service, you agree to our terms and conditions...</p>
              <a href="/terms" target="_blank">Read Full Terms</a>
            </div>
          </div>
        );
      default:
        return (
          <div className="expanded-content">
            <p>Content for {sectionId} will be implemented here.</p>
          </div>
        );
    }
  };

  // 检查是否为管理员（这里需要根据实际的权限系统来判断）
  const isAdmin = user?.role === 'admin' || user?.isAdmin;

  return (
    <div className="settings-page">
      {/* 用户信息栏 */}
      <div className="user-info-section">
        <div className="user-avatar">
          <img 
            src={user?.avatar || '/src/assets/images/avatars/avatar@2x.png'} 
            alt="User Avatar" 
            className="avatar-image"
          />
        </div>
        <div className="user-details">
          <h2 className="user-name">{getDisplayName()}</h2>
          <p className="join-date">Join Member since {getJoinDate()}</p>
        </div>
      </div>

      {/* 用户信息模块 */}
      <div className="info-sections">
        {sections.map((section) => (
          <div key={section.id} className="info-section">
            <div 
              className="section-header"
              onClick={() => toggleSection(section.id)}
            >
              <div className="section-icon">{section.icon}</div>
              <div className="section-content">
                <h3 className="section-title">{section.title}</h3>
                <p className="section-subtitle">{section.subtitle}</p>
              </div>
              <div className={`expand-arrow ${section.isExpanded ? 'expanded' : ''}`}>
                ▼
              </div>
            </div>
            {section.isExpanded && (
              <div className="section-expanded">
                {renderExpandedContent(section.id)}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 管理员功能模块 */}
      {isAdmin && (
        <div className="admin-sections">
          <h2 className="admin-title">Admin Functions</h2>
          {adminSections.map((section) => (
            <div key={section.id} className="info-section admin-section">
              <div 
                className="section-header"
                onClick={() => toggleSection(section.id, true)}
              >
                <div className="section-icon">{section.icon}</div>
                <div className="section-content">
                  <h3 className="section-title">{section.title}</h3>
                  <p className="section-subtitle">{section.subtitle}</p>
                </div>
                <div className={`expand-arrow ${section.isExpanded ? 'expanded' : ''}`}>
                  ▼
                </div>
              </div>
              {section.isExpanded && (
                <div className="section-expanded">
                  {renderExpandedContent(section.id)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 退出登录按钮 */}
      <div className="logout-section">
        <button onClick={logout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Settings;
