const router = require('express').Router();
const sequelize = require('sequelize');
const { Letters, Prompt, User } = require('../models');
const withAuth = require('../utils/auth')


// go to /dashboard, if you are logged in, you will get all cover letters you alrady have
router.get('/', withAuth, async (req, res) => {
    try {
        const cvData = await Letters.findAll({
            where: {
                user_id: req.session.user_id,
            },
            attributes: ['id', 'prompt_id', 'user_id', 'created_at'],
            include: [
                {
                    model: Prompt,
                    attributes: [
                        'id',
                        'full_name',
                        'email',
                        'company_name',
                        'job_title',
                        'work_exp',
                        'education_exp',
                        'rel_skills1',
                        'rel_skills2',
                        'rel_skills3'
                    ],
                    include: {
                        model: User,
                        attributes: ['username'],
                    },
                },
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
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
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const cvData = await Letters.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ['id', 'prompt_id', 'user_id', 'created_at'],
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Prompt,
                    attributes: [
                        'id',
                        'full_name',
                        'email',
                        'company_name',
                        'job_title',
                        'work_exp',
                        'education_exp',
                        'rel_skills1',
                        'rel_skills2',
                        'rel_skills3'],
                    include: {
                        model: User,
                        attributes: ['username'],
                    },
                },
            ],
        });

        if (!cvData) {
            res.status(404).json({ message: 'No cover letter found' });
            return;
        }

        const cover = cvData.get({ plain: true });
        res.render('editpost', { cover, logged_in: true });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});




module.exports = router;