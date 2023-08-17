
const { Letters } = require('../models');

const letterData = [
    {
        user_id: 1,
        prompt_id: 1,
        letter_name:'defaultLetterName',
        letter_body:'This is a sample letter body'
    },

]

const seedLetter = () => Letters.bulkCreate(letterData);

module.exports = seedLetter;