import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import SavedCountries from './pages/SavedCountries';
import CountryDetail from './pages/CountryDetail';
import {useState, useEffect} from 'react';

function App() {
const [countries, setCountries] = useState([]);

 const fetchCountryApi = async () => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region,cca3,borders`
    );
    const data = await response.json();
    console.log(data);
    setCountries(data);
  } catch (error) {
    console.log("Error: " + error.message);
  }
};

useEffect(() => {
fetchCountryApi();
}, []);
     
  return (
    <div className='countryHeader'>
      <nav>
        <ul className='navBar'>
          <li>
            <Link to="/"><h2 style={{marginLeft: '2rem'}}>Where in the world?</h2></Link>
          </li>
          <li>
            <Link to="/saved-countries">Saved Countries</Link>
          </li>  
          {/* <li>
            <Link to={`/country/${CountryDetail.name.common}`}>Country Details</Link>
          </li>  */}
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={ <Home countriesData={countries} />} />
        <Route path="/saved-countries" element={<SavedCountries countriesData={countries}/>} />
        <Route path="/country/:countryName" element={<CountryDetail countriesData={countries}/>} />
        </Routes>
    </div>
  );
}

export default App;
