import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import CustomRoutes from "./router";
import HeaderPanel from "./components/Header";

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

// Separate AppContent component to use location hook
const AppContent = () => {
  const location = useLocation();

  // Hide HeaderPanel only on the login page route (e.g., "/login")
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && <HeaderPanel />}
      <CustomRoutes />

    </>
  );
};

export default App;
