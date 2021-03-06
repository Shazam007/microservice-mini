import React from "react";

function CommentList({ comments }) {
  return (
    <div>
      {comments.map((comment) => {
        return (
          <div key={comment.commentId}>
            {comment.status === "Rejected"
              ? "Comment Rejected"
              : comment.comment}
          </div>
        );
      })}
      {/* {comments.map((comment) => {
        return <div key={comment.commentId}>{comment.comment}</div>;
      })} */}
    </div>
  );
}

export default CommentList;
