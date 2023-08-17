
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
            attributes: ['id', 'letter_name', 'letter_body', 'created_at', 'updated_at'],
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

// go to /dashboard/edit/${id} to the one letter that you want
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const letterData = await Letters.findOne({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
            attributes: ['id', 'letter_name', 'letter_body', 'created_at', 'updated_at'],
        });

        if (!letterData) {
            return res.status(404).json({ message: 'Letter not found' });
        }

        const onecover = letterData.get({ plain: true });
        res.render('edit-cv', { onecover, logged_in: true });
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

//  this is /dashboard/account_update
router.get('/account_update', withAuth, async(req, res) => {
    try {
        const userData = await User.findOne({
            where:{
                id:req.session.user_id,
            },
            attributes:['id','username','password'],
        });
        
        if(!userData){
            return res.status(404).json({message:'Can not find user'})
        }

        const userInfo=userData.get({plain:true}); 
        res.render('account_update', {userInfo, logged_in: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to render account_update page',
            error: err
        });
    }
});

module.exports = router;