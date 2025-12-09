# 📝 countries-app-all-2025

## 📌 Project Description & Purpose

This project is `countries-app-fall-2025`

## 🚀 Live Site

Check out the app: https://countrys-app-version-5.netlify.app/

## ✨ Features with 🖼️ Screenshots

This is what you can do on the app:

- Can search up in the homescreen the country you're looking for
<img width="1265" height="663" alt="image" src="https://github.com/user-attachments/assets/a5ed11c0-9817-4534-a5fa-9b4ddca5b38d" />

- In the SavedCountries page section, you may see the newest users sign in as well as the countries already saved
<img width="1264" height="664" alt="image" src="https://github.com/user-attachments/assets/75e20698-29ee-44fb-9e9d-0cf4cc8855d0" />

- Can fill out a form for the users
<img width="542" height="573" alt="image" src="https://github.com/user-attachments/assets/3f2778f5-901b-4fa7-9aeb-e7d4e7868d08" />

- You can click on the flags and see an up close inspection of the flag inclusing the views and save the country flag and save it
<img width="1280" height="664" alt="image" src="https://github.com/user-attachments/assets/be2737bc-aa03-4523-a9d5-269cbdd4d255" />

 ## -----THESE FEATURES BELOW WILL BE ADDED SOON------
 - You can also unsave any country already saved! (image is a stock for the mean time as a button isn't visibly available
<img width="140" height="113" alt="image" src="https://github.com/user-attachments/assets/f55280b8-5bee-4e0f-88c8-c472f164db45" />

   
 - The button is animated for the user to see the progress of the save
<img width="89" height="41" alt="image" src="https://github.com/user-attachments/assets/dac57568-e0f1-4b69-992d-3e566a3b7e2b" />

  
## 🛠️ Tech Stack

**Frontend**

- **Languages:** Javascript, CSS, HTML
- **Framework:** React JS
- **Deployment:** Netlify

**Server/API**

- **Languages:** JavaScript
- **Framework:** Express
- **Deployment:** Render

**Database**

- **Languages:** SQL
- **Deployment:** Neon, Postgress

## 🔹 API Documentation

These are the API endpoints I built:

1. /get-newest-user
2. /get-all-users
3. /add-one-user
4. /get-all-saved-countries
5. /save-one-country/:country_name
6. /unsave-one-country/:country_name
7. /update-one-country-count

Learn more about the API endpoints here: _**[insert link to API documentation]**_

## 🗄️ Database Schema

Here’s the SQL I used to create my tables:

This makes a table for the saved countries

```sql
CREATE TABLE saved_countries (
  saved_country_id SERIAL PRIMARY KEY,
  country_name VARCHAR UNIQUE NOT NULL
);
```

This makes a table for the amount of times a user has viewed a country

```sql
CREATE TABLE country_counts (
  country_count_id SERIAL PRIMARY KEY,
  country_name VARCHAR UNIQUE NOT NULL,
  count INTEGER NOT NULL
);
```

This creates a table for the users to have their info stored

```sql
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  country_name VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  bio VARCHAR
  );
```

## 💭 Reflections

What I learned:
I learned that at times you have to be realistic with yourself with what you can do and that it's important to ask questions when you're stuck on something.

**What I'm proud of:** I'm proud that I was able to add my own flaire to things. I love looking at CSS and learning new methods. I also am porud of the fact that the more I learn on BE, the more I become comfortable with it.

**What challenged me:** What challenged me most was converting each version and learning what to change within each version exactly. For example, Version 3 had local files, Version 4 had two API's that work with local files and some BE, Version 5 involves endpoints and uploading your API into your own and is supposed to be public. Those were tricky since BE and FE connect differently in each version with slight variations.

**Future ideas for how I'd continue building this project:**

1. I would add a dark-mode
2. I'd continue this project by adding a guess the country mini game
3. I'd also like the idea of adding more to the home-page, like a slideshow of different countries that it randomly shuffles images through, since it's a countries app- why not show how different countries look? It would be cool too if the image you clicked on sent you to the country page

## 🙌 Credits & Shoutouts

- Thanks to **Instructor Arianna** for **API Bug-fixing and Guidance with the site instructions**
- Thanks to **TA Bakari** for **Trouble-shooting**
- Thanks to **TA Makeba** for **Trouble-shooting** and
- Thanks to **Instructor Cat** for **Guidance with FE**!
