import React, { useState, useEffect } from "react";
import { useController } from "../../../requests/controller_requests";
import { useEmployee } from "../../../requests/employee_requests";
import useUser from "../../../requests/user_requests";
import { useAppContext } from "../../../context/context";
import TextFieldComponent from "../../../components/text_field_component";
import StandardButton from "../../../components/standard_button";

const ViewingArea: React.FC = () => {
    // Fetch functions from hooks
    const { get_controller_performances } = useController();
    const { get_employee } = useEmployee();
    const { get_user_profile } = useUser();

    // Component state to store fetched data
    const [performances, setPerformances] = useState<any[]>([]);
    const [filteredPerformances, setFilteredPerformances] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const { userId } = useAppContext();

    // Fetch performance data on mount
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Get performance evaluations assigned by the controller
                const performanceData = await get_controller_performances(userId || '1');
                
                // Loop through each performance evaluation and fetch employee details
                const performanceDetails = await Promise.all(performanceData.map(async (performance: any) => {
                    const employee = await get_employee(performance.assigned_to);
                    const userProfile = await get_user_profile(employee.user_id);
                    return {
                        ...performance,
                        employeeName: userProfile.user.name,
                        department: employee.department,
                    };
                }));

                setPerformances(performanceDetails);
                setFilteredPerformances(performanceDetails);
            } catch (error) {
                console.error("Error fetching performance data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    // Filter handler for department and status
    const handleFilterChange = (filter: string, value: string) => {
        const updatedPerformanceList = performances.filter((performance) => {
            if (value === "") {
                return true; // Show all if the filter value is empty
            }
            if (filter === "department" && performance.department !== value) {
                return false;
            }
            return true;
        });

        setFilteredPerformances(updatedPerformanceList);
    };

    if (loading) {
        return <div style={{ textAlign: 'center', fontSize: '18px', color: '#888' }}>Loading...</div>;
    }

    return (
        <div className="container mt-4 " style={{ padding: '20px', backgroundColor: '#E0FFFF', borderRadius: '8px', fontFamily: 'Montaga' }}>
            {/* Filter options */}
            <div className="mb-4 d-flex align-items-center">
                <label htmlFor="departmentFilter" className="mr-2" style={{ fontWeight: 'bold', marginRight: '10px' }}>
                    Filter:   
                </label>
                <TextFieldComponent placeholder="Enter department name" width="250px" onChange={(e) => handleFilterChange("department", e.target.value)}/>
            </div>

            {/* Performance evaluations table */}
            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover" style={{ animation: 'fadeIn 0.5s ease-in' }}>
                    <thead className="thead-dark">
                        <tr>
                            <th>Employee Name</th>
                            <th>Department</th>
                            <th>Due Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPerformances.map((performance: any) => (
                            <tr key={performance.path} style={{ animation: 'fadeInUp 0.5s ease-in-out' }}>
                                <td>{performance.employeeName}</td>
                                <td>{performance.department}</td>
                                <td>{new Date(performance.due_date).toLocaleDateString()}</td>
                                <td className="d-flex align-items-center" style={{gap: '10px'}}>
                                    <StandardButton placeholder="View" color="#ADD8E6" darkerColor="#4682B4" width="80px"/>
                                    <StandardButton placeholder="Reassign" color="#FF7F7F" darkerColor="#B22222" width="80px"/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewingArea;
