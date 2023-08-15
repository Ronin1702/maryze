async function accountUpdate(event) {
    event.preventDefault();

    const accountName = document.querySelector('#accountName').value.trim();
    const oldPassword = document.querySelector('#oldPassword').value.trim();
    const newPassword = document.querySelector('#newPassword').value.trim();
    const confirmPassword = document.querySelector('#confirmPassword').value.trim();
    const userID = document.querySelector('#userID').getAttribute("data-user-id");

    console.log(accountName, oldPassword, newPassword, confirmPassword)
    if (accountName && newPassword && oldPassword && confirmPassword) {
        if (newPassword !== confirmPassword) {
            alert('New Password did not match confirm password')
        } else {
            console.log(userID)
            const response = await fetch("/api/users/compareOldPassword", {
                method: 'POST',
                body: JSON.stringify({ oldPassword })
            })
            if (response.ok) {
                if (!response.body.passwordMatch) {
                    alert('Wrong Current Password!')
                } else {
     
                    const newResponse = await fetch(`/api/users/${userID}`, {
                        method: 'PUT',
                        body: JSON.stringify({ username: accountName, password: newPassword, }),
                        headers: { 'Content-Type': 'application/json' }
                    });
                    if (newResponse.ok) {
                        console.log('You just updated an old account!')
                        document.location.replace('/');

                    } else {
                        alert('Update failed');
                    }
                }
            }
        }
    }

    document.getElementById('submit').addEventListener('click', accountUpdate);
