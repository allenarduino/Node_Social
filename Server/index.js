//importing dependencies
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const socket = require("socket.io");

//importing routers
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
const productRoute = require("./routes/productRoute");

// Function to serve all static files
app.use("/uploads/", express.static("uploads"));

//calling the dependencies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

//calling the routers
app.use(userRoute);
app.use(postRoute);
app.use(productRoute);
const port = process.env.port || 4000;
const server = app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
