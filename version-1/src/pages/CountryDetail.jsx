//Details of countries will be here
import {useParams} from 'react-router-dom';
import CountryCard from '../components/CountryCard.jsx';

export default function CountryDetail() {
    const countryName = useParams().countryName;
    console.log(countryName);

    return(<>
    <main>
    {/* <CountryCard country={countryName}/> */}
    </main>
    </>)
}