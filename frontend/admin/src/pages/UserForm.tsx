import React from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { FC, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ButtonAppBar from "../components/Nav";
import { Params, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setPolicy } from "@redux/reducer/policyReducer";
import client from "../utils/authClient";
import {  RoleType } from "../interfaces";
import { center } from "../utils/reusable_styles";
import ButtonComp from "../components/Button";

import RoleSelect from "@components/SelectNameRoles";
import { GuestAPI } from "@config/axios";

const RoleForm: FC<{ type: string }> = ({ type }) => {
  const { policyRole, role } = client;
  const [roles, setRoles] = useState<RoleType[]>([]);
  const [errorX, setErrorX] = useState({
    error: false,
    helperText: "",
    name: "",
  });

  const [RoleSelected, setRoleSelected] = useState<any[]>([]);

  const handleRoleChange = (event: SelectChangeEvent<any[]>) => {
    const { value } = event.target;
    console.log('value', value)
    setRoleSelected(typeof value === "string" ? value.split(",") : value);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params: Readonly<Params<string>> = useParams();

  console.log('paramas', params)

  useEffect(() => {
    (async () => {
      const allRoles: any = await role.getAll();

      setRoles(allRoles);
    })();
  }, []);

  function handleBack() {
    navigate("/");
    dispatch(setPolicy({}));
  }

  async function handleSubmit() {
    let text = "";
    if (type === "edit") {
      if (RoleSelected.length > 0) {
        try {
         await GuestAPI.put('/auth/updateRole', { email: params.id, role: RoleSelected[0],})
          text = "created";
        } catch (e) {
          console.log("error", e);
          text = "This role already exits";
        }
      } else {
        text = "Please select policy";
      }
    }

    navigate(-1);
    toast.success(`policy ${text}!`);
  }

  return (
    <div style={{ position: "relative" }}>
      <ButtonAppBar />
      <Button
        variant="outlined"
        onClick={handleBack}
        style={{ margin: "0px 0px 20px 40px" }}
      >
        Go Back
      </Button>
      <p
        style={{
          textAlign: "center",
          fontSize: "larger",
          position: "absolute",
          top: "20%",
          left: "40%",
        }}
      >
        {" "}
        {type === "create" ? "Create a Policy_role" : `Edit: policy role `}
      </p>
      <div style={center}>
        <RoleSelect
          roles={roles}
          handleChange={handleRoleChange}
          selected={RoleSelected}
        />

        <ButtonComp handleSubmit={handleSubmit} type={type} errorX={errorX} />
      </div>
    </div>
  );
};

export default RoleForm;
