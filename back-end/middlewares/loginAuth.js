const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("token");
  if (!token)
    return res.status(400).json({ status: 0, message: "Auth token error" });
  try {
    const decode = jwt.verify(token, process.env.SECREATEKEY);
    req.id = decode.id;
    req.email = decode.email;
    next();
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: `token not valid ${e.toString()}` });
  }
};
