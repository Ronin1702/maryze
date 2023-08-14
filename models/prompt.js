const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const moment = require('moment');

class Prompt extends Model { }

Prompt.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    file_name: {
        type: DataTypes.STRING,
        allowNull: false,
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
    created_at: {
        type: DataTypes.DATE,
        get() {
            return moment(this.getDataValue('created_at')).format('DD/MM/YYYY');
        },
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'prompt'
});

module.exports = Prompt;
