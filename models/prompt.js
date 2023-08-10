const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Prompt extends Model {}

Prompt.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // User's full name
    full_name: {
        type: DataTypes.TEXT,
        allowNull: false,   
    },
    // user's email
    email: {
        type: DataTypes.TEXT,
        allowNull: false,   
    },
    //
    company_name: {
        type: DataTypes.TEXT,
        allowNull: false,   
    },
    job_title: {
        type: DataTypes.TEXT,
        allowNull: false,   
    },
    // work experience
    work_exp: {
        type: DataTypes.TEXT,
        allowNull: true,   
    },
    // education experience
    education_exp: {
        type: DataTypes.TEXT,
        allowNull: true,   
    },
    // users skill sets
    rel_skills1: {
        type: DataTypes.TEXT,
        allowNull: true,   
    },
    rel_skills2: {
        type: DataTypes.TEXT,
        allowNull: true,   
    },
    rel_skills3: {
        type: DataTypes.TEXT,
        allowNull: true,   
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    },
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'prompt'
});

module.exports = Prompt;