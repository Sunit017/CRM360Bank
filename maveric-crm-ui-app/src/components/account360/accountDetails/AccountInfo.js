import React, { useState, useEffect } from "react";
import { AccountInfoList } from "./AccountInfoList";
import { Grid, Box, Button, Link } from "@mui/material";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getBranchNameApi } from "../../../services/MampuService/mambuBranchMapping";
import { useDispatch } from "react-redux";
import {
  addCustomer360PageDetails,
  addUserSelect,
  removeAccout360Page,
} from "../../../store/actions";
import { useNavigate } from "react-router-dom";
import { getCustomersSearchApi } from "../../../services/Customer360Service";

const Label = styled.div`
  marginright: 5px;
  display: flex;
  font-weight: 700;
  color: #68077b;
`;

const AccountInfo = () => {
  const accountDetails = useSelector((state) => state.account360Search);
  const [account360Search, setAccount360Search] = useState(accountDetails);
  const { branch } = accountDetails;
  const productName = "Demo Product";
  const withholdingTaxSourceName = "Demo Source";

  const [customerId, setCustomerId] = useState("");
  const customerInfo = useSelector((state) => state.account360ClientDetails);
  const customerSelection = useSelector((state) => state.customerSelection);

  useEffect(() => {
    if (customerInfo?.id) {
      const { id } = customerInfo;
      setCustomerId(id);
    }
    if (customerSelection?.data) {
      const {
        data: { partyId },
      } = customerSelection;
      setCustomerId(partyId);
    }
  }, [customerInfo, customerSelection]);

  useEffect(() => {
    setAccount360Search(accountDetails);
  }, [accountDetails]);

  const getBranchName = (name) => {
    setAccount360Search({ ...account360Search, branch: name });
  };

  const handleGetDataClick = () => {
    if (account360Search.branch === branch) {
      getBranchNameApi(getBranchName, branch);
    }
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateToCustomerDetails = (customerId) => {
    if (customerInfo?.id) {
      const data = {
        ...{
          firstName: "",
          middleName: "",
          lastName: "",
          customerId,
          mobileNumber: "",
          emailAddress: "",
          idmArnNo: "",
        },
        offset: 0,
        recordsPerPage: 50,
      };

      getCustomersSearchApi((res) => {
        navigate("/app/customer360");
        dispatch(addUserSelect({ customerId, data: res.list[0] }));
        dispatch(removeAccout360Page());
      }, data);
    }
    if (customerSelection?.data) {
      dispatch(
        addCustomer360PageDetails({
          pageId: "customerDetails",
        })
      );
      dispatch(removeAccout360Page());
    }
  };

  return (
    <>
      <button
        style={{
          background: "#4b53bc",
          float: "right",
          borderColor: "#4b53bc",
          color: "rgb(255, 255, 255)",
          cursor: "pointer",
        }}
        onClick={handleGetDataClick}
      >
        Get Data
      </button>
      <Grid
        container
        spacing={{ xs: 2, md: 3, lg: 1 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={2} sm={4} md={4} key="CustId">
          <Box>
            <Label>Customer Id :</Label>
            <Link
              style={{ cursor: "pointer", textDecoration: "none" }}
              onClick={() => navigateToCustomerDetails(customerId)}
              sx={{
                "&:hover": {
                  color: "#fff",
                  backgroundColor: "#0b51ee",
                },
              }}
            >
              {customerId}
            </Link>
          </Box>
        </Grid>
        {(AccountInfoList || []).map((item, index) => {
          const { id, label } = item;
          return (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Box>
                <Label>{label} :</Label>
                {account360Search[id]}
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
export default AccountInfo;
