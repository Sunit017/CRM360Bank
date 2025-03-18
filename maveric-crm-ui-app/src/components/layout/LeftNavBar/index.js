import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { IconButton, Fade, Menu, MenuItem } from "@mui/material";
import {
  Home as HomeIcon,
  Speed,
  SupportAgent,
  AccountBalance,
  HowToReg,
} from "@mui/icons-material";
import {
  removeAccout360Page,
  removeUserSelect,
  removeAccount360Search,
  removeAccount360ClientInfo,
  removeOps360PageDetails,
} from "../../../store/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import HeaderPanel from "../../Header";
import BreadcrumpContainer from "../../breadcrumpContainer";

const LeftNavPane = styled.div`
  background-color: #4b53bc;
  width: 60px;
  height: calc(100vh - 40px);
`;

const LeftNavBar = () => {
  const [case360AnchorEl, setCase360AnchorEl] = useState(null);
  const isOpen = Boolean(case360AnchorEl);

  const [navUrl, setNavUrl] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const gotoNavigation = (url) => {
    navigate(url);
    setNavUrl(url);
    dispatch(removeAccout360Page());
    dispatch(removeUserSelect());
    dispatch(removeAccount360ClientInfo());
    dispatch(removeOps360PageDetails());
  };

  const gotoCase360NavUrl = (evt) => {
    setCase360AnchorEl(evt.currentTarget);
  };

  const handleClose = () => {
    setCase360AnchorEl(null);
  };
  useEffect(() => {
    dispatch(removeAccout360Page());
    dispatch(removeUserSelect());
    dispatch(removeAccount360Search());
  }, [navUrl]);

  return (
    <>
      <HeaderPanel />
      <BreadcrumpContainer />
      <Outlet />
    </>
  );
};

export default LeftNavBar;
