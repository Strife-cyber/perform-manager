import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";

interface ContextFunctions {
    userId: string | null;
    login: (id: string) => void;
    logout: () => void;
    getUpdate: () => string;
}

const AppContext = createContext<ContextFunctions | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider.");
    }
    return context;
};

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [userId, setUserId] = useState<string | null>(null);

    // Initialize userId from cookies
    useEffect(() => {
        const storedUserId = Cookies.get("userId");
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    // Functions to update context state and cookies
    const login = (id: string) => {
        setUserId(id);
        Cookies.set("userId", id);
    };

    const logout = () => {
        setUserId(null);
        Cookies.remove("userId");
    };

    const getUpdate = () => {
        return Cookies.get("userId")!;
    };

    // Memoize context value to avoid unnecessary re-renders
    const contextValue = useMemo(() => ({ userId, login, logout, getUpdate }), [userId]);

    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
