const router = require('express').Router();
const sequelize = require('sequelize');
const { Letters, Prompt, User } = require('../models');
const withAuth = require('../utils/auth')


// go to /dashboard, if you are logged in, you will get all cover letters you already have
router.get('/', withAuth, async (req, res) => {
    try {
        const cvData = await Letters.findAll({
            where: {
                user_id: req.session.user_id,
            },
            attributes: ['id', 'letter_body', 'created_at'],
        });

        const covers = cvData.map((cover) => cover.get({ plain: true }));
        res.render('dashboard', { covers, logged_in: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to render dashboard',
            error: err
        });
    }
});



//  this is /dashboard/edit/:id
router.put('/edit/:id', withAuth, async (req, res) => {
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
            letter_body: `
            ${prompt.full_name}
            ${prompt.date}
            ${prompt.company_name}
            ${prompt.email}
            
            Dear Hiring and Recruitment team!
            
            Upon learning that there is a ${prompt.job_title} position opportunity at ${prompt.company_name},
            I was excited to reach out and introduce myself. When reviewing the job description,
            I saw that my skills and experience align with your company's needs and position requirements.
            What I offer as a professional, I feel collaborates well with your company's core mission and culture.
            
            I am an seasoned professional with over ${prompt.work_exp} years of relevant experience.
            I have developed myself and honed my ${prompt.rel_skills1}, ${prompt.rel_skills2}, and ${prompt.rel_skills3} skill sets,
            making me an ideal fit for the ${prompt.job_title} position.
            
            My current educational level is ${prompt.education_exp}.
            
            I am excited at the prospect of bringing my talents to ${prompt.company_name}.
            I look forward to hearing from you, at your earliest convenience,
            to discuss how my experience and qualifications will prove valuable in the ${prompt.job_title} role.
            
            Thank you for your time and consideration.
            
            Sincerely,
            ${prompt.full_name}
            ${prompt.date}
            ${prompt.company_name}
            ${prompt.email}
            `,
        });

        const letters = letter.get({ plain: true });
        res.render('edit-cv', { letters, logged_in: true });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


//  this is /dashboard/create to create
router.get('/create', withAuth, (req, res) => {
    try {
        res.render('create-cv', { logged_in: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to render create page',
            error: err
        });
    }
});



// /dashboard/${id} to delete one letter
router.delete('/:id', withAuth, async (req, res) => {
    try {
        // find that letter first
        const letter = await Letters.findOne({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!letter) {
            return res.status(404).json({ message: 'Letter not found' });
        }

        // delete letter
        await letter.destroy();

        res.json({ message: 'Letter deleted' });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;