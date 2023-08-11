const router = require('express').Router();
const sequelize = require('sequelize');
const { Prompt } = require('../models');
const withAuth = require('../utils/auth');

// this is /create
router.post('/', withAuth, async (req, res) => {
    try {
        const promptData = await Prompt.create({
            id: req.body.id,
            full_name: req.body.full_name,
            email: req.body.email,
            company_name: req.body.company_name,
            job_title: req.body.job_title,
            work_exp: req.body.work_exp,
            education_exp: req.body.education_exp,
            rel_skills1: req.body.rel_skills1,
            rel_skills2: req.body.rel_skills2,
            rel_skills3: req.body.rel_skills3,
            user_id: req.session.user_id,
        });
        res.json(promptData);
        // removed render,because we only want to post data
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


module.exports = router;