const express = require('express');
const router = express.Router();
const { Letters, Prompt } = require('../../models');
const withAuth = require('../../utils/auth');

// /api/letter-routes to find all under this user
router.get('/', withAuth, async (req, res) => {
    try {
        const letters = await Letters.findAll({
            where: {
                user_id: req.session.user_id,
            },
        });

        res.json(letters);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// /api/letters/promptid to create a new letter
// when you click create in the dashboard, you need to input answer of the question,
router.post('/:promptid', withAuth, async (req, res) => {
    try {
        // since letters belongs to prompt, we need to check if we have this prompt id or not
        const promptData = await Prompt.findOne({
            attributes: ['id', 'file_name', 'full_name', 'created_at', 'company_name', 'email', 'job_title', 'work_exp', 'rel_skills1', 'rel_skills2', 'rel_skills3', 'education_exp'],
            where: {
                id: req.params.promptid,
                user_id: req.session.user_id,
            },
        });
        // if no prompt can find, we can not generated a letter
        if (!promptData) {
            return res.status(404).json({ message: 'Prompt not found' });
        }

        // cerated new letter by using our format
        const newLetter = await Letters.create({
            letter_name: `${promptData.file_name}`,
            letter_body: `
${promptData.full_name}
${promptData.created_at}
${promptData.company_name}
${promptData.email}
            
Dear Hiring and Recruitment team!
            
Upon learning that there is a ${promptData.job_title} position opportunity at ${promptData.company_name},
I was excited to reach out and introduce myself. When reviewing the job description,
I saw that my skills and experience align with your company's needs and position requirements.
What I offer as a professional, I feel collaborates well with your company's core mission and culture.
            
I am an seasoned professional with over ${promptData.work_exp} years of relevant experience.
I have developed myself and honed my ${promptData.rel_skills1}, ${promptData.rel_skills2}, and ${promptData.rel_skills3} skill sets,
 making me an ideal fit for the ${promptData.job_title} position.
            
My current educational level is ${promptData.education_exp}.
            
I am excited at the prospect of bringing my talents to ${promptData.company_name}.
I look forward to hearing from you, at your earliest convenience,
to discuss how my experience and qualifications will prove valuable in the ${promptData.job_title} role.
            
Thank you for your time and consideration.
            
Sincerely,
${promptData.full_name}
${promptData.created_at}
${promptData.company_name}
${promptData.email}`,
            prompt_id: req.params.promptid,
            user_id: req.session.user_id,
        });

        res.json(newLetter);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});




// /api/letters/${id} to find one letter
router.get('/:id', async (req, res) => {
    try {
        const letter = await Letters.findOne({
            where: {
                id: req.params.id,
            },
        });

        if (letter) {
            res.json(letter);
        } else {
            res.status(404).json({ message: 'Letter not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// /api/letters/${id} to delete one letter
router.delete('/:id', withAuth, async (req, res) => {
    try {
        // find that letter first
        const letter = await Letters.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!letter) {
            return res.status(404).json({ message: 'Letter not found' });
        }
        res.json({ message: 'Letter deleted' });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


router.put('/:id', withAuth, async (req, res) => {
    try {
        const letter = await Letters.findOne({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!letter) {
            return res.status(404).json({ message: 'Letter not found' });
        }
        await letter.update({
            letter_name: req.body.letter_name,
            letter_body: req.body.letter_body,
        });

        const letters = letter.get({ plain: true });
        res.render('edit-cv', { letters, logged_in: true });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});



module.exports = router;


