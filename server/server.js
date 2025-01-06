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

let roomIdGlobal, imgUrlGlobal;

io.on("connection", (socket) => {
  socket.on("userJoined", (data) => {
    const { name, userId, roomId, host, presenter } = data;
    roomIdGlobal = roomId;
    socket.join(roomId);
    socket.emit("userIsJoined", { success: true });
    socket.broadcast
      .to(roomId)
      .emit("whiteboardDataResponse", { imgUrl: imgUrlGlobal });
  });
});

io.on("whiteboardData", (data) => {
  imgUrlGlobal = data;
  socket.broadcast.to(roomIdGlobal).emit("whiteboardDataResponse", {
    imgUrl: data,
  });
});

server.listen(port, () =>
  console.log("server is running on http://localhost:5000")
);
