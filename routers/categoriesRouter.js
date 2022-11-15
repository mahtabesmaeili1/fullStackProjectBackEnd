const express = require("express");

const Categories = require("../models").categories;
const { Router } = express;
const router = new Router();

router.get("/", async (request, response, next) => {
  try {
    const categories = await Categories.findAll();
    response.send(categories);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

module.exports = router;
