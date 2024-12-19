import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface NavigationBarProps {
  onNavigate: (section: string) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ onNavigate }) => {
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
        fontFamily: "Montaga"
      }}
    >
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
            marginRight: "20px",
          }}
        >
          <li className="nav-item">
            <a
              className="nav-link"
              href="#evaluations"
              onClick={() => onNavigate("evaluations")}
              style={{ color: "black", transition: "color 0.3s ease" }}
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
              onClick={() => onNavigate("feedback")}
              style={{ color: "black", transition: "color 0.3s ease" }}
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
              onClick={() => onNavigate("documents")}
              style={{ color: "black", transition: "color 0.3s ease" }}
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
              onClick={() => onNavigate("goals")}
              style={{ color: "black", transition: "color 0.3s ease" }}
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
