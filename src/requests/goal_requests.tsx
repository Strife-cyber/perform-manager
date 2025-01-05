import api from '../api';

export interface Goal {
  id? : string;
  employee_id: string;
  title: string;
  description: string;
  path: string;
  created_by: string;
}

export const useGoal = () => {
  // Fetch all goals
  const getAllGoals = async (): Promise<Goal[]> => {
    const response = await api.get(`/goals`);
    return response.data;
  };

  // Fetch a specific goal by ID
  const getGoal = async (id: string): Promise<Goal> => {
    const response = await api.get(`/goal`, { params: { id } });
    return response.data;
  };

  // Fetch the action related to a specific goal
  const getGoalAction = async (id: string): Promise<any> => {
    const response = await api.get(`/goals/action`, { params: { id } });
    return response.data;
  };

  // Fetch the employee assigned to a specific goal
  const getGoalEmployee = async (id: string): Promise<any> => {
    const response = await api.get(`/goals/employee`, { params: { id } });
    return response.data;
  };

  // Fetch the controller who created a specific goal
  const getGoalController = async (id: string): Promise<any> => {
    const response = await api.get(`/goals/controller`, { params: { id } });
    return response.data;
  };

  // Create a new goal
  const createGoal = async (goal: Goal): Promise<Goal> => {
    const response = await api.post(`/goals`, goal);
    return response.data;
  };

  // Update an existing goal by ID
  const updateGoal = async (id: string, goal: Partial<Goal>): Promise<Goal> => {
    const response = await api.put(`/goals`, goal, { params: { id } });
    return response.data;
  };

  // Delete a goal by ID
  const deleteGoal = async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/goals`, { params: { id } });
    return response.data;
  };

  return {
    getAllGoals,
    getGoal,
    getGoalAction,
    getGoalEmployee,
    getGoalController,
    createGoal,
    updateGoal,
    deleteGoal,
  };
};
