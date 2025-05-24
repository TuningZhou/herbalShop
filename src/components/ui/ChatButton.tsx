import React from "react";
import "./ChatButton.css";
import { openTelegramLink } from '@telegram-apps/sdk'; // Import openTelegramLink

const ChatButton: React.FC = () => {
  const handleChat = () => {
    // 集成Telegram联系客服逻辑
    if (openTelegramLink.isAvailable()) { // Check if openTelegramLink is available
      openTelegramLink("https://t.me/TuningChoubot/herbal0shop"); // Use the imported function
    }
  };

  return (
    <button className="chat-button" onClick={handleChat}>
      <svg className="chat-icon" viewBox="0 0 24 24" width="24" height="24">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
      </svg>
      <span>Live Chat</span>
    </button>
  );
};

export default ChatButton;
