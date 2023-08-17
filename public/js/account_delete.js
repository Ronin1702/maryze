
// Define an asynchronous function named 'accountDelete' which gets triggered on an event
async function accountDelete(event) {
    // Prevent the default action of the event (like form submission or button click)
    event.preventDefault();

    // Display a confirmation dialog to the user and store their decision (true for OK, false for Cancel)
    const confirmation = confirm('Are you sure you want to delete your account?')

    // If the user confirms the deletion
    if (confirmation) {
        // Fetch the user ID from an HTML element with id 'userID'
        const userID = document.querySelector('#userID').getAttribute("data-user-id");

        // Send a DELETE request to the server to remove the user with the specified ID
        const response = await fetch(`/api/users/${userID}`, {
            method: 'DELETE',
            // Send the user ID in the request body as JSON
            body: JSON.stringify({ id: userID }),
            headers: {
                // Specify the type of content being sent
                'Content-Type': 'application/json'
            }
        });

        // If the server responds positively (HTTP 200-299)
        if (response.ok) {
            // Redirect the user to the homepage
            document.location.replace('/');
        } else {
            // If there's an issue with the deletion, alert the user
            alert("Oops! Something went wrong!");
        }
    };
}

// Attach the 'accountDelete' function to the click event of the button (or element) with id 'deleteAccount'
document.getElementById('deleteAccount').addEventListener('click', accountDelete);
