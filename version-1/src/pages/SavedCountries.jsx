//Saved countries will be here
export default function SavedCountries() {

    return(<>
    <div className='savedCountryDiv'>
        <h2>My saved Countries</h2>
    <legend><h2>My Profile</h2>
    <form className=''>
        <label for='usersName'><input id='usersName' name='usersName' type='text' placeholder='Full Name' /></label><br/>
        <label for='email'><input id='email' name='email' type='email' placeholder='Email' /></label><br/>
        <label for='country'><input id='country' name='country' type='text' placeholder='Country'/></label><br/>
        <label for='bio'><input id='bio' name='bio' type='text' placeholder='Bio' style={{paddingTop: '5rem', paddingBottom: '5rem'}}/></label><br/>
        <button type='submit' className='submitButton' style={{color: 'white', padding: '.5rem 1.5rem', borderRadius: '3px'}}>Submit</button>
    </form>
    </legend>
    </div>
    </>)
}

