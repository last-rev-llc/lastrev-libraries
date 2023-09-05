#!/bin/bash

# If a graphql strategy is not defined, default to fs,
# if redis stratedgy is fs, then prepare for and then run cms sync,
if [[ "${GRAPHQL_RUNNER_STRATEGY}" == "fs" ]] || [[ -z "${GRAPHQL_RUNNER_STRATEGY}" ]]; then

    # This script ensures cms-sync folder is not ignored during turbo build
    # The fingerprint hash that Turbo uses ignores anything ignored in the .gitignore file
    # We want the cms-sync data to be part of the hash for the graphql-runner package
    # This way when content changes packages depending on graphql-runner will be invalidated
    echo "Removing cms-sync from graphql-runner .gitignore"

    RUNNER_FOLDER=$PWD/packages/graphql-runner
    GITIGNORE=$RUNNER_FOLDER/.gitignore
    NOT_GITIGNORE=$RUNNER_FOLDER/!gitignore

    echo $GITIGNORE

    if [ -f "$GITIGNORE" ]; then
        echo ".gitignore exists."
    else
        echo ".gitignore does not exist. Trying to fix..."
        if [ -f "$NOT_GITIGNORE" ]; then
            mv ${NOT_GITIGNORE} ${GITIGNORE} || echo "Failed to fix from !gitignore"
        else
            echo "!gitignore does not exist. Please fix manually."
            echo "Web build cache hash will not include cms-sync folder"
        fi
    fi

    if [ -f "$GITIGNORE" ]; then
        mv ${GITIGNORE} ${NOT_GITIGNORE}
        echo "Renamed .gitignore to !gitignore"
    fi

    echo "Syncing CMS data.."
    pnpm turbo:sync:cms --output-logs=new-only
else
    echo "Graphql strategy is '${GRAPHQL_RUNNER_STRATEGY}'. Skipping cms sync."
fi
