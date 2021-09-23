import copyEnvironment from '@last-rev/contentful-import-export';
import { resolve } from 'path';
import { homedir } from 'os';
import { readFile, writeFile } from 'fs-extra';
import { prompt } from 'inquirer';
import open from 'open';
import { createClient } from 'contentful-management';
import { find } from 'lodash';

const contentfulrc = '.contentfulrc.json';
const contentfulConfigPath = resolve(homedir(), contentfulrc);

const APP_ID = '9f86a1d54f3d6f85c159468f5919d6e5d27716b3ed68fd01bd534e3dea2df864';
const REDIRECT_URI = 'https://www.contentful.com/developers/cli-oauth-page/';
const oAuthURL = `https://be.contentful.com/oauth/authorize?response_type=token&client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&scope=content_management_manage`;

const getTokenIfLoggedIn = async (): Promise<string | undefined> => {
  try {
    return JSON.parse(await readFile(contentfulConfigPath, 'utf-8')).managementToken;
  } catch (e) {
    return undefined;
  }
};

const logout = async () => {
  await writeFile(contentfulConfigPath, JSON.stringify({}));
};

const logIn = async (): Promise<string> => {
  if (['win32', 'darwin'].includes(process.platform)) {
    await open(oAuthURL, {
      wait: false
    });
  } else {
    console.log(
      `Unable to open your browser automatically. Please open the following URI in your browser:\n\n${oAuthURL}\n\n`
    );
  }

  const { token } = await prompt([
    {
      type: 'password',
      name: 'token',
      message: 'Paste your token here:',
      validate: (val) => /^[a-zA-Z0-9_-]{43,64}$/i.test(val.trim()) // token is 43 to 64 characters and accepts lower/uppercase characters plus `-` and `_`
    }
  ]);

  await writeFile(
    contentfulConfigPath,
    JSON.stringify(
      {
        managementToken: token,
        activeEnvironmentId: 'master',
        host: 'api.contentful.com'
      },
      null,
      2
    )
  );

  return token;
};

const performCmsFunctions = async () => {
  let token = await getTokenIfLoggedIn();

  if (token) {
    const { proceed } = await prompt([
      {
        name: 'proceed',
        message:
          'You are already logged in to Contentful. Would you like to proceed with this token? If not, you will be logged out and go through the login process again',
        type: 'confirm'
      }
    ]);
    if (!proceed) {
      await logout();
    }
  }

  if (!token) {
    token = await logIn();
  }

  const client = createClient({
    accessToken: token!
  });

  const { items: spaces } = await client.getSpaces();

  const { exportSpaceId, exportEnvId, importSpaceId, importEnvId, cmsTypes } = await prompt([
    {
      name: 'exportSpaceId',
      message: 'Please select which space to export from.',
      type: 'list',
      choices: spaces.map((space) => ({
        name: space.name,
        value: space.sys.id
      }))
    },
    {
      name: 'exportEnvId',
      message: 'Please select which environment to export from.',
      type: 'list',
      choices: async (answers) => {
        const space = find(spaces, { sys: { id: answers.exportSpaceId } });
        const { items: envs } = await space!.getEnvironments();

        return envs.map((env) => ({
          name: env.sys.id,
          value: env.sys.id
        }));
      }
    },
    {
      name: 'importSpaceId',
      message: 'Please select which space to import to.',
      type: 'list',
      choices: spaces.map((space) => ({
        name: space.name,
        value: space.sys.id
      }))
    },
    {
      name: 'importEnvId',
      message: 'Please select which environment to export from.',
      type: 'list',
      choices: async (answers) => {
        const space = find(spaces, { sys: { id: answers.importSpaceId } });
        const { items: envs } = await space!.getEnvironments();

        return envs.map((env) => ({
          name: env.sys.id,
          value: env.sys.id
        }));
      }
    },
    {
      name: 'cmsTypes',
      message: 'Please select which types to import.',
      type: 'checkbox',
      choices: [
        {
          name: 'Content Types',
          value: 'contentTypes',
          checked: true
        },
        {
          name: 'Entries',
          value: 'entries'
        },
        {
          name: 'Assets',
          value: 'assets'
        }
      ],
      validate: (val) => {
        if (val.length === 0) {
          return 'Please select at least one type.';
        }

        return true;
      }
    }
  ]);

  await copyEnvironment({
    exportParams: {
      spaceId: exportSpaceId,
      environmentId: exportEnvId,
      managementToken: token!
    },
    importParams: {
      spaceId: importSpaceId,
      environmentId: importEnvId,
      managementToken: token!
    },
    skipContentTypes: cmsTypes.indexOf('contentTypes') === -1,
    skipEntries: cmsTypes.indexOf('entries') === -1,
    skipAssets: cmsTypes.indexOf('assets') === -1
  });
};

export default performCmsFunctions;
