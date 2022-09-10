import React from "react";
import Alert from "@mui/material/Alert";
import "./toast.css";
export default function ({ text }) {
  return (
    <Alert variant="filled" severity="error" className="tost-tost">
      {text}
    </Alert>
  );
}
