import React, { useState } from "react";
import axios from "axios";

function CommentForm({ postID }) {
  const [comment, setComment] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    //need to get the post id
    //post id ==> postID
    await axios
      .post(`http://posts.com/post/${postID}/comments`, {
        comment: comment,
      })
      .then((res) => {
        console.log(res);
        setComment("");
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Comment:
          <input
            type="text"
            placeholder="add comment here"
            value={comment}
            onChange={(text) => {
              setComment(text.target.value);
            }}
          />
        </label>
        <input type="submit" value="Add Comment" />
      </form>
    </div>
  );
}

export default CommentForm;
