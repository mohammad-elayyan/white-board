const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const server = require("http").createServer(app);
const { Server } = require("socket.io");
const { addUser, getUser, removeUser } = require("./utils/users");

const io = new Server(server);

// In-memory storage for room data
const roomData = {};

// routes
app.get("/", (req, res) => {
  res.send("Hello World!");
  // res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("userJoined", (data) => {
    const { name, userId, roomId, host, presenter } = data;

    socket.join(roomId);

    const users = addUser({
      name,
      userId,
      roomId,
      host,
      presenter,
      socketId: socket.id,
    });

    // Initialize room data if not already present
    if (!roomData[roomId]) {
      roomData[roomId] = { imgUrl: "" };
    }

    // Emit user join events and current whiteboard data
    socket.emit("userIsJoined", { success: true, users });
    socket.broadcast.to(roomId).emit("userJoinedMessageBroadcasted", name);
    socket.broadcast.to(roomId).emit("allUsers", users);
    socket.emit("whiteboardDataResponse", { imgUrl: roomData[roomId].imgUrl });
  });

  socket.on("whiteboardData", (data) => {
    console.log("on whiteboardData");

    const user = getUser(socket.id);
    if (user) {
      roomData[user.roomId].imgUrl = data;
      socket.broadcast.to(user.roomId).emit("whiteboardDataResponse", {
        imgUrl: data,
      });
    }
  });
  socket.on("message", (data) => {
    const { message, id } = data; // Include unique ID from client
    const user = getUser(socket.id);

    if (user) {
      // Broadcast the message to all users in the room except the sender
      socket.broadcast.to(user.roomId).emit("messageResponse", {
        id, // Pass the unique ID
        message,
        name: user.name,
      });
    }
  });

  socket.on("disconnect", () => {
    const user = getUser(socket.id);
    if (user) {
      removeUser(socket.id);
      socket.broadcast
        .to(user.roomId)
        .emit("userLeftMessageBroadcasted", user.name);

      // Optionally, clean up room data if no users are left
      if (!io.sockets.adapter.rooms.get(user.roomId)) {
        delete roomData[user.roomId];
      }
    }
  });
});

server.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
