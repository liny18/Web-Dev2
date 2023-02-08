import "./App.css";
import React, { useEffect, useState, useContext, createContext } from "react"
import { Header } from "./components/Header";
import { Navbar } from "./components/Navbar";
import { Card } from "./components/Card";
import { Info } from "./components/Info";

export const UserContext = createContext<{
  setCountry: React.Dispatch<React.SetStateAction<string>>;
}>({
  setCountry: () => {},
});

function App() {
  const [imageUrl, setImageUrl] = useState<string>(
    "https://picsum.photos/1980/1080"
  );
  const [country, setCountry] = useState<string>("China");
  const [coordinates, setCoordinates] = useState<string>("35° N, 105° E");
  const [official, setOfficial] = useState<string>(
    "People's Republic of China"
  );
  const [population, setPopulation] = useState<string>("1,439,323,776");
  const [continent, setContinent] = useState<string>("Asia");
  const [timezones, setTimezone] = useState<string[]>(["UTC+08:00"]);
  const [languages, setLanguages] = useState<string[]>(["Mandarin Chinese"]);
  const [currency, setCurrency] = useState<string>("Chinese yuan");
  const [map, setMap] = useState<string>(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Map_of_China_with_location_marker.svg/1200px-Map_of_China_with_location_marker.svg.png"
  );
  const [capital, setCapital] = useState<string>("Beijing");
  const randInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  useEffect(() => {
    const fetchImage = async (query: string) => {
      const response = await fetch(`/api/v1/images?country=${query}`);
      const data = await response.json();
      setImageUrl(data.results[
        randInt(0, data.results.length - 1)
      ].urls.full);
    };

    fetchImage(country);
  }, [country]);

  useEffect(() => {
    const fetchCountry = async (query: string) => {
      const response = await fetch(`/api/v1/countries?country=${query}`);
      const data = await response.json();
      setCoordinates(data[0].latlng.join("° N, ") + "° E");
      setOfficial(data[0].name.official);
    };

    fetchCountry(country);
  }, [country]);

  return (
    <UserContext.Provider value={{ setCountry }}>
      <div
        className="App rounded-3xl px-20 overflow-hidden relative"
        style={{
          backgroundImage: `url(${imageUrl})`,
          height: "93vh",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <Header country={country} />
        <Navbar
          population={population}
          timezones={timezones}
          continent={continent}
          currency={currency}
          map={map}
          capital={capital}
          languages={languages}
        />
        <Card coordinates={coordinates} common={country} official={official} />
        <Info />
      </div>
    </UserContext.Provider>
  );
}

export default App;
