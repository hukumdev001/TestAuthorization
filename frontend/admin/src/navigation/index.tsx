import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute, {
  ProtectedRouteProps,
} from "@navigation/ProtectedRoute";

import Login from "@pages/Login";
import Create from "@pages/Article/Create";
import Edit from "@pages/Article/Edit";
import Article from "@pages/Article/Index";

// Components imported from Module Federation
import Home from "@pages/Home";
import ArticleDetails from "@pages/Home";
import Dashboard from "@pages/Dashboard";
import PolicyForm from "@pages/PolicyForm";
import PermissionForm from "@pages/PermissionForm";
import RoleForm from "@pages/RoleForm";
import PolicyRoleForm from "@pages/PolicyRole";
import PolicyPermissionForm from '@pages/PolicyPermission'
import OAuthLogin from "@pages/Login/OAuthLogin";
import GuestRoute, { GuestRouteProps } from "./GuestRoute";
import Details from "@pages/Article/Details";
import UserFrom from "@pages/UserForm"

const index = () => {
  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, "children"> = {
    authenticationPath: "/login",
  };
  const defaultGuestRouteProps: Omit<GuestRouteProps, "children"> = {
    guestPath: "/admin/articles",
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/article/:slug" element={<ArticleDetails />} />

      <Route
        path="/admin"
        element={<ProtectedRoute {...defaultProtectedRouteProps} />}
      >
        <Route path="articles/create" element={<Create />} />
        <Route path="articles/:slug/edit" element={<Edit />} />
        <Route path="articles/:slug" element={<Details />} />
        <Route path="articles" element={<Article />} />
        <Route path="authorization" element={<Dashboard />} />
        <Route path="create-policy" element={<PolicyForm type="create" />} />
        <Route path="edit-policy/:id" element={<PolicyForm type="edit" />} />
        <Route
          path="create-policyPermission"
          element={<PolicyPermissionForm type="create" />}
        />
        <Route
          path="edit-policyPermission/:id"
          element={<PolicyPermissionForm type="edit" />}
        />

        <Route
          path="create-permission"
          element={<PermissionForm type="create" />}
        />
        <Route
          path="edit-policyrole/:id"
          element={<PolicyRoleForm type="edit" />}
        />

        <Route path="edit-user/:id" element={<UserFrom type="edit" />} />
        <Route path="create-user" element={<UserFrom type="create" />} />

        <Route
          path="create-policyrole"
          element={<PolicyRoleForm type="create" />}
        />
        <Route 
          path="edit-permission/:id"
          element={<PermissionForm type="edit" />}
        />
        <Route path="create-role" element={<RoleForm type="create" />} />
        <Route path="edit-role/:id" element={<RoleForm type="edit" />} />
      </Route>

      <Route element={<GuestRoute {...defaultGuestRouteProps} />}>
        <Route path="/login" element={<Login />} />
        <Route path="/system/login" element={<Login />} />
        <Route path="/auth/github-callback" element={<OAuthLogin />} />
      </Route>
    </Routes>
  );
};

export default index;
