const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/events", async (req, res) => {
  //comment moderation logic

  if (req.body.type === "CommentCreated") {
    const { postId, comment, commentId } = req.body.data;

    const status = comment.includes("orange") ? "Rejected" : "Approved";

    console.log(status, "::: in the comment moderation");

    await axios.post("http://localhost:4005/events", {
      type: "CommentModerated",
      data: {
        postId,
        comment,
        commentId,
        status,
      },
    });
  }

  res.json({ status: "ok" });
});

app.listen(4003, () => {
  console.log("listening on 4003");
});
