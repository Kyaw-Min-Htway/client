import React from 'react';
import { TbUserCircle } from "react-icons/tb";

function Avatar({ userId, name, ImageURL, width, height }) {
  let avatarName = "";

  if (name) {
    const splitName = name.split(" ");
    if (splitName.length > 1) {
      avatarName = splitName[0][0] + splitName[1][0];
    } else {
      avatarName = splitName[0][0];
    }
  }

  const bgColor = [
    "bg-slate-200",
    "bg-teal-200",
    "bg-red-200",
    "bg-green-200",
    "bg-yellow-200",
    "bg-gray-200",
    "bg-cyan-200",
    "bg-sky-200",
    "bg-blue-200"
  ];

  // Use userId for consistent color selection or fallback to random
  const colorIndex = userId ? userId % bgColor.length : Math.floor(Math.random() * bgColor.length);

  return (
    <div
      className={`text-slate-800 overflow-hidden rounded-full shadow border text-xl font-bold ${bgColor[colorIndex]}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {ImageURL ? (
        <img
          src={ImageURL}
          width={width}
          height={height}
          alt={name || "Avatar"}
          style={{ objectFit: "cover" }}
        />
      ) : name ? (
        <div
          className="overflow-hidden rounded-full flex justify-center items-center"
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          {avatarName}
        </div>
      ) : (
        <TbUserCircle size={width} />
      )}
    </div>
  );
}

export default Avatar;
