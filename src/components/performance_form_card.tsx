import React, { useEffect, useState } from "react";
import { Performance } from "../requests/performance_requests";
import useUser from "../requests/user_requests";
import DocumentViewer from "./doc_viewer_component";
import useFile from "../requests/file_requests";
import mammoth from "mammoth";

interface PerformanceFormCardProps {
  form: Performance;
  width?: string; // Optional width (e.g., "300px", "50%")
  height?: string; // Optional height (e.g., "200px", "auto")
  onClick?: () => void;
}

const PerformanceFormCard: React.FC<PerformanceFormCardProps> = ({
  form,
  width = "330px",
  height = "330px",
  onClick = () => console.log("clicked"),
}) => {
  const [openViewer, setOpenViewer] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [documentUri, setDocumentUri] = useState<string | null>(null);
  const [documentHtml, setDocumentHtml] = useState<string | null>(null);
  const [clickTimeout, setClickTimeout] = useState<number | null>(null);

  const { get_user_profile } = useUser();
  const { downloadFile } = useFile();

  const formattedDueDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(form.due_date));

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await get_user_profile(form.created_by);
        setUserName(userProfile.user.name);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [form.created_by, get_user_profile]);

  const downloadFileToBrowser = async (fileBlob: Blob, fileName: string) => {
    const fileURL = URL.createObjectURL(fileBlob);

    // Create a temporary <a> element
    const link = document.createElement("a");
    link.href = fileURL;
    link.download = fileName; // Set the desired file name for the download
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Clean up by removing the link and revoking the object URL
    document.body.removeChild(link);
    URL.revokeObjectURL(fileURL);
  };

  const fetchDocumentUri = async (path: string) => {
    try {
      const fileBlob = await downloadFile(path);
      if (fileBlob && fileBlob.size > 0) {
        if (
          fileBlob.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          const arrayBuffer = await fileBlob.arrayBuffer();
          mammoth
            .convertToHtml({ arrayBuffer })
            .then((result) => {
              setDocumentHtml(result.value);
            })
            .catch((err) => {
              console.error("Error converting Word file:", err);
            });
        } else {
          const fileURL = URL.createObjectURL(fileBlob);
          setDocumentUri(fileURL);
        }
      } else {
        console.error("Received an empty file or Blob");
      }
    } catch (error) {
      console.error("Error fetching document URI:", error);
    }
  };

  const handleSingleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleDoubleClick = async () => {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
    }
    await fetchDocumentUri(form.path);
    setOpenViewer(true);
  };

  const handleClick = () => {
    if (clickTimeout) {
      clearTimeout(clickTimeout); // If there's already a pending single click, clear it
      setClickTimeout(null);
      handleDoubleClick(); // Handle as double-click
    } else {
      // Set timeout for single click
      const timeout = window.setTimeout(() => {
        handleSingleClick();
        setClickTimeout(null);
      }, 200); // Adjust timeout as needed
      setClickTimeout(timeout);
    }
  };

  return (
    <div
      style={{
        width,
        height,
        background: "linear-gradient(135deg, #FFFDE1, #E0FFFF)",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        fontFamily: "Montaga",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "scale(1.05) translateY(-5px)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = "scale(1) translateY(0)")
      }
      onClick={handleClick}
    >
      <div>
        <h3
          style={{
            margin: "0 0 1.5rem 0",
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          {form.title}
        </h3>
        <p
          style={{
            margin: "0 0 0.5rem 0",
            color: "#555",
            fontSize: "1rem",
          }}
        >
          {form.description}
        </p>
      </div>

      <div>
        <p
          style={{
            margin: "0 0 0.5rem 0",
            color: "#777",
            fontSize: "0.8rem",
          }}
        >
          Assigned by: <strong>{userName || form.created_by}</strong>
        </p>
        <p
          style={{
            margin: "0",
            color: "#777",
            fontSize: "0.8rem",
          }}
        >
          Due Date: <strong>{formattedDueDate}</strong>
        </p>
      </div>

      {openViewer && (
        <DocumentViewer
          documentHtml={documentHtml}
          documentUri={documentUri}
          onClose={() => setOpenViewer(false)}
          downloadFunction={async () =>
            downloadFileToBrowser(await downloadFile(form.path), form.title)
          }
        />
      )}
    </div>
  );
};

export default PerformanceFormCard;
