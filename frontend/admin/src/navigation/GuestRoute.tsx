import React, { Children, ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export type GuestRouteProps = {
  guestPath: string;
  children?: ReactElement;
};

const GuestRoute = ({ guestPath, children }: GuestRouteProps) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  if (!isAuthenticated) {
    return children ? children : <Outlet />;
  } else {
    return <Navigate to={{ pathname: guestPath }} replace />;
  }
};

export default GuestRoute;
