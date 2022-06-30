import React from "react";
import { FC, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ButtonAppBar from "../components/Nav";
import { Params, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import ButtonComp from "../components/Button";
import Input from "../components/Input";
import { setPermission } from "@redux/reducer/permissionReducer";
import client from "../utils/authClient";
import { center } from "../utils/reusable_styles";

const PermissionForm: FC<{ type: string }> = ({ type }) => {
  const { permission } = client;
  const [perm, setPerm] = useState({
    resource: "",
    action: "",
  });

  const [errorX, setErrorX] = useState({
    error: false,
    helperText: "",
    name: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { permissionState } = useSelector(
    (state: any) => state.reducer.permission
  );
  const params: Readonly<Params<string>> = useParams();

  useEffect(() => {
    if (type === "edit") {
      setPerm(permissionState);
    }
  }, []);

  function handleBack() {
    navigate("/");
    dispatch(setPermission({}));
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPerm((prev) => ({
      ...prev,
      [name]: value as string,
    }));
    value === ""
      ? setErrorX({
          error: true,
          helperText: `${name} is required`,
          name,
        })
      : setErrorX({ error: false, helperText: "", name });
  };

  async function handleSubmit() {
    let text = "";
    if (type === "create") {
      await permission.create(perm);
      text = "created";
    } else {
      if (params.id) await permission.update(params.id, perm);
      text = "updated";
    }
    navigate(-1);
    toast.success(`permission ${text}!`);
  }

  return (
    <div style={{ marginBottom: "30px" }}>
      <ButtonAppBar />
      <Button
        variant="outlined"
        onClick={handleBack}
        style={{ margin: "0px 0px 20px 40px" }}
      >
        Go Back
      </Button>
      <p
        style={{ textAlign: "center", fontSize: "larger", marginRight: "50px" }}
      >
        {type === "create"
          ? "Create a Permission"
          : `Edit Permission: ${permissionState.Resource}`}
      </p>
      <div style={center}>
        <Input
          type={type}
          isEdit={permissionState.Resource}
          errorX={errorX}
          handleInputChange={handleInputChange}
          operation="Permisison Resource"
          _name="resource"
        />
        <Input
          type={type}
          isEdit={permissionState.Action}
          errorX={errorX}
          handleInputChange={handleInputChange}
          operation="Permission Action"
          _name="action"
        />
        <ButtonComp
          handleSubmit={handleSubmit}
          type={type}
          errorX={errorX}
          toValidate={[perm.resource, perm.action]}
        />
      </div>
    </div>
  );
};

export default PermissionForm;
