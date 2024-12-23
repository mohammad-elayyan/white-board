const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const server = require("http").createServer(app);
const { Server } = require("socket.io");

const io = new Server(server);

// routes
app.get("/", (req, res) => {
  res.send("Hello Wrld!");
  //   res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a new client connected");
});

server.listen(port, () =>
  console.log("server is running on http://localhost:5000")
);
