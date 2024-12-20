/// These are a controller's tasks
/// • Create and assign performance evaluation forms to employees. Done
/// • Provide feedback and ratings on employee performance.
/// • Upload supporting documents (e.g., meeting notes, project reports).
/// • Set goals and objectives for employees.

import React, { useState, useEffect } from "react";
import NavigationBar from "./controller_components/navigation_bar";
import PerformanceEvaluations from "./controller_components/performance_evaluations";
import SupportManagement from "./controller_components/support_management";
import Cookies from "js-cookie";
import FeedbackPage from "./controller_components/feedback_page";

const ControllerDashboard: React.FC = () => {
  // Retrieve the saved section from cookies, default to "evaluations"
  const [currentSection, setCurrentSection] = useState(() => 
    Cookies.get("currentSection") || "evaluations"
  );

  // Update the cookie whenever `currentSection` changes
  useEffect(() => {
    Cookies.set("currentSection", currentSection);
  }, [currentSection]);

  const renderSection = () => {
    switch (currentSection) {
      case "evaluations":
        return <PerformanceEvaluations />;
      case "feedback":
        return <FeedbackPage/>;
      case "documents":
        return <SupportManagement />;
      case "goals":
        return <div>Set goals and objectives for employees.</div>;
      default:
        return <div>Select a section to get started.</div>;
    }
  };

  return (
    <div>
      <NavigationBar onNavigate={(section) => setCurrentSection(section)} />
      <main style={{ padding: "2rem" }}>{renderSection()}</main>
    </div>
  );
};

export default ControllerDashboard;
