import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useGlobalUserContext, UserContext } from "../util/UserContext";

function PrivateRoutes(props) {
  const { userData } = useGlobalUserContext(UserContext);

  if (props.roleRequired) {
    return userData.role === props.roleRequired ? (
      <Outlet />
    ) : (
      <Navigate to="/login" />
    );
  } else {
    return userData.role ? <Outlet /> : <Navigate to="/" />;
  }
}

export default PrivateRoutes;
