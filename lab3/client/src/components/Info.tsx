import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import { SiOpenstreetmap } from "react-icons/si";

export const Info = () => {
  const context = useContext(UserContext);
  return (
    <div className="flex flex-col gap-2 bg-white bg-opacity-20 border-l-teal-100 border-l-4 p-5 fixed top-[40%] shadow-md">
      <p className="font-medium text-2xl text-white">{context.choice}</p>
      {context.choice === "Map" ? (
        <a
          className="flex flex-row items-center gap-2 font-bold text-white overflow-y-scroll max-w-5xl max-h-24"
          href={context.map}
          target="_blank"
          rel="noreferrer"
        >
          <p className="font-semibold text-6xl"> View it on GoogleMaps</p>
          <SiOpenstreetmap className="font-semibold text-6xl" />
        </a>
      ) : (
        <p className="font-bold text-8xl text-white overflow-y-scroll max-w-5xl max-h-24">
          "{context.output}"
        </p>
      )}
      <p className="font-semibold text-lg text-white">
        Click on another button to change content.
      </p>
    </div>
  );
};
