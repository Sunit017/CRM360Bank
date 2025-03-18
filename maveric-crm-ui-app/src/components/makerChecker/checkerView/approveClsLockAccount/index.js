import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { Button, Grid, MenuItem } from "@mui/material";
import moment from "moment";
import * as yup from "yup";
import {
  operationTypePending,
  operationTypeLocked,
  operationTypeActiveHaveBalance,
  operationTypeActiveNoBalance,
} from "../../common/DropdownDef";
import AccountHeaderPane from "../../common/AccountHeaderPane";
import ToasterNotification from "../../../common/ToasterNotification";
import {
  addOps360PageDetails,
  addAccount360PageDetails,
} from "../../../../store/actions";
import { useNavigate } from "react-router";
import ToasterAlert from "../../../common/ToasterAlert";
import { camelCaseToTitleCase } from "../../../../Util";
import { GridItems, Info, StyledTextField } from "../../common/styles";

const ApproveClsLockAccount = ({
  isAccount360 = false,
  checkerHeight,
  isChecker,
  checkerData = null,
}) => {
  const [custId, setCustId] = useState("");
  const [accId, setAccId] = useState("");
  const [checkerCaseId, setCheckerCaseId] = useState("");
  const [agentIdMaker, setagentIdMaker] = useState("");
  const [createdDate, setcreatedDate] = useState("");
  const [accState, setAccState] = useState("");
  const dispatch = useDispatch();
  const [accAvailableBalance, setAvailableBalance] = useState(null);
  const [accTotalBalance, setTotalBalance] = useState(null);
  const customerSelection = useSelector((state) => state.customerSelection);
  const account360Search = useSelector((state) => state.account360Search);
  const account360ClientDetails = useSelector(
    (state) => state.account360ClientDetails
  );
  const [showAlert, setShowAlert] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (checkerData && isChecker) {
      console.log("CHECKER DATA ===", checkerData);
      const {
        accountNo,
        customerId,
        caseId,
        agentIdMaker,
        createdDate,
        accountState,
      } = checkerData;
      setCustId(customerId);
      setAccId(accountNo);
      setCheckerCaseId(caseId);
      updateFormData(checkerData);
      setagentIdMaker(agentIdMaker);
      setcreatedDate(createdDate);
      setAccState(accountState);
    }
  }, [checkerData, isChecker]);
  const updateFormData = (checkerData) => {
    const { operationType, notes, agentIdMaker, createdDate } = checkerData;
    formik.setFieldValue("operationType", operationType);
    formik.setFieldValue("notes", notes);
    formik.setFieldValue("agentIdMaker", agentIdMaker);
    formik.setFieldValue("caseCreatedDate", createdDate);
  };
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
      console.log(account360ClientDetails);
      const { id } = account360ClientDetails;
      setCustId(id);
    }
  }, [account360ClientDetails]);

  useEffect(() => {
    if (account360Search) {
      const { accountID, accountState, availableBalance, balance } =
        account360Search;
      setAccId(accountID);
      setAccState(accountState);
      setAvailableBalance(availableBalance);
      setTotalBalance(balance);
    }
  }, [account360Search]);

  const [operType, setoperType] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitCount, setIsFormSubmitCount] = useState(false);
  useEffect(() => {
    setFormErrors(formik.errors);
    setIsFormSubmitCount(formik.submitCount);
    formik.values?.rejectReason !== "" && setRejectReasonError(null);

    accState === "PENDING APPROVAL"
      ? setoperType(operationTypePending)
      : accState === "LOCKED"
      ? setoperType(operationTypeLocked)
      : accState === "ACTIVE" &&
        (accAvailableBalance === 0 && accTotalBalance === 0
          ? setoperType(operationTypeActiveNoBalance)
          : setoperType(operationTypeActiveHaveBalance));
  });

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
      dispatch(
        addOps360PageDetails({ pageId: "approveCloseLockUnlockAccount" })
      );
    }, 4000);
    return () => clearTimeout(timer);
  };

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

  const customerAccountName = isChecker
    ? checkerData?.customerAccountName
    : `${(customerSelection?.data || account360ClientDetails)?.firstName} ${
        (customerSelection?.data || account360ClientDetails)?.middleName
      } ${(customerSelection?.data || account360ClientDetails)?.lastName}`;

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
    operationType: yup.string().required("Operation Type is required"),
    notes: yup.string().max(200, "Must be <200 characters"),
  });

  const formik = useFormik({
    initialValues: {
      operationType: "",
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
      navigateToAccountDetails();
    },
  });

  return (
    <>
      <ToasterNotification />
      <ToasterAlert showAlert={showAlert} setShowAlert={setShowAlert} />
      <AccountHeaderPane
        pageId="approveCloseLockUnlockAccount"
        pageTitle="Approve / Close / Lock / Unlock Account"
        isChecker={isChecker}
        checkerCaseId={checkerCaseId}
        accountNumber={accId}
        accountHolderName={customerAccountName}
        accountState={accState}
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
                  Operation Type
                </label>
                <StyledTextField
                  id="operationType"
                  name="operationType"
                  select={!isChecker}
                  disabled={isChecker}
                  value={formik.values.operationType}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.operationType &&
                    Boolean(formik.errors.operationType)
                  }
                  helperText={
                    formik.touched.operationType && formik.errors.operationType
                  }
                >
                  {operType.map((option) => (
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
export default ApproveClsLockAccount;
