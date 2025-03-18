import React from "react";
import SaveIcon from "@mui/icons-material/Save";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Grid, IconButton } from "@mui/material";

const TasksToolbarContainer = ({ onSave, onEdit, isEditEnable }) => {
  return (
    <>
      <Grid item xs={12} sm={12} md={12}>
        <div style={{ display: "flex", justifyContent: "right" }}>
          {isEditEnable ? (
            <IconButton size="small" onClick={() => onSave()} title="Save">
              <SaveIcon sx={{ fontSize: 25 }} />
            </IconButton>
          ) : (
            <IconButton
              size="small"
              onClick={() => onEdit()}
              title="Edit"
              data-testid="btnEdit"
            >
              <ModeEditIcon sx={{ fontSize: 25 }} />
            </IconButton>
          )}
        </div>
      </Grid>
    </>
  );
};

export default TasksToolbarContainer;
