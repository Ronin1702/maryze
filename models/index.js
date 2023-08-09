const User = require('./user');
const Prompt = require('./prompt');
const Letters = require('./letters');


Prompt.hasOne(Letters, {
    foreignKey: 'prompt_id'
});


Letters.belongsTo(Prompt, {
    foreignKey: 'prompt_id',
    onDelete: 'CASCADE'
});




User.hasMany(Letters, {
    foreignKey: 'user_id'
});

Letters.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Prompt, {
    foreignKey: 'user_id'
});

Prompt.belongsTo(User, {
    foreignKey: 'user_id'
});







module.exports = { User, Prompt, Letters };