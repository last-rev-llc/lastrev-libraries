#!/bin/bash

function cleanup() {
    rv=$?
    npx pm2 delete gql-serve
    exit $rv
}

trap "cleanup" EXIT

echo "Starting develop server..."
yarn propagate:env
yarn sync:cms
turbo run dev --output-logs=new-only
