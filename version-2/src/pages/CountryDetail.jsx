import {useParams} from 'react-router-dom'; //importing useParams
import CountryCard from '../components/CountryCard.jsx'; //importing CountryCard to use below
import Button from '../components/Button.jsx'; //importing button to use for conditional rendering below
import {useState, useEffect} from 'react';

/*
 CountryDetail is already exported and has a destructured placeholder in order to get data from the API being called in App.jsx
 */
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
    if (savedCountriesData.some(country => country.name.common === foundCountryMatch.name.common)) {
      alert("This country has already been");
    } else {
     let newArray = [...savedCountriesData, foundCountryMatch];
     setSavedCountriesData(newArray);
     let stringifiedCountry = JSON.stringify(newArray);
     localStorage.setItem('savedCountries', stringifiedCountry);
     
     setIsReacting(true);
      setTimeout(() => {
        setIsReacting(false);
      }, 5000);
    }
  }

  /*
   storeCountry:
   -sees if localStorage is there grab 'savedCountries'
   -destrigify the stored object(s) in there using parse
   -Pass the new destringified information through the setSavedCountriesData
   -If this fails, say that localStorage couldn't find any saved data
  */
  const storeCountry = () => {
    if(localStorage.getItem('savedCountries')) {
      let destringifiedCountry = JSON.parse(localStorage.getItem('savedCountries'));
      setSavedCountriesData(destringifiedCountry);
    }
    else { console.log("localStorage couldn't find any saved data") }
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
  const storeAndUpdateCount = ()  => {
    if (localStorage.getItem(`${countryName}`)) { 
      let grabbedLocalStorage = parseInt(localStorage.getItem(`${countryName}`), 10); 
      const updatedCount = grabbedLocalStorage + 1;
      localStorage.setItem(`${countryName}`, updatedCount); 
      const showingUser = localStorage.getItem(`${countryName}`); 
      parseInt(showingUser, 10); 
      return setCount(showingUser);
    }
    else { 
    setCount((prev) => { 
      const newCount = prev + 1;  
      localStorage.setItem(`${countryName}`, newCount); 
      let grabbedLocalStorage = localStorage.getItem(`${countryName}`) 
      parseInt(grabbedLocalStorage, 10); 
      return newCount;
    }) }
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

    /*
     -The ternary statement checks to make sure the countriesData starts at the lenght of 0 (while it checks for the length it'll say 'Locating API Data')
     -Than it checks and sees if a match has been found for the clickedCountry (EX: -user clicks Britain- -clickedCountry function returns the matching countrys' name- -inside main the ternarys do their job than the card components show up- (if the CountryCard doesn't show up than 'Loading chosen country in progress' will appear)
     -Added a link to the 'Back' Button to traverse to the homepage
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