const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");

const app = express();

//middlewares
app.use(express.json());
app.use(cors());

const posts = {};

app.post("/posts", (req, res) => {
  //create new post
  //generate random id for post
  const id = randomBytes(4).toString("hex");
  const postTitle = req.body.title;

  posts[id] = { id: id, title: postTitle };

  res.json({ status: "ok", postID: id });
});

app.get("/posts", (req, res) => {
  //fetch posts list
  res.json({ status: "ok", posts: posts });
});

app.listen(4000, () => {
  console.log("listening on 4000");
});
