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
      className="navbar navbar-expand-lg"
      style={{
        background: "linear-gradient(135deg, #FFFDE1, #D4F1F9)", // Modern gradient
        padding: "1rem",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)", // Slightly stronger shadow
        fontFamily: "Montaga, sans-serif",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <a
        className="navbar-brand"
        href="#"
        style={{
          fontSize: "1.8rem",
          fontWeight: "bold",
          color: "#1E293B", // Modern dark slate color
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)", // Subtle text shadow
        }}
      >
        Employee Portal
      </a>

      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleMenu}
        aria-controls="navbarNav"
        aria-expanded={isMenuOpen ? "true" : "false"}
        aria-label="Toggle navigation"
        style={{
          border: "none",
          background: "transparent",
        }}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
        id="navbarNav"
      >
        <ul
          className="navbar-nav ms-auto"
          style={{
            gap: "1.5rem", // Spacing between links
            fontSize: "1rem",
            fontWeight: "500",
          }}
        >
          <li className="nav-item">
            <a
              className="nav-link"
              href="#evaluation-forms"
              onClick={() => onNavigate("evaluation-forms")}
              style={{ color: "#1E293B", transition: "color 0.3s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#0D6EFD")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#1E293B")}
            >
              Evaluation Forms
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#action-plans"
              onClick={() => onNavigate("action-plans")}
              style={{ color: "#1E293B", transition: "color 0.3s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#0D6EFD")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#1E293B")}
            >
              Action Plans
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#personal-progress"
              onClick={() => onNavigate("personal-progress")}
              style={{ color: "#1E293B", transition: "color 0.3s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#0D6EFD")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#1E293B")}
            >
              Personal Progress
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#other-documents"
              onClick={() => onNavigate("other-documents")}
              style={{ color: "#1E293B", transition: "color 0.3s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#0D6EFD")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#1E293B")}
            >
              Other Documents
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
