import React, { useEffect, useLayoutEffect, useState } from "react";
import rough from "roughjs";
import { RoughCanvas } from "roughjs/bin/canvas";

const roughGenerator = rough.generator();

const WhiteBoard = ({ canvasRef, ctxRef, elements, setElements, tool }) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;
  }, []);

  useLayoutEffect(() => {
    const roughCanvas = rough.canvas(canvasRef.current);
    elements.forEach((ele) => {
      if (ele.type === "pencil") {
        roughCanvas.linearPath(ele.path);
      } else if (ele.type === "line") {
        roughCanvas.draw(
          roughGenerator.line(ele.offsetX, ele.offsetY, ele.width, ele.height)
        );
      } else if (ele.type === "rect") {
      }
    });
  }, [elements]);

  const [isDrawing, setIsDrawing] = useState(false);

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const { offsetX, offsetY } = e.nativeEvent;

    if (tool === "pencil") {
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "pencil",
          offsetX,
          offsetY,
          path: [[offsetX, offsetY]],
          stroke: "black",
        },
      ]);
    } else if (tool === "line") {
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "line",
          offsetX,
          offsetY,
          width: offsetX,
          height: offsetY,
          stroke: "black",
        },
      ]);
    } else if (tool === "rect") {
    }
  };
  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;

    if (tool === "pencil") {
      const { path } = elements[elements.length - 1];
      const newPath = [...path, [offsetX, offsetY]];
      setElements((prevElements) =>
        prevElements.map((ele, indx) => {
          if (indx === elements.length - 1) {
            return { ...ele, path: newPath };
          } else {
            return ele;
          }
        })
      );
    } else if (tool === "line") {
      setElements((prevElements) =>
        prevElements.map((ele, indx) => {
          if (indx === elements.length - 1) {
            return { ...ele, width: offsetX, height: offsetY };
          } else {
            return ele;
          }
        })
      );
    } else if (tool === "rect") {
    }
  };
  const handleMouseUp = (e) => {
    setIsDrawing(false);
    console.log("mouse up", e);
  };
  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="border border-2 border-dark h-100 w-100"
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

export default WhiteBoard;
