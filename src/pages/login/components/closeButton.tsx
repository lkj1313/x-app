import React from "react";
interface CloseButtonProps {
  onClick: () => void;
}
const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <button
        type="button"
        onClick={onClick}
        style={{
          width: "30px",

          cursor: "pointer",
          backgroundColor: "transparent",
          border: "none",
          fontSize: "20px",
        }}
      >
        x
      </button>
    </div>
  );
};

export default CloseButton;
