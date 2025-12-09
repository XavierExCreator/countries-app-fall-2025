# 🌍 Countries App

## 👋 Welcome!

Throughout the Backend course, you will build a full-stack web application that displays information about countries around the world.

## 📝 Instructions

Each version of this app has a different set of instructions:

- [Version 0 Instructions](https://github.com/AnnieCannons/countries-app-instructions/tree/main/version-0)
- [Version 1 Instructions](https://github.com/AnnieCannons/countries-app-instructions/tree/main/version-1)
- [Version 2 Instructions](https://github.com/AnnieCannons/countries-app-instructions/tree/main/version-2)
- [Version 3 Instructions](https://github.com/AnnieCannons/countries-app-instructions/tree/main/version-3)
- [Version 4 Instructions](https://github.com/AnnieCannons/countries-app-instructions/tree/main/version-4)
- [Version 5 Instructions](https://github.com/AnnieCannons/countries-app-instructions/tree/main/version-5)

All instructions live in the [countries-app-instructions Github repo](https://github.com/AnnieCannons/countries-app-instructions).

## 🔗 Resources

- **Figma Designs:** Use this [Figma file](https://www.figma.com/design/YuEMNteoQic0h6RRiYprpV/Countries-API-Project?m=auto&t=C9b6FsfUdPspzaqu-1) for the designs
- **API:** Use the [REST Countries API](https://restcountries.com) to get the country data and flag images
- **Documentation Guides:** The teaching team at AnnieCannons has provided some [handy guides](https://docs.google.com/document/d/18jxCUA0bebCyYaIHy8aaKMgOQH4w5-b-iCGDWpV4K4M/edit?tab=t.0#heading=h.ykdbmvmlp0ag) to help you use Github and other coding tools
- **Feeling stuck with React?** A solid grasp of the core React concepts is key to building this project. If you need to brush up, check out the [Learn React docs](https://react.dev/learn) or working through the [React Tic-Tac-Toe tutorial](https://react.dev/learn/tutorial-tic-tac-toe).

# 📝 Writing a README

A well-written README helps others (and your future self!) understand, use, and appreciate your project. Here’s a quick guide to writing one.

## 📌 What is a README?

A `README.md` is usually the **first** thing someone sees in your repo. It gives an **overview** of what your **project** is about, how to use it, and how it works.

You spent hours on your project — spend at least 30 minutes writing a clear README.
It’s your chance to tell the world what your hard work is all about!

## 🧹 Tips

- Don’t overthink it! Just explain your project clearly
- Use headers, bullet points, and links to keep it easy to read
- Update the README if your project changes

## ✨ Example of a README

- Coming soon!

## 🎨 Markdown Formatting Tips

README files use **Markdown** (`.md`) to style content.

### Common Markdown formatting:

```markdown
# H1 (Main title)

## H2 (Section)

### H3 (Subsection)

**bold text**  
_italic text_  
`inline code`

- bullet points

1. numbered lists

[Link text](https://example.com)

![Alt text for image](./images/image.png)
```

# Fill Out the Template Below ⬇️

Once you're done filling out the template, paste it into your Github repo's main `README.md` file!

---

# 📝 countries-app-all-2025

## 📌 Project Description & Purpose

This project is `countries-app-fall-2025`

## 🚀 Live Site

Check out the app: https://countrys-app-version-5.netlify.app/

## 🖼️ Screenshots

Here is where you'll include a screenshot of your project to show it off!

Your instructor will walk you through this process with the rest of the class. Please be patient until the time comes! In the meantime, you can fill out all other sections of this template.

1. Use `Command + Control + Shift + 4` to take a screenshot of your site and copy the screenshot to your clipboard
2. Find your Github README.md file on the Github website
3. Edit the site by clicking on the Pencil icon ✏️
4. Move your cursor to the position where you want to paste the screenshot, then paste it. Github will convert the pasted screenshot into an `<img>` tag
5. Select "Commit changes..." to save your changes

## ✨ Features

This is what you can do on the app:

- Can search up in the homescreen the country you're looking for
- Can save the country flags
- Can fill out a form for the users

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
