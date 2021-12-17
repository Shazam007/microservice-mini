import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PostList.css";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

function PostList() {
  //get the post list and show

  const [postsSet, setPostsSet] = useState({});

  const getPosts = async () => {
    await axios.get("http://localhost:4000/posts").then((res) => {
      setPostsSet(res.data.posts);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  const rendorPosts = Object.values(postsSet).map((post) => {
    return (
      <div key={post.id}>
        <div className="card">
          <div className="cardTitle">post title : {post.title}</div>
          <div className="addComment">
            <CommentForm postID={post.id} />
            <CommentList postID={post.id} />
          </div>
        </div>
      </div>
    );
  });

  return <div className="posts-list">{rendorPosts}</div>;
}

export default PostList;
