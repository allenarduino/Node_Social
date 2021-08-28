const multer = require("multer");
const path = require("path");

//Store uploaded image in a folder
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function(req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});

module.exports = storage;
