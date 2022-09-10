const express = require("express");
const router = express.Router();
const products = require("../controllers/products");

router.post("/postproduct", products.addProducts);
router.get("/", products.getProducts);
router.put("/:id", products.updateProuducts);
router.delete("/:id", products.deleteProduct);
router.get("/userproducts/:id", products.getProductWithSepcifiedAutrhor);
module.exports = router;
