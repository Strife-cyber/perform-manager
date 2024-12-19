import React, { useState } from "react";
import useUser, { User } from "../../requests/user_requests";
import TextFieldComponent from "../../components/text_field_component";
import StandardButton from "../../components/standard_button";
import { useAppContext } from "../../context/context";
import { Toast } from "../../components/toast_component";

const ProfilePage: React.FC = () => {
    const { update_user } = useUser();
    const { userId } = useAppContext();
    const [user, setUser] = useState<User>({name: "", email: "", password: ""});

    const saveChanges = async () => {
        try {
            await update_user(userId!, user);
            Toast.success('Credentials updated');
        } catch (error) {
            Toast.error("An error occured that's all we know");
        }
    }

    return (
        <div
        style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            background: "linear-gradient(135deg, #cceff5, #e6f7d4)",
            fontFamily: "'Montserrat', sans-serif",
            padding: "2rem",
        }}
        >
        <div
            style={{
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            padding: "2rem",
            width: "100%",
            maxWidth: "600px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            }}
        >
            <h1 style={{ fontFamily: "Montaga", fontSize: "2.5rem", color: "#2c3e50", marginBottom: "0.5rem" }}>Edit Profile</h1>
            <p style={{ fontSize: "1rem", color: "#555", fontFamily: "Pacifico" }}>
                Update your information to keep your profile fresh!
            </p>

            <div style={{marginBottom: "3rem"}}></div>

            {/* Profile Form */}
            <form style={{ width: "100%" }}>
                <div style={{ marginBottom: "1rem" }}>
                    <TextFieldComponent placeholder="Enter Username" value={user.name} width="100%" onChange={(e) => setUser({ ...user, name: e.target.value })}/>
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <TextFieldComponent inputType="email" placeholder="Enter Email" value={user.email} width="100%" onChange={(e) => setUser({ ...user, email: e.target.value })}/>
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <TextFieldComponent inputType="password" placeholder="Enter New Password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} width="100%"/>
                </div>
                <div>
                    <StandardButton placeholder="Save Changes" width="100%" onClickFunction={saveChanges}/>
                </div>
            </form>
        </div>
        </div>
    );
};

export default ProfilePage;
