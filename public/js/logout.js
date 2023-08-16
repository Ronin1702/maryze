const logout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/login');
    } else {
        alert(response.statusText);
    }
};

// Logout when the user manually clicks the logout button
document.querySelector('#logout').addEventListener('click', logout);

let isCloseEvent = false;

// Check for typical mouse events
window.addEventListener('mousedown', (event) => {
    isCloseEvent = (event.clientY < 0 || event.clientX > (window.innerWidth || document.documentElement.clientWidth));
});

// Check for ALT + F4
window.addEventListener('keydown', (event) => {
    isCloseEvent = (event.altKey && event.key === 115);
});
// Logout when the user closes the browser window or tab
window.addEventListener('beforeunload', (event) => {
    if (!isCloseEvent) return;

    logout();
    event.preventDefault();
});