import { useParams } from 'react-router-dom';
import CountryCard from '../components/CountryCard.jsx';
import Button from '../components/Button.jsx';
import { useState, useEffect } from 'react';

/*
CountryDetail is already exported and has a destructured placeholder in order to get data from the API being called in App.jsx */
export default function CountryDetail({countriesData}) {

  /*
   savedCountriesData: is saving the country that the user decides to save
   isReacting: Causes a specialeffect using CSS Animations to show the user that the country is being saved
   count: Is to track how many times a country has been viewed
  */
  const [savedCountriesData, setSavedCountriesData] = useState([]);

  const [isReacting, setIsReacting] = useState(false);

  const [count, setCount] = useState(0)
  
  /*
   useParams needs to seek the countries names
  */
  const countryName = useParams().countryName;

  /*
  foundCountryMatch needs to look through countriesData to find the clicked country 
  */
  const foundCountryMatch = countriesData.find(clickedCountry);
  
  /*
       clickedCountry:
       - Passes country into the param
       - Declares a variable
       - The declared variable says country.name.common and countryName match
       - Both country and countryName are made to be lowercased, split at the '-' and join adding a space to have both their information match
       - searchingCountries is return so that countries data can continue it's saving countries process.
      */
       function clickedCountry(country) {
        const searchingCountries = country.name.common.toLowerCase().split("-").join(" ") === countryName.toLowerCase().split("-").join(" ");
        return searchingCountries;
    };
  
  /*
   This handleSave function will:
   check if:
   -savedCountriesData in the .some doesn't match any of the saved countries, it'll run the function saveCountriesToApPI function to start the process of saving the function
   -Else, if it's already saved, than it'll alert the user "This country has already been saved"
  */
   function handleSave() {
    if (!savedCountriesData.some(country => country === foundCountryMatch.name.common)) {
      saveCountriesToAPI();
    } else {
      return alert("This country has already been saved- would you like "); 
    }
  
    /*
     - This makes the isReacting useState set to 'true'
     -It'll timeout the 'true' state back to 'false' after 5000ms in order to reset the animation to be used when needed
    */
    setIsReacting(true);
    setTimeout(() => {
      setIsReacting(false);
    }, 5000);
  }
  
  /*
   This is an async function called saveCountriesToAPI, it will:
   - TRY:
     - Declare a variable response
     - Await fetch in response before going to next steps
     - Inside api fetch place the endpoint a '/save-one-country'
     - make the method 'POST'
     - Make the headers 'ContentType' & 'application/json'
     - The body needs to be stringified and have keypairs of 'country_name' and countryName
     - After make an if statment for the try
       - If the contentType and reponse includes 'application/json', than pass data.savedCountriesData through setSavedCountriesData
       - Else declare a variable named 'textOutCome' and await the 'respose' and give the 'response' back as a string
       - Console log the server confirmation
   - CATCH will:
     - pass an err to the params of 'catch'
     - It'll console log the error that the countries api had an error updating
  */
     async function saveCountriesToAPI() {
      try {
        const response = await fetch(`/api/save-one-country/${countryName}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ country_name: countryName }), // send in body
        });
    
        const contentType = response.headers.get("content-type");
    
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          // Add the saved country to state
          setSavedCountriesData(prev => [...prev, data.country_name]);
          console.log("Updated saved country:", data.country_name);
        } else {
          const textOutcome = await response.text();
          console.log("Server confirmation:", textOutcome);
        }
      } catch (err) {
        console.error("Error saving country to API:", err);
      }
    }
    
    

  /*
   -storeAndUpdateCount is an async arrow function that will:
   Try
    -to fetch a response and wait until it's completed
    -This will use the method POST
    -The body willbe stringified and use the countryName declared earlier
    -Await a reponse and save it in the delcared variable called 'data'
    -Pass the data.count into the setCount useState
  Catch  
  -Will 'catch' an error if there's one and log the error
  */
  const storeAndUpdateCount = async ()  => {
   try { 
    const response = await fetch (`/api/update-one-country-count`, {
      
      method: 'POST', 
      
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        "country_name": countryName
      })
    })
    const data = await response.json();
    setCount(data.count);
   } catch (err) {
    console.error("Error updating counter:", err);
  }
};
 
  /*
   isSaved will check whether foundCountryMatch is defined or not
   - If it's defined it's check with .some
   - If it's not it comes off as 'false'
  */
   let isSaved = foundCountryMatch
   ? savedCountriesData.some(saved => saved.country_name === foundCountryMatch.name.common)
   : false;

    // On load it runs storeAndUpdateCount
  useEffect(() => {
    storeAndUpdateCount();
  },[/*It says it requires a dependency but as requested I didn't put one inside*/]);


  /*
   The return:
   - Will check that the length for CountriesData starts at 0 before showing the user anything else
     -When the length starts at 0 it'll than check if foundCountryMatch has data inside
      -If it found information in foundCountryMatch it'll than:
        - Show CountryCard and place the foundCountryMatch inside the 'country' prop
        - Display the variant as 'inspectCard'(for CSS)
        - Fill in SpotOne prop with a Back Button
        - Make className animated through CSS to show the user visuals that they're svaing a button when it's clicked
        - onClick will active the handleSave function
        -Fill in spot three with the times the flag has been viewed using the count useState delcared and posted earlier in the code
    - If foundCountryMatch hasn't loaded yet it'll say 'Loading chosen country in progress...' to the user until it does
   -If it hasn't found it yet, it'll say Locating API Data to the user
  */
    return(<>
    <main>
      {countriesData.length > 0 
      ? (foundCountryMatch 
          ? <div>
            <CountryCard country={foundCountryMatch} variant='inspectCard' spotOne={<Button text='← Back' className='backBtn' />} spotTwo={<Button text='Save' className={isReacting ? 'saveBtn isReacting' : isSaved ? 'saveBtn cardIsSaved' : 'saveBtn'} onClick={handleSave}/>}
            spotThree={<li>Viewed: <span>{count} times</span></li>}/>
            </div>
          : <p>Loading chosen country in progress...</p>
        )
     : <p>Locating API Data...</p>
}
    </main>
    </>)
}