import api from '../api';

export interface Support {
  id?: number; // Optional for new entries
  title: string;
  description: string;
  path: string;
  uploaded_by: string;
}

const useSupport = () => {
  // Fetch all support entries
  const getAllSupports = async (): Promise<Support[]> => {
    try {
      const response = await api.get('/supports');
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Error fetching supports:', error);
      throw new Error('Error fetching supports');
    }
  };

  // Fetch a specific support entry by ID
  const getSupport = async (id: number): Promise<Support> => {
    try {
      const response = await api.get(`/support`, { params: { id } });
      return response.data;
    } catch (error) {
      console.error('Error fetching support entry:', error);
      throw new Error('Error fetching support entry');
    }
  };

  // Fetch the uploader of a specific support entry
  const getSupportUploader = async (id: number): Promise<any> => {
    try {
      const response = await api.get(`/supports/uploader`, { params: { id } });
      return response.data;
    } catch (error) {
      console.error('Error fetching uploader for support entry:', error);
      throw new Error('Error fetching uploader for support entry');
    }
  };

  // Create a new support entry
  const createSupport = async (support: Support): Promise<Support> => {
    try {
      const response = await api.post(`/supports`, {"title": support.title, "description": support.description, "path": support.path, "uploaded_by": support.uploaded_by});
      return response.data;
    } catch (error) {
      console.error('Error creating support entry:', error);
      throw new Error('Error creating support entry');
    }
  };

  // Update an existing support entry by ID
  const updateSupport = async (id: number, updatedSupport: Partial<Support>): Promise<Support> => {
    try {
      const response = await api.put(`/supports`, updatedSupport, {
        params: { id },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating support entry:', error);
      throw new Error('Error updating support entry');
    }
  };

  // Delete a support entry by ID
  const deleteSupport = async (id: number): Promise<{ message: string }> => {
    try {
      const response = await api.delete(`/supports`, { params: { id } });
      return response.data;
    } catch (error) {
      console.error('Error deleting support entry:', error);
      throw new Error('Error deleting support entry');
    }
  };

  return {
    getAllSupports,
    getSupport,
    getSupportUploader,
    createSupport,
    updateSupport,
    deleteSupport,
  };
};

export default useSupport;
