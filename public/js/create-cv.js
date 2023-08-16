// Define an asynchronous function named 'createCV' which gets triggered on an event
async function createCV(event) {
    // Prevent the default action of the event (like form submission)
    event.preventDefault();

    // Retrieve the values from the form elements and trim any whitespace
    const letterName = document.getElementById('coverName').value.trim();
    const cvName = document.getElementById('fullName').value.trim();
    const cvEmail = document.getElementById('email').value.trim();
    const cvCompany = document.getElementById('company').value.trim();
    const cvPosition = document.getElementById('position').value.trim();

    // Get the value of the checked radio buttons for Work Experience, Education, and Skills
    const cvWorkExp = document.querySelector('input[name="wexp"]:checked').value;
    const cvEducation = document.querySelector('input[name="educ"]:checked').value;
    const cvSkill1 = document.querySelector('input[name="skillset"]:checked').value;
    const cvSkill2 = document.querySelector('input[name="skillset2"]:checked').value;
    const cvSkill3 = document.querySelector('input[name="skillset3"]:checked').value;

    // Check if all necessary fields are filled out
    if (cvName && cvEmail && cvCompany && cvPosition && cvSkill1 && cvSkill2 && cvSkill3 && cvWorkExp && cvEducation) {

        // Send a POST request to the server to create a new CV
        const response = await fetch('/api/prompts/create', {
            method: 'POST',
            body: JSON.stringify({
                file_name: letterName,
                full_name: cvName,
                email: cvEmail,
                company_name: cvCompany,
                job_title: cvPosition,
                work_exp: cvWorkExp,
                education_exp: cvEducation,
                rel_skills1: cvSkill1,
                rel_skills2: cvSkill2,
                rel_skills3: cvSkill3,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // If CV creation is successful
        if (response.ok) {
            const responseData = await response.json();

            // Create a personalized letter using the data from the newly created CV
            const letter = await fetch(`/api/letters/${responseData.id}`, {
                method: 'POST',
                body: JSON.stringify({
                    prompt_id: responseData.id,
                    letter_name: `${responseData.file_name}`,
                    letter_body: `
${responseData.full_name}
${responseData.created_at}
${responseData.company_name}
${responseData.email}

Dear Hiring and Recruitment team!

... [Rest of the letter is here] ...

Sincerely,
${responseData.full_name}
${responseData.created_at}
${responseData.company_name}
${responseData.email}`
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // If letter creation is successful, redirect to the dashboard
            if (letter.ok) {
                document.location.replace('/dashboard');
            } else {
                alert("An error occurred, please try again.");
            }
        }
    } else {
        // If any required field is missing, alert the user
        alert("CV cannot be created. Required elements cannot be missing.");
    }
};

// Attach the 'createCV' function to the click event of the button (or element) with id 'submit'
document.getElementById('submit').addEventListener('click', createCV);
