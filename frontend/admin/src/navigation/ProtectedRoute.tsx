import React, { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export type ProtectedRouteProps = {
  authenticationPath: string;
  children?: ReactElement;
};

const ProtectedRoute = ({
  authenticationPath,
  children,
}: ProtectedRouteProps) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  if (isAuthenticated) {
    return children ? children : <Outlet />;
  } else {
    return <Navigate to={{ pathname: authenticationPath }} replace />;
  }
};

export default ProtectedRoute;
