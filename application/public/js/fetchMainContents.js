const mainCotentsContainer = document.getElementById('contents-container');

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

async function fetchPicture() {
    try {
        
        var response = await fetch(URL);
        var data = await response.json();
        data.forEach(function(ele){
            newContentTitle = makeContentTitle(ele);
            newImage = makeImage(ele);
            newMainContent = makeMainContent(newContentTitle, newImage);
            mainCotentsContainer.append(newMainContent);
        });
    }
    catch (error){
        console.log(error);
    }
}

fetchPicture();

// fetch(URL).then(response => response.json()).then(d => {
//     d.forEach(function(ele){
//         console.log(ele);
//         newContentTitle = makeContentTitle(ele);
//         newImage = makeImage(ele);
//         newMainContent = makeMainContent(newContentTitle, newImage);
//         mainCotentsContainer.append(newMainContent);
//     })
// })