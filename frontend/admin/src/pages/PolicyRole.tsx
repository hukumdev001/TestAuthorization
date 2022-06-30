import React from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { FC, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ButtonAppBar from "../components/Nav";
import { Params, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {  useDispatch } from "react-redux";
import { setPolicy } from "@redux/reducer/policyReducer";
import client from "../utils/authClient";
import { PolicyType, RoleType } from "../interfaces";
import { center } from "../utils/reusable_styles";
import ButtonComp from "../components/Button";
import PoliciesSelection from "../components/SelectPolicies";

import RoleSelect from "@components/SelectRoles";

const RoleForm: FC<{ type: string }> = ({ type }) => {
  const { policy, policyRole, role } = client;
  const [policies, setPolicies] = useState<PolicyType[]>([]);
  const [roles, setRoles] = useState<RoleType[]>([]);
  const [errorX, setErrorX] = useState({
    error: false,
    helperText: "",
    name: "",
  });

  const [PoliciesSelected, setPoliciesSelected] = useState<any[]>([]);
  const [RoleSelected, setRoleSelected] = useState<any[]>([]);

  const handlePoliciesChange = (event: SelectChangeEvent<any[]>) => {
    const { value } = event.target;
    setPoliciesSelected(typeof value === "string" ? value.split(",") : value);
  };

  const handleRoleChange = (event: SelectChangeEvent<any[]>) => {
    const { value } = event.target;
    setRoleSelected(typeof value === "string" ? value.split(",") : value);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params: Readonly<Params<string>> = useParams();

  useEffect(() => {
    (async () => {
      const allPolicies: any = await policy.getAll();

      const allRoles: any = await role.getAll();
      setPolicies(allPolicies);
      setRoles(allRoles);
    })();
  }, []);

  function handleBack() {
    navigate("/");
    dispatch(setPolicy({}));
  }

  async function handleSubmit() {
    let text = "";
    if (type === "create") {
      if (RoleSelected.length > 0 && PoliciesSelected.length > 0) {
        try {
          await policyRole.create({
            roleid: RoleSelected[0],
            policyid: PoliciesSelected[0],
          });
          text = "created";
        } catch (e) {
          console.log("error", e);
          text = "This relation already exits";
        }
      } else {
        text = "Please select permission and policy";
      }
    } else {
      if (RoleSelected.length > 0 && PoliciesSelected.length > 0) {
        try {
          if (params.id)
            await policyRole.update(params.id, {
              roleid: RoleSelected[0],
              policyid: PoliciesSelected[0],
            });
          text = "updated";
        } catch (e) {
          console.log("error", e);
          text = "This relation already exists";
        }
      } else {
        text = "Please select permission and policy";
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
        <PoliciesSelection
          policies={policies}
          handleChange={handlePoliciesChange}
          selected={PoliciesSelected}
        />

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
