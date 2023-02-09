import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";

export const Card = () => {
  const context = useContext(UserContext);
  return (
    <div className="flex flex-col gap-2 bg-white bg-opacity-20 border-l-teal-100 border-l-4 p-5 fixed top-[68%] shadow-md">
      <p className="font-semibold text-lg text-white">{context.coordinates}</p>
      <p className="font-bold text-8xl text-white">{context.common}</p>
      <p className="font-medium text-2xl text-white">{context.official}</p>
    </div>
  );
};
