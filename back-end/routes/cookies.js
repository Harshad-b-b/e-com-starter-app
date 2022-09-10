const express = require("express");

const router = express.Router();

router.get("/setcookie/:key/:value", (req, res) => {
  let { key, value } = req.params;
  console.log(key, value);
  res.cookie(key, value, {
    maxAge: 5000,
  });
  res.json("cookie send");
});
router.get("/readcookies", (req, res) => {
  res.json({ cookies: req.cookies });
});
module.exports = router;
