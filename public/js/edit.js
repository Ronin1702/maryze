async function editCV(event) {
    event.preventDefault();

    const id = window.location.toString().split('/').pop();
    const letter_body = document.getElementById('body').value.trim();
    const letter_name = document.getElementById('letter_name').value.trim();

    if (body && letter_name) {
        const response = await fetch(`/api/letters/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ id, letter_name, letter_body }),
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

document.getElementById('edit-button').addEventListener('click', editCV);