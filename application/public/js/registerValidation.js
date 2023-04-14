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

let displayWarnMes = (span) => {
    span.style.color = WARN_COLOR;
    span.style.display = "flex";
    return false;
}

let deleteWarnMes = (span) => {
    span.style.display = "none";
    return true;
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


let checkFirstLetterPW = (inputPassword) => {
    const checkFirstLetterSpan = document.getElementById("check-first-letterPW");
    if(inputPassword === ""){
        displayWarnMes(checkFirstLetterSpan);
    }
    for(var i = 0; i < inputPassword.length; i++){
        if(isUpperCase(inputPassword[i])){
            return deleteWarnMes(checkFirstLetterSpan);
        }
    }
    return displayWarnMes(checkFirstLetterSpan);
}
// const regPassword = /[A-Za-z0-9/*\-+@!#$^&~\[\]]/;

let checkSpecialChar = (inputPassword) => {
    const checkSpecialLetterSpan = document.getElementById("check-special-char");
    var specialChar = ['/','*','-','+','!','@','#','$','^','&','~','[',']'];
    for(var i = 0; i < inputPassword.length; i++){
        for(s in specialChar){
            if(inputPassword[i] === specialChar[s]){
                return deleteWarnMes(checkSpecialLetterSpan);
            }
        }
    }
    return displayWarnMes(checkSpecialLetterSpan);
}

let checkNumber = (inputPassword) => {
    const checkSpecialLetterSpan = document.getElementById("check-special-char");
    for (var i = 0; i < inputPassword.length; i++){
        if(inputPassword[i].charCodeAt()>47 && inputPassword[i].charCodeAt()< 58){
            return deleteWarnMes(checkSpecialLetterSpan);
            
        }
    }
    return displayWarnMes(checkSpecialLetterSpan);
}

let checkLength = (inputPassword) => {
    const checkLengthSpan = document.getElementById("check-length");
    if(inputPassword.length >= 8){
        return deleteWarnMes(checkLengthSpan);
    }
    else{
        return displayWarnMes(checkLengthSpan);
    }
}

let checkPassword = (inputPassword) => {
    // const regPassword = /^(?=.*[A-z])(?=.*[0-9])(?=.*[!@#$^&~*/]).{8,}$/;
    checkFirstLetterPW(inputPassword);
    checkSpecialChar(inputPassword); 
    checkNumber(inputPassword); 
    checkLength(inputPassword);
    if(checkFirstLetterPW(inputPassword)&&
    checkSpecialChar(inputPassword)&&
    checkNumber(inputPassword)&& 
    checkLength(inputPassword)){
        password.classList.remove(WORNG_FORM_CLASSNAME);
    }else{
        password.classList.add(WORNG_FORM_CLASSNAME);
    }
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