# Maryze [![MIT](https://img.shields.io/static/v1.svg?label=📃%20License&message=MIT&color=important)](./LICENSE)

*[Maryze](https://cover-letter-generator-3000-7a5be5cf3592.herokuapp.com/)*, a short twist from the term summarize, is a cover letter generator website where the account holders can create, update and delete cover letters.

## Table of Contents

- [Description](#description)
- [Technology](#technology)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Links](#links)
- [License](#license)

## Description

```md
AS A employee who is seeking a job
I WANT a cover letter site to generate different CVs for different employers
SO THAT I can create, update, and delete cover letters.
```

[_back to top_](#table-of-contents)

## Technology

- [![Node.js](https://img.shields.io/badge/Node.js®-v20.5.1-blue?logo=node.js)](https://nodejs.org/en)

- [![npm](https://img.shields.io/badge/npm-v9.8.1-blue?logo=npm)](https://docs.npmjs.com/cli/v9/)
  - [![bcrypt Package](https://img.shields.io/badge/bcrypt-5.1.0-green?logo=npm)](https://www.npmjs.com/package/bcrypt)
  - [![connect-session-sequelize Package](https://img.shields.io/badge/Connect--Session--Sequelize-7.1.7-green?logo=npm)](https://www.npmjs.com/package/connect-session-sequelize)
  - [![DotEnv Package](https://img.shields.io/badge/DotEnv-16.3.1-green?logo=dotenv)](https://www.npmjs.com/package/dotenv)
  - [![Express Package](https://img.shields.io/badge/Express-4.18.2-green?logo=express)](https://www.npmjs.com/package/express)
  - [![express-handlebars Package](https://img.shields.io/badge/Express--Handlebars-7.1.1-green?logo=express)](https://www.npmjs.com/package/express-handlebars)
  - [![express-session Package](https://img.shields.io/badge/Express--Session-1.17.3-green?logo=express)](https://www.npmjs.com/package/express-session)
  - [![Fomantic-UI Package](https://img.shields.io/badge/Fomantic--UI-2.9.2-green?logo=npm)](https://fomantic-ui.com/)
  - [![MySQL2 Package](https://img.shields.io/badge/MySQL2-2.1.0-green?logo=mysql)](https://www.npmjs.com/package/mysql2)
  - [![Sequelize Package](https://img.shields.io/badge/sequelize-5.21.7-green?logo=sequelize)](https://www.npmjs.com/package/sequelize)

[_back to top_](#table-of-contents)

## Installation

- Packages to support this application can be installed by using [_npm install_](https://docs.npmjs.com/cli/v9/commands/npm-install) commands.

> **Note**: If you do not have a `package.json` in your directory already, enter command below to [_initiate_](https://docs.npmjs.com/cli/v9/commands/npm-init).
>
> ```bash
> npm init -y
> ```
>
> ```bash
> npm i bcrypt@5.0.0 connect-session-sequelize@7.0.4 dotenv@8.2.0 express@4.17.1 express-handlebars@5.2.0 express-session@1.17.1 fomantic-ui@2.9.2 mysql2@2.2.5 nodemon@3.0.1 sequelize@6.3.5
> ```
>
> **Important**: Please @ the **EXACT** versions as shown above to ensure the functionality of this application.

**Before you start, make sure to created a _`.env`_ file in the root directory as the example shown below:**

```bash
DB_USER=root
DB_PASSWORD=your-password
DB_NAME=letters_db
DB_HOST=localhost
JAWSDB_URL=your-JawsDB-connection-string
SESSION_SECRET=set-a-secret-here
```

- Source the `schema.sql` in `MySQL`:

```bash
mysql -u root -p
```

- Seed the application by entering the command below:

```bash
npm run seed
```

> Note: If you would like to `git fork` this repo and deploy it on _Heroku_, please make sure to set the environment variable with the `Heroku CLI` command below:
>
> ```bash
> heroku config:set SESSION_SECRET=your-secret-key
> ```

[_back to top_](#table-of-contents)

## Usage

- This application can be invoked by using the following command:

```bash
npm start
```

- Workflow:

```md
GIVEN the Cover Letter Generator site: Maryze
WHEN I visit the site for the first time
THEN I am presented with the homepage that shows only HOME and Log In options in the Nav Bar as well as a Get Started button in the homepage
WHEN I click on the Get Started Button
THEN I am taken to the Log In page if not logged in, or else enter the Dashboard page where the cover letters can be created, updated, and deleted
WHEN I click on the log in page
THEN I am presented with options to Log In or Sign Up instead.
WHEN I choose to sign up
THEN I am prompted to create a username, email and password
WHEN I click on the sign-up button
THEN my user credentials are saved and I am logged into the site
WHEN I revisit the site at a later time and choose to Log In
THEN I am prompted to enter my username and password
WHEN I am signed in to the site
THEN I see the navigation links for the Home, Dashboard, Account Update, and the option to log out
WHEN I click on the Home option in the navigation
THEN I am taken to the Home page and presented with an updated Nav Bar that shows all the options if logged in
WHEN I click on Dashboard
THEN I am presented with a Create CV button, existing CVs, and Instructions
WHEN I click on the Create CV button
THEN I am taken to the CREATE page and presented with a form that has input options for  Doc Name, First and Last Name, E-mail, What Company is receiving this CV, and What position are you applying for. As well as list of choices of Years of Relevant Work Experience,Education, Select Top 3 Skills #1, Select Top 3 Skills #2, Select Top 3 Skills #3
WHEN I click on the Submit button at the bottom
IF I have NOT corrected filled out all the requirements
THEN an alert window will pop up and inform the user that error
ELSE the CV is created and I am taken back to the Dashboard page where I am presented a list of all created CVs and the Date they were created
WHEN I click on the link of any cover letter
THEN I am taken to the edit page of that CV where the account holder and update and delete the cover letter's name and content
WHEN I click the Update CV button
THEN the update is saved and displayed on the right side that is read-only
WHEN I click on the Delete CV button
THEN the CV is deleted forever
WHEN I click on the Account Update option in the Nav Bar
THEN I am taken to the Account Update page where a form to update account name, new password, and confirm password is displayed and the current account name is already inserted in the input box
WHEN I click on the Update button
IF I have filled out all three requirements
THEN the account is updated
ELSE an alert window will pop up and inform the user the error
WHEN I click on the Delete Account button
THEN an alert window will pop up and ask the user to double check if they want to delete the account
WHEN the user select YES
THEN the account is deleted
WHEN the user select NO
THEN the user is taken back to the account update page
WHEN I click on the Logout option in the Nav Bar
THEN I am logged out and taken back to the Home page where only Home and Login option is displayed in the Nav Bar and the Get Started button takes the user to the log in page
```

[_back to top_](#table-of-contents)

## Walkthrough Video

- Home Page when Not Logged In

[_back to top_](#table-of-contents)

## Links

[![Tweet about this](https://img.shields.io/static/v1.svg?label=Tweet%20about%20this&message=🎵&color=blue&logo=twitter&style=social)](https://twitter.com/intent/tweet?text=Check%20out%20this%20Cover-Letter-Generator%20App%20on%20Heroku:%20https://cover-letter-generator-3000-7a5be5cf3592.herokuapp.com/%20)

- GitHub Repo: [Cover-Letter-Generator](https://github.com/Ronin1702/project2)
- Deployed _Heroku_ Application: [Cover-Letter-Generator-3000](https://cover-letter-generator-3000-7a5be5cf3592.herokuapp.com/)

[_back to top_](#table-of-contents)

## License

- This application is licensed by [![MIT](https://img.shields.io/static/v1.svg?label=📃%20License&message=MIT&color=important)](./LICENSE).

[_back to top_](#table-of-contents)

---

[![Copyright](https://img.shields.io/static/v1.svg?label=Cover%20Letter%20Generator%203000%20&©️%20&message=%202023%20Team%20One&labelColor=informational&color=033450)](https://cover-letter-generator-3000-7a5be5cf3592.herokuapp.com/)
