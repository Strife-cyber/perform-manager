import api from "../api";

export interface Ratings {
  performance_form: string;
  employee_id: string;
  rating: number;
  comments: string;
}

const useRatings = () => {
  const baseUrl = "/ratings"; // Base URL for the ratings API

  // Get all ratings
  const getAllRatings = async (): Promise<Ratings[]> => {
    try {
      const response = await api.get(baseUrl);
      return response.data;
    } catch (error) {
      console.error("Error fetching all ratings:", error);
      throw error;
    }
  };

  // Get a specific rating by ID
  const getRating = async (id: string): Promise<Ratings> => {
    try {
      const response = await api.get(`/rating`, { params: { id } });
      return response.data;
    } catch (error) {
      console.error("Error fetching rating by ID:", error);
      throw error;
    }
  };

  // Get the performance form associated with a rating
  const getRatingPerformance = async (id: string): Promise<any> => {
    try {
      const response = await api.get(`${baseUrl}/performance`, { params: { id } });
      return response.data;
    } catch (error) {
      console.error("Error fetching performance form for rating:", error);
      throw error;
    }
  };

  // Get the employee who submitted a rating
  const getRatingEmployee = async (id: string): Promise<any> => {
    try {
      const response = await api.get(`${baseUrl}/employee`, { params: { id } });
      return response.data;
    } catch (error) {
      console.error("Error fetching employee for rating:", error);
      throw error;
    }
  };

  // Create a new rating
  const createRating = async (ratingData: Ratings): Promise<Ratings> => {
    try {
      const response = await api.post(baseUrl, ratingData);
      return response.data;
    } catch (error) {
      console.error("Error creating new rating:", error);
      throw error;
    }
  };

  // Update a rating by ID
  const updateRating = async (id: string, ratingData: Ratings): Promise<Ratings> => {
    try {
      const response = await api.put(baseUrl, ratingData, { params: { id } });
      return response.data;
    } catch (error) {
      console.error("Error updating rating:", error);
      throw error;
    }
  };

  // Delete a rating by ID
  const deleteRating = async (id: string): Promise<{ message: string }> => {
    try {
      const response = await api.delete(baseUrl, { params: { id } });
      return response.data;
    } catch (error) {
      console.error("Error deleting rating:", error);
      throw error;
    }
  };

  return {
    getAllRatings,
    getRating,
    getRatingPerformance,
    getRatingEmployee,
    createRating,
    updateRating,
    deleteRating,
  };
};

export default useRatings;
