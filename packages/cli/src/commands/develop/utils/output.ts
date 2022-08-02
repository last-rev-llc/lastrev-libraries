import chalk from 'chalk';

const indent = (string: string, count = 1, indentString: string = ' ') => {
  if (count === 0) {
    return string;
  }

  const regex = /^/gm;

  return string.replace(regex, indentString.repeat(count));
};

const bang = process.platform === 'win32' ? '»' : '›';

function termwidth(stream: any): number {
  if (!stream.isTTY) {
    return 80;
  }

  const width = stream.getWindowSize()[0];
  if (width < 1) {
    return 80;
  }

  if (width < 40) {
    return 40;
  }

  return width;
}
export const stdtermwidth = termwidth(process.stdout);
export const errtermwidth = termwidth(process.stderr);

const displayOutput = (str: string, indentString: string, indentNum: number = 0) => {
  // let output = wrap(str, errtermwidth - 6, { trim: false, hard: true } as any);
  let output = indent(str, 3 + indentNum);
  output = indent(output, 1, indentString as any);
  output = indent(output, 1);
  console.log(output);
};

const getScopes = (libs: string[]): string => {
  return libs.map((lib) => `--scope=${lib}`).join(' ');
};

const output = {
  nl: () => displayOutput('', ' '),
  info: (str: string, indentNum?: number) => displayOutput(str, ' ', indentNum),
  warn: (str: string, indentNum?: number) => displayOutput(str, chalk.yellow(bang), indentNum),
  error: (str: string, indentNum?: number) => {
    displayOutput(str, chalk.red(bang), indentNum);
  },
  howToRunDev: (existingLibs: string[]) => {
    output.nl();
    output.info(
      `To start development, open a terminal window in your ${chalk.cyan(
        'lastrev-libraries'
      )} project and run ${chalk.italic.yellow(`yarn dev ${`${getScopes(existingLibs)} --include-dependencies`}`)}.`
    );
    output.info(`and then, in this project, run ${chalk.italic.yellow('yarn dev')}.`);
  }
};

export default output;
