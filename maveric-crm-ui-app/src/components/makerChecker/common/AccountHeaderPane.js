import { Grid, IconButton } from "@mui/material";
import styled from "styled-components";
import { ArrowBack } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { addOps360PageDetails } from "../../../store/actions";
import { Info } from "./styles";

const AccountHeaderPane = ({
  pageId = null,
  pageTitle,
  isChecker,
  checkerCaseId,
  accountNumber,
  accountHolderName,
  accountState,
}) => {
  const isMdLimit =
    pageId === "approveCloseLockUnlockAccount" && isChecker ? 3 : 4;
  const isNonMd = pageId === "approveCloseLockUnlockAccount";
  const dispatch = useDispatch();
  const goBackCasesList = () => {
    dispatch(addOps360PageDetails({ pageId }));
  };
  return (
    <Grid
      container
      spacing={1}
      alignItems="center"
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      <Grid item xs={12}>
        <Info style={{ fontSize: "14px" }}>
          {isChecker && (
            <IconButton
              style={{
                left: "30px",
                position: "absolute",
                top: "70px",
                height: "25px",
                width: "25px",
              }}
              onClick={() => goBackCasesList()}
              sx={{
                "&:hover": {
                  color: "#fff",
                  backgroundColor: "#1976d2",
                },
              }}
            >
              <ArrowBack fontSize="small" />
            </IconButton>
          )}
          {pageTitle} {isChecker ? " - Checker" : " - Maker"}
        </Info>
      </Grid>
      {isChecker && (
        <Grid item xs={12} sm={12} md={isMdLimit}>
          <Info style={{ background: "#FFC23C" }}>
            Case ID: {checkerCaseId}
          </Info>
        </Grid>
      )}
      <Grid item xs={12} sm={12} md={isChecker ? isMdLimit : isNonMd ? 4 : 6}>
        <Info style={{ background: "#FFC23C" }}>
          Account Number: {accountNumber}
        </Info>
      </Grid>
      <Grid item xs={12} sm={12} md={isChecker ? isMdLimit : isNonMd ? 4 : 6}>
        <Info style={{ background: "#FFC23C" }}>
          Account Holder Name: {accountHolderName}
        </Info>
      </Grid>
      {pageId === "approveCloseLockUnlockAccount" && (
        <Grid item xs={12} sm={12} md={isChecker ? isMdLimit : 4}>
          <Info style={{ background: "#FFC23C" }}>
            Account State: {accountState}
          </Info>
        </Grid>
      )}
    </Grid>
  );
};

export default AccountHeaderPane;
