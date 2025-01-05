import React, { useState, useEffect } from "react";
import { useEmployee } from "../../../requests/employee_requests";
import useAction from "../../../requests/action_requests";
import { useAppContext } from "../../../context/context";
import { Goal } from "../../../requests/goal_requests";
import GoalFormCard from "../../../components/goal_form_card";
import FileComponent from "../../../components/file_component";
import StandardButton from "../../../components/standard_button";
import { Toast } from "../../../components/toast_component";
import useFile from "../../../requests/file_requests";

const EmployeeGoalsPage: React.FC = () => {
  const { get_employee_goals } = useEmployee();
  const { createAction } = useAction();
  const { userId } = useAppContext();
  const { uploadFile } = useFile();

  const [goals, setGoals] = useState<Goal[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<string>("");
  const [actionPlan, setActionPlan] = useState<File>();
  const [description, setDescription] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const employeeGoals = await get_employee_goals(userId!);
        setGoals(employeeGoals);
      } catch (error) {
        console.error("Error fetching employee goals:", error);
      }
    };

    fetchGoals();
  }, [userId!, get_employee_goals]);

  const handleUploadActionPlan = async () => {
    if (!selectedGoal || !actionPlan) {
      Toast.warning("Please select a goal and upload an action plan.");
      return;
    }

    setUploading(true);

    try {
        const path = await uploadFile(actionPlan);

        const newAction = {
            goal_form: selectedGoal,
            employee_id: userId!,
            description: description,
            status: false,
            path: path.path,
        };

        await createAction(newAction);
        Toast.success("Action plan uploaded successfully.");
        setSelectedGoal("");
    } catch (error) {
      console.error("Error uploading action plan:", error);
      alert("Failed to upload action plan.");
    } finally {
      setUploading(false);
    }
  };

  // Define animation and style objects
  const styles = {
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      color: "#333",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease-in-out",
      animation: "fadeIn 1s ease-in-out"
    },
    header: {
      textAlign: "center",
      marginBottom: "20px",
      color: "#444",
    } as React.CSSProperties,
    goalList: {
      listStyle: "none",
      padding: 0,
      margin: "20px 0",
    },
    goalItem: {
      padding: "10px",
      marginBottom: "10px",
      backgroundColor: "#fff",
      borderRadius: "5px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
      transition: "transform 0.2s",
    },
    goalItemHover: {
      transform: "scale(1.02)",
    },
    form: {
      marginTop: "20px",
      padding: "10px",
    },
    button: {
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#45a049",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={{...styles.header, fontFamily: 'pacifico'}}>Employee Goals</h2>
      {goals.length > 0 ? (
        <ul style={styles.goalList}>
          {goals.map((goal, index) => (
            <GoalFormCard key={index} goal={goal}/>
          ))}
        </ul>
      ) : (
        <p style={{ fontFamily: "pacifico" }}>No goals found.</p>
      )}

      <h3 className="text-center" style={{ fontFamily: "pacifico", marginTop: "20vh" }}>Upload Action Plan</h3>
      <div style={styles.form}>
        <label style={{ fontFamily: "pacifico", margin: "20px 0" }}>
          Select Goal:
          <select
            value={selectedGoal}
            onChange={(e) => setSelectedGoal(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px", borderRadius: "4px" }}
          >
            <option value="">-- Select a Goal --</option>
            {goals.map((goal) => (
              <option key={goal.id} value={goal.id}>
                {goal.title}
              </option>
            ))}
          </select>
        </label>
        <br />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", alignItems: "center", justifyContent: "space-between", margin: "2rem 0" }}>
            <label style={{ fontFamily: "pacifico" }}>
            Action Plan Description:
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                cols={30}
                style={{
                marginTop: "10px",
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                }}
            />
            </label>
            <label style={{ fontFamily: "pacifico" }}>
                Upload Action Plan Document:
                <FileComponent onFilesUploaded={(file: File[]) => setActionPlan(file[0]) } />
            </label>
        </div>
        <div className="d-flex align-items-center justify-content-center" style={{ width: "100%" }}>
            <StandardButton width="40%"  onClickFunction={handleUploadActionPlan} placeholder={uploading ? "Uploading..." : "Upload Action Plan"}/>
        </div>
      </div>
    </div>
  );
};

export default EmployeeGoalsPage;
