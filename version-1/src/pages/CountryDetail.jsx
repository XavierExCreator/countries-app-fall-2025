import {useParams} from 'react-router-dom'; //importing useParams
import CountryCard from '../components/CountryCard.jsx'; //importing CountryCard to use below
import Button from '../components/Button.jsx'; //importing button to use for conditional rendering below

//CountryDetail is already exported and has a destructured placeholder in order to get data from the API being called in App.jsx
export default function CountryDetail({countriesData}) {

  //useParams needs to seek the countries names
    const countryName = useParams().countryName;

    //foundCountryMatch needs to look through countriesData to find the clicked country
    const foundCountryMatch = countriesData.find(clickedCountry);

    //This runs when a country is clicked and passes a param labeled country through the API. This will return 
    function clickedCountry(country) {
        return country.name.common.toLowerCase() === countryName.toLowerCase();
    };

    /*
     -The ternary statement checks to make sure the countriesData starts at the lenght of 0 (while it checks for the length it'll say 'Locating API Data')
     -Than it checks and sees if a match has been found for the clickedCountry (EX: -user clicks Britain- -clickedCountry function returns the matching countrys' name- -inside main the ternarys do their job than the card components show up- (if the CountryCard doesn't show up than 'Loading chosen country in progress' will appear)
    */
    return(<>
    <main>
      {countriesData.length > 0 
      ? (foundCountryMatch 
          ? <div>
            <CountryCard country={foundCountryMatch} variant='inspectCard' spotOne={<Button text='← Back' className='backBtn' />} spotTwo={<Button text='Save' className='saveBtn'/>}/>
            </div>
          : <p>Loading chosen country in progress...</p>
        )
     : <p>Locating API Data...</p>
}
    </main>
    </>)
}