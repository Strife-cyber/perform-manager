import React, { useState, useEffect } from 'react';
import { 
    Box, Typography, TextField, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, Paper, Divider, Autocomplete 
} from '@mui/material';
import { Goal, useGoal } from '../../../requests/goal_requests';
import FileComponent from '../../../components/file_component';
import useFile from '../../../requests/file_requests';
import { useEmployee } from '../../../requests/employee_requests';
import useUser from '../../../requests/user_requests';
import useAction, { Action } from '../../../requests/action_requests';
import { useAppContext } from '../../../context/context';
import { Toast } from '../../../components/toast_component';
import TextFieldComponent from '../../../components/text_field_component';
import StandardButton from '../../../components/standard_button';
import { downloadFileToBrowser } from '../../../components/helper_functions';

interface FullAction extends Action {
    employeeName: string
}

const GoalPage: React.FC = () => {
    const { createGoal } = useGoal();
    const { uploadFile, downloadFile } = useFile();
    const { get_user_profile } = useUser();
    const { get_all_employees } = useEmployee();
    const { getAllActions } = useAction();
    const { userId } = useAppContext();

    const [form, setForm] = useState<File>();
    const [employees, setEmployees] = useState<{ id: string; name: string }[]>([]);
    const [goalData, setGoalData] = useState<Goal>({
        employee_id: "",
        title: "",
        description: "",
        path: "",
        created_by: ""
    });
    const [actionPlans, setActionPlans] = useState<FullAction[]>([]);

    // Fetch employees on component mount
    useEffect(() => {
        const fetchEmployees = async () => {
            const employeeData = await get_all_employees(); // Fetch employee data
            const employeeWithNames = await Promise.all(
                employeeData.map(async (employee: { user_id: string }) => {
                    const user = await get_user_profile(employee.user_id); // Fetch user profile
                    return { id: employee.user_id, name: user.user.name || "Unknown" };
                })
            );
            setEmployees(employeeWithNames);
        };

        const fetchActions = async () => {
            const actionData = await getAllActions();
            const actionWithNames: FullAction[] = await Promise.all(
                actionData.map(async (action: Action) => {
                    const user = await get_user_profile(action.employee_id);
                    return { ...action, employeeName: user.user.name || "Unknown" }
                })
            );
            setActionPlans(actionWithNames);
        }

        fetchEmployees();
        fetchActions();
    }, []);

    const uploadGoalForm = async () => {
        if (form) {
            const path = await uploadFile(form);
            const goalForm: Goal = {
                ...goalData,
                path: path.path,
                created_by: userId! // Assign the current user's ID here if needed
            };
            try {
                await createGoal(goalForm); // Submit the goal
                Toast.success('Goal Form Uploaded Successfully');
            } catch (error) {
                Toast.error(`An error ocurred: ${error}`)
            }
        }
    };

    return (
        <Box sx={{ padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            {/* Header Section */}
            <Typography variant="h4" sx={{ marginBottom: '20px', textAlign: 'center', fontFamily: 'montaga' }}>
                Controller Goal Management
            </Typography>

            <Divider sx={{ marginBottom: '30px' }} />

            {/* Goal Submission Form */}
            <Box sx={{ marginBottom: '40px', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: 2 }}>
                <Typography variant="h5" sx={{ marginBottom: '15px', fontWeight: 'medium', fontFamily: 'pacifico' }}>
                    Assign Goal Form
                </Typography>
                <Box
                    component="form"
                    sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
                    onSubmit={(e) => {
                        e.preventDefault();
                        uploadGoalForm();
                    }}
                >
                    {/* Employee Selection */}
                    <Autocomplete
                        options={employees.map((employee) => ({ id: employee.id, name: employee.name }))}
                        getOptionLabel={(option) => option.name}
                        onChange={(_event, value) => {
                            setGoalData({
                                ...goalData,
                                employee_id: value ? value.id : ""  // Ensure the value is valid before accessing `id`
                            });
                        }}
                        renderInput={(params) => (
                            <TextField {...params} key={params.id} label="Select Employee" variant="outlined" fullWidth />
                        )}
                    />
                    <TextFieldComponent placeholder='Title' width='100%' height='60px' value={goalData.title}
                        onChange={(e) => setGoalData({ ...goalData, title: e.target.value })} />
                    <TextFieldComponent placeholder='Description' width='100%' height='60px' value={goalData.description}
                        onChange={(e) => setGoalData({ ...goalData, description: e.target.value })}  />
                    <FileComponent onFilesUploaded={(files) => setForm(files[0])}/>
                    <StandardButton placeholder='Assign Goal Form' width='100%'/>
                </Box>
            </Box>

            {/* Action Plans Section */}
            <Box sx={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: 2 }}>
                <Typography variant="h5" sx={{ marginBottom: '15px', fontWeight: 'medium', fontFamily: 'pacifico' }}>
                    Employee Action Plans
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><Typography fontWeight="bold" fontFamily="pacifico">Employee</Typography></TableCell>
                                <TableCell><Typography fontWeight="bold" fontFamily="pacifico">Description</Typography></TableCell>
                                <TableCell><Typography fontWeight="bold" fontFamily="pacifico">Goal Form</Typography></TableCell>
                                <TableCell><Typography fontWeight="bold" fontFamily="pacifico">Action Form</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* Map through the action plans of employees and render them here */}
                            {actionPlans.length > 0 ? (actionPlans.map((actionPlan, index) => (
                                <TableRow key={index}>
                                    <TableCell style={{ fontFamily: 'roboto' }} >{actionPlan.employeeName}</TableCell>
                                    <TableCell style={{ fontFamily: 'roboto' }} >{actionPlan.description}</TableCell>
                                    <TableCell style={{ fontFamily: 'roboto' }} >{actionPlan.goal_form}</TableCell>
                                    <TableCell style={{ fontFamily: 'roboto' }} >
                                        <StandardButton onClickFunction={async () => downloadFileToBrowser(await downloadFile(actionPlan.path), `Action Plan To ${actionPlan.employeeName} Goal Form ${actionPlan.goal_form}`)}/>
                                    </TableCell>
                                </TableRow>
                            ))) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center" style={{ fontFamily: 'pacifico' }}>
                                    No action plans available.
                                </TableCell>
                            </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default GoalPage;
