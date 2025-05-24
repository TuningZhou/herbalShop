// src/pages/LandingPageFinal.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable"; // 新增导入
import "../styles/landing-pages.css";
import "../styles/button-transitions.css";
import { TelegramMainButtonSDK } from "../services/telegramsdk/TelegramMainButton";
import { TelegramBackButtonSDK } from "../services/telegramsdk/TelegramBackButton";
// import herbsCollectionImage from '../assets/images/herbs-collection.png'; // LandingPageFinal 使用背景图，此导入可能不需要
import TelegramIcon from "@/assets/icons/Telegram-icon.svg?react"; // 修改导入路径，添加 ?react
import { openPopup, isPopupOpened } from "@telegram-apps/sdk"; // 新增

const LandingPageFinal: React.FC = () => {
  const navigate = useNavigate();
  const [accessKey, setAccessKey] = useState("");
  const [referralCode, setReferralCode] = useState(""); // 直接用作输入值
  const [error, setError] = useState("");
  const [buttonSuccess, setButtonSuccess] = useState(false);
  const [buttonText, setButtonText] = useState("VERIFY");

  // 添加处理推荐码变更的函数
  const handleReferralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReferralCode(e.target.value);
  };

  // 添加处理访问密钥变更的函数
  const handleAccessKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccessKey(e.target.value);
    if (error) setError(""); // Corrected setError call
  };

  const handleVerify = async () => {
    if (!accessKey.trim()) {
      setError(''); // Corrected setError call with empty string
      if (openPopup.isAvailable()) {
        await openPopup({
          title: "Access Key Error",
          message:
            "AccessKey input error or empty. Please contact us by Telegram.",
          buttons: [{ id: "access-key-input-Popupid", type: "ok" }], // Removed text: "OK" 
        });
      }
      return;
    }

    // 验证通过，触发按钮动效
    setButtonSuccess(true);
    setButtonText("SUCCEED");

    // 可选：2秒后重置按钮状态
    // setTimeout(() => {
    //   setButtonSuccess(false);
    //   setButtonText("VERIFY");
    // }, 2000);
  };

  const handleContactUs = () => {
    // 实现联系我们的逻辑，例如打开Telegram联系方式
    window.open("https://t.me/your_contact_username", "_blank");
  };

  // 添加 Telegram MainButton
  useEffect(() => {
    // 检查支持性
    if (TelegramMainButtonSDK.Support.isSupported()) {
      // 挂载按钮
      TelegramMainButtonSDK.Lifecycle.mount();

      // 设置按钮文本和属性
      TelegramMainButtonSDK.Properties.setParams({
        text: "CONTINUE",
        isVisible: true,
        isEnabled: true,
      });

      // 添加点击事件
      const off = TelegramMainButtonSDK.Events.onClick(() => {
        // 点击后立即设置按钮不可见
        TelegramMainButtonSDK.Properties.setParams({
          isVisible: false,
        });

        // 跳转到商店主页
        navigate("/shop");

        // 解绑事件并卸载主按钮，释放内存
        off();
        TelegramMainButtonSDK.Lifecycle.unmount();
      });

      // 返回清理函数
      return () => {
        off();
        TelegramMainButtonSDK.Lifecycle.unmount();
      };
    }
  }, [accessKey, navigate]);

  // 添加 Telegram BackButton
  useEffect(() => {
    // 检查支持性
    if (TelegramBackButtonSDK.Support.isSupported()) {
      // 挂载返回按钮
      TelegramBackButtonSDK.Lifecycle.mount();

      // 显示返回按钮
      TelegramBackButtonSDK.Display.show();

      // 添加点击事件
      const off = TelegramBackButtonSDK.Events.onClick(() => {
        navigate(-1);
      });

      // 返回清理函数
      return () => {
        off();
        TelegramBackButtonSDK.Lifecycle.unmount();
      };
    }
  }, [navigate]);

  // 滑动处理
  const swipeHandlers = useSwipeable({
    // onSwipedLeft: () => {} // 最后一页，向左滑动无操作或根据需求调整
    onSwipedRight: () => navigate("/landing-2"),
    trackMouse: true, // 可选：允许鼠标滑动测试
  });

  return (
    <div className="landing-page landing-page-final" {...swipeHandlers}>
      <div className="landing-content">
        <h1>Welcome to herbalShop</h1>

        <div className="access-form">
          {/* 推荐人邀请码（非必填）- 直接用 input */}
          <div className="form-group">
            <label>ENTER REFERRAL CODE</label>
            <input
              type="text"
              value={referralCode}
              onChange={handleReferralChange}
              placeholder="REFERRAL CODE (OPTIONAL)"
              className="referral-input"
            />
          </div>

          {/* 访问密钥（必填） */}
          <div className="form-group">
            <label>ENTER ACCESS KEY</label>
            <div className="access-key-container">
              <input
                type="text"
                value={accessKey}
                onChange={handleAccessKeyChange}
                placeholder="ACCESS KEY"
                className={`access-key-input ${error ? "error" : ""}`}
              />

              <button
                className={`verify-button ${buttonSuccess ? "success-ripple" : ""}`}
                onClick={handleVerify}
              >
                <span>{buttonText}</span>
              </button>
            </div>
            {error && <p className="error-message">{error}</p>}
          </div>

          {/* 联系我们 */}
          <div className="contact-section">
            <p>DON'T HAVE ACCESS KEY ?</p>
            <p>PLEASE CONTACT US</p>
            <button className="contact-button" onClick={handleContactUs}>
              <TelegramIcon />
            </button>
          </div>
        </div>

        {/* 添加页面指示器 */}
        <div className="page-indicators">
          <span
            className="indicator"
            onClick={() => navigate("/landing-1")}
          ></span>
          <span
            className="indicator"
            onClick={() => navigate("/landing-2")}
          ></span>
          <span
            className="indicator active"
            onClick={() => navigate("/landing-final")}
          ></span>
        </div>
      </div>
    </div>
  );
};

export default LandingPageFinal;
