const { Router } = require("express");
const express = require("express");
const { toJWT } = require("../auth/jwt");
const User = require("../models").users;
const bcrypt = require("bcrypt");
const authMiddleware = require("../auth/middleware");
const { Router } = express;
const router = new Router();

//login
router.post("/login", authMiddleware, async (req, res) => {
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
    res.send({ token: token });
    return;
  }
  res.status(400).send("User with that password and/or email not found!");
});

//signup
router.post("/signup", authMiddleware, async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res
      .status(400)
      .send("You must specify an email, password, and name");
  }

  try {
    const createdUser = await User.create(newUser);
    res.json(createdUser);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
