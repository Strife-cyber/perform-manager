import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Box,
  CircularProgress,
  Modal,
} from "@mui/material";
import api from "../../api";
import useUser, { User } from "../../requests/user_requests";
import { Toast } from "../../components/toast_component";

const AdminUserManagementPage: React.FC = () => {
  const { update_user, get_role } = useUser();
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Record<string, string>>({});
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get("/users");
      const usersData = response.data;

      const rolesData: Record<string, string> = {};
      for (const user of usersData) {
        const roleResponse = await get_role(user.id);
        rolesData[user.id] = roleResponse.role || "Unassigned";
      }

      setUsers(usersData);
      setRoles(rolesData);
      setFilteredUsers(usersData);
    } catch (error: any) {
        Toast.error(`Error fetching users: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async () => {
    if (!selectedUser) return;
    try {
      await update_user(selectedUser.id!, selectedUser);
      Toast.success("User updated successfully!");
      fetchUsers();
      handleCloseModal();
    } catch (error: any) {
      Toast.error(`Error updating user: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await api.delete(`/users`, { params: { id: id } });
      Toast.success("User deleted successfully!");
      fetchUsers();
    } catch (error: any) {
      Toast.error(`Error deleting user: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter(
          (user) =>
            user.name!.toLowerCase().includes(query.toLowerCase()) ||
            user.email.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Box sx={{ padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h4" gutterBottom style={{ fontFamily: "Montaga" }}>
        Admin User Management
      </Typography>

      <TextField
        label="Search Users"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        fullWidth
        sx={{ maxWidth: 600, marginBottom: "1rem" }}
      />

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} sx={{ maxWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontFamily: "Montaga" }}>ID</TableCell>
                <TableCell style={{ fontFamily: "Montaga" }}>Name</TableCell>
                <TableCell style={{ fontFamily: "Montaga" }}>Email</TableCell>
                <TableCell style={{ fontFamily: "Montaga" }}>Role</TableCell>
                <TableCell style={{ fontFamily: "Montaga" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell style={{ fontFamily: "Montaga" }}>{user.id}</TableCell>
                  <TableCell style={{ fontFamily: "Montaga" }}>{user.name || "N/A"}</TableCell>
                  <TableCell style={{ fontFamily: "Montaga" }}>{user.email}</TableCell>
                  <TableCell style={{ fontFamily: "Montaga" }}>{roles[user.id!] || "N/A"}</TableCell>
                  <TableCell style={{ fontFamily: "Montaga" }}>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteUser(user.id!)}
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
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Edit User
          </Typography>
          {selectedUser && (
            <>
              <TextField
                label="Name"
                fullWidth
                sx={{ marginBottom: "1rem" }}
                value={selectedUser.name}
                onChange={(e) =>
                  setSelectedUser((prevUser) => prevUser ? ({ ...prevUser, name: e.target.value }) : null)
                }
              />
              <TextField
                label="Email"
                fullWidth
                sx={{ marginBottom: "1rem" }}
                value={selectedUser.email}
                onChange={(e) =>
                  setSelectedUser((prevUser) => prevUser ?  ({ ...prevUser, email: e.target.value }) : null)
                }
              />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="contained" color="primary" onClick={handleUpdateUser}>
                  Save
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleCloseModal}>
                  Cancel
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default AdminUserManagementPage;
