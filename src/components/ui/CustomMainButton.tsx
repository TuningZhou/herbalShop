import React from "react";
import "./CustomMainButton.css";

interface CustomMainButtonProps {
  text: string;
  onClick: () => void;
  isEnabled?: boolean;
  backgroundColor?: string;
  textColor?: string;
}

const CustomMainButton: React.FC<CustomMainButtonProps> = ({
  text,
  onClick,
  isEnabled = true,
  backgroundColor = "#007AFF",
  textColor = "#FFFFFF",
}) => {
  return (
    <div className="custom-main-button-container">
      <button
        className="custom-main-button"
        onClick={onClick}
        disabled={!isEnabled}
        style={{ backgroundColor, color: textColor }}
      >
        {text}
      </button>
    </div>
  );
};

export default CustomMainButton;
