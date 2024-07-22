require("dotenv").config();
const express = require("express");
var cors = require('cors')
const app = express();
const port = 4000;

app.use(cors())

// Database connection
const mongoose = require("mongoose");
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Kết nối đatabase thành công");
  })
  .catch((e) => {
    console.log("Kết nối thất bại", e);
  });

const accountRouter = require("./routes/account");
const authRouter = require("./routes/auth");
const swaggerDocs = require("./swagger");

// Routes
app.get("/", (req, res) => {
  return res.json({
    message: "Hello World",
  });
});

app.use("/account", accountRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  swaggerDocs(app, port);
  console.log(`App is running at ${port}`);
});
