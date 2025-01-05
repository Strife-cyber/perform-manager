import api from "../api";

export interface Email {
    recipient: string;
    subject: string; 
    html: string;  
}

const useEmail = () => {
    const sendMail = async (email: Email ) => {
        try {
            const response = await api.post('/mail', email);

            if (response.status == 200 || response.status == 201) {
                return response.data
            }
        } catch (error) {
            console.error("An error ocurred that's all we know");
        }
    }

    return { sendMail };
}

export default useEmail;
