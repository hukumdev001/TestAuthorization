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
import {  RolePolicyType} from "../interfaces";
import { imgStyle } from "../utils/reusable_styles";
import { setPolicy } from "@redux/reducer/policyReducer";

function Row(props: {
  row: RolePolicyType;
  policyRole: any;
  setPolicyRole: any;
}) {
  const { row, policyRole, setPolicyRole } = props;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleNavigate(p: RolePolicyType) {
    navigate(`/admin/edit-policyrole/${p.ID}`);
    dispatch(setPolicy(p));
  }

  async function handleDelete(p: RolePolicyType) {
    await policyRole.delete(p.ID);
    setPolicyRole(await policyRole.getAll());
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
        <TableCell>{row.RoleId}</TableCell>
        <TableCell>{row.PolcyId}</TableCell>
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

export default function ViewRolePolicy() {
  const { policyRole } = client;
  const [policyRoleData, setPolicyRoles] = useState<any>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const allPoliciesRole = await policyRole.getAll();
      setPolicyRoles(allPoliciesRole);
    })();
  }, []);

  return (
    <>
      <Button
        variant="outlined"
        style={{ marginBottom: "20px" }}
        onClick={() => navigate("/admin/create-policyrole")}
      >
        Create Policy
      </Button>
      {policyRoleData && policyRoleData.length ? (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>ID</TableCell>
                <TableCell>Role Id</TableCell>
                <TableCell>Policy ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {policyRoleData.map((p: RolePolicyType) => (
                <Row
                  key={p.ID}
                  row={p}
                  policyRole={policyRoleData}
                  setPolicyRole={setPolicyRoles}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div>
          <img src="fixing.png" alt="no policies" style={imgStyle} />
          <p style={{ textAlign: "center" }}>
            No PolicyRole found. Create one yourself...
          </p>
        </div>
      )}
    </>
  );
}
