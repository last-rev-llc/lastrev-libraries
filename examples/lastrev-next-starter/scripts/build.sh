#!/bin/bash
function cleanup() {
    rv=$?
    yarn gql:pm2:kill
    exit $rv
}

trap "cleanup" EXIT

yarn propagate:env

# Run build and cleanup pm2 if it fails
echo "Building..."
STAGE=build yarn turbo:build --output-logs=new-only $1 || echo "Build failed."
