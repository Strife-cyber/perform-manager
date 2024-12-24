import api from "../api";
import { useAppContext } from "../context/context";

// User interface
export interface User {
    id?: string;
    name?: string;
    email: string;
    password: string;
}

const useUser = () => {
    const { login, logout, userId } = useAppContext(); // Destructure context methods and userId

    // Register a new user
    const register_user = async (user: User) => {
        try {
            const response = await api.post('/users/register', user);
            if (response.data.userId) {
                login(response.data.userId); // Log in the user upon successful registration
            } else {
                throw new Error("Registration successful, but user login failed.");
            }
        } catch (error: any) {
            throw new Error(`Registration error: ${error.response?.data?.message || error.message}`);
        }
    };

    // Log in a user
    const login_user = async (email: string, password: string) => {
        try {
            const response = await api.post('/users/login', { email, password });
            if (response.data.userId) {
                login(response.data.userId); // Log in the user upon successful login
            } else {
                throw new Error("Login failed: Unable to retrieve user ID.");
            }
        } catch (error: any) {
            throw new Error(`Login error: ${error.response?.data?.message || error.message}`);
        }
    };

    // Log out a user
    const logout_user = async (id?: string) => {
        try {
            const userToLogout = id || userId; // Use provided ID or fallback to current context userId
            if (!userToLogout) throw new Error("No user ID available for logout.");

            const response = await api.get('/users/logout', {
                params: { id: userToLogout },
            });

            if (response.status === 200) {
                logout(); // Clear user data from the context
            } else {
                throw new Error("Failed to log out the user.");
            }
        } catch (error: any) {
            throw new Error(`Logout error: ${error.response?.data?.message || error.message}`);
        }
    };

    // Check user authentication status
    const user_status = async (id?: string) => {
        try {
            const currentUser = id || userId; // Use provided ID or fallback to current context userId
            if (!currentUser) throw new Error("No user ID available for status check.");

            const response = await api.get('/users/status', {
                params: { id: currentUser },
            });

            if (response.data) {
                return response.data.authenticated;
            } else {
                throw new Error("Failed to retrieve user status.");
            }
        } catch (error: any) {
            throw new Error(`User status error: ${error.response?.data?.message || error.message}`);
        }
    };

    // Fetch user profile
    const get_user_profile = async (id?: string) => {
        try {
            const currentUser = id || userId; // Use provided ID or fallback to current context userId
            if (!currentUser) throw new Error("No user ID available for fetching profile.");

            const response = await api.get('/users/profile', {
                params: { id: currentUser },
            });

            if (response.data) {
                return response.data; // Return the user profile data
            } else {
                throw new Error("Failed to retrieve user profile.");
            }
        } catch (error: any) {
            throw new Error(`User profile error: ${error.response?.data?.message || error.message}`);
        }
    };

    // Update user details
    const update_user = async (id: string, updatedData: Partial<User>) => {
        try {
            const currentUser = id || userId; // Use provided ID or fallback to current context userId
            if (!currentUser) throw new Error("No user ID available for update.");

            const response = await api.put('/users', updatedData, {
                params: { id: currentUser },
            });

            if (response.status === 200) {
                return response.data; // Return the updated user data
            } else {
                throw new Error("Failed to update user details.");
            }
        } catch (error: any) {
            throw new Error(`User update error: ${error.response?.data?.message || error.message}`);
        }
    };

    // Get user role
    const get_role = async (id: string | null) => {
        try {
            const currentUser = id || userId;
            if (!currentUser) throw new Error("No user ID available for role.");
    
            const response = await api.get('/users/role', {
                params: { id: currentUser }
            });
    
            if (response.status === 200) {
                return response.data;  // Return role if found
            } else {
                return {"role": null};
            }
        } catch (error: any) {
            if (error.response?.status === 404) {
                // Handle case when no role is found (404)
                console.log("No role assigned to this user.");
                return null;  // Return null if no role exists
            }
            // Handle other errors
            throw new Error(`User fetch error: ${error.response?.data?.message || error.message}`);
        }
    };    

    return { register_user, login_user, logout_user, user_status, get_user_profile, update_user, get_role };
};

export default useUser;
