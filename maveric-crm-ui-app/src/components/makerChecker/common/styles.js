import styled from "styled-components";
import { TextField } from "@mui/material";

export const GridItems = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1.5fr;
  font-weight: 500;
  font-size: 12px;
  padding: 0 20px 0 40px;
  & label {
    padding-top: 3px;
  }
  & label.required::after {
    content: " *";
    color: red;
  }
`;

export const Info = styled.div`
  padding: 4px;
  padding-left: 10px;
  font-weight: 600;
  border-radius: 4px;
  background: #b1e1ff;
  text-align: center;
  font-size: 12px;
`;

export const StyledTextField = styled(TextField, {
  name: "StyledTextField",
})({
  "& .MuiInputBase-root": {
    height: 24,
    fontSize: "12px",
  },
});
