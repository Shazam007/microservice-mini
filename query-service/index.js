const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

app.post("/events", (req, res) => {
  console.log("event recieved: ", req.body.type);
  const { type, data } = req.body;

  //query service logic
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = {
      id: id,
      title: title,
      comments: [],
    };
  }

  if (type === "CommentCreated") {
    const { postId, comment, commentId } = data;

    posts[postId].comments.push({ commentId: commentId, comment: comment });
  }

  console.log(posts);

  res.json({ status: "event recieved" });
});

app.get("/posts", (req, res) => {
  //send the complete posts set
  res.json({ status: "ok", posts });
});

app.listen(4002, () => {
  console.log("listening on 4002");
});
