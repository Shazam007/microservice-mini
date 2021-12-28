const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

const handleEvents = (type, data) => {
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
    const { postId, comment, commentId, status } = data;

    posts[postId].comments.push({
      commentId: commentId,
      comment: comment,
      status: status,
    });
  }

  if (type === "CommentUpdated") {
    const post = posts[data.postId];

    const updatedComment = post.comments.find((comment) => {
      return comment.commentId === data.commentId;
    });
    // updatedComment.status = data.status;
    updatedComment.status = data.status;
  }
};

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  handleEvents(type, data);

  res.json({ status: "event recieved" });
});

app.get("/posts", (req, res) => {
  //send the complete posts set
  res.json({ status: "ok", posts });
});

app.listen(4002, async () => {
  console.log("listening on 4002");

  const events = await axios.get(
    "http://event-bus-cluster-ip-serv:4005/events"
  );
  console.log(events.data);

  for (let event of events.data) {
    handleEvents(event.type, event.data);
  }
});
