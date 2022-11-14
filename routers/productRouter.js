const express = require("express");
const Products = require("../models").products;
const { Router } = express;
const router = new Router();
//GET - /products: Returns a list of products with their categories
router.get("/", async (request, response, next) => {
  try {
    const products = await Products.findAll();
    response.send(products);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

module.exports = router;
