import {useState, useEffect} from 'react'; //Importing useState and useEffectfrom react to use its' feature 


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
     -'handleChange' targets the name of the inputs in the form below
     -It targets name and value in order to update the information on the form
     -setFormData looks at the previous responses written by the user before submitting the form and changes it to the current value
     -formData is stringified and stored in a value labeled 'stringified' beforeo being saved
     -localStorage saved stringified with a ey labeled 'profile'
    */
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

        let stringified = JSON.stringify(formData);

        localStorage.setItem('profile', stringified);
      };
   
      /*
      -handleSubmit prevents the form from being reset automatically
      -setFormData is refreshed to it's original state using the useState 'formData'
      */
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormData({ usersName: '', email: '', country: '', bio: '' });
      };

      /*
       -useEffect says:
       -If there's a localStorage, check for 'profile' and grab it
       -Declare a variable called 'profileDeStringified' and convert the stringified form into it's original state by using parse and calling 'profile' key in localStorage
       -After that pass the new destringified profile of the user through the second useState we made earlier called 'setUserInfo'
       -Make sure this only runs once on load
      */
      useEffect(() => {
        if (localStorage.getItem('profile')) {
          let profileDeStringified = JSON.parse(localStorage.getItem('profile'));
          setUserInfo(profileDeStringified);
        }
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

        {//The flags that were saved in CountryDetail go here
        }

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

