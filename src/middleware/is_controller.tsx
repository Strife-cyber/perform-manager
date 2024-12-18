import React, { ReactNode, useEffect, useState } from "react";
import { useAppContext } from "../context/context";
import useUser from "../requests/user_requests";

interface ProtectedRouteProps {
  children: ReactNode;
}

const IsControllerWare: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { userId } = useAppContext();
  const { get_role } = useUser();

  const [isController, setIsController] = useState(false);

  useEffect(() => {
    const fetchRole = async () => {
      if (!userId) return; // Ensure userId exists before making the request

      try {
        const role = await get_role(userId);

        if (role.role === "controller") {
          setIsController(true);
        } else {
          setIsController(false); // Explicitly handle non-controller roles
        }
      } catch (error) {
        console.error("Error fetching role:", error);
        setIsController(false); // Default to `false` if there's an error
      }
    };

    fetchRole();
  }, [userId, get_role]); // Add dependencies to the useEffect hook

  return isController ? <>{children}</> : null; // Navigate to a new page here
};

export default IsControllerWare;
