async function accountUpdate(event) {
    event.preventDefault();

    const accountName = document.querySelector('#accountName').value.trim();

    const newPassword = document.querySelector('#newPassword').value.trim();
    const confirmPassword = document.querySelector('#confirmPassword').value.trim();
    const userID = document.querySelector('#userID').getAttribute("data-user-id");

    console.log(accountName, newPassword, confirmPassword)
    if (accountName && newPassword && confirmPassword) {
        if (newPassword !== confirmPassword) {
            alert('New Password did not match confirm password')
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

document.getElementById('submit').addEventListener('submit', accountUpdate);