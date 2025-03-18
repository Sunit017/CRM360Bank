import React, { useCallback, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  Typography,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 100,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  cursor: "default",
};

const BulkAssignment = ({ activeLength }) => {
  const [open, setOpen] = React.useState(false);
  const [activeField, setActiveField] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setAgentAssign(true);
  };
  const [agentAssign, setAgentAssign] = useState(false);
  const [agent, setAgent] = React.useState("");
  const handleChangeAgent = (event) => {
    setAgent(event.target.value);
    setActiveField(true);
  };
  const handleClose = () => {
    setOpen(false);
    setAgent("");
    setActiveField(false);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Grid
        container
        rowSpacing={4}
        style={{
          top: "245px",
          right: "78px",
          width: "109px",
          position: "absolute",
        }}
      >
        <Button 
          size="medium"
          style={{textTransform: 'capitalize'}} 
          sx={{ float: "right" }}
          onClick={handleOpen}
          title="Bulk Assign"
          variant="body2"
          color="inherit"
          disabled={activeLength === 0 ? true : false}
        >
          Bulk Assign
        </Button >
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: 400 }}>
            <h2>Assign Task</h2>
            <Stack spacing={2}>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                You have selected {activeLength} records.
              </Typography>
              {/* Assign To */}
              <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel id="dassignTo-select-label">Assign to</InputLabel>
                <Select
                  labelId="dassignTo-select-label"
                  id="assignTo-select"
                  value={agent}
                  label="Assign to"
                  disabled={agentAssign == 0 ? true : false}
                  onChange={handleChangeAgent}
                >
                  <MenuItem value={10} style={{ fontSize: "small" }}>
                    Agent1
                  </MenuItem>
                  <MenuItem value={20} style={{ fontSize: "small" }}>
                    Agent2
                  </MenuItem>
                  <MenuItem value={30} style={{ fontSize: "small" }}>
                    Agent3
                  </MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <br></br>
            <Button
              variant="contained"
              size="small"
              sx={{ float: "right" }}
              disabled={activeField == 0 ? true : false}
              //  onClick={console.log("Assign button")}
            >
              Assign
            </Button>
            <Button
              variant="outlined"
              onClick={handleClose}
              className="cancel btn btn-danger ml-2"
              size="small"
              sx={{ float: "left" }}
            >
              Cancel
            </Button>
          </Box>
        </Modal>
      </Grid>
    </div>
  );
};

export default BulkAssignment;
