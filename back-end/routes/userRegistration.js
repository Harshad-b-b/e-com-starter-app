const express = require("express");

const router = express.Router();
const UserRegistration = require("../controllers/userRegistration");

router.post("/", UserRegistration.addUser);
router.get("/", UserRegistration.getUsers);
router.post("/login", UserRegistration.doLogin);

module.exports = router;
