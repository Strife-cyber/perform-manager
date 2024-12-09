import React from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import './components.css';

interface DocViewerProps {
  documents: Array<{ uri: string; fileType?: string; fileName?: string }>;
  width?: string; // Allow customizable width
  height?: string; // Allow customizable height
}

const DocViewerComponent: React.FC<DocViewerProps> = ({
  documents,
  width = "100vw", // Default width
  height = "100vh", // Default height
}) => {
  return (
    <div style={{ width, height, overflow: "hidden" }}>
      <DocViewer
        documents={documents}
        pluginRenderers={DocViewerRenderers}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default DocViewerComponent;
