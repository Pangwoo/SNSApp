const dropdownMenuNobs = document.getElementById("dropdown-menu-nobs");
const dropdownMenuItems = document.querySelector(".dropdown-menu-items");

function showDropdown(event){
    dropdownMenuItems.style.display = "flex";
}

function deleteDropdown(event){
    dropdownMenuItems.style.display = "none";
}
if (dropdownMenuNobs && dropdownMenuItems){
    dropdownMenuNobs.addEventListener("mouseover", showDropdown);
    dropdownMenuNobs.addEventListener("mouseout", deleteDropdown);
}