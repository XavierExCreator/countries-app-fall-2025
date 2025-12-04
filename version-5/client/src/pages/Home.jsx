import styles from '../components/CountryCard.module.css'; //importing countryCard styles
import CountryCard from '../components/CountryCard.jsx' //importing CountryCard.jsx
import {useEffect, useState} from "react";
/*
 deconstructuring countriesData so the API Data will pass through and be mapped.
 -The CountryCard has a key and the countries coresponding details in it
 -This variant version is 'home' and will be styled by CountryCard.modules.css
*/
// export default function Home({countriesData}) {

//     return ( <>
    
//     <div className={styles.countryDiv}>
//     {countriesData.map((country) => (
//         <CountryCard key={country.cca3} country={country} variant='home'/>
//           ))}   
//           </div>
//     </>)
//   }


export default function Home({ countriesData }) {
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Stop showing loading once countries arrive
  useEffect(() => {
    if (countriesData?.length > 0) {
      setIsLoading(false);
    }
  }, [countriesData]);

  // Filter logic (ONLY when user types)
  const filteredCountries =
    searchInput.length > 0
      ? countriesData.filter((c) =>
          c.name.common.toLowerCase().includes(searchInput.toLowerCase())
        )
      : countriesData;

  return (
    <>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          margin: "20px auto",
          display: "block",
          fontSize: "16px",
        }}
      />

      {/* Loading message */}
      {isLoading ? (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <h2>✈️ Countries flags are flying in…</h2>
          <p>Flights are delayed — thank you for your patience!</p>
        </div>
      ) : (
        <div className={styles.countryDiv}>
          {/* If user typed and no matches are found */}
          {filteredCountries.length === 0 ? (
            <p>No countries match your search.</p>
          ) : (
            filteredCountries.map((country) => (
              <CountryCard
                key={country.cca3}
                country={country}
                variant="home"
              />
            ))
          )}
        </div>
      )}
    </>
  );
}
