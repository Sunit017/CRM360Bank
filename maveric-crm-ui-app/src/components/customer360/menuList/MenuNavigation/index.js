import React, { useState } from "react";
import { Button, Menu, MenuItem, Grid } from "@mui/material";
import styled from "styled-components";
import { removeAccout360Page } from "../../../../store/actions";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import MakerCheckerMenu from "../../../makerChecker/opsMenu";
import { useSelector } from "react-redux";
import { isMobile } from "react-device-detect";

const Header = styled.div`
  background: #214E8F;
  margin-bottom: 10px;
`;

const MenuNavigation = ({ selectedMenu }) => {
  const [eleE1, setEleE1] = useState(null);
  const [eleE2, setEleE2] = useState(null);
  const [eleE3, setEleE3] = useState(null);
  const [eleE4, setEleE4] = useState(null);
  const [enbleMakerChecker, setEnbleMakerChecker] = useState(false);

  //To enable maker checker menu
  const accountSelection = useSelector((state) => state.accountSelection);
  const { pageId } = accountSelection || {};

  const dispatch = useDispatch();
  const onshowCustomer360Menu = (evt) => {
    setEleE1(evt.currentTarget);
  };
  const handleCustomer360Close = (item = null) => {
    setEleE1(null);
    if (item) {
      selectedMenu(item);
    }
    setEnbleMakerChecker(false);
  };
  const onshowAccount360Menu = (evt) => {
    dispatch(removeAccout360Page());
    selectedMenu({ id: "account360" });
    setEnbleMakerChecker(true);
  };

  const onshowCase360Menu = (evt) => {
    setEleE2(evt.currentTarget);
  };
  const handleCase360Close = (item = null) => {
    setEleE2(null);
    if (item) {
      selectedMenu(item);
    }
    setEnbleMakerChecker(false);
  };
  const onshowCallContactMenu = (evt) => {
    setEleE3(evt.currentTarget);
  };
  const handleCallContactClose = () => {
    setEleE3(null);
    setEnbleMakerChecker(false);
  };
  const onshowChatContactMenu = (evt) => {
    setEleE4(evt.currentTarget);
  };
  const handleChatContactClose = () => {
    setEleE4(null);
    setEnbleMakerChecker(false);
  };

  const onshowTasksMenu = (evt) => {
    selectedMenu({ id: "tasks" });
    setEnbleMakerChecker(false);
  };

  const makerCheckerMenu = (item) => {
    selectedMenu(item);
  };
  const menuList = [
    {
      id: "customer360",
      menuLabel: "Customer 360",
      childItem: [
        {
          id: "customerDetails",
          label: "Customer Details",
        },
        {
          id: "personalDetails",
          label: "Personal Details",
        },
        {
          id: "permanentAddress",
          label: "Permanent Address",
        },
        {
          id: "businessDetails",
          label: "Business Details",
        },
        {
          id: "businessAddress",
          label: "Business Address",
        },
        {
          id: "employmentDetails",
          label: "Employment Details",
        },
        {
          id: "employmentAddress",
          label: "Employment Address",
        },
        {
          id: "spouseDetails",
          label: "Spouse Details",
        },
        {
          id: "identityDetails",
          label: "Identification Details",
        },
        {
          id: "financialDetails",
          label: "Financial Details",
        },
        {
          id: "nomineeDetails",
          label: "Nominee Details",
        },
        {
          id: "clientStatus",
          label: "Client Status",
        },
        { id: "idMission", label: "IdMission" },
        {
          id: "idMissionDedupe",
          label: "IdMission Dedupe",
        },
        {
          id: "AMLStatus",
          label: "AML Status",
        },
        {
          id: "KYCHighRiskfields",
          label: "KYC High-Risk fields",
        },
        {
          id: "loanFields",
          label: "Loan Fields",
        },
      ],
    },
  ];
  return (
    <>
      <Header
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "start",
        }}
      >
        <Button
          sx={{
            padding: "6px 10px",
          }}
          endIcon={<KeyboardArrowDown />}
          variant="containedMenu"
          style={{ color: "#fff", textTransform: "none" }}
          onClick={(evt) => onshowCustomer360Menu(evt)}
          data-testid="Customer360Dropdown"
          // onMouseEnter={(evt) => onshowCustomer360Menu(evt)}
        >
          Customer 360
        </Button>

        <Button
          sx={{
            padding: "6px 10px",
          }}
          variant="containedMenu"
          style={{ color: "#fff", textTransform: "none" }}
          data-testid="Account360Dropdown"
          onClick={(evt) => onshowAccount360Menu(evt)}
        >
          Account 360
        </Button>
        <Button
          sx={{
            padding: "6px 10px",
          }}
          endIcon={<KeyboardArrowDown />}
          variant="containedMenu"
          style={{ color: "#fff", textTransform: "none" }}
          onClick={(evt) => onshowCase360Menu(evt)}
          data-testid="Case360Dropdown"
          // onMouseEnter={(evt) => onshowCase360Menu(evt)}
        >
          Case 360
        </Button>
        <Button
          sx={{
            padding: "6px 10px",
          }}
          endIcon={<KeyboardArrowDown />}
          variant="containedMenu"
          style={{ color: "#fff", textTransform: "none" }}
          onClick={(evt) => onshowCallContactMenu(evt)}
          data-testid="CallContactHistoryDropdown"
          // onMouseEnter={(evt) => onshowCallContactMenu(evt)}
        >
          Call Contact History
        </Button>
        <Button
          sx={{
            padding: "6px 10px",
          }}
          endIcon={<KeyboardArrowDown />}
          variant="containedMenu"
          style={{ color: "#fff", textTransform: "none" }}
          onClick={(evt) => onshowChatContactMenu(evt)}
          data-testid="ChatContactHistoryDropdown"
          // onMouseEnter={(evt) => onshowChatContactMenu(evt)}
        >
          Chat Contact History
        </Button>
        <Button
          sx={{
            padding: "6px 10px",
          }}
          //endIcon={<KeyboardArrowDown />}
          variant="containedMenu"
          style={{ color: "#fff", textTransform: "none" }}
          onClick={(evt) => onshowTasksMenu(evt)}
          data-testid="TasksDropdown"
          // onMouseEnter={(evt) => onshowChatContactMenu(evt)}
        >
          Tasks
        </Button>
        <Menu
          data-testid="customer360-menu"
          open={Boolean(eleE1)}
          anchorEl={eleE1}
          onClose={() => handleCustomer360Close()}
          PaperProps={{
            style: {
              height: "210px",
              width: "calc(100vw - 80px)",
            },
          }}
        >
          {menuList[0].childItem.map((item) => {
            const menuCss = !isMobile
              ? {
                  marginRight: "30px",
                  position: "relative",
                  minHeight: "32px",
                  width: "25%",
                  float: "left",
                }
              : {
                  minHeight: "35px",
                };
            return (
              <MenuItem
                style={{
                  fontSize: "small",
                  ...menuCss,
                }}
                onClick={() => {
                  // navigate("/app/case360/management");
                  handleCustomer360Close(item);
                }}
                data-testid="Customer360MenuItems"
                key={item.id}
              >
                {item.label}
              </MenuItem>
            );
          })}
        </Menu>

        <Menu
          data-testid="cae360-menu"
          open={Boolean(eleE2)}
          anchorEl={eleE2}
          onClose={() => handleCase360Close()}
          PaperProps={{
            style: {
              maxHeight: 40 * 4,
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
              // navigate("/app/case360/management");
              handleCase360Close({ id: "cases" });
            }}
            data-testid="CasesMenuItem"
          >
            Cases
          </MenuItem>
          <MenuItem
            sx={{
              fontSize: "small",
              minHeight: "32px",
            }}
            onClick={() => {
              // navigate("/app/case360/management");
              handleCase360Close({ id: "createcase" });
            }}
          >
            Create Case
          </MenuItem>
        </Menu>
        <Menu
          data-testid="callContact-menu"
          open={Boolean(eleE3)}
          anchorEl={eleE3}
          onClose={() => handleCallContactClose()}
          PaperProps={{
            style: {
              maxHeight: 40 * 4,
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
              // navigate("/app/case360/management");
              handleCallContactClose();
            }}
            data-testid="CallHistoryMenuItem"
          >
            Call History
          </MenuItem>
        </Menu>
        <Menu
          data-testid="chatContact-menu"
          open={Boolean(eleE4)}
          anchorEl={eleE4}
          onClose={() => handleChatContactClose()}
          PaperProps={{
            style: {
              maxHeight: 40 * 4,
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
              // navigate("/app/case360/management");
              handleChatContactClose();
            }}
            data-testid="ChatHistoryMenuItem"
          >
            Chat History
          </MenuItem>
        </Menu>
      </Header>

      {/* maker checker menu enabled on click of account no. */}
      {enbleMakerChecker && pageId === "accountDetails" && (
        <MakerCheckerMenu onSelectMenu={selectedMenu} />
      )}
    </>
  );
};

export default MenuNavigation;
