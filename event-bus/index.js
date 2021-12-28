const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const events = [];
//get the event with api
app.post("/events", async (req, res) => {
  const event = req.body;
  events.push(event);
  console.log("event recieved to event bus and pushed to memory");
  console.log(events);
  //send the event to observers
  await axios.post("http://posts-cluster-ip-serv:4000/events", event); //post service
  // await axios.post("http://localhost:4001/events", event); //comment service
  // await axios.post("http://localhost:4002/events", event); //combined query service
  // await axios.post("http://localhost:4003/events", event); //comment moderation service

  res.json({ status: "success" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

//listning port
app.listen(4005, () => {
  console.log("listening on 4005");
});
