const { User } = require('../models');

const userData = [
    {
        'username': 'dog',
        'email': 'bigdog@dogmail.com',
        'password': '123456'
    },

]



const seedUser = () => User.bulkCreate(userData)
module.exports = seedUser;