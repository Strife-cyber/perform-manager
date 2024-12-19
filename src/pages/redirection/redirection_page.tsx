import React from "react";
import "./redirection_page.css";

const RedirectionPage: React.FC = () => {
  return (
    <div className="redirection-container">
      <div className="animated-shapes">
        <div className="circle"></div>
        <div className="triangle"></div>
        <div className="square"></div>
      </div>
      <div className="content">
        <h1 className="title">Access Denied</h1>
        <p className="message">
          You are currently logged in as a guest or lack the necessary permissions to access this page.
        </p>
        <button
          className="home-button"
          onClick={() => (window.location.href = "/")}
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default RedirectionPage;
