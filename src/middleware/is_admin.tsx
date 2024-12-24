import React, { ReactNode, useEffect, useState } from "react";
import { useAppContext } from "../context/context";
import useUser from "../requests/user_requests";
import RedirectionPage from "../pages/redirection/redirection_page";

interface ProtectedRouteProps {
    children: ReactNode;
}

const IsAdminWare: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { userId } = useAppContext();
    const { get_role } = useUser();

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchRole = async () => {
            if (!userId) return;

            try {
                const role = await get_role(userId);

                if (role.role == "admin") {
                    setIsAdmin(true)
                } else {
                    setIsAdmin(false)
                }
            } catch (error) {
                console.error("Error fetching role:", error);
                setIsAdmin(false)
            }
        };

        fetchRole();
    }, [userId, get_role]);

    return isAdmin ? <>{children}</> : <RedirectionPage/>;
}

export default IsAdminWare;
