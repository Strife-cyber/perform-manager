import { useEffect, useState } from "react";
import { useAppContext } from "../../../context/context";
import { useEmployee } from "../../../requests/employee_requests";
import { Performance } from "../../../requests/performance_requests";
import { useController } from "../../../requests/controller_requests";
import { usePerformance } from "../../../requests/performance_requests";
import DocViewerComponent from "../../../components/doc_viewer_component";

const ManagePerformanceForms = () => {

    const { get_controller_performances } = useController();
    const { get_all_employees } = useEmployee();
    const { create_performance, get_performance_employee } = usePerformance();
    const { userId } = useAppContext();

    const [ performanceForms, setPerformanceForms ] = useState<Performance[]>();

    /// Okay this manage performance forms has 4 main functions
    /// 1. allow a controller to view performance forms and if he hovers
    /// 2. he will se extra details about it like rating, employee
    /// 3. Permit the user to assign a new performance form to an employee

    async function fetchPerformanceForms(){
        const data = await get_controller_performances(userId || '');
        setPerformanceForms(data);
    }

    useEffect(() => {
        fetchPerformanceForms();
    }, []);
}