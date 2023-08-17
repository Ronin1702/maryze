
const express = require('express');
const router = express.Router();
const { Prompt } = require('../../models');
const withAuth = require('../../utils/auth');


// /api/prompts and using get to find all answered prompt under this user
router.get('/', withAuth, async (req, res) => {
    try {
        const promptData = await Prompt.findAll({
            where: { user_id: req.session.user_id },
        });
        res.json(promptData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// /api/prompts/${id} and using get to find one that you want
router.get('/:id', withAuth, async (req, res) => {
    try {
        const promptData = await Prompt.findOne({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (promptData) {
            res.json(promptData);
        } else {
            res.status(404).json({ message: 'Prompt not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// /api/prompts/crate and using post method to create a new prompt
router.post('/create', withAuth, async (req, res) => {
    try {
        const newPrompt = await Prompt.create({
            file_name: req.body.file_name,
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
            created_at: req.body.created_at,
        });
        // res.json(newPrompt);
        return res.status(201).json({ id: newPrompt.id });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// /api/prompts/${id} and using put to update prompt that you want
router.put('/:id', withAuth, async (req, res) => {
    try {
        const promptData = await Prompt.findOne({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (promptData) {
            await promptData.update({
                // file_name: req.body.file_name,
                full_name: req.body.full_name,
                email: req.body.email,
                company_name: req.body.company_name,
                job_title: req.body.job_title,
                work_exp: req.body.work_exp,
                education_exp: req.body.education_exp,
                rel_skills1: req.body.rel_skills1,
                rel_skills2: req.body.rel_skills2,
                rel_skills3: req.body.rel_skills3,
            });
            res.json(promptData);
        } else {
            res.status(404).json({ message: 'Prompt not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// /api/prompts/${id} and using delete to delete prompt, I added ondelete in models/index.js
// if you delete this prompt, the cv letter under this prompt should be delete as well  
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const promptData = await Prompt.findOne({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (promptData) {
            await promptData.destroy();
            res.json({ message: 'Prompt deleted' });
        } else {
            res.status(404).json({ message: 'Prompt not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;