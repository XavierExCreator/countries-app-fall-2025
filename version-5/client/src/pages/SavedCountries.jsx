import {useState, useEffect} from 'react'; //Importing useState and useEffect from react to use its' feature 
import CountryCard from '../components/CountryCard.jsx';

/*
Destructuring countriesData in order to use later with the REST API for saved countries
*/
export default function SavedCountries({countriesData}) {
  /*
   This variable will be used to have an organized look in the useState
  */
  const emptyFormState =  {usersName: "", email: "", country: "", bio: ""}
  /*
   This useState starts as empty strings 
   formData will hold information the setFormData passes it
  */
    const [formData, setFormData] = useState (emptyFormState);

    /*
     This will store the usersInformation when the form needs to be reset
     this useState starts off with nothing 'null'
    */
    const [userInfo, setUserInfo] = useState(null);

     /*
     Saves countries when clicked suing the save button and passes it through the useSates function to use for mapping below in the return
     */
     const [userSavedCountry, setUserSavedCountry] = useState([]);


     /*
       showSavedCountries is an async arrow function that:
       -tries to get a fetch call from the REST api using GET
        it will:
         -Delcare a variable called data and await a reponse
         -pass the data through setUserSavedCountry
       -Catch if there's an error and log that an error has occurred
     */
     const showSavedCountries = async () => {
      try {const response = await fetch (`/api/get-all-saved-countries`, {
      
        method: 'GET', 
        
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const data = await response.json();
       setUserSavedCountry(data);
     } catch (err) {
      console.error("Error showing saved countries to user", err);
    }
  };

    /*
     -'handleChange' targets the name of the inputs in the form below
     -It targets name and value in order to update the information on the form
     -setFormData looks at the previous responses written by the user before submitting the form and changes it to the current value
    */
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
      };

      async function storeUsersData(formData) { 
          //  When we call the fetch() function, we only need to pass in the API url as one parameter when it’s a GET request.
          //  When it’s a POST request we need to pass a second parameter: an Object
        await fetch ('/api/add-one-user', {
          /*
           We need to say we're sending a POST request because by default it's always a GET request
          */
          method: 'POST', 
          /*
           -The headers is where we put metadata about our request, including the data type that we pass in the body
           -In this case, we're saying we're passing in JSON data in the body
          */
          headers: {
            'Content-Type': 'application/json',
          },
          /*
           -This data needs to be stringified into a string in order for it to be stored
           -We're stringifying the form version of this data.
           -We're stringifying the name, email, country and bio
           -Some of my names/id's don't match the API's names for some objects which will cause errors, what this does is that it makes the stringified form understand how the code is 
          */
          body: JSON.stringify({
            name: formData.usersName,
            email: formData.email,
            country_name: formData.country,
            bio: formData.bio,
          })
        })
      }
    

      /*
      -handleSubmit prevents the form from being reset automatically
      -setFormData is refreshed to it's original state using the useState 'formData'
      -storeUsersData passes formData that is collected from the useState 'formData'
      -setUsersInfo has information from the form that passes through it, the information that passes through it will be used in order to show the most recent user below when the function 'getUser' needs it
      */
    const handleSubmit = (e) => {
        e.preventDefault();
        storeUsersData(formData);
        setFormData(emptyFormState);
        setUserInfo(formData);
      };


      /*
       getUser will:
       - Asynchronously make an api call
       -Get a response and wait for the api to run
       -Get data and wait for the json
       -Loop through the first user
       - Will make sure that the information in the form passes through the correct objectkey names in case the form the coder makes and the apis' information doesn't match
      */
      const getUser = async () => {
        const response = await fetch('/api/get-newest-user');
        const data = await response.json();
        const userData = data[0];
        setUserInfo({
          usersName: userData.name,
          email: userData.email,
          country: userData.country_name,
          bio: userData.bio,
        });
      }
      /*
       useEffect will:
         -Run getUser
         -Run showSavedCountries
      */
      useEffect(() => {
        showSavedCountries();
        getUser();
      }, []);

      //This is for lines 158 to 160 & 189 to 194
      /*
      -The form is in a div and the parent of the form is labeled 'savedCountryDiv' to be styled within 'index.css'
      -There's a header2 that states 'My saved Countries'
      -If there's information inside 'userInfo' put 'Welcome back _(and place {usersName}!)_
      -This form will log the users' data to the console on handleSubmit
      -The form is able to handleChange from what the user types and updates the information on the form
      -The button within the form is styled using inline
      */
     //This is for the ternary between lines: 162 & 179
      /*
           Added a ternary statement that does several things for this to work.
           -Checks if there's a value in userSavedCountry and makes it start at 0 for the length
             Once those two thigs are true it will:
             -map userSavedCountry
             -Have a placeholder of 'savedCountry'
             -Declare a variable named 'matchedCountry'
              Matched country will:
               -Use the destructured 'countriesData' above to find the country and match country.name.common countries flag API to the REST api that has saved the countries the user has clicked save on
            -We than return matchedCountry
              -If matchedCountry is returned we fill in the component CountryCard and
                -give it a key of the new REST api
                -match the country information with the 'matchCountry' so the countries flag api can fill in the information in it's proper places
                -Declare the variant so the card is decorated the same way as Home.jsx is
            -If matchedCountry is not returned than we tell the ternary to that it becomes null, that there's no value.  
           -If not it'll say no countries have been saved
         */
    return(<>
    <div className='savedCountryDiv'>
        <h2>My saved Countries</h2>
        {userInfo && <h2>Welcome back, {userInfo.usersName}!</h2>}
         <div className="savedCardsInsideDiv ">
         {userSavedCountry && userSavedCountry.length > 0 ? (
          userSavedCountry.map((savedCountry) => {
            const matchedCountry = countriesData.find(
              (country) =>
                country.name.common.toLowerCase() === savedCountry.country_name.toLowerCase()
            );
            return matchedCountry ? (
              <CountryCard
              key={savedCountry.country_name}
              country={matchedCountry}
              variant="savedCountries"
              />
            ) : null
          })
        ) : (
          <p>No countries are saved</p>
         )} </div>

    <legend><h2>My Profile</h2>
    <form className='userForm' onSubmit={handleSubmit}>
        <label htmlFor='usersName'><input id='usersName' name='usersName' type='text' placeholder='Full Name' value={formData.usersName} onChange={handleChange}/></label><br/>

        <label htmlFor='email'><input id='email' name='email' type='email' placeholder='Email'value={formData.email} onChange={handleChange}/></label><br/>

        <label htmlFor='country'><input id='country' name='country' type='text' placeholder='Country' value={formData.country} onChange={handleChange}/></label><br/>

        <label htmlFor='bio'><input id='bio' name='bio' type='text' placeholder='Bio' style={{paddingTop: '5rem', paddingBottom: '5rem'}} value={formData.bio} onChange={handleChange}/></label><br/>

        <button type='submit' className='submitButton' style={{color: 'white', padding: '.5rem 1.5rem', borderRadius: '3px'}}>Submit</button>
    </form>
    </legend>
    </div>
    </>)
}


