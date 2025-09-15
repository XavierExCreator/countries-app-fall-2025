import styles from './Home.module.css';
import CountryCard from '../components/CountryCard.jsx'

export default function Home({countriesData}) {

    return ( <>
    <div className={styles.countryDiv}>
    {countriesData.map((country) => (
        <CountryCard key={country.cca3} country={country} variant='home'/>
          ))}   
          </div>
    </>)
  }