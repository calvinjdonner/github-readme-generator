// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const util = require('util');
const generateMarkdown = require('./utils/generateMarkdown');
const writeFileAsync = util.promisify(fs.writeFile);

// TODO: Create a function to write README file
function promptUser() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'projectTitle',
            message: 'What is your project title?'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Write a brief description of your project:'
        },
        {
            type: 'input',
            name: 'installation',
            message: 'Describe the installation process if any:'
        },
        {
            type: 'input',
            name: 'usage',
            message: 'What is this project being used for?'
        },
        {
            type: 'list',
            name: 'license',
            message: 'Choose the appropriate license for this project: ',
            choices: [
                'Apache',
                'Academic',
                'GNU',
                'ISC',
                'MIT',
                'Mozilla',
                'Open'
            ]
        },
        {
            type: 'input',
            name: 'contributing',
            message: 'Who are the contributors to this project?'
        },
        {
            type: 'input',
            name: 'tests',
            message: 'Is there a test included?'
        },
        {
            type: 'input',
            name: 'questions',
            message: 'What do I do if I have an issue?',
        },
        {
            type: 'input',
            name:'username',
            message:'Please provide your GitHub username: (Required)',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('Please enter your GitHub username!');
                    return false;
                }
            }
        },
        {
            type:'input',
            name:'email',
            message:'Please provide your email:'
        }
    ])
}

// TODO: Create a function to initialize app
async function init() {
    try {
        const answers = await promptUser();
        const generateContent =  generateMarkdown(answers);
        await writeFileAsync('./deployed/README.md', generateContent);
        console.log('Successfully wrote to README.md');
    }   catch(err) {
        console.log(err);
    }
}

// Function call to initialize app
init();