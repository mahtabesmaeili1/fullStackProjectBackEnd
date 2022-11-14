const express = require("express");
const app = express();

//this was just for testing our server
// app.get("/", (req, res) => {
//   res.send("Hello world");
// });

const PORT = 4000;
app.listen(PORT, () => {
  console.log("Listening on port: ", PORT);
});
