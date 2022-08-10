#!/bin/bash
function cleanup() {
    rv=$?
    sh "$PWD/scripts/post_build.sh"
    exit $rv
}

trap "cleanup" EXIT

yarn propagate:env

# Run build and cleanup pm2 if it fails
echo "Building..."
STAGE=build yarn turbo:build --output-logs=new-only $1 || echo "Build failed."
