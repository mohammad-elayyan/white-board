import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateRoomForm = ({ uuid, socket, setUser }) => {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleCreateRoom = (e) => {
    e.preventDefault();

    const roomData = {
      name,
      roomId,
      userId: uuid(),
      host: true,
      presenter: true,
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
      <div className="form-group my-2 d-flex align-items-center border">
        <input
          type="text"
          className="form-control border-0"
          placeholder="Generate room code"
          disabled
          value={roomId}
        />
        <div className="input-group-append d-flex gap-1">
          <button
            className="btn btn-primary btn-sm"
            type="button"
            title="generate code"
            onClick={() => setRoomId(uuid())}
          >
            <i className="bi bi-plus-circle"></i>
          </button>
          <button
            className="btn btn-secondary btn-sm me-1"
            type="button"
            title="copy code"
          >
            <i className="bi bi-copy"></i>
          </button>
        </div>
      </div>
      <button
        type="submit"
        className="mt-3 btn btn-primary d-block form-control"
        onClick={handleCreateRoom}
      >
        Generate Room
      </button>
    </form>
  );
};

export default CreateRoomForm;
