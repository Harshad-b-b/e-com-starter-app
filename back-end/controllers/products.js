const products = require("../models/products");
const { body, validation } = require("express-validator");
exports.addProducts = [
  body("name").escape().trim().isLength({ min: 2 }),
  body("price").escape().trim().isLength({ min: 1 }),
  body("description").escape().trim().isLength({ min: 2 }),
  body("color").escape().trim().isLength({ min: 2 }),

  (req, res) => {
    let { name, userId, price, description, color } = req.body;
    const productsOb = new products({
      name,
      userId,
      price,
      description,
      color,
    });
    productsOb.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Sucess in inserting products");
        res.json({ msg: "Products saved" });
      }
    });
  },
];
exports.getProducts = function (req, res) {
  products.find((error, productList) => {
    res.json(productList);
  });
};
exports.getProductWithSepcifiedAutrhor = async (req, res) => {
  let { id } = req.params;
  let a = "";
  await products
    .find({ userId: { $in: [id] } }, (err, data) => {
      if (err) {
        res.send("erro" + err);
      } else {
        res.json({ msg: "sucess", products: data });
      }
    })
    .clone();
};
exports.updateProuducts = async (req, res) => {
  let updateOb = req.body;
  let { id } = req.params;

  products.findByIdAndUpdate(id, updateOb, (error) => {
    if (error) res.send(error.toString() + "error");
    res.json({ msg: `Products Updated` });
  });
};

exports.deleteProduct = async (req, res) => {
  let { id } = req.params;
  products.findByIdAndDelete(id, (error) => {
    res.json({ msg: error });
  });
};
