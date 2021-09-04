//importing dependencies
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

//importing routers
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
const productRoute = require("./routes/productRoute");
const messageRoute = require("./routes/messageRoute");

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
app.use(messageRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
  console.log(`Server running on port:${PORT}`);
});
