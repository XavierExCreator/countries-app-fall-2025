import {Link} from 'react-router-dom';

function CountryCard({country}) {

    const {name, population, region, capital, flags} = country;

    return(<>
    <Link to={`/country-detail/:${name.common}}`}>
    <div style={{display: 'flex', flexFlow: 'column', maxWidth: '250px', boxShadow: '0px 0px 5px 1px rgb(52%, 52%, 52%, 25%)', borderRadius: '10px 10px 0px 0px'}}>
        <img src={flags.png} alt='This is the flag of a country' style={{borderRadius: '10px 10px 0px 0px', minWidth: '250px', maxWidth: '250px', minHeight: '150px', maxHeight: '150px'}}/>
        <div style={{marginLeft: '2rem', marginBottom: '2rem'}}>
        <h3 style={{marginTop: '2rem'}}>{name.common}</h3>
        <ul style={{display: 'flex', flexFlow: 'column', padding: '0'}}>
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