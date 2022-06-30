import React from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { FC, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ButtonAppBar from "../components/Nav";
import { Params, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setPolicy } from "@redux/reducer/policyReducer";
import client from "../utils/authClient";
import { PermissionType, PolicyType } from "../interfaces";
import { center } from "../utils/reusable_styles";
import ButtonComp from "../components/Button";
import PoliciesSelection from "../components/SelectPolicies";
import PermissionSelect from "@components/SelectPermissions";

const RoleForm: FC<{ type: string }> = ({ type }) => {
  const { policy, policyRole, permission, policyPermission } = client;
  const [policies, setPolicies] = useState<PolicyType[]>([]);
  const [permissions, setPermissions] = useState<PermissionType[]>([]);
  const [errorX, setErrorX] = useState({
    error: false,
    helperText: "",
    name: "",
  });

  const [PoliciesSelected, setPoliciesSelected] = useState<any[]>([]);
  const [PermissionSelected, setPermissionSelected] = useState<any[]>([]);
  const [policyRoleId, setPolicyRoleId] = useState<string>("");

  const handlePoliciesChange = (event: SelectChangeEvent<any[]>) => {
    const { value } = event.target;
    setPoliciesSelected(typeof value === "string" ? value.split(",") : value);
  };

  const handlePermissionChange = (event: SelectChangeEvent<any[]>) => {
    const { value } = event.target;
    setPermissionSelected(typeof value === "string" ? value.split(",") : value);
  };



  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { policyPermissionState } = useSelector(
    (state: any) => state.reducer.policyPermission
  );
  const params: Readonly<Params<string>> = useParams();

  useEffect(() => {
    (async () => {
      const allPolicies: any = await policy.getAll();

      const allPermission: any = await permission.getAll();
      setPolicies(allPolicies);
      setPermissions(allPermission);
    })();
  }, []);



  function handleBack() {
    navigate("/");
    dispatch(setPolicy({}));
  }

  async function handleSubmit() {
    let text = "";
    if (type === "create") {
      if (PermissionSelected.length > 0 && PoliciesSelected.length > 0) {
      
        await policyPermission.create({
          permissionid: PermissionSelected[0],
          policyid: PoliciesSelected[0],
        });
         text = "created";
      } else {
        text = "Please select permission and policy";
      }

     
    } else {
      if (PermissionSelected.length > 0 && PoliciesSelected.length > 0) {

          if (params.id) await policyPermission.update(params.id, {
            permissionid: PermissionSelected[0],
            policyid: PoliciesSelected[0],
          });
        text = "updated";
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

        <PermissionSelect
          permissions={permissions}
          handleChange={handlePermissionChange}
          selected={PermissionSelected}
        />

        <ButtonComp handleSubmit={handleSubmit} type={type} errorX={errorX} />
      </div>
    </div>
  );
};

export default RoleForm;
