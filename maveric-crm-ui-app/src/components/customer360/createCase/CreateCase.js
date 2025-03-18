import React, { useState, useEffect } from "react";
import { Button, Grid, TextField } from "@mui/material";
import styled from "styled-components";
import MenuItem from "@mui/material/MenuItem";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import AdapterDateFns from "@date-io/date-fns";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import ToasterNotification from "../../common/ToasterNotification";
import ToasterAlert from "../../common/ToasterAlert";
import * as yup from "yup";
import { getCurrentDateTimeISO } from "../../../Util";
import DialogPopupAlert from "../../common/DialogPopupAlert";

const GridItems = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  align-items: center;
  font-weight: 500;
  font-size: 12px;
  padding: 10px 20px 10px 40px;
  & label.required::after {
    content: " *";
    color: red;
  }
`;
const Info = styled.div`
  padding: 4px;
  padding-left: 10px;
  font-weight: 600;
  border-radius: 4px;
  background: #b1e1ff;
  text-align: center;
  font-size: 12px;
`;

const StyledTextField = styled(TextField, {
  name: "StyledTextField",
})({
  "& .MuiInputBase-root": {
    height: 30,
    fontSize: "12px",
    width: "15vw",
    minWidth: "150px",
  },
});

const StyledMultilineTextField = styled(TextField, {
  name: "StyledMultilineTextField",
})({
  "& .MuiInputBase-root": {
    fontSize: "12px",
    width: "100%",
    minWidth: "300px",
    padding: "5px 10px",
  },
});

const StyledMenuItem = styled(MenuItem, { name: "StyledMenuItem" })({
  "&.MuiMenuItem-root": { fontSize: "12px" },
});

const CreateCase = ({ isTaskEnabled, setIsTaskEnabled }) => {
  const [requestTypeChoices, setRequestTypeChoices] = useState([]);
  const [categoryChoices, setCategoryChoices] = useState([]);
  const [subCategoryChoices, setSubCategoryChoices] = useState([]);
  const [subSubCategoryChoices, setSubSubCategoryChoices] = useState([]);
  const [queueChoices, setQueueChoices] = useState([]);

  useEffect(() => {
    const dummyData_requestType = ["Service Request", "Complaint", "Dispute"];
    setRequestTypeChoices(dummyData_requestType);
  }, []);

  const validationSchema = yup.object({
    requestType: yup.string().required("Type is required"),
    category: yup.string().required("Category is required"),
    agentComment: yup.string().max(500, "Must be less than 500 characters"),
    description: yup
      .string()
      .required("Description is required")
      .max(500, "Must be less than 500 characters")
      .min(20, "Must be at least 20 characters"),
  });

  //for mandatory fields  toaster message on submit
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitCount, setIsFormSubmitCount] = useState(false);
  const [showAlert, setShowAlert] = useState({});

  useEffect(() => {
    setFormErrors(formik.errors);
    setIsFormSubmitCount(formik.submitCount);
  });

  useEffect(() => {
    if (
      formSubmitCount > 0 &&
      formErrors &&
      Object.keys(formErrors).length > 0
    ) {
      //console.log("form error", Object.keys(formErrors));
      const errorMessages = Object.values(formErrors);
      const errorKeys = Object.keys(formErrors);
      let mandatoryErrorKeys = [];
      for (let temp = 0; temp < errorMessages.length; temp++) {
        const errorMessage_words_array = errorMessages[temp].split(" ");
        if (errorMessage_words_array.includes("required")) {
          mandatoryErrorKeys.push(errorKeys[temp]);
        }
      }
      if (mandatoryErrorKeys.length > 0) {
        toast.error(
          `Mandatory field(s) is/are left blank. Complete the fields before clicking the submit button (${Object.keys(
            formErrors
          )
            .filter((field) => mandatoryErrorKeys.includes(field))
            .map(
              (field) =>
                `${field
                  .replace(/([A-Z])/g, (match) => ` ${match}`)
                  .replace(/^./, (match) => match.toUpperCase())
                  .trim()}`
            )
            .join(`, `)})`
        );
      }
    }
  }, [formSubmitCount]);

  const handleSubmitForm = (values) => {
    console.log("Create case form data - ", JSON.stringify(values, null, 2));
    const dummyData_ticketId = "#SERV02092022170534";
    toast.success(
      `Case successfully created for ${values.requestType} with ticket id ${dummyData_ticketId}`
    );
    formik.resetForm();
    handleResetForm();
  };

  const handleResetForm = () => {
    setCategoryChoices([]);
    setSubCategoryChoices([]);
    setSubSubCategoryChoices([]);
    setQueueChoices([]);
  };

  //for warning message on proceeding without queue
  const [showQueueWarning, setShowQueueWarning] = useState(false);
  const [displayMessage, setDisplayMessage] = useState({});

  const handleOpenQueueWarningPopup = () => {
    setShowQueueWarning(true);
    setDisplayMessage({
      title: "Warning",
      message: "Proceeding the ticket without entering queue details.",
    });
  };

  const handleQueueWarningClose = () => {
    setShowQueueWarning(false);
  };

  const handleQueueWarningProceed = () => {
    setShowQueueWarning(false);
    handleSubmitForm(formik.values);
  };

  const formik = useFormik({
    initialValues: {
      requestType: "",
      category: "",
      subCategory: "",
      subSubCategory: "",
      status: "New",
      queue: "",
      createdDate: getCurrentDateTimeISO(),
      dueDate: null,
      agentComment: "",
      description: "",
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      if (values.queue === "") {
        handleOpenQueueWarningPopup();
      } else {
        handleSubmitForm(values);
      }
    },
  });

  const handleRequestTypeChange = () => {
    formik.setFieldValue("category", "");
    formik.setFieldValue("subCategory", "");
    formik.setFieldValue("subSubCategory", "");
    formik.setFieldValue("queue", "");
    const dummyData_categoryChoices = [
      "Category 1",
      "Category 2",
      "Category 3",
      "Category 4",
    ];
    setCategoryChoices(dummyData_categoryChoices);
    setSubCategoryChoices([]);
    setSubSubCategoryChoices([]);
    setQueueChoices([]);
  };

  const handleCategoryChange = (event) => {
    formik.setFieldValue("subCategory", "");
    formik.setFieldValue("subSubCategory", "");
    formik.setFieldValue("queue", "");
    const dummyData_subCategoryChoices = [
      "Sub Category 1",
      "Sub Category 2",
      "Sub Category 3",
      "Sub Category 4",
    ];
    setSubCategoryChoices(dummyData_subCategoryChoices);

    const dummyData_queueChoices = ["Queue 1", "Queue 2", "Queue 3", "Queue 4"];

    setQueueChoices(dummyData_queueChoices);
    setSubSubCategoryChoices([]);
  };

  const handleSubCategoryChange = (event) => {
    formik.setFieldValue("subSubCategory", "");
    const dummyData_subSubCategoryChoices = [
      "Sub Sub Category 1",
      "Sub Sub Category 2",
      "Sub Sub Category 3",
      "Sub Sub Category 4",
    ];
    setSubSubCategoryChoices(dummyData_subSubCategoryChoices);
  };

  return (
    <>
      <ToasterNotification />
      <ToasterAlert showAlert={showAlert} setShowAlert={setShowAlert} />
      <Grid item xs={12} sm={12} md={4}>
        <Info style={{ fontSize: "14px" }}>
          Service Request / Complaint / Dispute Creation
        </Info>
      </Grid>
      <div
        style={{
          marginTop: "0px",
          padding: "5px 8px 5px 8px",
          height: "calc(100vh - 210px)",
          overflow: "auto",
        }}
      >
        <form>
          <Grid container spacing={0.1} direction="row">
            <Grid item xs={12} sm={6} md={4}>
              <GridItems>
                <label className="required">Type</label>
                <StyledTextField
                  id="requestType"
                  name="requestType"
                  inputProps={{ "data-testid": "requestType" }}
                  select
                  disabled={isTaskEnabled}
                  onChange={(event) => {
                    const {
                      target: { value },
                    } = event;
                    formik.setFieldValue("requestType", value);
                    handleRequestTypeChange();
                  }}
                  value={formik.values.requestType}
                  error={
                    formik.touched.requestType &&
                    Boolean(formik.errors.requestType)
                  }
                  helperText={
                    formik.touched.requestType && formik.errors.requestType
                  }
                >
                  {requestTypeChoices?.map((choice) => (
                    <StyledMenuItem key={choice} value={choice}>
                      {choice}
                    </StyledMenuItem>
                  ))}
                </StyledTextField>
              </GridItems>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <GridItems>
                <label className="required">Category</label>
                <StyledTextField
                  id="category"
                  name="category"
                  inputProps={{ "data-testid": "category" }}
                  select
                  disabled={isTaskEnabled}
                  onChange={(event) => {
                    const {
                      target: { value },
                    } = event;
                    formik.setFieldValue("category", value);
                    handleCategoryChange();
                  }}
                  value={formik.values.category}
                  error={
                    formik.touched.category && Boolean(formik.errors.category)
                  }
                  helperText={formik.touched.category && formik.errors.category}
                >
                  {categoryChoices?.map((choice) => (
                    <StyledMenuItem key={choice} value={choice}>
                      {choice}
                    </StyledMenuItem>
                  ))}
                </StyledTextField>
              </GridItems>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <GridItems>
                <label>Sub Category</label>
                <StyledTextField
                  id="subCategory"
                  name="subCategory"
                  inputProps={{ "data-testid": "subCategory" }}
                  select
                  disabled={isTaskEnabled}
                  onChange={(event) => {
                    const {
                      target: { value },
                    } = event;
                    formik.setFieldValue("subCategory", value);
                    handleSubCategoryChange();
                  }}
                  value={formik.values.subCategory}
                >
                  {subCategoryChoices?.map((choice) => (
                    <StyledMenuItem key={choice} value={choice}>
                      {choice}
                    </StyledMenuItem>
                  ))}
                </StyledTextField>
              </GridItems>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <GridItems>
                <label>Sub Sub Category</label>
                <StyledTextField
                  id="subSubCategory"
                  name="subSubCategory"
                  inputProps={{ "data-testid": "subSubCategory" }}
                  select
                  disabled={isTaskEnabled}
                  onChange={(event) => {
                    const {
                      target: { value },
                    } = event;
                    formik.setFieldValue("subSubCategory", value);
                  }}
                  value={formik.values.subSubCategory}
                >
                  {subSubCategoryChoices?.map((choice) => (
                    <StyledMenuItem key={choice} value={choice}>
                      {choice}
                    </StyledMenuItem>
                  ))}
                </StyledTextField>
              </GridItems>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <GridItems>
                <label>Status</label>
                <StyledTextField
                  id="status"
                  name="status"
                  inputProps={{ "data-testid": "status" }}
                  disabled
                  value={formik.values.status}
                />
              </GridItems>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <GridItems>
                <label>Queue</label>
                <StyledTextField
                  id="queue"
                  name="queue"
                  inputProps={{ "data-testid": "queue" }}
                  select
                  disabled={isTaskEnabled}
                  onChange={(event) => {
                    const {
                      target: { value },
                    } = event;
                    formik.setFieldValue("queue", value);
                  }}
                  value={formik.values.queue}
                >
                  {queueChoices?.map((choice) => (
                    <StyledMenuItem key={choice} value={choice}>
                      {choice}
                    </StyledMenuItem>
                  ))}
                </StyledTextField>
              </GridItems>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <GridItems>
                <label>Created Date</label>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    id="createdDate"
                    name="createdDate"
                    inputProps={{ "data-testid": "createdDate" }}
                    disabled
                    value={formik.values.createdDate}
                    onChange={(newValue) => {
                      formik.setFieldValue("createdDate", newValue);
                    }}
                    renderInput={(params) => (
                      <StyledTextField {...params} name="createdDatetext" />
                    )}
                  />
                </LocalizationProvider>
              </GridItems>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <GridItems>
                <label>Due Date</label>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    id="dueDate"
                    name="dueDate"
                    inputProps={{ "data-testid": "dueDate" }}
                    disabled
                    value={formik.values.dueDate}
                    onChange={(newValue) => {
                      formik.setFieldValue("dueDate", newValue);
                    }}
                    renderInput={(params) => (
                      <StyledTextField
                        {...params}
                        id="dueDatetext"
                        name="dueDatetext"
                      />
                    )}
                  />
                </LocalizationProvider>
              </GridItems>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <GridItems style={{ gridTemplateColumns: "5fr 37fr" }}>
                <label>Agent Comment</label>
                <StyledMultilineTextField
                  id="agentComment"
                  name="agentComment"
                  inputProps={{ "data-testid": "agentComment" }}
                  disabled={isTaskEnabled}
                  multiline
                  rows={3}
                  onChange={formik.handleChange}
                  value={formik.values.agentComment}
                  error={
                    formik.touched.agentComment &&
                    Boolean(formik.errors.agentComment)
                  }
                  helperText={
                    formik.touched.agentComment && formik.errors.agentComment
                  }
                />
              </GridItems>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <GridItems style={{ gridTemplateColumns: "5fr 37fr" }}>
                <label className="required">Description</label>
                <StyledMultilineTextField
                  id="description"
                  name="description"
                  inputProps={{ "data-testid": "description" }}
                  disabled={isTaskEnabled}
                  multiline
                  rows={3}
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                />
              </GridItems>
            </Grid>
          </Grid>
          {!isTaskEnabled && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                marginTop: "5px",
                padding: "1% 25%",
              }}
            >
              <Button
                sx={{ background: "green", color: "white" }}
                variant="contained"
                type="submit"
                data-testid="createCaseSubmitButton"
                onClick={formik.handleSubmit}
              >
                Submit
              </Button>
              <Button
                sx={{ background: "red", color: "white" }}
                variant="contained"
                type="reset"
                onClick={() => {
                  formik.resetForm();
                  handleResetForm();
                }}
              >
                Cancel
              </Button>
            </div>
          )}
          <DialogPopupAlert
            showAlert={showQueueWarning}
            onCancel={handleQueueWarningClose}
            onProceed={handleQueueWarningProceed}
            displayMessage={displayMessage}
          />
        </form>
      </div>
    </>
  );
};

export default CreateCase;
