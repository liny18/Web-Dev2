import { DropdownMenu } from "./Dropdown/Dropdown";
import { Searchbar } from "./Searchbar";
import { Form } from "./Form";

export const Header = () => {
  return (
    <div className="flex flex-row justify-between items-center border-b-2 border-b-gray-300 py-5">
      <h1 className="font-bold text-lg">Atlas</h1>
      <div className="flex flex-row items-center gap-5">
        <Form />
        <DropdownMenu />
        <Searchbar />
      </div>
    </div>
  );
};
