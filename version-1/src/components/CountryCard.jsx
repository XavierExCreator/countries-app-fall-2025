import {Link} from 'react-router-dom'; //importing react link to make countryCard dynamic when clicked
import styles from './CountryCard.module.css'; //importing a css module for CountryCard 

//This function makes a card that's dynamic when clicked and has several conditional renders for Home.jsx vs CountryDetail.jsx
function CountryCard({country, spotOne, spotTwo, variant}) {

    //'country' is further destructured in order to place specific object structures in it's place for the 'CountryCard'
    const {name, population, region, capital, flags} = country; 

    /*
    This return will make the card into a link, which will
    -have in-line styling
    -have conditional rendering for buttons in another component(spotOne and spotTwo will render in CountryDetail)
    -These JSX elements have:
      -buttons that have dynamic classNames
      -variants used in order to use for conditional rendering for styling depending the page the information is on
      -has dynamic classNames being used with modules
      -uses span for some JSX elements like <ul></ul>
      -Populations numbers that will appear in 'population' will have the numbers calculated the way the US counts
    */
    return(<>
    <Link to={`/country-detail/${name.common}`} style={{display: 'inline-block', gap: '1rem'}}>
    {spotOne && <span >{spotOne}</span>}
    
    <div className={variant === 'home' ? styles.home : styles.inspectCard}>

        <img src={flags.png} alt='This is the flag of a country' className={styles.flag}/>

        <div className={styles.overview}>
        <h3 className={styles.name}>{name.common}</h3>
        {spotTwo && <span>{spotTwo}</span>}
        <ul className={styles.population}>
            <li>Population: <span>{Intl.NumberFormat('en-US').format(population)}</span></li>
            <li>Region: <span>{region}</span></li>
            <li>Capital: <span>{capital}</span></li>
        </ul>
        </div>
        </div>
        </Link>
        </>)
}
export default CountryCard;