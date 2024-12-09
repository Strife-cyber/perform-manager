import api from "../api";

export interface Employee {
    id?: string;
    user_id: string;
    controller_id: string;
    department?: string;
}

export const useEmployee = () => {
    // Get all employees
    const get_all_employees = async (): Promise<Employee[]> => {
        try {
            const response = await api.get('/employees');
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error('Failed to fetch employees.');
            }
        } catch (error: any) {
            throw new Error(`Get All Employees Error: ${error.response?.data?.message || error.message}`);
        }
    };

    // Get a single employee by ID
    const get_employee = async (id: string): Promise<Employee> => {
        try {
            const response = await api.get('/employee', { params: { id } });
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error('Employee not found.');
            }
        } catch (error: any) {
            throw new Error(`Get Employee Error: ${error.response?.data?.message || error.message}`);
        }
    };

    // Create a new employee
    const create_employee = async (employee: Employee): Promise<Employee> => {
        try {
            const response = await api.post('/employees', employee);
            if (response.status === 201) {
                return response.data;
            } else {
                throw new Error('Failed to create employee.');
            }
        } catch (error: any) {
            throw new Error(`Create Employee Error: ${error.response?.data?.message || error.message}`);
        }
    };

    // Update an employee by ID
    const update_employee = async (id: string, updates: Partial<Employee>): Promise<Employee> => {
        try {
            const response = await api.put('/employees', updates, { params: { id } });
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error('Failed to update employee.');
            }
        } catch (error: any) {
            throw new Error(`Update Employee Error: ${error.response?.data?.message || error.message}`);
        }
    };

    // Delete an employee by ID
    const delete_employee = async (id: string): Promise<void> => {
        try {
            const response = await api.delete('/employees', { params: { id } });
            if (response.status === 200) {
                return;
            } else {
                throw new Error('Failed to delete employee.');
            }
        } catch (error: any) {
            throw new Error(`Delete Employee Error: ${error.response?.data?.message || error.message}`);
        }
    };

    // Get performances for an employee
    const get_employee_performances = async (id: string): Promise<any[]> => {
        try {
            const response = await api.get('/employees/performances', { params: { id } });
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error('Failed to fetch employee performances.');
            }
        } catch (error: any) {
            throw new Error(`Get Employee Performances Error: ${error.response?.data?.message || error.message}`);
        }
    };

    // Get goals for an employee
    const get_employee_goals = async (id: string): Promise<any[]> => {
        try {
            const response = await api.get('/employees/goals', { params: { id } });
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error('Failed to fetch employee goals.');
            }
        } catch (error: any) {
            throw new Error(`Get Employee Goals Error: ${error.response?.data?.message || error.message}`);
        }
    };

    // Get actions for an employee
    const get_employee_actions = async (id: string): Promise<any[]> => {
        try {
            const response = await api.get('/employees/actions', { params: { id } });
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error('Failed to fetch employee actions.');
            }
        } catch (error: any) {
            throw new Error(`Get Employee Actions Error: ${error.response?.data?.message || error.message}`);
        }
    };

    // Get ratings for an employee
    const get_employee_ratings = async (id: string): Promise<any[]> => {
        try {
            const response = await api.get('/employees/ratings', { params: { id } });
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error('Failed to fetch employee ratings.');
            }
        } catch (error: any) {
            throw new Error(`Get Employee Ratings Error: ${error.response?.data?.message || error.message}`);
        }
    };

    return {
        get_all_employees,
        get_employee,
        create_employee,
        update_employee,
        delete_employee,
        get_employee_performances,
        get_employee_goals,
        get_employee_actions,
        get_employee_ratings,
    };
};
