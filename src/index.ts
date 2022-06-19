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
import perf from 'execution-time';
import prettyMilliseconds from 'pretty-ms';

const timer = perf();

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
// @ts-ignore
if (args._[0] === 'build') {
    // custom console.log not from Logger
    const hrstart = process.hrtime();
    // build(currDir, args);
    let start: number = 1;
    for (let i = 0; i < 500000; i++) {
        // intensive task
        start = start * i;
    }
    const hrend = process.hrtime(hrstart);
    const time = prettyMilliseconds(hrend[1] / 1000000 + hrend[0]*1000)
    console.log(`✨ built in ${chalk.green(time)}`);
    // show build info
    console.log('📦 built to: ' + chalk.yellow(join(currDir, 'build')));
}