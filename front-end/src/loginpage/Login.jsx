import { Button, Input, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import SucessToast from "../components/sucesstost/SucessToast";
import FailureToast from "../components/failuretoast/FailureToast";
export default function () {
  let [userValues, setUserValues] = React.useState({
    email: "",
    password: "",
  });
  const [showToast, setToast] = React.useState(false);
  const [display, setDisplay] = React.useState("none");
  const navigate = useNavigate();
  async function postData() {
    console.log(userValues);
    await axios({
      method: "post",
      url: "/registration/login",
      data: userValues,
    })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", JSON.stringify(res.data));
        setDisplay("flex");
        setToast(true);
        setTimeout(() => {
          navigate("/crudpage");
        }, 1500);
      })
      .catch((err) => {
        setDisplay("flex");
        setToast(false);
        setTimeout(() => {
          setDisplay("none");
        }, 1500);
      });
  }
  console.log();
  return (
    <div className="container">
      <div className="tost" style={{ display: display }}>
        {showToast ? (
          <SucessToast text="Logged in sucessfully" />
        ) : (
          <FailureToast text="Invalid credentials" />
        )}
      </div>
      <div className="card">
        <TextField
          className="margin"
          id="filled-textarea"
          label="Email"
          placeholder="Email"
          multiline
          variant="filled"
          onChange={(e) => {
            setUserValues({ ...userValues, email: e.target.value });
          }}
          style={{ marginBottom: "1em" }}
        />
        <TextField
          className="margin"
          id="filled-textarea"
          label="Password"
          placeholder="Password"
          multiline
          variant="filled"
          onChange={(e) => {
            setUserValues({ ...userValues, password: e.target.value });
          }}
          type="password"
          style={{ marginBottom: "1em" }}
        />
        <Button
          className="hover"
          style={{
            background: "#53BF9D",
            color: "white",
            width: "30%",
            height: "5em",
          }}
          onClick={postData}
        >
          Login
        </Button>
      </div>
    </div>
  );
}
