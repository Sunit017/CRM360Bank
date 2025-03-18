import React from "react";
import { IconButton, TextField, Grid } from "@mui/material";
import styled from "styled-components";
import * as Yup from "yup";
import { useFormik } from "formik";
// import { Search as SearchIcon } from "@mui/icons-material";
import { searchClearLogo, searchIconLogo } from "../../iconProfile";
import { emptyCheck } from "../../Util";
import { getAllCustomers } from "../../services/Customer360Service";

const SearchPane = styled.div`
  width: 75vw;
  border: 1px solid #000;
  padding: 10px;
  margin-bottom: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  left: 10%;
  border-radius: 10px;
`;
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const validationSchema = Yup.object().shape({
  firstName: Yup.string("First name is required.")
    .min(3, "Minimum 3 letter required")
    .matches(/^[aA-zZ]+$/, "Only alphabets are allowed for this field"),
  middleName: Yup.string("middle name is required").matches(
    /^[aA-zZ]+$/,
    "Only alphabets are allowed for this field"
  ),
  lastName: Yup.string("Last name is required")
    .min(3, "Minimum 3 letter required")
    .matches(/^[aA-zZ]+$/, "Only alphabets are allowed for this field"),
  customerId: Yup.string()
    .matches(phoneRegExp, "Enter 10 digit customer id")
    .min(10, "Enter 10 digit number")
    .max(10, "Customer id must be at most 10 digits"),
  mobileNumber: Yup.string()
    .matches(phoneRegExp, "Enter 10 digit mobile number")
    .min(10, "Enter 10 digit number")
    .max(10, "MobileNumber must be at most 10 digits"),
  emailAddress: Yup.string("Enter your email").email("Enter a valid email"),
  idmArnNo: Yup.number("Enter your eKYC ARN number"),
});

const Search = ({ setCusData, setCustomerData }) => {
  const validate = (values, props) => {
    const errors = {};

    if (
      ((values.middleName || values.lastName) && !values.firstName) ||
      (values.lastName && values.middleName && !values.firstName) ||
      (values.firstName && !values.middleName && !values.lastName)
    ) {
      errors.lastName = "Required";
      errors.middleName = "Required";
      if (values.middleName) {
        errors.lastName = "";
        errors.middleName = "";
        errors.firstName = "Required";
      }
      if (values.lastName) {
        errors.middleName = "";
        errors.lastName = "";
        errors.firstName = "Required";
      }
    }
    return errors;
  };
  const validateSearchParam = (param) => {
    const {
      firstName,
      middleName,
      lastName,
      customerId,
      mobileNumber,
      emailAddress,
      idmArnNo,
    } = param;
    return (
      emptyCheck(firstName) ||
      emptyCheck(middleName) ||
      emptyCheck(lastName) ||
      emptyCheck(customerId) ||
      emptyCheck(mobileNumber) ||
      emptyCheck(emailAddress) ||
      emptyCheck(idmArnNo)
    );
  };
  const handleSearchClear = () => {
    getAllCustomers(setCustomerData) 
    formik.resetForm();
    // setCusData(null);
  };
  const formik = useFormik({
    initialValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      customerId: "",
      mobileNumber: "",
      emailAddress: "",
      idmArnNo: "",
    },
    validate,
    onSubmit: (values) => {
      setCusData(values);
    },
    validationSchema: validationSchema,
  });

  return (
    <SearchPane>
      <Grid item xs={12}>
        <TextField
          data-test-id="firstName-input"
          name="firstName"
          label="First name"
          size="small"
          className="SearchItem"
          value={formik.values.firstName}
          sx={{ width: "110px", padding: "5px 2px" }}
          onChange={formik.handleChange}
          error={Boolean(
            formik.errors.firstName &&
              Boolean(<div>{formik.errors.firstName}</div>)
          )}
          helperText={formik.errors.firstName}
        />
        <TextField
          data-test-id="middleName-input"
          name="middleName"
          label="Middle name"
          size="small"
          className="SearchItem"
          value={formik.values.middleName}
          sx={{ width: "110px", padding: "5px 2px" }}
          onChange={formik.handleChange}
          error={Boolean(
            formik.errors.middleName && <div>{formik.errors.middleName}</div>
          )}
          helperText={formik.errors.middleName}
        />
        <TextField
          data-test-id="lastName-input"
          name="lastName"
          label="Last name"
          size="small"
          className="SearchItem"
          value={formik.values.lastName}
          sx={{ width: "110px", padding: "5px 2px" }}
          onChange={formik.handleChange}
          error={Boolean(
            formik.errors.lastName && <div>{formik.errors.lastName}</div>
          )}
          helperText={formik.errors.lastName}
        />
        <TextField
          data-test-id="customerId-input"
          name="customerId"
          label="Customer id"
          size="small"
          className="SearchItem"
          value={formik.values.customerId}
          sx={{ width: "110px", padding: "5px 2px" }}
          onChange={formik.handleChange}
          error={
            formik.errors.customerId &&
            Boolean(<div>{formik.errors.customerId}</div>)
          }
          helperText={formik.errors.customerId}
        />
        <TextField
          data-test-id="mobilenumber-input"
          name="mobileNumber"
          label="Mobile number"
          size="small"
          className="SearchItem"
          value={formik.values.mobileNumber}
          sx={{ width: "110px", padding: "5px 2px" }}
          onChange={formik.handleChange}
          error={
            formik.errors.mobileNumber &&
            Boolean(<div>{formik.errors.mobileNumber}</div>)
          }
          helperText={formik.errors.mobileNumber}
        />
        <TextField
          data-test-id="emailaddress-input"
          name="emailAddress"
          label="Email address"
          size="small"
          value={formik.values.emailAddress}
          sx={{ width: "110px", padding: "5px 2px" }}
          className="SearchItem"
          onChange={formik.handleChange}
          error={
            formik.errors.emailAddress &&
            Boolean(<div>{formik.errors.emailAddress}</div>)
          }
          helperText={formik.errors.emailAddress}
        />
        <TextField
          data-test-id="idmArnNo-input"
          name="idmArnNo"
          label="eKYC ARN number"
          size="small"
          className="SearchItem"
          value={formik.values.idmArnNo}
          sx={{ width: "110px", padding: "5px 2px" }}
          onChange={formik.handleChange}
          error={
            formik.errors.idmArnNo &&
            Boolean(<div>{formik.errors.idmArnNo}</div>)
          }
          helperText={formik.errors.idmArnNo}
        />
      </Grid>
      <Grid>
        <IconButton
          data-testid="search-button"
          onClick={() => {
            const { values, errors } = formik;
            const isEmpty = validateSearchParam(values);
            const errLen = Object.keys(errors).length;
            if (!isEmpty || errLen) {
              setCusData(null);
            } else {
              formik.handleSubmit();
            }
          }}
          title="Search"
          sx={{
            float: "right",
            right: "100px",
          }}
        >
          <img src={searchIconLogo} alt={"Search"} width={30} height={30} />
          {/*  <SearchIcon /> */}
        </IconButton>
        <IconButton
          data-testid="clear-button"
          title="Clear"
          onClick={handleSearchClear}
          sx={{
            float: "right",
          }}
        >
          <img src={searchClearLogo} alt={"Clear"} width={30} height={30} />
        </IconButton>
      </Grid>
    </SearchPane>
  );
};

export default Search;
