import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import AdminNavbar from "./navigation_bar";
import AdminEmployeeManagement from "./employee_management_page";
import AdminControllerManagement from "./controller_management_page";
import AdminUserManagementPage from "./user_management_page";

const AdminPage: React.FC = () => {
    const [currentSection, setCurrentSection] = useState(() =>
        Cookies.get("currentSection") || "users"
    );

    useEffect(() => {
        Cookies.set("currentSection", currentSection);
    }, [currentSection]);

    // Tab content render
    const renderContent = () => {
        switch (currentSection) {
            case "employees":
                return <AdminEmployeeManagement/>;
            case "controllers":
                return <AdminControllerManagement/>;
            case "users":
                return <AdminUserManagementPage/>;
            default:
                return <p>Select a tab to manage data.</p>;
        }
    };

    return (
        <div>
            <AdminNavbar setActiveTab={setCurrentSection} />
            <main>{renderContent()}</main>
        </div>
    );
};

export default AdminPage;
