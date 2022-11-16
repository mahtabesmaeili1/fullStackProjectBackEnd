const user = require("../models").users;
const { toData } = require("./jwt");

async function auth(req, res, next) {
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");
  if (auth && auth[0] === "Bearer" && auth[1]) {
    try {
      const data = toData(auth[1]);
      const foundUser = await user.findByPk(data.userId);
      if (!foundUser) {
        res.status(404).send("No user found");
      } else {
        req.user = foundUser;
        next();
      }
    } catch (error) {
      res.status(400).send({
        message: `Error ${error.name}: ${error.message}`,
      });
    }
  } else {
    res.status(401).send({
      message: "Please supply some valid credentials",
    });
  }
}

module.exports = auth;
