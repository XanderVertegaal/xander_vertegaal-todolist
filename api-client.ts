// https://github.com/WincAcademy/local_api#readme

const api_url = 'http://localhost:3000/'

const getItem = async function() {
    mainList.querySelectorAll('li').forEach(element => element.remove())
    try{
        const response = await fetch(api_url, {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
            },
        })
        const data = await response.json();
        for (let entry of data) {
            addItemToDOM(entry)
        }
    } catch (err) {
        console.log(`Get error: ${err}`)
    }
}

const postItem = async function(newToDoItem: string) {
    const data: object = {
        'description': newToDoItem,
        'done': false,
    }
    try {
        const request: Response = await fetch(api_url, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(data)
        })
        // const receipt = await request.json();
        // console.log('Data succesfully created:', receipt)
    } catch (error) {
        // console.log(`Post error: ${error}`)
    }
}

const deleteItem = async function(id: string) {
    try {
        const response = await fetch(`${api_url}${id}`, {
            method: 'DELETE'
        })
        // console.log('Data successfully deleted:', response)
        getItem();
    } catch (error) {
        console.log(`Delete error: ${error}`)
    }
}

const updateItem = async function(id: string) {
        const updatedItem = document.getElementById(`${id}`) as HTMLLIElement;
        const UpdatedDone = (updatedItem.querySelector('.list-item_check') as HTMLInputElement).checked;
        const updatedDesc = (updatedItem.querySelector('.list-item_description') as HTMLParagraphElement).innerHTML;
        const data: object = {
            'description': updatedDesc,
            'done': UpdatedDone
        };

    try {
        const response: Response = await fetch(`${api_url}${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        // const receipt = await response.json();
        // console.log('Data successfully updated:', receipt)
    } catch (error) {
        console.log(`Put error: ${error}`)
    }
}