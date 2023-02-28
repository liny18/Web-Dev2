const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();

app.use(express.json());

app.use("/quiz1",express.static('../client/dist'));

router.get("/images", (req, res) => {
  const query = req.query.country;
  const unsplashUrl = `https://api.unsplash.com/search/photos?query=${query}`;

  fetch(unsplashUrl, {
    headers: {
      Authorization: `Client-ID AnMko8kHpKZElo1kkaM5hfmuVx2oFMH4ZX04sFd4Dzg`,
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

router.get("/all", (req, res) => {
  const Url = "http://universities.hipolabs.com";
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
  const Url = `http://universities.hipolabs.com/search?name=${query}`;
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

router.put("/put", (req, res) => {
  try {
  res.status(200).send("Put request received");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
});

router.post("/post", (req, res) => {
  try {
    res.status(200).send("Post request received");
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
});

router.delete("/delete", (req, res) => {
  try {
    res.status(200).send("Delete request received");
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
});


app.use("/api/v1", router);
app.listen(port, () => console.log(`Listening on port ${port}`));