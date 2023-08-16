// Asynchronous function to handle the login form submission
const loginFormHandler = async (event) => {

  // Prevent the default behavior of the form submission (e.g., page refresh)
  event.preventDefault();

  // Retrieve the username and password input values from the form and trim any whitespace
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // Check if both username and password fields have values
  if (username && password) {
    // Send a POST request to the server's login endpoint with the entered username and password
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // If the login request is successful (HTTP status 200-299)
    if (response.ok) {
      // Redirect the user to the dashboard page
      document.location.replace('/dashboard');
    } else {
      // If the login request fails, alert the user to review their credentials
      alert('Login failed, please review credentials.');
    }
  }
};

// Attach the 'loginFormHandler' function to the 'submit' event of the form with id 'login-form'
document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
