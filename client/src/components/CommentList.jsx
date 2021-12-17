import React, { useState, useEffect } from "react";
import axios from "axios";

function CommentList({ postID }) {
  const [comments, setComments] = useState([]);

  const getCommentsList = async () => {
    //api call
    await axios
      .get(`http://localhost:4001/post/${postID}/comments`)
      .then((res) => {
        // console.log(res.data.comments);
        setComments(res.data.comments);
      });
  };

  useEffect(() => {
    getCommentsList();
  }, []);

  const renderComments = (comment) => {
    return <div>{comment}</div>;
  };

  return (
    <div>
      {comments.map((comment) => {
        return <div key={comment.id}>{comment.content}</div>;
      })}
    </div>
  );
}

export default CommentList;
