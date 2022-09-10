const usersR = require("../models/usersRegistration");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginAuth = require("../middlewares/loginAuth");
const { body, validation } = require("express-validator");

exports.addUser = [
  body("name").escape().trim().isLength({ min: 2 }),
  body("userName").escape().trim().isLength({ min: 2 }),
  body("lastName").escape().trim().isLength({ min: 2 }),
  body("email").escape().trim().isLength({ min: 2 }),
  body("password").escape().trim().isLength({ min: 2 }),
  async (req, res) => {
    let { userName, name, lastName, email, password } = req.body;
    let checkForSameEmail = await usersR.findOne({
      email,
    });

    if (checkForSameEmail) {
      return res.status(400).json({ msg: "Email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const userROb = new usersR({
      name,
      lastName,
      userName,
      email,
      password: encryptedPassword,
    });

    try {
      userROb.save((err, data) => {
        if (err) {
          console.log(err);
          res.status(400).json({ msg: "Error while adding user", data: err });
        } else {
          res.status(200).json({ msg: "User saved sucessfully", data: data });
        }
      });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  },
];
exports.getUsers = (req, res) => {
  usersR.find((err, userList) => {
    if (err) {
      res.status(400).json({ msg: "Error while fetching users", data: err });
    } else {
      res.status(200).json({ msg: "Sucessfull", deta: userList });
    }
  });
};
exports.doLogin = async (req, res) => {
  const { email, password } = req.body;

  let toLogginUser = await usersR.findOne({
    email,
  });

  if (toLogginUser != null) {
    let passwordCorrect = await bcrypt.compare(password, toLogginUser.password);

    if (!passwordCorrect) {
      return res.status(400).json({
        status: 0,
        message: "Wrong password",
      });
    }

    const payload = {
      id: toLogginUser.id,
      email: email,
    };
    console.log(process.env.SECREATEKEY);

    jwt.sign(
      payload,
      process.env.SECREATEKEY,
      {
        expiresIn: 172800000,
        // 172800000
      },
      (err, token) => {
        if (err) {
          throw err;
        }
        res.status(200).json({
          token,
          payload,
        });
      }
    );
  } else {
    console.log("I ran from elser");
    return res.status(400).json({
      status: 1,
      message: "User with this email does not exists.",
    });
  }
};

exports.restrictedPage = [
  loginAuth,
  async (req, res) => {
    res.json({ msg: "Successfully logged in" });
  },
];
