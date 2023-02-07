require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get("/api/v1/images", (req, res) => {
  const query = req.query.country;
  const unsplashUrl = `https://api.unsplash.com/search/photos?query=${query}`;

  fetch(unsplashUrl, {
    headers: {
      Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
    },
  })
    .then((response) => response.json())
    .then((data) => res.json(data))
    .catch((error) => console.error(error));
});

app.get("/api/v1/countries", (req, res) => {
  const query = req.query.country;
  const Url = `https://restcountries.com/v3.1/name/${query}?fullText=true`;

  fetch(Url)
    .then((response) => response.json())
    .then((data) => res.json(data))
    .catch((error) => console.error(error));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
