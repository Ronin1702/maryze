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
            attributes: ['id', 'letter_name', 'letter_body', 'created_at'],
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
            letter_body: req.body.letter_body,
            letter_name: req.body.letter_name,
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