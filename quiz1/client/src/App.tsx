import "./App.css";
import React, { useEffect, useState, useContext, createContext } from "react";
import { Header } from "./components/Header";
import { Card } from "./components/Card";

export const UserContext = createContext<{
  coordinates: string;
  official: string;
  common: string;
  country: string;
  setCommon: React.Dispatch<React.SetStateAction<string>>;
  setOfficial: React.Dispatch<React.SetStateAction<string>>;
  setCoordinates: React.Dispatch<React.SetStateAction<string>>;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
}>({
  coordinates: "",
  official: "",
  common: "",
  country: "",
  setCommon: () => {},
  setOfficial: () => {},
  setCoordinates: () => {},
  setCountry: () => {},
});

function App() {
  const [imageUrl, setImageUrl] = useState<string>(
    "https://picsum.photos/1980/1080"
  );
  const [country, setCountry] = useState<string>("Rensselaer");
  const [coordinates, setCoordinates] = useState<string>("United States, US");
  const [common, setCommon] = useState<string>("Rensselaer Polytechnic Institute");
  const [official, setOfficial] = useState<string>(
    "https://www.rpi.edu/"
  );
  // const [allCountries, setAllCountries] = useState<string[]>([]);
  const randInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  useEffect(() => {
    try {
      const fetchImage = async (query: string) => {
        const response = await fetch(`/node/api/v1/images?country=${query}`);
        // const response = await fetch(`/api/v1/images?country=${query}`);
        const data = await response.json();
        setImageUrl(data.results[
          randInt(0, (data.results).length - 1)
        ].urls.full);
      };
      fetchImage(country);
    } catch (error) {
      console.log(error);
    }
  }, [country]);


  useEffect(() => {
    try {
      const fetchAll = async () => {
        const response = await fetch("/node/api/v1/all");
        // const response = await fetch("/api/v1/all");
        const data = await response.json();
      };
      fetchAll();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      const fetchCountry = async (query: string) => {
        const response = await fetch(`/node/api/v1/countries?country=${query}`);
        // const response = await fetch(`/api/v1/countries?country=${query}`);
        const data = await response.json();
        if (data.length === 0) {
          alert("Not a valid school, returning to RPI.");
          setCountry("Rensselaer");
          return;
        }
        setCoordinates(data[0].country + ", " + data[0].alpha_two_code);
        setOfficial(data[0].web_pages[0]);
        setCommon(data[0].name);
      };
      fetchCountry(country);
    } catch (error) {
      console.log(error);
    }
  }, [country]);

  return (
    <UserContext.Provider
      value={{
        country,
        setCountry,
        official,
        coordinates,
        common,
        setOfficial,
        setCoordinates,
        setCommon,
      }}
    >
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
        <Header />
        <Card />
      </div>
    </UserContext.Provider>
  );
}

export default App;
