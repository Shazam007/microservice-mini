const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();

//middlewares
app.use(express.json());
app.use(cors());

const posts = {};

app.post("/posts", async (req, res) => {
  //create new post
  //generate random id for post
  const id = randomBytes(4).toString("hex");
  const postTitle = req.body.title;

  posts[id] = { id: id, title: postTitle };

  //send the post create event to event bus
  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: {
      id: id,
      title: postTitle,
    },
  });

  res.json({ status: "ok", postID: id });
});

app.get("/posts", (req, res) => {
  //fetch posts list
  res.json({ status: "ok", posts: posts });
});

//api for event-bus
app.post("/events", (req, res) => {
  console.log("event recieved : ", req.body.type);
  res.json({ status: "ok" });
});

app.listen(4000, () => {
  console.log("listening on 4000");
});
