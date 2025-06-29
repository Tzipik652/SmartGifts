import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMessage, clearMessage } from "../../redux/messageSlice";
import { Snackbar, Alert } from "@mui/material";

const GlobalMessage = () => {
  const dispatch = useDispatch();
  const message = useSelector(selectMessage);

  useEffect(() => {
    if (message.type) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  return (
    <Snackbar open={!!message.type} anchorOrigin={{ vertical: "top", horizontal: "left" }}>
      <Alert severity={message.type || "info"}>{message.text}</Alert>
    </Snackbar>
  );
};

export default GlobalMessage;
