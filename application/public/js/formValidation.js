const registrationForm = document.getElementById("registration-form");
const usernameForm = document.getElementById("username-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");

const WORNG_FORM_CLASSNAME = "wrong-form";

function formSubmitted(event) {
    event.preventDefault();
    console.log(event);
}

let isAlpha = (data) => data.charCodeAt()>64 && data.charCodeAt()< 123;

let checkFirstLetter = (data) => {
    return (data===null) ? true : (isAlpha(data[0])) ? true : false;  
}

function countAlphabet(letter){
    let letterCount = 0;

    for(char in letter) {
        isAlpha(letter[char])? letterCount+=1 : letterCount;
    }
    return (letterCount >= 3);
}

function checkUsername(data){
    return checkFirstLetter(data) && countAlphabet(data);
}

function formChanged(event) {
    const inputUsername = event.target.value;
    checkUsername(inputUsername)? username.classList.remove(WORNG_FORM_CLASSNAME):username.classList.add(WORNG_FORM_CLASSNAME);
    
    
}

registrationForm.addEventListener("submit", formSubmitted);
username.addEventListener("input", formChanged);