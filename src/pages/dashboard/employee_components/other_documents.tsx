import React, { useEffect, useState } from "react";
import useSupport, { Support } from "../../../requests/supports_requests"
import TextFieldComponent from "../../../components/text_field_component";
import SupportFormCard from "../../../components/support_form_card";

const OtherDocuments = () => {

    /// View and download all other support documents
    const { getAllSupports } = useSupport();

    const [filter, setFilter] = useState<string>("");

    const [supportDocx, setSupportDocx] = useState<Support[]>([]);
    const [filteredDocx, setFilteredDocx] = useState<Support[]>([]);

    useEffect(() => {
        const fetchSupportDocx = async () => {
            const data = await getAllSupports();
            setSupportDocx(data);
            setFilteredDocx(data);
        };

        fetchSupportDocx();
    }, []);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        setFilter(value);
        setFilteredDocx(
            supportDocx.filter((docx) => docx.title.toLowerCase().includes(value))
        );
    }

    return (
        <div className="d-flex flex-column align-items-center" style={{ padding: "2rem", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
            <h1 style={{ fontSize: "2.2rem", marginBottom: "2.5rem", color: "#333", fontFamily: "Montaga" }}>
                All Support Documents
            </h1>

            <div style={{ width: "100%", maxWidth: "600px", marginBottom: "2rem" }}>
                <TextFieldComponent placeholder="Filter Documents" value={filter} onChange={handleFilterChange} width="100%" height="50px"/>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center", marginBottom: "3rem" }}>
                {filteredDocx.map((docx) => (<SupportFormCard form={docx}/>))}
            </div>
        </div>
    )
}

export default OtherDocuments;
