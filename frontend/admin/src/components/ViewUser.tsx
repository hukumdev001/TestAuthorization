import React from "react";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState, useEffect } from "react";
import { EditOutlined } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import {UserType } from "../interfaces";
import { imgStyle } from "../utils/reusable_styles";
import { setRoleX } from "@redux/reducer/roleReducer";
import { GuestAPI } from "@config/axios";

interface rowType {
  row: UserType;
  setUser: any;
}

function Row(props: rowType) {
  const { row, setUser }: rowType = props;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleNavigate(r: UserType) {
    navigate(`/admin/edit-user/${r.email}`);
    dispatch(setRoleX(r));
  }


  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row._id}</TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.roles}</TableCell>
        <TableCell>
          <EditOutlined
            className="pointer"
            onClick={() => handleNavigate(row)}
          />
        </TableCell>
      </TableRow>
    </>
  );
}

export default function ViewUser() {
  const [users, setUsers] = useState<UserType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const allUser: any = await GuestAPI.get("/auth/getAllUser");

      setUsers(allUser.data);
    })();
  }, []);

  return (
    <>
      {/* <Button
        variant="outlined"
        style={{ marginBottom: "20px" }}
        onClick={() => navigate("/admin/create-user")}
      >
        Create User
      </Button> */}
      {users && users.length ? (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((p: UserType) => (
                <Row key={p._id} row={p} setUser={setUsers} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div>
          <img src="fixing.png" alt="no roles" style={imgStyle} />
          <p style={{ textAlign: "center" }}>
            No Users found. Create one yourself...
          </p>
        </div>
      )}
    </>
  );
}
