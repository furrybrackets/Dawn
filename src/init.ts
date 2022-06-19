import Log from './logger.js';
import inquirer from 'inquirer';
import { fileURLToPath, pathToFileURL } from "url";
import { resolve, join, dirname } from 'path';
import chalk from 'chalk';
import fs from 'fs-extra';
import Handlebars from 'handlebars';

function validateName(value: string): boolean {
    // name cannot:
    // be empty
    // have spaces
    // be more than 128 characters

    if (value.length < 1) {
        Log.error('Name cannot be empty, lmao!');
        return false;
    } else if (value.indexOf(' ') > -1) {
        Log.error('Name cannot have spaces.');
        Log.hint(
            'Replace spaces with dashes, or use underscores.'
        )
        return false;
    } else if (value.length > 128) {
        Log.error('w-why? When would you need a name that long?');
        Log.hint('Max name length is 128 characters. Try a shorter name.');
        return false;
    }
    return true;
}

export default function init(__filename: string, __dirname: string, currDir: string, args: any): void {
    // inquirer prompt
    const questions = [
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?',
            default: 'dawn-app',
            validate: (value) => {
                return validateName(value);
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Enter a short description of your project:',
        },
        {
            type: 'input',
            name: 'author',
            message: 'Enter your name:',
            default: 'John Doe',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter your email:',
        },
        {
            type: 'list',
            name: 'license',
            message: 'Choose a license:',
            choices: [
                'MIT',
                'Apache',
                'GPL',
                'BSD',
                'None',
                'Other'
            ],
            default: 'MIT'
        },
        {
            type: 'input',
            name: 'version',
            message: 'Enter the version of your project:',
            default: '0.0.1',
            validate: (value) => {
                if (value.length < 1) {
                    Log.error('Version cannot be empty.');
                    return false;
                }
                // version must be a valid semver version
                // https://semver.org/
                const regex = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
                if (!regex.test(value)) {
                    Log.error('Version must be a valid semver version.');
                    return false;
                }
                return true;
            }
        }
    ]

    inquirer.prompt(questions).then((answers) => {
        // scaffold out project from template/ directory
        const templateDir = resolve(__dirname, '../template');
        const projectDir = join(currDir, answers.name);
        Log.info(`Creating project: ${chalk.green(answers.name)}`);
        // copy template directory to current directory
        console.log(templateDir);
        fs.copySync(templateDir, projectDir);
        // replace template placeholders with answers
        /* 
        README.md
        project.toml
        LICENSE
        */
        const readmePath = join(projectDir, 'README.md');
        const readme = fs.readFileSync(readmePath, 'utf8');
        const readmeTemplate = Handlebars.compile(readme);
        const readmeOutput = readmeTemplate({
            name: answers.name,
            description: answers.description,
        });
        fs.writeFileSync(readmePath, readmeOutput);
        const tomlPath = join(projectDir, 'project.toml');
        const toml = fs.readFileSync(tomlPath, 'utf8');
        const tomlTemplate = Handlebars.compile(toml);
        const tomlOutput = tomlTemplate({
            name: answers.name,
            description: answers.description,
            version: answers.version,
            license: answers.license,
            author: `${answers.author} ${answers.email ? `<${answers.email}>` : ''}`,
        });
        fs.writeFileSync(tomlPath, tomlOutput);
        const licensePath = join(projectDir, 'LICENSE');
        // read license template from licenses/ directory
        const licenseTemplate = fs.readFileSync(join(__dirname, '../licenses', answers.license + '.txt'), 'utf8');
        const licenseTemplateCompiled = Handlebars.compile(licenseTemplate);
        const licenseOutput = licenseTemplateCompiled({
            name: answers.name,
            description: answers.description,
            year: new Date().getFullYear(),
            author: answers.author
        });
        fs.writeFileSync(licensePath, licenseOutput);
        })
}