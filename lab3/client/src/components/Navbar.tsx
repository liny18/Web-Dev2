import React, { useContext, useState } from "react";
import { UserContext } from "../App";

export const Navbar = () => {
  const context = useContext(UserContext);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    context.setChoice(event.currentTarget.value);
    switch (event.currentTarget.value) {
      case "Population":
        context.setOutput(context.population);
        break;
      case "Timezone":
        context.setOutput(context.timezones);
        break;
      case "Continent":
        context.setOutput(context.continent);
        break;
      case "Currency":
        context.setOutput(context.currency);
        break;
      case "Map":
        context.setOutput(context.map);
        break;
      case "Capital":
        context.setOutput(context.capital);
        break;
      case "Languages":
        context.setOutput(context.languages);
        break;
      default:
        context.setOutput(context.population);
    }
  };

  return (
    <div>
      <ul className="flex flex-row justify-between mt-5 font-semibold">
        <li>
          <button value="Capital" onClick={handleClick}>
            Capital
          </button>
        </li>
        <li>
          <button value="Languages" onClick={handleClick}>
            Languages
          </button>
        </li>
        <li>
          <button value="Population" onClick={handleClick}>
            Population
          </button>
        </li>
        <li>
          <button value="Currency" onClick={handleClick}>
            Currency
          </button>
        </li>
        <li>
          <button value="Timezone" onClick={handleClick}>
            Timezone
          </button>
        </li>
        <li>
          <button value="Continent" onClick={handleClick}>
            Continent
          </button>
        </li>
        <li>
          <button value="Map" onClick={handleClick}>
            Map
          </button>
        </li>
      </ul>
    </div>
  );
};