import { useState } from 'react';

export const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  return (
    <div>
      <button onClick={toggleDropdown}>Toggle Dropdown</button>
      {isOpen && <div>Dropdown Content</div>}
    </div>
  );
};