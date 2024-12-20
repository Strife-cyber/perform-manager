import React from "react";

interface DocumentViewerProps {
  documentHtml: string | null;
  documentUri: string | null;
  onClose: () => void;
  downloadFunction?: () => void; // Optional download function
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({
  documentHtml,
  documentUri,
  onClose,
  downloadFunction,
}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "80%",
          height: "80%",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          overflow: "hidden",
          zIndex: 1000
        }}
      >
        {/* Close Button */}
        <button
          onClick={(event) => {event.stopPropagation(); onClose()}}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            backgroundColor: "#f44336",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "2rem",
            height: "2rem",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          X
        </button>

        {/* Download Button */}
        {downloadFunction && (
          <button
            onClick={downloadFunction}
            style={{
              position: "absolute",
              bottom: "1rem",
              left: "50%",
              transform: "translateX(-50%)",
              padding: "0.75rem 1.5rem",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1rem",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#45a049")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4CAF50")}
          >
            Download
          </button>
        )}

        {/* Render Content */}
        {documentHtml ? (
          <div
            style={{
              width: "100%",
              height: "calc(100% - 4rem)", // Adjust height to account for buttons
              overflowY: "auto",
              padding: "1rem",
              backgroundColor: "#f9f9f9",
            }}
            dangerouslySetInnerHTML={{ __html: documentHtml }}
          />
        ) : (
          documentUri && (
            <iframe
              src={documentUri}
              style={{
                width: "100%",
                height: "calc(100% - 4rem)", // Adjust height to account for buttons
                border: "none",
              }}
            />
          )
        )}
      </div>
    </div>
  );
};

export default DocumentViewer;
