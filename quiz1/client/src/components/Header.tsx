import { Searchbar } from "./Searchbar";

export const Header = () => {
  return (
    <div className="flex flex-row justify-between items-center border-b-2 border-b-gray-300 py-5">
      <h1 className="font-bold text-lg">Uni Checker</h1>
      <div className="flex flex-row items-center gap-5">
        <Searchbar />
      </div>
    </div>
  );
};
