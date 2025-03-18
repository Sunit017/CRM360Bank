import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import styled from "styled-components";
import { KeyboardArrowDown } from "@mui/icons-material";
import { isMobile } from "react-device-detect";

const Header = styled.div`
  // padding: 8px;
  background: #999;
  // border-radius: 10px;
  // width: calc(100vw - 90px);
  // margin-bottom: 10px;
  display: flex;
  flex-direction: row;
`;

const MenuNavigation = ({ selectedMenu }) => {
  const [eleE1, setEleE1] = useState(null);
  const [eleE2, setEleE2] = useState(null);

  const handleAccount360Close = (item = {}) => {
    setEleE1(null);
    if (item?.id) {
      selectedMenu(item);
    }
  };
  const onshowAccount360Menu = (evt) => {
    setEleE1(evt.currentTarget);
  };
  const onshowMakerCheckerMenu = (evt) => {
    setEleE2(evt.currentTarget);
    // selectedMenu({ id: "makeDepositWithdrawal" });
  };
  const handleMakerCheckerClose = (item = null) => {
    setEleE2(null);
    if (item) {
      selectedMenu(item);
    }
  };

  const menuList = [
    {
      id: "makerChecker",
      menuLabel: "Maker Checker",
      childItem: [
        {
          id: "makeDepositWithdrawal",
          label: "Make Deposit Withdrawal",
        },
        {
          id: "createAppoveClients",
          label: "Create Appove Clients",
        },
        {
          id: "approveCloseLockUnlockAccount",
          label: "Approve / Close / Lock / Unlock Account",
        },
        {
          id: "applyAccountFees",
          label: "Apply Account Fees",
        },
        {
          id: "applyAccuredInterest",
          label: "Apply Accured Interest",
        },
        {
          id: "customer360",
          label: "Customer 360",
        },
      ],
    },
  ];

  return (
    <Header>
      <Button
        endIcon={<KeyboardArrowDown />}
        variant="containedMenu"
        style={{ color: "#fff", textTransform: "none" }}
        onClick={(evt) => onshowAccount360Menu(evt)}
        data-testid="Account360Dropdown"
      >
        Account 360
      </Button>
      <Button
        endIcon={<KeyboardArrowDown />}
        variant="containedMenu"
        style={{ color: "#fff", textTransform: "none" }}
        onClick={(evt) => onshowMakerCheckerMenu(evt)}
        data-testid="MakerCheckerDropdown"
      >
        Maker Checker
      </Button>

      <Menu
        data-testid="account360-menu"
        open={Boolean(eleE1)}
        anchorEl={eleE1}
        onClose={() => handleAccount360Close()}
        PaperProps={{
          style: {
            // maxHeight: 40 * 4,
            width: "20ch",
          },
        }}
      >
        <MenuItem
          sx={{
            fontSize: "small",
            minHeight: "32px",
          }}
          onClick={() => {
            handleAccount360Close({ id: "accountDetails" });
          }}
          data-testid="AccountDetailsMenuItem"
        >
          Account Details
        </MenuItem>
        <MenuItem
          sx={{
            fontSize: "small",
            minHeight: "32px",
          }}
          onClick={() => {
            handleAccount360Close({ id: "accountCardDetails" });
          }}
          data-testid="CardDetailsMenuItem"
        >
          Card Details
        </MenuItem>
      </Menu>
      <Menu
        data-testid="makerChecker-menu"
        open={Boolean(eleE2)}
        anchorEl={eleE2}
        onClose={() => handleMakerCheckerClose()}
        PaperProps={{
          style: {
            height: "110px",
            width: "calc(100vw - 100px)",
          },
        }}
      >
        {menuList[0].childItem.map((item) => {
          const menuCss = !isMobile
            ? {
                marginRight: "0px",
                position: "relative",
                minHeight: "32px",
                width: "50%",
                float: "left",
              }
            : {
                minHeight: "35px",
              };
          return (
            <MenuItem
              sx={{
                fontSize: "small",
                ...menuCss,
              }}
              onClick={() => {
                handleMakerCheckerClose(item);
              }}
              data-testid="MakerCheckerMenuItems"
              key={item.id}
            >
              {item.label}
            </MenuItem>
          );
        })}
      </Menu>
    </Header>
  );
};

export default MenuNavigation;
