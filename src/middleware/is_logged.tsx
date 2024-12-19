import { ReactNode } from "react";
import { useAppContext } from "../context/context";
import AuthPage from "../pages/auth_page/auth_page";

interface ProtectedRouteProps {
    children: ReactNode;
}

const IsLogged: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { userId } = useAppContext();

    return userId != null ? <>{children}</> : <AuthPage/>
}

export default IsLogged;