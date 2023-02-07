import { BiSearch } from "react-icons/bi";

export const Searchbar = () => {
  return (
    <div className="flex flex-row items-center justify-between px-2 rounded-full shadow-md">
      <input className="h-7 text-sm text-gray-700 bg-transparent rounded-full focus:outline-none" type="search" name="search" placeholder="Search" />
      <button type="submit">
        <BiSearch className="w-6 h-6 text-gray-700" />
      </button>
    </div>
  );
};