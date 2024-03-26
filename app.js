let addItemButton = document.querySelector(".addItemButton");
let deleteAllButton = document.querySelector(".clearItems");

let itemInputComponent = document.querySelector("#addItem");
let filterInputComponent = document.querySelector("#filterItems");
let itemsList = document.querySelector(".itemsList");

let removeItemIconClasses = "material-symbols-outlined removeItemIconStyle";

const generateItemsList = () => {
  itemsData = getItemsFromStorage();
  itemsData.reverse();

  while (itemsData.length !== 0) {
    let newItem = document.createElement("li");
    let newItemName = document.createTextNode(itemsData.pop());

    newItem.appendChild(newItemName);
    newItem.appendChild(createItemIcon(removeItemIconClasses));
    newItem.classList.add("shoppingItem");
    itemsList.appendChild(newItem);
  }
  setAppState("itemsListLength", getCurrentItemsListLength());
  checkAppState();
};

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

  saveItemToStorage(itemInputComponent.value);
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

    saveItemToStorage(itemInputComponent.value);
    setAppState("itemsListLength", getCurrentItemsListLength());
    checkAppState();

    itemInputComponent.value = "";
  }
};

const getItemsFromStorage = () => {
  let itemsData = [];
  localStorage.getItem("itemsData") !== null
    ? (itemsData = JSON.parse(localStorage.getItem("itemsData")))
    : (itemsData = []);

  return itemsData;
};

const saveItemToStorage = (item) => {
  let itemsData = getItemsFromStorage();

  itemsData.push(item);
  localStorage.setItem("itemsData", JSON.stringify(itemsData));
};

const removeItemFromList = (e) => {
  if (e.target.parentElement.classList.contains("shoppingItem")) {
    if (confirm("Selected item will be deleted"))
      e.target.parentElement.remove();
  }
  setAppState("itemsListLength", getCurrentItemsListLength());
  checkAppState();
};

const deleteAllItems = () => {
  if (confirm("All items will be deleted")) {
    while (itemsList.lastElementChild) {
      itemsList.removeChild(itemsList.lastElementChild);
    }
  }
  setAppState("itemsListLength", getCurrentItemsListLength());
  checkAppState();
};

const filterItems = (e) => {
  let inputData = e.target.value.toLowerCase();
  let currentItemsList = document.querySelectorAll("li");

  currentItemsList.forEach((item) => {
    let itemName = item.firstChild.textContent.toLowerCase();
    itemName.indexOf(inputData) !== -1
      ? (item.style.display = "block")
      : (item.style.display = "none");
  });
};

const checkAppState = () => {
  if (appState.itemsListLength === 0) {
    filterInputComponent.classList.add("hideComponent");
    deleteAllButton.classList.add("hideComponent");
  } else {
    filterInputComponent.classList.remove("hideComponent");
    deleteAllButton.classList.remove("hideComponent");
  }
};

addItemButton.addEventListener("click", addItemToList);
itemInputComponent.addEventListener("keydown", addItemToListByKeyBoard);
itemsList.addEventListener("click", removeItemFromList);
deleteAllButton.addEventListener("click", deleteAllItems);
filterInputComponent.addEventListener("input", filterItems);
document.addEventListener("DOMContentLoaded", generateItemsList);

checkAppState();
