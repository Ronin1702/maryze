const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Letters extends Model {}

Letters.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    company_name: {
        type: DataTypes.STRING,
        references: {
            model: 'prompt',
            key: 'company_name'
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    },
}, 
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'letter'
});
module.exports = Letters;