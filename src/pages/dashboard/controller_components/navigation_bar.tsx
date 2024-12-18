import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const NavigationBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className="navbar navbar-expand-lg px-3"
      style={{
        background: "linear-gradient(135deg, #FFFDE1, #E0FFFF)", // Gradient background
        color: "black",
        padding: "1rem",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for elegance
        transition: "all 0.3s ease-in-out", // Smooth transition
      }}
    >
      {/* Brand Logo */}
      <a
        className="navbar-brand"
        href="#"
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "black",
          transition: "color 0.3s ease", // Animation for hover effect
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#007bff")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "black")}
      >
        Dashboard
      </a>

      {/* Toggle Button for Mobile Screens */}
      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleMenu}
        aria-controls="navbarNav"
        aria-expanded={isMenuOpen ? "true" : "false"}
        aria-label="Toggle navigation"
        style={{
          backgroundColor: isMenuOpen ? "grey" : "",
          border: "none",
          transition: "background-color 0.3s ease",
        }}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Collapsible Menu */}
      <div
        className={`collapse navbar-collapse ${isMenuOpen ? "mt-2 show" : ""}`}
        id="navbarNav"
        style={{
          transition: "max-height 0.5s ease", // Smooth slide down
        }}
      >
        <ul
          className="navbar-nav ms-auto"
          style={{
            gap: "1.5rem", // Add spacing between links
            fontSize: "1rem",
            fontWeight: "500",
            marginRight: "20px"
          }}
        >
          <li className="nav-item">
            <a
              className="nav-link"
              href="#evaluations"
              style={{
                color: "black",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#007bff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "black")}
            >
              Evaluations
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#feedback"
              style={{
                color: "black",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#007bff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "black")}
            >
              Feedback
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#documents"
              style={{
                color: "black",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#007bff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "black")}
            >
              Support Docx
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#goals"
              style={{
                color: "black",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#007bff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "black")}
            >
              Goals
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
