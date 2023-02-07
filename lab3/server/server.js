require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get("/api/images/:query", (req, res) => {
  const query = req.params.query;
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

app.get("/api/v1", (req, res) => {
  res.json({ users: ["user1", "user2", "user3", "user4"] });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
