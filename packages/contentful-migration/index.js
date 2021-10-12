const { runMigration } = require('contentful-migration/built/bin/cli');
const readline = require('readline');
const path = require('path');

require('dotenv').config();

/* PLEASE ONLY EDIT THESE TWO VARIABLES.
  ONCE YOU RUN THE SCRIPT PLEASE REMOVE THE VALUE HERE
  TO PREVENT ANY MISTAKES FOR FUTURE SCRIPTS TO RUN
*/

// TODO: Add the ability to get these from a CLI check list based of the Contentful user
const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const CONTENTFUL_MANAGEMENT_API = process.env.CONTENTFUL_MANAGEMENT_API;
const CONTENTFUL_ENVIRONMENT = 'last-rev-framework-inital';
const MIGRATION_FILE_NAME = 'link.js';

/** ******************************************************
 * DO NOT EDIT BELOW THIS LINE
 ******************************************************* */

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const options = {
  spaceId: CONTENTFUL_SPACE_ID,
  accessToken: CONTENTFUL_MANAGEMENT_API,
  environmentId: CONTENTFUL_ENVIRONMENT,
  yes: false
};

const migrations = async () => {
  await new Promise(async (resolve, reject) => {
    console.log(options.environmentId);
    if (options.environmentId.toLowerCase() === 'master') {
      rl.question(
        '********** YOU ARE ABOUT TO RUN ON MASTER!!! DO YOU WANT TO PROCEED? (Y/N) ************ \n',
        async (answer) => {
          if (answer.toLowerCase() !== 'y') {
            rl.close();
          } else {
            console.log('RUNNING ON MASTER, I HOPE YOU KNOW WHAT YOU ARE DOING!');
            await runMigration({
              ...options,
              ...{
                filePath: path.join(__dirname, `./migrations/${MIGRATION_FILE_NAME}`)
              }
            });
          }
        }
      );
    } else {
      await runMigration({
        ...options,
        ...{
          filePath: path.join(__dirname, `./migrations/${MIGRATION_FILE_NAME}`)
        }
      });
    }
  });

  console.log('Migration Done');
};

rl.on('close', () => {
  console.log('\nBYE BYE !!!');
  process.exit(0);
});

migrations();
