import { useEffect, useState } from "react";

const AdminNavbar = ({ activeTab, setActiveTab }: any) => {
  const navItems = [
    { id: "employees", label: "Employees" },
    { id: "controllers", label: "Controllers" },
    { id: "users", label: "Users" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(window.innerWidth < 760);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 760);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav
      style={{
        fontFamily: "Montaga, sans-serif",
        background: "linear-gradient(135deg, #FFFDE1, #E0FFFF)",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        display: "flex",
        flexDirection: isSmallScreen ?  "column" : "row",
        justifyContent: isSmallScreen ? "none" : "space-between",
        alignItems: "stretch",
        padding: "0 1rem",
      }}
    >
      {/* Top Section: Brand + Menu Icon */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 0",
        }}
      >
        <a
          href="/admin"
          style={{
            color: "black",
            fontWeight: "bold",
            fontSize: "1.5rem",
            textDecoration: "none",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            if (isSmallScreen) e.currentTarget.style.color = "#6a11cb";
          }}
          onMouseLeave={(e) => {
            if (isSmallScreen) e.currentTarget.style.color = "black";
          }}
        >
          Admin Dashboard
        </a>

        {isSmallScreen && (
          <button
            onClick={toggleMenu}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "1.5rem",
            }}
          >
            <i className="fas fa-bars" style={{ color: "black" }}></i>
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <ul
        style={{
          display: isSmallScreen ? (isMenuOpen ? "block" : "none") : "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          listStyle: "none",
          padding: 0,
          margin: 0,
          alignItems: isSmallScreen ? "stretch" : "center",
        }}
      >
        {navItems.map((item) => (
          <li
            key={item.id}
            style={{
              margin: isSmallScreen ? "0.5rem 0" : "0 0.5rem",
              borderRadius: "8px",
              transition: "all 0.3s ease",
              width: isSmallScreen ? "100%" : "auto",
            }}
          >
            <a
              href={`#${item.id}`}
              onClick={() => setActiveTab(item.id)}
              style={{
                background: "none",
                border: "none",
                color: activeTab === item.id ? "#6a11cb" : "black",
                fontWeight: activeTab === item.id ? "bold" : "normal",
                padding: "0.7rem 1.5rem",
                width: "100%",
                textAlign: "center",
                transition: "color 0.3s ease, font-weight 0.3s ease",
                fontSize: "1rem",
                cursor: "pointer",
                borderRadius: "5px",
                textDecoration: "none",
                marginBottom: isSmallScreen ? "0" : "2rem"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#6a11cb";
                e.currentTarget.style.backgroundColor = " #D3D3D3";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color =
                  activeTab === item.id ? "#6a11cb" : "black";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AdminNavbar;
