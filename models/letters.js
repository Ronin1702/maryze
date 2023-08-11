const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Letters extends Model { }

Letters.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    letter_body: {
        type: DataTypes.TEXT(`
${{ full_name }}
${{ date }}
${{ company_name }}
${{ email }}

Dear Hiring and Recruitment team!

Upon learning that there is a ${{job_title}} position opportunity at ${{company_name}}, 
I was excited to reach out and introduce myself. When reviewing the job description, 
I saw that my skills and experience align with your company''s needs and position requirements. 
What I offer as a professional, I feel collaborates well with your company''s core mission and culture.

I am an seasoned professional with over ${{work_exprience}} years of relevant experience. 
I have developed myself and honed my ${{rel_skills1}}, ${{rel_skills2}}, and ${{rel_skills3}} skill sets, 
making me an ideal fit for the ${{job_title}} position. 

My current educational level is ${{education_exp}}. 

I am excited at the prospect of bringing my talents to ${{company_name}}. 
I look forward to hearing from you, at your earliest convenience, 
to discuss how my experience and qualifications will prove valuable in the ${{job_title}} role.

Thank you for your time and consideration. 

Sincerely,
${{full_name}}
${{date}}
${{company_name}}
${{email}}`),
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