import { Box } from "@chakra-ui/react";
import React from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ButtonAppBar from "@components/Nav";
import ViewPermission from "@components/ViewPermissions";
import ViewPolicy from "@components/ViewPolicy";
import ViewRole from "@components/ViewRole";
import ViewPermissionPolicy from "@components/ViewPermissionPolicy";
import ViewRolePolicy from "@components/ViewRolePolcicy";
import { useLocation } from "react-router-dom";
import ViewUser from "../components/ViewUser";

export default function Dashboard() {
  const location = useLocation();
  console.log(location);
  const [value, setValue] = React.useState((location.state as any)?.tab || "1");

  const handleChange2 = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <ButtonAppBar />
      <Box
        sx={{ width: "100%", typography: "body1" }}
        style={{ marginBottom: "20px" }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange2} aria-label="lab API tabs example">
              <Tab label="Users" value="1" />
              <Tab label="Roles" value="2" />
              <Tab label="Permissions" value="3" />
              <Tab label="Polices" value="4" />
              <Tab label="Relation_Permission_Policy" value="5" />
              <Tab label="Relation_Role_Policy" value="6" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <ViewUser />
          </TabPanel>
          <TabPanel value="2">
            <ViewRole />
          </TabPanel>
          <TabPanel value="3">
            <ViewPermission />
          </TabPanel>
          <TabPanel value="4">
            <ViewPolicy />
          </TabPanel>
          <TabPanel value="5">
            <ViewPermissionPolicy />
          </TabPanel>
          <TabPanel value="6">
            <ViewRolePolicy />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}
