
async function deleteCV(event) {
    event.preventDefault();

    const id = window.location.toString().split('/').pop();

    const response = await fetch(`/api/letters/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert("Oops! Something went wrong!");
    }

}

async function editCV(event) {
    event.preventDefault();

    const id = window.location.toString().split('/').pop();
    const body = document.getElementById('body').value.trim();
    const letter_name = document.getElementById('letter_name').value.trim();

    if (body && letter_name) {
        const response = await fetch(`/api/letter/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ id, letter_name, body }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('something went wrong');
        }
    } else {
        alert('Must have input of title and text!')
    }

}


document.getElementById('delete-button').addEventListener('click', deleteCV);
document.getElementById('edit-button').addEventListener('click', editCV);