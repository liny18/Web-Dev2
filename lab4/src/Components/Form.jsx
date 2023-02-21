import { useState } from "react";
import { Timer } from "./Timer";

export const Form = ( props ) => {
  const [clicked, setClicked] = useState(false);
  const { setStarted, name, setName, seconds, setSeconds } = props;

  const handleSubmit = (e) => {
    if (name === "") {
      alert("What's your gamer tag?");
      return;
    }
    if (seconds === "") {
      setSeconds(60);
    }
    else if (seconds < 1 || seconds > 100) {
      alert("Please enter a number between 1 and 100");
      return;
    }
    setClicked(true);
    setStarted(true);
  };

  return (
    <div>
      {clicked ? <Timer name={name}/> :
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            className="border-2 border-black dark:border-white rounded-md p-2 bg-gray-100 dark:bg-gray-800"
            type="text"
            value={name}
            placeholder="Enter your gamer tag"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border-2 border-black dark:border-white rounded-md p-2 bg-gray-100 dark:bg-gray-800"
            type="number"
            value={seconds}
            placeholder="Time in seconds"
            onChange={(e) => setSeconds(Number(e.target.value))}
          />
        </div>
        <button className="bg-slate-300 dark:bg-slate-700 text-slate-900 dark:text-slate-100 font-bold py-3 px-4 mt-3 rounded" onClick={handleSubmit}>
          Start
        </button>
      </div>
      }
    </div>
  );
};
