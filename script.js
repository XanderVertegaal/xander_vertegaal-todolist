"use strict";
const inputField = document.querySelector('#text-input');
const addButton = document.querySelector('#btnAdd');
const mainList = document.querySelector('#main-list');
const addItemToDOM = function (entry) {
    const newLi = document.createElement('li');
    newLi.className = "list-item";
    newLi.id = entry._id;
    const newDesc = document.createElement('p');
    newDesc.className = "list-item_description";
    newDesc.innerHTML = entry.description;
    if (entry.done) {
        newDesc.classList.add('status-done');
    }
    const createTime = new Date(entry._createdOn);
    const newDate = document.createElement('p');
    newDate.className = "list-item_date";
    newDate.innerHTML = `Added on: ${createTime.toDateString()} at ${createTime.toLocaleTimeString()}`;
    const newImg = document.createElement('img');
    newImg.className = "list-item_img";
    newImg.src = "./bin.png";
    const newChk = document.createElement('input');
    newChk.type = 'checkbox';
    newChk.className = "list-item_check";
    newChk.checked = entry.done;
    newLi.append(newChk);
    newLi.append(newDesc);
    newLi.append(newDate);
    newLi.append(newImg);
    mainList.append(newLi);
};
inputField.addEventListener('input', () => {
    (inputField.value.replace(/\s+/g, '') === "" ? addButton.disabled = true : addButton.disabled = false);
});
inputField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && inputField.value.replace(/\s/g, '') !== "") {
        postItem(inputField.value)
            .then(() => getItem());
        inputField.value = '';
        addButton.disabled = true;
    }
});
addButton.addEventListener('click', () => {
    if (inputField.value.replace(/\s/g, '') !== "") {
        postItem(inputField.value)
            .then(() => getItem());
        inputField.value = '';
        addButton.disabled = true;
    }
});
mainList.addEventListener('click', (e) => {
    const target = e.target;
    const parent = target.parentNode;
    const dateElement = parent.querySelector('.list-item_date');
    if (target.className === "list-item_img" && parent !== null) {
        deleteItem(parent.id);
    }
    if (target.className === "list-item_check") {
        target.nextElementSibling.classList.toggle('status-done');
        updateItem(parent.id);
    }
    if (target.className.includes("list-item_description")) {
        target.classList.toggle('visibility');
        const newTextInput = document.createElement('input');
        newTextInput.placeholder = "Input a new value";
        newTextInput.maxLength = 50;
        parent.insertBefore(newTextInput, dateElement);
        newTextInput.focus();
        newTextInput.addEventListener('focusout', () => {
            if (newTextInput.value.replace(/\s/g, '') !== "") {
                target.innerHTML = newTextInput.value;
            }
            newTextInput.remove();
            target.classList.toggle('visibility');
            updateItem(parent.id);
        });
    }
});
getItem();
