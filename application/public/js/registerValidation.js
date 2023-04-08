const registrationForm = document.getElementById("registration-form");
const usernameForm = document.getElementById("username-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

const WORNG_FORM_CLASSNAME = "wrong-form";
const WARN_COLOR = "rgb(236, 56, 56)";

let isAlpha = (data) => ((data.charCodeAt()>64 && data.charCodeAt()< 91) || (data.charCodeAt()> 96 && data.charCodeAt() < 123));

let isAlphaNumeric = (data) => ((data.charCodeAt()>64 && data.charCodeAt()< 91) || (data.charCodeAt()> 96 && data.charCodeAt() < 123)) || (data.charCodeAt()>47 && data.charCodeAt()< 58);

let isUpperCase = (data) => (data.charCodeAt()>64 && data.charCodeAt()< 91)

let checkFirstLetter = (data) => {
    const checkFirstLetterSpan = document.getElementById("check-first-letter");
    if(isAlpha(data[0]) && data !== ""){
        checkFirstLetterSpan.style.display = "none";

    }else{
        checkFirstLetterSpan.style.color = WARN_COLOR;
        checkFirstLetterSpan.style.display = "flex";
    }
    return (data===null) ? true : (isAlpha(data[0])) ? true : false;  
}

function countAlphabet(data){
    const checkThreeAlphaNumeric = document.getElementById("check-three-alphanumeric");
    let letterCount = 0;

    for(char in data) {
        isAlphaNumeric(data[char])? letterCount+=1 : letterCount;
    }
    if (letterCount >= 3){
        checkThreeAlphaNumeric.style.display = "none";
    }else{
        checkThreeAlphaNumeric.style.color = WARN_COLOR;
        checkThreeAlphaNumeric.style.display = "flex";
    }
    return (letterCount >= 3);
}

function checkUsername(data){
    return checkFirstLetter(data)? (countAlphabet(data)? true : false) : (false);
}

function usernameChanged(event) {
    let inputUsername = event.target.value;
    if (inputUsername !== ""){
        checkUsername(inputUsername)? username.classList.remove(WORNG_FORM_CLASSNAME):username.classList.add(WORNG_FORM_CLASSNAME);
        return checkUsername(inputUsername);
    }else{
        const checkFirstLetterSpan = document.getElementById("check-first-letter");
        checkFirstLetterSpan.style.color = WARN_COLOR;   
        checkFirstLetterSpan.style.display = "flex";
        return false;
    }   
}

let displayWarnMessage = (span, input) => {
    span.forEach(function(ele){
        ele.style.color = WARN_COLOR;
        ele.style.display = "flex";
    });
    input.classList.add(WORNG_FORM_CLASSNAME);
    return false;
}

let deleteWarnMessage = (span, input) => {
    span.forEach(function(ele){
        ele.style.display = "none";
    });
    input.classList.remove(WORNG_FORM_CLASSNAME);
    return true;
}


function checkEmail(inputEmail){
    const checkEmailSpan = document.querySelectorAll(".check-email"); 

    const regEmail = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

    return (regEmail.test(inputEmail))? 
        deleteWarnMessage(checkEmailSpan, email):
        displayWarnMessage(checkEmailSpan, email); 
}

function emailChanged(event){
    let inputEmail = event.target.value;
    return checkEmail(inputEmail);
}


// let checkFirstLetterPW = (data) => {
//     const checkFirstLetterSpan = document.getElementById("check-first-letterPW");
//     if(isUpperCase(data[0]) && data !== ""){
//         checkFirstLetterSpan.style.display = "none";

//     }else{
//         checkFirstLetterSpan.style.color = WARN_COLOR;
//         checkFirstLetterSpan.style.display = "flex";
//     }
//     return (data===null) ? true : (isUpperCase(data[0])) ? true : false;  
// }
// const regPassword = /[A-Za-z0-9/*\-+@!#$^&~\[\]]/;

let checkPassword = (inputPassword) => {
    const checkPasswordSpan = document.querySelectorAll(".check-password");
    const regPassword = /^(?=.*[A-z])(?=.*[0-9])(?=.*[!@#$%^&+=]).{8,}$/;
    return (regPassword.test(inputPassword))? 
        deleteWarnMessage(checkPasswordSpan, password):
        displayWarnMessage(checkPasswordSpan, password);
} 

function passwordChanged(event){
    let inputPassword = event.target.value;
    return checkPassword(inputPassword);
}


function checkConfirmPassword(inputPassword, checkInputPassword){
    const checkConfirmPasswordSpan = document.querySelectorAll(".check-confirm-password");

    return (checkInputPassword === inputPassword)?
        deleteWarnMessage(checkConfirmPasswordSpan, confirmPassword):
        displayWarnMessage(checkConfirmPasswordSpan, confirmPassword);
}

function confirmPasswordChanged(event){
    let inputPassword = event.target.value;
    const checkInputPassword = password.value;
    return checkConfirmPassword(inputPassword, checkInputPassword);
}








function formSubmitted(event) {
    if(!(usernameChanged&&emailChanged&&passwordChanged&&confirmPasswordChanged)){
        event.preventDefault();
        console.log(event);
    }
    
}


username.addEventListener("input", usernameChanged);
email.addEventListener("input", emailChanged);
password.addEventListener("input", passwordChanged);
confirmPassword.addEventListener("input", confirmPasswordChanged);
registrationForm.addEventListener("submit", formSubmitted);