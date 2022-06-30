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
import { EditOutlined, DeleteOutlined } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import client from "../utils/authClient";
import {PermissionPolicyType } from "../interfaces";
import { imgStyle } from "../utils/reusable_styles";
import { setPolicy } from "@redux/reducer/policyReducer";

function Row(props: {
  row: PermissionPolicyType;
  policyPermission: any;
  setPolicyPermission: any;
}) {
  const { row, policyPermission, setPolicyPermission } = props;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleNavigate(p: PermissionPolicyType) {
    navigate(`/admin/edit-policyPermission/${p.ID}`);
    dispatch(setPolicy(p));
  }

  async function handleDelete(p: PermissionPolicyType) {
    await policyPermission.delete(p.ID);
    setPolicyPermission(await policyPermission.getAll());
    toast.warning("Policy deleted!");
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
        <TableCell>{row.ID}</TableCell>
        <TableCell>{row.PolicyId}</TableCell>
        <TableCell>
          {row.PermissionId}
        </TableCell>
        <TableCell>
          <DeleteOutlined
            style={{ marginRight: "30px" }}
            className="pointer"
            onClick={() => handleDelete(row)}
          />
          <EditOutlined
            className="pointer"
            onClick={() => handleNavigate(row)}
          />
        </TableCell>
      </TableRow>
      
    </>
  );
}

export default function ViewPermissionPolicy() {
  const { policyPermission } = client;
  const [policyPermissionData, setPolicyPermission] = useState<any>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const allPolicies = await policyPermission.getAll();
      setPolicyPermission(allPolicies);
    })();
  }, []);

  return (
    <>
      <Button
        variant="outlined"
        style={{ marginBottom: "20px" }}
        onClick={() => navigate("/admin/create-policyPermission")}
      >
        Create Policy
      </Button>
      {policyPermissionData && policyPermissionData.length ? (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>ID</TableCell>
                <TableCell>Policy ID</TableCell>
                <TableCell>Permission ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {policyPermissionData.map((p: PermissionPolicyType) => (
                <Row
                  key={p.ID}
                  row={p}
                  policyPermission={policyPermission}
                  setPolicyPermission={setPolicyPermission}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div>
          <img src="fixing.png" alt="no policies" style={imgStyle} />
          <p style={{ textAlign: "center" }}>
            No Policies found. Create one yourself...
          </p>
        </div>
      )}
    </>
  );
}
