const express = require("express");
const router = express.Router();
const multer = require("multer");
const app = express();
const fs = require("fs");
const db = require("../database");
const path = require("path");
const auth = require("../middlewares/auth");
const sseExpress = require("sse-express");

//Store uploaded image in a folder
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function(req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});

//Create Post
const upload = multer({ storage: storage });
const type = upload.single("post_media");
router.post("/create_post", type, auth, function(req, res) {
  console.log(req.file);
  const target_path = req.file.path;
  console.log(target_path);
  const post_caption = req.body.post_caption;
  console.log(post_caption);
  const user_id = req.user_id;
  console.log(user_id);
  const is_video = req.body.is_video;

  const inputData = [post_caption, target_path, is_video, user_id];
  const sql = `INSERT INTO posts(post_caption,post_media,is_video,owner_id) 
  VALUES (?,?,?,?)`;

  db.query(sql, inputData, function(err, data) {
    console.log(inputData);
    res.status(200).json({
      message: "Post Created"
    });
  });
});

// For displaying posts on homepage

router.get("/posts", auth, (req, res) => {
  user_id = req.user_id;
  const sql = `SELECT  p_id,post_caption,post_media,is_video,owner_id,u.full_name,u.user_img,u.user_id,
  (SELECT post_liker FROM post_likes pl WHERE pl.post_liker=? AND pl.L_post_id=p.p_id) as post_liker,
  (SELECT COUNT(*) FROM post_comments WHERE p.p_id=post_comments.C_post_id )as total_comments,
  (SELECT COUNT(*) FROM post_likes WHERE p.p_id=post_likes.L_post_id) as total_likes
  FROM posts p,users u WHERE u.user_id=p.owner_id  ORDER BY p.p_id DESC;
  SELECT* FROM users WHERE user_id=?`;
  db.query(sql, [user_id, user_id], function(err, data) {
    res.status(200).json({ posts: data[0], user: data[1] });
  });
});

// For displaying posts on homepage
/*
app.get("/posts", auth, (req, res) => {
  res.set({
    "Cache-Control": "no-cache",
    "Content-Type": "text/event-stream",
    Connection: "keep-alive"
  });
  res.flushHeaders();
  user_id = req.user_id;
  const sql = `SELECT  p_id,post_caption,post_media,is_video,owner_id,u.full_name,u.user_img,u.user_id,
  (SELECT post_liker FROM post_likes pl WHERE pl.post_liker=? AND pl.L_post_id=p.p_id) as post_liker,
  (SELECT COUNT(*) FROM post_comments WHERE p.p_id=post_comments.C_post_id )as total_comments,
  (SELECT COUNT(*) FROM post_likes WHERE p.p_id=post_likes.L_post_id) as total_likes
  FROM posts p,users u WHERE u.user_id=p.owner_id  ORDER BY p.p_id DESC`;
  db.query(sql, [user_id], function(err, data) {
    res.status(200).json({ posts: data });
  });
});
*/

//For user to like a post
router.post("/like_post", auth, (req, res) => {
  const user_id = req.user_id;
  const post_id = req.body.post_id;
  console.log(post_id);
  const sql = `INSERT INTO post_likes(post_liker,L_post_id) VALUES (?,?)`;
  db.query(sql, [user_id, post_id], function(err, data) {
    res.status(200).json({
      mesaage: "Post Liked"
    });
  });
});

//For user to unlike a post
router.delete("/unlike_post", (req, res) => {
  const post_id = req.body.post_id;
  console.log(post_id);
  const sql = `DELETE FROM post_likes WHERE L_post_id=?`;
  db.query(sql, [post_id], function(err, data) {
    res.status(200).json({
      mesaage: "Post Unliked"
    });
  });
});

//For user to delete a post
router.delete("/delete_post", (req, res) => {
  const post_id = req.body.post_id;
  console.log(post_id);
  const sql = `DELETE FROM posts WHERE p_id=?`;
  db.query(sql, [post_id], function(err, data) {
    res.status(200).json({
      mesaage: "Post Deleted"
    });
  });
});

//For creating comment under a post
router.post("/create_comment/:post_id", auth, (req, res) => {
  const comment_text = req.body.comment_text;
  const user_id = req.user_id;
  const post_id = req.params.post_id;
  const inputData = [comment_text, post_id, user_id];

  console.log(post_id);
  console.log(comment_text);
  console.log(user_id);
  const sql = `INSERT INTO post_comments(text,C_post_id,user_id) 
  VALUES (?,?,?)`;
  db.query(sql, inputData, function(err) {
    console.log(comment_text);
    console.log(err);
    res.status(200).json({
      mesaage: "Comment Created"
    });
  });
});

//For fetching comments under a post
router.get("/fetch_comments/:post_id", (req, res) => {
  const post_id = req.params.post_id;
  console.log(post_id);
  const sql = `SELECT* FROM post_comments,users WHERE post_comments.C_post_id=?
  AND users.user_id=post_comments.user_id`;
  db.query(sql, [post_id], function(err, data) {
    res.status(200).json({
      comments: data
    });
  });
});

module.exports = router;
