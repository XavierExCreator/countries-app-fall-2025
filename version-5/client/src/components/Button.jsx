/*
 This button has a text and className that is destructured to use in the CountryDetailPage
 -The destructured {className} will be placed inside a className
 -The inside of the button will have a destructured placeholder labeled {text}
 -This is a reusable button 
*/
function Button({text, className, onClick}) {

    return(<>
    <button type='submit' className={className} onClick={onClick}>{text}</button>
    </>)
}

export default Button;