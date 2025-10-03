import {useParams} from 'react-router-dom'; //importing useParams
import CountryCard from '../components/CountryCard.jsx'; //importing CountryCard to use below
import Button from '../components/Button.jsx'; //importing button to use for conditional rendering below
import {useState, useEffect} from 'react';

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
  
  //useParams needs to seek the countries names
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

  */
   function handleSave() {
    if (!savedCountriesData.some(country => country.name.common === foundCountryMatch.name.common)) {
      saveCountriesToAPI();
    } else {
      alert("This country has already been saved");
    }
  
    setIsReacting(true);
    setTimeout(() => {
      setIsReacting(false);
    }, 5000);
  }
  
    async function saveCountriesToAPI() {
      await fetch(`https://backend-answer-keys.onrender.com/save-one-country`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "country_name": countryName
        })
      })
    }

    
    /*
   storeCountry:
   NEEDS TO BE COMPLETED
  */
   const storeCountry = () => {
   
  };

  /*
  storeAndUpdateCount uses an async arrow function to:
  -Try:
     - To declare response than have it await for the api fetch call
     - At the end-point of the fetch have '/update-one-country-count'
     - Have three objects inside that declare what metadata it needs/what we're looking for
     - method needs: 'POST'
     - headers need 'Content-Type' to be 'application/json'
     - The body will be stringified and have a key pair of 'country_name' and countryName
     - it'll than declare data and await the response of json
     - We than pass data.count into setCount to pass the new information through it
  -Catch an error if this doesn't run than:
     - pass 'err' to signfy that there's been an error
     - the console will log an error and say 'Error updating counter
  */

  const storeAndUpdateCount = async ()  => {
   try { 
    const response = await fetch (`https://backend-answer-keys.onrender.com/update-one-country-count`, {
      
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
  console.log("Updated counter:", data.count);
   } catch (err) {
    console.error("Error updating counter:", err);
  }
};
 
  /*
   isSaved will check whether foundCountryMatch is defined or not
   - If it's defined it's check with .some
   - If it's not it comes off as 'false'
  */
    let isSaved = foundCountryMatch ? 
     savedCountriesData.some(saved => saved.name.common === foundCountryMatch.name.common) 
    : false;

    // On load it runs storeCountry and storeAndUpdateCount
  useEffect(() => {
    storeAndUpdateCount();
    storeCountry();
  },[]);


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