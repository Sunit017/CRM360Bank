import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Dashboard from "../components/dashboard";
import Customer360 from "../components/customer360";
import LoginPage from "../components/login";
import PrivateRoute from "../PrivateRoute";
import PageNotFound from "../components/common/PageNotFound";
import Account360 from "../components/account360";
import Case360 from "../components/case360";
import MakerChecker from "../components/makerChecker";
import { Routes, Route } from "react-router-dom";
import { useIdleTimer } from "react-idle-timer";
import { removeLogInfo } from "../store/actions";
import { useDispatch } from "react-redux";

const CustomRoutes = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigateLaunch = useNavigate();
  console.info("location ##", location);
  const handleOnIdle = (event) => {
    console.log("user is idle", event);
    console.log("last active", getLastActiveTime());
    dispatch(removeLogInfo());
    navigateLaunch("/login");
  };

  const handleOnActive = (event) => {
    console.log("user is active", event);
    console.log("time remaining", getRemainingTime());
  };

  const handleOnAction = (event) => {
    // console.log("user did something", event);
  };
  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * 15, // time in milliseconds (15 Mins)
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500,
  });

  return (
    <Routes>
      <Route
        path="/app/dashboard"
        element={<PrivateRoute component={Dashboard} />}
      />
      <Route
        path="/app/customer360"
        element={<PrivateRoute component={Customer360} />}
      />
      <Route
        path="/app/case360"
        element={<PrivateRoute component={Case360} />}
      />
      <Route
        path="/app/ops360"
        element={<PrivateRoute component={MakerChecker} />}
      />
      <Route
        path="/app/account360"
        element={<PrivateRoute component={Account360} />}
      />
      <Route path="/login" element={<LoginPage />} />
      <Route
        exact
        path="/"
        element={
          location.pathname === "/" ? (
            <Navigate to={"/login"} />
          ) : (
            <Navigate to="/404" />
          )
        }
      />
      <Route path="*" element={<Navigate to="/404" />} />
      <Route path="/404" element={<PageNotFound />} />
    </Routes>
  );
};
export default CustomRoutes;
