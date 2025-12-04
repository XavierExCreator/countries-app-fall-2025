/* --------------------------------
Server/API for Countries App Version 4

DB Fiddle Link: https://www.db-fiddle.com/f/3emK8kvTvDu5M3L3op9yGa/8
----------------------------------*/

/*----------------------------------
Boilerplate Code to Set Up Server
----------------------------------*/
import express from "express";
import pg from "pg";
import config from "./config.js";

const db = new pg.Pool({
    connectionString: process.env.DATABASE_URL, //credential to access the database. Keep this part private in the gitignore file section
    ssl: true //use SSL encryption when connecting to the database
    });

const app = express()

app.use(express.json());

const port = 3000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}!`);
    });
/*----------------------------------
Helper Functions
----------------------------------*/
/*
The helper functions here aide the endpoints using an async and await feature within the function in order to query using SQL. These will tell what the endpoints should do when they're called and return data that is needed for the endpoints to delete, get, post etc
*/
async function getNewestUser() {
    const data = await db.query("SELECT * FROM users ORDER BY user_id DESC LIMIT 1");
    return data.rows;
}

async function getAllUsers() {
    const data = await db.query("SELECT * FROM users;");
    return data.rows;
}

async function addOneUser(name, country_name, email, bio) {
    const data = await db.query("INSERT INTO users (name, country_name, email, bio) VALUES ($1, $2, $3, $4) RETURNING *", [name, country_name, email, bio]);
    return data.rows;
}

async function getAllSavedCountries() {
    const data = await db.query("SELECT * FROM saved_countries");
    return data.rows;
}

async function saveOneCountry(country_name) {
    const data = await db.query("INSERT INTO saved_countries (country_name) VALUES ($1) ON CONFLICT (country_name) DO NOTHING RETURNING country_name", [country_name]);
    return data.rows[0];
}

async function unsaveOneCountry(country_name) {
    const data = await db.query("DELETE FROM saved_countries WHERE country_name = $1", [country_name]);
    return data.rows[0];
}

async function updateOneCountryCount(country_name) {
    const data = await db.query("INSERT INTO country_counts (country_name, count) VALUES ($1, 1) ON CONFLICT (country_name) DO UPDATE SET count = country_counts.count + 1 RETURNING *", [country_name]);
    return data.rows[0];
}
/*----------------------------------
API Endpoints
----------------------------------*/

/*
These endpoints will be used at the end of our url and are activated with an async and await feature. What this will do is wait for the information that the helper functions need to give them before running to the next line than in our case give a string or an object for thr user to see what they're looking for.
*/
app.get("/get-newest-user", async (req, res) => {
    const user = await getNewestUser();
    res.json(user);
});

app.get("/get-all-users", async (req, res) => {
    const users = await getAllUsers();
    res.json(users);
});

app.post("/add-one-user", async (req, res) => {
    const { name, country_name, email, bio } = req.body;
    const newUser = await addOneUser(name, country_name, email, bio);
    res.json(newUser);
});

app.get("/get-all-saved-countries", async (req, res) => {
    const savedCountries = await getAllSavedCountries();
    res.json(savedCountries);
})

app.post("/save-one-country/:country_name", async (req, res) => {
    try {
      const { country_name } = req.params;
  
      // Save country to DB
      const savedCountry = await saveOneCountry(country_name);
  
      //already saved
      if (res.json({ status: "saved"})) {
        return alert("This country has already been saved")
      } else {
      // Success
      res.json({
        status: "saved",
        country_name: savedCountry.country_name,
      });
    }
    } catch (err) {
      console.error("Error saving country:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

app.delete("/unsave-one-country/:country_name", async (req, res) => {
    const {country_name} = req.params;
    const unsaveCountry = await unsaveOneCountry(country_name);
    res.json(unsaveCountry);
})

app.post("/update-one-country-count", async (req, res) => {
    const {country_name} = req.body;
    const updateCount = await updateOneCountryCount(country_name);
    res.json(updateCount);
})


