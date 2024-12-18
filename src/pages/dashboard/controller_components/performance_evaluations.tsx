import React from "react";
import ViewingArea from "./viewing_area";
import CreateEvaluationForm from "./evaluation_form";

const PerformanceEvaluations: React.FC = () => {
  return (
    <div
      style={{
        minHeight: "80vh",
        width: "100vw", // Full width for large screens
        backgroundColor: "#F8F8F8",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem", // Padding for spacing
        boxSizing: "border-box", // Include padding in width calculation
        fontFamily: "Montaga"
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap", // Wrap content on smaller screens
          gap: "1.5rem", // Space between components
          width: "100%",
          maxWidth: "1200px", // Limit the max width for readability
        }}
      >
        {/* Create Evaluation Form */}
        <div
          style={{
            flex: "1 1 40%", // Take 40% of width or shrink if necessary
            minWidth: "300px", // Ensure a minimum width
            backgroundColor: "white", // Card background
            padding: "2rem",
            borderRadius: "10px", // Rounded corners
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
            border: "1px solid #ddd", // Border for definition
          }}
        >
          <h4
            style={{
              fontWeight: "600",
              color: "#333",
              textAlign: "center",
              marginBottom: "1.5rem",
            }}
          >
            Create Evaluation Form
          </h4>
          <CreateEvaluationForm />
        </div>

        {/* Viewing Area */}
        <div
          style={{
            flex: "1 1 60%", // Take 60% of width or shrink if necessary
            minWidth: "300px", // Ensure a minimum width
            backgroundColor: "white", // Card background
            padding: "2rem",
            borderRadius: "10px", // Rounded corners
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
            border: "1px solid #ddd", // Border for definition
            overflowY: "auto", // Enable scrolling for long content
            maxHeight: "70vh", // Limit height for scrolling
          }}
        >
          <h4
            style={{
              fontWeight: "600",
              color: "#333",
              textAlign: "center",
              marginBottom: "1.5rem",
            }}
          >
            Viewing Area
          </h4>
          <ViewingArea />
        </div>
      </div>
    </div>
  );
};

export default PerformanceEvaluations;
