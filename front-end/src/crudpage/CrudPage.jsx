import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import "./cp.css";

export default function CrudPage() {
  let id = JSON.parse(localStorage.getItem("token"));
  const [products, setProducts] = React.useState([]);

  let [loader, setLoader] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  let [productId, setProductId] = React.useState();
  let [userValues, setUserValues] = React.useState({
    name: "",
    userId: id.payload.id,
    price: "",
    description: "",
    color: "",
  });
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  React.useEffect(() => {
    showProducts();
  }, []);
  async function showProducts() {
    let data = await axios
      .get(`product/userproducts/${id.payload.id}`)
      .then((data) => {
        setLoader(true);
        setProducts(data.data.products);
      });
  }
  async function postProducts() {
    let send = await axios
      .post(`product/postproduct`, userValues)
      .then((resp) => {
        console.log(resp);
      });
    showProducts();
  }
  const handleClose = (id) => {
    open ? setOpen(false) : setOpen(true);
    setProductId(id);
  };
  async function editProducts() {
    console.log(productId);
    let obj = {};
    for (let value in userValues) {
      userValues[value] !== ""
        ? (obj[value] = userValues[value])
        : console.log("");
    }
    let edit = await axios
      .put(`product/${productId}`, obj)
      .then((resp) => {
        console.log(resp);
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
    showProducts();
  }

  async function deleteProduct(id) {
    if (window.confirm("The following product will be deleted") === true) {
      let delete1 = await axios.delete(`product/${id}`).then((resp) => {
        console.log(resp);
      });
      showProducts();
    } else {
      alert("Product did not deleted");
    }
  }

  return (
    <div className="container cp-height">
      <div className="card cp-margin">
        <Button
          className="hover"
          style={{
            background: "#F94C66",
            color: "white",
            marginBottom: "1em",
            width: "30%",
            height: "5em",
          }}
          onClick={logout}
        >
          Logout
        </Button>
        <br />
        <TextField
          style={{ marginBottom: "1em" }}
          className="margin"
          id="filled-textarea"
          label="Name"
          placeholder="Name"
          multiline
          variant="filled"
          onChange={(e) =>
            setUserValues({ ...userValues, name: e.target.value })
          }
        />
        <br />
        <TextField
          style={{ marginBottom: "1em" }}
          className="margin"
          id="filled-textarea"
          label="Price"
          placeholder="Price"
          multiline
          variant="filled"
          onChange={(e) =>
            setUserValues({ ...userValues, price: e.target.value })
          }
        />
        <br />
        <TextField
          style={{ marginBottom: "1em" }}
          className="margin"
          id="filled-textarea"
          label="Description"
          placeholder="Description"
          multiline
          variant="filled"
          onChange={(e) =>
            setUserValues({ ...userValues, description: e.target.value })
          }
        />
        <br />
        <TextField
          style={{ marginBottom: "1em" }}
          className="margin"
          id="filled-textarea"
          label="Color"
          placeholder="Color"
          multiline
          variant="filled"
          onChange={(e) =>
            setUserValues({ ...userValues, color: e.target.value })
          }
        />
        <br />
        <Button
          style={{
            background: "#53BF9D",
            color: "white",
            width: "30%",
            height: "5em",
          }}
          className="hover"
          onClick={postProducts}
        >
          Add
        </Button>
        <br />
      </div>
      {loader ? (
        <table style={{ width: "80%" }}>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Color</th>
            <th>Description</th>
            <th>Operations</th>
          </tr>

          {products.map((val) => {
            return (
              <tr>
                <td>{val.name}</td>
                <td>{val.price}</td>
                <td>{val.color}</td>
                <td>{val.description}</td>
                <td>
                  <div className="table-btn">
                    <Button
                      className="hover"
                      style={{
                        background: "#F94C66",
                        color: "white",
                        marginBottom: "1em",
                        width: "30%",
                        height: "5em",
                      }}
                      onClick={() => handleClose(val._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="hover"
                      style={{
                        background: "#F94C66",
                        color: "white",
                        marginBottom: "1em",
                        width: "30%",
                        height: "5em",
                      }}
                      onClick={() => deleteProduct(val._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </table>
      ) : (
        <h1 style={{ color: "wheat" }}>Loading...</h1>
      )}
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          style={{ width: "100%" }}
          maxWidth="sm"
          fullWidth="true"
        >
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent className="modal-content">
            <DialogContentText>Edit Produts</DialogContentText>
            <TextField
              style={{ marginBottom: "1em" }}
              className="cp-marign-tf"
              id="filled-textarea"
              label="Name"
              placeholder="Name"
              multiline
              variant="filled"
              onChange={(e) =>
                setUserValues({ ...userValues, name: e.target.value })
              }
            />
            <TextField
              style={{ marginBottom: "1em" }}
              className="cp-marign-tf"
              id="filled-textarea"
              label="Price"
              placeholder="Price"
              multiline
              variant="filled"
              onChange={(e) =>
                setUserValues({ ...userValues, price: e.target.value })
              }
            />
            <TextField
              style={{ marginBottom: "1em" }}
              className="cp-marign-tf"
              id="filled-textarea"
              label="Description"
              placeholder="Description"
              multiline
              variant="filled"
              onChange={(e) =>
                setUserValues({ ...userValues, description: e.target.value })
              }
            />
            <TextField
              id="filled-textarea"
              label="Color"
              placeholder="Color"
              multiline
              variant="filled"
              onChange={(e) =>
                setUserValues({ ...userValues, color: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={editProducts}>Edit product</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
