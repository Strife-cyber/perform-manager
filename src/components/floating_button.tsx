import React from "react";

interface FloatingButtonProps {
  onClick: () => void;
  title: string;
  bottom?: string;
  right?: string;
  top?: string;
  left?: string;
  color?: string;
  hoverColor?: string;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  onClick,
  title,
  bottom = "20px", // Default position 20px from bottom
  right = "20px", // Default position 20px from right
  top,
  left,
  color = "#E0FFFF", // Default color blue
  hoverColor = "grey", // Default hover color
}) => {
  return (
    <button
      onClick={onClick}
      title={title} // Hint on hover (tooltip)
      style={{
        position: "absolute",
        bottom: bottom,
        top: top,
        right: right,
        left: left,
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        padding: "0",
        fontSize: "30px",
        lineHeight: "60px", // Ensures vertical centering
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: color, // Background color
        borderColor: color, // Border color to match the background
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        transition: "background-color 0.3s ease",
        cursor: "pointer",
        fontWeight: "bold", // Optionally make the plus sign bold
        fontFamily: "Arial, sans-serif", // Consistent font family
        zIndex: "1000"
      }}
      onMouseEnter={(e: React.MouseEvent) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = hoverColor; // Change color on hover
      }}
      onMouseLeave={(e: React.MouseEvent) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = color; // Revert to original color
      }}
    >
      +
    </button>
  );
};

export default FloatingButton;
