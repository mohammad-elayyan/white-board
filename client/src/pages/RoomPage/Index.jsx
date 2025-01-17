import React, { useRef, useState, useEffect } from "react";
import WhiteBoard from "../../components/Whiteboard/Index";
import "./index.css";
import Index from "../../components/chat/Index";

const RoomPage = ({ user, socket, users }) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("black");
  const [elements, setElements] = useState([]);
  const [undoElements, setUndoElements] = useState(elements);
  const [redoElements, setRedoElements] = useState([]);
  const [openedUserTap, setOpenedUserTap] = useState(false);
  const [openedChatTap, setOpenedChatTap] = useState(false);

  useEffect(() => {
    return () => {
      socket.emit("userLeft", user?.name);
      console.log(users);
    };
  }, []);

  const handleClearCanvas = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillRect = "white";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setUndoElements([...undoElements, { type: "clear" }]);
    setElements([""]);
    setTimeout(() => {
      setElements([]);
    }, 100);
    setRedoElements([]);
  };

  const handleUndo = () => {
    const newElements = [...undoElements];
    const delElements = [...redoElements];

    if (newElements.length > 0) {
      const undo = newElements.pop();
      delElements.push(undo);
      setUndoElements(newElements);
      setRedoElements(delElements);
      setElements(newElements);
      // setTimeout(() => {
      //   const canvasImage = canvasRef.current.toDataURL();
      //   socket.emit("whiteboardData", canvasImage);
      // }, 100);
    }
  };

  const handleRedo = () => {
    const newElements = [...elements];
    const delElements = redoElements;
    console.log(newElements);

    redoElements.map((ele, indx) => {
      if (indx === delElements.length - 1 && ele.type !== "clear") {
        delElements.pop();
        newElements.push(ele);
        setElements(newElements);
        setUndoElements(newElements);
        setRedoElements(delElements);
        // setTimeout(() => {
        //   const canvasImage = canvasRef.current.toDataURL();
        //   socket.emit("whiteboardData", canvasImage);
        // }, 100);
      } else if (indx === delElements.length - 1 && ele.type === "clear") {
        setRedoElements([]);
        handleClearCanvas();
      }
    });
  };

  return (
    <div className="row">
      <button
        className="btn btn-dark position-absolute"
        style={{ width: "100px", height: "40px", top: "5%", left: "2.5%" }}
        onClick={() => setOpenedUserTap(!openedUserTap)}
      >
        Users
      </button>
      <button
        className="btn btn-dark position-absolute"
        style={{ width: "100px", height: "40px", top: "5%", left: "8%" }}
        onClick={() => setOpenedChatTap(!openedChatTap)}
      >
        Chat
      </button>
      {openedUserTap && (
        <div className="col-md-4 position-fixed top-0 start-0 h-100 text-white bg-dark w-25 overflow-y-auto">
          <button
            className="btn btn-light w-100 my-4"
            onClick={() => setOpenedUserTap(!openedUserTap)}
          >
            close
          </button>

          {users?.map((u, index) => (
            <p key={index}>
              <i
                className="bi bi-circle-fill text-success me-2"
                style={{ fontSize: ".5rem" }}
              ></i>
              {u.name} {user.userId === u.userId && "(You)"}
            </p>
          ))}
        </div>
      )}
      {openedChatTap && (
        <Index setOpenedChatTap={setOpenedChatTap} socket={socket} />
      )}
      <h1 className="text-center py-3">
        White Board Sharing App{" "}
        <span className="text-primary">[Online Users : {users?.length}]</span>
      </h1>
      {user?.presenter && (
        <div className="col-md-10 gap-3 mx-auto my-2 py-1 d-flex justify-content-center align-items-center">
          <div className="col-md-3 d-flex justify-content-center gap-2">
            <div className="d-flex gap-1 align-items-center">
              <label htmlFor="pencil" className="mb-1">
                Pencil
              </label>
              <input
                id="pencil"
                type="radio"
                name="tool"
                value="pencil"
                checked={tool === "pencil"}
                onChange={(e) => setTool(e.target.value)}
              />
            </div>
            <div className="d-flex gap-1 align-items-center">
              <label htmlFor="line" className="mb-1">
                Line
              </label>
              <input
                id="line"
                type="radio"
                name="tool"
                value="line"
                checked={tool === "line"}
                onChange={(e) => setTool(e.target.value)}
              />
            </div>
            <div className="d-flex gap-1 align-items-center">
              <label htmlFor="rect" className="mb-1">
                Rect
              </label>
              <input
                id="rect"
                type="radio"
                name="tool"
                value="rect"
                checked={tool === "rect"}
                onChange={(e) => setTool(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-3 mx-auto">
            <div className="d-flex align-items-center">
              <label htmlFor="color">Select Color:</label>
              <input
                type="color"
                name="color"
                id="color"
                className="mt-1 ms-2"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-3 d-flex gap-2">
            <button
              className="btn btn-primary"
              onClick={handleUndo}
              disabled={undoElements.length === 0}
            >
              undo
            </button>
            <button
              className="btn btn-btn-outline-primary"
              onClick={handleRedo}
              disabled={redoElements.length === 0}
            >
              redo
            </button>
          </div>
          <div className="col-md-2 ">
            <button className="btn btn-danger" onClick={handleClearCanvas}>
              Clear Board
            </button>
          </div>
        </div>
      )}
      <div className="col-md-10 mx-auto mt-4 canvas-box">
        <WhiteBoard
          canvasRef={canvasRef}
          ctxRef={ctxRef}
          elements={elements}
          setElements={setElements}
          tool={tool}
          color={color}
          setUndoElements={setUndoElements}
          setRedoElements={setRedoElements}
          user={user}
          socket={socket}
        />
      </div>
    </div>
  );
};

export default RoomPage;
