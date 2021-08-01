const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../database");
const jwt = require("jsonwebtoken");
const secret = require("../secret");
const auth = require("../middlewares/auth");
const multer = require("multer");
const path = require("path");

router.post("/register", function(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const hashed_password = bcrypt.hashSync(password, 12);
  const user_img = "uploads/avatar.jpg";
  const coverphoto = "uploads/coverphoto.jpg";
  const bio = "My bio";

  const inputData = [name, email, hashed_password, user_img, coverphoto, bio];
  const sql1 = "SELECT * FROM users WHERE email =?";
  db.query(sql1, [email], function(err, data) {
    if (data.length > 0) {
      res.status(200).json({
        error: "User with email already exists"
      });
    } else {
      const sql2 = `INSERT INTO users(full_name,email,password,user_img,coverphoto,bio)
      VALUES (?,?,?,?,?,?)`;

      db.query(sql2, inputData, function(err, data) {
        console.log(name);
        res.status(200).json({
          message: "You're registered successfully"
        });
      });
    }
  });
});

//User Login
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(password);

  const sql1 = "SELECT * FROM users WHERE email=?";
  db.query(sql1, [email], function(err, data) {
    if (data.length > 0) {
      const user_id = data[0]["user_id"];
      encrypted_password = data[0]["password"];
      const password_verify = bcrypt.compareSync(password, encrypted_password);
      console.log(data[0]["full_name"]);
      console.log(password_verify);
      if (password_verify) {
        const token = jwt.sign(user_id, secret.secret_key);
        res.status(200).json(token);
      } else {
        res.status(200).json({
          error: "Invalid email or password"
        });
      }
    } else {
      res.status(200).json({
        error: "Your email is not in our database"
      });
    }
  });
});

//For viewing user profile
router.get("/user_profile/:user_id", auth, (req, res) => {
  const auth_user_id = req.user_id;
  const user_id = req.params.user_id;
  const sql = `SELECT* FROM users WHERE user_id=?;
  SELECT  p_id,post_caption,post_media,is_video,owner_id,u.full_name,u.user_img,u.user_id,
  (SELECT post_liker FROM post_likes pl WHERE pl.post_liker=? AND pl.L_post_id=p.p_id) as post_liker,
  (SELECT COUNT(*) FROM post_comments WHERE p.p_id=post_comments.C_post_id )as total_comments,
  (SELECT COUNT(*) FROM post_likes WHERE p.p_id=post_likes.L_post_id) as total_likes
  FROM posts p,users u WHERE u.user_id=p.owner_id AND p.owner_id=? ORDER BY p.p_id DESC`;
  db.query(sql, [user_id, auth_user_id, user_id], function(err, data) {
    res.status(200).json({ user_profile: data[0], user_posts: data[1] });
  });
});

//For user to update his name
router.post("/update_name", auth, (req, res) => {
  const user_id = req.user_id;
  const full_name = req.body.full_name;
  console.log(full_name);
  const sql = `UPDATE users SET full_name=? WHERE user_id=?`;
  db.query(sql, [full_name, user_id], function(err, data) {
    res.status(200).json({ message: "Name Updated" });
  });
});

//For user to update his bio
router.post("/update_bio", auth, (req, res) => {
  const user_id = req.user_id;
  const bio = req.body.bio;
  console.log(bio);
  const sql = `UPDATE users SET bio=? WHERE user_id=?`;
  db.query(sql, [bio, user_id], function(err, data) {
    console.log(err);
    res.status(200).json({ message: "Bio Updated" });
  });
});

//Store uploaded image in a folder
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function(req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});

//Upload profile photo
const upload1 = multer({ storage: storage });
const type_user_img = upload1.single("user_img");

//Update Profile Photo
router.post("/update_user_img", type_user_img, auth, function(req, res) {
  console.log(req.file);
  const target_path = req.file.path;
  const user_id = req.user_id;
  const sql = `UPDATE users SET user_img=? WHERE user_id=?`;

  db.query(sql, [target_path, user_id], function(err, data) {
    res.status(200).json({
      message: "Profile Photo Updated"
    });
  });
});

const upload2 = multer({ storage: storage });
const type_coverphoto = upload2.single("coverphoto");

router.post("/update_coverphoto", type_coverphoto, auth, function(req, res) {
  console.log(req.file);
  const target_path = req.file.path;
  const user_id = req.user_id;
  const sql = `UPDATE users SET coverphoto=? WHERE user_id=?`;

  db.query(sql, [target_path, user_id], function(err, data) {
    res.status(200).json({
      message: "Profile Photo Updated"
    });
  });
});

//Fetch users of the app except me
router.get("/users", auth, (req, res) => {
  user_id = req.user_id;
  const sql = `SELECT* FROM users WHERE NOT user_id=? ORDER BY user_id`;
  db.query(sql, [user_id], function(err, data) {
    res.status(200).json(data);
  });
});

module.exports = router;
