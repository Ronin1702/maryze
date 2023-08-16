async function accountUpdate(event) {
    //it seems like the accountUpdate function was being called twice that's why the alert window pops twice based on the console log
    console.log("accountUpdate function called");
    event.preventDefault();

    const accountName = document.querySelector('#accountName').value.trim();
    // const oldPassword = document.querySelector('#oldPassword').value.trim();
    const newPassword = document.querySelector('#newPassword').value.trim();
    const confirmPassword = document.querySelector('#confirmPassword').value.trim();
    const userID = document.querySelector('#userID').getAttribute("data-user-id");

    if (accountName && newPassword && confirmPassword) {
        if (newPassword !== confirmPassword) {
            alert('New Password did not match confirm password')
        } else {
            const response = await fetch(`/api/users/${userID}`, {
                method: 'PUT',
                body: JSON.stringify({ username: accountName, password: newPassword, }),
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.ok) {
                console.log('You just updated an old account!')
                document.location.replace('/dashboard');
            } else {
                alert('Update failed');
            }
        }
    }
}

//I'm creating a bypass down here by redefining the button, remove the listener, then adding it back so that it only listens once.
const updateAccountButton = document.getElementById('updateAccount');

// Before adding a new event listener, it's a good practice to remove any old ones to prevent duplicates.
updateAccountButton.removeEventListener('click', accountUpdate);

// Now, attach the event listener
updateAccountButton.addEventListener('click', accountUpdate);
