require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const router = express.Router();

app.use(express.json());

router.get("/images", (req, res) => {
  const query = req.query.country;
  const unsplashUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=AnMko8kHpKZElo1kkaM5hfmuVx2oFMH4ZX04sFd4Dzg`;

  fetch(unsplashUrl)
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

router.get("/all", (req, res) => {
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

router.get("/countries", (req, res) => {
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

router.put("/", (req, res) => {
  res.status(501).send("Not implemented");
});

router.post("/", (req, res) => {
  res.status(501).send("Not implemented");
});

router.delete("/", (req, res) => {
  res.status(501).send("Not implemented");
});

app.use("/api/v1", router);

app.listen(port, () => console.log(`Listening on port ${port}`));