const inputField = document.querySelector('#text-input') as HTMLInputElement;
const addButton = document.querySelector('#btnAdd') as HTMLInputElement;
const mainList = document.querySelector('#main-list') as HTMLElement;

interface dataCard {
    description: string;
    _createdOn: string;
    done: boolean;
    _id: string
}

const addItemToDOM = function(entry: dataCard) {
    const newLi = document.createElement('li')
    newLi.className = "list-item"
    newLi.id = entry._id;

    const newDesc = document.createElement('p')
    newDesc.className = "list-item_description"
    newDesc.innerHTML = entry.description;
    if (entry.done) {
        newDesc.classList.add('status-done')
    }

    const createTime = new Date(entry._createdOn)
    const newDate = document.createElement('p')
    newDate.className = "list-item_date"
    newDate.innerHTML = `Added on: ${createTime.toDateString()} at ${createTime.toLocaleTimeString()}`;

    const newImg = document.createElement('img')
    newImg.className = "list-item_img"
    newImg.src = "./bin.png"

    const newChk = document.createElement('input')
    newChk.type = 'checkbox'
    newChk.className = "list-item_check"
    newChk.checked = entry.done;

    newLi.append(newChk)
    newLi.append(newDesc)
    newLi.append(newDate)
    newLi.append(newImg)

    mainList.append(newLi)
};


inputField.addEventListener('input', () => {
    (inputField.value.replace(/\s+/g,'') === "" ? addButton.disabled = true : addButton.disabled = false);}
)

inputField.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Enter' && inputField.value.replace(/\s/g,'') !== "") {
        postItem(inputField.value)
        .then(() => getItem())
        inputField.value = '';
        addButton.disabled = true;
    }
})

addButton.addEventListener('click', () => {
    if (inputField.value.replace(/\s/g,'') !== "") {
        postItem(inputField.value)
        .then(() => getItem())
            inputField.value = '';
            addButton.disabled = true;
        }
    }
)

mainList.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLElement;
    const parent = target.parentNode as HTMLElement;
    const dateElement = parent.querySelector('.list-item_date') as HTMLParagraphElement

    if (target.className === "list-item_img" && parent !== null) {
        deleteItem(parent.id);
    }

    if (target.className === "list-item_check") {
        (target.nextElementSibling as HTMLParagraphElement).classList.toggle('status-done');
        updateItem(parent.id);
    }

    if (target.className.includes("list-item_description")) {
        target.classList.toggle('visibility');
        const newTextInput = document.createElement('input');
        newTextInput.placeholder = "Input a new value";
        newTextInput.maxLength = 50;

        parent.insertBefore(newTextInput, dateElement)
        newTextInput.focus();

        newTextInput.addEventListener('focusout', () => {
                if (newTextInput.value.replace(/\s/g,'') !== "") {
                    target.innerHTML = newTextInput.value;
                }
                newTextInput.remove();
                target.classList.toggle('visibility');
                updateItem(parent.id)
        })
    }
});

getItem();