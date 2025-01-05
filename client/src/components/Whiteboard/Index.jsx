import React, { useEffect, useLayoutEffect, useState } from "react";
import rough from "roughjs";
import { RoughCanvas } from "roughjs/bin/canvas";

const roughGenerator = rough.generator();

const WhiteBoard = ({
  canvasRef,
  ctxRef,
  elements,
  setElements,
  tool,
  color,
}) => {
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    const ctx = canvas.getContext("2d");
    ctx.strokeWidth = 5;
    // ctx.scale(2, 2);
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctxRef.current = ctx;
  }, []);

  useEffect(() => {
    ctxRef.current.strokeStyle = color;
  }, [color]);

  useLayoutEffect(() => {
    const roughCanvas = rough.canvas(canvasRef.current);
    if (elements.length > 0) {
      ctxRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    }
    elements.forEach((ele) => {
      if (ele.type === "rect") {
        roughCanvas.draw(
          roughGenerator.rectangle(
            ele.offsetX,
            ele.offsetY,
            ele.width,
            ele.height,
            {
              stroke: ele.stroke,
              roughness: 0,
              strokeWidth: 5,
            }
          )
        );
      } else if (ele.type === "line") {
        roughCanvas.draw(
          roughGenerator.line(ele.offsetX, ele.offsetY, ele.width, ele.height, {
            stroke: ele.stroke,
            roughness: 0,
            strokeWidth: 5,
          })
        );
      } else if (ele.type === "pencil") {
        roughCanvas.linearPath(ele.path, {
          stroke: ele.stroke,
          roughness: 0,
          strokeWidth: 5,
        });
      }
      const canvasImage = canvasRef.current.toDataURL();
    });
  }, [elements]);

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
          stroke: color,
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
          stroke: color,
        },
      ]);
    } else if (tool === "rect") {
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "rect",
          offsetX,
          offsetY,
          width: 0,
          height: 0,
          stroke: color,
        },
      ]);
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
      setElements((prevElements) =>
        prevElements.map((ele, indx) => {
          if (indx === elements.length - 1) {
            return {
              ...ele,
              width: offsetX - ele.offsetX,
              height: offsetY - ele.offsetY,
            };
          } else {
            return ele;
          }
        })
      );
    }
  };
  const handleMouseUp = (e) => {
    setIsDrawing(false);
  };
  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="border border-2 border-dark h-100 w-100 overflow-hidden"
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

export default WhiteBoard;
