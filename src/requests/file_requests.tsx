import { download, upload } from "../api";

const useFile = () => {
    // Upload a file
    const uploadFile = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append('file', file); // `file` should be a File object
            const response = await upload.post('/', formData);
            return response.data;
        } catch (error) {
            console.error('File upload failed:', error);
            throw error;
        }
    };

    // Download a file
    const downloadFile = async (filename: string): Promise<File> => {
        try {
            const response = await download.get(`/${filename}`, {
                responseType: 'blob' // Ensures the file is downloaded as a blob
            });

            return response.data;
        } catch (error) {
            console.error('File download failed:', error);
            throw error;
        }
    };

    return { uploadFile, downloadFile };
};

export default useFile;