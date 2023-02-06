import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState<any>([{}]);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <div className="App">
      {typeof data.users === "undefined" ? (
        <p>loading...</p>
      ) : (
        data.users.map((user: any, index: number) => {
          return <p key={index}>{user}</p>;
        })
      )}
    </div>
  );
}

export default App;
