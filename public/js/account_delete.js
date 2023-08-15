async function accountDelete(event) {
    event.preventDefault();

    const confirmation = confirm('Are you sure you want to delete your account?')
    if (confirmation) {
        const userID = document.querySelector('#userID').getAttribute("data-user-id");

        const response = await fetch(`/api/users/${userID}`, {
            method: 'DELETE',
            body: JSON.stringify({ id: userID }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert("Oops! Something went wrong!");
        }
    };


}

document.getElementById('deleteAccount').addEventListener('click', accountDelete);