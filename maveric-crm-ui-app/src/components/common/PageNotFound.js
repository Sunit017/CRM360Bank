import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeLogInfo } from "../../store/actions";

const PageNotFound = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(removeLogInfo());
  }, [dispatch]);
  return (
    <>
      <h1>404 Error</h1>
      <h2>
        Page Not Found... go to <Link to="/login">login</Link> page
      </h2>
    </>
  );
};
export default PageNotFound;
