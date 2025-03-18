import React, { useEffect, useState } from "react";
import { getTransactionApi } from "../../../services/MampuService/mampuAccount360Api";
import AgGrid from "../common/AgGrid";
import { accountDetailsColumn } from "../common/ColumnDef";
import AccountInfo from "./AccountInfo";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

const AccountDetails = ({ CusStyle, accHeight = "140px" }) => {
  const [transData, setTransData] = useState([]);
  const account360Search = useSelector((state) => state.account360Search);
  useEffect(() => {
    if (account360Search) {
      const { accountID } = account360Search;
      getTransactionApi(setTransData, accountID);
    }
  }, [account360Search]);

  return (
    <Box
      style={{
        height: `calc(100vh - ${accHeight})`,
        overflow: "auto",
        padding: "0px 5px",
      }}
      sx={{
        "&::-webkit-scrollbar": {
          width: 4,
          height: 4,
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#ced4da",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#68077b",
          borderRadius: 100,
        },
      }}
    >
      <div style={{ fontWeight: 700, textAlign: "center" }}>
        Account Details
      </div>
      <AccountInfo />
      <br />
      <div style={{ fontWeight: 700, textAlign: "center" }}>
        Transaction Details
      </div>
      <br />
      <AgGrid
        columns={accountDetailsColumn}
        data={transData}
        style={{ height: CusStyle?.height || 200 }}
      />
    </Box>
  );
};
export default AccountDetails;
