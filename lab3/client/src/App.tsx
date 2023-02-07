import "./App.css";
import React, { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Navbar } from "./components/Navbar";
import { Card } from "./components/Card";

function App() {
  const [imageUrl, setImageUrl] = useState<string>("https://picsum.photos/1980/1080");
  const [country, setCountry] = useState<string>("United States");
  const [coordinates, setCoordinates] = useState<string>("38.0° N, -97.0° E");
  const [official, setOfficial] = useState<string>("United States of America");
  const randInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // useEffect(() => {
  //   const fetchImage = async () => {
  //     const response = await fetch("api/images/${country}");
  //     const data = await response.json();
  //     setImageUrl(data.results[
  //       randInt(0, data.results.length - 1)
  //     ].urls.full);
  //   };

  //   fetchImage();
  // }, []);

  return (
    <div className="App rounded-3xl px-20 overflow-hidden" style={{
      backgroundImage: `url(${imageUrl})`,
      height: "93vh",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center"
    }}>
      <Header country={country}/>
      <Navbar />
      <Card coordinates={coordinates} common={country} official={official} />
    </div>
  );
}

export default App;
