const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

//get the event with api
app.post("/events", async (req, res) => {
  const event = req.body;
  console.log("event recieved");
  //send the event to observers
  await axios.post("http://localhost:4000/events", event); //post service
  await axios.post("http://localhost:4001/events", event); //comment service
  await axios.post("http://localhost:4002/events", event); //combined query service

  res.json({ status: "success" });
});

//listning port
app.listen(4005, () => {
  console.log("listening on 4005");
});
