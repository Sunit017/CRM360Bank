import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Button } from "@mui/material";
import { useFormik } from "formik";
import AccountHeaderPane from "../../common/AccountHeaderPane";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import AdapterDateFns from "@date-io/date-fns";
import { GridItems, Info, StyledTextField } from "../../common/styles";
import * as yup from "yup";
import toast from "react-hot-toast";
import ToasterNotification from "../../../common/ToasterNotification";
import ToasterAlert from "../../../common/ToasterAlert";
import { camelCaseToTitleCase } from "../../../../Util";
import { useNavigate } from "react-router";
import {
  addOps360PageDetails,
  addAccount360PageDetails,
} from "../../../../store/actions";

const ApplyAccuredInterest = ({
  isAccount360 = false,
  checkerHeight,
  isChecker,
  checkerData = null,
}) => {
  const [custId, setCustId] = useState("");
  const [accId, setAccId] = useState("");
  const [checkerCaseId, setCheckerCaseId] = useState("");
  const customerSelection = useSelector((state) => state.customerSelection);
  const account360Search = useSelector((state) => state.account360Search);
  const account360ClientDetails = useSelector(
    (state) => state.account360ClientDetails
  );
  const [showAlert, setShowAlert] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (customerSelection) {
      const {
        data: { customerId },
      } = customerSelection;
      setCustId(customerId);
    }
  }, [customerSelection]);

  useEffect(() => {
    if (account360ClientDetails) {
      const { id } = account360ClientDetails;
      setCustId(id);
    }
  }, [account360ClientDetails]);

  useEffect(() => {
    if (account360Search) {
      const { accountID } = account360Search;
      setAccId(accountID);
    }
  }, [account360Search]);

  const customerAccountName = isChecker
    ? checkerData?.customerAccountName
    : `${(customerSelection?.data || account360ClientDetails)?.firstName} ${
        (customerSelection?.data || account360ClientDetails)?.middleName
      } ${(customerSelection?.data || account360ClientDetails)?.lastName}`;

  const [formErrors, setFormErrors] = useState({});
  const [formSubmitCount, setIsFormSubmitCount] = useState(false);
  useEffect(() => {
    setFormErrors(formik.errors);
    setIsFormSubmitCount(formik.submitCount);
    formik.values?.rejectReason !== "" && setRejectReasonError(null);
  });

  useEffect(() => {
    if (
      formSubmitCount > 0 &&
      formErrors &&
      Object.keys(formErrors).length > 0
    ) {
      // console.log("form error", formErrors);
      toast.error(
        `Mandatory field(s) is/are left blank. Complete the fields before clicking the submit button (${Object.keys(
          formErrors
        )
          .map((field) => `${camelCaseToTitleCase(field)}`)
          .join(`, `)})`
      );
    }
  }, [formSubmitCount]);

  const onApprove = () => {
    setShowAlert({
      type: "success",
      message: `Your Case ID ${checkerData.caseId} is Sucessfully Approved`,
    });
    navigateToOps360();
    //INTERNAL API CALL TO UPDATE STATUS
    console.log("Case Status: APPROVED, Agent ID - Checker: XYZ123");
    console.log(
      `Case ID ${checkerCaseId} is Approved! Case Informations: `,
      formik.values
    );
  };

  //Maker Navigation
  const navigateToAccountDetails = () => {
    let timer = setTimeout(() => {
      if (isAccount360)
        //Account360 flow
        dispatch(
          addAccount360PageDetails({
            account360: isAccount360,
            pageId: "accountDetails",
          })
        );
      //Customer360 flow
      else
        dispatch(
          addAccount360PageDetails({
            account360: isAccount360,
            pageId: "account360",
          })
        );
    }, 4000);
    return () => clearTimeout(timer);
  };

  //Checker navigation
  const navigateToOps360 = () => {
    let timer = setTimeout(() => {
      navigate("/app/ops360");
      dispatch(addOps360PageDetails({ pageId: "applyAccuredInterest" }));
    }, 4000);
    return () => clearTimeout(timer);
  };

  const [rejectReasonError, setRejectReasonError] = useState(null);
  const onReject = () => {
    if (formik.values.rejectReason === "") {
      toast.error("Reject Reason is required!");
      setRejectReasonError("Reject Reason is required");
    } else if (formik.values.rejectReason.length > 300) {
      toast.error("Reject Reason must be less than 300 characters!");
      setRejectReasonError("Must be <300 characters");
    } else {
      setRejectReasonError(null);
      setShowAlert({
        type: "success",
        message: `Case ID ${checkerCaseId} is rejected!`,
      });
      navigateToOps360();
      //INTERNAL API CALL TO UPDATE STATUS
      console.log("Case Status: REJECTED, Agent ID - Checker: XYZ123");
      console.log(
        `Case ID ${checkerCaseId} is rejected! Case Informations: `,
        formik.values
      );
    }
  };

  const validationSchema = yup.object({
    applicationDate: yup
      .date()
      .nullable()
      .required("Application Date is required"),
    notes: yup.string().max(200, "Must be <200 characters"),
  });

  const formik = useFormik({
    initialValues: {
      applicationDate: null,
      notes: "",
      ...(isChecker && { rejectReason: "" }),
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      setShowAlert({
        type: "success",
        message: `Your request has been successfully sent to Checker. Your Case ID is
            "MD123457" `,
      });
      console.log("Apply Accured Interest - Form Values: ", values);
      navigateToAccountDetails();
    },
  });

  return (
    <>
      <ToasterNotification />
      <ToasterAlert showAlert={showAlert} setShowAlert={setShowAlert} />

      <AccountHeaderPane
        pageTitle="Apply Accured Interest"
        pageId="applyAccuredInterest"
        isChecker={isChecker}
        checkerCaseId={checkerCaseId}
        accountNumber={accId}
        accountHolderName={customerAccountName}
      />
      <div
        style={{
          marginTop: "8px",
          padding: "16px 8px",
          border: "1px solid black",
          height: `calc(100vh - ${checkerHeight})`,
          overflow: "auto",
        }}
      >
        <form>
          <Grid container spacing={2} direction="row">
            <Grid item xs={12} sm={6} md={4}>
              <GridItems>
                <label className={!isChecker ? "required" : undefined}>
                  Interest Application Date
                </label>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    id="applicationDate"
                    name="applicationDate"
                    disabled={isChecker}
                    /* istanbul ignore next */
                    minDate={new Date()}
                    maxDate={new Date()}
                    PopperProps={{
                      placement: "right-end",
                    }}
                    value={formik.values.applicationDate}
                    onChange={(val) => {
                      formik.setFieldValue("applicationDate", val);
                    }}
                    renderInput={(params) => (
                      <StyledTextField
                        {...params}
                        name="applicationDatetext"
                        sx={{
                          "& .MuiInputBase-root": {
                            height: 30,
                            fontSize: "12px",
                          },
                          svg: {
                            display: `${isChecker && "none"}`,
                          },
                        }}
                        error={
                          formik.touched.applicationDate &&
                          Boolean(formik.errors.applicationDate)
                        }
                        helperText={
                          formik.touched.applicationDate &&
                          formik.errors.applicationDate
                        }
                      />
                    )}
                  />
                </LocalizationProvider>
              </GridItems>
            </Grid>
            <Grid item xs={12}>
              <Info>Notes</Info>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <GridItems
                style={{ gridTemplateColumns: "0.163fr 1fr", columnGap: "4px" }}
              >
                <label>Notes/Narrative</label>
                <StyledTextField
                  sx={{
                    "& .MuiInputBase-root": {
                      height: 45,
                      fontSize: "12px",
                    },
                  }}
                  id="notes"
                  name="notes"
                  variant="outlined"
                  multiline
                  rows={2}
                  disabled={isChecker}
                  onChange={formik.handleChange}
                  value={formik.values.notes}
                  error={formik.touched.notes && Boolean(formik.errors.notes)}
                  helperText={formik.touched.notes && formik.errors.notes}
                />
              </GridItems>
            </Grid>

            {isChecker && (
              <>
                <Grid item xs={12}>
                  <Info>Reject Reason</Info>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <GridItems
                    style={{
                      gridTemplateColumns: "0.163fr 1fr",
                      columnGap: "4px",
                    }}
                  >
                    <label>Reason</label>
                    <StyledTextField
                      id="rejectReason"
                      // label="Reject Reason"
                      name="rejectReason"
                      variant="outlined"
                      multiline
                      rows={1}
                      sx={{
                        "& .MuiInputBase-root": {
                          height: 45,
                          fontSize: "12px",
                        },
                      }}
                      onChange={formik.handleChange}
                      value={formik.values.rejectReason}
                      error={Boolean(rejectReasonError)}
                      helperText={rejectReasonError}
                    />
                  </GridItems>
                </Grid>
              </>
            )}
          </Grid>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              marginTop: "16px",
              padding: "16px 8px 1px 8px",
            }}
          >
            {isChecker ? (
              <>
                <Button
                  sx={{ background: "green" }}
                  name="approve"
                  id="approve"
                  variant="contained"
                  onClick={() => {
                    onApprove();
                  }}
                >
                  Approve
                </Button>
                <Button
                  sx={{ background: "red" }}
                  name="reject"
                  id="reject"
                  variant="contained"
                  onClick={() => {
                    onReject();
                  }}
                >
                  Reject
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  type="submit"
                  onClick={formik.handleSubmit}
                >
                  Submit
                </Button>
                <Button
                  variant="outlined"
                  type="reset"
                  onClick={() => {
                    formik.resetForm();
                  }}
                >
                  Reset
                </Button>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default ApplyAccuredInterest;
