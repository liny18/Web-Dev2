require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();

app.use(express.json());
app.use("/lab7", express.static("../client/dist"));

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

async function fetchData(
  url,
  method = "GET",
  body = {},
  params = {},
  headers = {}
) {
  // Convert the params object to a query string
  const queryString = new URLSearchParams(params).toString();

  // Append the query string to the URL if it exists
  const requestUrl = queryString ? `${url}?${queryString}` : url;

  const response = await fetch(requestUrl, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: method === "POST" ? JSON.stringify(body) : undefined,
  });

  return await response.json();
}

function buildCountryObject(name, capital, currency, code) {
  return {
    name,
    capital,
    currency,
    code,
  };
}

async function countriesnowAPI(country) {
  try {
    const capitalData = await fetchData(
      "https://countriesnow.space/api/v0.1/countries/capital",
      "POST",
      { country }
    );
    const currencyData = await fetchData(
      "https://countriesnow.space/api/v0.1/countries/currency",
      "POST",
      { country }
    );
    const codeData = await fetchData(
      "https://countriesnow.space/api/v0.1/countries/iso",
      "POST",
      { country }
    );
    console.log(
      buildCountryObject(
        country,
        capitalData.data.capital,
        currencyData.data.currency,
        codeData.data.Iso2
      )
    );

    return buildCountryObject(
      country,
      capitalData.data.capital,
      currencyData.data.currency,
      codeData.data.Iso2
    );
  } catch (error) {
    console.error(error);
  }
}

async function NinjaAPI(country) {
  try {
    const data = await fetchData(
      "https://api.api-ninjas.com/v1/country",
      "GET",
      {},
      { name: country },
      { "X-Api-Key": process.env.REACT_NINJA_API_KEY }
    );
    return buildCountryObject(
      country,
      data[0].capital,
      data[0].currency.code,
      data[0].iso2
    );
  } catch (error) {
    console.error(error);
  }
}

async function CountryAPI(country) {
  try {
    const data = await fetchData(
      `https://countryapi.io/api/name/${country}`,
      "GET",
      {},
      { apikey: process.env.REACT_COUNTRY_API_KEY }
    );
    return buildCountryObject(
      country,
      data[key].capital,
      Object.keys(data[key].currencies)[0],
      data[key].alpha2Code
    );
  } catch (error) {
    console.error(error);
  }
}

async function RestAPI(country) {
  try {
    const data = await fetchData(
      `https://restcountries.com/v3.1/name/${country}`,
      "GET",
      {},
      { fullText: "true" }
    );

    return buildCountryObject(
      data[0].name.common,
      data[0].capital[0],
      Object.keys(data[0].currencies)[0],
      data[0].cca2
    );
  } catch (error) {
    console.error(error);
  }
}

async function populateDB() {
  try {
    await client.connect();
    const countries = await get100Countries();
    const database = client.db("lab6");
    const collection = database.collection("countries");
    let id = 1;
    for (let i = 0; i < 100; i++) {
      const apiResults = await Promise.allSettled([
        countriesnowAPI(countries[i]),
        NinjaAPI(countries[i]),
        CountryAPI(countries[i]),
        RestAPI(countries[i]),
      ]);

      for (const result of apiResults) {
        if (result.status === "fulfilled" && result.value) {
          const country = result.value;
          await collection.insertOne({
            id,
            name: country.name,
            capital: country.capital,
            currency: country.currency,
            code: country.code,
          });
          id++;
        } else {
          console.error(`Failed API result for country: ${countries[i]}`);
        }
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

// populateDB();

router.get("/db/:number?", async (req, res) => {
  try {
    const number = req.params.number;
    await client.connect();
    const database = client.db("lab6");
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
      const database = client.db("lab6");
      const collection = database.collection("countries");
      const result = await collection.insertOne(newCountry);
      console.log(result.ops);
      res.status(201).json({ message: "Country added successfully" });
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
    const database = client.db("lab6");
    const collection = database.collection("countries");
    if (number) {
      const existingCountry = await collection.findOne({
        id: parseInt(number),
      });
      if (!existingCountry) {
        res.status(404).json({ error: "Country not found" });
      } else {
        const result = await collection.updateOne(
          { id: parseInt(number) },
          { $set: updates }
        );
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
    const database = client.db("lab6");
    const collection = database.collection("countries");

    if (number) {
      const result = await collection.deleteOne({ id: parseInt(number) });
      if (result.deletedCount === 0) {
        res.status(404).json({ error: "Country not found" });
      } else {
        res.status(200).json({ message: "Country deleted successfully" });
      }
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

router.get("/images", (req, res) => {
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
    });
});

app.use("/api/v1", router);
app.listen(port, () => console.log(`Listening on port ${port}`));
