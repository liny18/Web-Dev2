require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();

app.use(express.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER_URL}/?${process.env.MONGO_OPTIONS}`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function get100Countries() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries = await response.json();
    const sortedCountries = countries.sort((a, b) => b.population - a.population);
    const top100Countries = sortedCountries.slice(0, 100);
    const countryNames = top100Countries.map((country) => country.name.common);
    return countryNames;
  } catch (error) {
    console.error(error);
  }
}

async function populateDB() {
  try {
    await client.connect();
    const database = client.db("lab5");
    const collection = database.collection("countries");
    const countries = await get100Countries();
    for (let i = 0; i < 100; i++) {
      const countryObj = { name: countries[i] };
      await collection.insertOne(countryObj);
    }
  } catch (error) {
    console.error(error);
  }
  finally {
    await client.close();
  }
}

// app.use("/lab3",express.static('../client/dist'));

// router.get("/images", (req, res) => {
//   const query = req.query.country;
//   const unsplashUrl = `https://api.unsplash.com/search/photos?query=${query}`;

//   fetch(unsplashUrl, {
//     headers: {
//       Authorization: `Client-ID ${process.env.REACT_UNSPLASH_ACCESS_KEY}`,
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       res.status(200).json(data);
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).json({ error: "An error occurred while fetching data." });
//     }
//   );
// });

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