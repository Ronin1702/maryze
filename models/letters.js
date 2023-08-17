
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Letters extends Model { }

Letters.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // added a letter name and we can use this more dynamic 
    letter_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    letter_body: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    prompt_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'prompt',
            key: 'id'
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