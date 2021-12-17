import React, { useState } from "react";
import axios from "axios";
import "../App.css";

function PostAddForm() {
  const [postName, setPostName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    //handle the submit with api
    await axios
      .post("http://localhost:4000/posts", {
        title: postName,
      })
      .then((response) => {
        // const res = response.json();

        console.log(response.data);
      });

    setPostName("");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            placeholder="add post here"
            value={postName}
            onChange={(text) => {
              setPostName(text.target.value);
            }}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default PostAddForm;
