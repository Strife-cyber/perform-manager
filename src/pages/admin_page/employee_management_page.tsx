import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  TextField,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useEmployee, Employee } from "../../requests/employee_requests";
import { Toast } from "../../components/toast_component";
import FloatingButton from "../../components/floating_button";

const AdminEmployeeManagement = () => {
  const {
    get_all_employees,
    create_employee,
    update_employee,
    delete_employee,
  } = useEmployee();

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState<Employee>({
    user_id: "",
    controller_id: "",
    department: "",
  });

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const allEmployees = await get_all_employees();
      setEmployees(allEmployees);
      setFilteredEmployees(allEmployees); // Initialize filtered list
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleOpenModal = (employee: Employee | null = null) => {
    setEditEmployee(employee);
    setFormData(
      employee || { user_id: "", controller_id: "", department: "" }
    );
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditEmployee(null);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      if (editEmployee) {
        await update_employee(editEmployee.user_id as string, formData);
      } else {
        await create_employee(formData);
      }
      fetchEmployees();
      handleCloseModal();
      Toast.success(`Employee successfully ${editEmployee ? "updated" : "created"}`);
    } catch (error) {
      Toast.error(`Error saving employee: ${error}`)
      Toast.info('Is the employee registered as a user')
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await delete_employee(id);
      fetchEmployees();
    } catch (error) {
      Toast.error(`Error deleting controller: ${error}`)
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredEmployees(employees); // Reset filter if query is empty
    } else {
      const lowerQuery = query.toLowerCase();
      setFilteredEmployees(
        employees.filter(
          (employee) =>
            employee.user_id == lowerQuery ||
            employee.controller_id == lowerQuery ||
            employee.department!.toLowerCase().includes(lowerQuery)
        )
      );
    }
  };

  return (
    <Box
      sx={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "Montaga"
      }}
    >
      <Typography variant="h4" gutterBottom style={{ fontFamily: "Montaga" }}>
        Admin Employee Management
      </Typography>

      <TextField
        label="Search Employees"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        fullWidth
        sx={{ maxWidth: 800, marginBottom: "1rem" }}
      />

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} sx={{ maxWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontFamily: "Montaga" }} >User ID</TableCell>
                <TableCell style={{ fontFamily: "Montaga" }} >Controller ID</TableCell>
                <TableCell style={{ fontFamily: "Montaga" }} >Department</TableCell>
                <TableCell style={{ fontFamily: "Montaga" }} >Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id || employee.user_id}>
                  <TableCell style={{ fontFamily: "Montaga" }} >{employee.user_id}</TableCell>
                  <TableCell style={{ fontFamily: "Montaga" }} >{employee.controller_id}</TableCell>
                  <TableCell style={{ fontFamily: "Montaga" }} >{employee.department || "N/A"}</TableCell>
                  <TableCell style={{ fontFamily: "Montaga" }} >
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => handleOpenModal(employee)}
                      sx={{ marginRight: "0.5rem" }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(employee.user_id as string)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <FloatingButton onClick={() => handleOpenModal()} title="Add New Employee" />

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6" gutterBottom>
            {editEmployee ? "Edit Employee" : "Add New Employee"}
          </Typography>
          <TextField
            label="User ID"
            name="user_id"
            value={formData.user_id}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Controller ID"
            name="controller_id"
            value={formData.controller_id}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1rem",
            }}
          >
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="outlined" onClick={handleCloseModal}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AdminEmployeeManagement;
