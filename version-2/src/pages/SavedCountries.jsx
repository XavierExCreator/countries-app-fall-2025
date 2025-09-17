import {useState, useEffect} from 'react'; //Importing useState and useEffectfrom react to use its' feature 

export default function SavedCountries() {

  /*
   This variable will be used to have an organized look in the useState
  */
  const emptyFormState =  {usersName: '', email: '', country: '', bio: ''}
  /*
   This useState starts as empty strings 
   These useStates will be used in order to grab the infomation that is placed within the form that the user writes
  */
    const [formData, setFormData] = useState (emptyFormState);

    /*
     This will store the usersInformation when the form needs to be stored
    */
    const [userInfo, setUserInfo] = useState(null);

      const handleChange = (event) => {
        //this function's job is to update the value of formData with each and every keystroke
        const { name, value } = event.target;
        console.log(name, value);
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

        let stringified = JSON.stringify(formData);

        localStorage.setItem('profile', stringified);
      };

      
      /*
      handleSubmit 
      -logs the users information they placed on the console.
      -Prevents the form from resetting automatically
      */
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormData({ usersName: '', email: '', country: '', bio: '' });
        console.log('Users Information', formData);
      };

      /*
       -useEffect says:
       -if you see localStorage, get 'profile'
       -once you get 'prolfile', convert it back to an object and get the new converted object and pass is through setUserInfo as it's object form to the use when loading
      */
      useEffect(() => {
        if (localStorage.getItem('profile')) {
          let profileDeStringified = JSON.parse(localStorage.getItem('profile'));
          setUserInfo(profileDeStringified);
        }
      }, []);
      /*
      -The form is in a div and the parent of the form is labeled 'savedCountryDiv' to be styled within 'index.css'
      -This form will log the users' data to the console on handleSubmit
      -The form is able to handleChange from what the user types and updates the information on the form
      -The button within the form is styled using inline
      */
    return(<>
    <div className='savedCountryDiv'>
        <h2>My saved Countries</h2>
        {userInfo && <h2>Welcome back, {userInfo.usersName}!</h2>}
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

