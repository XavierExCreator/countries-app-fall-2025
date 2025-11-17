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
    connectionString: config.databaseUrl, //credential to access the database. Keep this part private in the gitignore file section
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

async function getNewestUser() {
    const data = await db.query("SELECT * FROM users ORDER BY user_id DESC LIMIT 1");
    return data.rows;
}

async function getAllUsers() {
    const data = await db.query("SELECT * FROM users;");
    return data.rows;
}

async function addOneUser(name, country_name, email, bio) {
    const data = await db.query("INSERT INTO users (name, country_name, email, bio) VALUES ($1. $2, $3, $4') RETURNING users", [name, country_name, email, bio]);
    return data.rows;
}

async function getAllSavedCountries() {
    const data = await db.query("SELECT * FROM saved_countries");
    return data.rows;
}

async function saveOneCountry(country_name) {
    const data = await db.query("INSERT INTO saved_countries (country_name) VALUES ($1) ON CONFLICT (country_name) DO NOTHING RETURNING country_name", [country_name]);
    return data.rows;
}

async function unsaveOneCountry(country_name) {
    const data = await db.query("DELETE FROM saved_countries WHERE country_name = $1", [country_name]);
    return data.rows[0];
}

async function updateOneCountryCount(country_name) {
    const data = await db.query("INSERT INTO country_counts (country_name, count) VALUES ($1, 1) ON CONFLICT (country_name) DO UPDATE SET count = country_counts.count + 1 RETURNING country_name, count", [country_name]);
    return data.rows[0];
}
/*----------------------------------
API Endpoints
----------------------------------*/
app.get("/get-newest-user", async (req, res) => {
    const user = await getNewestUser();
    res.json(user);
});

app.get("/get-all-users", async (req, res) => {
    const users = await getAllUsers();
    res.json(users);
});

app.post("/add-one-user", async (req, res) => {
    const newUser = await addOneUser();
    res.json(newUser);
});

app.get("/get-all-saved-countries", async (req, res) => {
    const savedCountries = await getAllSavedCountries();
    res.json(savedCountries);
})

app.post("/save-one-country", async (req, res) => {
    const oneCountry = await saveOneCountry();
    res.json(oneCountry);
})

app.post("/unsave-one-country", async (req, res) => {
    const unsaveCountry = await unsaveOneCountry();
    res.json(unsaveCountry);
})

app.post("/update-one-country-count", async (req, res) => {
    const updateCount = await updateOneCountryCount();
    res.json(updateCount);
})