import {useState, useEffect} from 'react'; //Importing useState and useEffect from react to use its' feature 
import CountryCard from '../components/CountryCard.jsx';

export default function SavedCountries() {
  /*
   This variable will be used to have an organized look in the useState
  */
  const emptyFormState =  {usersName: '', email: '', country: '', bio: ''}
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

    useEffect(() => {
      if(localStorage.getItem('savedCountries')) {
        let destringifiedCountry = JSON.parse(localStorage.getItem('savedCountries'));
        setUserSavedCountry(destringifiedCountry);
      }
      else { console.log("localStorage couldn't find any saved data") }
    }, []);

    /*
     -'handleChange' targets the name of the inputs in the form below
     -It targets name and value in order to update the information on the form
     -setFormData looks at the previous responses written by the user before submitting the form and changes it to the current value
     -formData is stringified and stored in a value labeled 'stringified' beforeo being saved
     -localStorage saved stringified with a ey labeled 'profile'
    */
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
      };
   
      /*
      -handleSubmit prevents the form from being reset automatically
      -setFormData is refreshed to it's original state using the useState 'formData'
      */
    const handleSubmit = (e) => {
        e.preventDefault();
        let stringified = JSON.stringify(formData);
        localStorage.setItem('profile', stringified);
        setFormData(emptyFormState);
      };

      function getUser() {
        if (localStorage.getItem('profile')) {
          let profileDeStringified = JSON.parse(localStorage.getItem('profile'));
          setUserInfo(profileDeStringified);
        }
      }

      /*
       -useEffect says:
       -If there's a localStorage, check for 'profile' and grab it
       -Declare a variable called 'profileDeStringified' and convert the stringified form into it's original state by using parse and calling 'profile' key in localStorage
       -After that pass the new destringified profile of the user through the second useState we made earlier called 'setUserInfo'
       -Make sure this only runs once on load
      */
      useEffect(() => {
        getUser();
      }, []);

      /*
       submitAgain is a:
       -The console will tell the coder that the informaton has been cleared and that if there's an error to disregard
       -Function that clears the data the user has placed if they decide to remove their information for when they come back to 'SavedCountries' than return
      */
      function submitAgain() {
        console.log('Data for countries and users information has been cleared, if CountryDetails states an error after this, disregard-');
        return localStorage.clear();
      }

      /*
      -The form is in a div and the parent of the form is labeled 'savedCountryDiv' to be styled within 'index.css'
      -There's a header2 that states 'My saved Countries'
      -If there's information inside 'userInfo' put 'Welcome back _(and place {usersName}!)_
      -This form will log the users' data to the console on handleSubmit
      -The form is able to handleChange from what the user types and updates the information on the form
      -The button within the form is styled using inline
      -The 'submit Again' button will reset the information for the local data and make it so the user can reset their data and start a new profile
      */
    return(<>
    <div className='savedCountryDiv'>
        <h2>My saved Countries</h2>
        {userInfo && <h2>Welcome back, {userInfo.usersName}!</h2>}

        {/* Added length to userSavedCountry in order to make sure it starts at 0. It than  maps over what is in userSavedCountry with map, passes a param and loops through using the country that's in there and it's corresponding key, if there's no countries in there, than it says 'No countries saved' */}
        {userSavedCountry.length > 0
        ? <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>{userSavedCountry.map((country) => (<CountryCard country={country} key={country.cca3} variant='savedCountries'/>))}</div> 
        : <p>No countries saved</p>}
       
       
        
    <legend><h2>My Profile</h2>
    <form className='userForm' onSubmit={handleSubmit}>
        <label htmlFor='usersName'><input id='usersName' name='usersName' type='text' placeholder='Full Name' value={formData.usersName} onChange={handleChange}/></label><br/>

        <label htmlFor='email'><input id='email' name='email' type='email' placeholder='Email'value={formData.email} onChange={handleChange}/></label><br/>

        <label htmlFor='country'><input id='country' name='country' type='text' placeholder='Country' value={formData.country} onChange={handleChange}/></label><br/>

        <label htmlFor='bio'><input id='bio' name='bio' type='text' placeholder='Bio' style={{paddingTop: '5rem', paddingBottom: '5rem'}} value={formData.bio} onChange={handleChange}/></label><br/>

        <button type='submit' className='submitButton' style={{color: 'white', padding: '.5rem 1.5rem', borderRadius: '3px'}}>Submit</button>
    </form>
    <button type='submit' className='submitButton' onClick={submitAgain} style={{marginTop: '2rem'}}>Submit Again</button>
    </legend>
    </div>
    </>)
}

