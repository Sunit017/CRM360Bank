import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, path, ...props }) => {
  const userInfo = useSelector((state) => state.userLoggedInfo);
  const { userId, password } = userInfo || {};
  if (userId && password) {
    return (
      <>
        <Component />
      </>
    );
  }
  return <Navigate to="/login" />;
};
export default PrivateRoute;
