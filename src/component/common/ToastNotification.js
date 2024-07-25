import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const ToastNotification = (props) => {

  const [open, setOpen] = useState(false);
  const [messagetext, setMessageText] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  useEffect(() => {
    setMessageText( props.text);
  }, [props.text]);

  return (
    <div>
      <Button variant="outlined" onClick={handleClick}>
        Show Notification
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <MuiAlert
          onClose={handleClose}
          variant="filled"
          severity="success"
          sx={{ width: "100%" }}
        >
          サイト連携が完了しました
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default ToastNotification;
