import React from "react";

const CreateRoomForm = () => {
  return (
    <form className="col-md-12 form mt-5">
      <div className="form-group my-2">
        <input
          type="text"
          className="form-control"
          placeholder="Enter your name"
        />
      </div>
      <div className="form-group my-2">
        <input
          type="text"
          className="form-control"
          placeholder="Enter room code"
        />
      </div>
      <button
        type="submit"
        className="mt-3 btn btn-primary d-block form-control"
      >
        Join Room
      </button>
    </form>
  );
};

export default CreateRoomForm;
