//Details of countries will be here
import {useParams} from 'react-router-dom';
import CountryCard from '../components/CountryCard.jsx';

export default function CountryDetail({countriesData}) {

    const countryName = useParams().countryName;
    console.log(countryName);
    const foundCountryMatch = countriesData.find(clickedCountry);

    console.log(foundCountryMatch);

    function clickedCountry(country) {
        return country.name.common.toLowerCase === countryName.toLowerCase;
    };



    return(<>
    <main>
      {countriesData.length > 0 
      ? (foundCountryMatch 
          ? <CountryCard country={foundCountryMatch}/> 
          : <p>Loading chosen country in progress...</p>
        )
     : <p>Locating API...</p>
}
    </main>
    </>)
}