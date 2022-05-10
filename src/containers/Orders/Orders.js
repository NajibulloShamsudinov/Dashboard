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
  addOrders,
  deleteOrders,
  editOrders,
  getOrders,
  handleChange,
  handleModalOpenAndClose,
} from "../../reducers/orders.js";
import Modal from "../../components/Modal/Modal";

function Orders(props) {
  const dispatch = useDispatch();
  const orders = useSelector(({ orders }) => orders.orders);
  const order = useSelector(({ orders }) => orders.order);
  const addModal = useSelector(({ orders }) => orders.addModal);
  const editModal = useSelector(({ orders }) => orders.editModal);
  const deleteModal = useSelector(({ orders }) => orders.deleteModal);

  const onClose = (name) => {
    dispatch(handleModalOpenAndClose({ name: name, value: false }));
  };

  const onOpen = (name, id = null) => {
    dispatch(handleModalOpenAndClose({ name: name, value: true, id: id }));
  };

  const onSend = (name) => {
    if (name === "add") {
      dispatch(addOrders());
      return;
    }
    if (name === "edit") {
      dispatch(editOrders());
      return;
    }

    if (name === "delete") {
      dispatch(deleteOrders());
      return;
    }
  };

  const onChange = (event) => {
    const { name, value } = event.target;

    dispatch(handleChange({ name: name, value: value }));
  };

  useEffect(() => {
    dispatch(getOrders());
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
              <TableCell>ID</TableCell>
              <TableCell>CreatedAt</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Item</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {order.id}
                </TableCell>
                <TableCell>{order.createdAt.slice(0, 10)}</TableCell>
                <TableCell>{order.Customer}</TableCell>
                <TableCell>{order.Item}</TableCell>
                <TableCell>{order.Price}</TableCell>
                <TableCell>{order.Quantity}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => onOpen("editModal", order.id)}
                    color="warning"
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => onOpen("deleteModal", order.id)}
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
        title="Add Order"
        action="add"
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            name="Customer"
            label="Customer"
            variant="standard"
            value={order.Customer}
            onChange={onChange}
          />

          <TextField
            name="Item"
            label="Item"
            variant="standard"
            value={order.Item}
            onChange={onChange}
          />
          <TextField
            name="price"
            label="Price"
            variant="standard"
            value={order.Price}
            onChange={onChange}
          />
          <TextField
            name="Quantity"
            label="Quantity"
            variant="standard"
            value={order.Quantity}
            onChange={onChange}
          />
        </div>
      </Modal>
      <Modal
        open={editModal}
        handleClose={() => onClose("editModal")}
        send={() => onSend("edit")}
        title="Edit Order"
        action="edit"
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            name="customer"
            label="Customer"
            variant="standard"
            value={order.customer}
            onChange={onChange}
          />

          <TextField
            name="item"
            label="Item"
            variant="standard"
            value={order.item}
            onChange={onChange}
          />
          <TextField
            name="price"
            label="Price"
            variant="standard"
            value={order.price}
            onChange={onChange}
          />
          <TextField
            name="quantity"
            label="Quantity"
            variant="standard"
            value={order.quantity}
            onChange={onChange}
          />
        </div>
      </Modal>
      <Modal
        open={deleteModal}
        handleClose={() => onClose("deleteModal")}
        send={() => onSend("delete")}
        title="Delete Order"
        action="delete"
      >
        Are you sure you want to delete this user?
      </Modal>
    </div>
  );
}

export default Orders;
