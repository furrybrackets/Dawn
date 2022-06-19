import chalk from 'chalk';

export default class Log {
    public static info(message: string): void {
        console.log(`${chalk.gray('(info)')} ${message}`);
    };

    public static warn(message: string): void {
        console.warn(`${chalk.yellow('(warn)')} ${message}`);
    }

    public static error(message: string, exitCode?: number): void {
        console.error(`${chalk.red('(error)')} ${message}`);
        if (exitCode) {
            process.exit(exitCode);
        };
    };

    public static success(message: string): void {
        console.log(`${chalk.green('(success)')} ${message}`);
    };

    public static debug(message: string): void {
        console.log(`${chalk.blue('(debug)')} ${message}`);
    };

    public static message(messager: string, message: string): void {
        console.log(`${chalk.magenta(`(${messager})`)} ${message}`);
    }

    public static hint(message: string): void {
        console.log(`${chalk.cyan('(hint)')} ${message}`);
    }
};