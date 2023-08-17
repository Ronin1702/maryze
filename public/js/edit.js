
// Define an asynchronous function named 'editCV' which is triggered on an event
async function editCV(event) {
    // Prevent the default action of the event (like form submission)
    event.preventDefault();

    // Extract the last segment of the current URL, which presumably represents the ID of the CV
    const id = window.location.toString().split('/').pop();

    // Retrieve values from the form elements and trim any whitespace
    const letter_body = document.getElementById('body').value.trim();
    const letter_name = document.getElementById('letter_name').value.trim();

    // Ensure that both the body and letter_name have content before proceeding
    if (letter_body && letter_name) {

        // Send a PUT request to the server to update the letter with the specified ID
        const response = await fetch(`/api/letters/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ id, letter_name, letter_body }), // Send the new details as JSON in the request body
            headers: {
                'Content-Type': 'application/json' // Specify the type of content being sent
            }
        });

        // If the server responds positively (HTTP 200-299)
        if (response.ok) {
            // Reload the current page to reflect the changes
            document.location.reload();
        } else {
            // If there's an issue with the update, alert the user
            alert('Something went wrong');
        }
    } else {
        // If either the title or body is missing, alert the user
        alert('Must have input of title and text!');
    }
}

// Attach the 'editCV' function to the click event of the button (or element) with id 'edit-button'
document.getElementById('edit-button').addEventListener('click', editCV);
