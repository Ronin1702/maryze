// Define an asynchronous function to handle user logout
const logout = async () => {
    // Send a GET request to the server's logout endpoint to initiate the logout process
    const response = await fetch('/api/users/logout', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    // If the server responds positively (HTTP 200-299)
    if (response.ok) {
        // Redirect the user to the login page after successful logout
        document.location.replace('/login');
    } else {
        // If there's an issue with the logout, display the server's error message to the user
        alert(response.statusText);
    }
};

// Attach the 'logout' function to the click event of the element with id 'logout'
document.querySelector('#logout').addEventListener('click', logout);
