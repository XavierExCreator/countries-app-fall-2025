import {useState} from 'react'; //Importing useState from react to use its' feature 

export default function SavedCountries() {

  /*
   This useState starts as empty strings 
   These useStates will be used in order to grab the infomation that is placed within the form that the user writesa
  */
    const [formData, setFormData] = useState({
        usersName: '',
        email: '',
        country: '',
        bio: ''
      });

      const handleChange = (event) => {
        //this function's job is to update the value of formData with each and every keystroke
        const { name, value } = event.target;
        console.log(name, value);
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
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
      -The form is in a div and the parent of the form is labeled 'savedCountryDiv' to be styled within 'index.css'
      -This form will log the users' data to the console on handleSubmit
      -The form is able to handleChange from what the user types and updates the information on the form
      -The button within the form is styled using inline
      */
    return(<>
    <div className='savedCountryDiv'>
        <h2>My saved Countries</h2>
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

