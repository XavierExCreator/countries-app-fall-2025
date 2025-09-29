import {useParams} from 'react-router-dom'; //importing useParams
import CountryCard from '../components/CountryCard.jsx'; //importing CountryCard to use below
import Button from '../components/Button.jsx'; //importing button to use for conditional rendering below
import {useState, useEffect} from 'react';

/*
 CountryDetail is already exported and has a destructured placeholder in order to get data from the API being called in App.jsx
 */
export default function CountryDetail({countriesData}) {


  /*
   This is an empty array use state that will be used to store the objects that a user saved when they click the 'save' button below on the website
  */
  const [savedCountriesData, setSavedCountriesData] = useState([]);


  const [isReacting, setIsReacting] = useState(false);

  // const [count, setCount] = useState(0)

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

  function storeCountry() {
    if(localStorage.getItem('savedCountries')) {
      let destringifiedCountry = JSON.parse(localStorage.getItem('savedCountries'));
      setSavedCountriesData(destringifiedCountry);
    }
    else { console.log("localStorage couldn't find any saved data") }
  }
  
    
  // function storeAndUpdateCount() {
  //   setCount((count) => {let newCount = count + 1; 
  //     localStorage.setItem(`countryName`, newCount);
  //     console.log(`Before`, localStorage.getItem(`countryName`));
  //     let newViewCount = JSON.parse(localStorage.getItem(`countryName`));
  //     console.log(newViewCount);
  //   })
  // }


    const isSaved = savedCountriesData.some(
      country => country.name.common === foundCountryMatch.name.common
    );

    /*
   useEffect states:
   -if there's localStorage, grab 'savedCountries'
   -if 'savedCountries' is grabbed, declare a variable that will destructure the previous stringified 'savedCountries'
   -Than pass the destringifiedCountry into the function 'setSavedCountriesData
   -if localStorage/doesn't have 'savedCountries' within it, log a console error
   -Make sure this useEffect happens once everytime the page loads
  */
  useEffect(() => {
    // storeAndUpdateCount();
    storeCountry();
  }, []);

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
            spotThree={<li>Viewed: <span>{} times</span></li>}/>
            </div>
          : <p>Loading chosen country in progress...</p>
        )
     : <p>Locating API Data...</p>
}
    </main>
    </>)
}