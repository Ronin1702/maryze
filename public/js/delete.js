
// Define an asynchronous function named 'deleteCV' which gets triggered on an event
async function deleteCV(event) {
    // Prevent the default action of the event (like form submission or button click)
    event.preventDefault();

    // Extract the last segment of the current URL, which presumably represents the ID of the CV
    const id = window.location.toString().split('/').pop();

    // Send a DELETE request to the server to remove the letter with the specified ID
    const response = await fetch(`/api/letters/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({ id }), // Send the CV ID in the request body as JSON
        headers: {
            'Content-Type': 'application/json' // Specify the type of content being sent
        }
    });

    // If the server responds positively (HTTP 200-299)
    if (response.ok) {
        // Redirect the user to the dashboard
        document.location.replace('/dashboard');
    } else {
        // If there's an issue with the deletion, alert the user
        alert("Oops! Something went wrong!");
    }

}

// Attach the 'deleteCV' function to the click event of the button (or element) with id 'delete-button'
document.getElementById('delete-button').addEventListener('click', deleteCV);
