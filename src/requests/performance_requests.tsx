import api from "../api";

export interface Performance {
    id?: string;
    title: string;
    description: string;
    path: string;
    created_by: string;
    assigned_to: string;
    due_date: Date;
}

export const usePerformance = () => {

    // Get all performances
    const get_all_performances = async (): Promise<Performance[]> => {
        try {
            const response = await api.get('/performances');
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error('Failed to fetch performances.');
            }
        } catch (error: any) {
            throw new Error(`Get All Performances Error: ${error.response?.data?.message || error.message}`);
        }
    };

    // Get a specific performance by ID
    const get_performance = async (id: string): Promise<Performance> => {
        try {
            const response = await api.get('/performance', { params: { id } });
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error('Performance not found.');
            }
        } catch (error: any) {
            throw new Error(`Get Performance Error: ${error.response?.data?.message || error.message}`);
        }
    };

    // Create a new performance
    const create_performance = async (performance: Performance): Promise<Performance> => {
        try {
            const response = await api.post('/performances', performance);
            if (response.status === 201) {
                return response.data;
            } else {
                throw new Error('Failed to create performance.');
            }
        } catch (error: any) {
            throw new Error(`Create Performance Error: ${error.response?.data?.message || error.message}`);
        }
    };

    // Update a performance by ID
    const update_performance = async (id: string, updates: Partial<Performance>): Promise<Performance> => {
        try {
            const response = await api.put('/performances', updates, { params: { id } });
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error('Failed to update performance.');
            }
        } catch (error: any) {
            throw new Error(`Update Performance Error: ${error.response?.data?.message || error.message}`);
        }
    };

    // Delete a performance by ID
    const delete_performance = async (id: string): Promise<void> => {
        try {
            const response = await api.delete('/performances', { params: { id } });
            if (response.status === 200) {
                return;
            } else {
                throw new Error('Failed to delete performance.');
            }
        } catch (error: any) {
            throw new Error(`Delete Performance Error: ${error.response?.data?.message || error.message}`);
        }
    };

    // Get ratings for a performance
    const get_performance_ratings = async (id: string): Promise<any[]> => {
        try {
            const response = await api.get('/performances/ratings', { params: { id } });
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error('Failed to fetch performance ratings.');
            }
        } catch (error: any) {
            throw new Error(`Get Performance Ratings Error: ${error.response?.data?.message || error.message}`);
        }
    };

    // Get the employee assigned to a performance
    const get_performance_employee = async (id: string): Promise<any> => {
        try {
            const response = await api.get('/performances/employee', { params: { id } });
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error('Failed to fetch assigned employee.');
            }
        } catch (error: any) {
            throw new Error(`Get Performance Employee Error: ${error.response?.data?.message || error.message}`);
        }
    };

    // Get the controller who created the performance
    const get_performance_controller = async (id: string): Promise<any> => {
        try {
            const response = await api.get('/performances/controller', { params: { id } });
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error('Failed to fetch performance controller.');
            }
        } catch (error: any) {
            throw new Error(`Get Performance Controller Error: ${error.response?.data?.message || error.message}`);
        }
    };

    return {
        get_all_performances,
        get_performance,
        create_performance,
        update_performance,
        delete_performance,
        get_performance_ratings,
        get_performance_employee,
        get_performance_controller,
    };
};
