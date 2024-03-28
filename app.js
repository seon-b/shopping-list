let addItemButton = document.querySelector(".addItemButton");
let editItemButton = document.querySelector(".editItemButton");
let deleteAllButton = document.querySelector(".clearItems");

let itemInputComponent = document.querySelector("#addItem");
let filterInputComponent = document.querySelector("#filterItems");
let itemsList = document.querySelector(".itemsList");

let removeItemIconClasses = "material-symbols-outlined removeItemIconStyle";

const generateItemsList = () => {
  let itemsData = getItemsFromStorage();
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

const removeItemFromStorage = (itemName, value) => {
  let itemsData = getItemsFromStorage();

  if (value === "one") {
    itemsData.splice(itemsData.indexOf(itemName), 1);
    localStorage.setItem("itemsData", JSON.stringify(itemsData));
  } else {
    while (itemsData.length !== 0) {
      itemsData.pop();
    }
    localStorage.setItem("itemsData", JSON.stringify(itemsData));
  }
};

const getCurrentItemsListLength = () => {
  return itemsList.querySelectorAll("li").length;
};

const appState = {
  itemsListLength: getCurrentItemsListLength(),
  selectedItem: "",
};

const setAppState = (appStateKey, newValue) => {
  switch (true) {
    case appStateKey === "itemsListLength":
      appState.itemsListLength = newValue;
    case appStateKey === "selectedItem":
      appState.selectedItem = itemInputComponent.value;
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

  if (isDuplicateItem(itemInputComponent.value)) {
    alert("Item is already in the list");
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
    if (isDuplicateItem(itemInputComponent.value)) {
      alert("Item is already in the list");
      return;
    }
    if (editItemButton.classList.contains("hideComponent")) {
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
    } else {
      editItem();
    }
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
    if (confirm("Selected item will be deleted")) {
      e.target.parentElement.remove();

      let itemToRemove = e.target.parentElement.textContent;
      itemToRemove = itemToRemove.replace("close", "");

      removeItemFromStorage(itemToRemove, "one");
    }
  } else {
    addItemButton.classList.add("hideComponent");
    editItemButton.classList.remove("hideComponent");
    let itemToEdit = e.target.textContent;
    itemToEdit = itemToEdit.replace("close", "");
    itemInputComponent.value = itemToEdit;
    setAppState("selectedItem", itemToEdit);
  }
  setAppState("itemsListLength", getCurrentItemsListLength());
  checkAppState();
};

const editItem = () => {
  if (itemInputComponent.value.length === 0) {
    alert("Error, Item cannot be updated");
    return;
  }
  if (confirm("Selected item will be updated")) {
    let newItemName = itemInputComponent.value;
    let itemsData = getItemsFromStorage();
    itemsData.splice(itemsData.indexOf(appState.selectedItem), 1, newItemName);
    localStorage.setItem("itemsData", JSON.stringify(itemsData));
    itemInputComponent.value = "";
    window.location.reload();
  }
};

const deleteAllItems = () => {
  if (confirm("All items will be deleted")) {
    while (itemsList.lastElementChild) {
      itemsList.removeChild(itemsList.lastElementChild);
    }
    removeItemFromStorage("items", "all");
  }
  setAppState("itemsListLength", getCurrentItemsListLength());
  checkAppState();
};

const resetInput = () => {
  itemInputComponent.value = "";
  addItemButton.classList.remove("hideComponent");
  editItemButton.classList.add("hideComponent");
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

isDuplicateItem = (item) => {
  let itemsData = getItemsFromStorage();
  itemInputComponent.value = "";
  return itemsData.includes(item);
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
editItemButton.addEventListener("click", editItem);
itemInputComponent.addEventListener("keydown", addItemToListByKeyBoard);
// itemInputComponent.addEventListener("click", resetInput);
itemsList.addEventListener("click", removeItemFromList);
deleteAllButton.addEventListener("click", deleteAllItems);
filterInputComponent.addEventListener("input", filterItems);
document.addEventListener("DOMContentLoaded", generateItemsList);

checkAppState();
