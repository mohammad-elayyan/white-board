import React from "react";

const JoinRoomForm = () => {
  return (
    <form className="col-md-12 form mt-5">
      <div className="form-group my-2">
        <input
          type="text"
          className="form-control"
          placeholder="Enter your name"
        />
      </div>
      <div className="form-group my-2 d-flex align-items-center border">
        <input
          type="text"
          className="form-control border-0"
          placeholder="Generate room code"
          disabled
        />
        <div className="input-group-append d-flex gap-1">
          <button
            className="btn btn-primary btn-sm"
            type="button"
            title="generate code"
          >
            <i class="bi bi-plus-circle"></i>
          </button>
          <button
            className="btn btn-secondary btn-sm me-1"
            type="button"
            title="copy code"
          >
            <i class="bi bi-copy"></i>
          </button>
        </div>
      </div>
      <button
        type="submit"
        className="mt-3 btn btn-primary d-block form-control"
      >
        Generate Room
      </button>
    </form>
  );
};

export default JoinRoomForm;
