import { Dropdown } from "./Dropdown";
import { Searchbar } from "./Searchbar";

interface HeaderProps {
  country: string;
}

export const Header = ( { country }: HeaderProps ) => {
  return (
    <div className="flex flex-row justify-between items-center border-b-2 border-b-gray-300 py-5">
      <h1 className="font-bold text-lg">Atlas</h1>
      <div className="flex flex-row items-center gap-5">
        <Dropdown />
        <Searchbar />
      </div>
    </div>
  );
};