import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import styled from "styled-components";
import { KeyboardArrowDown } from "@mui/icons-material";

const Header = styled.div`
  // padding: 8px;
  background: #999;
  // border-radius: 10px;
  // width: calc(100vw - 90px);
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
`;

const MenuNavigation = ({ selectedMenu }) => {
  const [eleE1, setEleE1] = useState(null);

  const handleCase360Close = (item = {}) => {
    setEleE1(null);
    if (item?.id) {
      selectedMenu(item);
    }
  };
  const onshowCase360Menu = (evt) => {
    setEleE1(evt.currentTarget);
  };

  return (
    <Header>
      <Button
        endIcon={<KeyboardArrowDown />}
        variant="containedMenu"
        style={{ color: "#fff", textTransform: "none" }}
        data-testid="btn-showcase"
        onClick={(evt) => onshowCase360Menu(evt)}
      >
        Case 360
      </Button>

      <Menu
        data-testid="case360-menu"
        open={Boolean(eleE1)}
        anchorEl={eleE1}
        onClose={() => handleCase360Close()}
        PaperProps={{
          style: {
            maxHeight: 40 * 4,
            width: "20ch",
          },
        }}
      >
        <MenuItem
          data-testid="case360-menu1"
          sx={{
            fontSize: "small",
            minHeight: "32px",
          }}
          onClick={() => {
            handleCase360Close({ id: "caseManagement" });
          }}
        >
          Case Management
        </MenuItem>
        <MenuItem
          sx={{
            fontSize: "small",
            minHeight: "32px",
          }}
          onClick={() => {
            handleCase360Close({ id: "caseAssignment" });
          }}
        >
          Case Assignment
        </MenuItem>
        <MenuItem
          sx={{
            fontSize: "small",
            minHeight: "32px",
          }}
          onClick={() => {
            handleCase360Close({ id: "caseDashboard" });
          }}
        >
          Case Dashboard
        </MenuItem>
      </Menu>
    </Header>
  );
};

export default MenuNavigation;
