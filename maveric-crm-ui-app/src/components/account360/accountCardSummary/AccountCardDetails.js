import React, { useState, useEffect } from "react";
import AgGrid from "../common/AgGrid";
import { accountCardDetailsColumn } from "../common/ColumnDef";
import { useSelector } from "react-redux";
import { getCardSummaryApi } from "../../../services/MampuService/mampuCustomer360Api";

const AccountCardDetails = () => {
  const [cardData, setCardData] = useState([]);
  const account360ClientDetails = useSelector(
    (state) => state.account360ClientDetails
  );
  useEffect(() => {
    if (account360ClientDetails) {
      const { id } = account360ClientDetails;
      getCardSummaryApi(setCardData, id);
    }
  }, [account360ClientDetails]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <AgGrid
        columns={accountCardDetailsColumn}
        data={cardData}
        defaultColDef={{
          flex: 1,
          filter: true,
          sortable: true,
        }}
        style={{ height: 470, width: "calc(100vw)" }}
      />
    </div>
  );
};

export default AccountCardDetails;
