const searchDropdown = document.getElementById("button-search-dropdown");
const searchDropdownItem = document.getElementById("search-dropdown-items");

function searchClicked(event){
    if(searchDropdownItem.classList && searchDropdownItem.classList.value === "display-none"){
        searchDropdownItem.classList.remove("display-none");
    }else{
        searchDropdownItem.classList.add("display-none");
    }
}

if(searchDropdown && searchDropdownItem){
    searchDropdown.addEventListener("click", searchClicked);
}