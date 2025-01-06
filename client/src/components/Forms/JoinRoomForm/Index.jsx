import React from "react";
import { useNavigate } from "react-router-dom";

const JoinRoomForm = ({ uuid, socket, setUser }) => {
  const [roomId, setRoomId] = React.useState("");
  const [name, setName] = React.useState("");

  const navigate = useNavigate();

  const handleRoomJoin = (e) => {
    e.preventDefault();
    const roomData = {
      name,
      roomId,
      userId: uuid(),
      host: false,
      presenter: false,
    };
    setUser(roomData);
    navigate(`/${roomId}`);
    socket.emit("userJoined", roomData);
  };

  return (
    <form className="col-md-12 form mt-5">
      <div className="form-group my-2">
        <input
          type="text"
          className="form-control"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group my-2">
        <input
          type="text"
          className="form-control"
          placeholder="Generate room code"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="mt-3 btn btn-primary d-block form-control"
        onClick={handleRoomJoin}
      >
        Join Room
      </button>
    </form>
  );
};

export default JoinRoomForm;
