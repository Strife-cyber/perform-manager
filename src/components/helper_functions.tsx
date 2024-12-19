import mammoth from "mammoth";
import useFile from "../requests/file_requests";

export const downloadFileToBrowser = async (fileBlob: Blob, fileName: string) => {
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

export const fetchDocumentUri = async (path: string, setDocumentHtml: (arg0: string | null) => void, setDocumentUri: (arg0: string | null) => void) => {
    const { downloadFile } = useFile();

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