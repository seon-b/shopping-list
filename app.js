let addItemButton = document.querySelector(".addItemButton");
let searchButton = document.querySelector(".searchButton");
let deleteAllButton = document.querySelector(".clearItems");

let itemInputComponent = document.querySelector("#addItem");
let searchItemInputComponent = document.querySelector("#filterItems");
let itemsList = document.querySelector(".itemsList");

let removeItemIconClasses = "material-symbols-outlined removeItemIconStyle";

const getCurrentItemsListLength = () => {
  return itemsList.querySelectorAll("li").length;
};

const appState = {
  itemsListLength: getCurrentItemsListLength(),
};

const setAppState = (appStateKey, newValue) => {
  switch (true) {
    case appStateKey === "itemsListLength":
      appState.itemsListLength = newValue;
    default:
  }
};

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
  setAppState("itemsListLength", getCurrentItemsListLength());
  checkAppState();
  itemInputComponent.value = "";
};

const addItemToListByKeyBoard = (e) => {
  if (e.key === "Enter") {
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
    setAppState("itemsListLength", getCurrentItemsListLength());
    checkAppState();
    itemInputComponent.value = "";
  }
};

const removeItemFromList = (e) => {
  if (e.target.parentElement.classList.contains("shoppingItem"))
    e.target.parentElement.remove();
  setAppState("itemsListLength", getCurrentItemsListLength());
  checkAppState();
};

const deleteAllItems = () => {
  while (itemsList.lastElementChild) {
    itemsList.removeChild(itemsList.lastElementChild);
  }
  setAppState("itemsListLength", getCurrentItemsListLength());
  checkAppState();
};

const checkAppState = () => {
  if (appState.itemsListLength === 0) {
    searchItemInputComponent.classList.add("hideComponent");
    deleteAllButton.classList.add("hideComponent");
    searchButton.classList.add("hideComponent");
  } else {
    searchItemInputComponent.classList.remove("hideComponent");
    deleteAllButton.classList.remove("hideComponent");
    searchButton.classList.remove("hideComponent");
  }
};

addItemButton.addEventListener("click", addItemToList);
itemInputComponent.addEventListener("keydown", addItemToListByKeyBoard);
itemsList.addEventListener("click", removeItemFromList);
deleteAllButton.addEventListener("click", deleteAllItems);

checkAppState();
