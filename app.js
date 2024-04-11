let addItemButton = document.querySelector(".addItemButton");
let editItemButton = document.querySelector(".editItemButton");
let deleteAllButton = document.querySelector(".clearItems");
let themeButton = document.querySelector(".changeTheme");

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

  addThemes();
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

const getThemesFromStorage = () => {
  let themesData = [];
  localStorage.getItem("themesData") !== null
    ? (themesData = JSON.parse(localStorage.getItem("themesData")))
    : (themesData = []);

  return themesData;
};

const getCurrentButtonTheme = () => {
  let themesData = getThemesFromStorage();
  return themesData[0];
};

const getCurrentBackgroundTheme = () => {
  let themesData = getThemesFromStorage();
  return themesData[1];
};

const appState = {
  backgroundTheme: getCurrentBackgroundTheme() || "backgroundTheme1",
  buttonTheme: getCurrentButtonTheme() || "buttonTheme1",
  itemToEdit: "",
  itemsListLength: getCurrentItemsListLength(),
  previousBackgroundTheme: getCurrentBackgroundTheme(),
  previousButtonTheme: "buttonTheme5",
  selectedItem: "",
};

const setAppState = (appStateKey, newValue) => {
  if (appStateKey === "backgroundTheme") {
    appState.backgroundTheme = newValue;
  } else if (appStateKey === "buttonTheme") {
    appState.buttonTheme = newValue;
  } else if (appStateKey === "itemToEdit") {
    appState.itemToEdit = newValue;
  } else if (appStateKey === "itemsListLength") {
    appState.itemsListLength = newValue;
  } else if (appStateKey === "previousBackgroundTheme") {
    appState.previousBackgroundTheme = newValue;
  } else if (appStateKey === "previousButtonTheme") {
    appState.previousButtonTheme = newValue;
  } else if (appStateKey === "selectedItem") {
    appState.selectedItem = newValue;
  }
};

const createItemIcon = (iconClasses) => {
  let newItemIcon = document.createElement("span");
  let newItemIconName = document.createTextNode("close");

  newItemIcon.className = iconClasses;
  newItemIcon.appendChild(newItemIconName);

  return newItemIcon;
};

const formatInput = (userInput) => {
  if (userInput.trim().includes(" ")) {
    let formatArray = userInput.trim().toLowerCase().split(" ");
    let numberOfWords = formatArray.length;
    let formattedString = "";

    for (let i = 0; i < numberOfWords; i++) {
      formattedString +=
        formatArray[i].replace(
          formatArray[i][0],
          formatArray[i][0].toUpperCase()
        ) + " ";
    }

    return formattedString;
  } else {
    let newString = userInput.trim().toLowerCase();

    return newString.replace(newString[0], newString[0].toUpperCase());
  }
};

const addItemToList = () => {
  if (itemInputComponent.value.trim().length === 0) {
    alert("Error, Please enter an item");
    return;
  }

  if (isDuplicateItem(formatInput(itemInputComponent.value.trim()))) {
    alert("Item is already in the list");
    return;
  }

  if (isValidLength(formatInput(itemInputComponent.value.trim())) === false) {
    alert("Error, item must be less than 20 characters");
    return;
  }

  let newItem = document.createElement("li");
  let newItemName = document.createTextNode(
    formatInput(itemInputComponent.value.trim())
  );

  newItem.appendChild(newItemName);
  newItem.appendChild(createItemIcon(removeItemIconClasses));
  newItem.classList.add("shoppingItem");
  itemsList.appendChild(newItem);

  saveItemToStorage(formatInput(itemInputComponent.value.trim()));
  setAppState("itemsListLength", getCurrentItemsListLength());
  checkAppState();
  addThemes();
  itemInputComponent.value = "";
};

const addItemToListByKeyBoard = (e) => {
  if (e.key === "Enter") {
    if (itemInputComponent.value.trim().length === 0) {
      alert("Error, Please enter an item");
      return;
    }
    if (isDuplicateItem(formatInput(itemInputComponent.value.trim()))) {
      alert("Item is already in the list");
      return;
    }

    if (isValidLength(formatInput(itemInputComponent.value.trim())) === false) {
      alert("Error, item must be less than 20 characters");
      return;
    }

    if (editItemButton.classList.contains("hideComponent")) {
      let newItem = document.createElement("li");
      let newItemName = document.createTextNode(
        formatInput(itemInputComponent.value.trim())
      );

      newItem.appendChild(newItemName);
      newItem.appendChild(createItemIcon(removeItemIconClasses));
      newItem.classList.add("shoppingItem");
      itemsList.appendChild(newItem);

      saveItemToStorage(formatInput(itemInputComponent.value));
      setAppState("itemsListLength", getCurrentItemsListLength());
      checkAppState();
      addThemes();

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

const saveThemesToStorage = (theme) => {
  let themesData = getThemesFromStorage();

  if (theme.indexOf("button") !== -1) {
    themesData[0] = theme;
    localStorage.setItem("themesData", JSON.stringify(themesData));
  } else if (theme.indexOf("background") !== -1) {
    themesData[1] = theme;
    localStorage.setItem("themesData", JSON.stringify(themesData));
  }
};

const removeItemFromList = (e) => {
  if (e.target.parentElement.classList.contains("shoppingItem")) {
    if (confirm("Selected item will be deleted")) {
      e.target.parentElement.remove();

      let itemToRemove = e.target.parentElement.textContent;
      itemToRemove = itemToRemove.replace("close", "");

      removeItemFromStorage(itemToRemove, "one");
    }
  } else if (e.target.parentElement.classList.contains("itemsList")) {
    let itemToEdit = e.target.textContent;
    itemToEdit = itemToEdit.replace("close", "");
    itemInputComponent.value = itemToEdit;
    setAppState("selectedItem", itemToEdit);
    toggleButtonVisibility(e);
  }
  setAppState("itemsListLength", getCurrentItemsListLength());
  checkAppState();
};

const selectOneItemToEdit = (selectedItem) => {
  let currentItemsList = document.querySelectorAll("li");
  currentItemsList.forEach((item) => {
    if (item.textContent !== selectedItem) {
      item.classList.remove("editItem");
      item.lastElementChild.classList.remove("hideComponent");
    }
  });
};

const toggleButtonVisibility = (e) => {
  let selectedItem = e.target;

  setAppState("itemToEdit", selectedItem.textContent.replace("close", ""));

  if (selectedItem.classList.contains("editItem")) {
    addItemButton.classList.remove("hideComponent");
    editItemButton.classList.add("hideComponent");
    selectedItem.classList.remove("editItem");
    selectedItem.lastElementChild.classList.remove("hideComponent");
  } else {
    selectOneItemToEdit(selectedItem);
    addItemButton.classList.add("hideComponent");
    editItemButton.classList.remove("hideComponent");
    selectedItem.classList.add("editItem");
    selectedItem.lastElementChild.classList.add("hideComponent");
  }
};

const editItem = () => {
  if (itemInputComponent.value.length === 0) {
    alert("Error, Item cannot be updated");
    return;
  }
  if (confirm("Selected item will be updated")) {
    let newItemName = formatInput(itemInputComponent.value);
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
  let itemsListArray = Array.from(itemsList.querySelectorAll("li"));

  itemsListArray.forEach((item) => {
    let itemName = item.firstChild.textContent.toLowerCase();
    itemName.indexOf(inputData) !== -1
      ? (item.style.display = "flex")
      : (item.style.display = "none");
  });
};

isDuplicateItem = (item) => {
  let itemsData = getItemsFromStorage();

  return itemsData.includes(item);
};

const isValidLength = (userInput) => {
  return userInput.length < 20;
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

const changeAppTheme = () => {
  if (appState.buttonTheme === "buttonTheme1") {
    setAppState("buttonTheme", "buttonTheme2");
    saveThemesToStorage("buttonTheme2");
    setAppState("previousButtonTheme", "buttonTheme5");
    setAppState("backgroundTheme", "backgroundTheme2");
    saveThemesToStorage("backgroundTheme2");
    setAppState("previousBackgroundTheme", "backgroundTheme5");
    addThemes();
  } else if (appState.buttonTheme === "buttonTheme2") {
    setAppState("buttonTheme", "buttonTheme3");
    saveThemesToStorage("buttonTheme3");
    setAppState("previousButtonTheme", "buttonTheme2");
    setAppState("backgroundTheme", "backgroundTheme3");
    saveThemesToStorage("backgroundTheme3");
    setAppState("previousBackgroundTheme", "backgroundTheme2");
    addThemes();
  } else if (appState.buttonTheme === "buttonTheme3") {
    setAppState("buttonTheme", "buttonTheme4");
    saveThemesToStorage("buttonTheme4");
    setAppState("previousButtonTheme", "buttonTheme3");
    setAppState("backgroundTheme", "backgroundTheme4");
    saveThemesToStorage("backgroundTheme4");
    setAppState("previousBackgroundTheme", "backgroundTheme3");
    addThemes();
  } else if (appState.buttonTheme === "buttonTheme4") {
    setAppState("buttonTheme", "buttonTheme5");
    saveThemesToStorage("buttonTheme5");
    setAppState("previousButtonTheme", "buttonTheme4");
    setAppState("backgroundTheme", "backgroundTheme5");
    saveThemesToStorage("backgroundTheme5");
    setAppState("previousBackgroundTheme", "backgroundTheme4");
    addThemes();
  } else if (appState.buttonTheme === "buttonTheme5") {
    setAppState("buttonTheme", "buttonTheme1");
    saveThemesToStorage("buttonTheme1");
    setAppState("previousButtonTheme", "buttonTheme5");
    setAppState("backgroundTheme", "backgroundTheme1");
    saveThemesToStorage("backgroundTheme1");
    setAppState("previousBackgroundTheme", "backgroundTheme5");
    addThemes();
  } else {
  }
};

const addThemes = () => {
  let buttonArray = document.querySelectorAll("button");
  let itemArray = document.querySelectorAll("li");

  buttonArray.forEach((button) => {
    button.classList.remove(appState.previousButtonTheme);
    button.classList.add(appState.buttonTheme);
  });

  itemArray.forEach((listItem) => {
    listItem.classList.remove(appState.previousButtonTheme);
    listItem.classList.add(appState.buttonTheme);
  });
};

addItemButton.addEventListener("click", addItemToList);
editItemButton.addEventListener("click", editItem);
deleteAllButton.addEventListener("click", deleteAllItems);
themeButton.addEventListener("click", changeAppTheme);

itemInputComponent.addEventListener("keydown", addItemToListByKeyBoard);
itemsList.addEventListener("click", removeItemFromList);
filterInputComponent.addEventListener("input", filterItems);
document.addEventListener("DOMContentLoaded", generateItemsList);

checkAppState();
