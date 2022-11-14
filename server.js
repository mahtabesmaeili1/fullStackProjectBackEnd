const express = require("express");
const cors = require("cors");
const productRouter = require("./routers/productRouter");
const app = express();
app.use(express.json());
app.use(cors());
//this was just for testing our server
// app.get("/", (req, res) => {
//   res.send("Hello world");
// });
// app.use(router);
app.use("/products", productRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log("Listening on port: ", PORT);
});
