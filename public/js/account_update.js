async function accountUpdate(event) {
    event.preventDefault();

    const accountName = document.querySelector('#accountName').value.trim();
    const oldPassword = document.querySelector('#oldPassword').value.trim();
    const newPassword = document.querySelector('#newPassword').value.trim();
    const confirmPassword = document.querySelector('#confirmPassword').value.trim();
    const userID = document.querySelector('#userID').getAttribute("data-user-id");

    if (accountName && newPassword && confirmPassword && oldPassword) {
        try {
            const checkPasswordResponse = await fetch(`/api/users/check-password/${userID}`, {
                method: 'POST',
                body: JSON.stringify({ password: oldPassword }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (checkPasswordResponse.ok) {
                const { passwordMatches } = await checkPasswordResponse.json();

                if (passwordMatches) {
                    if (newPassword !== confirmPassword) {
                        alert('New Password did not match confirm password');
<<<<<<< HEAD
=======
                        return;
>>>>>>> origin/main
                    } else {
                        const updateResponse = await fetch(`/api/users/${userID}`, {
                            method: 'PUT',
                            body: JSON.stringify({ username: accountName, password: newPassword }),
                            headers: { 'Content-Type': 'application/json' }
                        });

                        if (updateResponse.ok) {
                            console.log('You just updated an old account!');
                            document.location.replace('/dashboard');
                        } else {
                            alert('Update failed');
<<<<<<< HEAD
=======
                            return;
>>>>>>> origin/main
                        }
                    }
                } else {
                    alert('Old Password is incorrect');
<<<<<<< HEAD
                }
            } else {
                alert('Failed to check old password');
=======
                    return;
                }
            } else {
                alert('Failed to check old password');
                return;
>>>>>>> origin/main
            }
        } catch (error) {
            console.error(error);
        }
    }
}

<<<<<<< HEAD
document.getElementById('submit').addEventListener('click', accountUpdate);
=======
//I'm creating a bypass down here by redefining the button, remove the listener, then adding it back so that it only listens once.
const updateAccountButton = document.getElementById('updateAccount');

// Before adding a new event listener, it's a good practice to remove any old ones to prevent duplicates.
updateAccountButton.removeEventListener('click', accountUpdate);

// Now, attach the event listener
updateAccountButton.addEventListener('click', accountUpdate);
>>>>>>> origin/main
