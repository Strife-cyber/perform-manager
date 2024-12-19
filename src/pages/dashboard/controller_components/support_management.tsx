import React, { useEffect, useState } from "react";
import useSupport, { Support } from "../../../requests/supports_requests";
import TextFieldComponent from "../../../components/text_field_component";
import FileComponent from "../../../components/file_component";
import StandardButton from "../../../components/standard_button";
import useFile from "../../../requests/file_requests";
import { useAppContext } from "../../../context/context";
import * as mammoth from "mammoth"; // Import mammoth for handling Word files
import DocumentViewer from "../../../components/doc_viewer_component"; // Import the new component
import DocumentCard from "../../../components/document_card";

const SupportManagement: React.FC = () => {
  const { userId } = useAppContext();
  const { uploadFile, downloadFile } = useFile();
  const { getAllSupports, createSupport } = useSupport();
  const [supports, setSupports] = useState<Support[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Support | null>(null);
  const [newSupport, setNewSupport] = useState<Support>({
    title: "",
    description: "",
    path: "",
    uploaded_by: "",
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [documentUri, setDocumentUri] = useState<string | null>(null); // State for URI
  const [documentHtml, setDocumentHtml] = useState<string | null>(null); // State for HTML content

  // Fetch all supports on component mount
  useEffect(() => {
    fetchSupports();
  }, []);

  useEffect(() => {
    if (selectedDocument) {
      // Clear previous document data before fetching a new document
      setDocumentHtml(null);
      setDocumentUri(null);
      fetchDocumentUri(selectedDocument.path); // Fetch URI when document is selected
    }
  }, [selectedDocument]);

  const fetchSupports = async () => {
    try {
      const data = await getAllSupports();
      setSupports(data);
    } catch (error) {
      console.error("Error fetching supports:", error);
    }
  };

  const handleFileUpload = (files: File[]): void => {
    setUploadedFiles(files);
    console.log("Uploaded files:", files);
  };

  const uploadSupport = async () => {
    if (!uploadedFiles.length) {
      console.error("No files uploaded!");
      return;
    }

    try {
      const uploaded = await uploadFile(uploadedFiles[0]);
      const filepath = uploaded.path;

      setNewSupport({ ...newSupport, path: filepath, uploaded_by: userId! });
      await createSupport(newSupport);
      console.log("Support document uploaded", newSupport);
    } catch (error) {
      console.error("Error uploading support document:", error);
    }
  };

  const fetchDocumentUri = async (path: string) => {
    try {
      const fileBlob = await downloadFile(path); // Download the file as a Blob
  
      if (fileBlob && fileBlob.size > 0) {
        // Handle Word files specifically
        if (fileBlob.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
          const arrayBuffer = await fileBlob.arrayBuffer(); // Convert Blob to ArrayBuffer
          mammoth.convertToHtml({ arrayBuffer })
            .then((result) => {
              setDocumentHtml(result.value); // Store the HTML content for rendering
            })
            .catch((err) => {
              console.error("Error converting Word file:", err);
            });
        } else {
          // For non-Word files, create a Blob URL
          const fileURL = URL.createObjectURL(fileBlob);
          setDocumentUri(fileURL); // Set the URI for rendering non-Word files
        }
      } else {
        console.error("Received an empty file or Blob");
      }
    } catch (error) {
      console.error("Error fetching document URI:", error);
    }
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem", fontFamily: "Montaga" }}>
        Support Management
      </h2>

      {/* Upload Form */}
      <form
        onSubmit={uploadSupport}
        style={{
          marginBottom: "2rem",
          padding: "1.5rem",
          border: "1px solid #ddd",
          borderRadius: "10px",
          backgroundColor: "#fff",
        }}
      >
        <h3 style={{ marginBottom: "3rem", fontSize: "18px", fontFamily: "Pacifico" }}>
          Upload New Support Document
        </h3>
        <div style={{ marginBottom: "2rem" }}>
          <TextFieldComponent
            placeholder="Document Title"
            value={newSupport.title}
            onChange={(e) => setNewSupport({ ...newSupport, title: e.target.value })}
            width="100%"
            height="50px"
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <TextFieldComponent
            placeholder="Description"
            value={newSupport.description}
            onChange={(e) => setNewSupport({ ...newSupport, description: e.target.value })}
            width="100%"
            height="80px"
          />
        </div>
        <div style={{ marginBottom: "3rem", marginTop: "3rem" }}>
          <FileComponent onFilesUploaded={handleFileUpload} />
        </div>
        <StandardButton placeholder="Upload" width="100%" />
      </form>

      {/* Document List with Animations */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1.5rem",
          justifyContent: "center",
          marginTop: "3rem",
        }}
      >
        {supports.map((support) => (
            <DocumentCard key={support.id} id={support.id!.toString()} title={support.title} description={support.description} uploadedBy={support.uploaded_by} onViewDocument={() => setSelectedDocument(support)} />
        ))}
      </div>

      {/* Show Document Viewer */}
      {selectedDocument && (
        <DocumentViewer
          documentHtml={documentHtml}
          documentUri={documentUri}
          onClose={() => setSelectedDocument(null)}
        />
      )}
    </div>
  );
};

export default SupportManagement;
