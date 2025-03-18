import { Grid, Box } from "@mui/material";
import styled from "styled-components";

const Label = styled.div`
  marginright: 5px;
  display: flex;
  font-weight: 700;
  color: #68077b;
  // border: 1px solid red;
`;

const DetailsViewGrid = ({ viewDetails, resData }) => {
  const listColumn = viewDetails?.children;

  return (
    <>
      <Box
        data-testid="DetailsViewGrid"
        sx={{
          width: "100%",
          // maxWidth: 300,
          position: "relative",
          overflow: "auto",
          maxHeight: "calc(100vh - 200px)",
          borderRadius: "none",
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
        <Grid
          container
          spacing={{ xs: 2, md: 3, lg: 1 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          data-testid="test-2"
        >
          {resData && Object.keys(resData).length>0
            ? Object.keys(resData).map((itmKey, index) => {
                const labelItem = listColumn.filter(
                  (item) => item.id === itmKey
                )[0];
                // const label = labelItem?.label || camelCaseToTitleCase(itmKey);
                const label = labelItem?.label
                return itmKey !== "addressId" && itmKey !== "relationshipId" && label ? (
                  <Grid item xs={2} sm={4} md={4} key={itmKey}>
                    <Box>
                      <Label>{label} :</Label>
                      {resData && resData[itmKey].toString()}
                    </Box>
                  </Grid>
                ) : null;
              })
            : (listColumn || []).map((item, index) => {
                const { id, label } = item;
                return (
                  <Grid item xs={2} sm={4} md={4} key={id}>
                    <Box>
                      <Label>{label} :</Label>
                      {resData && resData[id]}
                    </Box>
                  </Grid>
                );
              })}
        </Grid>
      </Box>
    </>
  );
};
export default DetailsViewGrid;
