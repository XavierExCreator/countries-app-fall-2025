import styles from '../components/CountryCard.module.css'; //importing countryCard styles
import CountryCard from '../components/CountryCard.jsx' //importing CountryCard.jsx

/*
 deconstructuring countriesData so the API Data will pass through and be mapped.
 -The CountryCard has a key and the countries coresponding details in it
 -This variant version is 'home' and will be styled by CountryCard.modules.css
*/
export default function Home({countriesData}) {

    return ( <>
    <div className={styles.countryDiv}>
    {countriesData.map((country) => (
        <CountryCard key={country.cca3} country={country} variant='home'/>
          ))}   
          </div>
    </>)
  }