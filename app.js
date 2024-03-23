let addItemButton = document.querySelector(".addItemButton");
let searchButton = document.querySelector(".searchButton");
let deleteAllButton = document.querySelector(".clearItems");

let itemInputComponent = document.querySelector("#addItem");
let searchItemInputComponent = document.querySelector("#filterItems");
let itemsList = document.querySelector(".itemsList");

let removeItemIconClasses = "material-symbols-outlined removeItemIconStyle";

const createItemIcon = (iconClasses) => {
  let newItemIcon = document.createElement("span");
  let newItemIconName = document.createTextNode("close");

  newItemIcon.className = iconClasses;
  newItemIcon.appendChild(newItemIconName);

  return newItemIcon;
};

const addItemToList = () => {
  if (itemInputComponent.value.length === 0) {
    alert("Error, Please enter an item");
    return;
  }

  let newItem = document.createElement("li");
  let newItemName = document.createTextNode(itemInputComponent.value);

  newItem.appendChild(newItemName);
  newItem.appendChild(createItemIcon(removeItemIconClasses));
  newItem.classList.add("shoppingItem");
  itemsList.appendChild(newItem);
  itemInputComponent.value = "";
};

const removeItemFromList = (e) => {};

const deleteAllItems = () => {
  while (itemsList.lastElementChild) {
    itemsList.removeChild(itemsList.lastElementChild);
  }
};

addItemButton.addEventListener("click", addItemToList);
itemsList.addEventListener("click", removeItemFromList);
deleteAllButton.addEventListener("click", deleteAllItems);
