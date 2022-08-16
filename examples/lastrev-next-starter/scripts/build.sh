#!/bin/bash
set -a
source .env || echo "No .env file found"
set +a
function cleanup() {
    rv=$?
    bash "$PWD/scripts/post_build.sh"
    if [[ "$rv" != "0" ]]; then
        echo "Build failed."
        yarn pm2 logs --nostream --lines=1000
    fi
    exit $rv
}

trap "cleanup" EXIT

yarn propagate:env

bash "$PWD/scripts/pre_build.sh"

# Run build and cleanup pm2 if it fails
echo "Building..."
STAGE=build yarn turbo:build --output-logs=new-only $1
