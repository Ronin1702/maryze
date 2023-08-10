const sequelize = require ('../config/connection');
const coverLetter = require('./cover-letter');
const prompt = require('./prompt');
const user = require('./user');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    await 
}