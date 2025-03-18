import React, { useEffect, useState } from "react";
import AgGrid from "../common/AgGrid";
import { cardDetailsColumn } from "../common/ColumnDef";
import { useSelector } from "react-redux";
import { getCardDetailsApi } from "../../../services/MampuService/mampuCardDetails";

const CardDetails = ({ CusStyle }) => {
  const accountSelection = useSelector((state) => state.accountSelection);
  const [cardData, setCardData] = useState([]);
  useEffect(() => {
    if (accountSelection) {
      const { cardNumber } = accountSelection;
      getCardDetailsApi(updateCardDetailsParam, cardNumber);
    }
  }, [accountSelection]);
  const updateCardDetailsParam = (res) => {
    const { cardNumber } = accountSelection;
    const {
      cardDemog: {
        keyValues,
        statusCode,
        statusReason,
        embossedName,
        productDesc,
        secondEmbossedName,
        expiryDt,
        plasticCode,
      },
    } = res;
    const cardActivationFlag = keyValues.filter(
      (item) => item.key === "CardActivationFlag"
    )[0]?.data;
    const stopListFlag = keyValues.filter(
      (item) => item.key === "StopListFlag"
    )[0]?.data;
    const cardInfo = {
      cardNumber,
      cardActivationFlag,
      stopListFlag,
      statusCode,
      embossedName,
      statusReason,
      secondEmbossedName,
      expiryDate: expiryDt,
      plasticCode,
      productDescription: productDesc,
    };
    setCardData([cardInfo]);
  };
  return (
    <>
      <AgGrid
        columns={cardDetailsColumn}
        data={cardData}
        style={{ height: CusStyle?.height || 430 }}
      />
    </>
  );
};
export default CardDetails;
