// Define an asynchronous function to handle the user signup process
async function signup(event) {
    // Prevent the default action of the form submission (e.g., page refresh)
    event.preventDefault();

    // Retrieve the values input by the user for username, email, and password from the form, and trim any excess whitespace
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    // Log the entered details to the console (for debugging purposes)
    console.log(username, email, password);

    // Ensure all fields have values before proceeding
    if (username && password && email) {
        // Send a POST request to the server's signup endpoint with the user's details
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' }
        });

        // If the server responds positively (e.g., successful registration, HTTP 200-299)
        if (response.ok) {
            // Log the success message to the console (for debugging)
            console.log('You just created a new account!');

            // Redirect the user to the dashboard page after successful signup
            document.location.replace('/dashboard');
        } else {
            // If the signup request fails, alert the user about potential reasons
            alert('Sign Up Failed: Username Already Exist, Email Already Used, or Password too Short');
        }
    }
}

// Attach the 'signup' function to the 'submit' event of the form with id 'signup-form'
document.querySelector('#signup-form').addEventListener('submit', signup);
