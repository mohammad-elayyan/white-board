import React, { useRef, useState } from "react";
import WhiteBoard from "../../components/Whiteboard/Index";
import "./index.css";

const RoomPage = ({ roomId }) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("black");
  const [elements, setElements] = useState([]);

  const handleClearCanvas = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
  };
  return (
    <div className="row">
      <h1 className="text-center py-3">
        White Board Sharing App{" "}
        <span className="text-primary">[Online Users : 0]</span>
      </h1>
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
          <button className="btn btn-primary">undo</button>
          <button className="btn btn-btn-outline-primary">redo</button>
        </div>
        <div className="col-md-2 ">
          <button className="btn btn-danger" onClick={handleClearCanvas}>
            Clear Board
          </button>
        </div>
      </div>
      <div className="col-md-10 mx-auto mt-4 canvas-box">
        <WhiteBoard
          canvasRef={canvasRef}
          ctxRef={ctxRef}
          elements={elements}
          setElements={setElements}
          tool={tool}
          color={color}
        />
      </div>
    </div>
  );
};

export default RoomPage;
