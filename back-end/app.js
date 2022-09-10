const mongoose = require("mongoose");
const productsRoute = require("./routes/products");
const userRegistrationRoute = require("./routes/userRegistration");
const cookie = require("./routes/cookies");

const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const session = require("express-session");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./public"));
app.use(express.json());

// configurations for local host connection
const mongoClient = mongoose.MongoClient;
let mongoConnUrl = "mongodb://localhost/NewProducts";
mongoose.connect(mongoConnUrl, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", function () {
  console.log("Error came in connectiong");
});
app.use(
  session({
    secret: "secrete-key",
    resave: false,
    saveUninitialized: false,
  })
);

//configurations for online connection
// mongoose
//   .connect(
//     `mongodb+srv://${process.env.DBNAME}:${process.env.DBPASS}@cluster0.rkuddlb.mongodb.net/Products?retryWrites=true&w=majority`
//   )
//   .then(() => {
//     console.log(`Sucessfully connected to database `);
//   })
//   .catch((err) => {
//     console.log(`Error while connected the database ${err}`);
//   });
app.use(express.static("./methods-public"));

app.use(cookieParser());
app.use("/product", productsRoute);
app.use("/cookie", cookie);

app.use("/registration", userRegistrationRoute);
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./index.html"));
});
app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});
