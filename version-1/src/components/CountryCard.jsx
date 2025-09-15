import {Link} from 'react-router-dom';
import styles from './CountryCard.module.css';

function CountryCard({country, spotOne, spotTwo, variant}) {

    //'country' is further destructured in order to place specific object structures in it's place for the 'CountryCard'
    const {name, population, region, capital, flags} = country; 

    /*
     The return will show the  */
    return(<>
    <Link to={`/country-detail/${name.common}`} style={{display: 'inline-block', gap: '1rem'}}>
    {spotOne && <span >{spotOne}</span>}
    <div className={variant === 'home' ? styles.home : styles.inspectCard}>
        <img src={flags.png} alt='This is the flag of a country' className={styles.flag}/>
        <div className={styles.overview}>
        <h3 className={styles.name}>{name.common}</h3>
        {spotTwo && <span>{spotTwo}</span>}
        <ul className={styles.population}>
            <li>Population: <span>{population}</span></li>
            <li>Region: <span>{region}</span></li>
            <li>Capital: <span>{capital}</span></li>
        </ul>
        </div>
        </div>
        </Link>
        </>)
}
export default CountryCard;