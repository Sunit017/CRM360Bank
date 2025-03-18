import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import * as moment  from 'moment';

const validationSchema = Yup.object().shape({
  fromDate: Yup.date().nullable(),
  toDate: Yup.date().nullable(),
});
const CasesFilterComponent = () => {
  const caseStatus = ["All", "New", "Approved", "Rejected"];
  const [statusValue, setStatusValue] = useState("New");
  const [filterStatus, setFilterStatus] = useState(0);
  const [menuClickValue, setMenuClickValue] = useState("");

  const onSubmitCase = () => {
    //ToDo Filter data
  };

  const validate = (values, props) => {
    const errors = {};
    if (values.fromDate && values.toDate) {
      errors.fromDate = "";
      errors.toDate = "";
    }
    if (
      (values.fromDate && !values.toDate) ||
      (values.toDate && !values.fromDate)
    ) {
      errors.fromDate = "";
      errors.toDate = "";
      if (values.fromDate && !values.toDate) {
        errors.fromDate = "";
        errors.toDate = "Required";
      }
      if (values.toDate && !values.fromDate) {
        errors.toDate = "";
        errors.fromDate = "Required";
      }
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      fromDate: null,
      toDate: null,
    },
    validate,
    validationSchema: validationSchema,
  });

  const handleMenuClick = event => {
    setMenuClickValue(event.currentTarget.dataset.value);
    formik.resetForm();
  }

  useEffect(() => {
    if(menuClickValue === ""){
     if(formik.values.fromDate === null || formik.values.toDate === null)
      setFilterStatus(0);
     if(formik.values.fromDate !== null && formik.values.toDate !== null)
      setFilterStatus(1);
    }
    if(menuClickValue !== ""){
      if(formik.values.fromDate === null || formik.values.toDate === null)
        setFilterStatus(1);
      if(formik.values.fromDate !== null || formik.values.toDate !== null)
        setFilterStatus(0);
      if(formik.values.fromDate !== null && formik.values.toDate !== null)
        setFilterStatus(1);
    }
  }, [formik.values,menuClickValue]);


  return (
    <>
      <FormControl sx={{ margin: "5px" }}>
        <InputLabel htmlFor="case-status">Case Status</InputLabel>
        <Select
          label="Case status"
          value={statusValue}
          size="small"
          inputProps={{
            name: "case",
          }} 
          style={{ width: "150px" }}
          onChange={(evt) => {
            const {
              target: { value },
            } = evt;
            setStatusValue(value);
          }}
        >
          {caseStatus.map((value, index) => {
            return (
              <MenuItem key={index} value={value} onClick={handleMenuClick}>
                {value}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl sx={{ margin: "5px" }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="From Date"
            data-testid="fromDate-picker"
            maxDate={moment(formik.values.toDate).format("YYYY-MM-DD")}
            value={formik.values.fromDate}
            onChange={(newValue) => {
              formik.setFieldValue("fromDate", newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                name="fromDate"
                error={Boolean(
                  formik.errors.fromDate &&
                    Boolean(<div>{formik.errors.fromDate}</div>)
                )}
                helperText={formik.errors.fromDate}
              />
            )}
          />
        </LocalizationProvider>
      </FormControl>
      <FormControl sx={{ margin: "5px" }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="To Date"
            data-testid="toDate-picker"
            minDate={moment(formik.values.fromDate).format("YYYY-MM-DD")}
            value={formik.values.toDate}
            onChange={(newValue) => {
              formik.setFieldValue("toDate", newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                name="toDate"
                error={Boolean(
                  formik.errors.toDate &&
                    Boolean(<div>{formik.errors.toDate}</div>)
                )}
                helperText={formik.errors.toDate}
              />
            )}
          />
        </LocalizationProvider>
      </FormControl>
      <FormControl sx={{ margin: "5px" }}>
        <Button
          variant="contained"
          onClick={onSubmitCase}
          data-testid="btn-submitcase"
          disabled={filterStatus === 0 ? true : false}
        >
          Submit
        </Button>
      </FormControl>
    </>
  );
};

export default CasesFilterComponent;
