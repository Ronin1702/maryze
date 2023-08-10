const { Prompt } = require('../models');

const promptData = [
    {
        full_name: 'Bill Gates',
        email: 'bill@gmail.com',
        company_name: 'google',
        job_title: 'CEO',
        work_exp: 'Pre-CEO in microsoft',
        education_exp: null,
        rel_skills1: 'former richest man in the world',
        rel_skills2: null,
        rel_skills3: null,
        user_id: 1
    }
]

const seedPrompt = () => Prompt.bulkCreate(promptData);
module.exports = seedPrompt;  