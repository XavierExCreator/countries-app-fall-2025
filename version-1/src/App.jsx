import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import SavedCountries from './pages/SavedCountries';
import CountryDetail from './pages/CountryDetail';
import localData from '/localData.js';

function App() {

  return (
    <div className='countryHeader'>
      <nav>
        <ul className='navBar'>
          <li>
            <Link to="/"><h1>Where in the world?</h1></Link>
          </li>
          <li>
            <Link to="/savedCountries">Saved Countries</Link>
          </li>  
          {/* -- This is commented out in order for the link to not show up yet since we'll work on it in BE --
          <li>
            <Link to="/countryDetails">Country Details</Link>
          </li> 
          */}
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={ <Home countriesData={localData} />} />
        <Route path="/savedCountries" element={<SavedCountries />} />
        <Route path="/countryDetails" element={<CountryDetail />} />
        </Routes>
    </div>
  );
}

export default App;
