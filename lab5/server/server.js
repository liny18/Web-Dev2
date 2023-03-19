require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();

app.use(express.json());
// app.use("/lab3",express.static('../client/dist'));

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER_URL}/?${process.env.MONGO_OPTIONS}`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function get100Countries() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const countries = await response.json();
    const sortedCountries = countries.sort(
      (a, b) => b.population - a.population
    );
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
      const countryObj = { id: i + 1, name: countries[i] };
      await collection.insertOne(countryObj);
    }
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

router.get("/db/:number?", async (req, res) => {
  try {
    const number = req.params.number;
    await client.connect();
    const database = client.db("lab5");
    const collection = database.collection("countries");

    if (number) {
      const country = await collection.findOne({ id: parseInt(number) });
      if (!country) {
        res.status(404).json({ error: "Country not found" });
      } else {
        res.status(200).json(country);
      }
    } else {
      const countries = await collection.find({}).toArray();
      res.status(200).json(countries);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  } finally {
    await client.close();
  }
});

router.post("/db/:number?", async (req, res) => {
  const number = req.params.number;
  if (number) {
    res.status(400).json({ error: "POST request not allowed on /db/:number" });
  } else {
    try {
      const newCountry = req.body;
      await client.connect();
      const database = client.db("lab5");
      const collection = database.collection("countries");
      const result = await collection.insertOne(newCountry);
      res.status(201).json(result.ops[0]);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while adding the country." });
    } finally {
      await client.close();
    }
  }
});

router.put("/db/:number?", async (req, res) => {
  const number = req.params.number;
  const updates = req.body;
  try {
    await client.connect();
    const database = client.db("lab5");
    const collection = database.collection("countries");

    if (number) {
      const result = await collection.updateOne(
        { id: parseInt(number) },
        { $set: updates }
      );
      if (result.modifiedCount === 0) {
        res.status(404).json({ error: "Country not found" });
      } else {
        res.status(200).json({ message: "Country updated successfully" });
      }
    } else {
      const result = await collection.updateMany({}, { $set: updates });
      res
        .status(200)
        .json({ message: `Updated ${result.modifiedCount} countries` });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the country." });
  } finally {
    await client.close();
  }
});

router.delete("/db/:number?", async (req, res) => {
  const number = req.params.number;
  try {
    await client.connect();
    const database = client.db("lab5");
    const collection = database.collection("countries");

    if (number) {
      await collection.deleteOne({ id: parseInt(number) });
      res.status(200).json({ message: "Country deleted successfully" });
    } else {
      await collection.deleteMany({});
      res.status(200).json({ message: "All countries deleted successfully" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the country." });
  } finally {
    await client.close();
  }
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
});

router.delete("/delete", (req, res) => {
  try {
    res.status(200).send("Delete request received");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
});

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

app.use("/api/v1", router);
app.listen(port, () => console.log(`Listening on port ${port}`));
