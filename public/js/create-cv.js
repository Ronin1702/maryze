async function createCV(event) {
    event.preventDefault();

    const cvName = document.getElementById('fullName').value.trim();
    const cvEmail = document.getElementById('email').value.trim();
    const cvCompany = document.getElementById('company').value.trim();
    const cvPosition = document.getElementById('position').value.trim();
    const cvWorkExp = document.getElementById('workExperience').value.trim();
    const cvEducation = document.getElementById('education').value.trim();
    const cvSkill1 = document.getElementById('skill1').value.trim();
    const cvSkill2 = document.getElementById('skill2').value.trim();
    const cvSkill3 = document.getElementById('skill3').value.trim();


    if (cvName && cvEmail && cvCompany && cvPosition && cvSkill1 && cvSkill2 && cvSkill3) {
        const response = await fetch(`/api/letters/{id}`, {
            method: 'POST',
            body: JSON.stringify({ cvName, 
                cvEmail, 
                cvCompany, 
                cvPosition, 
                cvWorkExp, 
                cvEducation, 
                cvSkill1, 
                cvSkill2, 
                cvSkill3}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert("An error occured, please try again.");
        }
    } else {
        alert("CV cannot be not created. Required elements can not be missing.");
    }
};
    

document.getElementById('CreateCV').addEventListener('click', createCV);