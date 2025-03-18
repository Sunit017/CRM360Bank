import React, { useState, useEffect } from "react";
import AgGrid from "../common/AgGrid";
import { cardSummaryColumn } from "../common/ColumnDef";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { addAccout360Page } from "../../../../store/actions";
import { getCardSummaryApi } from "../../../../services/MampuService/mampuCustomer360Api";

const CardSummary = () => {
  const CellCardNoRender = (params) => {
    const dispatch = useDispatch();
    const gotoCardView = (value) => {
      dispatch(addAccout360Page({ cardNumber: value, pageId: "cardDetails" }));
    };
    const { value } = params;
    return (
      <Button
        data-testid={`${value}-button`}
        onClick={() => gotoCardView(value)}
      >
        {value}
      </Button>
    );
  };

  const columnsDef = cardSummaryColumn.map((item) => {
    const col = { ...item };
    if (item.field === "cardNumber") {
      col.cellRenderer = CellCardNoRender;
    }
    return col;
  });

  const [cardData, setCardData] = useState([]);
  const customerSelection = useSelector((state) => state.customerSelection);
  useEffect(() => {
    // const {
    //   data: { customerId },
    // } = customerSelection;
    const { customerId } = customerSelection;
    getCardSummaryApi(setCardData, customerId);
  }, [customerSelection]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <AgGrid
        columns={columnsDef}
        data={cardData}
        style={{ height: 150, width: 550 }}
      />
    </div>
  );
};

export default CardSummary;
