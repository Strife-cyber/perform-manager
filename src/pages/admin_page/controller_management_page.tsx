import React, { useEffect, useState } from "react";
import { useController, Controller } from "../../requests/controller_requests";
import {
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box,
  CircularProgress,
  Modal
} from "@mui/material";
import FloatingButton from "../../components/floating_button";
import { Toast } from "../../components/toast_component";

const AdminControllerManagement: React.FC = () => {
    const {
        get_all_controllers,
        add_controller,
        update_controller,
        delete_controller,
        get_controller_employees,
        get_controller_performances,
        get_controller_goals,
        get_controller_supports,
    } = useController();

    const [controllers, setControllers] = useState<Controller[]>([]);
    const [filteredControllers, setFilteredControllers] = useState<Controller[]>([]);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [editController, setEditController] = useState<Controller | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [formData, setFormData] = useState<Controller>({
        user_id: "",
        department: "",
    });

    const fetchControllers = async () => {
        setLoading(true);
        try {
            const data = await get_all_controllers();
            setControllers(data);
            setFilteredControllers(data)
            setLoading(false);
        } catch (err) {
            Toast.error(`An error occurred: ${err}`)
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchControllers();
    }, []);

    const handleOpenModal = (controller: Controller | null = null) => {
        setEditController(controller);
        setFormData(
            controller || { user_id: "", department: "" }
        );
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setEditController(null);
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const handleSave = async () => {
        try {
            if (editController) {
                await update_controller(editController.user_id as string, formData);
            } else {
                await add_controller(formData);
            }
            fetchControllers();
            handleCloseModal();
            Toast.success(`Controller successfully ${editController ? "updated" : "created"}`)
        } catch (error) {
            Toast.error(`Error saving controller: ${error}`)
            Toast.info('Is the controller registered as a user?')
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await delete_controller(id);
            fetchControllers();
        } catch (error) {
            Toast.error(`Error deleting controller: ${error}`)
        }
    }

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (!query) {
            setFilteredControllers(controllers);
        } else {
            const lowerQuery = query.toLowerCase();
            setFilteredControllers(
                controllers.filter(
                    (controller) =>
                        controller.user_id == lowerQuery ||
                        controller.department!.toLowerCase().includes(lowerQuery)
                )
            )
        }
    }

    const handleFetchDetails = async (id: string) => {
        // todo in the future
        try {
            const employees = await get_controller_employees(id);
            const performances = await get_controller_performances(id);
            const goals = await get_controller_goals(id);
            const supports = await get_controller_supports(id);
    
            // Combine all details into a single message with proper formatting
            const detailsMessage = `
                Employees: ${employees.length > 0 ? employees.join(", ") : "No employees found."}
                Performances: ${performances.length > 0 ? performances.join(", ") : "No performances recorded."}
                Goals: ${goals.length > 0 ? goals.join(", ") : "No goals set."}
                Supports: ${supports.length > 0 ? supports.join(", ") : "No supports available."}
            `;
    
            Toast.info(detailsMessage, { autoClose: false }); // Allow users to read at their own pace
        } catch (err) {
            Toast.warning("Error fetching controller details. Please ensure this is a valid controller!");
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
        Admin Controller Management
      </Typography>

      <TextField 
        label="Search Controllers"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        fullWidth
        sx={{ maxWidth: 800, marginBottom: "1rem" }}
      />

      {loading ? (
        <CircularProgress/>
      ) : (
        <TableContainer component={Paper} sx={{ maxWidth: 800 }}>
            <Table>
            <TableHead>
                <TableRow>
                <TableCell style={{ fontFamily: "Montaga" }} >User ID</TableCell>
                <TableCell style={{ fontFamily: "Montaga" }} >Department</TableCell>
                <TableCell style={{ fontFamily: "Montaga" }} >Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {filteredControllers.map((controller) => (
                    <TableRow key={controller.user_id}>
                    <TableCell style={{ fontFamily: "Montaga" }} >{controller.user_id}</TableCell>
                    <TableCell style={{ fontFamily: "Montaga" }} >{controller.department || "N/A"}</TableCell>
                    <TableCell style={{ fontFamily: "Montaga" }} >
                        <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={() => handleFetchDetails(controller.user_id)}
                            sx={{ marginRight: "0.5rem" }}
                        >
                            View Details
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            size="small"
                            sx={{ marginRight: "0.5rem" }}
                            onClick={() => handleOpenModal(controller)}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            sx={{ marginLeft: "10px" }}
                            onClick={() => handleDelete(controller.user_id as string)}
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

        <FloatingButton onClick={() => handleOpenModal()} title="Add New Controller"/>
        
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
                    {editController ? "Edit Controller" : "Add New Controller"}
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

export default AdminControllerManagement;
