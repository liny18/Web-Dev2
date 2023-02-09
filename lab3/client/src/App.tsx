import "./App.css";
import React, { useEffect, useState, useContext, createContext } from "react"
import { Header } from "./components/Header";
import { Navbar } from "./components/Navbar";
import { Card } from "./components/Card";
import { Info } from "./components/Info";

export const UserContext = createContext<{
  allCountries: string[];
  country: string;
  choice: string;
  output: string;
  population: string;
  timezones: string;
  continent: string;
  currency: string;
  capital: string;
  languages: string;
  map: string;
  setOutput: React.Dispatch<React.SetStateAction<string>>;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  setChoice: React.Dispatch<React.SetStateAction<string>>;
  setPopulation: React.Dispatch<React.SetStateAction<string>>;
  setContinent: React.Dispatch<React.SetStateAction<string>>;
  setTimezone: React.Dispatch<React.SetStateAction<string>>;
  setLanguages: React.Dispatch<React.SetStateAction<string>>;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
  setMap: React.Dispatch<React.SetStateAction<string>>;
  setCapital: React.Dispatch<React.SetStateAction<string>>;
}>({
  allCountries: [],
  country: "",
  choice: "",
  output: "",
  population: "",
  timezones: "",
  continent: "",
  currency: "",
  capital: "",
  languages: "",
  map: "",
  setOutput: () => {},
  setCountry: () => {},
  setChoice: () => {},
  setPopulation: () => {},
  setContinent: () => {},
  setTimezone: () => {},
  setLanguages: () => {},
  setCurrency: () => {},
  setMap: () => {},
  setCapital: () => {},
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
  const [allCountries, setAllCountries] = useState<string[]>([]);
  const [choice, setChoice] = useState<string>("Capital");
  const [output, setOutput] = useState<string>("Beijing");
  const [population, setPopulation] = useState<string>("1,439,323,776");
  const [continent, setContinent] = useState<string>("Asia");
  const [timezones, setTimezone] = useState<string>("UTC+08:00");
  const [languages, setLanguages] = useState<string>("Mandarin Chinese");
  const [currency, setCurrency] = useState<string>("Chinese yuan");
  const [map, setMap] = useState<string>(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Map_of_China_with_location_marker.svg/1200px-Map_of_China_with_location_marker.svg.png"
  );
  const [capital, setCapital] = useState<string>("Beijing");
  const randInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getAllTimezones = (list: string[]) => {
    let result = "";
    for (let i = 0; i < list.length; i++) {
      result += i === 0 ? list[i] : ", " + list[i];
    }
    return result;
  };

  const getAllLanguages = (languages: Record<string, string>) => {
    const all = Object.keys(languages);
    let result = "";
    for (let i = 0; i < all.length; i++) {
      result += i === 0 ? languages[all[i]] : ", " + languages[all[i]];
    }
    return result;
  };

  interface Currency {
    name: string;
    symbol: string;
  }
  
  interface Currencies {
    [currencyCode: string]: Currency;
  }

  const pickFirstCurrency = (currencies: Currencies) => {
    const currencyCode = Object.keys(currencies)[0];
    const currency = currencies[currencyCode];
    return currency.symbol + " " + currency.name;
  };
  

  const splitPopulation = (population: string) => {
    const split = population.split("");
    const result = [];
    for (let i = split.length - 1; i >= 0; i--) {
      if (i % 3 === 0 && i !== split.length - 1) {
        result.push(",");
      }
      result.push(split[i]);
    }
    return result.reverse().join("");
  };


  // useEffect(() => {
  //   try {
  //     const fetchImage = async (query: string) => {
  //       const response = await fetch(`/api/v1/images?country=${query}`);
  //       const data = await response.json();
  //       setImageUrl(data.results[
  //         randInt(0, data.results.length - 1)
  //       ].urls.full);
  //     };
  //     fetchImage(country);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [country]);

  const getAllCountries = (countries: Record<string, any>) => {
    const all = Object.keys(countries);
    let result: string[] = [];
    all.forEach((country) => {
      result.push(countries[country].name.common);
    })
    return result;
  };

  useEffect(() => {
    try {
      const fetchAll = async () => {
        const response = await fetch("/api/v1/all");
        const data = await response.json();
        setAllCountries(getAllCountries(data));
      };
      fetchAll();
    } catch (error) {
      console.log(error);
    }
  }, []);
        
  useEffect(() => {
    try {
      const fetchCountry = async (query: string) => {
        const response = await fetch(`/api/v1/countries?country=${query}`);
        const data = await response.json();
        setCoordinates(data[0].latlng.join("° N, ") + "° E");
        setOfficial(data[0].name.official);
        setPopulation(splitPopulation(data[0].population.toString()));
        setContinent(data[0].continents[0]);
        setTimezone(getAllTimezones(data[0].timezones));
        setLanguages(getAllLanguages(data[0].languages));
        setCurrency(pickFirstCurrency(data[0].currencies));
        setMap(data[0].maps.googleMaps);
        setCapital(data[0].capital[0]);
      };
      fetchCountry(country);
    } catch (error) {
      console.log(error);
    }
  }, [country]);


  return (
    <UserContext.Provider value={{ allCountries, country, choice, output, population, timezones, continent, currency, capital, languages, map, setOutput, setCountry, setChoice, setPopulation, setContinent, setTimezone, setLanguages, setCurrency, setMap, setCapital }}>
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
        <Navbar />
        <Info />
        <Card coordinates={coordinates} common={country} official={official} />
      </div>
    </UserContext.Provider>
  );
}

export default App;
