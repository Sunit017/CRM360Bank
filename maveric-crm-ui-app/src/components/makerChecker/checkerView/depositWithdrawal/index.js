import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as yup from "yup";
import {
  Button,
  Grid,
  TextField,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import AdapterDateFns from "@date-io/date-fns";
import { getCurrentDateTimeISO, camelCaseToTitleCase } from "../../../../Util";
import {
  onHandleBalanceCheckApi,
  transactionCheckApi,
  onMakeWithdrawalTransaction,
  onMakeDepositTransaction,
} from "../../../../services/MakerCheckerService";
import { useNavigate } from "react-router";
import moment from "moment";
import {
  transactionTypes,
  transCodeForDeposit,
  transCodeForWithdrawal,
  channels,
} from "../../common/DropdownDef";
import AccountHeaderPane from "../../common/AccountHeaderPane";
import ToasterNotification from "../../../common/ToasterNotification";
import ToasterAlert from "../../../common/ToasterAlert";
import {
  addOps360PageDetails,
  removeOps360PageDetails,
  addAccount360PageDetails,
} from "../../../../store/actions";
import { GridItems, Info, StyledTextField } from "../../common/styles";

const MakeDepositWithdrawal = ({
  isAccount360 = false,
  checkerHeight,
  isChecker,
  checkerData = null,
}) => {
  const customerSelection = useSelector((state) => state.customerSelection);
  const account360Search = useSelector((state) => state.account360Search);
  const account360ClientDetails = useSelector(
    (state) => state.account360ClientDetails
  );

  // console.info("checkerData ##", checkerData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [custId, setCustId] = useState("");
  const [accId, setAccId] = useState("");
  const [checkerCaseId, setCheckerCaseId] = useState("");
  const [isFieldEnable, setIsFieldEnable] = useState(true);

  const [showAlert, setShowAlert] = useState({});

  useEffect(() => {
    if (checkerData && isChecker) {
      const { accountNo, customerId, caseId } = checkerData;
      setCustId(customerId);
      setAccId(accountNo);
      setCheckerCaseId(caseId);
      caseIDCheckerData(checkerData);
    }
    // dispatch(removeOps360PageDetails());
  }, [checkerData, isChecker]);

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
  const [transCode, setTransCode] = useState([]);

  useEffect(() => {
    setFormErrors(formik.errors);
    setIsFormSubmitCount(formik.submitCount);
    formik.values?.rejectReason !== "" && setRejectReasonError(null);

    //Select trans code based on trans type
    if (formik.values.transactionType !== "") {
      if (formik.values.transactionType === "makeDeposit") {
        setTransCode(transCodeForDeposit);
      } else if (formik.values.transactionType === "makeWithdrawal") {
        setTransCode(transCodeForWithdrawal);
      }
    }
  });

  //Required field message on submit
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

  const [transValid, setTransValid] = useState(null);
  const onHandleTransRes = (res) => {
    console.log("HANDLE TRANS ===", res);
    if (res.status === 200) {
      const data = res.data[0];
      const { allowed } = data;
      setTransValid(allowed);
    } else {
      toast.error(`Transaction validation failed due to: ${res.data.message}`);
      navigateToAccountDetails();
    }
  };

  const onTransactionTypeChange = (transactionCode) => {
    const request = {
      customerId: custId,
      accountId: accId,
      transactionCodes: [transactionCode],
    };
    setTransValid(false);
    transactionCheckApi(onHandleTransRes, request);
  };
  const [balCheck, setBalCheck] = useState(null);
  const accountBalanceCheck = (resp) => {
    const {
      balances: { availableBalance },
    } = resp[0];
    const { amount } = formik.values;
    setBalCheck(availableBalance > amount);
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

  //Checker Navigation
  const navigateToOps360 = () => {
    let timer = setTimeout(() => {
      navigate("/app/ops360");
      dispatch(addOps360PageDetails({ pageId: "makeDepositWithdrawal" }));
    }, 4000);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    if (balCheck) {
      setShowAlert({
        type: "success",
        message: `Your request has been successfully sent to Checker. Your Case ID is
        "MD123457" `,
      });
      setIsFieldEnable(false);
      navigateToAccountDetails();
    } else if (balCheck === false) {
      toast.error("This Account has insufficient balance!");
      setIsFieldEnable(false);
      navigateToAccountDetails();
    }
  }, [balCheck]);

  const [approveRes, setApproveRes] = useState("");
  useEffect(() => {
    if (approveRes?.status === 201) {
      console.log(
        `${checkerData.transactionType} TRANSACTION ---`,
        approveRes.data
      );
      setShowAlert({
        type: "success",
        message: `Your Case ID ${checkerData.caseId} is Sucessfully Approved`,
      });
      navigateToOps360();
      //INTERNAL API CALL TO UPDATE STATUS
      console.log("Case Status: APPROVED, Agent ID - Checker: XYZ123");
    }
    setApproveRes("");
  }, [approveRes]);

  const onAvailableBalanceCheck = () => {
    setBalCheck(null);
    onHandleBalanceCheckApi(accountBalanceCheck, accId);
  };

  const onApprove = () => {
    //Transaction Validator API
    const request = {
      customerId: checkerData.customerId,
      accountId: checkerData.accountNo,
      transactionCodes: [checkerData.transactionCode],
    };
    transactionCheckApi((res) => {
      if (res.status === 200) {
        const data = res.data[0];
        const { allowed, reasons } = data;

        if (allowed) {
          if (checkerData.transactionTypeId === "makeDeposit") {
            //Deposit Transaction Mambu API
            onMakeDepositTransaction(setApproveRes, checkerData);
          } else if (checkerData.transactionTypeId === "makeWithdrawal") {
            // Available Balance API
            onHandleBalanceCheckApi((res) => {
              const {
                balances: { availableBalance },
              } = res[0];

              if (availableBalance > checkerData.amount) {
                //Withdrawal Transaction Mambu API
                onMakeWithdrawalTransaction(setApproveRes, checkerData);
              } else {
                toast.error("This Account has insufficient balance!");
                navigateToOps360();
                //INTERNAL API CALL TO UPDATE STATUS
                console.log(
                  "Case Status: REJECTED, Agent ID - Checker: SYSTEM"
                );
              }
            }, checkerData.accountNo);
          }
        } else {
          toast.error(`Transaction validation failed due to: ${reasons}`);
          navigateToOps360();
          //INTERNAL API CALL TO UPDATE STATUS
          console.log("Case Status: REJECTED, Agent ID - Checker: SYSTEM");
        }
      } else {
        toast.error(
          `Transaction validation failed due to: ${res.data.message}`
        );
        navigateToOps360();
      }
    }, request);
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

  useEffect(() => {
    setIsFieldEnable(transValid);
  }, [transValid]);

  useEffect(() => {
    console.info("isFieldEnable", isFieldEnable);
  }, [isFieldEnable]);

  const caseIDCheckerData = (checkerData) => {
    const {
      transactionType,
      amount,
      valueDate,
      bookingDate,
      channel,
      partnerChannelName,
      transactionCode,
      identifier,
      bank,
      receipt,
      check,
      account,
      accountName,
      routing,
      payoutTransactionId,
      payoutTransactionStatus,
      payoutDoneOn,
      notes,
      agentIdMaker,
      createdDate,
    } = checkerData;
    formik.setFieldValue("transactionType", transactionType);
    formik.setFieldValue("amount", amount);
    formik.setFieldValue("valueDate", valueDate);
    formik.setFieldValue(
      "bookingDate",
      moment(bookingDate).format("MM/DD/YYYY")
    );
    formik.setFieldValue("channel", channel);
    formik.setFieldValue("partnerChannelName", partnerChannelName);
    formik.setFieldValue("transactionCode", transactionCode);
    formik.setFieldValue("identifier", identifier);
    formik.setFieldValue("bank", bank);
    formik.setFieldValue("receipt", receipt);
    formik.setFieldValue("check", check);
    formik.setFieldValue("account", account);
    formik.setFieldValue("accountName", accountName);
    formik.setFieldValue("routing", routing);
    formik.setFieldValue("payoutTransactionId", payoutTransactionId);
    formik.setFieldValue("payoutTransactionStatus", payoutTransactionStatus);
    formik.setFieldValue("payoutDoneOn", payoutDoneOn);
    formik.setFieldValue("notes", notes);
    formik.setFieldValue("agentIdMaker", agentIdMaker);
    formik.setFieldValue("caseCreatedDate", createdDate);
  };

  let decimalValidation = /^\d+(?:\.\d{0,2})?$/;
  const validationSchema = yup.object({
    transactionType: yup.string().required("Transaction Type is required"),
    amount: yup
      .number()
      .typeError("Amount must be number")
      .positive("Amount must be positive number")
      .required("Amount is required")
      .test(
        "maxDigitsAfterDecimal",
        "Amount must have 2 digits after decimal or less",
        (amount) => decimalValidation.test(amount)
      ),
    channel: yup.string().required("Channel is required"),
    partnerChannelName: yup.string().max(100, "Must be <100 characters"),
    transactionCode: yup.string().required("Transaction code is required"),
    identifier: yup.string().max(50, "Must be <50 characters"),
    bank: yup.string().max(200, "Must be <200 characters"),
    receipt: yup.string().max(200, "Must be <200 characters"),
    check: yup.string().max(200, "Must be <200 characters"),
    account: yup.string().max(200, "Must be <200 characters"),
    accountName: yup.string().max(200, "Must be <200 characters"),
    routing: yup.string().max(200, "Must be <200 characters"),
    payoutTransactionId: yup.string().max(100, "Must be <100 characters"),
    payoutTransactionStatus: yup.string().max(100, "Must be <100 characters"),
    payoutDoneOn: yup.string().max(100, "Must be <100 characters"),
    notes: yup.string().max(200, "Must be <200 characters"),
  });

  const formik = useFormik({
    initialValues: {
      transactionType: "",
      amount: "",
      valueDate: null,
      bookingDate: getCurrentDateTimeISO(),
      channel: "",
      partnerChannelName: "",
      transactionCode: "",
      identifier: "",
      bank: "",
      receipt: "",
      check: "",
      account: "",
      accountName: "",
      routing: "",
      payoutTransactionId: "",
      payoutTransactionStatus: "",
      payoutDoneOn: "",
      notes: "",
      ...(isChecker && { rejectReason: "" }),
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      if (values.transactionType === "makeDeposit") {
        setBalCheck(true);
      } else if (values.transactionType === "makeWithdrawal") {
        onAvailableBalanceCheck();
      }
      console.log(
        "Make Deposite Withdrawal form data - ",
        JSON.stringify(values, null, 2)
      );
    },
  });

  const customerAccountName = isChecker
    ? checkerData?.customerAccountName
    : `${(customerSelection?.data || account360ClientDetails)?.firstName} ${
        (customerSelection?.data || account360ClientDetails)?.middleName
      } ${(customerSelection?.data || account360ClientDetails)?.lastName}`;

  return (
    <>
      <ToasterNotification />
      <ToasterAlert showAlert={showAlert} setShowAlert={setShowAlert} />
      <AccountHeaderPane
        pageTitle="Make Deposit Withdrawal"
        pageId="makeDepositWithdrawal"
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
                  Transaction Type
                </label>
                <StyledTextField
                  id="transactionType"
                  name="transactionType"
                  select={isChecker ? false : true}
                  disabled={isChecker}
                  value={formik.values.transactionType}
                  onBlur={formik.handleBlur}
                  onChange={(evt) => {
                    const {
                      target: { value },
                    } = evt;
                    formik.resetForm();
                    formik.setFieldValue("transactionType", value);
                  }}
                  error={
                    formik.touched.transactionType &&
                    Boolean(formik.errors.transactionType)
                  }
                  helperText={
                    formik.touched.transactionType &&
                    formik.errors.transactionType
                  }
                >
                  {transactionTypes.map((option) => (
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
                  Amount
                </label>
                <StyledTextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₱</InputAdornment>
                    ),
                  }}
                  data-test-id="amount-input"
                  id="amount"
                  name="amount"
                  variant="outlined"
                  disabled={isChecker}
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.amount && Boolean(formik.errors.amount)}
                  helperText={formik.touched.amount && formik.errors.amount}
                />
              </GridItems>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <GridItems>
                <label>Value Date</label>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    id="valueDate"
                    name="valueDate"
                    disabled={isChecker}
                    PopperProps={{
                      placement: "left-start",
                    }}
                    /* istanbul ignore next */
                    value={formik.values.valueDate}
                    onChange={(val) => {
                      formik.setFieldValue("valueDate", val);
                    }}
                    renderInput={(params) => (
                      <StyledTextField
                        {...params}
                        name="valueDatetext"
                        sx={{
                          "& .MuiInputBase-root": {
                            height: 24,
                            fontSize: "12px",
                          },
                          svg: {
                            display: `${isChecker && "none"}`,
                          },
                        }}
                        error={
                          formik.touched.valueDate &&
                          Boolean(formik.errors.valueDate)
                        }
                        helperText={
                          formik.touched.valueDate && formik.errors.valueDate
                        }
                      />
                    )}
                  />
                </LocalizationProvider>
              </GridItems>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <GridItems>
                <label>Booking Date</label>
                <StyledTextField
                  id="bookingDate"
                  name="bookingDate"
                  disabled
                  variant="outlined"
                  onChange={formik.handleChange}
                  /* istanbul ignore next */
                  value={moment(formik.values.bookingDate).format("MM/DD/YYYY")}
                  error={
                    formik.touched.bookingDate &&
                    Boolean(formik.errors.bookingDate)
                  }
                  helperText={
                    formik.touched.bookingDate && formik.errors.bookingDate
                  }
                ></StyledTextField>
              </GridItems>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <GridItems>
                <label className={!isChecker ? "required" : undefined}>
                  Channel
                </label>
                <StyledTextField
                  id="channel"
                  name="channel"
                  select={isChecker ? false : true}
                  disabled={isChecker}
                  value={formik.values.channel}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.channel && Boolean(formik.errors.channel)
                  }
                  helperText={formik.touched.channel && formik.errors.channel}
                >
                  {channels.map((option) => (
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
            <Grid item xs={12}>
              <Info>Transaction Declaration</Info>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <GridItems>
                <label>Partner Channel Name</label>
                <StyledTextField
                  id="partnerChannelName"
                  name="partnerChannelName"
                  variant="outlined"
                  disabled={isChecker}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.partnerChannelName}
                  error={
                    formik.touched.partnerChannelName &&
                    Boolean(formik.errors.partnerChannelName)
                  }
                  helperText={
                    formik.touched.partnerChannelName &&
                    formik.errors.partnerChannelName
                  }
                />
              </GridItems>
            </Grid>
            <Grid item xs={12} sm={6} md={8}>
              <GridItems
                style={{ gridTemplateColumns: "0.28fr 1fr", columnGap: "4px" }}
              >
                <label className={!isChecker ? "required" : undefined}>
                  Transaction Code
                </label>
                <StyledTextField
                  id="transactionCode"
                  name="transactionCode"
                  variant="outlined"
                  select={isChecker ? false : true}
                  disabled={isChecker}
                  onBlur={formik.handleBlur}
                  onChange={(evt) => {
                    const {
                      target: { value },
                    } = evt;
                    formik.setFieldValue("transactionCode", value);
                    onTransactionTypeChange(value);
                  }}
                  value={formik.values.transactionCode}
                  error={
                    formik.touched.transactionCode &&
                    Boolean(formik.errors.transactionCode)
                  }
                  helperText={
                    formik.touched.transactionCode &&
                    formik.errors.transactionCode
                  }
                >
                  {transCode &&
                    transCode.map((option) => (
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
            <Grid item xs={12}>
              <Info>Transaction Details</Info>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <GridItems>
                <label>Identifier</label>
                <StyledTextField
                  id="identifier"
                  name="identifier"
                  variant="outlined"
                  disabled={isChecker}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.identifier}
                  error={
                    formik.touched.identifier &&
                    Boolean(formik.errors.identifier)
                  }
                  helperText={
                    formik.touched.identifier && formik.errors.identifier
                  }
                />
              </GridItems>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <GridItems>
                <label>Bank</label>
                <StyledTextField
                  id="bank"
                  name="bank"
                  variant="outlined"
                  disabled={isChecker}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.bank}
                  error={formik.touched.bank && Boolean(formik.errors.bank)}
                  helperText={formik.touched.bank && formik.errors.bank}
                />
              </GridItems>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <GridItems>
                <label>Receipt</label>
                <StyledTextField
                  id="receipt"
                  name="receipt"
                  variant="outlined"
                  disabled={isChecker}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.receipt}
                  error={
                    formik.touched.receipt && Boolean(formik.errors.receipt)
                  }
                  helperText={formik.touched.receipt && formik.errors.receipt}
                />
              </GridItems>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <GridItems>
                <label>Check</label>
                <StyledTextField
                  id="check"
                  name="check"
                  variant="outlined"
                  disabled={isChecker}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.check}
                  error={formik.touched.check && Boolean(formik.errors.check)}
                  helperText={formik.touched.check && formik.errors.check}
                />
              </GridItems>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <GridItems>
                <label>Account</label>
                <StyledTextField
                  id="account"
                  name="account"
                  variant="outlined"
                  disabled={isChecker}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.account}
                  error={
                    formik.touched.account && Boolean(formik.errors.account)
                  }
                  helperText={formik.touched.account && formik.errors.account}
                />
              </GridItems>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <GridItems>
                <label>Account Name</label>
                <StyledTextField
                  id="accountName"
                  name="accountName"
                  variant="outlined"
                  disabled={isChecker}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.accountName}
                  error={
                    formik.touched.accountName &&
                    Boolean(formik.errors.accountName)
                  }
                  helperText={
                    formik.touched.accountName && formik.errors.accountName
                  }
                />
              </GridItems>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <GridItems>
                <label>Routing</label>
                <StyledTextField
                  id="routing"
                  name="routing"
                  variant="outlined"
                  disabled={isChecker}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.routing}
                  error={
                    formik.touched.routing && Boolean(formik.errors.routing)
                  }
                  helperText={formik.touched.routing && formik.errors.routing}
                />
              </GridItems>
            </Grid>
            <Grid item xs={12}>
              <Info>Transaction Payout Information</Info>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <GridItems>
                <label>Payout Transaction ID</label>
                <StyledTextField
                  id="payoutTransactionId"
                  name="payoutTransactionId"
                  variant="outlined"
                  disabled={isChecker}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.payoutTransactionId}
                  error={
                    formik.touched.payoutTransactionId &&
                    Boolean(formik.errors.payoutTransactionId)
                  }
                  helperText={
                    formik.touched.payoutTransactionId &&
                    formik.errors.payoutTransactionId
                  }
                />
              </GridItems>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <GridItems>
                <label>Payout Transaction Status</label>
                <StyledTextField
                  id="payoutTransactionStatus"
                  name="payoutTransactionStatus"
                  variant="outlined"
                  disabled={isChecker}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.payoutTransactionStatus}
                  error={
                    formik.touched.payoutTransactionStatus &&
                    Boolean(formik.errors.payoutTransactionStatus)
                  }
                  helperText={
                    formik.touched.payoutTransactionStatus &&
                    formik.errors.payoutTransactionStatus
                  }
                />
              </GridItems>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <GridItems>
                <label>Payout Done On</label>
                <StyledTextField
                  id="payoutDoneOn"
                  name="payoutDoneOn"
                  variant="outlined"
                  disabled={isChecker}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.payoutDoneOn}
                  error={
                    formik.touched.payoutDoneOn &&
                    Boolean(formik.errors.payoutDoneOn)
                  }
                  helperText={
                    formik.touched.payoutDoneOn && formik.errors.payoutDoneOn
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
                      sx={{
                        "& .MuiInputBase-root": {
                          height: 24,
                          fontSize: "12px",
                        },
                      }}
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
                      sx={{
                        "& .MuiInputBase-root": {
                          height: 24,
                          fontSize: "12px",
                        },
                      }}
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
              borderTop: "1px solid black",
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
                {isFieldEnable === null || isFieldEnable === true ? (
                  <Button
                    variant="contained"
                    type="submit"
                    onClick={formik.handleSubmit}
                  >
                    Submit
                  </Button>
                ) : (
                  <Button disabled>Submit</Button>
                )}
                <Button
                  variant="outlined"
                  type="reset"
                  onClick={() => {
                    formik.resetForm();
                    setTransCode([]);
                    setIsFieldEnable(true);
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

export default MakeDepositWithdrawal;
