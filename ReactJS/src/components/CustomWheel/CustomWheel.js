/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from "react";
import "./CustomWheel.css";

const CustomWheel = ({ selected, data, type, onDateChange }) => {
  const [position, setPosition] = useState(selected ? -(selected - 1) * 50 : 0);
  const positionRef = useRef(selected ? -(selected - 1) * 50 : 0);
  const [offset, setOffset] = useState(0);
  const offsetRef = useRef(0);
  const draggingRef = useRef(false);
  const previousYRef = useRef(0);

  useEffect(() => {
    if (!draggingRef.current && position !== -(selected - 1) * 50) {
      setPosition(-(selected - 1) * 50);
    }
  }, [selected, position]);

  const onMouseDown = (event) => {
    previousYRef.current = event.touches
      ? event.touches[0].clientY
      : event.clientY;
    draggingRef.current = true;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("touchmove", onMouseMove);
    document.addEventListener("touchend", onMouseUp);
  };

  const onMouseMove = (event) => {
    let clientY = event.touches ? event.touches[0].clientY : event.clientY;

    offsetRef.current = clientY - previousYRef.current;
    setOffset(offsetRef.current);
    let maxPosition = -data.length * 50;
    let pos = positionRef.current + offsetRef.current;
    positionRef.current = Math.max(maxPosition, Math.min(50, pos));
    setPosition(positionRef.current);
    previousYRef.current = event.touches
      ? event.touches[0].clientY
      : event.clientY;
  };

  const onMouseUp = () => {
    // calculate closeset snap
    let maxPosition = -(data.length - 1) * 50;
    let rounderPosition =
      Math.round((positionRef.current + offsetRef.current * 5) / 50) * 50;
    let finalPosition = Math.max(maxPosition, Math.min(0, rounderPosition));

    draggingRef.current = false;
    positionRef.current = finalPosition;
    setPosition(finalPosition);

    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    document.removeEventListener("touchmove", onMouseMove);
    document.removeEventListener("touchend", onMouseUp);

    onDateChange(type, -finalPosition / 50);
  };

  return (
    <div
      className="dragdealer year"
      onMouseDown={onMouseDown}
      onTouchStart={onMouseDown}
    >
      <ul
        className="handle"
        style={{
          willChange: "transform",
          transition: `transform ${Math.abs(offset) / 100 + 0.1}s`,
          transform: `translateY(${position}px)`,
        }}
      >
        {data.map((year) => (
          <li key={year}>{year}</li>
        ))}
      </ul>
    </div>
  );
};

export default CustomWheel;
