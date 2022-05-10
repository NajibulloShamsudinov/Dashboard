import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import {
  addCustomers,
  deleteCustomers,
  editCustomers,
  getCustomers,
  handleChange,
  handleModalOpenAndClose,
} from "../../reducers/customers.js";
import Modal from "../../components/Modal/Modal";

function Customers(props) {
  const dispatch = useDispatch();
  const customers = useSelector(({ customers }) => customers.customers);
  const customer = useSelector(({ customers }) => customers.customer);
  const addModal = useSelector(({ customers }) => customers.addModal);
  const editModal = useSelector(({ customers }) => customers.editModal);
  const deleteModal = useSelector(({ customers }) => customers.deleteModal);

  const onClose = (name) => {
    dispatch(handleModalOpenAndClose({ name: name, value: false }));
  };

  const onOpen = (name, id = null) => {
    dispatch(handleModalOpenAndClose({ name: name, value: true, id: id }));
  };

  const onSend = (name) => {
    if (name === "add") {
      dispatch(addCustomers());
      return;
    }
    if (name === "edit") {
      dispatch(editCustomers());
      return;
    }

    if (name === "delete") {
      dispatch(deleteCustomers());
      return;
    }
  };

  const onChange = (event) => {
    const { name, value } = event.target;

    dispatch(handleChange({ name: name, value: value }));
  };

  useEffect(() => {
    dispatch(getCustomers());
  }, []);
  return (
    <div>
      <Button
        variant="contained"
        color="success"
        style={{ margin: "10px 10px" }}
        onClick={() => onOpen("addModal")}
        startIcon={<AddIcon />}
      >
        add
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Customor_ID</TableCell>
              <TableCell>CreatAt</TableCell>
              <TableCell>Firs_Name</TableCell>
              <TableCell>Last_NAme</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow
                key={customer.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {customer.id}
                </TableCell>
                <TableCell>{customer.createdAt.slice(0, 10)}</TableCell>
                <TableCell>{customer.firstname}</TableCell>
                <TableCell>{customer.lastname}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => onOpen("editModal", customer.id)}
                    color="warning"
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => onOpen("deleteModal", customer.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={addModal}
        handleClose={() => onClose("addModal")}
        send={() => onSend("add")}
        title="Add Customer"
        action="add"
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            name="firstname"
            label="Firstname"
            variant="standard"
            value={customer.firstname}
            onChange={onChange}
          />

          <TextField
            name="lastname"
            label="Lastname"
            variant="standard"
            value={customer.lastname}
            onChange={onChange}
          />
          <TextField
            name="phone"
            label="phone"
            variant="standard"
            value={customer.phone}
            onChange={onChange}
          />
        </div>
      </Modal>
      <Modal
        open={editModal}
        handleClose={() => onClose("editModal")}
        send={() => onSend("edit")}
        title="Edit Customer"
        action="edit"
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            name="firstname"
            label="Firstname"
            variant="standard"
            value={customer.firstname}
            onChange={onChange}
          />

          <TextField
            name="lastname"
            label="lastname"
            variant="standard"
            value={customer.lastname}
            onChange={onChange}
          />
          <TextField
            name="phone"
            label="Phone"
            variant="standard"
            value={customer.phone}
            onChange={onChange}
          />
        </div>
      </Modal>
      <Modal
        open={deleteModal}
        handleClose={() => onClose("deleteModal")}
        send={() => onSend("delete")}
        title="Delete Customer"
        action="delete"
      >
        Are you sure you want to delete this user?
      </Modal>
    </div>
  );
}

export default Customers;
