import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'

import { unsetNotification } from 'features/notificationsSlice'

import { Alert, IconButton, Snackbar } from "@mui/material";
import { Close } from "@mui/icons-material";

const SnackbarNotification = ({ open, message, variant, index}) => {
    const dispatch = useDispatch()
  const [isActive, setActive] = useState(false);

  const handleOnClose = (event, reason) => {
    if (reason === "clickaway") return;

    setActive(false);
    dispatch(unsetNotification(index))
  };

  useEffect(() => {
    setActive(open)
  }, [open, message, variant])

  return (
    <Snackbar
      open={isActive}
      autoHideDuration={5000}
      onClose={handleOnClose}
      action={
        <>
          <IconButton
            aria-label="close"
            size="small"
            color="inherit"
            onClick={handleOnClose}
          >
            <Close fontSize="small" />
          </IconButton>
        </>
      }
    >
        <Alert onClose={handleOnClose} severity={variant} sx={{ width: '100%' }} >{message}</Alert>
    </Snackbar>
  );
};

export default SnackbarNotification;
