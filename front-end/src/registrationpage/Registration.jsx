import React from "react";
import { Input, Button, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./reg.css";
import SucessToast from "../components/sucesstost/SucessToast";
import FailureToast from "../components/failuretoast/FailureToast";
export default function Registration() {
  const [userValues, setUserValues] = React.useState({
    name: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  });
  const [showToast, setToast] = React.useState(false);
  const [display, setDisplay] = React.useState("none");
  const navigate = useNavigate();
  async function postData() {
    console.log(userValues);
    let send = await axios({
      method: "post",
      url: "/registration",
      data: userValues,
    })
      .then((res) => {
        console.log(res);
        setDisplay("flex");
        setToast(true);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
        setDisplay("flex");
        setToast(false);
        setTimeout(() => {
          setDisplay("none");
        }, 3000);
      });
  }
  console.log(userValues);
  return (
    <div className="container">
      <div className="tost" style={{ display: display }}>
        {showToast ? (
          <SucessToast text="User registred sucessfully" />
        ) : (
          <FailureToast text="User with same username or email exists " />
        )}
      </div>

      <div className="card">
        <TextField
          className="margin"
          id="filled-textarea"
          label="Name"
          placeholder="Name"
          multiline
          variant="filled"
          onChange={(e) =>
            setUserValues({ ...userValues, name: e.target.value })
          }
          style={{ marginBottom: "1em" }}
        />
        <TextField
          className="margin"
          id="filled-textarea"
          label="Last Name"
          placeholder="Last Name"
          multiline
          variant="filled"
          onChange={(e) =>
            setUserValues({ ...userValues, lastName: e.target.value })
          }
          style={{ marginBottom: "1em" }}
        />
        <TextField
          className="margin"
          id="filled-textarea"
          label="User Name"
          placeholder="User Name"
          multiline
          variant="filled"
          onChange={(e) =>
            setUserValues({ ...userValues, userName: e.target.value })
          }
          style={{ marginBottom: "1em" }}
        />
        <TextField
          className="margin"
          id="filled-textarea"
          label="Email"
          placeholder="Email"
          multiline
          variant="filled"
          onChange={(e) =>
            setUserValues({ ...userValues, email: e.target.value })
          }
          style={{ marginBottom: "1em" }}
        />
        <TextField
          className="margin"
          id="filled-textarea"
          label="Password"
          placeholder="Password"
          multiline
          variant="filled"
          onChange={(e) =>
            setUserValues({ ...userValues, password: e.target.value })
          }
          style={{ marginBottom: "1em" }}
        />
        <Button
          style={{
            background: "#53BF9D",
            color: "white",
            width: "30%",
            height: "5em",
          }}
          onClick={postData}
          className="hover"
        >
          Register
        </Button>
      </div>
    </div>
  );
}
