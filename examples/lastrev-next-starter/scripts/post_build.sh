echo "Doing some cleanup..."

RUNNER_FOLDER=$PWD/packages/graphql-runner
GITIGNORE=$RUNNER_FOLDER/.gitignore
NOT_GITIGNORE=$RUNNER_FOLDER/!gitignore

echo $RUNNER_FOLDER

if [ -f "$NOT_GITIGNORE" ]; then
    mv ${NOT_GITIGNORE} ${GITIGNORE}  || echo "Failed to clean !gitignore"
    echo "Renamed !gitignore to .gitignore"
else
    echo "!gitignore is missing, check graphql-runner"
fi
