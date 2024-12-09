interface Action {
    goal_form: string;
    employee_id: string;
    description: string;
    status: boolean;
  }
  
  const useAction = () => {
    const baseUrl = "/actions"; // Base API endpoint for actions
  
    // Fetch all actions
    const getAllActions = async (): Promise<Action[]> => {
      try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch actions");
        }
        return await response.json();
      } catch (error) {
        console.error("Error fetching all actions:", error);
        throw error;
      }
    };
  
    // Fetch a specific action by ID
    const getAction = async (id: string): Promise<Action> => {
      try {
        const response = await fetch(`${baseUrl}/action?id=${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch action");
        }
        return await response.json();
      } catch (error) {
        console.error(`Error fetching action with ID ${id}:`, error);
        throw error;
      }
    };
  
    // Fetch the goal related to a specific action
    const getActionGoal = async (id: string): Promise<any> => {
      try {
        const response = await fetch(`${baseUrl}/goal?id=${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch goal for action");
        }
        return await response.json();
      } catch (error) {
        console.error(`Error fetching goal for action with ID ${id}:`, error);
        throw error;
      }
    };
  
    // Fetch the employee related to a specific action
    const getActionEmployee = async (id: string): Promise<any> => {
      try {
        const response = await fetch(`${baseUrl}/employee?id=${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch employee for action");
        }
        return await response.json();
      } catch (error) {
        console.error(`Error fetching employee for action with ID ${id}:`, error);
        throw error;
      }
    };
  
    // Create a new action
    const createAction = async (newAction: Action): Promise<Action> => {
      try {
        const response = await fetch(baseUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newAction),
        });
        if (!response.ok) {
          throw new Error("Failed to create action");
        }
        return await response.json();
      } catch (error) {
        console.error("Error creating action:", error);
        throw error;
      }
    };
  
    // Update an existing action
    const updateAction = async (id: string, updatedAction: Action): Promise<Action> => {
      try {
        const response = await fetch(`${baseUrl}?id=${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedAction),
        });
        if (!response.ok) {
          throw new Error("Failed to update action");
        }
        return await response.json();
      } catch (error) {
        console.error(`Error updating action with ID ${id}:`, error);
        throw error;
      }
    };
  
    // Delete an action by ID
    const deleteAction = async (id: string): Promise<{ message: string }> => {
      try {
        const response = await fetch(`${baseUrl}?id=${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete action");
        }
        return await response.json();
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
  