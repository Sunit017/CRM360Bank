import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { removeUserSelect } from "../../store/actions";

const Header = styled.div`
  padding: 5px;
  background:#214E8F;
  // border-radius: 10px;
  // width: calc(100vw - 90px);
  // margin-bottom: 10px;
  display: flex;
  flex-direction: row;
`;

const Info = styled.div`
  padding: 4px;
  // padding-left: 10px;
  border-radius: 100px;
  font-weight: 500;
  font-size: small;
`;

const CustomerInfo = () => {
  const [category, setCategory] = useState(null);
  const customerSelection = useSelector((state) => state.customerSelection);
  const dispatch = useDispatch();
  useEffect(() => {
    setCategory(customerSelection?.data);
  }, [customerSelection]);

  //   console.log(category);
  const goBackCustomerSearch = () => {
    dispatch(removeUserSelect());
  };
  return (
    <Header>
      <IconButton
        style={{
          height: "25px",
          width: "25px",
        }}
        onClick={() => goBackCustomerSearch()}
        sx={{
          "&:hover": {
            color: "#fff",
            backgroundColor: "#1976d2",
          },
        }}
      >
        <ArrowBack fontSize="small" />
      </IconButton>
      <Info
        style={{
          // width: "calc(100vw - 85%)",
          background: "#F0F2F4",
          whiteSpace: "nowrap",
        }}
      >
        Customer Id: {category?.customerId}
      </Info>
      <Info
        style={{
          // width: "calc(100vw - 70%)",
          background: "#E8E9ED",
          whiteSpace: "nowrap",
          margin: "0px 10px",
        }}
      >
        Customer Name:
        {` ${category?.firstName || ''} ${category?.middleName|| ''} ${category?.lastName|| ''}`}
        {/* {category?.customerName} */}
      </Info>
    </Header>
  );
};

export default CustomerInfo;
