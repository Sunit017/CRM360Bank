import React from "react";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import { Cancel, CheckCircle } from "@mui/icons-material";

const ToasterAlert = ({ showAlert, setShowAlert }) => {
  const { message, type } = showAlert;
  const handleClose = () => setShowAlert({});
  return (
    type && (
      <Dialog
        open={true}
        onClose={handleClose}
        style={{
          position: "absolute",
        }}
      >
        <DialogContent
          sx={{
            border: "1px solid #713200",
            padding: "5px",
          }}
        >
          <IconButton sx={{ color: "#713200" }}>
            {type === "error" && (
              <Cancel
                sx={{
                  color: "#ff4b4b",
                  paddingRight: "5px",
                  fontSize: "x-large",
                }}
              />
            )}
            {type === "success" && (
              <CheckCircle
                sx={{
                  color: "#61d345",
                  paddingRight: "5px",
                  fontSize: "x-large",
                }}
              />
            )}

            <span style={{ fontSize: "small" }}>{message}</span>
          </IconButton>
        </DialogContent>
      </Dialog>
    )
  );
};
export default ToasterAlert;
