#!/bin/bash
set -a
source .env || echo "No .env file found"
set +a
function cleanup() {
    rv=$?
    yarn gql:pm2:kill
    exit $rv
}

trap "cleanup" EXIT

echo "Starting develop server..."
yarn propagate:env
if [[ "${GRAPHQL_RUNNER_STRATEGY}" == "fs" ]] || [[ -z "${GRAPHQL_RUNNER_STRATEGY}" ]]; then
    echo "Syncing CMS data..."
    turbo run sync:cms
fi
turbo run dev --output-logs=new-only
