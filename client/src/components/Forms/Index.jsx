import CreateRoomForm from "./CreateRoomForm/Index";
import "./index.css";
import JoinRoomForm from "./JoinRoomForm/Index";

const Forms = ({ uuid, socket, setUser }) => {
  return (
    <div className="row h-100 pt-5">
      <div className="col-md-4 form-box mt-5 py-3 px-4 border border-primary rounded-2 d-flex align-items-center justify-content-start flex-column mx-auto">
        <h1 className="text-primary fw-bold">Create Room </h1>
        <CreateRoomForm uuid={uuid} socket={socket} setUser={setUser} />
      </div>
      <div className="col-md-4 form-box mt-5 py-3 px-4 border border-primary rounded-2 d-flex align-items-center justify-content-start flex-column mx-auto">
        <h1 className="text-primary fw-bold">Join Room </h1>
        <JoinRoomForm uuid={uuid} socket={socket} setUser={setUser} />
      </div>
    </div>
  );
};
export default Forms;
