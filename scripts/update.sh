#!bash
# Update the target directory from X version to Y 
# Given a source commit and a target commit
TARGET_DIRECTORY=$1
GITHUB_REPO=git@github.com:last-rev-llc/lastrev-libraries.git
SOURCE_COMMIT=origin/main
TARGET_COMMIT=origin/max/turbo

echo "Updating $TARGET_DIRECTORY with $GITHUB_REPO from $SOURCE_COMMIT to $TARGET_COMMIT"

# Temporarilly clone the repo 
TEMP_DIR="/tmp/$RANDOM"
REPO_DIR="$TEMP_DIR/lastrev-libraries"

echo "Cloning $GITHUB_REPO to $REPO_DIR"

git clone $GITHUB_REPO $REPO_DIR -q || echo "Failed to clone repo, already exists"

# Find the diff between the two commits
PATCH_FILE="$TEMP_DIR/patch.diff"
STARTER_FOLDER=$REPO_DIR/examples/lastrev-next-starter
cd $REPO_DIR
git checkout $SOURCE_COMMIT -q
git checkout -b tmpqsuash -q

git merge --squash $TARGET_COMMIT -q
git commit -a -m "Update from $SOURCE_COMMIT to $TARGET_COMMIT" -q

git format-patch $SOURCE_COMMIT --relative --stdout -- $STARTER_FOLDER > $PATCH_FILE 

echo "Generated diff $PATCH_FILE"

echo "Apply the patch to $TARGET_DIRECTORY"
# Replace @lrns with @<app-name>
cd $TARGET_DIRECTORY

git am -3 -p3 --whitespace=fix $PATCH_FILE || FAILED=1

while [ $FAILED -eq 1 ]
do
    echo "-------------------------------------" 
    read -p "Applying patch failed, please fix all conflicts and press enter to continue"
    AM_OUTPUT=$(git am --continue 2>&1)
    # Check AM_OUTPUT for errors 
    if grep -q "unmerged paths in your index" <<< $AM_OUTPUT; 
    then
        FAILED=1
    else
        FAILED=0
    fi
done

echo "Patch applied successfully, please see the changes and open a pull request"
# Cleanup the temp directory 
rm -rf $TEMP_DIR
