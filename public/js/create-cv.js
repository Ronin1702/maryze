async function createCV(event) {
    event.preventDefault();

    const letterName = document.getElementById('coverName').value.trim();
    const cvName = document.getElementById('fullName').value.trim();
    const cvEmail = document.getElementById('email').value.trim();
    const cvCompany = document.getElementById('company').value.trim();
    const cvPosition = document.getElementById('position').value.trim();

    const cvWorkExp = document.querySelector('input[name="wexp"]:checked').value;
    const cvEducation = document.querySelector('input[name="educ"]:checked').value;
    const cvSkill1 = document.querySelector('input[name="skillset"]:checked').value;
    const cvSkill2 = document.querySelector('input[name="skillset2"]:checked').value;
    const cvSkill3 = document.querySelector('input[name="skillset3"]:checked').value;


    if (cvName && cvEmail && cvCompany && cvPosition && cvSkill1 && cvSkill2 && cvSkill3 && cvWorkExp && cvEducation) {
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
        if (response.ok) {
            const responseData = await response.json();
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

Upon learning that there is a ${responseData.job_title} position opportunity at ${responseData.company_name},
I was excited to reach out and introduce myself. When reviewing the job description,
I saw that my skills and experience align with your company's needs and position requirements.
What I offer as a professional, I feel collaborates well with your company's core mission and culture.

I am an seasoned professional with over ${responseData.work_exp} years of relevant experience.
I have developed myself and honed my ${responseData.rel_skills1}, ${responseData.rel_skills2}, and ${responseData.rel_skills3} skill sets,
making me an ideal fit for the ${responseData.job_title} position.

My current educational level is ${responseData.education_exp}.

I am excited at the prospect of bringing my talents to ${responseData.company_name}.
I look forward to hearing from you, at your earliest convenience,
to discuss how my experience and qualifications will prove valuable in the ${responseData.job_title} role.

Thank you for your time and consideration.

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
            if (letter.ok) {
                document.location.replace('/dashboard');
            } else {
                alert("An error occurred, please try again.");
            }
        }
    } else {
        alert("CV cannot be not created. Required elements can not be missing.");
    }
};


document.getElementById('submit').addEventListener('click', createCV);5