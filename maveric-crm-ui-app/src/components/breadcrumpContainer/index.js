import React, { useState, useEffect } from "react";
import { Breadcrumbs, Link, IconButton, Typography } from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import {
  removeAccout360Page,
  removeUserSelect,
  removeAccount360Search,
  removeAccount360ClientInfo,
  removeOps360PageDetails,
  removeAccount360PageDetails,
  removeCustomer360PageDetails,
} from "../../store/actions";

const BreadcrumpContainer = ({ navDetails }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // console.info("location ##", location);
    const { pathname } = location;
    if (pathname !== "/app/dashboard") {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [location]);

  const gotoHomeDashboard = (url) => {
    navigate(url);
    dispatch(removeAccout360Page());
    dispatch(removeUserSelect());
    dispatch(removeAccount360ClientInfo());
    dispatch(removeOps360PageDetails());
    dispatch(removeAccount360Search());
    dispatch(removeAccount360PageDetails());
    dispatch(removeCustomer360PageDetails());
  };

  return (
    <>
      <Breadcrumbs
        style={{
          color: "#0b51ee",
          // backgroundColor: show ? "#5fa08d" : "#fff",
          // color: "#fff",
          height: !show && "25px",
          // position: "fixed",
          paddingTop: "40px",
        }}
      >
        {show && (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Link
              color="inherit"
              style={{
                display: "flex",
                fontSize: "small",
                height: "15px",
                padding: "5px",
                cursor: "pointer",
                textDecoration: "none",
              }}
              onClick={() => {
                gotoHomeDashboard("/app/dashboard");
              }}
            >
              <IconButton style={{ padding: "2px", color: "#0b51ee" }}>
                <HomeIcon />
              </IconButton>
              <Typography
                sx={{
                  fontSize: "small",
                  fontWeight: 700,
                  "&:hover": {
                    textDecoration: "underline",
                    color: "#000",
                  },
                }}
              >
                Home
              </Typography>
            </Link>
            {navDetails?.length &&
              navDetails.map((item, index) => {
                const { label, navUrl } = item;
                return (
                  <Link
                    key={index}
                    style={{
                      display: "flex",
                      fontSize: "small",
                      height: "15px",
                      padding: "5px",
                      cursor: navDetails.length > 1 ? "pointer" : "default",
                      textDecoration: "none",
                      color: "#0b51ee",
                    }}
                  >
                    <div style={{ paddingRight: "10px" }}>/</div>
                    <Typography
                      sx={{
                        fontSize: "small",
                        fontWeight: 700,
                        "&:hover": {
                          textDecoration:
                            navDetails.length > 1 ? "underline" : "none",
                        },
                      }}
                      onClick={() => {
                        if (navDetails.length > 1) {
                          gotoNavigation(navUrl);
                        }
                      }}
                    >
                      {label}
                    </Typography>
                  </Link>
                );
              })}
          </div>
        )}
      </Breadcrumbs>
    </>
  );
};
export default BreadcrumpContainer;
