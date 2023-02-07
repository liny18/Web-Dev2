interface NavbarProps {
  population: string;
  timezones: string[];
  continent: string;
  currency: string;
  map: string;
  capital: string;
  languages: string[];
}

export const Navbar = ( { population, timezones, continent, currency, map, capital, languages }: NavbarProps ) => {
  return (
    <div>
      <ul className="flex flex-row justify-between mt-5 font-medium">
        <li>Population</li>
        <li>Timezone</li>
        <li>Continents</li>
        <li>Currency</li>
        <li>Map</li>
        <li>Capital</li>
        <li>Languages</li>
      </ul>
    </div>
  );
};