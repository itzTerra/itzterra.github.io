const indexContentDiv = document.getElementById("index-content");
const loadingDiv = document.getElementById("loading-img");


function projectView(){
    indexContentDiv.classList.add("top-left");
    loadingDiv.classList.add("top-left");
    $(indexContentDiv).fadeOut();
}

function homeView(){
    indexContentDiv.classList.remove("top-left");
    loadingDiv.classList.remove("top-left");
    $(indexContentDiv).fadeIn();
}