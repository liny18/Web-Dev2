import React, { useContext, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { UserContext } from "../App";

interface SearchbarProps {
  setCountry: React.Dispatch<React.SetStateAction<string>>;
}

export const Searchbar = ({ setCountry }: SearchbarProps) => {
  const context = useContext(UserContext);
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    context.setCountry(inputValue);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-row items-center justify-between px-2 rounded-full shadow-md">
        <input 
          className="h-7 text-sm text-gray-700 bg-transparent rounded-full focus:outline-none" 
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
