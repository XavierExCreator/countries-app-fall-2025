import { Routes, Route, Link } from 'react-router-dom'; //importing install dom
import Home from './pages/Home'; //importing home page
import SavedCountries from './pages/SavedCountries'; //importing page savedCountres
import CountryDetail from './pages/CountryDetail'; //importing page countryDetail
import {useState, useEffect} from 'react'; //importing some react features to use for the api


function App() { //This is a function that holds useState variables, api call, useEffect api call and three route locations and two links

  const [countries, setCountries] = useState([]); //countries is used to pass the apis' information into the routes below (lines )

/*
 This function is an asyc function, that calls the api using a try and catch method instead of 'then,then, catch'
*/
 const fetchCountryApi = async () => { 
  try {
    const response = await fetch(`https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region,cca3,borders`//variable 'response' will fetch the api and the function can't proceed unless this information is grabbed
    );
    const data = await response.json(); //Converting the information into useable javascript data structures
    setCountries(data); //the setCountries useState function is called and passes the api data through it to use later
  } catch (error) { //If it fails catch it
    console.log("Error: " + error.message); //If this fails, the console will log it and tell the us coders an error has occurred
  }
};

/*
This useEffect calls the api above instantly once
*/
useEffect(() => {
fetchCountryApi();
}, []);
     
/*
 -This return shows the user links for them to see the api data cards in the homepage, a usersForm to get information or once the user clicks on a card in the homescreen
 -They can get a closer look at the countryCard of choice
*/
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
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={ <Home countriesData={countries} />} />
        <Route path="/saved-countries" element={<SavedCountries countriesData={countries}/>} />
        <Route path="/country-detail/:countryName" element={<CountryDetail countriesData={countries}/>} />
        </Routes>
    </div>
  );
}

export default App;
