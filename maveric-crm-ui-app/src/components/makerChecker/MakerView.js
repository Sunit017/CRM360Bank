import React, { useState } from "react";
import { Grid } from "@mui/material";
import CaseAssign from "./caseAssign";
import CheckerView from "./checkerView";
import { useSelector } from "react-redux";

const MakerView = () => {
  const opsDetails = useSelector((state) => state.ops360PageDetails);
  console.info("opsDetails ##", opsDetails);
  return (
    <>
      <Grid
        item
        xs={12}
        sm={8}
        md={9}
        sx={{
          // border: "1px solid #612897",
          // padding: "16px",
          height: "calc(100vh - 80px)",
          // width: "100%",
          // margin: "10px 0px",
        }}
        style={{ fontSize: "small" }}
      >
        {opsDetails?.data ? (
          <CheckerView checkerData={opsDetails} />
        ) : (
          <CaseAssign pageId={opsDetails?.pageId} />
        )}
      </Grid>
    </>
  );
};

export default MakerView;
