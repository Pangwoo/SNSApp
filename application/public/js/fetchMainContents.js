const mainCotentsContainer = document.getElementById('contents-container');
const contentsContainer = document.getElementsByClassName('index-main-content');
const contentsDeleted = document.getElementsByClassName('delete-content');
const mainPage = document.querySelector('main');

const URL = "https://jsonplaceholder.typicode.com/albums/2/photos";


const makeContentTitle = (ele) => {
    var title = document.createElement('span');
    title.classList.add("main-content-title");
    title.innerText = ele.title;
    return title;
}

const makeImage = (ele) => {
    var image = document.createElement('img');
    image.classList.add("content-img");
    image.src = ele.url;
    return image;
}

const makeMainContent = (title, image) => {
    var div = document.createElement('div');
    div.classList.add("index-main-content");
    div.append(title, image);
    return div;
} 

const deleteContent = (event) =>{
    var ele = event.currentTarget;
    let timer = setInterval(function (){
        ele.remove();     
        const displayText = document.querySelector(".display-text");
        displayText.innerText = (contentsContainer.length) + " contents are displayed!";
        clearInterval(timer);
    }, 200);
    
            
}

async function fetchPicture() {
    try {
        
        var response = await fetch(URL);
        var data = await response.json();
        var title = document.querySelector(".page-title");
        title.style.display="none";
        data.forEach(function(ele){
            newContentTitle = makeContentTitle(ele);
            newImage = makeImage(ele);
            newMainContent = makeMainContent(newContentTitle, newImage);
            newMainContent.addEventListener("click", deleteContent);
            mainCotentsContainer.append(newMainContent);
        });
        var div = document.createElement("div");
        var span = document.createElement("span");
        div.classList.add("display");
        span.innerText = (contentsContainer.length) + " contents are displayed!";
        span.classList.add("display-text");
        div.append(span);
        mainPage.append(div);
        // [...contentsContainer].forEach(function(ele){
        //     ele.addEventListener("click", deleteContent);
        // });
        
        // mainCotentsContainer.append
    }
    catch (error){
        console.log(error);
    }
}

fetchPicture();




// contentsContainer.forEach(element => {
//     element.addEventListener("onclick", deleteContent);
// });
// fetch(URL).then(response => response.json()).then(d => {
//     d.forEach(function(ele){
//         console.log(ele);
//         newContentTitle = makeContentTitle(ele);
//         newImage = makeImage(ele);
//         newMainContent = makeMainContent(newContentTitle, newImage);
//         mainCotentsContainer.append(newMainContent);
//     })
// })