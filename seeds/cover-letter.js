const { Letters } = require('../models');

const letterData = [
    {
        user_id: 1,
        prompt_id: 1,
    },

]

const seedLetter = () => Letters.bulkCreate(letterData);

module.exports = seedLetter;