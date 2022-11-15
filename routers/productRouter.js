const express = require("express");
const Products = require("../models").products;

const Category = require("../models").categories;
const { Router } = express;
const router = new Router();
//GET - /products: Returns a list of products with their categories
router.get("/", async (req, res, next) => {
  const limit = req.query.limit || 4;
  const offset = req.query.offset || 0;
  try {
    const result = await Products.findAndCountAll({ limit, offset });
    res.send({ products: result.rows, total: result.count });
  } catch (error) {
    next(error);
  }
});

//GET - /products/:id Returns a specific product with it's category

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const product = await Products.findByPk(id, {
    include: { model: Category },
  });
  if (!product) {
    res.status(404).send("product not found");
  } else {
    res.status(200).send(product);
  }
});

module.exports = router;
