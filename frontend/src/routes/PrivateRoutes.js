import React, { useEffect } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useGlobalUserContext, UserContext } from "../util/UserContext";

function PrivateRoutes(props) {
  const { userData } = useGlobalUserContext(UserContext);
  const navigate = useNavigate();
  // eout(() => {
  // useEffectsetTim(() => {

  // })
  if (userData.hasOwnProperty("email")) {
    if (props.roleRequired) {
      return userData.role === props.roleRequired ? (
        <Outlet />
      ) : (
        <Navigate to="/" />
      );
    } else if (userData.hasOwnProperty("role")) {
      return userData.role ? <Outlet /> : <Navigate to="/" />;
    } else {
      return <Navigate to="/" />;
    }
  }
  // navigate("/");
  // }, 600);
}

export default PrivateRoutes;
