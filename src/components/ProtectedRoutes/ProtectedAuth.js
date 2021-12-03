import { Redirect } from "react-router-dom";
import React from "react";

function ProtectedAuth({ isLoggedIn, children }) {
  return !isLoggedIn ? <>{children}</> : <Redirect to="/" />;
}

export default ProtectedAuth;
