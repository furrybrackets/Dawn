#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import chalk from 'chalk';
import { fileURLToPath, pathToFileURL } from "url";
import { resolve, join, dirname } from 'path';
import Log from './logger.js';
import init from './init.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const currDir = process.cwd();

const args = yargs(hideBin(process.argv))
    .command('init [name]', 'Create a new project', (yargs) => {
        yargs.positional('name', {
            describe: 'The name of the project',
            type: 'string',
            default: 'dawn-app'
        })
    })
    .command('build', 'Build the project', () => { })
    .help()
    .argv;
// @ts-ignore
if (args._[0] === 'init') {
    init(__filename, __dirname, currDir, args);
}