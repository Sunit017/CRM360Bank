import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";

const DialogPopupAlert = ({
  showAlert,
  onCancel,
  onProceed,
  displayMessage,
}) => {
  const { title, message } = displayMessage;

  const handleClose = () => {
    onCancel();
  };

  const handleProceed = () => {
    onProceed();
  };

  return (
    <Dialog
      open={showAlert}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{ fontSize: "15px", padding: "5px 10px" }}
      >
        {title}
      </DialogTitle>
      <DialogContent sx={{ padding: "10px 10px" }}>
        <DialogContentText
          id="alert-dialog-description"
          sx={{ fontSize: "12px" }}
        >
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{
            background: "red",
            color: "white",
            fontSize: "12px",
            padding: "3px 5px",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleProceed}
          autoFocus
          sx={{
            background: "green",
            color: "white",
            fontSize: "12px",
            padding: "3px 5px",
          }}
        >
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogPopupAlert;
