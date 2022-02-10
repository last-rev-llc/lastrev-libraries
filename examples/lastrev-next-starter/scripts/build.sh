#!/bin/bash

function cleanup() {
  rv=$?
  sh "$PWD/scripts/post_build.sh"
  exit $rv
}

trap "cleanup" EXIT

echo "Building..."
sh "$PWD/scripts/pre_build.sh"

echo "Syncing CMS data.."
yarn turbo:sync:cms

# Run build and cleanup pm2 if it fails
echo "Building..."
STAGE=build yarn turbo:build $1 || echo "Build failed."
