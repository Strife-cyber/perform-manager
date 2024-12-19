import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useUser from "../requests/user_requests";

// Define the types for the props
interface DocumentCardProps {
  id: string;
  title: string;
  description: string;
  uploadedBy: string;
  onViewDocument: () => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({
  id,
  title,
  description,
  uploadedBy,
  onViewDocument,
}) => {
  const { get_user_profile } = useUser();
  const [uploadedByName, setUploadedByName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await get_user_profile(uploadedBy);
        setUploadedByName(userProfile.user.name);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <motion.div
      key={id}
      style={{
        width: "300px",
        height: "300px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        backgroundColor: "#fff",
        padding: "1rem",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
      }}
      whileHover={{ scale: 1.05 }} // Hover animation
      transition={{ duration: 0.3 }}
    >
      <h4 style={{ height: "20%", fontSize: "1rem", fontWeight: "bold" }}>{title}</h4>
      <p style={{ height: "40%", fontSize: "0.9rem", color: "#555" }}>{description}</p>
      <p style={{ fontSize: "0.6rem", color: "#777" }}>
        <strong>Uploaded By:</strong> {uploadedByName || "Loading..."}
      </p>
      <motion.button
        onClick={onViewDocument}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          transition: "background-color 0.3s",
        }}
        whileHover={{ backgroundColor: "#0056b3" }}
      >
        View Document
      </motion.button>
    </motion.div>
  );
};

export default DocumentCard;
