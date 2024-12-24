import api from "../api";
import { Employee } from "./employee_requests";
import { Performance } from "./performance_requests";

export interface Controller {
    id?: string;
    user_id: string;
    department?: string;
}

export const useController = () => {
    const add_controller = async (controller: Controller): Promise<Controller> => {
        try {
            const response = await api.post('/controllers', controller);
            if (response.status === 201) {
                return response.data.controller;
            } else {
                throw new Error('Failed to create controller.');
            }
        } catch (error: any) {
            throw new Error(`Add Controller Error: ${error.response?.data?.message || error.message}`);
        }
    };

    const get_controller = async (id: string): Promise<Controller> => {
        try {
            const response = await api.get('/controller', { params: { id } });
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error('Controller not found.');
            }
        } catch (error: any) {
            throw new Error(`Get Controller Error: ${error.response?.data?.message || error.message}`);
        }
    };

    const update_controller = async (id: string, updates: Partial<Controller>): Promise<Controller> => {
        try {
            const response = await api.put('/controllers', { ...updates }, { params: { id } });
            if (response.status === 200) {
                return response.data.controller;
            } else {
                throw new Error('Failed to update controller.');
            }
        } catch (error: any) {
            throw new Error(`Update Controller Error: ${error.response?.data?.message || error.message}`);
        }
    };

    const delete_controller = async (id: string): Promise<void> => {
        try {
            const response = await api.delete('/controllers', { params: { id } });
            if (response.status !== 204) {
                throw new Error('Failed to delete controller.');
            }
        } catch (error: any) {
            throw new Error(`Delete Controller Error: ${error.response?.data?.message || error.message}`);
        }
    };

    const get_controller_employees = async (id: string): Promise<Employee[]> => {
        try {
            const response = await api.get('/controllers/employees', { params: { id } });
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error('Failed to fetch controller employees.');
            }
        } catch (error: any) {
            throw new Error(`Get Controller Employees Error: ${error.response?.data?.message || error.message}`);
        }
    };

    const get_controller_performances = async (id: string): Promise<Performance[]> => {
        try {
            const response = await api.get('/controllers/performances', { params: { id } });
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error('Failed to fetch controller performances.');
            }
        } catch (error: any) {
            throw new Error(`Get Controller Performances Error: ${error.response?.data?.message || error.message}`);
        }
    };

    const get_controller_goals = async (id: string): Promise<any[]> => {
        try {
            const response = await api.get('/controllers/goals', { params: { id } });
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error('Failed to fetch controller goals.');
            }
        } catch (error: any) {
            throw new Error(`Get Controller Goals Error: ${error.response?.data?.message || error.message}`);
        }
    };

    const get_controller_supports = async (id: string): Promise<any[]> => {
        try {
            const response = await api.get('/controllers/supports', { params: { id } });
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error('Failed to fetch controller supports.');
            }
        } catch (error: any) {
            throw new Error(`Get Controller Supports Error: ${error.response?.data?.message || error.message}`);
        }
    };

    const get_all_controllers = async (): Promise<Controller[]> => {
        try {
            const response = await api.get('/controllers')
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error('Failed to fetch all controllers')
            }
        } catch (error: any) {
            throw new Error(`Get all controllers error: ${error.response?.data}`);
        }
    }

    return {
        add_controller,
        get_controller,
        update_controller,
        delete_controller,
        get_controller_employees,
        get_controller_performances,
        get_controller_goals,
        get_controller_supports,
        get_all_controllers
    };
};
