import React from "react";
interface CloseButtonProps {
  onClick: () => void;
}
const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: "30px",
        fontSize: "30px",
        cursor: "pointer",
        backgroundColor: "transparent",
        border: "none",
      }}
    >
      x
    </button>
  );
};

export default CloseButton;
