"use strict";
// https://github.com/WincAcademy/local_api#readme
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const api_url = 'http://localhost:3000/';
const getItem = function () {
    return __awaiter(this, void 0, void 0, function* () {
        mainList.querySelectorAll('li').forEach(element => element.remove());
        try {
            const response = yield fetch(api_url, {
                method: "GET",
                headers: {
                    'Content-Type': "application/json",
                },
            });
            const data = yield response.json();
            for (let entry of data) {
                addItemToDOM(entry);
            }
        }
        catch (err) {
            console.log(`Get error: ${err}`);
        }
    });
};
const postItem = function (newToDoItem) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = {
            'description': newToDoItem,
            'done': false,
        };
        try {
            const request = yield fetch(api_url, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify(data)
            });
            // const receipt = await request.json();
            // console.log('Data succesfully created:', receipt)
        }
        catch (error) {
            // console.log(`Post error: ${error}`)
        }
    });
};
const deleteItem = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${api_url}${id}`, {
                method: 'DELETE'
            });
            // console.log('Data successfully deleted:', response)
            getItem();
        }
        catch (error) {
            console.log(`Delete error: ${error}`);
        }
    });
};
const updateItem = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedItem = document.getElementById(`${id}`);
        const UpdatedDone = updatedItem.querySelector('.list-item_check').checked;
        const updatedDesc = updatedItem.querySelector('.list-item_description').innerHTML;
        const data = {
            'description': updatedDesc,
            'done': UpdatedDone
        };
        try {
            const response = yield fetch(`${api_url}${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            // const receipt = await response.json();
            // console.log('Data successfully updated:', receipt)
        }
        catch (error) {
            console.log(`Put error: ${error}`);
        }
    });
};
