import { useState, useEffect } from "react";

export const useCrud = (fetchAll: Function, defaultFormData: object) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState(defaultFormData);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await fetchAll();
      setData(result);
      setFilteredData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (item = null) => {
    setEditItem(item);
    setFormData(item || defaultFormData);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditItem(null);
  };

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredData(data);
    } else {
      const lowerQuery = query.toLowerCase();
      setFilteredData(
        data.filter((item) =>
          Object.values(item).some((value) =>
            value?.toString().toLowerCase().includes(lowerQuery)
          )
        )
      );
    }
  };

  return {
    data,
    filteredData,
    loading,
    openModal,
    editItem,
    formData,
    fetchData,
    handleOpenModal,
    handleCloseModal,
    handleSearch,
    setFormData,
  };
};
