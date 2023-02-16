require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");

app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.get("/api/v1/images", (req, res) => {
  const query = req.query.country;
  const unsplashUrl = `https://api.unsplash.com/search/photos?query=${query}`;

  fetch(unsplashUrl, {
    headers: {
      Authorization: `Client-ID ${process.env.REACT_UNSPLASH_ACCESS_KEY}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "An error occurred while fetching data." });
    }
  );
});

app.get("/api/v1/all", (req, res) => {
  const Url = "https://restcountries.com/v3.1/all";

  fetch(Url)
    .then((response) => response.json())
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "An error occurred while fetching data." });
    });
});

app.get("/api/v1/countries", (req, res) => {
  const query = req.query.country;
  const Url = `https://restcountries.com/v3.1/name/${query}?fullText=true`;

  fetch(Url)
    .then((response) => response.json())
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "An error occurred while fetching data." });
    });
});

app.put("/api/v1", (req, res) => {
  try {
  res.status(200).send("Put request received");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
});

app.post("/api/v1", (req, res) => {
  try {
    res.status(200).send("Post request received");
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
});

app.delete("/api/v1", (req, res) => {
  try {
    res.status(200).send("Delete request received");
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));