import React, { useState, useContext } from "react";
import { AppContext } from "../App";

export const Form = () => {
  const context = useContext(AppContext);
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    context.setValue(Number(e.target.value));
  };

  const handleClear = () => {
    context.setValue(0);
  };

  return (
    <div>
      <input type="number" value={context.value} onChange={handleValueChange} />
      <button onClick={handleClear}>
        Clear
      </button>
    </div>
  );
};