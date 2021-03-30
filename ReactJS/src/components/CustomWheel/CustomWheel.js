/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./CustomWheel.css";

const CustomWheel = ({ selected, onDateChange, type, data }) => {
  const [position, setPosition] = useState(-(selected - 1) * 50);
  const [dragging, setDragging] = useState(false);
  const [previousY, setPreviousY] = useState(0);
  const [offset, setOffset] = useState(0);
  const [clientY, setClientY] = useState(0);

  useEffect(() => {
    if (!dragging && position !== -(selected - 1) * 50) {
      setPosition(-(selected - 1) * 50);
    }
  }, [selected, position]);

  useEffect(() => {
    setOffset(clientY - previousY);
    setPreviousY(clientY);
    let maxPosition = -data.length * 50;
    let pos = position + offset;
    setPosition(Math.max(maxPosition, Math.min(50, pos)));
  }, [clientY]);

  const onMouseDown = (event) => {
    let clientY = event.touches ? event.touches[0].clientY : event.clientY;
    setPreviousY(clientY);
    setDragging(true);
  };

  const onMouseMove = (event) => {
    let clientY = event.touches ? event.touches[0].clientY : event.clientY;
    setClientY(clientY);
  };

  const onMouseUp = () => {
    let maxPosition = -(data.length - 1) * 50;
    let rounderPosition = Math.round((position + offset * 5) / 50) * 50;
    let finalPosition = Math.max(maxPosition, Math.min(0, rounderPosition));

    setDragging(false);
    setPosition(finalPosition);
    onDateChange(type, -finalPosition / 50);
  };

  const inlineStyle = {
    willChange: "transform",
    transition: `transform ${Math.abs(offset) / 100 + 0.1}s`,
    transform: `translateY(${position}px)`,
  };

  return (
    <div
      className="dragdealer year"
      onMouseDown={onMouseDown}
      onTouchStart={onMouseDown}
      onTouchMove={onMouseMove}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onTouchEnd={onMouseUp}
    >
      <ul className="handle" style={inlineStyle}>
        {data.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default CustomWheel;
