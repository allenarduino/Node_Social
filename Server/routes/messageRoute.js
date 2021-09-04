const db = require("../database");
const auth = require("../middlewares/auth");
const express = require("express");
const router = express.Router();

//For user to send message
router.post("/send_message/:user_id", auth, (req, res) => {
  const sender_id = req.user_id;
  const receipient_id = req.params.user_id;
  const message = req.body.message;
  const inputData = [sender_id, receipient_id, message];
  const sql = `INSERT INTO messages(sender_id,receipient_id,message) 
  VALUES(?,?,?)`;
  db.query(sql, inputData, function(err, data) {
    console.log(err);
    res.status(200).json({ message: "Message Sent" });
  });
});

//For fetching all messages
router.get("/fetch_messages/:user_id", auth, (req, res) => {
  const sender_id = req.user_id;
  const receipient_id = req.params.user_id;
  const sql = `SELECT* FROM messages WHERE sender_id=${sender_id} AND receipient_id=${receipient_id}
  OR sender_id=${receipient_id} AND receipient_id=${sender_id}  ORDER BY id`;
  db.query(sql, function(err, data) {
    console.log(err);
    console.log(data);
    res.status(200).json({ messages: data });
  });
});

router.get("/fetch_chats", auth, (req, res) => {
  user_id = req.user_id;
  const sql = `SELECT full_name,user_img,user_id,
  (SELECT message FROM messages WHERE  sender_id=${user_id} AND receipient_id=users.user_id
  OR sender_id=users.user_id AND 
  receipient_id=${user_id} ORDER BY messages.id DESC  LIMIT 1 )
  as lastmessage
  FROM users,messages WHERE  sender_id=${user_id} AND receipient_id=users.user_id
  OR sender_id=users.user_id AND 
  receipient_id=${user_id}  GROUP BY users.user_id ORDER BY MAX(messages.id) DESC`;
  db.query(sql, function(err, data) {
    console.log(err);
    console.log(data);
    res.status(200).json({ chats: data });
  });
});

module.exports = router;
