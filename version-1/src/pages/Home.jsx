
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