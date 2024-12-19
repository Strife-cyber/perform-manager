import React, { useState } from 'react';

interface StandardButtonProps {
  width?: string; // Width of the button (default: '120px')
  height?: string; // Height of the button (default: '40px')
  color?: string; // Background color of the button (default: 'blue')
  darkerColor?: string; // The darker shade for the animation
  border?: string; // Border style (default: 'none')
  placeholder?: string; // Text displayed inside the button
  onClickFunction?: () => void; // Function to handle the button click
}

const StandardButton: React.FC<StandardButtonProps> = ({
  width = '120px',
  height = '40px',
  color = '#007bff',
  darkerColor = 'darkblue',
  border = 'none',
  placeholder = 'Click Me',
  onClickFunction = () => {},
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClickFunction}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden', // Ensure the animation stays within the button
        width,
        height,
        backgroundColor: color,
        border,
        borderRadius: '5px',
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer',
        outline: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Montaga'
      }}
    >
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '0%',
            height: '0%',
            backgroundColor: darkerColor,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'expand 1s forwards',
            zIndex: 1, // Ensures the animation is above the text
          }}
        />
      )}
      <style>
        {`
          @keyframes expand {
            0% {
              width: 0%;
              height: 0%;
              opacity: 0.5;
            }
            100% {
              width: 300%;
              height: 300%;
              opacity: 1;
            }
          }
        `}
      </style>
      <span style={{ position: 'relative', zIndex: 2 }}>
        {placeholder}
      </span>
    </button>
  );
};

export default StandardButton;
