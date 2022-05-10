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
  addReports,
  deleteReports,
  editReports,
  getReports,
  handleChange,
  handleModalOpenAndClose,
} from "../../reducers/reports.js";
import Modal from "../../components/Modal/Modal";

function Reports(props) {
  const dispatch = useDispatch();
  const reports = useSelector(({ reports }) => reports.reports);
  const report = useSelector(({ reports }) => reports.report);
  const addModal = useSelector(({ reports }) => reports.addModal);
  const editModal = useSelector(({ reports }) => reports.editModal);
  const deleteModal = useSelector(({ reports }) => reports.deleteModal);

  const onClose = (name) => {
    dispatch(handleModalOpenAndClose({ name: name, value: false }));
  };

  const onOpen = (name, id = null) => {
    dispatch(handleModalOpenAndClose({ name: name, value: true, id: id }));
  };

  const onSend = (name) => {
    if (name === "add") {
      dispatch(addReports());
      return;
    }
    if (name === "edit") {
      dispatch(editReports());
      return;
    }

    if (name === "delete") {
      dispatch(deleteReports());
      return;
    }
  };

  const onChange = (event) => {
    const { name, value } = event.target;

    dispatch(handleChange({ name: name, value: value }));
  };

  useEffect(() => {
    dispatch(getReports());
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
              <TableCell>createdAt</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>

              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report) => (
              <TableRow
                key={report.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {report.id}
                </TableCell>
                <TableCell>{report.createdAt.slice(0, 10)}</TableCell>
                <TableCell>{report.name}</TableCell>
                <TableCell>{report.age}</TableCell>
                <TableCell>{report.email}</TableCell>
                <TableCell>{report.phone}</TableCell>

                <TableCell>
                  <IconButton
                    onClick={() => onOpen("editModal", report.id)}
                    color="warning"
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => onOpen("deleteModal", report.id)}
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
        title="Add Reports"
        action="add"
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            name="name"
            label="name"
            variant="standard"
            value={report.name}
            onChange={onChange}
          />

          <TextField
            name="model"
            label="model"
            variant="standard"
            value={report.model}
            onChange={onChange}
          />
          <TextField
            name="motor"
            label="motor"
            variant="standard"
            value={report.motor}
            onChange={onChange}
          />
        </div>
      </Modal>
      <Modal
        open={editModal}
        handleClose={() => onClose("editModal")}
        send={() => onSend("edit")}
        title="Edit Report"
        action="edit"
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            name="name"
            label="name"
            variant="standard"
            value={report.name}
            onChange={onChange}
          />

          <TextField
            name="model"
            label="model"
            variant="standard"
            value={report.model}
            onChange={onChange}
          />
          <TextField
            name="motor"
            label="motor"
            variant="standard"
            value={report.motor}
            onChange={onChange}
          />
        </div>
      </Modal>
      <Modal
        open={deleteModal}
        handleClose={() => onClose("deleteModal")}
        send={() => onSend("delete")}
        title="Delete Report"
        action="delete"
      >
        Are you sure you want to delete this user?
      </Modal>
    </div>
  );
}

export default Reports;
