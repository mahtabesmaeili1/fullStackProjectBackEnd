const express = require("express");
const Products = require("../models").products;
const { Router } = express;
const router = new Router();
//GET - /products: Returns a list of products with their categories
router.get("/", async (req, res, next) => {
  try {
    const products = await Products.findAll();
    res.send(products);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

//GET - /products/:id Returns a specific product with it's category

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const product = await Products.findByPk(id);
  if (!product) {
    res.status(404).send("product not found");
  } else {
    res.status(200).send(product);
  }
});

module.exports = router;
