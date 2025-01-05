import api from "../api";
import { Employee } from "./employee_requests";
import { Goal } from "./goal_requests";

export interface Action {
  goal_form: string;
  employee_id: string;
  description: string;
  status: boolean;
  path: string;
}

const useAction = () => {
  // Fetch all actions
  const getAllActions = async (): Promise<Action[]> => {
    try {
      const response = await api.get('/actions');
      if (response.status !== 200) {
        throw new Error("Failed to fetch actions");
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching all actions:", error);
      throw error;
    }
  };

  // Fetch a specific action by ID
  const getAction = async (id: string): Promise<Action> => {
    try {
      const response = await api.get(`/action`, {
        params: { id: id },
      });
      if (response.status !== 200) {
        throw new Error("Failed to fetch action");
      }
      return response.data;
    } catch (error) {
      console.error(`Error fetching action with ID ${id}:`, error);
      throw error;
    }
  };

  // Fetch the goal related to a specific action
  const getActionGoal = async (id: string): Promise<Goal> => {
    try {
      const response = await api.get(`/goal`, {
        params: { id: id },
      });
      if (response.status !== 200) {
        throw new Error("Failed to fetch goal for action");
      }
      return response.data;
    } catch (error) {
      console.error(`Error fetching goal for action with ID ${id}:`, error);
      throw error;
    }
  };

  // Fetch the employee related to a specific action
  const getActionEmployee = async (id: string): Promise<Employee> => {
    try {
      const response = await api.get(`/employee`, {
        params: { id: id },
      });
      if (response.status !== 200) {
        throw new Error("Failed to fetch employee for action");
      }
      return response.data;
    } catch (error) {
      console.error(`Error fetching employee for action with ID ${id}:`, error);
      throw error;
    }
  };

  // Create a new action
  const createAction = async (newAction: Action): Promise<Action> => {
    try {
      const response = await api.post('/actions', newAction);
      if (response.status !== 201) {
        throw new Error("Failed to create action");
      }
      return response.data;
    } catch (error) {
      console.error("Error creating action:", error);
      throw error;
    }
  };

  // Update an existing action
  const updateAction = async (id: string, updatedAction: Action): Promise<Action> => {
    try {
      const response = await api.put(`/actions`, updatedAction, {
        params: {id: id}
      });
      if (response.status !== 200) {
        throw new Error("Failed to update action");
      }
      return response.data;
    } catch (error) {
      console.error(`Error updating action with ID ${id}:`, error);
      throw error;
    }
  };

  // Delete an action by ID
  const deleteAction = async (id: string): Promise<{ message: string }> => {
    try {
      const response = await api.delete(`/actions`, {
        params: {id: id}
      });
      if (response.status !== 200) {
        throw new Error("Failed to delete action");
      }
      return response.data;
    } catch (error) {
      console.error(`Error deleting action with ID ${id}:`, error);
      throw error;
    }
  };

  return {
    getAllActions,
    getAction,
    getActionGoal,
    getActionEmployee,
    createAction,
    updateAction,
    deleteAction,
  };
};

export default useAction;
