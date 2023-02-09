import React, { useContext, useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { UserContext } from "../App";


export const Searchbar = () => {
  const context = useContext(UserContext);
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (context.allCountries.includes(toCapitalCase(inputValue))) {
      context.setCountry(toCapitalCase(inputValue));
      setInputValue("");
    } else {
      alert("Enter a valid country name.");
    }
  }; 

  const toCapitalCase = (str: string) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    context.setOutput(context.capital);
  }, [context.capital]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-row items-center justify-between px-2 rounded-full shadow-md">
        <input 
          className="h-7 text-sm text-gray-700 bg-transparent rounded-full focus:outline-none focus:bg-white px-2" 
          type="search" 
          name="search" 
          placeholder="Search" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">
          <BiSearch className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </form>
  );
};
