const moment = require('moment');

const pkg = require('./package.json');
const childProcess = require('child_process');

const getLatestCommit = () => {
  return childProcess
    .execSync(`git reflog | grep "HEAD@{0}"`)
    .toString()
    .split('\n')[0]
    .split(' ')[0];
};

const coverageDir = process.NODE_ENV === 'quicktest' ? `/home/yhsudo/jest/${pkg.name}/${moment().unix()}_${getLatestCommit()}` : './coverage';
module.exports = {
  preset: 'ts-jest',
  forceExit: true,
  maxConcurrency: 1,
  testEnvironment: "node",
  transform: { "^.+\\.tsx?$": "ts-jest" },
  verbose: true,
  //testRegex: 'test/(.+)\\.test\\.(jsx?|tsx?)$', // testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: [
    "js",
    "json",
    "ts",
    "tsx",
    "jsx",
    "node",
  ],
  coverageDirectory: coverageDir,
  reporters: [
    "default",
    [
      "jest-stare",
      {
        "resultDir": `${coverageDir}/results`,
        "additionalResultsProcessors": [
          "jest-junit",
        ],
        "coverageLink": '../lcov-report/index.html',
        "jestStareConfigJson": "jest-stare.json",
        "jestGlobalConfigJson": "globalStuff.json",
      },
    ],
  ],
};