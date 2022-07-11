const express = require('express')
const connectDB= require("./config/connectDb")
require('dotenv').config({path:"./config/.env"})
const app = express()
app.use(express.json())

connectDB()
app.use("/users",require("./routes/userRoutes"))

const port = 5000
app.listen(port, () => console.log(`app server listening on port ${port}!`))