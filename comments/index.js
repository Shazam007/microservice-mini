const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();

//middlewares
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.post("/post/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const content = req.body.comment;

  //check the comment for post is exist
  const comments = commentsByPostId[req.params.id] || [];

  //push the new comment
  comments.push({ id: commentId, content: content });

  commentsByPostId[req.params.id] = comments;

  //send a event to event bus
  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      postId: req.params.id,
      comment: content,
      commentId: commentId,
    },
  });

  res.json({ status: "ok", comments: comments });
});

app.get("/post/:id/comments", (req, res) => {
  if (
    commentsByPostId[req.params.id] == [] ||
    commentsByPostId[req.params.id] == undefined
  ) {
    res.json({ status: "error", comments: [] });
  } else {
    res.json({ status: "ok", comments: commentsByPostId[req.params.id] });
  }
});

//api for event-bus
app.post("/events", (req, res) => {
  console.log("event recieved : ", req.body.type);
  res.json({ status: "ok" });
});

app.listen(4001, () => {
  console.log("listening on 4001");
});
