import {useParams} from 'react-router-dom'; //importing useParams
import CountryCard from '../components/CountryCard.jsx'; //importing CountryCard to use below
import Button from '../components/Button.jsx'; //importing button to use for conditional rendering below
import {useState, useEffect} from 'react';

/*
CountryDetail is already exported and has a destructured placeholder in order to get data from the API being called in App.jsx */
export default function CountryDetail({countriesData}) {


  /*
   This is an empty array use state that will be used to store the objects that a user saved when they click the 'save' button below on the website
  */
  const [savedCountriesData, setSavedCountriesData] = useState([]);

  /*
   This handleSave function will:
   -Declare a variable that creates a new array with the previously made empty useState array with the corresponding object that the user is inspecting on the web when the save button is clicked
   -The 'newArray' will be passed into the useState function 'setSavedCountriesData
   -The delcared variable 'stringifiedCountry' will reconstruct the array object into a string for localStorage to save it
   -Once it's stringified, we'll store the 'stringifiedCountry' to localStorage with its' key 'savedCountries'
   -The console will log to the console that the arrays' been updated
  */
  function handleSave() {
    if (savedCountriesData !== foundCountryMatch) { 
    let newArray = [...savedCountriesData, foundCountryMatch];
    setSavedCountriesData(newArray);
    let stringifiedCountry = JSON.stringify(newArray);
   localStorage.setItem('savedCountries', stringifiedCountry);
  //  console.log('This is the updated array', newArray);
    } else {
      alert("This country has already been")
    }
  }

  /*
   useEffect states:
   -if there's localStorage, grab 'savedCountries'
   -if 'savedCountries' is grabbed, declare a variable that will destructure the previous stringified 'savedCountries'
   -Than pass the destringifiedCountry into the function 'setSavedCountriesData
   -if localStorage/doesn't have 'savedCountries' within it, log a console error
   -Make sure this useEffect happens once everytime the page loads
  */
  useEffect(() => {
    if(localStorage.getItem('savedCountries')) {
      let destringifiedCountry = JSON.parse(localStorage.getItem('savedCountries'));
      setSavedCountriesData(destringifiedCountry);
    }
    else { console.log("localStorage couldn't find any saved data") }
  }, []);


  //useParams needs to seek the countries names
    const countryName = useParams().countryName;

    /*
    foundCountryMatch needs to look through countriesData to find the clicked country 
    */
    const foundCountryMatch = countriesData.find(clickedCountry);
    
    /*
    This runs when a country is clicked and passes a param labeled country through the API. This will return */
    function clickedCountry(country) {
        return country.name.common.toLowerCase() === countryName.toLowerCase();
    };

    console.log('this is the found items', foundCountryMatch);
    console.log('this is localStorage', savedCountriesData);
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
            <CountryCard country={foundCountryMatch} variant='inspectCard' spotOne={<Button text='← Back' className='backBtn' />} spotTwo={<Button text='Save' className='saveBtn' onClick={handleSave}/>}
            spotThree={<li>Viewed: <span> times</span></li>}/>
            </div>
          : <p>Loading chosen country in progress...</p>
        )
     : <p>Locating API Data...</p>
}
    </main>
    </>)
}