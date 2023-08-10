async function deleteCV(event) {
    event.preventDefault();

    const id = window.location.toString().split('/').pop();

    const response = await fetch(`/api/letters/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({ letters_id: id }),
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

document.getElementById('delete-button').addEventListener('click', deletePost);