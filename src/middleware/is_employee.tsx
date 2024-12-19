import React, { ReactNode, useEffect, useState } from "react";
import { useAppContext } from "../context/context";
import useUser from "../requests/user_requests";
import RedirectionPage from "../pages/redirection/redirection_page";

interface ProtectedRouteProps {
    children: ReactNode;
}

const IsEmployeeWare: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { userId } = useAppContext();
    const { get_role } = useUser();

    const [isEmployee, setIsEmployee] = useState(false);

    useEffect(() => {
        const fetchRole = async () => {
            if (!userId) return;

            try {
                const role = await get_role(userId);

                if (role.role == "employee") {
                    setIsEmployee(true)
                } else {
                    setIsEmployee(false)
                }
            } catch (error) {
                console.error("Error fetching role:", error);
                setIsEmployee(false)
            }
        };

        fetchRole();
    }, [userId, get_role]);

    return isEmployee ? <>{children}</> : <RedirectionPage/>;
}

export default IsEmployeeWare;
