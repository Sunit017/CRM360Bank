import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { Button, Grid, MenuItem, InputAdornment } from "@mui/material";
import moment from "moment";
import * as yup from "yup";
import AccountHeaderPane from "../../common/AccountHeaderPane";
import toast from "react-hot-toast";
import ToasterNotification from "../../../common/ToasterNotification";
import {
  addOps360PageDetails,
  addAccount360PageDetails,
} from "../../../../store/actions";
import { useNavigate } from "react-router";
import ToasterAlert from "../../../common/ToasterAlert";
import { camelCaseToTitleCase } from "../../../../Util";
import {
  productNames,
  savingsAccountFeeTypes,
  termDepositMaturityPayoutFeeTypes,
  termDepositMonthlyFeeTypes,
} from "../../common/DropdownDef";
import { GridItems, Info, StyledTextField } from "../../common/styles";

const ApplyAccountFees = ({
  isAccount360 = false,
  checkerHeight,
  isChecker,
  checkerData = null,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [custId, setCustId] = useState("");
  const [accId, setAccId] = useState("");
  const [checkerCaseId, setCheckerCaseId] = useState("");
  const [showAlert, setShowAlert] = useState({});
  const customerSelection = useSelector((state) => state.customerSelection);
  const account360Search = useSelector((state) => state.account360Search);
  const account360ClientDetails = useSelector(
    (state) => state.account360ClientDetails
  );

  const customerAccountName = isChecker
    ? checkerData?.customerAccountName
    : `${(customerSelection?.data || account360ClientDetails)?.firstName} ${
        (customerSelection?.data || account360ClientDetails)?.middleName
      } ${(customerSelection?.data || account360ClientDetails)?.lastName}`;

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

  const [formErrors, setFormErrors] = useState({});
  const [formSubmitCount, setIsFormSubmitCount] = useState(false);
  const [feeTypes, setFeeTypes] = useState([]);

  useEffect(() => {
    setFormErrors(formik.errors);
    setIsFormSubmitCount(formik.submitCount);
    formik.values?.rejectReason !== "" && setRejectReasonError(null);

    //Select Fee Type based on Product Name
    if (formik.values.productName !== "") {
      if (formik.values.productName === "UNO_SBA") {
        setFeeTypes(savingsAccountFeeTypes);
      } else if (formik.values.productName === "UNObank_TD_MP") {
        setFeeTypes(termDepositMaturityPayoutFeeTypes);
      } else if (formik.values.productName === "UNObank_TD_MP1") {
        setFeeTypes(termDepositMonthlyFeeTypes);
      }
    }
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

  useEffect(() => {
    if (checkerData && isChecker) {
      const { accountNo, customerId, caseId } = checkerData;
      setCustId(customerId);
      setAccId(accountNo);
      setCheckerCaseId(caseId);
      updateFormData(checkerData);
    }
  }, [checkerData, isChecker]);

  const updateFormData = (checkerData) => {
    const {
      productName,
      feeType,
      feeAmount,
      notes,
      agentIdMaker,
      createdDate,
    } = checkerData;
    formik.setFieldValue("productName", productName);
    formik.setFieldValue("feeType", feeType);
    formik.setFieldValue("feeAmount", feeAmount);
    formik.setFieldValue("notes", notes);
    formik.setFieldValue("agentIdMaker", agentIdMaker);
    formik.setFieldValue("caseCreatedDate", createdDate);
  };

  //Maker Navigation
  const navigateToAccountDetails = () => {
    let timer = setTimeout(() => {
      if (isAccount360)
        dispatch(
          addAccount360PageDetails({
            account360: isAccount360,
            pageId: "accountDetails",
          })
        );
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
      dispatch(addOps360PageDetails({ pageId: "applyAccountFees" }));
    }, 4000);
    return () => clearTimeout(timer);
  };

  const onApprove = () => {
    //Balance check API to be implemented
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

  let decimalValidation = /^\d+(?:\.\d{0,2})?$/;
  const validationSchema = yup.object({
    productName: yup.string().required("Product Name is required"),
    feeType: yup.string().required("Fee Type is required"),
    feeAmount: yup
      .number()
      .typeError("Fee Amount must be number")
      .positive("Fee Amount must be positive number")
      .required("Fee Amount is required")
      .test(
        "maxDigitsAfterDecimal",
        "Fee Amount must have 2 digits after decimal or less",
        (feeAmount) => decimalValidation.test(feeAmount)
      ),
    notes: yup.string().max(200, "Must be <200 characters"),
  });

  const formik = useFormik({
    initialValues: {
      productName: "",
      feeType: "",
      feeAmount: "",
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
      console.log("Apply Account Fees - Form Values: ", values);
      navigateToAccountDetails();
    },
  });

  return (
    <>
      <ToasterNotification />
      <ToasterAlert showAlert={showAlert} setShowAlert={setShowAlert} />
      <AccountHeaderPane
        pageTitle="Apply Account Fees"
        pageId="applyAccountFees"
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
                  Product Name
                </label>
                <StyledTextField
                  id="productName"
                  name="productName"
                  select={!isChecker}
                  disabled={isChecker}
                  value={formik.values.productName}
                  onBlur={formik.handleBlur}
                  onChange={(evt) => {
                    const {
                      target: { value },
                    } = evt;
                    formik.resetForm();
                    formik.setFieldValue("productName", value);
                  }}
                  error={
                    formik.touched.productName &&
                    Boolean(formik.errors.productName)
                  }
                  helperText={
                    formik.touched.productName && formik.errors.productName
                  }
                >
                  {productNames.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      sx={{ fontSize: "12px" }}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </StyledTextField>
              </GridItems>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <GridItems>
                <label className={!isChecker ? "required" : undefined}>
                  Fee Type
                </label>
                <StyledTextField
                  id="feeType"
                  name="feeType"
                  select={!isChecker}
                  disabled={isChecker}
                  value={formik.values.feeType}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.feeType && Boolean(formik.errors.feeType)
                  }
                  helperText={formik.touched.feeType && formik.errors.feeType}
                >
                  {feeTypes &&
                    feeTypes.map((option) => (
                      <MenuItem
                        key={option.value}
                        value={option.value}
                        sx={{ fontSize: "12px" }}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                </StyledTextField>
              </GridItems>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <GridItems>
                <label className={!isChecker ? "required" : undefined}>
                  Fee Amount
                </label>
                <StyledTextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₱</InputAdornment>
                    ),
                  }}
                  data-test-id="feeAmount-input"
                  id="feeAmount"
                  name="feeAmount"
                  variant="outlined"
                  disabled={isChecker}
                  value={formik.values.feeAmount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.feeAmount && Boolean(formik.errors.feeAmount)
                  }
                  helperText={
                    formik.touched.feeAmount && formik.errors.feeAmount
                  }
                />
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
                  onBlur={formik.handleBlur}
                  value={formik.values.notes}
                  error={formik.touched.notes && Boolean(formik.errors.notes)}
                  helperText={formik.touched.notes && formik.errors.notes}
                />
              </GridItems>
            </Grid>

            {isChecker && (
              <>
                <Grid item xs={12}>
                  <Info>Maker Details</Info>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <GridItems>
                    <label>Agent ID - Maker</label>
                    <StyledTextField
                      id="agentIdMaker"
                      name="agentIdMaker"
                      variant="outlined"
                      disabled
                      value={formik.values.agentIdMaker}
                    />
                  </GridItems>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <GridItems>
                    <label>Created Date</label>
                    <StyledTextField
                      id="caseCreatedDate"
                      name="caseCreatedDate"
                      variant="outlined"
                      disabled
                      value={moment(formik.values.caseCreatedDate).format(
                        "MM/DD/YYYY"
                      )}
                    />
                  </GridItems>
                </Grid>
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
                    setFeeTypes([]);
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

export default ApplyAccountFees;
