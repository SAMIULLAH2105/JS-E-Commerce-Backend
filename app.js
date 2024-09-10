// Express, is a back end web application framework for building RESTful APIs with Node.js
const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error")
const cookieParser = require("cookie-parser")


//This middleware will automatically parse that JSON string into a JavaScript object
app.use(express.json())
app.use(cookieParser())

// Route Imports
const product = require("./routes/productRoute")
const user = require("./routes/userRoute")
const order = require("./routes/orderRoutes")

app.use("/api/v1",product)
app.use("/api/v1",user)
app.use("/api/v1",order)


//Middleware for error
app.use(errorMiddleware)
module.exports = app;
