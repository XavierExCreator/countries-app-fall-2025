import {useState} from 'react';


export default function SavedCountries() {

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

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormData({ usersName: '', email: '', country: '', bio: '' });
        console.log('Users Information', formData);
      };

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

