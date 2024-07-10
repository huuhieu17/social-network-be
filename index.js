require('dotenv').config()
const express = require("express")

const app = express()
const port = 4000;

// Database connection
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL).then(() => {
    console.log("Kết nối đatabase thành công")
}).catch(e => {
    console.log("Kết nối thất bại", e)
})

const accountRouter = require('./routes/account');
// Routes
app.get("/", (req, res) => {
    return res.json({
        message: "Hello World"
    })
})

app.use("/account", accountRouter)

app.listen(port, () => {
    console.log(`App is running at ${port}`)
})