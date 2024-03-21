let addItemButton = document.querySelector(".addItemButton");
let searchButton = document.querySelector(".searchButton");
let deleteAllButton = document.querySelector(".clearItems");

let itemInputComponent = document.querySelector("#addItem");
let searchItemInputComponent = document.querySelector("#filterItems");
let itemsList = document.querySelector(".itemsList");

const addItemToList = () => {
  if (itemInputComponent.value.length === 0) {
    alert("Error, Please enter an item");
    return;
  }

  let newItem = document.createElement("li");
  let textData = document.createTextNode(itemInputComponent.value);

  newItem.appendChild(textData);
  newItem.classList.add("shoppingItem");
  itemsList.appendChild(newItem);
  itemInputComponent.value = "";
};

addItemButton.addEventListener("click", addItemToList);
