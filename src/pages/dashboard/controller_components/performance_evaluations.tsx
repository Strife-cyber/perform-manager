import React from "react";
import ViewingArea from "./viewing_area";
import CreateEvaluationForm from "./evaluation_form";
import NavigationBar from "./navigation_bar";

const PerformanceEvaluations: React.FC = () => {
    return (
        <>
        <NavigationBar/>
        <div className="d-flex align-items-center" style={{minHeight: '80vh', backgroundColor: "F8F8F8"}}>
            <CreateEvaluationForm/>
            <ViewingArea/>
        </div>
        </>
    )
};

export default PerformanceEvaluations;
