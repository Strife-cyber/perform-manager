/* An employee should be able to do to the following 
 • Receive and review performance evaluation forms.Done
 • Provide comments on performance. Done
 • Respond to controller feedback and suggestions.
 • Develop action plans to address areas for improvement.
 • Track personal progress and performance.
*/

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ReviewEvaluationForms from "./employee_components/review_evaluation_forms";
import NavigationBar from "./employee_components/navigation_bar";

const EmployeeDashboard: React.FC = () => {
    const [currentSection, setCurrentSection] = useState(() => 
        Cookies.get("currentSection") || "evaluation-forms"
    );

    useEffect(() => {
        Cookies.set("currentSection", currentSection);
    }, [currentSection]);

    const renderSection = () => {
        switch (currentSection) {
            case "evaluation-forms":
                return <ReviewEvaluationForms/>
            case "action-plans":
                return <div>Provide action plans and see goals set in place</div>
            case "personal-progress":
                return <div>Track personal progress i don't know how</div>
            case "other-documents":
                return <div>View and download various support documents</div>
            default:
                return <div>Select a section to get started.</div>;
        }
    };

    return (
        <div>
            <NavigationBar onNavigate={(section) => setCurrentSection(section)}/>
            <main style={{ padding: "2rem" }}>{renderSection()}</main>
        </div>
    )
}

export default EmployeeDashboard;
