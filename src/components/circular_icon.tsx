import React, { useState } from 'react';

interface CircularIconProps {
  icon: string; // The icon class name (e.g., "fas fa-user")
  color?: string; // The color for the circular border
  size?: number; // Optional size for the icon and circle (default is 50px)
  iconSize?: number; // Optional size for the icon itself (default is 36px)
}

const CircularIcon: React.FC<CircularIconProps> = ({ icon, color='#007bff', size = 40, iconSize = 24 }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        border: hovered ? `2px dotted ${color}` : `2px solid ${color}`,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.3s ease, opacity 0.3s ease',
        transform: hovered ? 'scale(1.1)' : 'scale(1)',
        opacity: 1,
        animation: 'fadeIn 0.5s ease-in',
        cursor: 'pointer'
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <i
        className={icon}
        style={{
          fontSize: `${iconSize}px`,
          transition: 'color 0.3s ease',
          color: hovered ? '#0056b3' : color, // Change icon color on hover
        }}
      ></i>
    </div>
  );
};

export default CircularIcon;
