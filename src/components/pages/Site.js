// src/components/TableComponent.js

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Backdrop,
  Fade,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import axios from "axios";
import logoImage from "../pages/KM.png";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

import "./Dashboard.css"; // Import the CSS file

const apiUrl = "https://react-d.onrender.com/api/items";

const TableComponent = ({ onLogout }) => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Update filteredData when searchInput changes
    setFilteredData(
      data.filter(
        (item) =>
          item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.description.toLowerCase().includes(searchInput.toLowerCase())
      )
    );
  }, [data, searchInput]);

  const handleSearch = () => {
    // Perform search based on searchInput
    setFilteredData(
      data.filter(
        (item) =>
          item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.description.toLowerCase().includes(searchInput.toLowerCase())
      )
    );
  };

  const handleOpenEditModal = (item) => {
    setSelectedItem(item);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedItem(null);
    setOpenEditModal(false);
  };

  const handleEdit = async () => {
    try {
      const response = await axios.put(
        `${apiUrl}/${selectedItem._id}`,
        selectedItem
      );
      console.log("Item updated:", response.data);
      fetchData(); // Refresh data after update
      handleCloseEditModal();
      showSnackbar("success", "Item updated successfully");
    } catch (error) {
      console.error("Error updating item:", error);
      showSnackbar("error", "Failed to update item");
    }
  };

  const handleOpenAddModal = () => {
    setSelectedItem({ name: "", description: "" });
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const handleAdd = async () => {
    try {
      await axios.post(apiUrl, selectedItem);
      console.log("Item added:", selectedItem);
      fetchData(); // Refresh data after add
      handleCloseAddModal();
      showSnackbar("success", "Item added successfully");
    } catch (error) {
      console.error("Error adding item:", error);
      showSnackbar("error", "Failed to add item");
    }
  };

  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

  const handleDeleteConfirmationOpen = () => {
    setOpenDeleteConfirmation(true);
  };

  const handleDeleteConfirmationClose = () => {
    setOpenDeleteConfirmation(false);
  };

  const handleDelete = async (id) => {
    handleDeleteConfirmationOpen();
    setSelectedItem(id); // Store the ID to be deleted
  };

  const handleDeleteConfirmed = async () => {
    try {
      await axios.delete(`${apiUrl}/${selectedItem}`);
      console.log("Item deleted:", selectedItem);
      fetchData(); // Refresh data after delete
      showSnackbar("success", "Item deleted successfully");
      handleDeleteConfirmationClose();
    } catch (error) {
      console.error("Error deleting item:", error);
      showSnackbar("error", "Failed to delete item");
      handleDeleteConfirmationClose();
    }
  };

  const handleDeleteCancelled = () => {
    handleDeleteConfirmationClose();
    setSelectedItem(null);
  };

  const handleLogout = () => {
    onLogout();
  };

  const showSnackbar = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const [openViewModal, setOpenViewModal] = useState(false);

  const handleOpenViewModal = (item) => {
    setSelectedItem(item);
    setOpenViewModal(true);
  };

  const handleCloseViewModal = () => {
    setSelectedItem(null);
    setOpenViewModal(false);
  };

  return (
    <>
      {/* Menu Bar */}
      <div className="content-container">
        <div className="menu-bar">
          <div>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleOpenAddModal}
              style={{ marginRight: "10px" }}
            >
              Add
            </Button>
            <Button variant="outlined" color="secondary" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="searchBar2">
          <div>
            <h1 style={{ paddingBottom: "10px" }}>Employee </h1>
          </div>
          <div className="searchBar">
            <TextField
              label="Search"
              variant="outlined"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />

            <Button variant="contained" color="primary" onClick={handleSearch}>
              Search
            </Button>
          </div>
        </div>
        {/* Table */}
        <TableContainer component={Paper} className="tableContainer">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenViewModal(item)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton onClick={() => handleOpenEditModal(item)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(item._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog
          open={openDeleteConfirmation}
          onClose={handleDeleteConfirmationClose}
        >
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this item?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancelled} color="primary">
              No
            </Button>
            <Button onClick={handleDeleteConfirmed} color="primary">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openViewModal} onClose={handleCloseViewModal} fullWidth>
          <DialogTitle>View Item</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              value={selectedItem?.name || ""}
              fullWidth
              margin="dense"
              InputProps={{ readOnly: true }}
              disabled={true}
            />
            <TextField
              label="Description"
              value={selectedItem?.description || ""}
              fullWidth
              margin="dense"
              InputProps={{ readOnly: true }}
              disabled={true}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseViewModal} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        {/* Edit Modal */}
        <Dialog open={openEditModal} onClose={handleCloseEditModal} fullWidth>
          <DialogTitle>Edit Item</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              value={selectedItem?.name || ""}
              onChange={(e) =>
                setSelectedItem({ ...selectedItem, name: e.target.value })
              }
              fullWidth
              margin="dense"
            />
            <TextField
              label="Description"
              value={selectedItem?.description || ""}
              onChange={(e) =>
                setSelectedItem({
                  ...selectedItem,
                  description: e.target.value,
                })
              }
              fullWidth
              margin="dense"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditModal} color="primary">
              Cancel
            </Button>
            <Button onClick={handleEdit} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
        {/* Add Modal */}
        <Dialog open={openAddModal} onClose={handleCloseAddModal} fullWidth>
          <DialogTitle>Add Item</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              value={selectedItem?.name || ""}
              onChange={(e) =>
                setSelectedItem({ ...selectedItem, name: e.target.value })
              }
              fullWidth
              margin="dense"
            />
            <TextField
              label="Description"
              value={selectedItem?.description || ""}
              onChange={(e) =>
                setSelectedItem({
                  ...selectedItem,
                  description: e.target.value,
                })
              }
              fullWidth
              margin="dense"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddModal} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAdd} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
        {/* Snackbar for Success/Failure Messages */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            elevation={6}
            variant="filled"
            severity={snackbarSeverity}
            onClose={handleSnackbarClose}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default TableComponent;
