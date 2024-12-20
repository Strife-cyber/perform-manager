import React, { useEffect, useState } from "react";
import { Support } from "../requests/supports_requests";
import useUser from "../requests/user_requests";
import DocumentViewer from "./doc_viewer_component";
import { downloadFileToBrowser, fetchDocumentUri } from "./helper_functions";
import useFile from "../requests/file_requests";

interface SupportFormCardProps {
    form: Support;
    width?: string;
    height?: string;
    onClick?: () => void;
}

const SupportFormCard: React.FC<SupportFormCardProps> = ({
    form,
    width = "330px",
    height = "330px"
}) => {
    const [openViewer, setOpenViewer] = useState(false);
    const [userName, setUserName] = useState<string | null>(null);
    const [documentUri, setDocumentUri] = useState<string | null>(null);
    const [documentHtml, setDocumentHtml] = useState<string | null>(null);

    const { downloadFile } = useFile();
    const { get_user_profile } = useUser();

    useEffect(() => {
        const fetchUserProfile = async () => {
          try {
            const userProfile = await get_user_profile(form.uploaded_by);
            setUserName(userProfile.user.name);
          } catch (error) {
            console.error("Error fetching user profile:", error);
          }
        };
    
        fetchUserProfile();
    }, [form.uploaded_by, get_user_profile]);

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
                (e.currentTarget.style.transform = "none")
            }
            onClick={async () => { await fetchDocumentUri(form.path, setDocumentHtml, setDocumentUri); setOpenViewer(true) }}
        >
            <div>
                <h3 style={{ margin: "0 0 1.5rem 0", fontSize: "1.2rem", fontWeight: "bold", color: "#333" }}> {form.title} </h3>
                <p style={{ margin: "0 0 0.5rem 0", color: "#555", fontSize: "1rem" }}> {form.description} </p>
            </div>

            <p style={{ margin: "0 0 0.5rem 0", color: "#777", fontSize: "0.8rem" }}>
                Assigned by: <strong>{userName || form.uploaded_by}</strong>
            </p>

            {openViewer && (
                <DocumentViewer 
                    documentHtml={documentHtml} 
                    documentUri={documentUri} 
                    onClose={() => setOpenViewer(false)} 
                    downloadFunction={async () => downloadFileToBrowser(await downloadFile(form.path), form.title)}
                />
            )}
        </div>
    )
}

export default SupportFormCard;
