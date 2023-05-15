const flashMessage = document.getElementById("flash-message");

setInterval(() => {
    if(flashMessage){
        flashMessage.style.display = "none";
    }
}, 3000);