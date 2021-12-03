import { Redirect } from "react-router-dom";
import React from "react";
import { useHistory } from "react-router-dom";

function ProtectedRoutes({ isLoggedIn, children }) {
  const history = useHistory();

  console.log(history.location.pathname);

  const path = history.location.pathname;

  return isLoggedIn ? (
    <>{children}</>
  ) : path == "/signup" ? (
    <Redirect to="/signup" />
  ) : (
    <Redirect to="/login" />
  );
}

export default ProtectedRoutes;
