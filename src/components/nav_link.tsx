import React from 'react';

interface NavLinkProps {
  placeholder: string; // Text displayed for the link
  link: string;        // URL the link points to
  color?: string;      // Default link color
  mouseover?: string;  // Color on hover
  mouseout?: string;   // Color after hover
}

const NavLink: React.FC<NavLinkProps> = ({ 
  link, 
  placeholder, 
  color = '#007bff', 
  mouseover = '#0056b3', 
  mouseout = '#007bff' 
}) => {
  return (
    <a
      href={link}
      style={{
        position: 'relative',
        textDecoration: 'none',
        color: color,
        fontWeight: '500',
        display: 'inline-block',
        transition: 'color 0.3s ease-in-out',
        overflow: 'hidden',
        cursor: 'pointer'
      }}
      onMouseOver={(e) => (e.currentTarget.style.color = mouseover)}
      onMouseOut={(e) => (e.currentTarget.style.color = mouseout)}
    >
      {placeholder}
      <span
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          width: '0%',
          height: '2px',
          backgroundColor: mouseover,
          transition: 'all 0.3s ease-in-out',
          transform: 'translateX(-50%)',
        }}
        className="underline"
      ></span>
    </a>
  );
};

export default NavLink;
