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
   -Check if savedCountriesData has a flag that the user is trying to save by using .some
   -If it does, the user will be alerted 'This country has already been saved'
   -Else, Declare a variable 'newArray' that will update savedCountriesData and place this countries data inside the array as an object using the .find method above
   -It will than pass the newArray into setSavedCountriesData
   -Another variable will be declared 'stringifiedCountry' and the newArray will be stringified inside that variable
   -localStorage will save this variable with the new value inside using the key 'savedCountries'
  */


   function handleSave() {
    if (!savedCountriesData.some(c => c.name.common === foundCountryMatch.name.common)) {
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
   -sees if localStorage is there grab 'savedCountries'
   -Parse the stored object(s) in there using parse
   -Pass the new destringified information through the setSavedCountriesData
   -If this fails, say that localStorage couldn't find any saved data
  */
   const storeCountry = () => {
   
  };

  /*
  - Checking if localStorage has countryName
    - Parsing the integer
    - Updating the number + 1
    - Setting new value to localStorage
    - Grabbing to show user
    - Parsing the new integer
    - Passing the information to be updated to setCount
  - If localStorage doesnt have a value in it for the countries do this...
    - 'newCount' will add the previous value of 0 by + 1
    - Set the newCount to localStorage
    - Grab the localStorage
    - Parse the integer
    - Return the new count
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

    // On load it runs storeCountry
  useEffect(() => {
    storeAndUpdateCount();
    storeCountry();
  },[]);

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