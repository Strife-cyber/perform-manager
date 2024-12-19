import React from "react";

interface DocumentViewerProps {
  documentHtml: string | null;
  documentUri: string | null;
  onClose: () => void;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({
  documentHtml,
  documentUri,
  onClose,
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
      <div style={{ position: "relative", width: "80%", height: "80%" }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            backgroundColor: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "2rem",
            height: "2rem",
            cursor: "pointer",
          }}
        >
          X
        </button>
        {/* Render either HTML content for Word documents or a Blob URL for other files */}
        {documentHtml ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              overflowY: "auto",
              padding: "1rem",
              backgroundColor: "white",
            }}
            dangerouslySetInnerHTML={{ __html: documentHtml }}
          />
        ) : (
          documentUri && <iframe src={documentUri} style={{ width: "100%", height: "100%" }} />
        )}
      </div>
    </div>
  );
};

export default DocumentViewer;
