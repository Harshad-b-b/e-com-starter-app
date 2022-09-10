import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./lp.css";
export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="header">
        <div class="area">
          <ul class="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <div className="buttons">
            <Button
              className="hover"
              style={{
                background: "#F94C66",
                color: "white",
                marginBottom: "1em",
                width: "30%",
                height: "5em",
              }}
              onClick={() => navigate("/registration")}
            >
              Register
            </Button>

            <Button
              className="hover"
              style={{
                background: "#53BF9D",
                color: "white",
                width: "30%",
                height: "5em",
              }}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
