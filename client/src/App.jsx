import { useEffect, useState } from "react";
import "./App.css";
import Forms from "./components/Forms/Index";
import { Route, Routes } from "react-router-dom";
import RoomPage from "./pages/RoomPage/Index";
import io from "socket.io-client";

const server = "http://localhost:5000/";
const connectionOptions = {
  "dorce new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
  // reconnectInterval: 4000,
  // maxReconnectAttempts: 100,
  // debug: true,
  // autoConnect: true,
};
const socket = io(server, connectionOptions);

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    socket.on("userIsJoined", (data) => {
      if (data.success) {
        console.log("userJoined");
      } else {
        console.log("userJoined error");
      }
    });
  }, []);

  const uuid = () => {
    var S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  };
  return (
    <div className="container">
      <Routes>
        <Route
          path="/"
          element={<Forms uuid={uuid} socket={socket} setUser={setUser} />}
        />
        <Route
          path="/:roomId"
          element={<RoomPage user={user} socket={socket} />}
        />
      </Routes>
    </div>
  );
};

export default App;
