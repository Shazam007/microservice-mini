const express = require("express");
const { randomBytes } = require("crypto");

const app = express();

//middlewares
app.use(express.json());

const commentsByPostId = {};

app.post("/post/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const content = req.body.comment;

  //check the comment for post is exist
  const comments = commentsByPostId[req.params.id] || [];

  //push the new comment
  comments.push({ id: commentId, content: content });

  commentsByPostId[req.params.id] = comments;

  res.json({ status: "ok", comments: comments });
});

app.get("/post/:id/comments", (req, res) => {
  if (
    commentsByPostId[req.params.id] == [] ||
    commentsByPostId[req.params.id] == undefined
  ) {
    res.json({ status: "error", error: "no comments for the post" });
  } else {
    res.json({ status: "ok", comments: commentsByPostId[req.params.id] });
  }
});

app.listen(4001, () => {
  console.log("listening on 4001");
});
