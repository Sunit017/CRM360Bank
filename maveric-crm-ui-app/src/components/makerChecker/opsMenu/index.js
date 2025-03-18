import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import styled from "styled-components";
import { KeyboardArrowDown } from "@mui/icons-material";
import { isMobile } from "react-device-detect";

const Header = styled.div`
  background: #999;
  margin-bottom: 10px;
`;

const MakerCheckerMenu = ({ onSelectMenu }) => {
  const [eleE1, setEleE1] = useState(null);

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

  const onshowMakerCheckerMenu = (evt) => {
    setEleE1(evt.currentTarget);
    // onSelectMenu({ id: "makeDepositWithdrawal" });
  };
  const handleMakerCheckerClose = (item = null) => {
    setEleE1(null);
    if (item) {
      onSelectMenu(item);
    }
  };

  return (
    <Header>
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
        data-testid="makerChecker"
        open={Boolean(eleE1)}
        anchorEl={eleE1}
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

export default MakerCheckerMenu;
