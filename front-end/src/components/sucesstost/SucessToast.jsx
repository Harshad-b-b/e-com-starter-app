import React from "react";
import { Alert } from "@mui/material";

export default function ({ text }) {
  return (
    <Alert variant="filled" severity="success" className="tost-tost">
      {text}
    </Alert>
  );
}
