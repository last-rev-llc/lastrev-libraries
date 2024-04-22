/* eslint-disable no-loop-func */
import fs from 'fs';
import simpleGit from 'simple-git';
import inquirer from 'inquirer';
import { execSync } from 'child_process';
import { tmpdir } from 'os';
import { join } from 'path';

const getRndInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const RANDOM = () => getRndInteger(0, 32767);

const git = simpleGit({
  baseDir: process.cwd()
});

const run = async (directory: string, source: string, target: string) => {
  const TARGET_DIRECTORY = directory;
  const SOURCE_COMMIT = source;
  const TARGET_COMMIT = target;
  const GITHUB_REPO = 'git@github.com:last-rev-llc/lastrev-libraries.git';

  console.log(`Updating ${TARGET_DIRECTORY} with ${GITHUB_REPO} from ${SOURCE_COMMIT} to ${TARGET_COMMIT}`);

  // Temporarilly clone the repo
  const TEMP_DIR = join(tmpdir(), RANDOM().toString());
  const REPO_DIR = join(TEMP_DIR, 'lastrev-libraries');

  console.log(`Cloning ${GITHUB_REPO} to ${REPO_DIR}`);

  try {
    try {
      // git clone $GITHUB_REPO $REPO_DIR -q || echo "Failed to clone repo, already exists"
      await git.clone(GITHUB_REPO, REPO_DIR, ['-q']);
    } catch {
      console.log(`Failed to clone repo, already exists`);
    }
    // Find the diff between the two commits
    const PATCH_FILE = join(TEMP_DIR, 'patch.diff');

    // cd $REPO_DIR
    await git.cwd({ path: REPO_DIR, root: true });

    // Generate commit with squashed changes
    // git checkout $SOURCE_COMMIT -q
    await git.checkout(SOURCE_COMMIT, ['-q']);

    // git checkout -b tmpsquash -q
    await git.raw(['checkout', '-b', 'tmpsquash', '-q']);

    // git merge --squash $TARGET_COMMIT -q
    await git.raw(['merge', '--squash', TARGET_COMMIT, '-q']);

    // git commit -a -m "Update from $SOURCE_COMMIT to $TARGET_COMMIT" -q
    await git.raw(['commit', '-a', '-m', `Update from ${SOURCE_COMMIT} to ${TARGET_COMMIT}`, '-q']);

    // git format-patch $SOURCE_COMMIT --relative --stdout > $PATCH_FILE
    execSync(`git format-patch ${SOURCE_COMMIT} --relative --stdout > ${PATCH_FILE}`, {
      cwd: REPO_DIR
    });

    console.log(`Generated diff ${PATCH_FILE}`);

    console.log(`Apply the patch to ${TARGET_DIRECTORY}`);
    // cd $TARGET_DIRECTORY
    await git.cwd({ path: TARGET_DIRECTORY, root: true });

    // Add remote to prevent errors about sha misssings
    // git remote add old_repo $GITHUB_REPO  || console.log("Remote already exists");
    try {
      await git.addRemote('old_repo', GITHUB_REPO);
    } catch {
      console.log(`Remote already exists`);
    }

    // git fetch old_repo -q
    await git.fetch('old_repo', ['-q']);

    console.log('-------------------------------------');
    const { editPatch } = await inquirer.prompt([
      { type: 'confirm', name: 'editPatch', message: 'Would you like to edit the patch?' }
    ]);
    console.log('-------------------------------------');

    if (editPatch) {
      execSync(`open ${PATCH_FILE}`, { cwd: TARGET_DIRECTORY });
      await inquirer.prompt([
        {
          message: 'Verify the patch and hit enter to continue',
          type: 'input',
          name: 'apply patch'
        }
      ]);
      console.log('-------------------------------------');
    }

    // Apply patch with three way resolution
    // git am -3 -p3 --whitespace=fix $PATCH_FILE || FAILED=1
    let ACTION = '';
    try {
      execSync(`git am -3 -p3 --whitespace=fix ${PATCH_FILE}`, { cwd: TARGET_DIRECTORY });
    } catch (err) {
      ACTION = 'continue';
    }

    while (ACTION) {
      console.log('-------------------------------------');
      // read -p "Applying patch failed, please fix all conflicts and press enter to continue"
      // eslint-disable-next-line no-await-in-loop
      if (ACTION === 'continue') {
        await inquirer.prompt([
          {
            message: 'Applying patch failed, please fix all conflicts and press enter to continue',
            type: 'input',
            name: 'apply patch'
          }
        ]);
      }
      // AM_OUTPUT=$(git am --continue 2>&1)
      let AM_OUTPUT = '';
      try {
        AM_OUTPUT = execSync(`git am --${ACTION} 2>&1`, { cwd: TARGET_DIRECTORY, encoding: 'utf8' });
      } catch (err) {
        AM_OUTPUT = err.stdout;
      }

      // Check AM_OUTPUT for errors
      // grep -q "unmerged paths in your index" <<< $AM_OUTPUT
      if (AM_OUTPUT.indexOf('unmerged paths in your index') > -1) {
        ACTION = 'continue';
      } else if (AM_OUTPUT.indexOf('No changes') > -1) {
        ACTION = 'skip';
      } else {
        ACTION = '';
      }
    }

    console.log('Patch applied successfully, please see the changes and open a pull request');
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    // Cleanup the temp directory
    // rm -rf $TEMP_DIR
    fs.rmdirSync(TEMP_DIR, { recursive: true });
  }
};

export default run;
