import React, { useState } from "react";
import { Grid, IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const CaseToolbarContainer = ({
  onExportClick,
  isEditEnable,
  onEditHandler,
  onSaveHandle,
  activeLength,
}) => {
  const onEnableSave = () => {
    onSaveHandle();
  };
  const onEditable = () => {
    onEditHandler(true);
  };
  return (
    <Grid item xs={12} md={12} lg={12} style={{ marginBottom: "10px" }}>
      <IconButton
        size="small"
        onClick={() => onExportClick()}
        sx={{ float: "right" }}
        title="Export"
        data-testid="btnExport"
        disabled={activeLength === 0 ? true : false}
      >
        <UploadFileIcon sx={{ fontSize: 25 }} />
      </IconButton>
      {isEditEnable ? (
        <IconButton
          size="small"
          onClick={() => onEnableSave()}
          sx={{ float: "right" }}
          title="Save"
        >
          <SaveIcon sx={{ fontSize: 25 }} />
        </IconButton>
      ) : (
        <IconButton
          size="small"
          onClick={() => onEditable()}
          sx={{ float: "right" }}
          title="Edit"
          data-testid="btnEdit"
        >
          <ModeEditIcon sx={{ fontSize: 25 }} />
        </IconButton>
      )}
    </Grid>
  );
};
export default CaseToolbarContainer;
