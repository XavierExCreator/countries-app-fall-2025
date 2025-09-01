/*The hompage will have the countries in display from the localData.js -
 files that is in the data folder.
 (moved to src/components/Data/localData.js)
*/
import CountryCard from '../components//CountryCard.jsx';

export default function Home({countriesData}) {

    return ( <>
    <div className="cards">
     {countriesData.map((country) => (
        <CountryCard key={country.cca3} country={country}/>
          ))}   
          </div>
    </>)
  }