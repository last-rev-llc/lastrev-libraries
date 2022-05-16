/* eslint-disable no-loop-func */
import simpleGit from 'simple-git';
import inquirer from 'inquirer';

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const RANDOM = () => getRndInteger(0, 32767);

const git = simpleGit({
  baseDir: process.cwd()
});

const run = async (directory, source, target) => {
  const TARGET_DIRECTORY = directory;
  const SOURCE_COMMIT = source;
  const TARGET_COMMIT = target;
  const GITHUB_REPO = 'git@github.com:last-rev-llc/lastrev-libraries.git';

  console.log(`Updating ${TARGET_DIRECTORY} with ${GITHUB_REPO} from ${SOURCE_COMMIT} to ${TARGET_COMMIT}`);

  // Temporarilly clone the repo
  const TEMP_DIR = `/tmp/${RANDOM()}`;
  const REPO_DIR = `${TEMP_DIR}/lastrev-libraries`;

  console.log(`Cloning ${GITHUB_REPO} to ${REPO_DIR}`);

  try {
    // git clone $GITHUB_REPO $REPO_DIR -q || echo "Failed to clone repo, already exists"
    await git.clone(GITHUB_REPO, REPO_DIR, ['-q']);
  } catch (err) {
    throw Error(`Failed to clone repo, already exists error: ${err.message}`);
  }

  // Find the diff between the two commits
  const PATCH_FILE = `${TEMP_DIR}/patch.diff`;
  const STARTER_FOLDER = `${REPO_DIR}/examples/lastrev-next-starter`;

  // cd $REPO_DIR
  await git.cwd({ path: REPO_DIR, root: true });

  // Generate commit with squashed changes
  // git checkout $SOURCE_COMMIT -q
  await git.checkout(SOURCE_COMMIT, ['-q']);

  // git checkout -b tmpqsuash -q
  await git.checkoutBranch('tmpqsuash', SOURCE_COMMIT);

  // git merge --squash $TARGET_COMMIT -q
  await git.merge(['--squash', '-q']);

  // git commit -a -m "Update from $SOURCE_COMMIT to $TARGET_COMMIT" -q
  await git.commit(`Update from ${SOURCE_COMMIT} to ${TARGET_COMMIT}`, ['-a', '-m', '-q']);

  // git format-patch $SOURCE_COMMIT --relative --stdout -- $STARTER_FOLDER > $PATCH_FILE
  await git.raw([`format-patch ${SOURCE_COMMIT}`, '--relative', '--stdout', `-- ${STARTER_FOLDER} > ${PATCH_FILE}`]);

  console.log(`Generated diff ${PATCH_FILE}`);

  console.log(`Apply the patch to ${TARGET_DIRECTORY}`);
  // cd $TARGET_DIRECTORY
  await git.cwd({ path: TARGET_DIRECTORY, root: true });

  // Add remote to prevent errors about sha misssings
  // git remote add old_repo $GITHUB_REPO  || console.log("Remote already exists");
  try {
    await git.addRemote('old_repo', GITHUB_REPO);
  } catch (err) {
    throw Error(`Remote already exists, error: ${err.message}`);
  }

  // git fetch old_repo -q
  await git.fetch('old_repo', ['-q']);

  // Apply patch with three way resolution
  // git am -3 -p3 --whitespace=fix $PATCH_FILE || FAILED=1
  let FAILED = 0;
  await git.raw(['am', '-3', '-p3', '--whitespace=fix', `${PATCH_FILE} || ${FAILED = 1}`]);

  while (FAILED === 1) {
    console.log('-------------------------------------');
    // read -p "Applying patch failed, please fix all conflicts and press enter to continue"
    inquirer.prompt(['Applying patch failed, please fix all conflicts and press enter to continue']);
    let AM_OUTPUT = '';
    git.raw(['am', '--continue', '2>&1']).then((result) => {
      AM_OUTPUT = result;
      // Check AM_OUTPUT for errors
      // grep -q "unmerged paths in your index" <<< $AM_OUTPUT
      git.grep(`'unmerged paths in your index' <<< ${AM_OUTPUT}`).then((grepResult) => {
        FAILED = grepResult ? 1 : 0;
      });
    });
  }

  console.log('Patch applied successfully, please see the changes and open a pull request');
  // Cleanup the temp directory
  // rm -rf $TEMP_DIR
  await git.rm(TEMP_DIR);
};

run()
