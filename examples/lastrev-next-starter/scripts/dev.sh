#!/bin/bash

function cleanup() {
    rv=$?
    npx pm2 delete gql-serve
    exit $rv
}

trap "cleanup" EXIT

echo "Starting develop server..."
yarn propagate:env
turbo run sync:cms
turbo run dev $1 --output-logs=new-only
