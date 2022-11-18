const express = require("express");
const { toJWT } = require("../auth/jwt");
const User = require("../models").users;
const bcrypt = require("bcrypt");

const { Router } = express;
const router = new Router();

//login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userToLogin = await User.findOne({ where: { email: email } });
  // if the user exists
  if (!userToLogin) {
    res.status(400).send("User with that password and/or email not found");
    return;
  }
  // Check if the password is correct
  if (bcrypt.compareSync(password, userToLogin.password)) {
    // Generate a token
    const token = toJWT({ userId: userToLogin.id });
    res.send({ token: token, name: userToLogin.name });
    return;
  }
  res.status(400).send("User with that password and/or email not found!");
});

//signup
router.post("/signup", async (req, res, next) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res
      .status(400)
      .send("You must specify an email, password, and name");
  }

  try {
    const createdUser = await User.create({
      email: email,
      password: bcrypt.hashSync(password, 10),
      name: name,
    });
    res.json(createdUser);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
